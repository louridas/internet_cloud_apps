% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 3

## Γενικά

* Η εφαρμογή μας αποτελείται από ένα μόνο εξάρτημα (component).

* Μια κανονική εφαρμογή όμως αποτελείται κατά κανόνα από περισσότερα.

# Angular bangular tutorial 2

## Γενικά

* Συνεχίζουμε προσαρμόζοντας το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.

## Αρχικό στήσιμο

* Ξεκινάμε από την τελευταία έκδοση της εφαρμογής `bangular` που
  είχαμε φτιάξει.

* Αυτό σημαίνει ότι έχουμε μία δομή όπως η παρακάτω:
    ```
    bangular/
    ├── README.md
    ├── e2e
    │   ├── app.e2e-spec.ts
    │   ├── app.po.ts
    │   └── tsconfig.e2e.json
    ├── karma.conf.js
    ├── node_modules [753 entries exceeds filelimit, not opening dir]
    ├── package.json
    ├── protractor.conf.js
    ├── src
    │   ├── app
    │   │   ├── app.component.css
    │   │   ├── app.component.html
    │   │   ├── app.component.spec.ts
    │   │   ├── app.component.ts
    │   │   ├── app.module.ts
    │   ├── assets
    │   ├── environments
    │   │   ├── environment.prod.ts
    │   │   └── environment.ts
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── main.ts
    │   ├── polyfills.ts
    │   ├── styles.css
    │   ├── test.ts
    │   ├── tsconfig.app.json
    │   ├── tsconfig.spec.json
    │   └── typings.d.ts
    ├── tsconfig.json
    └── tslint.json
    ```

## Αλλαγή της έκδοσης

* Στο αρχείο `package.json` ενημερώνουμε τον αριθμό έκδοσης,
  αλλάζοντας την κατάλληλη γραμμή σε:

    ```javascript
    "version": "1.1.0",
    ```

## Δημιουργία εξαρτήματος λεπτομερειών

* Αυτή τη στιγμή το εξάρτημα `AppComponent` είναι αρμόδιο τόσο για την
  εμφάνιση της λίστας των βιβλίων, όσο και την εμφάνιση των
  λεπτομερειών κάθε βιβλίου.

* Θα κάνουμε τις απαραίτητες αλλαγές ώστε να έχουμε ξεχωριστό εξάρτημα
  για την εμφάνιση των λεπτομερειών.

## `app.component.html`

* Ας θυμηθούμε λοιπόν πώς είναι το `app.component.html`:
    ```javascript
    <h1>{{title}}</h1>

    <h2>Books</h2>
    <ul class="books">
      <li *ngFor="let book of books"
          [class.selected]="book === selectedBook"
          (click)="onSelect(book)">
        <span class="badge">{{book.id}}</span> {{book.title}}
      </li>
    </ul>

    <div *ngIf="selectedBook">
      <h2>{{selectedBook.title}} details:</h2>
      <div><label>id: </label>{{selectedBook.id}}</div>
      <label>title: </label>
      <input [(ngModel)]="selectedBook.title" placeholder="name">
      <div><label>Publication year: </label>{{selectedBook.pub_year}}</div>
    </div>
    ```

<div class="notes">

Πράγματι, βλέπουμε ότι περιγράφει την εμφάνιση τόσο της λίστας των
βιβλίων, όσο και του επιλεγμένου βιβλίου. Αλλά η λογική πίσω από τα
εξαρτήματα είναι ότι το κάθε ένα αυτά είναι υπεύθυνο για την εμφάνιση
συγκεκριμένων δεδομένων σε συγκεκριμένο σημείο της οθόνης. Εδώ λοιπόν
θα θέλαμε το `AppComponent` να είναι υπεύθυνο *μόνο* για τη λίστα των
βιβλίων, και ένα άλλο εξάρτημα για την εμφάνιση ενός συγκεκριμένου
βιβλίου. 

</div>


## `book-detail.component.ts` (1)

