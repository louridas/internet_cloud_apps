% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular Bootstrap

## Γενικά

* Είναι επίπονο να πετύχουμε ένα καλό αισθητικό αποτέλεσμα γράφοντας
  αρχεία CSS με το χέρι από το μηδέν.

* Η κατάσταση περιπλέκεται όταν πρέπει να λάβουμε υπόψη μας ότι η
  εφαρμογή μας θα πρέπει να εμφανίζεται σωστά σε διάφορες αναλύσεις
  και σε διαφορετικές συσκευές.

* Για το λόγο αυτό καλό είναι να χρησιμοποιούμε μια ώριμη βιβλιοθήκη
  στυλ.

* Μια τέτοια είναι το [Bootstrap](https://getbootstrap.com/).


# Εγκατάσταση

## Bootstrap και Angular

* Βεβαίως μπορούμε να χρησιμοποιήσουμε το Bootstrap ως έχει με το
  Angular, και στον κώδικά μας να χειριζόμαστε απευθείας τις κλάσεις
  στυλ και την JavaScript που προσφέρει.

* Είναι όμως απλούστερο να χρησιμοποιήσουμε μια βιβλιοθήκη η οποία μας
  δίνει πρόσβαση στο Bootstrap μέσω των κατάλληλων εξαρτημάτων.

* Θα χρησιμοποιήσουμε τη βιβλιοθήκη
  [ng-bootstrap](https://ng-bootstrap.github.io/#/home).


## Εγκατάσταση `ng-bootstrap`

* Εκτελούμε:

    ```bash
    npm install --save @ng-bootstrap/ng-bootstrap
    ```

## Ενημέρωση Εφαρμογής (1)

* Στη συνέχεια θα πρέπει να ενημερώσουμε την εφαρμογή μας να
  χρησιμοποιεί τα στυλ του Bootstrap.

* Στο αρχείο `index.html` προσθέτουμε στο στοιχείο <head> τη γραμμή:

   ```html
   <link rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous">
    ```

## Ενημέρωση Εφαρμογής (2)

* Μετά χρειάζεται απλώς να εισάγουμε το ng-bootstrap στο
  `AppModule`.

* Προσθέτουμε κοντά στην αρχή του `app.module.ts`:

   ```javascript
   import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
   ```

* Επίσης προσθέτουμε στον πίνακα `imports` τη γραμμή:

   ```javascript
   NgbModule
   ```

## Καθάρισμα CSS

* Θα σταματήσουμε να χρησιμοποιούμε τα στυλ που είχαμε ορίσει μέχρι
  τώρα.

* Ξεκινάμε καθαρίζοντας το αρχείο `src/styles.css`

* Το ανοίγουμε και σβήνουμε όλα τα περιεχόμενά του, αφήνοντάς το κενό.


# Χρήση μπάρας πλοήγησης

## Πλοήγηση στην εφαρμογή

* Η εφαρμογή μας χρησιμοποιεί για πλοήγηση συνδέσμους στο πάνω μέρος
  της.

* Θα ενσωματώσουμε τη λογική των συνδέσμων στο Bootstrap
  χρησιμοποιώντας μια μπάρα πλοήγησης.


## `app.module.html`

* Ανοίγουμε το `src/app/app.component.html` και το αλλάζουμε ως εξής:

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
         </ul>
       </div>
     </nav>

     <router-outlet></router-outlet>
     <app-messages></app-messages>
   </div>
   ```

## `app.component.css`

* Ανοίγουμε το αρχείο `app.component.css` και το αδειάζουμε.


# Βελτίωση ταμπλό

## Χρήση Bootstrap στο ταμπλό

* Η εμφάνιση του ταμπλό ρυθμίζεται αυτή τη στιγμή από ένα περίπλοκο
  φύλλο στυλ.

* Αντί γι' αυτό, θα βασιστούμε στις δυνατότητες του Bootstrap.


## `dashboard.component.html` (1)

* Στο `dashboard.component.html` θα χρησιμοποιήσουμε ένα grid με
  τέσσερεις στήλες.

* Τα (μέχρι τέσσερα) βιβλία που θα εμφανίζονται θα μπαίνουν όλα μαζί
  σε μία σειρά που θα περιέχει τις στήλες αυτές.

## `dashboard.component.html` (2)

```html
<h3>Top Books</h3>
<div class="container">
  <div class="row">
    <a *ngFor="let book of books" class="col-sm"
       routerLink="/books/{{book.id}}">
      <div class="dashboard-item">
        <h5>{{book.title}}</h5>
      </div>
    </a>
  </div>
</div>

<app-book-search></app-book-search>
```

## `dashboard.component.css` (1)

* Τώρα μπορούμε να απλοποιήσουμε το `dashboard.css`.

* Στην ουσία θα κρατήσουμε μόνο ορισμένα στυλ, που αφορούν την
  επιμέρους προσαρμογή της εμφάνισης.


## `dashboard.component.css` (2)

```css
a {
  text-decoration: none;
}

h3 {
  text-align: center; margin-bottom: 1em;
}

h4 {
  position: relative;
}

.dashboard-item {
  padding: 20px;
  text-align: center;
  color: #eee;
  max-height: 120px;
  min-width: 120px;
  background-color: #607D8B;
  border-radius: 2px;
}

.dashboard-item:hover {
  background-color: #EEE;
  cursor: pointer;
  color: #607d8b;
}
```

# Βελτίωση αναζήτησης βιβλίων

## Αναζήτηση μέσω typeahead

* Θα προσαρμόσουμε την αναζήτηση των βιβλίων που βρίσκεται κάτω από τα
  βιβλία στο dashboard.

* Αντί γι' αυτό, θα βασιστούμε στις δυνατότητες του Bootstrap, και
  συγκεκριμένα το widget typeahead.


## `switchMap`

* Πριν δούμε πώς ακριβώς θα προχωρήσουμε, ας δούμε πάλι τον τελεστή
  `switchMap`.

## Ο τελεστής `switchMap`

<img src="switchmap.png" alt="switchMap" style="width: 800px;"/>

<div class="notes">

Ο τελεστής `switchMap` επίσης μετασχηματίζει ένα `Observable`
εφαρμόζοντας μια συνάρτηση σε αυτό. Όπως και πριν, η συνάρτηση παίρνει
με τη σειρά κάθε αντικείμενο που εκπέμπει το `Observable` και
επιστρέφει ένα νέο `Observable`. Στη συνέχεια το `switchMap` όταν
συγχωνεύει τις εκπομπές των `Observable`λαμβάνει υπόψη τις εκπομπές
του πιο πρόσφατου μόνο `Observable` από αυτά που επιστρέφει η
συνάρτηση.

</div>


## `book-search.component.html` (1)

* To `book-search.component.html` θα πρέπει να τροποποιηθεί όπως παρακάτω:

   ```html
   <div id="search-component">

     <ng-template #rt let-r="result" let-t="term">
       <ngb-highlight [result]="r.title" [term]="t"></ngb-highlight>
     </ng-template>

     <label for="search-box">Book search:</label>
     <input id="search-box"
            type="text"
            class="form-control"
            [class.alert-warning]="searchFailed"
            (selectItem)="selectedItem($event)"
            [(ngModel)]="model"
            [ngbTypeahead]="search"
            [resultTemplate]="rt"
            [inputFormatter]="formatter"/>

     <span *ngIf="searching">searching...</span>
     <div class="alert alert-warning" *ngIf="searchFailed">
       Sorry, suggestions could not be loaded.
     </div>
   </div>
   ```

<div class="notes">

* Το:

   ```javascript
   [ngbTypeahead]="search"
   ```
  ορίζει τη συνάρτηση που θα καλείται για να εκτελεί τις αναζητήσεις
  καθώς ο χρήστης γράφει στο πεδίο αναζήτησης.

* Το:

   ```javascript
   [resultTemplate]="rt"
   ```
   
  ορίζει πώς θα εμφανίζονται τα αντικείμενα που ταιριάζουν με τον όρο
  αναζήτησης που εισάγει ο χρήστης. Τα αντικείμενα αυτά εμφανίζονται
  δυναμικά σε μία λίστα που πέφτει κάτω από το πεδίο αναζήτησης.

* Το:

   ```javascript
   [inputFormatter]="formatter"/>
   ```
   
   ορίζει πώς θα εμφανιστεί το αντικείμενο που επέλεξε τελικά ο χρήστης
   στο πεδίο αναζήτησης.

* Το:

   ```javascript
   (selectItem)="selectedItem($event)"
   ```
  
  ορίζει τι θα γίνει όταν ο χρήστης τελικά επιλέξει ένα αντικείμενο.


</div>

## `book-search.component.ts` (1)

* Αντίστοιχα θα πρέπει να τροποποιήσουμε το `book-search.component.ts`:

   ```javascript
   import { Component } from '@angular/core';
   import { Router } from '@angular/router';

   import { Observable, of } from 'rxjs';

   import {
     debounceTime, distinctUntilChanged, switchMap, tap, catchError
    } from 'rxjs/operators';

   import { Book } from '../book';
   import { BookService } from '../book.service';

   @Component({
     selector: 'app-book-search',
     templateUrl: './book-search.component.html',
     styleUrls: [ './book-search.component.css' ]
   })
   export class BookSearchComponent {
     public model: any;
     searching = false;
     searchFailed = false;

     public books$: Observable<Book[]>;

     constructor(private router: Router,
                 private bookService: BookService) {}

     // Push a search term into the observable stream.
     search = (text$: Observable<string>) =>
       text$.pipe(
         debounceTime(300),
         distinctUntilChanged(),
         tap(() => this.searching = true),
         switchMap(term =>
                   this.bookService.searchBooks(term).pipe(
                     tap(() => this.searchFailed = false),
                     catchError(() => {
                       console.log('Failed!');
                       this.searchFailed = true;
                       return of([]);
                     }))
                  ),
         tap(() => {this.searching = false;})
       )

     formatter(b: Book): string {
       return b.title;
     }

     selectedItem(event) : void {
       var book = event.item;
       this.router.navigate([`/books/${book.id}`]);
     }

   }
   ```


## `book-search.component.css`

* Τέλος, δεν χρειαζόμαστε κανένα από τα στυλ που είχαμε ορίσει για το
  `BookSearchComponent`, οπότε αλλάζουμε το αρχείο
  `book-search.component.css` ώστε να είναι:
  
   ```css
   .search-component {
     margin-top: 1em;
   }

   #search-box {
     width: 20em;
   }
   ```


# Προσθήκη κριτικών

## Επιστροφή στα μοντέλα

* Θέλουμε να προσθέσουμε τη δυνατότητα να βλέπουμε και να προσθέσουμε
  κριτικές στην εφαρμογή μας.

* Για να το κάνουμε αυτό, πρέπει να ξεκινήσουμε από τη back-end
  εφαρμογή που έχουμε γράψει στο Django.


## `models.py`

* Ας θυμηθούμε το αρχείο `models.py` το οποίο περιέχει τα μοντέλα μας:

```python
from django.db import models
from django.utils import timezone

class Book(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField(null=True)
    pub_year = models.IntegerField('date published', default=2000)

    def was_published_recently(self):
        return (self.pub_year >= timezone.now().year - 1)

    def __str__(self):
        return "%s %s %s" % (self.title, self.url, self.pub_year)

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField(default="")
    review_date = models.DateTimeField('review date')

    def __str__(self):
        return "%s %s %s" % (self.title, self.text, self.review_date)


class Author(models.Model):
    name = models.CharField(max_length=200)
    books = models.ManyToManyField(Book)

    def __str__(self):
        return self.name
```

## `serializers.py`

* Θα πρέπει να προσθέσουμε τον κατάλληλο serializer για τις κριτικές
  των βιβλίων:

```python
from rest_framework import serializers
from .models import Book, Review

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'url', 'pub_year')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'title', 'text', 'review_date', 'book')
```

## Επέκταση του API

* Οι κριτικές, μιας και αναφέρονται πάντοτε σε ένα βιβλίο, θα είναι
  προσπελάσιμες μέσω αυτού.

* Έτσι, για να δούμε τις κριτικές ενός βιβλίο, θα δίνουμε:

   ```
   GET /api/books/book_id/reviews
   ```

* Για να δημιουργήσουμε μια κριτική, θα δίνουμε:

   ```
   POST /api/books/book_id/reviews/
   ```

* Ενώ για να αλλάξουμε μια κριτική, θα δίνουμε:

   ```
   PUT /api/books/book_id/reviews/review_id
   ```

## `djbr/urls.py`

* Για να επιτύχουμε τα παραπάνω, αλλάζουμε το αρχείο `djbr/urls.py`
  ώστε να είναι:
  
   ```python
   from django.urls import re_path

   from . import views

   app_name = 'djbr'

   urlpatterns = [
       re_path('^books/?$', views.BookList.as_view()),    
       re_path(r'^books/(?P<pk>\d+)/?$', views.BookDetail.as_view()),
       re_path(r'^books/(?P<book_id>[0-9]+)/reviews/?$',
               views.ReviewList.as_view()),
   ]
   ```

## `views.py`

* Αντίστοιχα, θα προσθέσουμε δύο νέα views, μία για να παίρνουμε όλες
  τις κριτικές, και μία για να μπορούμε να χειριστούμε μία.
  
  ```python
  from .models import Book, Review
  from .serializers import BookSerializer, ReviewSerializer
  from rest_framework import generics

  from django.contrib.staticfiles import views

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

      def get_queryset(self):
          queryset = Review.objects.all()
          book_id = self.kwargs.get('book_id', None)
          if book_id is not None:
              queryset = queryset.filter(book=book_id)
          return queryset

  class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
      queryset = Review.objects.all()
      serializer_class = ReviewSerializer
  ```

<div class="notes">

Η κλάση `ReviewDetail()` δεν έχει καμμία ιδιαιτερότητα. Χειρίζεται μια
συγκεκριμένη κριτική. Το φίλτρο για την εύρεση της κριτικής
εφαρμόζεται αυτομάτως από το Django Rest framework, όπως ακριβώς
γίνεται και τη μέθοδο `BookDetail()`.

Η μέθοδος `ReviewList()` έχει μεγαλύτερο ενδιαφέρον. Οι κριτικές μας
αφορούν πάντοτε συγκεκριμένο βιβλίο. Οι κριτικές αυτές είναι
προσβάσιμες μέσω URL του τύπου:

```
url(r'^books/(?P<book_id>[0-9]+)/reviews/?$', views.ReviewList.as_view()),
```

Όταν η αίτηση φτάνει σε αντικείμενο του τύπου`ReviewList`, η
παράμετρος (όπως και όλες οι τυχόν παράμετροι του URL) είναι
διαθέσιμες μέσω ενός λεξικού `self.kwargs`. Συνεπώς αναζητούμε στο
`self.kwargs` την παράμετρο `book_id` και εφαρμόζουμε το κατάλληλο
φίλτρο με βάση το `book_id` που βρήκαμε.

</div>


## Επιστροφή στο front-end

* Στο front-end τώρα, θα πρέπει να επεκτείνουμε την εφαρμογή του
  Angular ώστε να μπορεί να εμφανίσει και να χειριστεί κριτικές.

* Θα λειτουργήσουμε περίπου όπως και στα βιβλία.


## Δημιουργία κλάσης `Review`

* Δημιουργούμε μια κλάση `Review`, η οποία θα αποτελέσει το μοντέλο
  μας στο front-end:
  
   ```bash
   ng generate class review
   ```

* Θα δούμε ότι δημιουργήθηκε το αρχείο:

   ```
   src/app/review.ts
   ```

## `review.ts`

* Αλλάζουμε το αρχείο `review.ts` ώστε να περιέχει τα παρακάτω:

   ```javascript
   export class Review {
     id: number;
     book: number;
     title: string;
     text: string;
     review_date: Date;
   }
   ```

## Δημιουργία `ReviewsComponent`

* Για την εμφάνιση και το χειρισμό των κριτικών θα δημιουργήσουμε ένα
  εξάρτημα `ReviewsComponent`.

* Δίνουμε:

   ```bash
   ng generate component reviews
   ```
   
* Θα δημιουργηθούν τα αρχεία:

  * `reviews.component.css`
  
  * `reviews.component.html`
  
  * `reviews.component.spec.ts`
  
  * `reviews.component.ts`

* Επίσης, θα ενημερωθεί κατάλληλα το αρχείο `app.module.ts`.


## Δημιουργία `ReviewService`

* Για την επικοινωνία με το back-end όσον αφορά τις κριτικές, θα
χρησιμοποιήσουμε μία υπηρεσία `ReviewService`.

* Δίνουμε:

   ```bash
   ng generate service review
   ```

* Θα δημιουργηθούν τα αρχεία:

  * `review.service.spec.ts`
  
  *  `review.service.ts`


## Ενημέρωση `app.module.ts`

* Θα πρέπει να ενημερώσουμε το αρχείο `app.module.ts` για την υπηρεσία
  που φτιάξαμε.

* Θα πρέπει να την εισάγουμε:
  ```javascript
  import { ReviewService } from './review.service';
  ```

* Θα πρέπει να την προσθέσουμε στους `providers`:
  ```javascript
  providers: [ BookService, MessageService, ReviewService ],
  ```

## Ενημέρωση διαδρομών

* Για να μπορέσουμε να πλοηγηθούμε στις κριτικές, θα πρέπει να τις
  δηλώσουμε στο αρχείο `app-routing.module.ts`:

```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'books/:id/reviews', component: ReviewsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
```


## `reviews.component.html`

* Τώρα μπορούμε να προχωρήσουμε στη δημιουργία του εξαρτήματος για την
  εμφάνιση των κριτικών και τη δημιουργία νέας:

   ```html
   <div class="container">
     <h3>Reviews</h3>

     <div class="row justify-content-start">
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

