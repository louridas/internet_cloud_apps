% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular & Django

## Γενικά

* Μέχρι τώρα δεν έχουμε χρησιμοποιήσει κάποιον κανονικό εξυπηρετητεί ο
  οποίος θα ακούει τις αιτήσεις της εφαρμογής μας.

* Τώρα θα χρησιμοποιήσουμε το Angular στο frontend και το Django στο
  backend. 
  
* Συνεχίζουμε προσαρμόζοντας το
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.
  

# Δύο Εφαρμογές σε Μία

## Γενικά {#general-client-server}

* Αν θυμηθούμε, είχαμε φτιάξει μια εφαρμογή, την `djbr`,
  χρησιμοποιώντας το Django.
  
* Επίσης έχουμε φτιάξει μια εφαρμογή, την `bangular`, χρησιμοποιώντας
  το Angular.
  
* Τώρα θα τις συνδέσουμε.


## Δομή καταλόγων (1)

* Φτιάχνουμε έναν κατάλογο `bangular_djbr`.

* Μέσα στον κατάλογο αυτό μεταφέρουμε την εφαρμογή `djbr`, σε έναν
  κατάλογο που τον ονομάζουμε `server`.
  
* Επίσης μεταφέρουμε την εφαρμογή `bangular` σε έναν κατάλογο που τον
  ονομάζουμε `client`.
  
  
## Δομή καταλόγων (2)

* Θα έχουμε λοιπόν μια δομή καταλόγων που τα δύο πρώτα επίπεδά της θα
  είναι:
  
   ```
   bangular_djbr
   ├── client
   │   ├── README.md
   │   ├── angular.json
   │   ├── e2e
   │   ├── node_modules
   │   ├── package-lock.json
   │   ├── package.json
   │   ├── src
   │   ├── tsconfig.json
   │   └── tslint.json
   └── server
       ├── db.sqlite3
       ├── djbr
       ├── manage.py
       ├── project_site
       ├── seed_books.csv
       ├── seed_books.csv~
       ├── setup.py
       └── venv
   ```

# Ανάκτηση βιβλίων

## Υπηρεσία HTTP

* Η εφαρμογή μας θα επικοινωνεί μέσω HTTP προκειμένου να ανακτήσει τις
  πληροφορίες των βιβλίων.

* Για το σκοπό αυτό θα χρησιμοποιήσει την υπηρεσία `HTTPClient`
  του Angular.

* Εισάγουμε την υπηρεσία `HTTPClient` στο `AppModule`.

* Προσαρμόζουμε τον πίνακα `@NgModule.imports`


## `app.module.ts`

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ItalicsDirective } from './italics.directive';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ItalicsDirective,
    BookDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Κλήση HTTP από το `BookService` (1)

* Για να γίνει η κλήση HTTP από το `BookService`, θα πρέπει να
  εισάγουμε τα εξής:
  
   ```javascript
   import { HttpClient, HttpHeaders } from '@angular/common/http';
   ```

* Για να ενθέσουμε το `HttpClient` στο `BookService` θα το δηλώσουμε
  σε μία ιδιωτική ιδιότητα στον κατασκευαστή:
  
   ```javascript
   constructor(private http: HttpClient,
               private messageService: MessageService) { }
   ```

## Κλήση HTTP από το `BookService` (2)

* Στη συνέχεια, θα προσθέσουμε μια ιδιότητα που θα δείχνει το URL το
  οποίο θα χρησιμοποιούμε για να επικοινωνήσουμε με τον εξυπηρετητή:
  
   ```javascript
   private booksUrl = 'api/books';
   ```

* Θα προσθέσουμε επίσης μια μέθοδο για να καταγράφουμε τη χρήση της
  υπηρεσίας:
  
   ```javascript
   private log(message: string): void {
     this.messageService.add('BookService: ' + message);
   }
   ```
  
## Η μέθοδος `getBooks()`