* Δημιουργούμε το αρχείο `book-detail.component.ts` στο οποίο
δηλώνουμε το `BookDetailComponent`:

    ```javascript
    import { Component, Input } from '@angular/core';

    @Component({
      selector: 'book-detail'
      templateUrl: 'book-detail.component.html',
    })
    export class BookDetailComponent {
    }
    ```


## `book-detail.component.ts` (2)

* Εισάγουμε το διακοσμητή `Component`, αφού τον χρησιμοποιούμε άμεσα
  στη δήλωση του `BookDetailComponent`.

* Ο διακοσμητής `Input` δεν μας χρειάζεται ακόμα, αλλά θα μας
  χρειαστεί σύντομα.

* Δηλώνουμε το όνομα, `book-detail`, που θα έχει το στοιχείο HTML το
  οποίο θα αντιστοιχεί στο εξάρτημα που κατασκευάζουμε.

* Επίσης δίνουμε και το όνομα του προτύπου. `book.component.html`, το
  οποίο θα έχει τον κώδικα HTML για την εμφάνιση του βιβλίου.

* Εξάγουμε το `BookDetailComponent` ώστε να μπορούν να το
  χρησιμοποιήσουν και άλλα μέρη της εφαρμογής μας.


## Πρότυπο του `BookDetailComponent` (1)

* Όπως είπαμε, το `BookDetailComponent` θα έχει το δικό του πρότυπο, στο αρχείο
  `book-detail.component.html`:

    ```html
    <div *ngIf="book">
      <h2>{{book.title}} details:</h2>
      <div><label>id: </label>{{book.id}}</div>
      <label>title: </label>
      <input [(ngModel)]="book.title" placeholder="title">
      <div><label>Publication year: </label>{{book.pub_year}}</div>
    </div>
    ```

## Πρότυπο του `BookDetailComponent` (2)

* Προσέξτε ότι προηγουμένως χρησιμοποιούσαμε τη μεταβλητή `selectedBook` στο
  `app.component.html` για να αναφερόμαστε στο επιλεγμένο βιβλίο.

* Το `BookDetailComponent` ούτως ή άλλως θα αναφέρεται σε ένα
  συγκεκριμένο βιβλίο, άρα μετονομάσαμε την ιδιότητα αυτή απλώς σε
  `book`.

## Προσθήκη ιδιότητας `book`

* Προσθέτουμε λοιπόν την ιδιότητα `book` στο `BookDetailComponent`:

    ```javascript
    import { Component, Input } from '@angular/core';

    @Component({
      selector: 'book-detail',
      templateUrl: 'book-detail.component.html',
    })
    export class BookDetailComponent {
      book: Book
    }
    ```

## Δημιουργία ανεξάρτητου αρχείου `book.ts`

* Το πρόβλημα τώρα είναι ότι η κλάση `Book` βρίσκεται μόνο μέσα στο
  `AppComponent`, ενώ τη χρειαζόμαστε και στο `BookDetailComponent`.

* Για να το λύσουμε αυτό, τη βγάζουμε από το `AppComponent` και τη
  βάζουμε στο δικό της αρχείο, `book.ts`:

    ```javascript
    export class Book {
      id: number;
      title: string;
      pub_year: number;
    }
    ```
    
## Εισαγωγή της κλάσης `Book`

* Τώρα, θα πρέπει να εισαχθεί η κλάση `Book` τόσο στο `AppComponent`
  όσο και στο `BookDetailComponent`.

* Για να το κάνουμε αυτό, βάζουμε κοντά στην αρχή του
  `app.component.ts` και του `book-detail.component.ts` την
  εξής γραμμή:

    ```javascript
    import { Book } from './book';
    ```

## Αλληλεπίδραση των εξαρτημάτων

* To `BookDetailComponent` πρέπει να ξέρει ποιο βιβλίο θα παρουσιάσει.

* Αυτό θα του το πει το `AppComponent`.

