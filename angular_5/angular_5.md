% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular2 5

## Γενικά

* Θέλουμε να βελτιώσουμε την πλοήγηση στην εφαρμογή μας.

* Συγκεκριμένα θέλουμε να:
    * πηγαίνουμε από το dashboard σε ένα συγκεκριμένο βιβλίο
    * πηγαίνουμε από τη λίστα των βιβλίων σε ένα συγκεκριμένο βιβλίο
    * πηγαίνουμε κατ' ευθείαν σε ένα συγκεκριμένο βιβλίο εισάγοντας το
      κατάλληλο URL στον browser.

# Angular bangular tutorial 4

## Γενικά

* Συνεχίζουμε προσαρμόζοντας το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.

## Αρχικό στήσιμο

* Ξεκινάμε από την τελευταία έκδοση της εφαρμογής `bangular` που
  είχαμε φτιάξει

* Αυτό σημαίνει ότι έχουμε μία δομή όπως η παρακάτω:

    ```
    bangular/
        node_modules/
        typings/
        app/
            app.component.css
            app.component.html
            app.component.ts
            app.module.ts
            book-detail.component.ts
            book-detail.component.html
            book-service.ts
            book.ts
            books.component.ts
            books.component.css
            books.component.html
            dashboard.component.ts
            dashboard.component.css
            dashboard.component.html
            main.ts
            mock-books.ts
        package.json
        systemjs.config.json
        tsconfig.json
        typings.json
    ```

## Αλλαγή της έκδοσης

* Στο αρχείο `package.json` ενημερώνουμε τον αριθμό έκδοσης,
  αλλάζοντας την κατάλληλη γραμμή σε:

    ```javascript
    "version": "1.4.0",
    ```

## Παραμετροποιημένη διαδρομή

* Θα προσθέσουμε το `id` ενός βιβλίου στο URL.

* Συνεπώς θα έχουμε URL της μορφής:
    ```
    /detail/11
    ```
* Σε αυτά τα URL o αριθμός θα είναι το `id` του συγκεκριμένου βιβλίου.

* Θα αναπαραστήσουμε αυτό το μεταβλητό μέρος του URL με μία
  *παράμετρο* (parameter) ή *token* που αντιστοιχεί στο `id` του
  βιβλίου.


## Δημιουργία παραμετροποιημένης διαδρομής

* Προσθέτουμε την παρακάτω παραμετροποιημένη διαδρομή στο
  `app/app-routing.module.ts`:

    ```javascript
    { path: 'detail/:id', component: BookDetailComponent }
    ```

* Επίσης θα πρέπει να προσθέσουμε το κατάλληλο `import` στο αρχείο:

    ```javascript
    import { BookDetailComponent } from './book-detail.component';
    ```

## Προσαρμογή του `BookDetailComponent`

* Στη συνέχεια θα προσαρμόσουμε αναλόγως το `BookDetailComponent`.

* Συγκεκριμένα, το `BookDetailComponent` θα ξέρει ποιο βιβλίο να
  εμφανίσει από την παράμετρο `id` που έχει επιλεγεί στην τρέχουσα
  διαδρομή `detail/:id`.

* Για το σκοπό αυτό θα χρησιμοποιήσουμε την υπηρεσία (service)
  `ActivatedRoute`.


## Υπηρεσία `ActivatedRoute`

* Η υπηρεσία `ActivatedRoute` μας δίνει πληροφορίες για κάθε διαδρομή.

* Ανάμεσα στις πληροφορίες που μας δίνει περιλαμβάνονται οι παράμετροι
  της διαδρομής.

* Οι παράμετροι της διαδρομής βρίσκονται στην ιδιότητα `params` του
  αντικειμένου `ActivatedRoute`.


## Εισαγωγή απαιτήσεων στο `BookDetailComponent`

* Ξεκινάμε εισάγοντας τα προαπαιτούμενα στο `BookDetailComponent`:

    ```javascript
    import { Component, Input, OnInit } from '@angular/core';
    import { ActivatedRoute, Params } from '@angular/router';
    import { Location } from '@angular/common';

    import { BookService } from './book.service';
    ```

