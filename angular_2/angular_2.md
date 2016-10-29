% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular2 2

## Γενικά

* Μέχρι στιγμής έχουμε δει τη δομή μιας εφαρμογής Angular2, αλλά δεν
  έχουμε δει πώς μπορούμε να φτιάξουμε μια εφαρμογή με πιο ρεαλιστική
  λειτουργικότητα.

* Για να γίνει αυτό θα πρέπει να δούμε σε περισσότερη λεπτομέρεια
  διάφορα στοιχεία του Angular2.


# Angular bangular tutorial

## Γενικά

* Θα προσαρμόσουμε το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.


## Αρχικό στήσιμο

* Ξεκινάμε αντιγράφοντας την εφαρμογή που είχαμε φτιάξει την
  προηγούμενη φορά σε έναν νέο κατάλογο, `bangular`.

* Αυτό σημαίνει ότι θα έχουμε μία δομή όπως η παρακάτω:

    ```
    bangular/
        node_modules/
        typings/
        app/
            app.component.ts
            app.module.ts
            main.ts
        package.json
        systemjs.config.json
        tsconfig.json
        typings.json
    ```

## Εμφάνιση βιβλίου (1)

* Ξεκινάμε αλλάζοντας την κλάση `AppComponent` στο αρχείο
  `app/app.component.ts` ως εξής:

    ```javascript
    export class AppComponent {
      title = 'Bangular';
      book = 'Infinite Jest';
    }
    ```

## Εμφάνιση βιβλίου (2)

* Στη συνέχεια αλλάζουμε το πρότυπο στον διακοσμητή `@Component`:

    ```javascript
    template: '<h1>{{title}}</h1><h2>{{book}} details!</h2>'
    ```

* Οι χαρακτήρες `{{` και `}}` ειδοποιούν το Angular ότι στο σημείο
  αυτό θα τοποθετηθούν οι αντίστοιχες τιμές από το εξάρτημα
  (component) του προτύπου.

* Αυτό ονομάζεται *μονόδρομη σύνδεση δεδομένων* (one-way data binding)

* Μπορείτε να επιβεβαιώσετε ότι η εμφάνιση της σελίδας στον browser
  έχει αλλάξει.

## Μοντελοποίηση βιβλίων (1)

* Προς το παρόν, κάθε βιβλίο έχει μόνο έναν τίτλο.

* Θέλουμε όμως να έχει περισσότερες ιδιότητες.

* Για το σκοπό αυτό θα χρησιμοποιήσουμε μια κλάση ώστε τα βιβλία να
  είναι αντικείμενα αυτής της κλάσης.


## Μοντελοποίηση βιβλίων (2)

* Πάλι στο αρχείο `app/app.component.ts` προσθέτουμε την παρακάτω
  κλάση κάτω από το `import`:

    ```javascript
    export class Book {
      id: number;
      title: string;
      pub_year: number;
    }
    ```

## Δημιουργία βιβλίου (1)

* Από τη στιγμή που έχουμε στη διάθεσή μας μια κλάση `Book`, μπορούμε
  να κατασκευάσουμε ένα αντικείμενο αυτής της κλάσης.

* Συγκεκριμένα, η ιδιότητα `book` του `AppComponent` θα είναι ένα
  αντικείμενο: 

    ```javascript
    @Component({
      selector: 'my-app',
      template: '<h1>{{title}}</h1><h2>{{book.title}} details!</h2>'
    })
    export class AppComponent {
      title = 'Bangular';
      book: Book = {
        id: 1,
        title: 'Infinite Jest',
        pub_year: 1996
      };
    }
    ```

## Δημιουργία βιβλίου (2)

* Θα πρέπει ταυτόχρονα να αλλάξουμε και το πρότυπο, ώστε να
  χρησιμοποιεί πλέον αυτό το βιβλίο:

    ```javascript
    @Component({
      selector: 'my-app',
      template: '<h1>{{title}}</h1><h2>{{book.title}} details!</h2>'
    })
    ```

## Περισσότερη HTML (1)

* Θέλουμε να δούμε όλα τα δεδομένα για το βιβλίο μας, οπότε μπορούμε
  να προσθέσουμε το `id`, το `title`, και το `pub_date` σε διαφορετικά
  `div`:

    ```javascript
    template: '<h1>{{title}}</h1><h2>{{book.title}} details!</h2><div><label>id: </label>{{book.id}}</div><div><label>Publication year: </label>{{book.pub_year}}</div>'
    ```

## Περισσότερη HTML (2)

* Η αλήθεια είναι ότι αυτό γίνεται σιγά-σιγά μακρυνάρι, οπότε
  καλύτερα να χρησιμοποιήσουμε τη δυνατότητα που έχει η TypeScript να
  δημιουργούνται strings πολλών γραμμών:

    ```javascript
      template: `
        <h1>{{title}}</h1>
        <h2>{{book.title}} details!</h2>
        <div><label>id: </label>{{book.id}}</div>
        <div><label>Publication year: </label>{{book.pub_year}}</div>
      `
    ```

## Αλλαγές στο βιβλίο (1)

* Στη συνέχεια, θέλουμε να μπορούμε να αλλάξουμε τον τίτλο του
  βιβλίου.