* Συγκεκριμένα, το πρότυπο `app.component.html` θα αλλάξει και θα
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
    <book-detail [book]="selectedBook"></book-detail>
    ```

## Δήλωση ιδιότητας εισόδου

* Η ιδιότητα `book` είναι ο *αποδέκτης* (target) της διασύνδεσης.

* Αυτό φαίνεται από τη χρήση των `[ ]` γύρω από το όνομά της. Με τον
  τρόπο αυτό την καθιστούμε *ιδιότητα εισόδου* (input property).

* Για να λειγουργήσει όμως ως ιδιότητα εισόδου, θα πρέπει να κάνουμε
  την αντίστοιχη δήλωση και στο `BookDetailComponent`:

    ```javascript
    import { Component, Input } from '@angular/core';

    import { Book } from './book';

    @Component({
      moduleId: module.id,
      selector: 'book-detail',
      templateUrl: 'book-detail.component.html'
    })
    export class BookDetailComponent {
      @Input()
      book: Book;
    }
    ```

<div class="notes">

Προσέξτε ότι έχουμε βάλει το διακοσμητή `@Input()` πριν από τη δήλωση
της μεταβλητής `book`. Κανονικά δεν έχουμε πρόσβαση στα δεδομένα ενός
εξαρτήματος *παρά μόνο από το ίδιο το εξάρτημα*. Εμείς όμως θέλουμε
τώρα να έχουμε πρόσβαση στη μεταβλητή `book` του εξαρτήματος
`BookDetailComponent` από το εξάρτημα `AppComponent`. Για να γίνει
αυτό πρέπει να το επιτρέψουμε ρητώς. Αυτό ακριβώς κάνει ο διακοσμητής
`@Input()`: υποδεικνύει ότι άλλα εξαρτήματα μπορούν να αλλάξουν την
τιμή της μεταβλητής `book`.

</div>

## Δήλωση του `BookDetailComponent` (1)

* Για να δέσουν όλα μεταξύ τους, θα πρέπει να εισαχθεί το
  `BookDetailComponent` στο `AppComponent`, οπότε προσθέτουμε, κοντά
  στην αρχή του `AppComponent`:

    ```javascript
    import { BookDetailComponent } from './book-detail.component';
    ```

## Δήλωση του `BookDetailComponent` (2)

* Επίσης, πρέπει να το προσθέσουμε στα εξαρτήματα που χρησιμοποιεί το
  `AppComponent`, οπότε το `app.module.ts` θα γίνει:
    ```javascript
    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule }   from '@angular/forms';

    import { AppComponent }   from './app.component';
    import { BookDetailComponent }   from './book-detail.component';

    @NgModule({
      imports:      [
        BrowserModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        BookDetailComponent
      ],
      bootstrap:    [ AppComponent ]
    })
    export class AppModule { }
    ```

<div class="notes">

Γενικότερα, ο πίνακας `declarations` περιέχει όλα τα εξαρτήματα
(μεταξύ άλλων) που ανήκουν στο συγκεκριμένο άρθρωμα (module). Ένα
εξάρτημα πρέπει να δηλωθεί εκεί προκειμένου να είναι ορατό σε άλλα
εξαρτήματα· δεν αρκεί απλώς να το εισάγουμε σε αυτά.

</div>

## Δομή της εφαρμογής

* Επιβεβαιώνουμε ότι η εφαρμογή μας τώρα έχει την ακόλουθη δομή:

    ```
    bangular/
    ├── README.md
    ├── e2e
    │   ├── app.e2e-spec.ts
    │   ├── app.po.ts
    │   └── tsconfig.e2e.json
    ├── karma.conf.js
    ├── node_modules [753 entries exceeds filelimit, not opening dir]
    ├── package.json
    ├── protractor.conf.js
    ├── src
    │   ├── app
    │   │   ├── app.component.css
    │   │   ├── app.component.html
    │   │   ├── app.component.spec.ts
    │   │   ├── app.component.ts
    │   │   ├── app.module.ts
    │   │   ├── book-detail.component.html
    │   │   ├── book-detail.component.ts
    │   │   ├── book.ts
    │   ├── assets
    │   ├── environments
    │   │   ├── environment.prod.ts
    │   │   └── environment.ts
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── main.ts
    │   ├── polyfills.ts
    │   ├── styles.css
    │   ├── test.ts
    │   ├── tsconfig.app.json
    │   ├── tsconfig.spec.json
    │   └── typings.d.ts
    ├── tsconfig.json
    └── tslint.json
    ```


## Εκκίνηση της εφαρμογής

* Ελέγχουμε ότι όλα πάνε καλά και ότι παρ' όλες τις αλλαγές η εφαρμογή
  παραμένει λειτουργική με:
    ```bash
    ng serve --open
    ```


# Δημιουργία υπηρεσίας

## Γενικά

* Στο Angular, τα δεδομένα που χρειάζονται τα εξαρτήματά μας
  παρέχονται από *υπηρεσίες* (services).

* Στη συνέχεια θα προσαρμόσουμε την εφαρμογή μας ώστε πράγματι, τα
  βιβλία να παρέχονται από μία υπηρεσία στα εξαρτήματα που τα
  χρειάζονται.

## Αλλαγή της έκδοσης

* Στο αρχείο `package.json` ενημερώνουμε τον αριθμό έκδοσης,
  αλλάζοντας την κατάλληλη γραμμή σε:

    ```javascript
    "version": "1.2.0",
    ```

## Δημιουργία της υπηρεσίας

* Δημιουργούμε το αρχείο `book.service.ts`:

    ```javascript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class BookService {
    }
    ```

* Ο διακοσμητής `@Injectable` μπορεί να χρησιμοποιηθεί για να
  προσδώσουμε εξαρτήσεις στο `BookService`. Αν και αυτή τη στιγμή δεν
  μας χρειάζεται, είναι καλό να τον βάλουμε.


## Παροχή βιβλίων

* Το `BookService` θα είναι αρμόδιο για την παροχή βιβλίων στα
  εξαρτήματα της εφαρμογής.

* Αυτή τη στιγμή γράφουμε μια κενή μέθοδο, την οποία θα τη
  συμπληρώσουμε στη συνέχεια:

    ```javascript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class BookService {
      getBooks(): void { } // stub
    }
    ```

## Δεδομένα δοκιμών (1)

* Έχουμε τοποθετήσει στοιχεία για μερικά βιβλία στο `AppComponent`.

* Θα τα βγάλουμε από εκεί, και θα τα αποθηκεύσουμε σε ένα ξεχωριστό
  αρχείο, από όπου θα τα διαβάζει το `BookService`.

* Σε μία πραγματική εφαρμογή, το `BookService` θα τα διάβαζε ίσως από
  έναν εξυπηρετητή ή μια βάση δεδομένων.


## Δεδομένα δοκιμών (2)

* Δημιουργούμε το αρχείο `mock-books.ts`:
    ```javascript
    import { Book } from './book';

    export const BOOKS: Book[] = [
      { id: 11, title: 'Infinite Jest', pub_year: 1996},
      { id: 12, title: 'Oblivion', pub_year: 2004 },
      { id: 13, title: 'Ulysses', pub_year: 1922 },
      { id: 14, title: 'The Crying of Lot 49', pub_year: 1966 },
      { id: 15, title: 'City on Fire', pub_year: 2015 },
      { id: 16, title: 'The Narrow Road to the Deep North', pub_year: 2013 },
      { id: 17, title: 'The Dispossessed', pub_year: 1974 },
      { id: 18, title: 'The Left Hand of Darkness', pub_year: 1969 },
      { id: 19, title: 'A Death in the Family: My Struggle Book 1',
        pub_year: 2013 },
      { id: 20, title: 'A Man in Love: My Struggle Book 2', pub_year: 2013 }
    ];
    ```

## Δεδομένα δοκιμών (3)

* Προσέξτε ότι εξάγουμε τον πίνακα `BOOKS`, ώστε να είναι ορατός από
  την υπόλοιπη εφαρμογή μας.

* Στη συνέχεια, στο `app.component.ts` σβήνουμε αυτό το κομμάτι
  κώδικα και αλλάζουμε τη μεταβλητή `books` του `AppComponent` ώστε να
  είναι απλώς ένας μη αρχικοποιημένος πίνακας:

    ```javascript
    books: Book[];
    ```

## Παροχή των δεδομένων δοκιμών

* Τώρα επιστρέφουμε στο `book.service.ts` και κάνουμε τις
  απαραίτητες αλλαγές ώστε η μέθοδος `getBooks()` να επιστρέφει τα
  δεδομένα δοκιμών:

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

## Χρήση της υπηρεσίας (1)

* Για να μπορέσουμε να χρησιμοποιήσουμε την υπηρεσία που φτιάξαμε, την
  εισάγουμε στο `AppComponent`, βάζοντας κάπου στην αρχή:

    ```javascript
    import { BookService } from './book.service';
    ```

## Χρήση της υπηρεσίας (2)

* Στη συνέχεια, θα πρέπει να δημιουργήσουμε ένα `BookService`.

* Αυτό δεν γίνεται απλώς με κάτι του τύπου:

    ```javascript
    bookService = new BookService(); // don't do this
    ```

* Πράγματι, αν κάναμε κάτι τέτοιο:
    * Το `AppComponent` θα έπρεπε να ξέρει ακριβώς πώς να κατασκευάζει
      ένα `BookService`.
    * Κάθε φορά δημιουργείται ένα νέο `BookService`, ενώ μπορεί να
      θέλουμε να υπάρχει μόνο ένα για όλα τα εξαρτήματα της εφαρμογής.
    * Το `AppComponent` δένεται πολύ στενά με τη συγκεκριμένη
      υλοποίηση του `BookService`.


## Ένθεση εξάρτησης

* Για να αποφύγουμε τα παραπάνω προβλήματα, χρησιμοποιούμε ένα
  σημαντικό *σχεδιαστικό πρότυπο* (design pattern), το οποίο
  ονομάζεται *ένθεση εξάρτησης* (dependency injection).

* Στην πράξη φτιάχνουμε ένα κατασκευαστή (constructor) του
  `AppComponent` ο οποίος δηλώνει μία ιδιωτική ιδιότητα `bookService`:
  
    ```javascript
    constructor(private bookService: BookService) { }
    ```
* Μετά, δηλώνουμε το πώς θα μπορεί να κατασκευαστεί ένα `BookService`,
  προσθέτοντας ένα πίνακα `providers` στο διακόσμητη `@Component` του
  `AppComponent`:

    ```javascript
    providers: [BookService]
    ```

<div class="notes">

### Ιδιότητες και Κατασκευαστές στην TypeScript

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
  this book.Service = BookService;
}
```
είναι το ίδιο με αυτό:
```javascript
constructor(private bookService: BookService) { }
```

