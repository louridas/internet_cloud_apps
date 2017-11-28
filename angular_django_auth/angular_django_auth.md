% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 2 Authentication

## Γενικά

* Μέχρι τώρα δεν έχουμε χρησιμοποιήσει κάποιον κανονικό εξυπηρετητεί ο
  οποίος θα ακούει τις αιτήσεις της εφαρμογής μας.

* Τώρα θα χρησιμοποιήσουμε το Angular στο front end και το Django στο
  backend. 

# Χειρισμός κριτικών

## Γενικά

* Θα επεκτείνουμε το μοντέλο της βάσης μας ώστε να μπορούμε να
  αποθηκεύουμε και κριτικές για τα βιβλία.

* Αυτό θα το κάνουμε εμπλουτίζοντας το αντίστοιχο μοντέλο του Django.

* Επίσης, θα πρέπει να κάνουμε τις αντίστοιχες αλλαγές στους
  serializers και στα views.

## `models.py`

* Στο αρχείο `models.py` θα προσθέσουμε τα παρακάτω:

    ```python
    from django.utils import timezone
    
    class Review(models.Model):
    book = models.ForeignKey(Book, related_name='reviews',
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField(default="")
    review_datetime = models.DateTimeField('review date time',
                                           default=timezone.now)
    ```

## Εφαρμογή μεταγωγών

* Για να ενημερώσουμε το σχήμα της βάσης με την αλλαγή μας, θα
  χρησιμοποιήσουμε τις μεταγωγές (migrations) του Django.

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

## Επέκταση serializers

* Για να μπορούμε να χρησιμοποιήσουμε τις κριτικές μέσω του API μας,
  θα πρέπει να προσθέσουμε τους κατάλληλους serializers, συνεπώς το
  αρχείο `serializers.py` θα γίνει:

    ```python
    from rest_framework import serializers
    from .models import Book, Review

    from django.utils import timezone

    import datetime

    class BookSerializer(serializers.ModelSerializer):
        reviews = serializers.PrimaryKeyRelatedField(many=True,
                                                     queryset=Review.objects.all())

        class Meta:
            model = Book
            fields = ('id', 'title', 'pub_year', 'reviews')

    class ReviewSerializer(serializers.ModelSerializer):
        review_datetime = serializers.DateTimeField(default=timezone.now(),
                                                    read_only=True)
        class Meta:
            model = Review
            fields = ('id', 'title', 'text', 'review_datetime')
    ```

## Προσαρμογή views

* Αντίστοιχες αλλαγές θα γίνουν στο αρχείο `views.py`.

* Θα δημιουργηθούν δύο views, μία για την εμφάνιση και δημιουργία
  κριτικών και μία για την ανάκτηση και ενημέρωση κριτικών.


## `views.py`

```python
from bangular.models import Book
from bangular.models import Review
from bangular.serializers import BookSerializer
from bangular.serializers import ReviewSerializer
from rest_framework import generics

from django.contrib.staticfiles import views

def index(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
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
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        queryset = Review.objects.all()
        book_id = self.kwargs.get('book_id', None)
        if book_id:
            queryset = queryset.filter(book_id=book_id)
        return queryset
    
    def perform_create(self, serializer):
        book_id = self.kwargs['book_id']
        serializer.save(book_id=book_id)

class ReviewDetail(generics.RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
```

## Προσθήκη διαδρομών

* Για να είναι προσβάσιμες οι κριτικές από το API μας, θα πρέπει να
  προσθέσουμε τις κατάλληλες διαδρομές στο `bangular/urls.py`:

    ```python
    from django.conf.urls import url
    from . import views

    app_name = 'bangular'

    urlpatterns = [
        url(r'^books/?$', views.BookList.as_view()),
        url(r'^books/(?P<pk>[0-9]+)/?$', views.BookDetail.as_view()),
        url(r'^books/(?P<book_id>[0-9]+)/reviews/$', views.ReviewList.as_view()),
        url(r'^books/(?P<book_id>[0-9]+)/reviews/(?P<review_id>[0-9]+)$',
            views.ReviewDetail.as_view()),
    ]
    ```

# Έλεγχος πρόσβασης

## Γενικά

* Θέλουμε η εφαρμογή μας να επιτρέπει σε όλους να δουν τις κριτικές
  που έχουν γραφτεί για βιβλία.