* Για να διαβάσουμε βιβλία από τον εξυπηρετητή θα αλλάξουμε τη μέθοδο
  `getBooks()` στο `BookService` από:

   ```javascript
   getBooks(): Observable<Book[]> {
     this.messageService.add('BookService: fetched books');
     return of(BOOKS);
   }
   ```
  σε:
  
   ```javascript
   getBooks(): Observable<Book[]> {
     return this.http.get<Book[]>(this.booksUrl);
   }
   ```

## Χρήση Διαμεσολαβητή (Proxy)

* Στη διάρκεια της ανάπτυξης, μας βολεύει να τρέχουμε το Angular μέσω
  του node.js, όπως κάνουμε μέχρι τώρα.
  
* Για να το κάνουμε αυτό, θα χρησιμοποιήσουμε ένα διαμεσολαβητή
  (proxy).


## `proxy.conf.json`

* Δημιουργούμε ένα αρχείο `proxy.conf.json` στον κατάλογο `client/`
  με τα εξής περιεχόμενα:
  
   ```javascript
   {
     "/api": {
       "target": "http://localhost:8000",
       "secure": false
     }
   }
   ``` 

<div class="notes">

Η παράμετρος `secure: false` σημαίνει ότι δεν θα παραπονεθεί αν το
πιστοποιητικό που θα δώσει ο εξυπηρετητής, στην περίπτωση που
χρησιμοποιούμε HTTPS, δεν είναι έγκυρο.

</div>


## `angular.json`

* Στο αρχείο `client/angular.json` ρυθμίσουμε την παράμετρο
  `proxyConfig` ώστε να χρησιμοποιεί το διαμεσολαβητή που περιγράψαμε.
  
   ```javascript
   "serve": {
     "builder": "@angular-devkit/build-angular:dev-server",
     "options": {
       "browserTarget": "bangular:build",
       "proxyConfig": "proxy.conf.json"
   },
   ```

## Χειρισμός Λαθών

* Θα πρέπει να εξασφαλίσουμε ότι η εφαρμογή μας εξακολουθεί να
  λειτουργεί σωστά ακόμα και αν προκύψουν λάθη.
  
* Θα φτιάξουμε μια μέθοδο `handleError()` στο `BookService` για να
  χειριζόμαστε τα λάθη που μπορεί να εμφανιστούν.
  
   ```javascript
   /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
   private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {

       // TODO: send the error to remote logging infrastructure
       console.error(error); // log to console instead

       // TODO: better job of transforming error for user consumption
       this.log(`${operation} failed: ${error.message}`);

       // Let the app keep running by returning an empty result.
       return of(result as T);
     };
   }
   ```

<div class="notes">

Στην JavaScript όλες οι παράμετροι μιας συνάρτησης είναι προαιρετικές.
Για να δηλώσουμε ότι μια παράμετρος μιας συνάρτησης είναι προαιρετική
στην TypeScript, προσθέτουμε το `?` στο τέλος του ονόματός της.

</div>

## Διασύνδεση Τελεστών (1)

* Η μέθοδος `HttpClient.get()` επιστρέφει ένα `Observable`.

* Εμείς θέλουμε στη συνέχεια να εφαρμόσουμε δύο τελεστές επάνω του:

  * `tap`
  
  * `catchError`
  

## Διασύνδεση Τελεστών (2)

* Κατ' αρχήν πρέπει να τους εισάγουμε στο `BookService`:

   ```javascript
   import { catchError, map, tap } from 'rxjs/operators';
   ```

* Στη συνέχεια αλλάζουμε τη μέθοδο `getBooks()`:

   ```javascript
   getBooks(): Observable<Book[]> {
     return this.http.get<Book[]>(this.booksUrl)
       .pipe(
         tap(_ => this.log('fetched books')),
         catchError(this.handleError('getBooks', []))
       );
   }
   ```

<div class="notes">

Για να διασυνδέσουμε τους τελεστές, τους καλούμε μέσα στη μέθοδο
`pipe()`. Το `Observable` που προέρχεται από την κλήση της
`HttpClient.get()` διοχετεύεται στον τελεστή `tap`· ο τελεστής
επιστρέφει ένα `Observable` το οποίο με τη σειρά του διοχετεύεται στον
τελεστή `catchError`.

</div>


## Τελεστής `tap` / `do`