Ο πίνακας `providers` υποδεικνύει στο Angular να δημιουργεί ένα νέο
`BookService` όταν δημιουργεί ένα `AppComponent`. Στη συνέχεια, το
`AppComponent`, όπως και όλα τα τυχόν εξαρτήματα παιδιά του, θα μπορεί
να χρησιμοποιήσει το `BookService`.

### Ο Πίνακας `providers`

Προκειμένου να μπορεί να γίνει η ένθεση των υπηρεσιών που θέλουμε,
πρέπει να καταγράψουμε (register) τους παρόχους (providers) των
υπηρεσιών αυτών. Η καταγραφή αυτή γίνεται στον πίνακα `providers`. Η
καταγραφή αυτή μπορεί να γίνει είτε στον πίνακα `providers` του
`NgModule`, είτε στον αντίστοιχο πίνακα του επιμέρους εξαρτήματός μας. 
  * Αν καταγράψουμε έναν πάροχο στο `NgModule`, η υπηρεσία που παρέχει
  είναι διαθέσιμη στο σύνολο της εφαρμογής μας.
  * Αν καταγράψουμε έναν πάροχο σε ένα επιμέρους εξάρτημα, η υπηρεσία
    που παρέσει είναι διαθέσιμη στο εξάρτημα αυτό και στα τυχόν παιδιά
    του. 

