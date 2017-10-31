% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 2

## Γενικά

* Μέχρι στιγμής έχουμε δει τη δομή μιας εφαρμογής Angular, αλλά δεν
  έχουμε δει πώς μπορούμε να φτιάξουμε μια εφαρμογή με πιο ρεαλιστική
  λειτουργικότητα.

* Για να γίνει αυτό θα πρέπει να δούμε σε περισσότερη λεπτομέρεια
  διάφορα στοιχεία του Angular.


# Angular bangular tutorial

## Γενικά

* Θα προσαρμόσουμε το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.


## Αρχικό στήσιμο

* Ξεκινάμε φτιάχνοντας μια εφαρμογή η οποία θα χειρίζεται βιβλία,
  κριτικές, κ.λπ.
  
* Θα ονομάσουμε την εφαρμογή μας bangular (= books Angular).
  
* Για να δημιουργήσουμε τον σκελετό της εφαρμογής δίνουμε
    ```bash
    ng new bangular
    ```

## Εκκίνηση εφαρμογής

* Για να τρέξει η εφαρμογή μας δίνουμε:
    ```bash
    ng serve --open
    ```
    
* Αν παραλείψουμε το `--open` η εφαρμογή θα αρχίσει να τρέχει, αλλά
  δεν θα ανοίξει αυτομάτως ένα παράθυρο στον browser μας. Τότε θα
  πρέπει να πλοηγηθούμε εμείς στη διεύθυνση `http://localhost:4200/`.
  
* Εναλλακτικά, μπορούμε να δώσουμε:
    ```bash
    npm start
    ```
  και στη συνέχεια να πλοηγηθούμε στη διεύθυνση
    `http://localhost:4200/`.
 
<div class="notes">

Η αντιστοιχία μεταξύ `ng serve` και `npm start` φαίνεται στο αρχείο
`package.json`. Εκεί μπορούμε να βρούμε το:
```javascript
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
 }
```
όπου ορίζονται οι εντολές που μπορούμε να εκτελέσουμε μέσω του
εργαλείου npm. Έτσι, με `npm test` θα εκτελεστεί το `ng test`, κ.λπ.

Η εντολή `ng serve` (ή ισοδύναμα `npm start`) ξεκινάει τον
μεταγλωττιστή της TypeScript σε λειτουργία παρακολούθησης (watch
mode). Έτσι, όποτε αλλάζουμε ένα αρχείο TypeScript, αυτό
μεταγλωττίζεται αυτομάτως και οι αλλαγές εμφανίζονται αμέσως στην
εφαρμογή μας. 

</div>

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

* Στη συνέχεια αλλάζουμε το πρότυπο στο αρχείο `app.component.html`:

    ```html
    <h1>{{title}}</h1><h2>{{book}} details!</h2>
    ```

* Οι χαρακτήρες `{{` και `}}` ειδοποιούν το Angular ότι στο σημείο
  αυτό θα τοποθετηθούν οι αντίστοιχες τιμές από το εξάρτημα
  (component) του προτύπου.

* Αυτό ονομάζεται *μονόδρομη σύνδεση δεδομένων* (one-way data binding).

* Μπορείτε να επιβεβαιώσετε ότι η εμφάνιση της σελίδας στον browser
  έχει αλλάξει.


## Μοντελοποίηση βιβλίων (1)

* Προς το παρόν, κάθε βιβλίο έχει μόνο έναν τίτλο.

* Θέλουμε όμως να έχει περισσότερες ιδιότητες.

* Για το σκοπό αυτό θα χρησιμοποιήσουμε μια κλάση ώστε τα βιβλία να
  είναι αντικείμενα αυτής της κλάσης.


## Μοντελοποίηση βιβλίων (2)

* Πάλι στο αρχείο `app.component.ts` προσθέτουμε την παρακάτω
  κλάση κάτω από το `import` της πρώτης γραμμής:

    ```javascript
    export class Book {
      id: number;
      title: string;
      pub_year: number;
    }
    ```

<div class="notes">

