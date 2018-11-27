% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 4

## Γενικά

* Θα προσθέσουμε ένα ταμπλό (dashboard) στην εφαρμογή μας.

* Θα μπορούμε να μεταβαίνουμε από το ταμπλό στη λίστα των βιβλίων
  και το τούμπαλιν.

* Θα μπορούμε να επιλέγουμε ένα βιβλίο είτε από το ταμπλό είτε από
  τη λίστα των βιβλίων.

* Συνεχίζουμε προσαρμόζοντας το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.


# Πλοήγηση

## Γενικά {#general-navigation}

* Αντί να εμφανίζεται αυτομάτως η λίστα των βιβλίων, θέλουμε να
  εμφανίζεται ένα ταμπλό.

* Από το ταμπλό θα μπορεί ο χρήστης να πλοηγηθεί στην εφαρμογή
  πατώντας τα κατάλληλα κουμπιά.

* Αυτό θα γίνει χρησιμοποιώντας *δρομολογητές* (routers).


## Ρύθμιση διαδρομών

* Η πλοήγηση ορίζεται με βάση *διαδρομές* (routes).

* Μια διαδρομή επιλέγει το τι θα δείξει ο browser αναλόγως με το
  σύνδεσμο που επιλέγει ο χρήστης.

* Για κάθε διαδρομή ορίζουμε:

  * το μονομάτι (path)
    
  * το εξάρτημα που θα χρησιμοποιηθεί στο συγκεκριμένο μονοπάτι

* Για το χειρισμό των διαδρομών αρμόδιος είναι ένας *δρομολογητής*
  (router). 


## Δημιουργία δρομολογητή `AppRoutingModule`

* Μια καλή πρακτική είναι ο δρομολογητής να είναι ένα άρθρωμα που
  χρησιμοποιείται από το `AppModule`.
  
* Κατά σύμβαση το ονομάζουμε `AppRoutingModule` και το αποθηκεύουμε
  στο αρχείο `app-routing.module.ts`.
  
* Φτιάχνουμε το αρχείο `app-routimg.module.ts` στον κατάλογο `src/app`
  ως εξής:
  
   ```bash
   ng generate module app-routing --flat --module=app
   ```

<div class="notes">

* Το `--flat` σημαίνει ότι το αρχείο θα μπει στον κατάλογο `src/app`
  και όχι σε κάποιον ξεχωριστό δικό του.
  
* Το `--module=app` σημαίνει ότι θα συμπεριληφθεί στον πίνακα
  `imports` του `AppModule`.


## `app-routing.module.ts`

* Το αρχείο που δημιουργήθηκε έχει ως εξής:

   ```javascript
   import { NgModule } from '@angular/core';
   import { CommonModule } from '@angular/common';

   @NgModule({
     imports: [
       CommonModule
     ],
     declarations: []
   })
   ```

* Σβήνουμε το `declarations` και τις αναφορές στο `CommonModule` γιατί
  δεν μας χρειαστούν.


## Προσαρμογή του `AppRoutingModule`

* Στη συνέχεια, προκειμένου να δηλώσουμε τη διαδρομή με την οποία θα
  εμφανίζεται η λίστα των βιβλίων, αλλάζουμε το `AppRoutingModule` ως εξής:

   ```javascript
   import { NgModule } from '@angular/core';
   import { RouterModule, Routes } from '@angular/router';

   import { BooksComponent } from './books/books.component';

   const routes: Routes = [
     { path: 'books', component: BooksComponent }
   ];

   @NgModule({
     imports: [ RouterModule.forRoot(routes) ],
     exports: [ RouterModule ]
   })
   export class AppRoutingModule { }
   ```

## Εισαγωγή-εξαγωγή του `RouterModule`

* Βλέπουμε ότι το `AppRoutingModule` εισάγει *και εξάγει* το
  `RooterModule`.
  
* Εισάγει το `RooterModule` για να μπορεί να ορίσει διαδρομές
  χρησιμοποιώντας αυτήν τη βιβλιοθήκη.
  
* Εξάγει το `RooterModule` έτσι ώστε οδηγίες (directives) που
  ορίζονται από το `RooterModule` να είναι διαθέσιμες στα εξαρτήματα
  του `AppModule`.


## `RouterModule.forRoot()`

* Για να αρχικοποιηθεί ο δρομολογητής και να το χρησιμοποιήσει η
  εφαρμογή μας, πρέπει να:
  
    * τον προσθέσουμε στον πίνακα `imports` του `AppModule`
    * να τον ρυθμίσουμε σύμφωνα με τις διαδρομές που έχουμε ορίσει.
      
