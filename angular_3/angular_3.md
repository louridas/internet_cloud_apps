% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 3

## Γενικά

* Η εφαρμογή μας αποτελείται από ένα μόνο εξάρτημα (component).

* Μια κανονική εφαρμογή όμως αποτελείται κατά κανόνα από περισσότερα.

* Συνεχίζουμε προσαρμόζοντας το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.

## Δημιουργία εξαρτήματος λεπτομερειών

* Αυτή τη στιγμή το εξάρτημα `BooksComponent` είναι αρμόδιο τόσο για την
  εμφάνιση της λίστας των βιβλίων, όσο και την εμφάνιση των
  λεπτομερειών κάθε βιβλίου.

* Θα κάνουμε τις απαραίτητες αλλαγές ώστε να έχουμε ξεχωριστό εξάρτημα
  για την εμφάνιση των λεπτομερειών.


## Δημιουργία `BookDetailComponent`

* Αρχίζουμε δημιουργώντας ένα νέο εξάρτημα:
    ```bash
    ng generate component book-detail
    ```
    
* Με την εντολή αυτή θα δημιουργηθεί ο κατάλογος `src/app/book-detail`
  και μέσα σε αυτόν θα δημιουργηθούν τα αρχεία:
    * `book-detail.component.css`
    * `book-detail.component.html`
    * `book-detail.component.spec.ts`
    * `book-detail.component.ts`
    
* Επίσης θα γίνουν οι απαραίτητες αλλαγές (εισαγωγή και δήλωση) στο
  αρχείο `app.module.ts`.

## Αλλαγές στα πρότυπα

* Θα μεταφέρουμε το κάτω μέρος του προτύπου `books.component.html` στο
  `book-detail.component.html`.
  
* Θα αλλάξουμε τη μεταβλητή `selectedBook` σε `book`, αφού το
  `BookComponent` θα είναι αρμόδιο για την εμφάνιση ενός οποιουδήποτε
  βιβλίου. 


## `book-detail.component.html`

* Έτσι, το αρχείο `book-detail.component.html` θα είναι:
    ```html
    <div *ngIf="book">
    <h2><span appItalics> {{ book.title }}</span> details:</h2>
    <div><label>id: </label>{{book.id}}</div>
    <div>
      <label>title: </label>
      <input [(ngModel)]="book.title" placeholder="name">
    </div>
    <div><label>Publication year: </label>{{book.pub_year}}</div>
    </div>
    ```

## Σκελετός εξαρτήματος

* Ο σκελετός του εξαρτήματος, όπως έχει δημιουργηθεί από το Angular
    CLI, είναι ο εξής:
    ```javascript
    import { Component, OnInit } from '@angular/core';

    @Component({
      selector: 'app-book-detail',
      templateUrl: './book-detail.component.html',
      styleUrls: ['./book-detail.component.css']
    })
    export class BookDetailComponent implements OnInit {

      constructor() { }

      ngOnInit() {
      }

    }
    ```

## Προσθήκη ιδιότητας `book`

* Αφού το `BookDetailComponent` είναι υπεύθυνο για την εμφάνιση ενός
βιβλίου, προσθέτουμε μια ιδιότητα `book` στο `BookDetailComponent`:
    ```javascript
    import { Component, OnInit } from '@angular/core';

    import { Book } from '../book';

    @Component({
      selector: 'app-book-detail',
      templateUrl: './book-detail.component.html',
      styleUrls: ['./book-detail.component.css']
    })
    export class BookDetailComponent implements OnInit {

      book: Book;

      constructor() { }

      ngOnInit() {
      }

    }
    ```

* Προσοχή, θα πρέπει να την εισάγουμε κιόλας (δείτε το σχετικό
  `import` κοντά στην αρχή).


## Αλληλεπίδραση των εξαρτημάτων

* To `BookDetailComponent` πρέπει να ξέρει ποιο βιβλίο θα παρουσιάσει.

* Αυτό θα του το πει το `BooksComponent`.

