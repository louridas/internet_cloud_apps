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

## Δημιουργία Εξαρτήματος Λεπτομερειών

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

## Υπάρχον `books.component.html`

```javascript
<h2>Books</h2>
<ul class="books">
  <li *ngFor="let book of books"
      [class.selected]="book === selectedBook"
      (click)="onSelect(book)">
    <span class="badge">{{book.id}}</span> {{book.title}}
  </li>
</ul>

<div *ngIf="selectedBook">
  <h2>{{ selectedBook.title }} details:</h2>
  <div><label>id: </label>{{selectedBook.id}}</div>
  <div>
    <label>title: </label>
    <input [(ngModel)]="selectedBook.title" placeholder="name">
  </div>
   <div><label>URL: </label> {{ selectedBook.url }} </div>
  <div><label>Publication year: </label>{{selectedBook.pub_year}}</div>
</div>
```

## Αλλαγές στα Πρότυπα

* Θα μεταφέρουμε το κάτω μέρος του προτύπου `books.component.html` στο
  `book-detail.component.html`.
  
* Θα αλλάξουμε τη μεταβλητή `selectedBook` σε `book`, αφού το
  `BookComponent` θα είναι αρμόδιο για την εμφάνιση ενός οποιουδήποτε
  βιβλίου. 


## `book-detail.component.html`