* Αυτά τα δύο βήματα εκτελούνται μαζί μέσω της γραμμής:

   ```javascript
   imports: [ RouterModule.forRoot(routes) ]
   ```
    
<div class="notes">

Δεν υπάρχει κάτι μαγικό στη μέθοδο forRoot(). Όταν ένα άρθρωμα
αρχικοποιείται στη βάση της εφαρμογής μας (δηλαδή στο `AppModule`), η
σύμβαση είναι η αρχικοποίηση να γίνεται μέσω μιας μεθόδου με το όνομα
`forRoot()`. Όταν ένα άρθρωμα δεν αρχικοποιείται στη βάση της
εφαρμογής μας, η αρχικοποίηση γίνεται μέσω μια μεθόδου με το όνομα
`forChild()`.

Πιο συγκεκριμένα, ένας δρομολογητής είναι ένα άρθρωμα, το οποίο
περιέχει ανάμεσα στα άλλα τις οδηγίες για τις διαδρομές και μια
υπηρεσία (service) η οποία υλοποιεί τη δρομολόγηση.

Επειδή θέλουμε να έχουμε *μία* μόνο υπηρεσία δρομολόγησης στην
εφαρμογή, θέλουμε να μπορούμε να δημιουργήσουμε δρομολογητές με *μία*,
κοινή υπηρεσία.

Όταν λοιπόν δίνουμε:

```javascript
RouterModule.forRoot(routes)
```

δημιουργείται ένας δρομολογητής ο οποίος περιέχει όλες τις οδηγίες,
όλες τις διαδρομες, και την υπηρεσία.

Αν έχουμε επιπλέον δρομολογητές στην εφαρμογή μας, θα τους
δημιουργούμε με:

```javascript
RouterModule.forRoot(routes)
```

οπότε δημιουργείται ένας δρομολογητής ο οποίος περιέχει όλες τις
οδηγίες και όλες τις διαδρομές, αλλά δεν περιλαμβάνει την υπηρεσία
δρομολόγησης. 

</div>
      

##  Ορισμός διαδρομών

* Κάθε διαδρομή στο Angular ορίζεται μέσω ενός αντικειμένου τύπου
  `Routes`.
  
* Κάθε ένα τέτοιο αντικείμενο έχει συνήθως τις ακόλουθες ιδιότητες:

  * `path`: μια συμβολοσειρά που δείχνει τι θα πρέπει να έχει
    εισαχθεί στο URL του browser.

  * `component`: το εξάρτημα το οποίο θα δημιουργήσει και θα μας
     οδηγήσει ο δρομολογητής.
     

## Οδηγίες πλοήγησης

* Τώρα, θα χρησιμοποιήσουμε το σύνδεσμο `/books` στο πρότυπο του
  `AppComponent`, οπότε το αρχείο `app.component.html` θα γίνει:

   ```html
   <h1>{{title}}</h1>
   <nav>
     <a routerLink="/books">Books</a>
   </nav>
   <router-outlet></router-outlet>
   <app-messages></app-messages>
   ```

* Τα `routerLink` και `routerOutlet` ορίζονται στο `RooterModule` και
  μπορούμε να τα χρησιμοποιήσουμε γιατί, όπως είδαμε:
  
    * τα εξάγουμε από το `AppRoutingModule`
    
    * εισάγουμε το `AppRoutingModule` στο `AppModule`, άρα είναι
      ορατά στα εξαρτήματά του.


## Η οδηγία `RouterOutlet`

* Το `router-outlet` ορίζεται στην *οδηγία* (directive) `RouterOutlet`
  που υπάρχει στο `RooterModule`.
  
* Η οδηγία αυτή υποδεικνύει σε ποιο σημείο της οθόνης θα εμφανιστεί το
  εξάρτημα που θα επιλέξει ο χρήστης μέσω της διαδρομής στο URL του
  browser. 


## Η οδηγία `RouterLink`

* Το `routerLink` ορίζεται στην οδηγία `RouterLink` που υπάρχει στο
  `RooterModule`.

* Όταν ο χρήστης επιλέξει το συγκεκριμένο σύνδεσμο, η οδηγία
  `RouterLink` θα μετατρέψει την επιλογή (κλικ) του χρήστη σε πλοήγηση
  μέσω του δρομολογητή.


# Προσθήκη ταμπλό

## Γενικά {#general-dashboard}