* Συγκεκριμένα, το πρότυπο `books.component.html` θα αλλάξει και θα
  γίνει:

    ```html
    <h1>{{title}}</h1>
    <h2>Books</h2>
    <ul class="books">
      <li *ngFor="let book of books"
          [class.selected]="book === selectedBook"
          (click)="onSelect(book)">
        <span class="badge">{{book.id}}</span> {{book.title}}
      </li>
    </ul>
    
    <app-book-detail [book]="selectedBook"></app-book-detail>
    ```

## Δήλωση ιδιότητας εισόδου (1)

* Η ιδιότητα `book` είναι ο *αποδέκτης* (target) της διασύνδεσης.

* Αυτό φαίνεται από τη χρήση των `[ ]` γύρω από το όνομά της. Με τον
  τρόπο αυτό την καθιστούμε *ιδιότητα εισόδου* (input property).


## Δήλωση ιδιότητας εισόδου (2)

* Για να λειτουργήσει όμως ως ιδιότητα εισόδου, θα πρέπει να κάνουμε
  την αντίστοιχη δήλωση και στο `BookDetailComponent` χρησιμοποιώντας
  το διακοσμητή `@Input()`:

    ```javascript
    import { Component, OnInit, Input } from '@angular/core';

    import { Book } from '../book';

    @Component({
      selector: 'app-book-detail',
      templateUrl: './book-detail.component.html',
      styleUrls: ['./book-detail.component.css']
    })
    export class BookDetailComponent implements OnInit {

      @Input()
      book: Book;

      constructor() { }

      ngOnInit() {
      }

    }
    ```

<div class="notes">

Προσέξτε ότι έχουμε βάλει το διακοσμητή `@Input()` πριν από τη δήλωση
της μεταβλητής `book`. Κανονικά δεν έχουμε πρόσβαση στα δεδομένα ενός
εξαρτήματος *παρά μόνο από το ίδιο το εξάρτημα*. Εμείς όμως θέλουμε
τώρα να έχουμε πρόσβαση στη μεταβλητή `book` του εξαρτήματος
`BookDetailComponent` από το εξάρτημα `BooksComponent`. Για να γίνει
αυτό πρέπει να το επιτρέψουμε ρητώς. Αυτό ακριβώς κάνει ο διακοσμητής
`@Input()`: υποδεικνύει ότι άλλα εξαρτήματα μπορούν να αλλάξουν την
τιμή της μεταβλητής `book`. Προσέξτε ότι θα πρέπει να εισάγουμε το
`Input` για να μπορούμε να το χρησιμοποιήσουμε.

</div>


## Εκκίνηση της εφαρμογής

* Ελέγχουμε ότι όλα πάνε καλά και ότι παρ' όλες τις αλλαγές η εφαρμογή
παραμένει λειτουργική με:
    ```bash
    ng serve --open
    ```


# Δημιουργία υπηρεσιών

## Γενικά

* Στο Angular, τα δεδομένα που χρειάζονται τα εξαρτήματά μας
  παρέχονται από *υπηρεσίες* (services).

* Στη συνέχεια θα προσαρμόσουμε την εφαρμογή μας ώστε πράγματι, τα
  βιβλία να παρέχονται από μία υπηρεσία στα εξαρτήματα που τα
  χρειάζονται.

* Επίσης θα προσθέσουμε μια υπηρεσία για την εμφάνιση μηνυμάτων στον
  χρήστη. 


## Δημιουργία σκελετού υπηρεσίας

* Δημιουργούμε τον σκελετό της υπηρεσίας με το Angular
  CLI ως εξής:
    ```bash
    ng generate service book
    ```
    
* Σε αυτήν την περίπτωση το Angular CLI θα δημιουργήσει το ακόλουθα
  αρχεία στον κατάλογο `src/app`:
      * `book.service.ts`
      * `book.service.spec.ts`

* Το `book.service.ts` είναι:
    ```javascript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class BookService {

      constructor() { }

    }
    ```

## `@Injectable()`

* Ο διακοσμητής `@Injectable()` που βλέπουμε στον παραπάνω κώδικα
  ενημερώνει το Angular ότι η παρούσα υπηρεσία μπορεί να
  χρησιμοποιήσει άλλες υπηρεσίες μέσω της διαδικασίας *ένθεσης
  εξαρτήσεων* (dependency injection).
  
* Η ένθεση εξαρτήσεων είναι ένα σημαντικό σχεδιαστικό πρότυπο (design
  pattern) που διέπει τη λειτουργία του Angular.
  