## Δημιουργία κατασκευαστή στο `BookDetailComponent`

* Όπως και στις προηγούμενες περιπτώσεις, θα χρησιμοποιήσουμε έναν
  κατασκευαστή (constructor) για να αποθηκεύσουμε τις υπηρεσίες
  `ActivatedRoute`, `BookService`, και `Location` σε ιδιότητες του
  `BookDetailComponent`:

    ```javascript
      constructor(private bookService: BookService,
                  private route: ActivatedRoute,
                  private location: Location) { }
    ```

## Υλοποίηση `OnInit` (1)

* Το `BookDetailComponent` θα χρησιμοποιεί τη διεπαφή `OnInit`.

* Στη μέθοδο `ngOnInit()` θα λαμβάνει την παράμετρο `id` από την
  τρέχουσα διαδρομή.

* Προσοχή: όλες οι παράμετροι είναι συμβολοσειρές. Για να μετατρέψουμε
  την `id` σε αριθμό, θα πρέπει να χρησιμοποιήσουμε τον τελεστή `+`.


## Υλοποίηση `OnInit` (2)

```javascript
export class BookDetailComponent implements OnInit {

  /* ... */

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.bookService.getΒοοκ(id)
        .then(book => this.book = book);
    });
  }

}
```

## Υλοποίηση του `BookService.getBook()`

* Στην `ngOnInit()` χρησιμοποιούμε μια μέθοδο `getBook()`, του
  `BookService`, την οποία όμως δεν την έχουμε υλοποιήσει ακόμα.

* Συνεπώς την υλοποιούμε αμέσως στο `app/book.service.ts` ως εξής:

    ```javascript
    getBook(id: number): Promise<Book> {
      return this.getBooks()
        .then(books => books.find(book => book.id === id));
    }
    ```

## Πλοήγηση προς τα πίσω (1)

* Πώς μπορεί να επιστρέψει ο χρήστης στην προηγούμενη οθόνη όταν
  βλέπει ένα βιβλίο;

* Μπορεί πάντοτε να πατήσει στο κουμπί back του browser.

* Εναλλακτικά, θα του δώσουμε τη δυνατότητα να πατάει ένα κουμπί Back
  στο εξάρτημα `BookDetailComponent`.


## Πλοήγηση προς τα πίσω (2)

* Υλοποιούμε την παρακάτω μέθοδο στο `BookDetailComponent`:

    ```javascript
    goBack(): void {
      this.location.back();
    }
    ```
* Για να δημιουργήσουμε το κατάλληλο κουμπί, προσθέτουμε το παρακάτω
  στο κάτω μέρος του `app/book-detail.component.html` (πριν κλείσει το
  εξωτερικό `div`):

    ```html
    <button (click)="goBack()">Back</button>
    ```

## Εκκίνηση της εφαρμογής

* Ελέγχουμε ότι όλα πάνε καλά και ότι παρ' όλες τις αλλαγές η εφαρμογή
  παραμένει λειτουργική με:

    ```bash
    npm start
    ```

# Επιλογή βιβλίου από το dasbhoard

## Γενικά

* Όταν ο χρήστης επιλέγει ένα βιβλίο από το dashboard, η εφαρμογή θα
  πρέπει να δείχνει το αντίστοιχο βιβλίο χρησιμοποιώντας το
  `BookDetailComponent`.

* Αν και το dashboard εμφανίζει κουμπιά, στην πραγματικότητα αυτά θα
  συμπεριφέρονται ως σύνδεσμοι.


## Δημιουργία δυναμικού συνδέσμου

* Για να δημιουργήσουμε ένα δυναμικό σύνδεσμο, που θα περιέχει το `id`
  του βιβλίου, αλλάζουμε το `app/dashboard.component.html` ως εξής:

    ```html
    <h3>Top Books</h3>
    <div class="grid grid-pad">
      <a *ngFor="let book of books"
           [routerLink]="['/detail', book.id]" class="col-1-4">
        <div class="module book">
          <h4>{{book.title}}</h4>
        </div>
      </a>
    </div>
    ```

## Εκκίνηση της εφαρμογής