* Για το σκοπό αυτό αλλάζουμε πάλι το πρότυπο ώστε να μας δίνει τη
  δυνατότητα να εισάγουμε τον τίτλο:

    ```javascript
    template: `
      <h1>{{title}}</h1>
      <h2>{{book.title}} details!</h2>
      <div><label>id: </label>{{book.id}}</div>
      <div>
        <label>title: </label>
        <input value="{{book.title}}" placeholder="name">
      </div>
      <div><label>Publication year: </label>{{book.pub_year}}</div>
      `
    ```

## Αλλαγές στο βιβλίο (2)

* Το πρόβλημα είναι ότι αλλάζουμε μεν τον τίτλο του βιβλίου, αλλά η
  αλλαγή δεν αντικατοπτρίζεται και στον τίτλο που εμφανίζεται.

* Αυτό συμβαίνει γιατί μέχρι στιγμής χρησιμοποιούμε μονόδρομη σύνδεση
  δεδομένων.

* Στην περίπτωσή μας, χρειαζόμαστε *αμφίδρομη σύνδεση δεδομένων*
  (two-way data binding).

## Αμφίδρομη σύνδεση (1)

* Για να ενεργοποιήσουμε την αμφίδρομη σύνδεση, θα πρέπει να
  χρησιμοποιήσουμε το πακέτο `FormsModule`. Για το σκοπό αυτό πρέπει
  το αρχείο `app/module.ts` να γίνει όπως το παρακάτω:

    ```javascript
    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule }   from '@angular/forms';

    import { AppComponent }   from './app.component';

    @NgModule({
      imports:      [
        BrowserModule,
        FormsModule
      ],
      declarations: [ AppComponent ],
      bootstrap:    [ AppComponent ]
    })
    export class AppModule { }
    ```

## Αμφίδρομη σύνδεση (2)

* Στη συνέχεια, αλλάζουμε αντίστοιχα το `app/app.component.ts`:

    ```html
    <input [(ngModel)]="book.title" placeholder="name">
    ```
* Τώρα, οι αλλαγές που κάνουμε φαίνονται αμέσως στον τίτλο.


# Master / Detail

## Δημιουργία βιβλίων

* Θα ξεκινήσουμε προσθέτουμε έναν πίνακα από βιβλία στο αρχείο
  `app/app.components.ts`:

    ```javascript
    const BOOKS: Book[] = [
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

## Δήλωση βιβλίων

* Μέσα στην κλάση `AppComponent`, στο αρχείο `app/app.component.ts`,
  δηλώνουμε μία ιδιότητα που αναφέρεται στα βιβλία που φτιάξαμε:

    ```javascript
    books = BOOKS;
    ```

## Δημιουργία προτύπου βιβλίων

* Πλέον είναι καλύτερα να ξεχωρίσουμε τον κώδικα HTML από τον κώδικα
  TypeScript.

* Για το σκοπό αυτό, φτιάχνουμε ένα αρχείο `app/app.component.html`:

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
    
    <div *ngIf="selectedBook">
      <h2>{{selectedBook.title}} details:</h2>
      <div><label>id: </label>{{selectedBook.id}}</div>
      <label>title: </label>
      <input [(ngModel)]="selectedBook.title" placeholder="name">
      <div><label>Publication
      year: </label>{{selectedBook.pub_year}}</div>
    </div>
    ```

## Δήλωση `templateUrl`

* Για να μπορεί να χρησιμοποιηθεί το πρότυπο που δημιουργήσαμε, θα
  πρέπει να εισάγουμε στον διακοσμητή `@Component` τις ακόλουθες
  ιδιότητες:

    ```javascript
    moduleId: module.id,
    templateUrl: 'app.component.html',
    ```

## Στυλ βιβλίων

* Επίσης θα δημιουργήσουμε ένα ξεχωριστό αρχείο CSS ειδικά για τα
  βιβλία.

* Το αρχείο αυτό θα είναι το `app/app.component.css`:

    ```css
    .selected {
        background-color: #CFD8DC !important;
        color: white;
    }

    .books {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
      }

    .books li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .books li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
    }

    .books li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
    }

    .books .text {
        position: relative;
        top: -3px;
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
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
    }
    ```

## Δήλωση `styleURLs`

* Για να μπορεί να χρησιμοποιηθεί το αρχείο CSS που δημιουργήσαμε, θα
  πρέπει να εισάγουμε στον διακοσμητή `@Component` την ακόλουθη
  ιδιότητα:

    ```javascript
    styleUrls: ['app.component.css']
    ```

## Διακοσμητής `@Component`

* Ο διακοσμητής `@Component` θα είναι τότε:

    ```javascript
    @Component({
      moduleId: module.id,
      selector: 'my-app',
      templateUrl: 'app.component.html',
      styleUrls: ['app.component.css']
    })
    ```

## Χειριστής γεγονότος `onSelect(book)`

* Όταν ο χρήστης επιλέγει ένα βιβλίο που θέλει να δει, θα εκτελείται ο
  αντίστοιχος χειριστής του γεγονότος (event handler).

* Αυτόν τον προσθέτουμε στην κλάση `AppComponent`:

    ```javascript
    export class AppComponent {
      title = 'Bangular';
      books = BOOKS;
      selectedBook: Book;

      onSelect(book: Book): void {
        this.selectedBook = book;
      }
    }
    ```