* Ταυτόχρονα θέλουμε να απαγορεύει την προσθήκη κριτικών σε χρήστες οι
  οποίοι δεν έχουν ταυτοποιηθεί.

## Προσθήκη ελέγχου πρόσβασης

* Το Django rest framework έχει ολοκληρωμένο σύστημα ελέγχου
  πρόσβασης, με διάφορες κατηγορίες που αντιστοιχούν στις πράξεις που
  μπορούμε να εκτελέσουμε.

* Θα χρησιμοποιήσουμε την κατηγορία
  `permissions.IsAuthenticatedOrReadOnly` στις δύο views για τις
  κριτικές.

## `views.py`

```python
from bangular.models import Book
from bangular.models import Review
from bangular.serializers import BookSerializer
from bangular.serializers import ReviewSerializer
from rest_framework import generics

from django.contrib.staticfiles import views

from rest_framework import permissions

def index(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
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
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
    def get_queryset(self):
        queryset = Review.objects.all()
        book_id = self.kwargs.get('book_id', None)
        if book_id:
            queryset = queryset.filter(book_id=book_id)
        return queryset
    
    def perform_create(self, serializer):
        book_id = self.kwargs['book_id']
        serializer.save(book_id=book_id)

class ReviewDetail(generics.RetrieveUpdateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
```

## Προσαρμογή URLs

* Για να δώσουμε τη δυνατότητα εισόδου (login) στο χρήστη, προσθέτουμε
  το σχετικό URL στο αρχείο `bangular_project/urls.py`:

    ```python
    from django.conf.urls import url, include
    from django.contrib import admin

    from bangular import views

    urlpatterns = [
        url(r'^api/', include('bangular.urls')),
        url(r'^admin/', admin.site.urls),
        url(r'^api-auth/', include('rest_framework.urls')),
    ] 

    urlpatterns += url(r'^(?P<path>.*)$', views.index),
    ```

## Δημιουργία χρήστη

* Για ευκολία θα δημιουργήσουμε ένα χρήστη στην εφαρμογή μας μέσω της
  γραμμής εντολών:

    ```bash
    python manage.py createsuperuser
    ```

## Έλεγχος της εφαρμογής

* Μπορούμε να ελέγξουμε ότι η εφαρμογή μας δεν επιτρέπει την εισαγωγή
  κριτκών μόνο αφού ο χρήστης έχει περάσει τη διαδικασία εισόδου.


# Προσαρμογή front end

## Γενικά

* Τώρα θα πρέπει να προσθέσουμε στο front end τη δυνατότητα να βλέπουμε
  κριτικές βιβλίων.

* Επίσης, θέλουμε οι χρήστες που έχουν περάσει τη διαδικασία εισόδου,
  και μόνο αυτοί, να μπορούν να εισάγουν κριτικές.

* Βεβαίως, η πρόσβαση στην εφαρμογή ελέγχεται ούτως ή άλλως από το
  backend, αλλά δεν θέλουμε να εμφανίζονται στον χρήστη πράγματα τα
  οποία δεν μπορεί να κάνει.

## Ρύθμιση proxy

* Η εφαρμογή μας θα προσφέρεται από το Django.

* Στη διάρκεια της ανάπτυξης όμως, βολεύει να προσφέρεται από έναν
  ενσωματωμένο web server γραμμένο σε JavaScript, ο οποίος θα ελέγχει
  συνέχεια για αλλαγές και θα κάνει τις απαραίτητες ενημερώσεις.

* Επιπλέον δεν θα χρειάζεται να αντιγράψουμε τα αρχεία της εφαρμογής
  στο Django παρά μόνο στο τέλος.

## `proxy.conf.json`

*  Στον κεντρικό κατάλογο της εφαρμογής μας φτιάχνουμε το αρχείο
   `proxy.conf.json` με τα εξής περιεχόμενα:

    ```javascript
    {
      "/api": {
        "target": "http://localhost:8000",
        "secure": false
      }
    }
    ```

## Προσαρμογή `package.json`

* Αλλάζουμε τη γραμμή `start` στο `package.json` ώστε να είναι ως
  εξής:

    ```javascript
    "start": "ng serve --proxy-config proxy.conf.json",
    ```
    
* Ξεκινάμε την εφαρμογή μας ως εξής:
    ```bash
    npm start
    ```
    