* Ελέγχουμε ότι όλα πάνε καλά και ότι παρ' όλες τις αλλαγές η εφαρμογή
  παραμένει λειτουργική με:

    ```bash
    npm start
    ```
    
* Τώρα ο χρήστης μπορεί να πλοηγηθεί από το dashboard κατ' ευθείαν
  στις λεπτομέρειες των βιβλίων.


# Επιλογή βιβλίου στο `BooksComponent`

## Γενικά

* Η εφαρμογή μας εμφανίζει μια λίστα με βιβλία και από κάτω εμφανίζει
  τις λεπτομέρειες του επιλεγμένου βιβλίου.

* Θα αλλάξουμε την εφαρμογή μας ώστε να δείχνει μόνο λίγες
  λεπτομέρειες στη σελίδα της λίστας.

* Αν ο χρήστης θέλει να δει τις πλήρεις λεπτομέρειες, θα πλοηγείται σε
  διαφορετική σελίδα.


## Προσαρμογή προτύπου `BooksComponent`

* Αλλάζουμε το πρότυπο `app/books.component.ts`:

    ```html
    <h2>Books</h2>
    <ul class="books">
      <li *ngFor="let book of books"
          [class.selected]="book === selectedBook"
          (click)="onSelect(book)">
        <span class="badge">{{book.id}}</span> {{book.title}}
      </li>
    </ul>
    <div *ngIf="selectedBook">
      <h2>
        {{selectedBook.title | uppercase}}
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
    ```

## Διοχετεύσεις (1)

* Προσέξτε την έκφραση:

    ```html
    <h2>
      {{selectedBook.title | uppercase}}
    </h2>
    ```
* Πρόκειται για μία *διοχέτευση* (pipe), που μετατρέπει την έκφραση
  στα αριστερά στα κεφαλαία.

* Το Angular μας επιτρέπει να δημιουργούμε τις δικές μας διοχετεύσεις,
  ή να χρησιμοποιήσουμε μία από τις έτοιμες.


## Διοχετεύσεις (2)

* Το Angular προσφέρει τις παρακάτω έτοιμες διοχετεύσεις:
    * `AsyncPipe`
    * `CurrencyPipe`
    * `DatePipe`
    * `DecimalPipe`
    * `I18nPluralPipe`
    * `I18nSelectPipe`
    * `JsonPipe`
    * `LowerCasePipe`
    * `PercentPipe`
    * `SlicePipe`
    * `UpperCasePipe`


## Πλοήγηση στο `BooksComponent`

* Ακόμα δεν έχουμε υλοποιήσει τη μέθοδο `gotoDetail()` του
  `BooksComponent` στο `app/books.component.ts`.

* Η μέθοδος αυτή θα πλοηγεί το χρήστη στο βιβλίο που επιλέγει.

* Για το σκοπό θα πρέπει να εισάγουμε την κλάση `Router`:

    ```javascript
    import { Router } from '@angular/router';
    ```
    
* Οπότε η υλοποίηση θα είναι:

    ```javascript
    gotoDetail(): void {
      this.router.navigate(['/detail', this.selectedBook.id]);
    }
    ```

## `BooksComponent`

```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from './book';

import { BookDetailComponent } from './book-detail.component';

import { BookService } from './book.service';

@Component({
  moduleId: module.id,
  selector: 'my-books',
  templateUrl: 'books.component.html',
  styleUrls: ['books.component.css'],
  providers: [BookService]
})
export class BooksComponent implements OnInit {
  books: Book[];
  selectedBook: Book;

  constructor(private router: Router,
              private bookService: BookService) { }

  getBooks(): void {
    this.bookService.getBooks().then(books => this.books = books);
  }

  ngOnInit(): void {
    this.getBooks();
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedBook.id]);
  }
}
```

## Καθάρισμα `BookDetailComponent` (1)

* Θυμηθείτε ότι είχαμε δηλώσει στο `BookDetailComponent` το `book` ως
  ιδιότητα εισόδου (input property).

* Αυτό χρειαζόταν γιατί είχαμε στο `app/books.component.html` το εξής:

    ```html
    <book-detail [book]="selectedBook"></book-detail>
    ```
    