<img src="do.png" alt="tap" style="width: 800px;"/>

<div class="notes">

Ο τελεστής `tap` παίρνει τις τιμές του `Observable` όπως έρχονται και
εκτελεί τον κώδικα που του έχουμε δώσει *χωρίς να αλλάζει τις τιμές*.
Αυτός είναι και ο λόγος που ονομάζεται `tap`: κρυφακούει, σαν να
είχαμε βάλει κοριό (wire tap). Ο τελεστής `tap` ονομάζεται επίσης
`do`, αλλά επειδή υπάρχει η δομή `do...while` στην JavaScript και
TypeScript δεν θα μπορούσαμε να το χρησιμοποιήσουμε εδώ (μπορούμε να
το χρησιμοποιήσουμε γενικώς ως `.do()`).

Εδώ χρησιμοποιούμε το `tap` με μία συνάρτηση, αλλά μπορούμε να του
δώσουμε μέχρι τρεις:

  * η πρώτη δίνει τι θέλουμε να εκτελεστεί για κάθε δεδομένο που μας
    έρχεται 
    
  * η δεύτερη δίνει τι θέλουμε να εκτελεστεί σε περίπτωση κάποιου
    λάθους
    
  * η τρίτη δίνει τι θέλουμε να εκτελεστεί αν τελειώσει η σειρά των
    δεδομένων που μας έρχεται

Συνεπώς, το `tap` είναι ένας τρόπος να έχουμε παράπλευρες ενέργειες
(side effects) παράλληλα με τα δεδομένα που έρχονται. Επιστρέφει το
`Observable` που δέχεται, έχοντας κάνει ό,τι επιπλέον του έχουμε ζητήσει.

</div>


## Τελεστής `catchError`

<img src="catch.png" alt="catch" style="width: 800px;"/>

<div class="notes">

Ο τελεστής `catchError` λαμβάνει μια ειδοποίηση λάθους από το
`Observable` από το οποίο διαβάζει τιμές και, αντί να το διανείμει
στους συνδρομητές του, τα αντικαθιστά με κάτι άλλο, ώστε να επιτρέψει
τη συνέχιση της εκτέλεσης του προγράμματος.

</div>


## Εύρεση ενός βιβλίου

* Για την εύρεση των στοιχείων ενός βιβλίου, θα αλλάξουμε τη μέθοδο
  `getBook()` του `BookService`:
  
   ```javascript
   /** GET book by id. Will 404 if id not found */
   getBook(id: number): Observable<Book> {
     const url = `${this.booksUrl}/${id}`;
     return this.http.get<Book>(url).pipe(
       tap(_ => this.log(`fetched book id=${id}`)),
       catchError(this.handleError<Book>(`getBook id=${id}`))
     );
   }
   ```


# Ενημέρωση στοιχείων βιβλίου


## Η τωρινή κατάσταση

* Αν δοκιμάσουμε να αλλάξουμε τον τίτλο ενός βιβλίου, θα δούμε ότι
  αυτός αλλάζει στην οθόνη με τις λεπτομέρειες του βιβλίου.

* Aλλά αν επιστρέψουμε στη λίστα των βιβλίων, θα διαπιστώσουμε ότι
  η αλλαγή δεν διατηρείται.

* Θα πρέπει, μέσω της υπηρεσίας `HTTPClient`, να αποθηκεύουμε τις
  αλλαγές στον εξυπηρετητή.
  

## Αποθήκευση στοιχείων βιβλίου (1)

* Στο `book-detail.component.html` θα προσθέσουμε ένα κουμπί για
  την αποθήκευση των στοιχείων του βιβλίου.
  
   ```html
   <button (click)="save()">Save</button>
   ```

## Αποθήκευση στοιχείων βιβλίου (2)

* Θα υλοποιήσουμε τη μέθοδο `save()` στο `BookDetailComponent`:

   ```javascript
   save(): void {
     this.bookService.updateBook(this.book)
       .subscribe(() => this.goBack());
   }
   ```

## Αποθήκευση στοιχείων βιβλίου (3)