* Θα φτιάξουμε μία κεντρική οθόνη πλοήγησης.

* Έτσι ο χρήστης θα πλοηγείται μεταξύ διαφορετικών όψεων της
  εφαρμογής.


## Δημιουργία ταμπλό

* Θα ξεκινήσουμε την κατασκευή του ταμπλό χρησιμοποιώντας το
  Angular CLI:
  
   ```bash
   ng generate component dashboard
   ```

* Θα δημιουργηθεί ο κατάλογος `src/app/dashboard` και μέσα σε αυτόν τα
  αρχεία:
  
    * `dashboard.component.css`
    
    * `dashboard.component.html`
    
    * `dashboard.component.spec.ts`
    
    * `dashboard.component.ts`
    
* Επίσης θα γίνουν οι απαραίτητες αλλαγές (εισαγωγή, δήλωση) στο
  αρχείο `app.module.ts`.


## Προσαρμογή `dashboard.component.ts`

```javascript
import { Component, OnInit } from '@angular/core';

import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books.slice(1, 5));
  }

}
```

## Προσαρμογή `dashboard.component.html`

* Αλλάζουμε το `dashboard.component.html` ώστε να είναι:

   ```html
   <h3>Top Books</h3>
   <div class="grid grid-pad">
     <a *ngFor="let book of books" class="col-1-4">
       <div class="module book">
         <h4>{{book.title}}</h4>
       </div>
     </a>
   </div>
   ```
    
## Δήλωση της διαδρομής του ταμπλό

* Γνωστοποιούμε τη διαδρομή του ταμπλό στην εφαρμογή μας εισάγοντάς την και
  προσθέτοντάς την στον πίνακα `routes` στο
  `app-routing.module.ts`:

   ```javascript
   import { NgModule } from '@angular/core';
   import { RouterModule, Routes } from '@angular/router';

   import { BooksComponent } from './books/books.component';
   import { DashboardComponent } from './dashboard/dashboard.component';

   const routes: Routes = [
     { path: 'books', component: BooksComponent },
     { path: 'dashboard', component: DashboardComponent }
   ];

   @NgModule({
     imports: [ RouterModule.forRoot(routes) ],
     exports: [ RouterModule ]
   })
   export class AppRoutingModule { }
   ```

## Ανακατεύθυνση

* Όταν ο χρήστης ξεκινάει την εφαρμογή, βρίσκεται στο μονοπάτι `/`.

* Εμείς θα τον *ανακατευθύνουμε* (redirect) στο μονοπάτι `dashboard`.

* Βάζουμε λοιπόν τη διαδρομή αυτή στο `app.routing-module.ts`:

   ```javascript
   import { NgModule } from '@angular/core';
   import { RouterModule, Routes } from '@angular/router';

   import { BooksComponent } from './books/books.component';
   import { DashboardComponent } from './dashboard/dashboard.component';

   const routes: Routes = [
     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
     { path: 'books', component: BooksComponent },
     { path: 'dashboard', component: DashboardComponent }
   ];

   @NgModule({
     imports: [ RouterModule.forRoot(routes) ],
     exports: [ RouterModule ]
   })
   export class AppRoutingModule { }
   ```

## Πλοήγηση στο ταμπλό

* Για να μπορεί ο χρήστης να πλοηγηθεί στο ταμπλό και στη λίστα των
  βιβλίων, θα προσθέσουμε ένα σχετικό σύνδεσμο στο
  `app.component.html`:

   ```html
   <h1>{{title}}</h1>
   <nav>
     <a routerLink="/dashboard">Dashboard</a>
     <a routerLink="/books">Books</a>
   </nav>
   <router-outlet></router-outlet>
   ```

# Πλοήγηση στις λεπτομέρειες βιβλίου

## Γενικά {#general-book-details}

* Οι λεπτομέρειες ενός βιβλίου εμφανίζονται όταν ο χρήστης το
  επιλέγει από τη λίστα των βιβλίων.
  
* Θέλουμε όμως ο χρήστης να μπορεί να πλοηγηθεί στις λεπτομέρειες
  ενός βιβλίου με τρεις τρόπους:
  
    1. όταν ο χρήστης επιλέγει το βιβλίο από τη λίστα των βιβλίων
       (όπως τώρα)
       
    2. όταν ο χρήστης επιλέγει το βιβλίο από τα τέσσερα πρώτα, που
       εμφανίζονται στο ταμπλό
       
    3. όταν ο χρήστης δίνει ένα URL που αντιστοιχεί σε συγκεκριμένο
       βιβλίο