Η λέξη `export` που βλέπουμε μπροστά από το `class Book` σημαίνει ότι
η κλάση αυτή μπορεί να χρησιμοποιηθεί και από άλλα JavaScript
αρθρώματα (modules) με τη χρήση της αντίστοιχης εντολής `import`.

Οι εντολές `import` και `export`, όπως και η έννοια των αρθρωμάτων στη
JavaScript είναι σχετικά νέα. Σε κάθε περίπτωση υποστηρίζονται πλήρως
από την TypeScript, και ο μεταγλωττιστής θα κάνει ότι χρειάζεται για
να παράξει κώδικα ο οποίος θα τρέχει στο μεγαλύτερο δυνατό αριθμό από
browsers. 

Προσοχή: τα αρθρώματα (modules) της JavaScript *δεν είναι το ίδιο
πράγμα με τα αρθρώματα της Angular*. Τα αρθρώματα της Angular είναι
κλάσεις στις οποίες έχουμε προσδώσει το διακοσμητή `@NgModule`. Ενώ
ένα άρθρωμα της JavaScript είναι απλώς ένας τρόπος να ομαδοποιούμε
κώδικα και να περιορίζουμε την ορατότητα των ορισμών του κώδικά μας
από άλλον κώδικα, στο Angular ένα άρθρωμα είναι ένα σύνολο
λειτουργικότητας με εξαρτήματα, πρότυπα, κ.λπ.

</div>

## Δημιουργία βιβλίου (1)

* Από τη στιγμή που έχουμε στη διάθεσή μας μια κλάση `Book`, μπορούμε
  να κατασκευάσουμε ένα αντικείμενο αυτής της κλάσης.