* Τέλος, θα υλοποιήσουμε τη μέθοδο `updateBook()` στο `BookService`:

   ```javascript
   /** PUT: update the book on the server */
   updateBook (book: Book): Observable<any> { 
     const url = `${this.booksUrl}/${book.id}`;   
     return this.http.put(url, book, httpOptions).pipe(
       tap(_ => this.log(`updated book id=${book.id}`)),
       catchError(this.handleError<any>('updateBook'))
     );
   }
   ```

## Η μέθοδος `HttpClient.put()`

* Η μέθοδος `HttpClient.put()` παίρνει τρεις παραμέτρους:

   * το URL
   
   * τα δεδομένα προς ενημέρωση
   
   * παραμέτρους για το πρωτόκολλο HTTP

* Στην περίπτωσή μας, πρέπει να περάσουμε τις εξής παραμέτρους, τις
  οποίες τις δηλώνουμε στο αρχείο `book.service.ts` πριν τον ορισμό
  της κλάσης `BookService`:
  
   ```javascript
   const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
   ```

# Προσθήκη βιβλίων

## Τι θέλουμε να κάνουμε

* Εκτός από αλλαγές σε υπάρχοντα βιβλία, θέλουμε να μπορούμε και να
  αποθηκεύουμε νέα βιβλία.

* Για να προσθέσουμε ένα βιβλίο θα πρέπει να δώσουμε τον τίτλο, ένα
  URL (μπορεί να το αφήσουμε κενό), και το έτος έκδοσής του.


## Προσθήκη βιβλίου (1)

* Στο `books.component.html` θα προσθέσουμε στο πάνω μέρος τα πεδία
εισόδου και ένα κουμπί για την προσθήκη νέου βιβλίου.

   ```html
   <div>
     <label>Book title:</label> <input #bookTitle /> 
     <label>Book URL:</label> <input #bookUrl />
     <label>Publication date:</label> <input #bookPubDate />
     <!-- (click) passes input values to add() and then clears input -->
     <button (click)="add(bookTitle.value, bookUrl.value, bookPubDate.value);
                      bookTitle.value=''; 
                      bookUrl.value='';
                      bookPubDate.value='';
                      bookTitle.value=''">
       Add
     </button>
   </div>
   ```

<div class="notes">