* Αν αυτό αποτύχει, φταίει bug στο Angular CLI. Στην περίπτωση αυτή,
  ξεκινάμε την εφαρμογή μας με:
    ```bash
    ng serve --proxy-config proxy.conf.json
    ```

## Δημιουργία κλάσης `Review`

* Για να δημιουργήσουμε τον σκελετό της κλάσης `Review` δίνουμε:
    ```
    ng create class Review
    ```
    
* Αλλάζουμε το αρχείο `review.ts` ώστε να είναι:

    ```javascript
    export class Review {
      id: number;
      title: string;
      text: string;
      pub_datetime: Date;
    }
    ```

## Δημιουργία `ReviewsComponent`

* Δημιουργούμε το `ReviewsComponent` χρησιμοποιώντας το Angular CLI:
    ```bash
    ng g component Reviews
    ```

* Στη συνέχεια θα πρέπει να αλλάξουμε τα αρχεία:
    * `reviews/reviews.component.html`
    * `reviews/reviews.component.css`
    * `reviews/reviews.component.ts`

## `reviews.component.ts` (1)

* Το `ReviewsComponent` θέλουμε να δείχνει τις κριτικές για ένα
  συγκεκριμένο βιβλίο.

* Για το σκοπό αυτό θα δημιουργήσουμε μία ιδιότητα `bookId`, στην
  οποία θα προσδώσουμε το διακοσμητή `@Input`.

* Έτσι θα μπορούμε να τη χρησιμοποιήσουμε ως:
    ```html
    <app-reviews [bookId]="book.id"></app-reviews>
    ```
    
## `reviews.component.ts` (2)

```javascript
import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../review';

import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [ ReviewService ]
})
export class ReviewsComponent implements OnInit {
  @Input() bookId: number = null;
  
  reviews: Review[];
  selectedReview: Review;

  constructor(private reviewService: ReviewService) { }

  getReviews(): void {
    this.reviewService.getReviews(this.bookId).then(reviews =>
                                                    this.reviews = reviews);
  }

  ngOnInit(): void {
    this.getReviews();
  }

  onSelect(review: Review): void {
    this.selectedReview = review;
  }

  add(title: string, text: string): void {
    title = title.trim();
    text = text.trim();
    if (!title) { return; }
        this.reviewService.create(this.bookId, title, text)
      .then(review => {
        this.reviews.push(review);
        this.selectedReview = null;
    });
  }
  
}
```

## `reviews.component.html`

```html
<h3>Reviews</h3>
<div>
  <div>
    <label>Title:</label> <input #reviewTitle />
  </div>
  <div>
    <label>Text:</label>
    <textarea rows="4" cols="50" #reviewText></textarea>
  </div>
  <button (click)="add(reviewTitle.value, reviewText.value);
                   reviewTitle.value=''; reviewText.value=''">
    Add
  </button>
</div>
<ul class="reviews">
  <li *ngFor="let review of reviews"
      [class.selected]="review === selectedReview"
      (click)="onSelect(review)">
    <div>
      <span class="badge">{{review.id}}</span>
      <span class="title"> {{review.title}} </span>
    </div>
    <div class="text">
      <span> {{review.text}} </span>
      <div class="datetime"> {{review.review_datetime | date:'medium'}} </div>
    </div>
  </li>
</ul>
```

## `reviews.component.css`

```css
.selected {
    background-color: #CFD8DC !important;
    color: white;
}

.reviews {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 30em;
  }

.reviews li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    /* height: 1.6em; */
    border-radius: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.reviews li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
}

.reviews li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
}

.reviews .title {
    position: relative;
    top: -3px;
    width: 15em;
    background-color: #EEE;
}

.reviews .text {
    position: relative;
    top: -3px;
    margin: 6px;
    padding: 6px;
    border-radius: 4px;
    background-color: #FFF;
}

.reviews .datetime {
    position: relative;
    text-align: right;
    font-size: 12px;
}

.reviews .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
}

.new-review .textarea-container * {
    vertical-align: top;
}

label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}

input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
```

## `book-detail.component.html` (1)

* Οι κριτικές κάθε βιβλίου θα δημοσιεύονται κάτω από τις λεπτομέρειες
  του κάθε βιβλίου.

* Συνεπώς θα πρέπει να κάνουμε τις απαραίτητες αλλαγές στο
  `book-detail.component.html`.

## `book-detail.component.html` (2)