</div>

## Κλήση της υπηρεσίας

* Για να πάρουμε τα δεδομένα των βιβλίων στο `AppComponent`, γράφουμε
  μια στοιχειώδη μέθοδο που απλώς καλεί την αντίστοιχη μέθοδο της
  υπηρεσίας.

    ```javascript
      getBooks(): void {
        this.books = this.bookService.getBooks();
      }
    ```

## Αρχικοποίηση βιβλίων

* Το `AppComponent` πρέπει να διαβάζει τα βιβλία καλώντας τη συνάρτηση
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

* Εισάγουμε τη διεπαφή `OnInit` στο `app.component.ts` κάνοντας
  την πρώτη του γραμμή:

    ```javascript
    import { Component, OnInit } from '@angular/core';
    ```

* Μέτα, μέσα στην κλάση `AppComponent` γράφουμε τη μέθοδο `ngInit()`:

    ```javascript
    ngOnInit(): void {
      this.getBooks();
    }
    ```

# Ασύγχρονες υπηρεσίες και υποσχέσεις

## Γενικά

* Η εφαρμογή μας λειτουργεί, διαβάζοντας τα βιβλία και εμφανίζοντάς τα
  στην οθόνη.

* Η λειτουργία αυτή είναι σύγχρονη: στην οθόνη δεν εμφανίζεται τίποτε
  μέχρι να διαβαστούν τα βιβλία.