* Συγκεκριμένα, η ιδιότητα `book` του `AppComponent` θα είναι ένα
  αντικείμενο: 

    ```javascript
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
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

* Μπορούμε να παρατηρήσουμε ότι τώρα η σελίδα μας δεν εμφανίζεται
  σωστά (εμφανίζει «[object Object] details!»).

* Θα πρέπει ταυτόχρονα να αλλάξουμε και το πρότυπο, ώστε να
  χρησιμοποιεί πλέον αυτό το βιβλίο:
    ```html
    <h1>{{title}}</h1><h2>{{book.title}} details!</h2>
    ```

## Περισσότερη HTML

* Θέλουμε να δούμε όλα τα δεδομένα για το βιβλίο μας, οπότε μπορούμε
  να προσθέσουμε το `id`, το `title`, και το `pub_date` σε διαφορετικά
  `div`:

    ```html
    <h1>{{title}}</h1>
    <h2>{{book.title}} details!</h2>
    <div><label>id: </label>{{book.id}}</div>
    <div><label>Publication year: </label>{{book.pub_year}}</div>
    ```

## Αλλαγές στο βιβλίο (1)

* Στη συνέχεια, θέλουμε να μπορούμε να αλλάξουμε τον τίτλο του
  βιβλίου.

* Για το σκοπό αυτό αλλάζουμε πάλι το πρότυπο ώστε να μας δίνει τη
  δυνατότητα να εισάγουμε τον τίτλο:

    ```html
    <h1>{{title}}</h1>
    <h2>{{book.title}} details!</h2>
    <div><label>id: </label>{{book.id}}</div>
    <div>
      <label>title: </label>
      <input value="{{book.title}}" placeholder="name">
    </div>
    <div><label>Publication year: </label>{{book.pub_year}}</div>
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
  το αρχείο `app.module.ts` να γίνει όπως το παρακάτω:

    ```javascript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule }   from '@angular/forms';

    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

<div class="notes">

Κάναμε δύο αλλάγες. Η δυνατότητα της αμφίδρομης σύνδεσης προσφέρεται
από το άρθρωμα `FormsModule`, οπότε χρειάζεται να το εισάγουμε στο
τρέχον άρθρωμα:
```javascript
import { FormsModule }   from '@angular/forms';
```

Με τον τρόπο αυτό εισάγουμε ένα άρθρωμα JavaScript σε ένα άλλο άρθρωμα
JavaScript. Στην περίπτωσή μας όμως, το `FormsModule` είναι και
άρθρωμα της Angular (θυμηθείτε, είναι δύο διαφορετικά πράγματα). Άρα
θα πρέπει να δηλώσουμε μέσα στο διακοσμητή `NgModule` ότι θέλουμε να
το εισάγουμε. Για το λόγο αυτό το προσθέτουμε στη λίστα `imports`.

</div>

## Αμφίδρομη σύνδεση (2)

* Στη συνέχεια, αλλάζουμε αντίστοιχα το `app.component.html`:

    ```html
    <input [(ngModel)]="book.title" placeholder="name">
    ```
* Τώρα, οι αλλαγές που κάνουμε φαίνονται αμέσως στον τίτλο.


## Αμφίδρομη σύνδεση (3)

* Για να δείξουμε στο Angular ότι η σύνδεση μεταξύ δεδομένων και
  οθόνης είναι αμφίδρομη, χρησιμοποιούμε τη σύνταξη `[()]`.
  
* Η σύνταξη αυτή ονομάζεται *banana in a box*.

* To `ngModel` που βλέπουμε δημιουργεί ένα στοιχείο στην HTML σελίδα
  το οποίο αντικατοπτρίζει τα δεδομένα του μοντέλου μας.
  
* Αλλαγές στο μοντέλο θα εμφανίζονται στη σελίδα, και αλλαγές στη
  σελίδα θα εφαρμόζονται στο μοντέλο.
  

## Μοντέλα στο Angular

* Στο Angular συναντάμε πάλι την έννοια του μοντέλου.

* Τα δεδομένα που θέλουμε να εμφανίζονται στην οθόνη ανήκουν σε
  μοντέλα. 
  
* Στην περίπτωσή μας, το μοντέλο μας είναι η κλάση `AppComponent`.
  
* Τα μοντέλα αυτά ανήκουν αποκλειστικά στο front-end. *Δεν είναι τα
  ίδια* με τα μοντέλα που μπορεί να έχουμε στο back-end. 
  

# Master / Detail

## Γενικά

* Θέλουμε να εξελίξουμε την εφαρμογή μας ώστε να έχει μια δομή master
  / detail.
  
* Συγκεκριμένα, η λίστα των βιβλίων θα εμφανίζεται στο πάνω μέρος
  (master).
  
* Αν ο χρήστης επιλέξει ένα βιβλίο, οι λεπτομέρειες αυτού θα
  εμφανίζονται από κάτω (detail).


## Δημιουργία βιβλίων

* Θα ξεκινήσουμε προσθέτουμε έναν πίνακα από βιβλία στο αρχείο
  `app.components.ts`:

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

<div class="notes">

Εφ' όσον η εφαρμογή μας, προς το παρόν, δεν επικοινωνεί με κάποιο
back-end, θα την ταΐσουμε με όσα δεδομένα χρειαζόμαστε. Φτιάχνουμε μια
λίστα `BOOKS` η οποία περιέχει τα βιβλία τα οποία θέλουμε αυτή τη
στιγμή να χρησιμοποιήσουμε.

</div>

## Δήλωση βιβλίων

* Μέσα στην κλάση `AppComponent`, στο αρχείο `app.component.ts`,
  δηλώνουμε μία ιδιότητα που αναφέρεται στα βιβλία που φτιάξαμε:

    ```javascript
    books = BOOKS;
    ```

<div class="notes">

Τη λίστα των βιβλίων την έχουμε δηλώσει έξω από την κλάση
`AppComponent`, οπότε φτιάχνουμε ένα πεδίο (ιδιότητα) της κλάσης που
δείχνει στη λίστα.

</div>

## Εξέλιξη προτύπου βιβλίων

* Για να δούμε όλα τα βιβλία, αλλάζουμε το  `app.component.html` ως εξής:

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
      <div><label>Publication year: </label>{{selectedBook.pub_year}}</div>
    </div>
    ```

## Δομικές οδηγίες

* Στον προηγούμενο κώδικα το `*ngFor` και το `*ngIf`.