* Θα κάνουμε λοιπόν τις αλλαγές ώστε να μπορούμε να κάνουμε τα
  παραπάνω.
  
  
## Απάλειψη των λεπτομερειών από το `BooksComponent`

* Κατ' αρχήν, θα απαλείψουμε την εμφάνιση των λεπτομερειών από το κάτω
  μέρος του `BooksComponent`.
  
* Όταν ο χρήστης επιλέγει ένα βιβλίο, οι λεπτομέρειες θα εμφανίζονται
  *στη θέση* της λίστας των βιβλίων, και όχι από κάτω της.
  
* Σβήνουμε λοιπόν τη γραμμή:

   ```html
   <app-book-detail [book]="selectedBook"></app-book-detail>
   ```
  από το κάτω μέρος του `books.component.html`.


## `books.component.html`

* Τώρα το `books.component.html` ως πρότυπο περιέχει τον κώδικα μόνο
  για την εμφάνιση της λίστας των βιβλίων:
  
   ```html
   <h2>Books</h2>
   <ul class="books">
     <li *ngFor="let book of books"
         [class.selected]="book === selectedBook"
         (click)="onSelect(book)">
       <span class="badge">{{book.id}}</span> {{book.title}}
     </li>
   </ul>
   ```
    
## Προσθήκη διαδρομής λεπτομερειών βιβλίου

* Για να εμφανιστούν οι λεπτομέρειες ενός βιβλίου θα χρησιμοποιούμε
  URL της μορφής:

   ```
   /detail/13
   ```
  όπου `13` είναι ο κωδικός του βιβλίου.

* Για να το κάνουμε αυτό θα χρησιμοποιήσουμε μια *παραμετροποιημένη*
  διαδρομή, της μορφής:
  
   ```javascript
   { path: 'detail/:id', component: BookDetailComponent }
   ```

* Στο παραπάνω το `:id` θα αντικατασταθεί με το `id` του βιβλίου.


## `app-routing.module.ts`

* Μετά την προσθήκη της διαδρομής στον πίνακα `routes`, το
  `app-routing.module.ts` θα γίνει:
  
   ```javascript
   import { NgModule } from '@angular/core';
   import { RouterModule, Routes } from '@angular/router';

   import { BooksComponent } from './books/books.component';
   import { BookDetailComponent } from './book-detail/book-detail.component';
   import { DashboardComponent } from './dashboard/dashboard.component';

   const routes: Routes = [
     { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
     { path: 'books', component: BooksComponent },
     { path: 'dashboard', component: DashboardComponent },
     { path: 'detail/:id', component: BookDetailComponent },
   ];

   @NgModule({
     imports: [ RouterModule.forRoot(routes) ],
     exports: [ RouterModule ]
   })
   export class AppRoutingModule { }
   ```

<div class="notes">

Για να προστεθεί η διαδρομή, πέρα από την προσθήκη στον πίνακα
`routes`, πρέπει να εισάγουμε το `BookDetailComponent`, όπως και
κάναμε στον παραπάνω κώδικα.

</div>

## Σύνδεσμοι στο `dashboard.component.html`

* Τώρα θέλουμε να υλοποιήσουμε τη δυνατότητα όταν ο χρήστης επιλέγει
  ένα βιβλίο από το ταμπλό να οδηγείται στο εν λόγω βιβλίο.
  
* Για να το κάνουμε αυτό, θα αλλάξουμε στο `dashboard.component.html`
  το:
  
   ```html
   <a *ngFor="let book of books" class="col-1-4">
   ```
  σε:
  
   ```html
   <a *ngFor="let book of books" class="col-1-4"
      routerLink="/detail/{{book.id}}">
    ```

## `dashborad.component.html`

* Μετά την αλλαγή αυτή, το αρχείο `dashboard.component.html` θα γίνει:

   ```html
   <h3>Top Books</h3>
   <div class="grid grid-pad">
     <a *ngFor="let book of books" class="col-1-4"
        routerLink="/detail/{{book.id}}">
       <div class="module book">
         <h4>{{book.title}}</h4>
       </div>
     </a>
   </div>
   ```

## Σύνδεσμοι στο `books.component.html`

* Ομοίως, θέλουμε να υλοποιήσουμε τη δυνατότητα όταν ο χρήστης
  επιλέγει ένα βιβλίο από τη λίστα των βιβλίων να οδηγείται στο εν
  λόγω βιβλίο.