```html
<div *ngIf="book">
  <h2>{{book.title}} details:</h2>
  <div><label>id: </label>{{book.id}}</div>
  <label>title: </label>
  <input [(ngModel)]="book.title" placeholder="title">
  <div><label>Publication year: </label>{{book.pub_year}}</div>
  <button (click)="goBack()">Back</button>
  <button (click)="save()">Save</button>
  <app-reviews [bookId]="book.id"></app-reviews>
</div>
```

## `review.service.ts` (1)

* Για την ανάκτηση κριτικών από το backend θα χρησιμοποιήσουμε μια νέα
  υπηρεσία, `ReviewService`.

* Προετοιμάζουμε το έδαφος δίνοντας:

    ```bash
    ng g service Review
    ```

## `review.service.ts` (2)

```javascript
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Review } from './review';

@Injectable()
export class ReviewService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http) { }

  getReviews(bookId: Number): Promise<Review[]> {
    const reviewsUrl = `api/books/${bookId}/reviews/`;
    return this.http.get(reviewsUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Review[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(bookId: number, title: string, text: string): Promise <Review> {
    const reviewsUrl = `api/books/${bookId}/reviews/`;
    return this.http
      .post(reviewsUrl,
            JSON.stringify({ book_id: bookId,
                             title: title,
                             text: text }),
            { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
}
```

# Έλεγχος πρόσβασης στο front end

## Γενικά

* Για να προσθέσουμε ελέγχους πρόσβασης στο front end θα πρέπει κατ'
  αρχήν να προσθέσουμε ένα μηχανισμό ελέγχου εισόδου.

* Στη συνέχεια, συγκεκριμένα σημεία της εφαρμογής θα ελέγχουν ότι ο
  χρήστης έχει περάσει πραγματικά από τη διαδικασία εισόδου.

## Πρόσβαση μέσω token

* Ένας τρόπος να ελέγχουμε την πρόσβαση είναι με τη χρήση tokens.

* Όταν ο χρήστης περάσει τη διαδικασία εισόδου, το backend του δίνει
  ένα token το οποίο τον ταυτοποιεί.

* Το συγκεκριμένο token θα πρέπει να εισάγεται στις επικεφαλίδες
  (headers) κάθε αίτησης της οποίας η πρόσβαση ελέγχεται.

## JWT

* Υπάρχουν διάφοροι μηχανισμοί που υλοποιούν τη βασική ιδέα των
  tokens.