* Αυτά είναι *δομικές οδηγίες* (structural directives) που
  υποδεικνύουν με ποιον τρόπο θα αλλάξει η δομή της HTML σελίδας (το
  Document Object Model, DOM).
  
* Υπάρχουν και άλλου τύπου οδηγίες, με άλλη λειτουργικότητα (π.χ.,
  αλλαγή εμφάνισης ενός στοιχείου). 
  
* Οι δομικές οδηγίες ξεχωρίζουν με την παρουσία του αστερίσκου μπροστά
  τους. 


## Η δομική οδηγία `*ngFor`

* Η δομική οδηγία `*ngFor` συντάσσεται ως εξής:
    ```html
    <li *ngFor="let book of books">
    ```

* Αυτό σημαίνει ότι θα δημιουργηθεί ένα στοιχείο `<li>` για κάθε ένα
  βιβλίο.
  
* Συγκεκριμένα, το `books` είναι το πεδίο `books` που ορίσαμε στο
  `AppComponent`.
  
* Το `book` είναι μια μεταβλητή που σε κάθε επανάληψη θα πάρει την
  τιμή ενός βιβλίου από το `books`.


## Η δομική οδηγία `*ngIf`

* Στο παράδειγμά μας, η δομική οδηγία `*ngIf` είναι:
    ```html
    <div *ngIf="selectedBook">
    ```
    
* Αυτό σημαίνει ότι το `<div>` και τα περιεχόμενά του θα εισαχθούν
  στην HTML σελίδα (για την ακρίβεια, στο DOM), αν το πεδίο
  `selectedBook` της κλάσης `AppComponent` είναι αληθής.


## Διασύνδεση κλάσης CSS

* Παρατηρήστε την ακόλουθη γραμμή του κώδικά μας:
    ```html
    [class.selected]="book === selectedBook"
    ```

* Αυτή είναι ένα παράδειγμα *διασύνδεσης κλάσης* (class binding).

* Η ιδιότητα class του συγκεκριμένου HTML στοιχείου θα πάρει την τιμή
  που θα προκύψει από την έκφραση `book === selectedBook`.


## Εκφράσεις προτύπων

* Η έκφραση `book === selectedBook` είναι μία έκφραση προτύπου
  (template expression).
  
* Οι εκφράσεις προτύπων εμφανίζονται είτε στο δεξί μέρος διασυνδέσεων
  (όπως στην περίπτωσή μας), είτε μέσα σε `{{ }}`.
  
* Οι εκφράσεις γράφονται σε μια γλώσσα που μοιάζει με JavaScript.


<div class="notes">

Εκφράσεις της JavaScript που δεν επιτρέπονται στις εκφράσεις προτύπων
είναι αυτές που έχουν παράπλευρες ενέργειες (side effects), όπως:
  * απόδοση τιμής (`=`, `+=`, `-=`, ...)
  * `new`
  * σειρές εκφράσεων σε αλυσίδα με `;` ή `,`
  * τελεστές αύξησης και μείωσης (`++` και `--`)
  
Επίσης δεν υποστηρίζονται οι δυαδικοί τελεστές `|` και `&`, ούτε και
άλλοι τελεστές προτύπων ([template expression
operators](https://angular.io/guide/template-syntax#expression-operators))
που ορίζει το ίδιο το Angular.

</div>


## Διασύνδεση γεγονότος

* Τέλος, παρατηρείστε τη γραμμή:
    ```html
    (click)="onSelect(book)"
    ```
    
* Αυτή είναι ένα παράδειγμα *διασύνδεσης γεγονότος* (event binding).

* Στο γεγονός click θα εκτελεστεί ο κώδικας `onSelect` με παράμετρο το
  εν λόγω βιβλίο.

* Αυτόν τον κώδικα θα τον γράψουμε στη συνέχεια.


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


## Στυλ βιβλίων

* Για τη βελτίωση της εμφάνισης της σελίδας μας, θα δημιουργήσουμε ένα
  ξεχωριστό αρχείο CSS ειδικά για τα βιβλία.

* Το αρχείο αυτό θα είναι το `app.component.css`:

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