* Για να το κάνουμε αυτό, θα αλλάξουμε στο `books.component.html` το: 

   ```html
   <li *ngFor="let book of books"
     [class.selected]="book === selectedBook"
     (click)="onSelect(book)">
     <span class="badge">{{book.id}}</span> {{book.title}}
   </li>
   ```

   σε:
   
   ```html
   <li *ngFor="let book of books">
     <a routerLink="/detail/{{book.id}}">
       <span class="badge">{{book.id}}</span> {{book.title}}
     </a>
   </li>
   ```
    
## `books.component.html`

* Μετά την αλλαγή αυτή, το αρχείο `books.component.html` θα έχει
  απλοποιηθεί ως εξής:

   ```html
   <h2>Books</h2>
   <ul class="books">
      <li *ngFor="let book of books">
        <a routerLink="/detail/{{book.id}}">
          <span class="badge">{{book.id}}</span> {{book.title}}
        </a>
      </li>
   </ul>
   ```

## Καθαριότητα

* Τώρα πια η μέθοδος `onSelect()` και η ιδιότητα `selectedBook` στο
  `BooksComponent` δεν χρειάζονται πουθενά.
  
* Οπότε καθαρίζουμε το `books.component.ts` από τον κώδικα που πλέον
  δεν χρησιμοποιείται.
  
* Κώδικας που δεν χρησιμοποιείται ονομάζεται *νεκρός κώδικας* (dead
  code).


## `books.component.ts`

* Μετά το ξεκαθάρισμα του κώδικα, το αρχείο `books.component.ts` θα
  είναι:
  
   ```javascript
   import { Component, OnInit } from '@angular/core';

   import { Book } from '../book';
   import { BookService } from '../book.service';

   @Component({
     selector: 'app-books',
     templateUrl: './books.component.html',
     styleUrls: ['./books.component.css']
   })
   export class BooksComponent implements OnInit {

     books : Book[];

     constructor(private bookService: BookService) { }

     ngOnInit() {
       this.getBooks();
     }

     getBooks(): void {
       this.bookService.getBooks()
         .subscribe(books => this.books = books);
     }

   }
   ```
    
## Δρομολόγηση στο `BookDetailComponent`

* Προηγουμένως, το `BooksComponent` έθετε την τιμή της ιδιότητας
  `book` του `BookDetailComponent`, και έτσι το `BookDetailComponent`
  ήξερε ποιο βιβλίο να εμφανίσει.
  
* Αυτό πλέον δεν ισχύει.

* Θα πρέπει να βρει ποιο βιβλίο να εμφανίσει από το URL του browser.


## Έυρεση του βιβλίου προς εμφάνιση

* Για να βρει το `BookDetailComponent` ποιο βιβλίο να δείξει, θα
  πρέπει να εκτελέσει τα παρακάτω βήματα:
  
    1. να βρει τη διαδρομή που του υποδεικνύεται
    
    2. να εξάγει το `id` του βιβλίου από τη διαδρομή αυτή
    
    3. να βρει το συγκεκριμένο βιβλίο από το `BookService`
    

## Εισαγωγή προαπαιτούμενων στο `BookDetailComponent`

* Θα χρειαστεί να προσθέσουμε τα παρακάτω στην αρχή του
  `BookDetailComponent`:
  
   ```javascript
   import { ActivatedRoute } from '@angular/router';
   import { Location } from '@angular/common';

   import { BookService }  from '../book.service';
   ```

* Ο λόγος είναι ότι θα χρησιμοποιήσουμε τις τρεις αυτές υπηρεσίες
  (`ActivateRoute`, `Location`, `BookService`) στη συνέχεια.

<div class="notes">

* Η υπηρεσία `ActivatedRoute` περιέχει την πληροφορία για τη διαδρομή που έχει
  επιλεγεί.
  
* Το `Location` είναι μια υπηρεσία που μας επιτρέπει να αλληλεπιδρούμε
  με τον browser.
  
* Το `BookService` θα το χρειαστούμε για να βρίσκουμε το συγκεκριμένο
  βιβλίο που αντιστοιχεί στην επιλεγμένη διαδρομή.
  
</div>


## Ένθεση των υπηρεσιών

* Για να χρησιμοποιηθούν αυτές οι υπηρεσίες, θα πρέπει να τις
  ενθέσουμε στο `BookDetailComponent`.
  
* Η ένθεση γίνεται απλώς με τη δήλωσή τους ως παραμέτρους στον
  κατασκευαστή:
  
   ```javascript
   constructor(
     private route: ActivatedRoute,
     private bookService: BookService,
     private location: Location
   ) { }
   ```