Η σύνταξη `#bookTitle` είναι δήλωση μιας *αναφοράς* ([template
reference
variable](https://angular.io/guide/template-syntax#ref-vars). Αυτή
μπορεί να αναφέρεται είτε σε ένα στοιχείο του DOM είτε σε μία οδηγία ή
σε ένα εξάρτημα του Angular. Αφού δηλώσουμε μια αναφορά, στη συνέχεια
μπορούμε να τη χρησιμοποιήσουμε στο υπόλοιπο πρότυπο (χωρίς το `#`). Η
τιμής της δίνεται από την ιδιότητα `value`.

</div>

## Προσθήκη βιβλίου (2)

* Στη συνέχεια θα υλοποιήσουμε τη μέθοδο `add()` στο `BooksComponent`:

   ```javascript
   add(title: string, url: String, pubYearStr: string): void {
     title = title.trim();
     url = url.trim();
     let pub_year = +pubYearStr;
     if (!title || !pub_year) { return; }
     this.bookService.addBook({ title, url, pub_year } as Book)
       .subscribe(book => {
         // If the operation has failed, BookService's handleError()
         // will have given an empty result; so we add to the
         // books array only if a non-empty result has been produced.
         if (book) { 
           this.books.push(book);
         }
       });
   }
   ```

## Προσθήκη βιβλίου (3)

* Τέλος, θα υλοποιήσουμε τη μέθοδο `addBook()` στο `BookService`:

   ```javascript
   /** POST: add a new book to the server */
   addBook (book: Book): Observable<Book> {
     return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
       tap((book: Book) => this.log(`added book w/ id=${book.id}`)),
       catchError(this.handleError<Book>('addBook'))
     );
   }
   ```

# Διαγραφή βιβλίων

## Τι θέλουμε να κάνουμε

* Εκτός από αλλαγές σε υπάρχοντα βιβλία και προσθήκη βιβλίων, θέλουμε
  να μπορούμε και να διαγράφουμε βιβλία.

* Θα επιλέγουμε το προς διαγραφή βιβλίο από ένα κουμπί που θα
  εμφανίζεται στο πλάι του στη λίστα των βιβλίων.


## Διαγραφή βιβλίου (1)

* Στο `books.component.html` θα προσθέσουμε στη λίστα των βιβλίων
  δίπλα στον τίτλο κάθε βιβλίου ένα κουμπί για τη διαγραφή του:
  
   ```html
   <ul class="books">
     <li *ngFor="let book of books">
       <a routerLink="/detail/{{book.id}}">
         <span class="badge">{{book.id}}</span> {{book.title}}
       </a>
       <button class="delete" title="delete book"
               (click)="delete(book)">x</button>
     </li>
   </ul>
   ```

## Διαγραφή βιβλίου (2)

* Θα υλοποιήσουμε τη μέθοδο `delete()` στο `BooksComponent`:

   ```javascript
   delete(book: Book): void {
     this.books = this.books.filter(h => h !== book);
     this.bookService.deleteBook(book).subscribe();
   }
   ```

<div class="notes">

Αρχικά σβήνουμε το βιβλίο από τον πίνακα που διατηρούμε στη μεταβλητή
`this.books`. Στη συνέχεια καλούμε τη μέθοδο `deleteBook()` του
`BookService`.

Αν και το `BooksComponent` δεν χρησιμοποιεί πουθενά το `Observable`
που επιστρέφει το `deleteBook()`, πρέπει παρ' όλα αυτά να γραφτεί
συνδρομητής σε αυτό. Αυτό συμβαίνει γιατί ένα `Observable` δεν κάνει
τίποτε μέχρι να γραφτεί κάποιος συνδρομητής σε αυτό. Άρα εδώ, για να
γίνει η διαγραφή, πρέπει κάποιος να γραφτεί συνδρομητής σε αυτήν·
ακόμα και στη συνέχεια αδιαφορήσει για το τι θα γίνει.

</div>

## Διαγραφή βιβλίου (3)

* Στη συνέχεια, θα υλοποιήσουμε τη μέθοδο `deleteBook()` στο
  `BookService`:
  
   ```javascript
   /** DELETE: delete the book from the server */
   deleteBook(book: Book | number): Observable<Book> {
     const id = typeof book === 'number' ? book : book.id;
     const url = `${this.booksUrl}/${id}`;

     return this.http.delete<Book>(url, httpOptions).pipe(
       tap(_ => this.log(`deleted book id=${id}`)),
       catchError(this.handleError<Book>('deleteBook'))
     );
   }
   ```

<div class="notes">

Το `book: Book | number` είναι ένα παράδειγμα *ένωσης τύπων* [(union
type)](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types)
στην TypeScript. Αυτό σημαίνει ότι το `book` μπορεί να είναι είτε
τύπου `Book` είτε τύπου `number`. Στη συνέχεια, στην πρώτη γραμμή της
συνάρτησης, συμπεριφερόμαστε αναλόγως για να πάρουμε τον κωδικό του
βιβλίου. 

</div>


# Αναζήτηση βιβλίων

## Τι θέλουμε να κάνουμε

* Θα προσθέσουμε στην εφαρμογή μας τη δυνατότητα αναζήτησης βιβλίου.

* Για να το κάνουμε αυτό, θα δημιουργήσουμε μια υπηρεσία αναζήτησης.


## Προσθήκη `searchBooks()`

* Στο `BookService` προσθέτουμε τη μέθοδο `searchBooks()`:

   ```javascript
   /* GET books whose title contains search term */
   searchBooks(term: string): Observable<Book[]> {
     if (!term.trim()) {
       // if not search term, return empty book array.
       return of([]);
     }
     return this.http.get<Book[]>(`api/books/?title=${term}`).pipe(
       tap(_ => this.log(`found books matching "${term}"`)),
       catchError(this.handleError<Book[]>('searchBooks', []))
     );
   }
   ```

## Προσθήκη αναζήτησης στο ταμπλό

* Η αναζήτηση θα γίνεται μέσω του ταμπλό. Θα προσθέσουμε λοιπόν σε
  αυτό τον επιλογέα του εξαρτήματος αναζήτησης `app-book-search`, το
  οποίο θα φτιάξουμε αμέσως μετά. Το αρχείο `dashboard.component.html` 
  θα γίνει:
  
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

   <app-book-search></app-book-search>
   ```

## Δημιουργία εξαρτήματος αναζήτησης

* Θα ξεκινήσουμε την κατασκευή του εξαρτήματος αναζήτησης χρησιμοποιώντας το
  Angular CLI:
  
   ```bash
   ng generate component book-search
   ```

* Θα δημιουργηθεί ο κατάλογος `src/app/book-search` και μέσα σε αυτόν
  τα αρχεία:
  
    * `book-search.component.css`
    
    * `book-search.component.html`
    
    * `book-search.component.spec.ts`
    
    * `book-search.component.ts`

* Επίσης θα γίνουν οι απαραίτητες αλλαγές (εισαγωγή, δήλωση) στο
  αρχείο `app.module.ts`.


## Πρότυπο αναζήτησης (1)

* Το εξάρτημα της αναζήτησης θα κατασκευάζεται στην οθόνη σύμφωνα με
  το παρακάτω πρότυπο, στο αρχείο `book-search.component.html`:
  
   ```html
   <div id="search-component">
     <h4>Book Search</h4>

     <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />

     <ul class="search-result">
       <li *ngFor="let book of books$ | async" >
         <a routerLink="/detail/{{book.id}}">
           {{book.title}}
         </a>
       </li>
     </ul>
   </div>
   ```

## Πρότυπο αναζήτησης (2)

* Όταν ο χρήστης πληκτρολογεί έναν όρο αναζήτησης, καλείται η μέθοδος
`search()` του `BookSearchComponent`.

* Τα βιβλία που θα εμφανίζονται θα βρίσκονται στην ιδιότητα `books$` η
οποία θα είναι τύπου `Observable`.

* Η κατάληξη `$` είναι σύμβαση που δείχνει ότι το `books$` είναι ένα
  `Observable`, όχι απλώς ένας πίνακας.

* Για να τα χειριστούμε, τα διοχετεύουμε στο `async`, ώστε η λίστα των
  βιβλίων να ενημερώνεται καθώς έρχονται αποτελέσματα.

* Το `async` αντιστοιχεί στη διοχέτευση `AsyncPipe` του Angular. Αυτή
  γράφεται συνδρομητής στο `Observable` ώστε να χειρίζεται τα δεδομένα
  όπως έρχονται.


## Η κλάση `Subject`

* Για να χειριστούμε τους όρους αναζήτησης στο `BookSearchComponent`
  θα χρησιμοποιήσουμε την κλάση `Subject`.

* Ένα αντικείμενο τύπου `Subject` είναι ένα `Observable` στο οποίο
  μπορούμε, εκτός από το να γραφτούμε συνδρομητές, να του σπρώξουμε
  τιμές.

* Με άλλα λόγια, είναι *παρατηρητής* (observer), αφού μπορεί να
  γραφτεί συνδρομητής σε ένα `Observable`, αλλά είναι και
  `Observable`, αφού μπορεί να εκπέμψει τιμές.
  

## Χειρισμός όρων αναζήτησης

* Στο `BookSearchComponent` θα προσθέσουμε τη μέθοδο `search()` με την
  οποία θα σπρώχνουμε στους όρους αναζήτησης αυτά που πληκτρολογεί ο
  χρήστης. 

   ```javascript
   private searchTerms = new Subject<string>();

   // Push a search term into the observable stream.
   search(term: string): void {
     this.searchTerms.next(term);
   }
   ```

<div class="notes">

Κάθε φορά που ο χρήστης πληκτρολογεί κάτι στο πεδίο εισόδου, καλείται
η συνάρτηση `search()` με παράμετρο τα περιεχόμενα του πεδίου εισόδου.
Χρησιμοποιούμε τη μεταβλητή `searchTerms`, που είναι τύπου `Subject`,
για να εκπέμψουμε τον όρο αναζήτησης. Αυτό σημαίνει ότι οι συνδρομητές
της `searchTerms` θα μπορούν να λαμβάνουν τους όρους αναζήτησης, όπως
τους εισάγει ο χρήστης.

</div>

## Αρχικοποίηση ιδιότητας `books` (1)

* Όταν αρχικοποιείται η κλάση `BookSearchComponent`, στη μέθοδο
  `ngOnInit()`, θα συνδέουμε τους όρους αναζήτησης (`searchTerms`) με
  τη μεταβλητή `books$` του `BookSearchService`:
  
   ```javascript
   ngOnInit(): void {
     this.books$ = this.searchTerms.pipe(
       // wait 300ms after each keystroke before considering the term
       debounceTime(300),

       // ignore new term if same as previous term
       distinctUntilChanged(),

       // switch to new search observable each time the term changes
       switchMap((term: string) => this.bookService.searchBooks(term)),
     );
   }
   ```

<div class="notes">

Στην αρχικοποίηση του `BookSearchComponent` διοχετεύουμε τις τιμές του
`searchTerms` σε μία σειρά τελεστών:

  * Το `debounceTime(300)` εισάγει μια καθυστέρηση 300ms μεταξύ της
    εκπομπής των όρων αναζήτησης. Εκπέμπει μια τιμή μόνο αν έχει περάσει
    ένα συγκεκριμένο χρονικό διάστημα χωρίς άλλη εκπομπή.

  * Το `distinctUntilChanged()` εξασφαλίζει ότι αναζητήσεις θα
    πραγματοποιούνται μόνο αν οι όροι αναζήτησης αλλάζουν.

  * Το `switchMap()` εξασφαλίζει ότι στην περίπτωση που γίνουν πολλαπλές
    αιτήσεις, θα απορριφθούν τα αποτελέσματα όλων πλην της τελευταίας.

Έτσι το `Observable` `books$` θα εκπέμπει τα αποτελέσματα των
αναζητήσεων που γίνονται αφού τηρηθούν τα παραπάνω.


</div>


## `debounceTime`


<img src="debounce_time.png" alt="debounceTime" style="width: 800px;"/>


## `BookSearchComponent`

* Το αρχείο `book-search.component.ts` στο σύνολό του θα είναι:

  ```javascript
  import { Component, OnInit } from '@angular/core';

  import { Observable } from 'rxjs/Observable';
  import { Subject }    from 'rxjs/Subject';
  import { of }         from 'rxjs/observable/of';

  import {
     debounceTime, distinctUntilChanged, switchMap
   } from 'rxjs/operators';

  import { Book } from '../book';
  import { BookService } from '../book.service';

  @Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: [ './book-search.component.css' ]
  })
  export class BookSearchComponent implements OnInit {
    books$: Observable<Book[]>;
    private searchTerms = new Subject<string>();

    constructor(private bookService: BookService) {}

    // Push a search term into the observable stream.
    search(term: string): void {
      this.searchTerms.next(term);
    }

    ngOnInit(): void {
      this.books$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => this.bookService.searchBooks(term)),
      );
    }
  }
  ```

## `book-search.component.css`

* Για το αισθητικό κομμάτι του `BookSearchComponent` θα
χρησιμοποιήσουμε το παρακάτω στυλ, στο αρχείο
`book-search.component.css`:

   ```css
   /* BookSearch private styles */
   .search-result li {
     border-bottom: 1px solid gray;
     border-left: 1px solid gray;
     border-right: 1px solid gray;
     width:195px;
     height: 16px;
     padding: 5px;
     background-color: white;
     cursor: pointer;
     list-style-type: none;
   }

   .search-result li:hover {
     background-color: #607D8B;
   }

   .search-result li a {
     color: #888;
     display: block;
     text-decoration: none;
   }

   .search-result li a:hover {
     color: white;
   }
   .search-result li a:active {
     color: white;
   }
   #search-box {
     width: 200px;
     height: 20px;
   }


   ul.search-result {
     margin-top: 0;
     padding-left: 0;
   }


   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```
