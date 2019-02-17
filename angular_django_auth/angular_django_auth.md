% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular Django Authentication

## Γενικά

* Μέχρι τώρα δεν έχουμε υλοποιήσει κάποιον έλεγχο πρόσβασης στην
  εφαρμογή μας.

* Θέλουμε η εφαρμογή μας να επιτρέπει σε όλους να δουν τις κριτικές
  που έχουν γραφτεί για βιβλία.

* Ταυτόχρονα θέλουμε να απαγορεύει την προσθήκη κριτικών σε χρήστες οι
  οποίοι δεν έχουν ταυτοποιηθεί.

## Προσθήκη Ελέγχου Πρόσβασης

* Το Django rest framework έχει ολοκληρωμένο σύστημα ελέγχου
  πρόσβασης, με διάφορες κατηγορίες που αντιστοιχούν στις πράξεις που
  μπορούμε να εκτελέσουμε.

* Θα χρησιμοποιήσουμε την κατηγορία
  `permissions.IsAuthenticatedOrReadOnly` στις δύο views για τις
  κριτικές.

## `views.py`

```python
from .models import Book, Review
from .serializers import BookSerializer, ReviewSerializer
from rest_framework import generics

from django.contrib.staticfiles import views

from rest_framework import permissions

def index(request):
    return views.serve(request, 'index.html')

class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__contains=title)
        return queryset

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Review.objects.all()
        book_id = self.kwargs.get('book_id', None)
        if book_id is not None:
            queryset = queryset.filter(book=book_id)
        return queryset

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
```

## Προσαρμογή URLs

* Για να δώσουμε τη δυνατότητα εισόδου (login) στο χρήστη, προσθέτουμε
  το σχετικό URL στο αρχείο `project_site/urls.py`:

   ```python
   from django.contrib import admin
   from django.urls import include, path

   urlpatterns = [
       path('api/', include('djbr.urls')),
       path('admin/', admin.site.urls),
       path('api-auth/', include('rest_framework.urls')),
   ]
    ```

## Δημιουργία Χρήστη

* Για ευκολία θα δημιουργήσουμε ένα χρήστη στην εφαρμογή μας μέσω της
  εφαρμογής διαχείρισης του Django.
  
* Πηγαίνουμε λοιπόν στην εφαρμογή διαχείρισης, π.χ. στο
  [localhost:8000/admin/](localhost:8000/admin/). 


## Έλεγχος της Εφαρμογής (1)

* Μπορούμε να ελέγξουμε ότι η εφαρμογή μας δεν επιτρέπει την εισαγωγή
  κριτκών μόνο αφού ο χρήστης έχει περάσει τη διαδικασία εισόδου.

* Αυτό φαίνεται άμεσα και από το Browsable API. 

* Από τη στιμή που εφαρμόσαμε την πολιτική πρόσβασης, στο πάνω δεξιά
  κομμάτι του Browsable API εμφανίζεται ένας σύνδεσμος Log in.
  
* Αν ο χρήστης δεν εισέλθει στο σύστημα, δεν είναι καν διαθέσιμες οι
  μέθοδοι POST, PUT για τις κριτικές.
  
  
## Έλεγχος της Εφαρμογής (2)

* Επίσης μπορούμε να το ελέγξουμε και από τη γραμμή εντολών.

* Αν δώσουμε:

   ```bash
   http PUT localhost:8000/api/books/1/reviews title="A Nice Book" content="A pleasure to read..." book=1 
   ```

  θα πάρουμε σαν απάντηση:
  
   ```
   HTTP/1.1 403 Forbidden
   Allow: GET, POST, HEAD, OPTIONS
   Content-Length: 58
   Content-Type: application/json
   Date: Sat, 08 Dec 2018 16:38:02 GMT
   Server: WSGIServer/0.2 CPython/3.6.5
   Vary: Accept, Cookie
   X-Frame-Options: SAMEORIGIN

   {
       "detail": "Authentication credentials were not provided."
   }
   ```

# Προετοιμασία Front End

## Γιατί;

* Τώρα θα πρέπει να προσθέσουμε στο front end τη δυνατότητα να βλέπουμε
  κριτικές βιβλίων.

* Όπως είπαμε, θέλουμε οι χρήστες που έχουν περάσει τη διαδικασία εισόδου,
  και μόνο αυτοί, να μπορούν να εισάγουν κριτικές.

* Βεβαίως, η πρόσβαση στην εφαρμογή ελέγχεται ούτως ή άλλως από το
  Django και το Django Rest framework.
  