## Εξαγωγή της παραμέτρου `id`

* Στο `BookDetailComponent` θέλουμε όταν αρχικοποιείται να φέρνει τα
  δεδομένα του συγκεκριμένου βιβλίου. Αυτό θα γίνει από τη μέθοδο
  `ngOnInit()`:
  
   ```javascript
   ngOnInit(): void {
     this.getBook();
   }
   ```

* Οπότε θα πρέπει να υλοποιήσουμε τη μέθοδο `getBook()`:

   ```javascript
   getBook(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.bookService.getBook(id)
       .subscribe(book => this.book = book);
   }
   ```

<div class="notes">

Όταν αρχικοποιείται το `BookDetailComponent`, η μέθοδος `ngOnInit()`
θα καλέσει τη μέθοδο `getBook()` για να φέρει το βιβλίο που
υποδεικνύεται από το URL του browser.

Στη μέθοδο `getBook()` τώρα, το `root.snapshot` μας δίνει τη διαδρομή
που ίσχυε όταν δημιουργήθηκε το εξάρτημα. Το `paramMap` είναι ένα
λεξικό το οποίο περιέχει τις παραμέτρους του URL. Από αυτές λοιπόν
εξάγουμε την παράμετρο `id`. Όλες οι παράμετροι είναι συμβολοσειρές.
Για να μετατρέψουμε την παράμετρο `id` σε αριθμό, της εφαρμόζουμε το
πρόσημο `+`.

Στη συνέχεια η μέθοδος `getBook()` του `BookDetailComponent` καλεί τη
μέθοδο `getBook()` του `BookService`. Αυτήν θα υλοποιήσουμε ευθύς αμέσως.

</div>


## `book-detail.component.ts`

* Με όλες αυτές τις αλλαγές, το `book-detail.component.ts` θα έχει
  μεταλλαχθεί στο παρακάτω:

   ```javascript
   import { Component, OnInit, Input } from '@angular/core';

   import { ActivatedRoute } from '@angular/router';
   import { Location } from '@angular/common';

   import { BookService }  from '../book.service';

   import { Book } from '../book';

   @Component({
     selector: 'app-book-detail',
     templateUrl: './book-detail.component.html',
     styleUrls: ['./book-detail.component.css']
   })
   export class BookDetailComponent implements OnInit {

     @Input()
     book: Book;

     constructor(
       private route: ActivatedRoute,
       private bookService: BookService,
       private location: Location
     ) { }

     ngOnInit(): void {
        this.getBook();
     }

     getBook(): void {
       const id = +this.route.snapshot.paramMap.get('id');
       this.bookService.getBook(id)
         .subscribe(book => this.book = book);
     }

   }
   ```

## Υλοποίηση `getBook()` στο `BookService`

* Το `getBook()` επιστρέφει ένα `Observable` το οποίο θα περιέχει το
  βιβλίο με το συγκεκριμένο `id`:
  
    ```javascript
    getBook(id: number): Observable<Book> {
      this.messageService.add(`BookService: fetched book id=${id}`);
      return of(BOOKS.find(book => book.id === id));
    }
    ```