* Αυτό όμως πια δεν υπάρχει, οπότε μπορούμε να βγάλουμε το `@Input()`
  και το αντίστοιχο `import`.


## Καθάρισμα `BookDetailComponent` (2)

```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from './book.service';

import { Book } from './book';

@Component({
  moduleId: module.id,
  selector: 'book-detail',
  templateUrl: 'book-detail.component.html'
})
export class BookDetailComponent {
  book: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.bookService.getBook(id)
        .then(book => this.book = book);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
```

## Εκκίνηση της εφαρμογής

* Ελέγχουμε ότι όλα πάνε καλά και ότι παρ' όλες τις αλλαγές η εφαρμογή
  παραμένει λειτουργική με:

    ```bash
    npm start
    ```
    
# Βελτίωση της αισθητικής


## Γενικά

* Η αισθητική της εφαρμογής μας καθορίζεται από αρχεία CSS.

* Στη συνέχεια θα προσθέσουμε τα σχετικά αρχεία.


## `dashboard.component.css` (1)

* Για το dashboard, θα πρέπει να προσθέσουμε την εξής γραμμή στο
  `app/dashboard.component.ts`:

    ```javascript
    styleUrls: [ 'dashboard.component.css' ]
    ```

## `dashboard.component.css` (2)

* Και μετά δημιουργούμε το αρχείο `app/dashboard.component.css`:

    ```css
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
      background-color: #607D8B;
      border-radius: 2px;
    }
    .module:hover {
      background-color: #EEE;
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
    ```

## `book-detail.component.css` (1)

* Για το `BookDetailComponent`, θα πρέπει να προσθέσουμε την εξής γραμμή στο
  `app/book-detail.component.ts`:
  
    ```javascript
    styleUrls: [ 'book-detail.component.css' ]
    ```

## `book-detail.component.css` (2)

* Και μετά δημιουργούμε το αρχείο `app/book-detail.component.css`:

    ```css
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
    ```


## `app.component.css` (1)

* Στο `AppComponent` θα δώσουμε τα απαραίτητα στυλ ώστε να λειτουργούν
  καλύτερα οι σύνδεσμοι, τους οποίους έχουμε βάλει σε στοιχεία
  `<nav>`. 

* Έτσι, στο `AppComponent`, θα πρέπει να προσθέσουμε την εξής γραμμή στο
  `app/app.component.ts`:
  
    ```javascript
    styleUrls: [ 'app.component.css' ]
    ```

## `app.component.css` (2)

* Μετά δημιουργούμε το αρχείο `app/app.component.css`:

    ```css
    h1 {
      font-size: 1.2em;
      color: #999;
      margin-bottom: 0;
    }
    h2 {
      font-size: 2em;
      margin-top: 0;
      padding-top: 0;
    }
    nav a {
      padding: 5px 10px;
      text-decoration: none;
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
    ```

## Τρέχουσα διαδρομή

* Θέλουμε να φαίνεται στο dashboard ότι είναι επιλεγμένη η τρέχουσα
  διαδρομή.

* Για το σκοπό αυτό το Angular μας δίνει το μηχανισμό
  `routerLinkActive`.

* Αλλάζουμε το πρότυπο `app/app.component.ts` αντίστοιχα:

    ```html
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/books" routerLinkActive="active">Books</a>
    </nav>
    <router-outlet></router-outlet>
    ```

## Καθολικά στυλ εφαρμογής

* Τέλος, θα χρησιμοποιήσουμε και τα εξής καθολικά στυλ, στο αρχείο
  `app/styles.css`:

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

    /* items class */
    .items {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 24em;
    }
    .items li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .items li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .items li.selected:hover {
      background-color: #BBD8DC;
      color: white;
    }
    .items .text {
      position: relative;
      top: -3px;
    }
    .items {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 24em;
    }
    .items li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .items li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .items li.selected {
      background-color: #CFD8DC;
      color: white;
    }

    .items li.selected:hover {
      background-color: #BBD8DC;
    }
    .items .text {
      position: relative;
      top: -3px;
    }
    .items .badge {
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
    /* everywhere else */
    * {
      font-family: Arial, Helvetica, sans-serif;
    }


    /*
    Copyright 2016 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license
    */
    ```