* Η προσαρμογή του front end γίνεται γιατί απλώς δεν θέλουμε να
  εμφανίζονται στον χρήστη πράγματα τα οποία δεν μπορεί να κάνει.


## Πρόσβαση μέσω Token

* Ένας τρόπος να ελέγχουμε την πρόσβαση στην εφαρμογή μας είναι με τη
  χρήση tokens.

* Όταν ο χρήστης περάσει τη διαδικασία εισόδου, το backend του δίνει
  ένα token το οποίο τον ταυτοποιεί.

* Το συγκεκριμένο token θα πρέπει να εισάγεται στις επικεφαλίδες
  (headers) κάθε αίτησης της οποίας η πρόσβαση ελέγχεται.

## JWT

* Υπάρχουν διάφοροι μηχανισμοί που υλοποιούν τη βασική ιδέα των
  tokens.

* Εμείς θα χρησιμοποιήσουμε το JSON Web Token Authentication, μέσω της
  βιβλιοθήκης
  [djangorestframework-simplejwt](https://github.com/davesque/django-rest-framework-simplejwt).

* H εγκατάσταση γίνεται με:

   ```bash
   pip install djangorestframework-jwt
   ```

## Ρυθμίσεις `settings.py`

* Για να ενεργοποιηθεί το JWT στο Django θα προσθέσουμε τα παρακάτω
  στο αρχείο `project_site/settings.py`:
  
   ```python
   REST_FRAMEWORK = {
       'DEFAULT_AUTHENTICATION_CLASSES': (
           'rest_framework_simplejwt.authentication.JWTAuthentication',
           'rest_framework.authentication.SessionAuthentication'
       ),
   }
   ```

## Διαδρομή Απόκτησης Token 

* To token θα μπορεί να ληφθεί από μία αίτηση που περιλαμβάνει το
  username και το password.

* Η αίτηση αυτή θα στέλνεται στη διαδρομή `api/token/`.

* Άρα θα πρέπει να ενημερώσουμε κατάλληλα το αρχείο
  `project_settings/urls.py`. 


## `project_settings/urls.py`

```python
from django.contrib import admin
from django.urls import include, path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/', include('djbr.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path(r'api/token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),
]
```

# Αυθεντικοποίηση στο Front End

## Υπηρεσία Αυθεντικοποίησης

* Για την αυθεντικοποίηση στο front end θα δημιουργήσουμε μια υπηρεσία
  `AuthService`.

* Συνεπώς δίνουμε:

   ```bash
   ng generate service auth
   ```

* Στη συνέχεια θα πρέπει να εισάγουμε στον σκελετό του αρχείου τη
  λογική της υπηρεσίας.

* Η υπηρεσία θα:

    * Επικοινωνεί με το back end, στέλνοντας το username και το
      password του χρήστη, προκειμένου να αποκτήσει ένα token.
      
    * Αποθηκεύει το token μέχρι να κάνει ο χρήστης logout.
    
    * Μπορεί να επιβεβαιώνει ότι ένας χρήστης έχει πραγματικά περάσει
      τη διαδικασία εισόδου.


## `auth.service.ts`

```python
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

class Credentials {
  constructor(public username: string, public password: string) {

  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(username, password) : Observable<boolean> {
    const authUrl = `api/token/`;
    var credentials = new Credentials(username, password);
    return this.http
      .post(authUrl, credentials, httpOptions).pipe(
        map(results => {
          if (results['access']) {
            localStorage.setItem('bangular-jwt-access-token',
                                 results['access']);
            this.isLoggedIn = true;
            if (results['refresh']) {
              localStorage.setItem('bangular-jwt-refresh-token',
                                   results['refresh']);
            }
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.log(`Login service: ${error}`);
          return of(false);
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('bangular-jwt-access-token');
    localStorage.removeItem('bangular-jwt-refresh-token');
  }

}
```

# Είσοδος μέσω του Front End

## Εξάρτημα Εισόδου

* Για την είσοδο θα δημιουργήσουμε το εξάρτημα `LoginService`.

* Συνεπώς δίνουμε:

   ```bash
   ng generate component Login
   ```
* Και στη συνέχεια, κατά τα γνωστά, γεμίζουμε τους σκελετούς των
  αρχείων που δημιουργήθηκαν.


## `login.component.ts`

```javascript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login(username, password) {
    this.auth.login(username, password)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/']);
        }
    });
  }

  logout() {
    this.auth.logout();
  }
}
```

## `login.component.html`

```html
<div class="container">

  <span [ngSwitch]="auth.isLoggedIn">
    <span *ngSwitchCase="false">
      <form class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="username" class="sr-only">Email address</label>
        <input #username
               type="text" id="username" class="form-control"
               placeholder="username" autofocus required/>
        <label for="password" class="sr-only">Password</label>
        <input #password
               type="password" id="password" class="form-control"
               placeholder="Password" required/>

        <button (click)="login(username.value, password.value)"
                class="btn btn-lg btn-primary btn-block"
                type="submit">Sign in</button>
      </form>
    </span>
    <span *ngSwitchCase="true">
      <form class="form-signin">
        <button (click)="logout()"
                class="btn btn-lg btn-primary btn-block">Logout</button>
      </form>
    </span>
  </span>

</div>
```

## `login.component.css`

```css
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
```

## Ενημέρωση Διαδρομών Front End

* Βεβαίως για να μπορεί να περάσει τη διαδικασία εισόδου ο χρήστης, θα
  πρέπει αυτή να είναι προσβάσιμη.

* Θα ενημερώσουμε λοιπόν τις διαδρομές του front end.


## `app-routing.module.ts`

```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'books/:id/reviews', component: ReviewsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
```

# Αλλαγές στην Πρόσοψη

## Ενημέρωση κεντρικού εξαρτήματος

* Ο χρήστης θα μπορεί να πλοηγηθεί πλέον στην οθόνη εισόδου, αλλά θα
  πρέπει να προσθέσουμε το σύνδεσμο προς αυτήν στο κεντρικό εξάρτημα
  της εφαρμογής.

* Με άλλα λόγια, θα πρέπει να ενημερώσουμε το `app.component.html`

## `app.component.html`

```html
<div class="container">
  <h1>{{title}}</h1>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link"
             routerLink="/dashboard"
             href="#">Dashboard
            <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link"
             routerLink="/books"
             href="#">Books</a>
        </li>
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link"
             routerLink="/login"
             href="#">
            {{ auth.isLoggedIn ? 'Logout' : 'Login' }}</a>
        </li>
      </ul>
    </div>
  </nav>

  <router-outlet></router-outlet>
  <app-messages></app-messages>
</div>
```

## `app.component.ts` (1)

* Αφού στο `app.component.html` χρησιμοποιούμε το `AuthService`, θα
  πρέπει να δημιουργήσουμε το αντίστοιχο πεδίο στο `app.component.ts`.

* Αυτό γίνεται μέσω του κατάλληλου `import` και της προσαρμογής του
  constructor. 

## `app.component.ts`

```javascript
import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bangular';

  constructor(private auth: AuthService) {}

}
```

## Επιλεκτική Εμφάνιση Στοιχείου

* Τώρα είμαστε σε θέση να αλλάξουμε το `reviews.component.html` ώστε η
  δυνατότητα προσθήκης κριτικής να εμφανίζεται μόνο αν ο χρήστης έχει
  περάσει τη διαδικασία εισόδου.

* Αυτό γίνεται μέσω της χρήσης `*ngIf` στο κατάλληλο σημείο.


## `reviews.component.html`

```html
<div class="container">
  <h3>Reviews</h3>

  <div class="row justify-content-start" *ngIf="auth.isLoggedIn">
    <div class="col-4">
      <form (ngSubmit)="onSubmit()" #reviewForm="ngForm">

        <div class="form-group">
          <label for="title">Title</label>
          <input type="text"
                 class="form-control"
                 id="title"
                 [(ngModel)]="review.title"
                 name="title"
                 required>
        </div>

        <div class="form-group">
          <label for="text">Content</label>
          <textarea class="form-control"
                    rows="5"
                    id="text"
                    [(ngModel)]="review.text"
                    name="text">
            </textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>

      </form>
    </div>
  </div>

  <div class="card col-4" style="margin-top: 2rem; margin-botton: 2rem;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item" *ngFor="let review of reviews">
        {{ review.title }}
        {{ review.text }}
      </li>
    </ul>
  </div>
</div>
```

## `reviews.component.ts` (1)

* Για να δουλέψει το `*ngIf` πρέπει το `ReviewsComponent` να
  χρησιμοποιεί το `AuthService`.

* Αυτό θα γίνει μέσω του κατάλληλου `import` και της δήλωσης της
  παραμέτρου στον constructor.

## `reviews.component.ts` (2)

```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Review } from '../review';
import { ReviewService } from '../review.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {

  reviews: Review[];

  review: Review;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    const bookId = +this.route.snapshot.paramMap.get('id');
    this.review = this.newReview(bookId);
    return this.reviewService.getReviews(bookId)
      .subscribe(reviews => this.reviews = reviews);
  }

  newReview(bookId: number) : Review {
    var review = new Review();
    review.book = bookId;
    review.title = '';
    review.text = '';
    review.review_date = new Date();
    return review;
  }

  onSubmit() : void {
    this.reviewService.addReview(this.review)
      .subscribe(review => {
        if (review) {
          this.reviews.unshift(review);
          this.review = this.newReview(review.book);
        }
      });
  }

}
```

# Αλληλεπίδραση με το Back End

## Εισαγωγή του Token 

* Από τη στιγμή που ο χρήστης έχει λάβει ένα token, θέλουμε αυτό να
  περιλαμβάνεται σε κάθε αίτηση που στέλνει το front end στο back end.
  
* Αν η συγκεκριμένη αίτηση δεν απαιτεί αυθεντικοποίηση, δεν πειράζει.

* Αν απαιτεί, το Django ελέγχει την παρουσία και την ορθότητα του
  token.


## Υποκλοπέας

* Μπορούμε να εισάγουμε μόνοι μας το token στις αιτήσεις που
  αποστέλλονται μέσω του Angular στο Django.
  
* Αλλά είναι πιο εύκολο αυτό να γίνει αυτομάτως.

* Αυτό μπορούμε να το κάνουμε με τη χρήση ενός *υποκλοπέα*
  (interceptor). 
  
* Αυτός υποκλέπτει τις αιτήσεις που φεύγουν από το Angular, κάνει ό,τι
  αλλαγές χρειάζεται επάνω τους, και τις προωθεί στο Django.
  
* Στην περίπτωσή μας, θα προσθέτει το token στις αιτήσεις.


## `token.interceptor.ts`

* Δημιουργούμε το αρχείο `src/app/token.interceptor.ts` και μέσα σε
  αυτό γράφουμε τον παρακάτω `TokenInterceptor`:
  
   ```javascript
   import { Injectable } from '@angular/core';

   import {
     HttpRequest,
     HttpHandler,
     HttpEvent,
     HttpInterceptor
   } from '@angular/common/http';

   import { Observable } from 'rxjs';

   @Injectable()
   export class TokenInterceptor implements HttpInterceptor {

     constructor() {}

     intercept(req: HttpRequest<any>,
               next: HttpHandler): Observable<HttpEvent<any>> {

       const token = localStorage.getItem('bangular-jwt-access-token');
       if (token) {
         const authReq = req.clone({
           setHeaders: {
             Authorization: `Bearer ${token}`
           }
         });
         return next.handle(authReq);
       } else {
         return next.handle(req);
       }
     }
   }
   ```

## Ενημέρωση `app.module.ts`

* Τέλος, ενημερώνουμε το `app.module.ts` ώστε να δηλώσουμε σωστά το
  τον `TokenInterceptor` που κατασκευάσαμε:
  
   ```javascript
   import { BrowserModule } from '@angular/platform-browser';
   import { HttpClientModule }    from '@angular/common/http';

   import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

   import { NgModule } from '@angular/core';
   import { FormsModule } from '@angular/forms';

   import { HTTP_INTERCEPTORS } from '@angular/common/http';
   import { TokenInterceptor } from './token.interceptor';

   import { AppComponent } from './app.component';
   import { BooksComponent } from './books/books.component';
   import { ItalicsDirective } from './italics.directive';
   import { BookDetailComponent } from './book-detail/book-detail.component';
   import { MessagesComponent } from './messages/messages.component';
   import { AppRoutingModule } from './app-routing.module';
   import { DashboardComponent } from './dashboard/dashboard.component';
   import { BookSearchComponent } from './book-search/book-search.component';
   import { ReviewsComponent } from './reviews/reviews.component';
   import { LoginComponent } from './login/login.component';

   @NgModule({
     declarations: [
       AppComponent,
       BooksComponent,
       ItalicsDirective,
       BookDetailComponent,
       MessagesComponent,
       DashboardComponent,
       BookSearchComponent,
       ReviewsComponent,
       LoginComponent
     ],
     imports: [
       BrowserModule,
       FormsModule,
       AppRoutingModule,
       HttpClientModule,
       NgbModule
     ],
     providers: [
       {
         provide: HTTP_INTERCEPTORS,
         useClass: TokenInterceptor,
         multi: true,
       }
     ],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   
   ```
   
<div class="notes">

Βλέπουμε ότι χρειάζονται να εισάγουμε τα παρακάτω:

```javascript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
```

και επίσης να δηλώσουμε τον interceptor στον πίνακα `providers`:

```javascript
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }
]
```

</div>