* Έτσι, το αρχείο `book-detail.component.html` θα είναι:

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
   </div>
    ```

## Σκελετός Εξαρτήματος

* Ο σκελετός του κώδικα του εξαρτήματος, όπως έχει δημιουργηθεί από το Angular
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

## Προσθήκη Ιδιότητας `book`

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


## Αλληλεπίδραση των Εξαρτημάτων

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

## Δήλωση Ιδιότητας Εισόδου (1)

* Η ιδιότητα `book` είναι ο *αποδέκτης* (target) της διασύνδεσης.

* Αυτό φαίνεται από τη χρήση των `[ ]` γύρω από το όνομά της. Με τον
  τρόπο αυτό την καθιστούμε *ιδιότητα εισόδου* (input property).


## Δήλωση Ιδιότητας Εισόδου (2)

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


# Δημιουργία Υπηρεσιών

## Γενικά {#services-general}

* Στο Angular, τα δεδομένα που χρειάζονται τα εξαρτήματά μας
  παρέχονται από *υπηρεσίες* (services).

* Στη συνέχεια θα προσαρμόσουμε την εφαρμογή μας ώστε πράγματι, τα
  βιβλία να παρέχονται από μία υπηρεσία στα εξαρτήματα που τα
  χρειάζονται.

* Επίσης θα προσθέσουμε μια υπηρεσία για την εμφάνιση μηνυμάτων στον
  χρήστη. 


## Δημιουργία Σκελετού Υπηρεσίας

* Δημιουργούμε τον σκελετό της υπηρεσίας με το Angular
  CLI ως εξής:
  
   ```bash
   ng generate service book
   ```
    
* Σε αυτήν την περίπτωση το Angular CLI θα δημιουργήσει το ακόλουθα
  αρχεία στον κατάλογο `src/app`:
  
    * `book.service.ts`
     
    * `book.service.spec.ts`


## `book.service.ts`

```javascript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }
}
```

## `@Injectable()`

* Ο διακοσμητής `@Injectable()` που βλέπουμε στον παραπάνω κώδικα
  ενημερώνει το Angular ότι η παρούσα υπηρεσία μπορεί να
  χρησιμοποιήσει άλλες υπηρεσίες μέσω της διαδικασίας *ένθεσης
  εξάρτησης* (dependency injection).
  
* Η ένθεση εξαρτήσεων είναι ένα σημαντικό σχεδιαστικό πρότυπο (design
  pattern) που διέπει τη λειτουργία του Angular.
  
* Στην ουσία με την ένθεση εξαρτήσεων οι υλοποιήσεις των εξαρτήσεων
  ορίζονται *τη στιγμή της εκτέλεσης* της εφαρμογής.
  
* Για περισσότερα, δείτε τη [σχετική τεκμηρίωση του
  Angular](https://angular.io/guide/dependency-injection) και
  [γενικότερα στη
  Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection).


## Ένθεση Εξάρτησης (1)

* Για να δούμε την αξία του σχεδιαστικού προτύπου της ένθεσης
  εξάρτησης, μπορούμε να δούμε το παρακάτω
  [παράδειγμα](https://en.wikipedia.org/wiki/Dependency_injection) σε
  Java:
  
   ```java
   // An example without dependency injection
   public class Client {
       // Internal reference to the service used by this client
       private Service service;

       // Constructor
       Client() {
           // ExampleService is an implementation of Service
           service = new ExampleService();
       }

       // Method within this client that uses the services
       public String greet() {
           return "Hello " + service.getName();
       }
   }
   ```
   
## Ένθεση Εξάρτησης (2)

* Το πρόβλημα στο παραπάνω παράδειγμα είναι ότι δεν θέλουμε ο χρήστης
  του `Service` να εξαρτάται από τη συγκεκριμένη υλοποίηση (εδώ,
  `ExampleService`).
  
* Επιπλέον, είναι πιθανόν να χρειαζόμαστε μόνο ένα στιγμιότυπο του
  `Service` στην εφαρμογή μας.
  
* Άρα θα έπρεπε να χρησιμοποιήσουμε ένα εργοστάσιο (factory) που θα
  μας επέστρεφε ένα μοναδικό στιγμιότυπο (singleton).
  
## Ένθεση Εξάρτησης (3)

* Αλλάζουμε την κλάση `Client` ώστε η εξάρτηση να είναι παράμετρος του
  κατασκευαστή:

   ```java
   // An example without dependency injection
   public class Client {
       // Internal reference to the service used by this client
       private Service service;

       // Constructor
       Client(Service service) {
           // ExampleService is an implementation of Service
           this.service = service;
       }

       // Method within this client that uses the services
       public String greet() {
           return "Hello " + service.getName();
       }
   }
   ```
    
<div class="notes">

Αυτός είναι ένας τρόπος να ενθέσουμε την εξάρτηση και βασίζεται
ακριβώς στην ένθεση μέσω του κατασκευαστή του χρήστη. Υπάρχουν άλλοι
δύο τρόποι. Μπορεί η ένθεση να γίνει μέσω μεθόδου setter ή μέσω μιας
διεπαφής (interface). Για λεπτομέρειες δείτε το [άρθρο της
Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection).

</div>
   
## Ένθεση Εξάρτησης (4)

* Η ένθεση της εξάρτησης γίνεται συνήθως μέσω ενός *ενθέτη* (injector). 
 
* Σε πολύ απλοποιημένη μορφή μπορεί να είναι κάτι όπως:

   ```java
   public class Injector {
       public static void main(String[] args) {
           // Build the dependencies first
           Service service = new ExampleService();

           // Inject the service, constructor style
           Client client = new Client(service);

           // Use the objects
           System.out.println(client.greet());
       }	
   }
   ```
   
## Ένθεση Εξάρτησης στο Angular

* Στο Angular, πρέπει να καταγράψουμε την εξάρτηση, δηλαδή την
  υπηρεσία μας, με έναν ενθέτη.
  
* Ο ενθέτης θα δημιουργήσει την υπηρεσία και θα καλέσει τον
  κατασκευαστή του εξαρτήματος δίνοντάς του το στιγμιότυπο της
  υπηρεσίας ως παράμετρο.
  
* Αυτό κάνει ο διακοσμητής `Injectable()`:

   ```javascript
   @Injectable({
     providedIn: 'root'
   })
   ```

* Στη συγκεκριμένη περίπτωση, καταγράφουμε την εξάρτηση στον ενθέτη
  `root` ώστε η εξάρτηση να είναι διαθέσιμη στο σύνολο της εφαρμογής.


<div class="notes">

Υπάρχουν και άλλοι τρόποι να καταγράψουμε την εξάρτηση σε έναν ενθέτη.
Για περισσότερες πληροφορίες, δείτε την [τεκμηρίωση του
Angular](https://angular.io/guide/dependency-injection).

</div>

## Παροχή Βιβλίων

* Το `BookService` θα είναι αρμόδιο για την παροχή βιβλίων στα
  εξαρτήματα της εφαρμογής.

* Αυτή τη στιγμή γράφουμε μια μέθοδο η οποία επιστρέφει τα δεδομένα
  δοκιμών: 
  
   ```javascript
   import { Injectable } from '@angular/core';

   import { Book } from './hero';
   import { BOOKS } from './mock-books';

   @Injectable({
     providedIn: 'root'
   })
   export class BookService {

     constructor() { }

     getBooks(): Book[] {
       return BOOKS;
     }

   }
   ```

## Χρήση της Υπηρεσίας

* Στη συνέχεια, θα πρέπει να χρησιμοποιήσουμε το `BookService` στο
  `BooksComponent`. Συγκεκριμένα, θα γίνει ως εξής:
  
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

## Ένθεση της Υπηρεσίας

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
      

## Ένθεση Eξάρτησης μέσω Κατασκευαστή

* Όπως είπαμε, για να αποφύγουμε τα παραπάνω προβλήματα,
  χρησιμοποιούμε ένθεση εξάρτησης.

* Στην πράξη φτιάχνουμε ένα κατασκευαστή (constructor) του
  `AppComponent` ο οποίος δηλώνει μία ιδιωτική ιδιότητα `bookService`:
  
   ```javascript
   constructor(private bookService: BookService) { }
   ```

* Πλην όμως, αν προσέξετε, *δεν κατασκευάζουμε πουθενά εμείς ένα*
  `BookService`. Το `BookService` κατασκευάζεται από το Angular, από
  τον ενθέτη `root`, και γίνεται ένθεση (injection) μέσα στο
  `BookService` αυτομάτως.

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

## Αρχικοποίηση Βιβλίων

* Το `BooksComponent` πρέπει να διαβάζει τα βιβλία καλώντας τη συνάρτηση
  `getBooks()`.

* Πότε όμως θα την καλεί;

* Η εμπειρία λέει ότι *δεν* πρέπει να την καλεί στον κατασκευαστή της.

* Ο κατασκευαστής πρέπει να χρησιμοποιείται μόνο για την αρχικοποίηση
  απλών δεδομένων, *όχι* για την κλήση μεθόδων που μπορεί να απαιτούν
  σύνδεση με άλλα εξαρτήματα, εξυπηρετητές κ.λπ.


## Κύκλος Ζωής Εξαρτημάτων

* Κάθε εξάρτημα στο Angular έχει έναν κύκλο ζωής.

* Ο κύκλος ζωής αποτελείται από συγκεκριμένα στάδια.


## Διεπαφές Σταδίων Ζωής

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


## Το Στάδιο `OnInit`

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


# Ασύγχρονες Υπηρεσίες

## Γενικά {#general-asynchronous-services}

* Η εφαρμογή μας λειτουργεί, διαβάζοντας τα βιβλία και εμφανίζοντάς τα
  στην οθόνη.

* Η λειτουργία αυτή είναι σύγχρονη: στην οθόνη δεν εμφανίζεται τίποτε
  μέχρι να διαβαστούν τα βιβλία.

* Πρέπει όμως πάντοτε οι εφαρμογές μας να είναι φτιαγμένες έτσι ώστε
  να λειτουργούν *ασύγχρονα*, γιατί δεν ξέρουμε πόσος χρόνος μπορεί να
  απαιτηθεί για να μας δώσει αποτελέσματα μια λειτουργία ή υπηρεσία.

## `Observable`

* Οι περισσότερες ασύγχρονες υπηρεσίες στο Angular υλοποιούνται μέσω
  της κλάσης `Observable`.
  
* Η κλάση `Observable` υλοποιείται στη βιβλιοθήκη
  [RxJS](http://reactivex.io/rxjs/).
  
* Η βασική ιδέα είναι ότι ένα `Observable` «σπρώχνει» (push) μία ή
  περισσότερες τιμές, όπως εμφανίζονται, σε *συνδρομητές*
  (subscribers). 

<div class="notes">

Η βασική διαφορά μεταξύ ενός `Observable` και μιας υπόσχεσης είναι ότι
μια υπόσχεση εκπληρώνεται *άπαξ*. Όταν εκπληρώνεται επιστρέφει κάποια
τιμή (ή κάποια δομή δεδομένων, όπως πίνακας, με πολλές τιμές). Ένα
`Observable` μπορεί να επιστρέφει τιμές καθ' όλη τη διάρκεια της ζωής
του, εφ' όσον έχει συνδρομητές.

</div>

## Χρήση `Observable`

* Για να χρησιμοποιήσουμε ένα `Observable` στο `BookService`, απλώς θα
  μετατρέψουμε τον πίνακα των βιβλίων που επιστρέφει το `getBooks()`
  σε ένα `Observable` που επιστρέφει πίνακα βιβλίων.
  
* Μελλοντικά, θα αλλάξουμε το `BookService` ώστε να επιστρέφει βιβλία
  από έναν εξυπηρετητή.

* Πρέπει να εισάγουμε τις κατάλληλες δηλώσεις από τη βιβλιοθήκη `rjxs`
  και να αλλάξουμε την `getBooks()`.


## `book.service.ts` {#book.service.ts-observable}

```javascript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Book } from './book';
import { BOOKS } from './mock-books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getBooks(): Observable<Book[]> {
    return of(BOOKS);
  }

}
```

## Εγγραφή Συνδρομητή του `BooksComponent`

* Τώρα το `BooksComponent` θα πρέπει να γραφτεί συνδρομητής στο
  `BookService`. 
  
* Αυτό γίνεται καλώντας τη μέθοδο `subscribe()` του `Observable`.

   ```javascript
   getBooks(): void {
     this.bookService.getBooks()
       .subscribe(books => this.books = books);
   }
   ```

# Εμφάνιση Μηνυμάτων

## Γενικά {#general-messages}

* Θα φτιάξουμε ένα εξάρτημα, το `MessagesComponent`, το οποίο θα
  εμφανίζει μηνύματα στον χρήστη, στο κάτω μέρος της εφαρμογής.
  
* Τα μηνύματα θα αποστέλονται μέσω μίας υπηρεσίας που θα φτιάξουμε για
  αυτό το λόγο, τη `MessageService`.
  

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

## Δημιουργία Σκελετού `MessageService`

* Χρησιμοποιούμε το Angular CLI για να δημιουργήσουμε τον σκελετό του
  `MessagesComponent`: 
  
   ```bash
   ng generate service message 
   ```
  
* Με την εντολή αυτή θα δημιουργηθούν τα παρακάτω αρχεία στον κατάλογο
  `src/app`: 
  
    * `message.service.spec.ts`
    
    * `message.service.ts`

* Επίσης θα γίνουν οι απαραίτητες αλλαγές (εισαγωγή και δήλωση) στο
  αρχείο `app.module.ts`.


## Συγγραφή `MessageService`

* Αλλάζουμε τα περιεχόμενα του `message.service.ts` ώστε να γίνει ως
  εξής:
  
   ```javascript
   import { Injectable } from '@angular/core';

   @Injectable({
     providedIn: 'root'
   })
   export class MessageService {

     messages: string[] = [];

     constructor() { }

     add(message: string) {
       this.messages.push(message);
     }

     clear() {
       this.messages.length = 0;
     }

   }
   ```
    
## Χρήση του `MessageService` από το `BookService`

* Για να ενθέσουμε το `MessageService` στο `BookService`, θα πρέπει
  πρώτα να το εισάγουμε σε αυτό.
  
* Στη συνέχεια, θα δηλώσουμε ένα πεδίο `MessageService` δίνοντάς το ως
  παράμετρο στον κατασκευαστή του `BookService`. 
  
* Τότε, για να στείλουμε ένα μήνυμα στο `MessageService` αρκεί να
  καλέσουμε τη μέθοδο `MessageService.add()`, όπως κάνουμε στο
  `getBooks()`.
  

<div class="notes">

Έχουμε φτιάξει δύο υπηρεσίες, την `BookService` και την
`MessageService`, και η `BookService` χρησιμοποιεί την
`MessageService`. Αυτό είναι ένα σενάριο «υπηρεσία-σε-υπηρεσία»
(service-in-service).

</div>

## `book.service.ts` {#book.service.ts-message.service}

```javascript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Book } from './book;
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

}
```
    
<div class="notes">

Αν προσέξετε, θα παρατηρήσετε ότι στέλνουμε το μήνυμα πριν φέρουμε τα
βιβλία. Στην πραγματικότητα θα θέλαμε να το στείλουμε αφού τα έχουμε
λάβει. Επειδή στη συγκεκριμένη περίπτωση ξέρουμε ότι η υπόσχεση θα
πραγματοποιηθεί αμέσως, δεν μας πειράζει.

</div>
  
  
## Εμφάνιση του Μηνύματος

* Το μήνυμα που αποστέλει το `BookService` θα εμφανίζεται από το
  `MessagesComponent`. 
  
* Για να το κάνουμε αυτό, θα δηλώσουμε μια ιδιότητα `messageService`
  μέσα στο `MessageComponent`.

* Η ιδιότητα αυτή θα είναι *δημόσια* (public) γιατί θέλουμε να τη
  χρησιμοποιήσουμε στο πρότυπο `messages.component.html`.


## `messages.component.ts`


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

<div class="notes">

Πρέπει να το θυμόμαστε αυτό: μόνο δημόσιες ιδιότητες μπορούμε να
χρησιμοποιήσουμε μέσα σε ένα πρότυπο.

</div>


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
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```