* Προσέξτε ότι με τα backticks (\` \`) μπορούμε να ενσωματώσουμε την
  τιμή της μεταβλητής `id` μέσα στη συμβολοσειρά με το συντακτικό
  `${id}`.


## `book.service.ts`

* Το `book.service.ts` με την προσθήκη της `getBook()` θα γίνει:

   ```javascript
   import { Injectable } from '@angular/core';
   import { Observable, of } from 'rxjs';

   import { MessageService } from './message.service';

   import { Book } from './book';
   import { BOOKS } from './mock-books';

   @Injectable({
     providedIn: 'root'
   })
   export class BookService {

     constructor(private messageService: MessageService) { }

     getBooks(): Observable<Book[]> {
       this.messageService.add('BookService: fetched books');
       return of(BOOKS);
     }

     getBook(id: number): Observable<Book> {
       this.messageService.add(`BookService: fetched book id=${id}`);
       return of(BOOKS.find(book => book.id === id));
     }

   }
   ```
    
<div class="notes">

Προσέξτε ότι και στο `getBook()`, όπως και στο `getBooks()`, τα
μηνύματα που στέλνονται με το `MessageService` δεν είναι χρονικώς
ακριβή. Στέλνονται *πριν* το `MessageService` φέρει το βιβλίο, όχι
μετά. Αλλά επειδή στη συγκεκριμένη περίπτωση ξέρουμε ότι η υπόσχεση θα
εκπληρωθεί αμέσως, μπορούμε να το αφήσουμε έτσι, τουλάχιστον σε ένα
εκπαιδευτικό παράδειγμα όπως αυτό.

</div>


## Επιστροφή

* Αν θέλουμε να πλοηγηθούμε προς τα πίσω, μπορούμε πάντοτε να
  χρησιμοποιήσουμε το αντίστοιχο κουμπί του browser μας.
  
* Αλλά καλό θα ήταν να είχαμε και ένα αντίστοιχο κουμπί μέσα στην
  εφαρμογή μας. 
  

## Κουμπί επιστροφής

* Προσθέτουμε ένα κουμπί επιστροφής στο τέλος του
  `book-detail.component.html`:
  
   ```html
   <div *ngIf="book">
     <h2>{{ book.title }} details:</h2>
     <div><label>id: </label>{{book.id}}</div>
     <div>
       <label>title: </label>
       <input [(ngModel)]="book.title" placeholder="name">
     </div>
      <div><label>URL: </label> {{ book.url }} </div>
      <div><label>Publication year: </label>{{book.pub_year}}</div>
      <button (click)="goBack()">go back</button>
   </div>
   ```

<div class="notes">

Όταν ο χρήστης πατάει το κουμπί αυτό, θα καλείται η μέθοδος `goBack()`
του `BookDetailComponent`, την οποία πρέπει να ορίσουμε.

</div>


## Η μέθοδος `goBack()`

* Ορίζουμε τη μέθοδο `goBack()` στο `BookDetailComponent`:

   ```javascript
   goBack(): void {
     this.location.back();
   }
   ```
    
* Η υπηρεσία `Location` που ενθέσαμε προηγουμένως μας επιτρέπει να
  μεταβούμε στις προηγούμενες τοποθεσίες που έχουμε επισκεπτεί με τον
  browser μας.
  

## `book-detail.component.ts`

* Μετά την προσθήκη της μεθόδου `goBack()`, το
  `book-detail.component.ts` θα είναι:
  
   ```javascript
   import { Component, OnInit, Input } from '@angular/core';

   import { ActivatedRoute } from '@angular/router';
   import { Location } from '@angular/common';

   import { BookService }  from '../book.service';

   import { Book } from '../book';

   @Component({
     selector: 'app-book-detail',
     templateUrl: './book-detail.component.html',
     styleUrls: ['./book-detail.component.css']
   })
   export class BookDetailComponent implements OnInit {

     @Input()
     book: Book;

     constructor(
       private route: ActivatedRoute,
       private bookService: BookService,
       private location: Location
     ) { }

     ngOnInit(): void {
        this.getBook();
     }

     getBook(): void {
       const id = +this.route.snapshot.paramMap.get('id');
       this.bookService.getBook(id)
         .subscribe(book => this.book = book);
     }

     goBack(): void {
         this.location.back();
     }

   }
   ```
    
# Αισθητική

## Γενικά {#general-styles}

* Για τη βελτίωση της αισθητικής της εφαρμογής χρησιμοποιούμε αρχεία
  CSS.
  
* Αυτά μπορούν να εφαρμόζονται είτε στο σύνολο της εφαρμογής, είτε στα
  επιμέρους εξαρτήματα.


## Καθολικό στυλ

* Εκτός από τα επιμέρους στυλ που εφαρμόζονται στα εξαρτήματα, στο
  αρχείο `src/styles.css` ορίζουμε το καθολικό στυλ της εφαρμογής:
  
   ```css
   /* Master Styles */
   h1 {
     color: #369;
     font-family: Arial, Helvetica, sans-serif;
     font-size: 250%;
   }
   h2, h3 {
     color: #444;
     font-family: Arial, Helvetica, sans-serif;
     font-weight: lighter;
   }
   body {
     margin: 2em;
   }
   body, input[text], button {
     color: #888;
     font-family: Cambria, Georgia;
   }
   a {
     cursor: pointer;
     cursor: hand;
   }
   button {
     font-family: Arial;
     background-color: #eee;
     border: none;
     padding: 5px 10px;
     border-radius: 4px;
     cursor: pointer;
     cursor: hand;
   }
   button:hover {
     background-color: #cfd8dc;
   }
   button:disabled {
     background-color: #eee;
     color: #aaa;
     cursor: auto;
   }

   /* Navigation link styles */
   nav a {
     padding: 5px 10px;
     text-decoration: none;
     margin-right: 10px;
     margin-top: 10px;
     display: inline-block;
     background-color: #eee;
     border-radius: 4px;
   }
   nav a:visited, a:link {
     color: #607D8B;
   }
   nav a:hover {
     color: #039be5;
     background-color: #CFD8DC;
   }
   nav a.active {
     color: #039be5;
   }

   /* everywhere else */
   * {
     font-family: Arial, Helvetica, sans-serif;
   }


   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```

## Προσαρμογή `dashboard.component.css`

* Για τη βελτίωση της αισθητικής του ταμπλό, θα χρησιμοποιήσουμε το
   αρχείο `dashboard.component.css`, το οποίο αφορά *μόνο* το
   συγκεκριμένο εξάρτημα:
    
   ```css
   /* DashboardComponent's private CSS styles */
   [class*='col-'] {
     float: left;
     padding-right: 20px;
     padding-bottom: 20px;
   }
   [class*='col-']:last-of-type {
     padding-right: 0;
   }
   a {
     text-decoration: none;
   }
   *, *:after, *:before {
     -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
     box-sizing: border-box;
   }
   h3 {
     text-align: center; margin-bottom: 0;
   }
   h4 {
     position: relative;
   }
   .grid {
     margin: 0;
   }
   .col-1-4 {
     width: 25%;
   }
   .module {
     padding: 20px;
     text-align: center;
     color: #eee;
     max-height: 120px;
     min-width: 120px;
     background-color: #607d8b;
     border-radius: 2px;
   }
   .module:hover {
     background-color: #eee;
     cursor: pointer;
     color: #607d8b;
   }
   .grid-pad {
     padding: 10px 0;
   }
   .grid-pad > [class*='col-']:last-of-type {
     padding-right: 20px;
   }
   @media (max-width: 600px) {
     .module {
       font-size: 10px;
       max-height: 75px; }
   }
   @media (max-width: 1024px) {
     .grid {
       margin: 0;
     }
     .module {
       min-width: 60px;
     }
   }


   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```


## `book-detail.component.css`

* Ομοίως το αρχείο `book-detail.component.css` ορίζει το στυλ του
  `BookDetailComponent` και μόνο αυτό:
  
   ```css
   /* HeroDetailComponent's private CSS styles */
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
   button {
     margin-top: 20px;
     font-family: Arial;
     background-color: #eee;
     border: none;
     padding: 5px 10px;
     border-radius: 4px;
     cursor: pointer; cursor: hand;
   }
   button:hover {
     background-color: #cfd8dc;
   }
   button:disabled {
     background-color: #eee;
     color: #ccc;
     cursor: auto;
   }


   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
    ```

## `books.component.css`

* Το στυλ του `BooksComponent` θα διέπεται από το αρχείο
  `books.component.css`: 
  
   ```css
   /* BooksComponent's private CSS styles */
   .books {
     margin: 0 0 2em 0;
     list-style-type: none;
     padding: 0;
     width: 15em;
   }
   .books li {
     position: relative;
     cursor: pointer;
     background-color: #EEE;
     margin: .5em;
     padding: .3em 0;
     height: 1.6em;
     border-radius: 4px;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }

   .books li:hover {
     color: #607D8B;
     background-color: #DDD;
     left: .1em;
   }

   .books a {
     color: #888;
     text-decoration: none;
     position: relative;
   }

   .books a:hover {
     color:#607D8B;
   }

   .books .badge {
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
     min-width: 16px;
     text-align: right;
     margin-right: .8em;
     border-radius: 4px 0 0 4px;
   }


   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```
    
## `messages.component.css`

* Τέλος, η εμφάνιση του `MessagesComponent` θα διέπεται από το
  `messages.component.css`:
  
   ```css
   /* MessagesComponent's private CSS styles */
   h2 {
     color: red;
     font-family: Arial, Helvetica, sans-serif;
     font-weight: lighter;
   }
   body {
     margin: 2em;
   }
   body, input[text], button {
     color: crimson;
     font-family: Cambria, Georgia;
   }

   button.clear {
     font-family: Arial;
     background-color: #eee;
     border: none;
     padding: 5px 10px;
     border-radius: 4px;
     cursor: pointer;
     cursor: hand;
   }
   button:hover {
     background-color: #cfd8dc;
   }
   button:disabled {
     background-color: #eee;
     color: #aaa;
     cursor: auto;
   }
   button.clear {
     color: #888;
     margin-bottom: 12px;
   }


   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```