* Πρέπει όμως πάντοτε οι εφαρμογές μας να είναι φτιαγμένες έτσι ώστε
  να λειτουργούν *ασύγχρονα*, γιατί δεν ξέρουμε πόσος χρόνος μπορεί να
  απαιτηθεί για να μας δώσει αποτελέσματα μια λειτουργία ή υπηρεσία.


## Υποσχέσεις

* Ο τρόπος με τον οποίο χειριζόμαστε ασύγχρονες υπηρεσίες είναι μέσω
  *υποσχέσεων* (promises).

* Μια υπόσχεση είναι ένα αντικείμενο το οποίο αντικαθιστά τα
  αποτελέσματα που περιμένουμε.


## Καταστάσεις υποσχέσεων

* Μια υπόσχεση μπορεί να βρίσκεται στις εξής καταστάσεις:

    * Εν αναμονή (pending)
        * Ολοκληρωμένη (settled)
            * Πραγματοποιημένη (fulfilled)
            * Απορριμένη (rejected) 

* Μπορούμε να πάρουμε το αποτέλεσμα μιας υπόσχεσης, όταν είναι
  διαθέσιμο, με τη μέθοδο `then`.

* Αν η υπόσχεση απορριφθεί, μπορούμε να πάρουμε το λόγο απόρριψης
  (κάποιο λάθος) με τη μέθοδο `catch`.

## Υπόσχεση στο `AppComponent`

* Αλλάζουμε τη μέθοδο `getBooks()` του `AppComponent` ώστε να
  χρησιμοποιήσει μια υπόσχεση που θα του δίνει το `BookService`:

    ```javascript
    getBooks(): void {
      this.bookService.getBooks().then(books => this.books = books);
    }
    ```
* Όταν η υπόσχεση πραγματοποιηθεί, ο πίνακας βιβλίων θα βρίσκεται στη
  μεταβλητή `books`, την οποία την αποθηκεύουμε στο `this.books`.


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
  πραγματοποιείται αμέσως, μέσω της μεθόδου `resolve()`.

* Στην πραγματικότητα, η `getBooks()` θα καλούσε μια συνάρτηση η οποία
  θα επέστρεφε μια υπόσχεση. Η υπόσχεση αυτή θα πραγματοποιούνταν όταν
  θα ολοκληρωνόταν η επικοινωνία με τη βάση δεδομένων ή τον
  εξυπηρετητή που έχει τα στοιχεία για τα βιβλία.