* Εμείς θα χρησιμοποιήσουμε το JSON Web Token Authentication, μέσω της
  βιβλιοθήκης
  [Django Rest framework JWT Auth](http://getblimp.github.io/django-rest-framework-jwt/).

* H εγκατάσταση γίνεται με:
    ```bash
    pip install djangorestframework-jwt
    ```

## Ρυθμίσεις `settings.py`

* Για να ενεργοποιηθεί το JWT στο Django θα προσθέσουμε τα παρακάτω
  στο αρχείο `settings.py`:
    ```python
    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.BasicAuthentication',
            'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        ),
    }
    ```

## Διαδρομή απόκτησης token 

* To token θα μπορεί να ληφθεί από μία αίτηση που περιλαμβάνει το
  username και το password.

* Η αίτηση αυτή θα στέλνεται στη διαδρομή `api-token-auth/'.

* Άρα θα πρέπει να ενημερώσουμε κατάλληλα το αρχείο
  `bangular_project/urls.py`. 


## `bangular_project/urls.py`

```python
from django.conf.urls import url, include
from django.contrib import admin

from rest_framework_jwt.views import obtain_jwt_token

from bangular import views

urlpatterns = [
    url(r'^api/', include('bangular.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),
] 

urlpatterns += url(r'^(?P<path>.*)$', views.index),
```

## Υπηρεσία αυθεντικοποίησης

* Για την αυθεντικοποίηση στο front end θα δημιουργήσουμε μια υπηρεσία
  `AuthService'.

* Συνεπώς δίνουμε:
    ```bash
    ng g service Auth
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
import { Headers, Http } from '@angular/http';

@Injectable()
export class AuthService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  isLoggedIn: boolean = false;

  token: string = null;

  constructor(private http: Http) { }
  
  login(username, password): Promise<boolean> {
    const authUrl = `api-token-auth/`;
    return this.http
      .post(authUrl,
            JSON.stringify({ username: username,
                             password: password }),
        { headers: this.headers })
        .toPromise()
        .then(res => { let results = res.json();
                       if (results['token']) {
                         this.token = results['token'];
                         this.isLoggedIn = true;
                         return true;
                       } else {
                         return false;
                       }
                     })
        .catch(this.handleError);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.token = null;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
```

## Ενημέρωση `ReviewService`

* Στην προσθήκη κριτικής, που γίνεται από το `ReviewService`, θα
  πρέπει πλέον να προσθέτουμε την επικεφαλλίδα η οποία περιέχει το JWT
  token του χρήστη.

* Αυτό απαιτεί μία μικρή αλλαγή στη μέθοδο `create()`.

## `review.service.ts`

```javascript
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AuthService } from './auth.service';

import { Review } from './review';

@Injectable()
export class ReviewService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http, private auth: AuthService) { }

  getReviews(bookId: Number): Promise<Review[]> {
    const reviewsUrl = `api/books/${bookId}/reviews/`;
    return this.http.get(reviewsUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Review[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(bookId: number, title: string, text: string): Promise <Review> {
    const reviewsUrl = `api/books/${bookId}/reviews/`;
    let postHeaders = new Headers(this.headers);
    postHeaders['Authorization'] = `JWT {this.auth.token}`;
    return this.http
      .post(reviewsUrl,
            JSON.stringify({ book_id: bookId,
                             title: title,
                             text: text }),
            { headers: postHeaders })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
}
```

## Εξάρτημα εισόδου

* Για την είσοδο θα δημιουργήσουμε το εξάρτημα `LoginService'.

* Συνεπώς δίνουμε:
    ```bash
    ng g component Login
    ```
* Και στη συνέχεια, κατά τα γνωστά, γεμίζουμε τους σκελετούς των
  αρχείων που δημιουργήθηκαν.

## `login.component.ts`

```
import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(username, password) {
    this.message = 'Trying to log in ...';
    this.authService.login(username, password)
      .then(() => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          this.router.navigate(['/']);
        }
      })
      .catch(error => this.message = error);
  }
  
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
```

## `login.component.html`

```html
<h2>LOGIN</h2>
<p>{{message}}</p>
<p>
  <span [ngSwitch]="authService.isLoggedIn">
    <span *ngSwitchCase="false">
      <label>Username: </label>
      <input #username/>
      <label>Password: </label>
      <input type="password" #password />
      <button (click)="login(username.value, password.value)">Login</button>
    </span>
    <span *ngSwitchCase="true">
      <button (click)="logout()">Logout</button>
    </span>
  </span>
</p>
```

## Ενημέρωση διαδρομών front end

* Βεβαίως για να μπορεί να περάσει τη διαδικασία εισόδου ο χρήστης, θα
  πρέπει αυτή να είναι προσβάσιμη.

* Θα ενημερώσουμε λοιπόν τις διαδρομές του front end.

## `app-routing.module.ts`

```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
```

## Ενημέρωση κεντρικού εξαρτήματος

* Ο χρήστης θα μπορεί να πλοηγηθεί πλέον στην οθόνη εισόδου, αλλά θα
  πρέπει να προσθέσουμε το σύνδεσμο προς αυτήν στο κεντρικό εξάρτημα
  της εφαρμογής.

* Με άλλα λόγια, θα πρέπει να ενημερώσουμε το `app.component.html`

## `app.component.html`

```
<h1>{{title}}</h1>
<nav>
  <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
  <a routerLink="/books" routerLinkActive="active">Books</a>
  <a routerLink="/login" routerLinkActive="active">
    {{ authService.isLoggedIn ? 'Logout' : 'Login' }} </a>
</nav>
<router-outlet></router-outlet>
```

## `app.component.ts` (1)

* Αφού στο `app.componen.html` χρησιμοποιούμε το `AuthService`, θα
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
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'Bangular';

  constructor(private authService: AuthService) { }
  
}
```

## Έλεγχος `app.module.ts`

* Ελέγχουμε ότι το `app.module.ts` έχει όλα τα απαιτούμενα imports,
  declarations, και providers.

## `app.module.ts`

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './book.service';

import { BookSearchComponent } from './book-search/book-search.component';

import  { AppRoutingModule } from './app-routing.module';

import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewService } from './review.service';