<div class="notes">

Σε περίπτωση που η φόρμα δεν δουλεύει, και το μήνυμα λάθους έχει σχέση
με CSRT token, πιθανώς η φόρμα σας, άθελά σας, να υποβάλει κάποιο CSRF
token που έχει αποθηκευτεί ως cookie στον browser σας. Θα πρέπει να το
ξεφορτωθείτε· αναζητείστε τα cookies για το domain localhost στον
browser σας και σβήστε τα.

</div>

## `reviews.component.ts`

* Ο κώδικας του `ReviewsComponent` θα χειρίζεται τόσο την εμφάνιση των
  υπάρχοντων κριτικών, όσο και τη δημιουργία νέας:
  
   ```javascript
   import { Component, OnInit } from '@angular/core';
   import { ActivatedRoute, ParamMap } from '@angular/router';

   import { Review } from '../review';
   import { ReviewService } from '../review.service';

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
       private reviewService: ReviewService
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


## `review.service.ts`

* Το `ReviewService` είναι εντελώς αντίστοιχο με το `BookService` που
  έχουμε γράψει παλαιότερα.

   ```javascript
   import { Injectable } from '@angular/core';
   import { HttpClient, HttpHeaders } from '@angular/common/http';

   import { Observable, of } from 'rxjs';
   import { catchError, map, tap } from 'rxjs/operators';

   import { MessageService } from './message.service';

   import { Review } from './review';

   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

   @Injectable({
     providedIn: 'root'
   })
   export class ReviewService {

     constructor(
       private http: HttpClient,
       private messageService: MessageService
     ) { }

     /** GET reviews from the server */
     getReviews(bookId: number): Observable<Review[]> {
       let url = `api/books/${bookId}/reviews`;
       return this.http.get<Review[]>(url)
         .pipe(
           tap(reviews => this.log(`fetched reviews`)),
           catchError(this.handleError('getReviews', []))
         );
     }

     /** POST: add a new review to the server */
     addReview(review: Review): Observable<Review> {
       let url = `api/books/${review.book}/reviews`;
       return this.http.post<Review>(url, review, httpOptions).pipe(
         tap((review: Review) => this.log(`added review w/ id=${review.id}`)),
         catchError(this.handleError<Review>('addReview'))
       );
     }

     /**
      * Handle Http operation that failed.
      * Let the app continue.
      * @param operation - name of the operation that failed
      * @param result - optional value to return as the observable result
      */
     private handleError<T> (operation = 'operation', result?: T) {
       return (error: any): Observable<T> => {

         console.error(error); // log to console instead

         this.log(`${operation} failed: ${error.message}`);

         // Let the app keep running by returning an empty result.
         return of(result as T);
       };
     }

     private log(message: string): void {
       this.messageService.add('ReviewService: ' + message);
     }

   }
   ```


## `book-details.component.html`

* Τέλος, θέλουμε το εξάρτημα των κριτικών να εμφανίζεται στη σελίδα με
  τις λεπτομέρειες ενός βιβλίου:

   ```html
   <div *ngIf="book">
     <h2>{{ book.title }} details:</h2>
     <div class="container">
       <form #bookForm="ngForm">

         <div class="form-group row">
           <label for="bookId" class="col-sm-1 col-form-label">ID</label>
           <div class="col-sm-4">
             <input class="form-control-plaintext" type="text"
                    id="bookId" placeholder={{book.id}} readonly/>
           </div>
         </div>

         <div class="form-group row">
           <label for="bookTitle" class="col-sm-1 col-form-label">Title</label>
           <div class="col-sm-4">
             <input class="form-control"
                    id="bookTitle"
                    name="bookTitle"
                    #title="ngModel"
                    [(ngModel)]="book.title" placeholder="title" required/>
             <div [hidden]="title.valid || title.pristine"
                  class="alert alert-danger">
               Title is required
             </div>
           </div>
         </div>

         <div class="form-group row">
           <label for="bookURL" class="col-sm-1 col-form-label">URL</label>
           <div class="col-sm-4">
             <input class="form-control"
                    id="bookURL"
                    name="bookURL"
                    #url="ngModel"
                    [(ngModel)]="book.url" placeholder="URL" required/>
             <div [hidden]="url.valid || url.pristine"
                  class="alert alert-danger">
               URL is required
             </div>
           </div>
         </div>

         <div class="form-group row">
           <label for="bookPubYear" class="col-sm-1 col-form-label">
             Year</label>
           <div class="col-sm-4">
             <input class="form-control"
                    id="bookPubYear"
                    name="bookPubYear"
                    #pub_year="ngModel"
                    [(ngModel)]="book.pub_year"
                    placeholder="publication year" required/>
             <div [hidden]="pub_year.valid || pub_year.pristine"
                  class="alert alert-danger">
               Publication year is required
             </div>
           </div>
         </div>

         <div class="form-group row">
           <div class="btn-toolbar" role="toolbar">
             <div class="btn-group mr-2" role="group" aria-label="first group">
               <button type="button" class="btn btn-secondary"
                       (click)="goBack()">go back</button>
             </div>
             <div class="btn-group mr-2" role="group" aria-label="first group">
               <button type="button" class="btn btn-primary"
                       (click)="save()">Save</button>
             </div>
           </div>
         </div>
       </form>
     </div>

     <app-reviews></app-reviews>
   </div>
   ```