* Στην ουσία με την ένθεση εξαρτήσεων οι υλοποιήσεις των εξαρτήσεων
  ορίζονται *τη στιγμή της εκτέλεσης* της εφαρμογής.
  
* Για περισσότερα, δείτε τη [σχετική τεκμηρίωση του
  Angular](https://angular.io/guide/dependency-injection) και
  [γενικότερα στη
  Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection).


## Παροχή βιβλίων

* Το `BookService` θα είναι αρμόδιο για την παροχή βιβλίων στα
  εξαρτήματα της εφαρμογής.

* Αυτή τη στιγμή γράφουμε μια μέθοδο η οποία επιστρέφει τα δεδομένα
  δοκιμών: 
    ```javascript
    import { Injectable } from '@angular/core';

    import { Book } from './book';
    import { BOOKS } from './mock-books';

    @Injectable()
    export class BookService {

      getBooks(): Book[] {
        return BOOKS;
      }

    }
    ```

## Δήλωση της υπηρεσίας

* Για να μπορέσουμε να χρησιμοποιήσουμε την υπηρεσία που φτιάξαμε, την
  εισάγουμε στο `AppComponent`, βάζοντας κάπου στην αρχή:
    ```javascript
    import { BookService } from './book.service';
    ```

* Επίσης, την προσθέτουμε στο πίνακα `providers` του `AppComponent`:
    ```javascript
    providers: [ BookService ],
    ```
    
* Ο πίνακας `providers` υποδεικνύει στο Angular να δημιουργήσει ένα
  μοναδικό στιγμιότυπο του `BookService` και να το παρέχει σε όποια
  κλάση το χρειάζεται.

<div class="notes">

Προκειμένου να μπορεί να γίνει η ένθεση των υπηρεσιών που θέλουμε,
πρέπει να καταγράψουμε (register) τους παρόχους (providers) των
υπηρεσιών αυτών. Η καταγραφή αυτή γίνεται στον πίνακα `providers`. Η
καταγραφή αυτή μπορεί να γίνει είτε στον πίνακα `providers` του
`NgModule`, είτε στον αντίστοιχο πίνακα του επιμέρους εξαρτήματός μας. 

* Αν καταγράψουμε έναν πάροχο στο `NgModule`, η υπηρεσία που παρέχει
  είναι διαθέσιμη στο σύνολο της εφαρμογής μας.

* Αν καταγράψουμε έναν πάροχο σε ένα επιμέρους εξάρτημα, η υπηρεσία
  που παρέχει είναι διαθέσιμη στο εξάρτημα αυτό και στα τυχόν παιδιά
  του.

</div>

## Χρήση της υπηρεσίας

* Στη συνέχεια, θα πρέπει να χρησιμοποιήσουμε το `BookService` στο
  `BooksComponent`. Συγκεκριμένα, θα γίνει ως εξής:
    ```javascript
    import { Component, OnInit } from '@angular/core';

    import { Book } from '../book';
    import { BookService } from '../book.service';

    @Component({
      selector: 'app-books',
      templateUrl: './books.component.html',
      styleUrls: ['./books.component.css'],
    })
    export class BooksComponent implements OnInit {

      books: Book[];
      selectedBook : Book;

      constructor(private bookService: BookService) { }

      ngOnInit() {
        this.getBooks();
      }

      onSelect(book: Book): void {
        this.selectedBook = book;
      }

      getBooks(): void {
        this.books = this.bookService.getBooks();
      }

    }
    ```

## Ένθεση της υπηρεσίας

* Βλέπουμε ότι η χρήση της υπηρεσίας δεν γίνεται απλώς με κάτι του τύπου:
    ```javascript
    bookService = new BookService(); // don't do this
    ```
* Πράγματι, αν κάναμε κάτι τέτοιο:
    * Το `BooksComponent` θα έπρεπε να ξέρει ακριβώς πώς να κατασκευάζει
      ένα `BookService`. Αν αλλάξουμε τον κατασκευαστή (constructor)
      του `BookService`, μπορεί να χρειαστεί να αλλάξουμε τον κώδικα
      σε κάθε σημείο που καλείται.
    * Κάθε φορά δημιουργείται ένα νέο `BookService`, ενώ μπορεί να
      θέλουμε να υπάρχει μόνο ένα για όλα τα εξαρτήματα της εφαρμογής.
    * Το `BooksComponent` δένεται πολύ στενά με τη συγκεκριμένη
      υλοποίηση του `BookService`. Δεν διευκολύνει την εναλλαγή
      διαφορετικών υλοποιήσεων (π.χ. άλλη για ελέγχους και άλλη για
      παραγωγή). 

## Ένθεση εξάρτησης

* Για να αποφύγουμε τα παραπάνω προβλήματα, χρησιμοποιούμε το
  *σχεδιαστικό πρότυπο* (design pattern) *ένθεση εξάρτησης* (dependency
  injection).

* Στην πράξη φτιάχνουμε ένα κατασκευαστή (constructor) του
  `AppComponent` ο οποίος δηλώνει μία ιδιωτική ιδιότητα `bookService`:
  
    ```javascript
    constructor(private bookService: BookService) { }
    ```

* Πλην όμως, αν προσέξετε, *δεν κατασκευάζουμε πουθενά εμείς ένα*
  `BookService`. Το `BookService` κατασκευάζεται από το Angular και
  γίνεται ένθεση (injection) μέσα στο `BookService` αυτομάτως.

<div class="notes">

Στην TypeScript, όλες οι ιδιότητες μιας κλάσεις είναι δημόσιες
(public), εκτός και αν ορίσουμε εμείς ότι είναι ιδιωτικές (private) ή
προστατευμένες (protected).

Αν σε έναν κατασκευαστή χρησιμοποιήσουμε σε μία παράμετρο μία από τις
λέξεις κλειδιά `public`, `private`, ή `protected`, τότε αυτομάτως
δηλώνεται αντίστοιχη ιδιότητα στην κλάση με αυτήν την πρόσβαση. Έτσι,
αυτό:

```javascript
private bookService: BookService;

constructor(bookService: BookService) {
  this.bookService = BookService;
}
```
είναι το ίδιο με αυτό:
```javascript
constructor(private bookService: BookService) { }
```

</div>


## Αρχικοποίηση βιβλίων

* Το `BooksComponent` πρέπει να διαβάζει τα βιβλία καλώντας τη συνάρτηση
  `getBooks()`.

* Πότε όμως θα την καλεί;

* Η εμπειρία λέει ότι *δεν* πρέπει να την καλεί στον κατασκευαστή της.

* Ο κατασκευαστής πρέπει να χρησιμοποιείται μόνο για την αρχικοποίηση
  απλών δεδομένων, *όχι* για την κλήση μεθόδων που μπορεί να απαιτούν
  σύνδεση με άλλα εξαρτήματα, εξυπηρετητές κ.λπ.


## Κύκλος ζωής εξαρτημάτων

* Κάθε εξάρτημα στο Angular έχει έναν κύκλο ζωής.

* Ο κύκλος ζωής αποτελείται από συγκεκριμένα στάδια.


## Διεπαφές σταδίων ζωής

* Μπορούμε να δηλώσουμε τι θα εκτελεστεί σε κάθε στάδιο της ζωής ενός
  εξαρτήματος, υλοποιώντας τις κατάλληλες *διεπαφές* (interfaces), οι
  οποίες είναι:

    * `OnChanges`
    * `OnInit`
    * `DoCheck`
    * `AfterContentInit`
    * `AfterConcentChecked`
    * `AfterViewInit`
    * `AfterViewChecked`
    * `OnDestroy`


## Το στάδιο `OnInit`

* Το στάδιο `OnInit` συμβαίνει στην αρχικοποίηση ενός εξαρτήματος,
  αφού το Angular εμφανίσει τις ιδιότητες που έχουν σύνδεση με
  δεδομένα και αρχικοποιήσει τις ιδιότητες εισόδου.

* Για να το χρησιμοποιήσουμε, υλοποιούμε τη διεπαφή `OnInit`.

* Για να υλοποιήσουμε τη διεπαφή `OnInit` πρέπει να γράψουμε μία
  μέθοδο `ngOnInit()`.

* Αντίστοιχα, κάθε διεπαφή υλοποιείται από μία μέθοδο η οποία ως όνομα
  έχει το `ng` + το όνομα της διεπαφής.


## Υλοποίηση `OnInit`

* Για τους παραπάνω λόγους, στο `BooksComponent` υλοποιήσαμε την
  `ngOnInit()`:
    ```javascript
    ngOnInit() {
      this.getBooks();
    }
    ```
    
* Άρα η μέθοδος `getBooks()`, η οποία χρησιμοποιεί την υπηρεσία
  `BookService`, θα κληθεί έχοντας εξασφαλίσει ότι το `BookService`
  έχει δημιουργηθεί και αρχικοποιηθεί πλήρως.


# Ασύγχρονες υπηρεσίες

## Γενικά

* Η εφαρμογή μας λειτουργεί, διαβάζοντας τα βιβλία και εμφανίζοντάς τα
  στην οθόνη.

* Η λειτουργία αυτή είναι σύγχρονη: στην οθόνη δεν εμφανίζεται τίποτε
  μέχρι να διαβαστούν τα βιβλία.

* Πρέπει όμως πάντοτε οι εφαρμογές μας να είναι φτιαγμένες έτσι ώστε
  να λειτουργούν *ασύγχρονα*, γιατί δεν ξέρουμε πόσος χρόνος μπορεί να
  απαιτηθεί για να μας δώσει αποτελέσματα μια λειτουργία ή υπηρεσία.


## Υποσχέσεις

* Ένας τρόπος με τον οποίο χειριζόμαστε ασύγχρονες υπηρεσίες είναι μέσω
  *υποσχέσεων* (promises).

* Μια υπόσχεση είναι ένα αντικείμενο το οποίο υποκαθιστά τα
  αποτελέσματα που περιμένουμε.


## Καταστάσεις υποσχέσεων

* Μια υπόσχεση μπορεί να βρίσκεται στις εξής καταστάσεις:

    * Εν αναμονή (pending)
        * Διευθετημένη (settled)
            * Εκπληρωμένη (fulfilled)
            * Αθετημένη (rejected) 

* Όταν μια υπόσχεση διευθετηθεί, ενημερωνόμαστε για το αποτέλεσμά της
μέσω κομματιών κώδικα (συναρτήσεων) που έχουμε ορίσει.

* Αν η υπόσχεση έχει εκπληρωθεί, θα εκτελεστεί ο κώδικας που έχουμε
ορίσει χρησιμοποιώντας τη μέθοδο `then()`.

* Αν η υπόσχεση αθετηθεί, θα εκτελεστεί ο κώδικας που έχουμε ορίσει
  χρησιμοποιώντας τη μέθοδο `catch()`.


## Υπόδειγμα Υπόσχεσης

* Ως αποδέκτες μιας υπόσχεσης, ενημερωνόμαστε για την εκπλήρωση ή την
  αθέτησή της δίνοντάς της τον κώδικα που θα πρέπει να εκτελεστεί σε
  κάθε μία από τις δύο περιπτώσεις.
  
* Επειδή ο κώδικας αυτός θα κληθεί όταν η υπόσχεση εκπληρωθεί ή
  αθετηθεί, ονομάζεται *callback*. 
    ```javascript
    promise
    .then(value => { /* fulfillment */ })
    .catch(error => { /* rejection */ });
    ```

<div class="notes">

Επειδή ουσιαστικά η όλη λογική είναι: «κάνε αυτό που σου λέω, και όταν
τελειώσεις, κάλεσέ με να με ενημερώσεις», έχει επικρατήσει ο όρος
callback για το ιδίωμα αυτό.

Τα callbacks είναι πολύ συνηθισμένα στον ασύγχρονο προγραμματισμό: η
συνάρτηση που θα κληθεί (το callback) καλείται ασύγχρονα όταν
εκπληρωθεί ή όταν έχει αθετηθεί η υπόσχεση.

Στον παραπάνω κώδικα, ορίζουμε στην υπόσχεση τι θα πρέπει να κάνει
όταν ολοκληρωθεί:

  * αν έχει εκπληρωθεί, θα εκτελεστεί η συνάρτηση που περνάμε ως
    παράμετρο στο `.then()` και η παράμετρος `value` θα περιέχει το
    αποτέλεσμα της εκπλήρωσης
  * αν έχει αποτύχει, θα εκτελεστεί η συνάρτηση που περνάμε ως
    παράμετρο στο `.catch()` και η παράμετρος `error` θα περιέχει το
    λόγο της αθέτησης

Για (πολλές) περισσότερες πληροφορίες, δείτε [αυτό το
κεφάλαιο](http://exploringjs.com/es6/ch_promises.html), από όπου
    προέρχεται και το παραπάνω παράδειγμα.

</div>


## Υπόσχεση στο `BooksComponent`

* Αλλάζουμε τη μέθοδο `getBooks()` του `BooksComponent` ώστε να
  χρησιμοποιήσει μια υπόσχεση που θα του δίνει το `BookService`:

    ```javascript
    getBooks(): void {
      this.bookService.getBooks().then(books => this.books = books);
    }
    ```
* Όταν η υπόσχεση εκπληρωθεί, ο πίνακας βιβλίων θα βρίσκεται στη
  μεταβλητή `books`, την οποία την αποθηκεύουμε στο `this.books`.

* Δεν ορίζουμε τι θα γίνει σε περίπτωση αθέτησης, γιατί στη
  συγκεκριμένη περίπτωση γνωρίζουμε με σιγουριά ότι δεν θα υπάρξει.


## Ανώνυμες συναρτήσεις με βέλη

* Στην `getBooks()` χρησιμοποιήσαμε μια ανώνυμη συνάρτηση με τον
  τελεστή `=>`.

* Το βασικό συντακτικό είναι ως εξής:

    ```javascript
    (param1, param2, ..., paramN) => { statements }
    (param1, param2, ..., paramN) => expression
      // equivalent to:  => { return expression; }

    // Parentheses are optional when there's only one parameter:
    (singleParam) => { statements }
    singleParam => { statements }

    // A function with no parameters requires parentheses:
    () => { statements }
    ```

## Υπόσχεση στο `BookService`

* Η υπόσχεση δημιουργείται στο `BookService`, όπου θα αλλάξουμε τη
  μέθοδο `getBooks()` ώστε να γίνει:

    ```javascript
    getBooks(): Promise<Book[]> {
      return Promise.resolve(BOOKS);
    }
    ```

* Στη συγκεκριμένη περίπτωση, δημιουργούμε μια υπόσχεση η οποία
  εκπληρώνεται αμέσως με την τιμή `BOOKS`, μέσω της μεθόδου
  `resolve()`.

* Γενικά, η κλήση `Promise.resolve(x)` επιστρέφει μια υπόσχεση η οποία
  εκπληρώνεται με την τιμή `x`.

* Στην πραγματικότητα, η υπόσχεση αυτή θα εκπληρωνόταν όταν θα
  ολοκληρωνόταν η επικοινωνία με τη βάση δεδομένων ή τον εξυπηρετητή
  που έχει τα στοιχεία για τα βιβλία.


## Εμφάνιση μηνυμάτων

* Θα φτιάξουμε ένα εξάρτημα το οποίο θα εμφανίζει μηνύματα στον
  χρήστη, στο κάτω μέρος της εφαρμογής.
  
* Τα μηνύματα θα αποστέλονται μέσω μίας υπηρεσίας που θα φτιάξουμε για
  αυτό το λόγο, τη `MessageService`.
  
* Τα μηνύματα θα εμφανίζονται μέσω ενός εξαρτήματος που επίσης θα
  φτιάξουμε για αυτό το λόγο, το `MessagesComponent`.


## Δημιουργία σκελετού `MessagesComponent`

* Χρησιμοποιούμε το Angular CLI για να δημιουργήσουμε τον σκελετό του
  `MessagesComponent`: 
    ```bash
    ng generate component messages
    ```
  
* Με την εντολή αυτή θα δημιουργηθεί ο κατάλογος `src/app/messages`
  και μέσα σε αυτόν θα δημιουργηθούν τα αρχεία:
    * `messages.component.css`
    * `messages.component.html`
    * `messages.component.spec.ts`
    * `messages.component.ts` 

* Επίσης θα γίνουν οι απαραίτητες αλλαγές (εισαγωγή και δήλωση) στο
  αρχείο `app.module.ts`.


## Προσαρμογή `app.component.html`

* Για να εμφανίζεται το εξάρτημα των μηνυμάτων, αλλάζουμε κατάλληλα το
  `app.component.html`: 
    ```html
    <h1>{{title}}</h1>
    <app-books></app-books>
    <app-messages></app-messages>
    ```

## Δημιουργία σκελετού `MessageService`

* Χρησιμοποιούμε το Angular CLI για να δημιουργήσουμε τον σκελετό του
  `MessagesComponent`: 
    ```bash
    ng generate service message --module=app
    ```
  
* Με την εντολή αυτή θα δημιουργηθούν τα παρακάτω αρχεία στον κατάλογο
  `src/app`: 
    * `message.service.spec.ts`
    * `message.service.ts`

* Επίσης θα γίνουν οι απαραίτητες αλλαγές (εισαγωγή και δήλωση) στο
  αρχείο `app.module.ts`.

* Η παράμετρος `--module=app` δηλώνει ότι η υπηρεσία θα συμπεριληφθεί
  στον πίνακα `providers` του `AppModule` (άρα δεν χρειάζεται να το
  κάνουμε εμείς με το χέρι).
  

## Συγγραφή `MessageService`

* Αλλάζουμε τα περιεχόμενα του `message.service.ts` ώστε να γίνει ως
  εξής:
    ```javascript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class MessageService {

      messages: string[] = [];

      add(message: string) {
        this.messages.push(message);
      }

      clear() {
        this.messages.length = 0;
      }

      constructor() { }

    }
    ```
    
## Χρήση του `MessageService` από το `BookService`

* Για να ενθέσουμε το `MessageService` στο `BookService`, θα πρέπει
  πρώτα να το εισάγουμε σε αυτό.
  
* Στη συνέχεια, θα δηλώσουμε ένα πεδίο `MessageService` δίνοντάς το ως
  παράμετρο στον κατασκευαστή του `BookService`. 
  

## `book.service.ts`

* Άρα το `BookService` θα γίνει:
    ```javascript
    import { Injectable } from '@angular/core';

    import { MessageService } from './message.service';

    import { Book } from './book';
    import { BOOKS } from './mock-books';

    @Injectable()
    export class BookService {

      getBooks(): Promise<Book[]> {
        this.messageService.add('BookService: fetched books');
        return Promise.resolve(BOOKS);
      }

      constructor(private messageService: MessageService) { }

    }
    ```
    
## Εμφάνιση του μηνύματος (1)

* Το μήνυμα που αποστέλει το `BookService` θα εμφανίζεται από το
  `MessagesComponent`. 
  
* Για να το κάνουμε αυτό, θα δηλώσουμε μια ιδιότητα `messageService`
  μέσα στο `MessageComponent`.

* Η ιδιότητα αυτή θα είναι *δημόσια* (public) γιατί θέλουμε να τη
  χρησιμοποιήσουμε στο πρότυπο `messages.component.html`.


## Εμφάνιση του μηνύματος (2)

* To `MessagesComponent` λοιπόν θα γίνει:
    ```javascript
    import { Component, OnInit } from '@angular/core';

    import { MessageService } from '../message.service';

    @Component({
      selector: 'app-messages',
      templateUrl: './messages.component.html',
      styleUrls: ['./messages.component.css'],
    })
    export class MessagesComponent implements OnInit {

      constructor(public messageService: MessageService) {}

      ngOnInit() {
      }

    }
    ```
    
## Πρότυπο `messages.component.html`

* Αλλάζουμε το αρχείο `messages.component.html` ώστε το πρότυπο του
  `MessagesComponent` θα είναι ως εξής:
    ```javascript
    <div *ngIf="messageService.messages.length">

      <h2>Messages</h2>
      <button class="clear"
              (click)="messageService.clear()">clear</button>
      <div *ngFor='let message of messageService.messages'> {{message}} </div>

    </div>
    ```

## Στυλ `MessagesComponent`

* Για τη βελτίωση της εμφάνισης του `MessagesComponent` θα
  χρησιμοποιήσουμε το παρακάτω αρχείο CSS:
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
    Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license
    */
    ```