import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BookDetailComponent,
    BooksComponent,
    BookSearchComponent,
    ReviewsComponent,
    LoginComponent
  ],
  providers: [ BookService, ReviewService, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Επιλεκτική εμφάνιση στοιχείου

* Τώρα είμαστε σε θέση να αλλάξουμε το `reviews.component.html` ώστε η
  δυνατότητα προσθήκης κριτικής να εμφανίζεται μόνο αν ο χρήστης έχει
  περάσει τη διαδικασία εισόδου.

* Αυτό γίνεται μέσω της χρήσης `*ngIf` στο κατάλληλο σημείο.

## `reviews.component.html`

```
<h3>Reviews</h3>
<div class="new-review" *ngIf="authService.isLoggedIn">
  <div>
    <label>title:</label> <input #reviewTitle />
  </div>
  <div class="textarea-container">
    <label>text:</label>
    <textarea rows="4" cols="50" #reviewText></textarea>
  </div>
  <div>
    <button (click)="add(reviewTitle.value, reviewText.value);
                     reviewTitle.value=''; reviewText.value=''">
      Add
    </button>
  </div>
</div>
<ul class="reviews">
  <li *ngFor="let review of reviews"
      [class.selected]="review === selectedReview"
      (click)="onSelect(review)">
    <div>
      <span class="badge">{{review.id}}</span>
      <span class="title"> {{review.title}} </span>
    </div>
    <div class="text">
      <span> {{review.text}} </span>
      <div class="datetime"> {{review.review_datetime | date:'medium'}} </div>
    </div>
  </li>
</ul>
```

## `reviews.component.ts` (1)

* Για να δουλέψει το `*ngIf` πρέπει το `ReviewsComponent` να
  χρησιμοποιεί το `AuthService`.

* Αυτό θα γίνει μέσω του κατάλληλου `import` και της δήλωσης της
  παραμέτρου στον constructor.

## `reviews.component.ts` (2)

```
import { Component, OnInit, Input } from '@angular/core';

import { Review } from '../review';

import { ReviewService } from '../review.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [ ReviewService ]
})
export class ReviewsComponent implements OnInit {
  @Input() bookId: number = null;
  
  reviews: Review[];
  selectedReview: Review;

  constructor(private reviewService: ReviewService,
              private authService: AuthService) { }

  getReviews(): void {
    this.reviewService.getReviews(this.bookId).then(reviews =>
                                                    this.reviews = reviews);
  }

  ngOnInit(): void {
    this.getReviews();
  }

  onSelect(review: Review): void {
    this.selectedReview = review;
  }

  add(title: string, text: string): void {
    title = title.trim();
    text = text.trim();
    if (!title) { return; }
        this.reviewService.create(this.bookId, title, text)
      .then(review => {
        this.reviews.push(review);
        this.selectedReview = null;
    });
  }
  
}
```

## Από εδώ και πέρα

* Είδαμε ότι αλλάξαμε το `ReviewService` ώστε να εισάγουμε το token
  του χρήστη στην κατάλληλη επικεφαλίδα.

* Αυτό αρκεί για μία πολύ απλή εφαρμογή όπως η δικιά μας, αλλά σε μία
  πιο περίπλοκη εφαρμογή δεν θέλουμε να βάζουμε εμείς κάθε φορά το
  token, αλλά να εισάγεται αυτομάτως.

* Για το σκοπό αυτό θα χρησιμοποιούσαμε τη βιβλιοθήκη
  [angular2-jwt](https://github.com/auth0/angular2-jwt).

* Επίσης, αυτή τη στιγμή τα tokens που δημιουργούνται λήγουν μετά από
  πέντε λεπτά.

* Για λεπτομέρειες για το πώς μπορεί να αλλάξει αυτό, πώς μπορούμε να
  ανανεώνουμε tokens, κ.λπ., βλ. την τεκμηρίωση του
  [Django REST framework JWT](http://getblimp.github.io/django-rest-framework-jwt/). 

* Επίσης μπορούμε να χρησιμοποιήσουμε tokens χωρίς το μηχανισμό JWT.
  Για πληροφορίες κοιτάξτε πάλι τη
  [σχετική τεκμηρίωση](http://www.django-rest-framework.org/api-guide/authentication/).

* Σκεφτείτε επίσης άλλα σημεία που δεν αγγίξαμε: π.χ., ότι θα θέλατε
  όταν ο χρήστης αποσυνδέεται να καταστρέφετε το token του στο back
  end.
