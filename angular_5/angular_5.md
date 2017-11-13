% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 5


## Γενικά

* Η εφαρμογή μας διαβάζει τα δεδομένα που χρειάζεται από ένα στατικό
  αρχείο που περιέχει τα βιβλία που εμφανίζει.

* Στην πραγματικότητα όμως, θα τα διαβάζει από κάποιον εξυπηρετητή.

* Η επικοινωνία μεταξύ του εξυπηρετητή και της εφαρμογής μας θα
  γίνεται μέσω HTTP.

* Συνεχίζουμε προσαρμόζοντας το
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.


## Προσομοίωση εξυπηρετητή

* Θα εξομοιώσουμε την επικοινωνία με έναν εξυπηρετητή.

* Ενώ η εφαρμογή μας θα πιστεύει ότι επικοινωνεί με έναν εξυπηρετητή
  που αποθηκεύει τα βιβλία, στην πραγματικότητα δεν θα συμβαίνει αυτό.

* Οι αιτήσεις προς τον εξυπηρετητή θα υποκλέπονται από μία βιβλιοθήκη
  που θα εγκαταστήσουμε.

* Η βιβλιοθήκη αυτή επίσης θα συνθέτει τις απαντήσεις που κανονικά θα
  παίρναμε από τον εξυπηρετητή.

* Η βιβλιοθήκη αυτή ονομάζεται [In Memory Web
  API](https://github.com/angular/in-memory-web-api).


## Εγκατάσταση In Memory Web API

* Για να εγκαταστήσουμε το In Memory Web API δίνουμε το εξής:

  ```bash
     npm install angular-in-memory-web-api --save
  ```

* Η παράμετρος `--save` σημαίνει ότι η βιβλιοθήκη στα προστεθεί στις
  εξαρτήσεις της εφαρμογής.

* Αυτό θα γίνει προσθέτοντάς την στο τμήμα `dependencies` του αρχείου
  `package.json`, το οποίο ακριβώς γίνεται με την παράμετρο `--save`.


## Χρήση του `HttpClient` και του In Memory Web API

* Η επικοινωνία με τον εξυπηρετητή θα γίνεται με το `HTTPClient`, άρα
  θα πρέπει να το εισάγουμε στο `AppModule`.

* Όπως είπαμε, η επικοινωνία θα υποκλέπτεται από το In Memory Web API
  οπότε θα το εισάγουμε και αυτό στο `AppModule`.

* Η υποκλοπή θα χρησιμοποιεί τα δεδομένα που θα χειρίζεται μια δική
  μας υπηρεσία, η `InMemoryDataService`, την οποία θα γράψουμε σε
  λίγο, και την εισάγουμε και αυτή.


## Το αρχείο `app.module.ts`

* Σύμφωνα με τα παραπάνω, το αρχείο `app.module.ts` θα εξελιχθεί ως
  εξής:
  ```javascript
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';

  import { HttpClientModule }    from '@angular/common/http';
  import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
  import { InMemoryDataService }  from './in-memory-data.service';

  import { AppComponent } from './app.component';
  import { BooksComponent } from './books/books.component';
  import { ItalicsDirective } from './italics.directive';
  import { BookDetailComponent } from './book-detail/book-detail.component';
  import { BookService } from './book.service';
  import { MessagesComponent } from './messages/messages.component';
  import { MessageService } from './message.service';
  import { AppRoutingModule } from './app-routing.module';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { BookSearchComponent } from './book-search/book-search.component';

  @NgModule({
    declarations: [
      AppComponent,
      BooksComponent,
      ItalicsDirective,
      BookDetailComponent,
      MessagesComponent,
      DashboardComponent,
      BookSearchComponent,
    ],
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
      )
    ],
    providers: [ BookService, MessageService ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  ```

<div class="notes">

Η επικοινωνία του Angular με τον εξυπηρετητή γίνεται μέσω της
υπηρεσίας `HTTPClient`. Εμείς θα παρεμβάλουμε στην επικοινωνία την υπηρεσία
`HttpClientInMemoryWebApiModule`. Η αρχικοποίησή της γίνεται με την
εντολή:

```javascript
HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
)
```

Στην εντολή αυτή δηλώνουμε ότι θα χρησιμοποιεί την υππηρεσία
`InMemoryDataService`, που θα γράψουμε σε λίγο. Επίσης δηλώνουμε ότι η
ιδιότητα `dataEncapsulation` θα είναι `false`. Η ιδιότητα
`dataEncapsulation` έχει την εξής σημασία:

* αν είναι `true`, τότε τα δεδομένα της εφαρμογής θα επιστρέφονται
από το In Memory Web API μέσα σε ένα αντικείμενο με το όνομα
`data`.

* αν είναι `false`, τότε τα δεδομένα της εφαρμογής θα επιστρέφονται
από το In Memory Web API όπως είναι, χωρίς να εμπεριέχονται σε
κάποιο επιπλέον αντικείμενο.

</div>

## Δημιουργία `InMemoryDataService`

* Δημιουργούμε το `InMemoryDataService` στο αρχείο
  `in-memory-data.service.ts` στον κατάλογο `src/app`:
  ```javascript
  import { InMemoryDbService} from 'angular-in-memory-web-api';

  import { Book } from './book';

  export class InMemoryDataService implements InMemoryDbService {

    createDb() {
      const books: Book[] = [
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
      return {books};
    }
  }
  ```

* Επίσης σβήνουμε το αρχείο `mock-books.ts`, αφού δεν το χρειαζόμαστε
  πλέον.


## Υπηρεσία HTTP

* Η εφαρμογή μας θα επικοινωνεί μέσω HTTP προκειμένου να ανακτήσει τις
  πληροφορίες των βιβλίων.

* Για το σκοπό αυτό θα χρησιμοποιήσει την υπηρεσία `HTTPClient`
  του Angular.

* Από εδώ και στο εξής, ξεχνάμε τα πάντα περί υποκλοπών. Η εφαρμογή
  μας νομίζει ότι επικοινωνεί με έναν εξυπηρετητή.


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

## Η κλάση `Observable`

* Μέχρι τώρα για να χειριστούμε ασύγχρονα δεδομένα χρησιμοποιούσαμε
  την κλάση `Promise`.

* Η υπηρεσία `HttpClient` χρησιμοποιεί την κλάση `Observable` αντ'
  αυτής.

* Η κλάση `Observable` είναι η βασική κλάση της βιβλιοθήκης
  [RxJS](http://reactivex.io/rxjs/) που χρησιμοποιείται στο Angular
  αλλά και αλλού· είναι πολύ δημοφιλής.


## `Promise` και `Observable`

* Αντικείμενα της κλάσης `Promise` μπορεί να επιστρέψουν κάποια τιμή
  από τη στιγμή που θα κληθούν.

* Ένα αντικείμενο της κλάσης `Promise` μπορεί είτε να εκπληρωθεί είτε
  να αθετηθεί.

* Αντικείμενα της κλάσης `Observable` μπορεί να γυρίσουν από μηδέν
  μέχρι (εν δυνάμει) άπειρες τιμές από τη στιγμή που θα κληθούν.

* Για να πάρουμε τις τιμές από ένα αντικείμενο `Observable` πρέπει να
  *γραφτούμε συνδρομητές* σε αυτό.


## Τιμές από `Observable`

* Υπάρχουν τριών τύπων τιμές που μπορεί να διανείμει ένα `Observable`
  στους συνδρομητές του:
  * `next`: διανείμει την επόμενη τιμή (`Number`, `String`, `Object`,
    κ.λπ.) 
  * `error`: διανείμει ένα λάθος ή μια εξαίρεση
  * `complete`: δείχνει ότι έχει ολοκληρωθεί
  
  
## Βολοδιάγραμμα (Marble Diagram)

<img src="observable.png" alt="Observable" style="width: 800px;"/>


## Η μέθοδος `getBooks()`

* Για να διαβάσουμε βιβλία από τον εξυπηρετητή θα αλλάξουμε τη μέθοδο
  `getBooks()` στο `BookService` ώστε να είναι:
  ```javascript
  /** GET books from the server */
  getBooks(): Observable<Book[]> {
   return this.http.get<Book[]>(this.booksUrl)
     .pipe(
       tap(books => this.log(`fetched books`)),
       catchError(this.handleError('getBooks', []))
     );
  }
  ```

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
(side effects) παράλληλα με τα δεδομένα που έρχονται.
</div>


## Τελεστής `tap` / `do`

<img src="do.png" alt="tap" style="width: 800px;"/>

## Τελεστής `catchError`

<img src="catch.png" alt="catch" style="width: 800px;"/>


## `books.component.ts`

* Για να δουλέψει το `BooksComponent`, θα πρέπει να γραφτεί
  συνδρομητής στο `Observable` που επιστρέφει το `BookService`:
  ```javascript
  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }
  ```

## `dashboard.component.ts`

* Ομοίως, για να δουλέψει το ταμπλό μας τώρα θα πρέπει να γραφτεί συνδρομητής
  στο `Observable` που επιστρέφει το `BookService`:
  ```javascript
  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books.slice(1, 5));
  }
  ```

## `book-detail.component.ts`

* Τέλος, για να δουλέψει η λίστα με τα βιβλία, το
  `BookDetailComponent` θα γραφτεί συνδρομητής στο `Observable` που
  επιστρέφει το `BookService`:
  ```javascript
  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => this.book = book);
  }
  ```

## Η μέθοδος `handleError()`

* Για τη διαχείριση τυχόν λαθών στην επικοινωνία μέσω HTTP θα
  προσθέσουμε την παρακάτω μέθοδο στο `BookService`:
  ```javascript 
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
  ```

<div class="notes">

Στην JavaScript όλες οι παράμετροι μιας συνάρτησης είναι προαιρετικές.
Για να δηλώσουμε ότι μια παράμετρος μιας συνάρτησης είναι προαιρετική
στην TypeScript, προσθέτουμε το `?` στο τέλος του ονόματός της.

Ο τελεστής `of` του RxJS κατασκευάζει ένα `Observable` από το
αντικείμενο που του περνάμε ως παράμετρο. Έτσι εδώ θα επιστρέψει ένα
`Observable` το οποίο θα παραδώσει την τιμή του `result`.

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
  
<div class="notes">

Προσέξτε, δεδομένου ότι υποκλέπτουμε την επικοινωνία με τον
εξυπηρετητή και τελικά επικοινωνούμε με το In Memory Web API, οι
αλλαγές δεν θα αποθηκεύονται μόνιμα, παρά μόνο μέχρι να κλείσει η
εφαρμογή.

</div>


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

* Τέλος, θα υλοποιήσουμε τη μέθοδο `update()` στο `BookService`:
  ```javascript
  /** PUT: update the book on the server */
  updateBook (book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions).pipe(
      tap(_ => this.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }
  ```

## Η μέθοδος `HttpClient.put()`

* Η μέθοδος `HttpClient.put()` παίρνει τρεις παραμέτρους:
  * το URL
  * τα δεδομένα προς ενημέρωση
  * παραμέτρους

* Στις παραμέτρους μπορούμε να περάσουμε πράγματα όπως επικεφαλίδες
  του πρωτοκόλλου ΗΤΤP.

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

* Για να προσθέσουμε ένα βιβλίο θα πρέπει να δώσουμε τον τίτλο και το
  έτος έκδοσής του.


## Προσθήκη βιβλίου (1)

* Στο `books.component.html` θα προσθέσουμε στο πάνω μέρος τα πεδία
εισόδου και ένα κουμπί για την προσθήκη νέου βιβλίου.
  ```html
  <div>
    <label>Book title:</label> <input #bookTitle />
    <label>Publication date:</label> <input #bookPubDate />
    <!-- (click) passes input values to add() and then clears input -->
    <button (click)="add(bookTitle.value, bookPubDate.value);
                     bookTitle.value=''; bookPubDate.value=''">
      Add
    </button>
  </div>
  ```

<div class="notes">

Η σύνταξη `#bookTitle` είναι δήλωση μιας *αναφοράς* ([template
reference
variable](https://angular.io/guide/template-syntax#ref-vars). Αυτή
μπορεί να αναφέρεται είτε ένα στοιχείο του DOM είτε μία οδηγία ή
εξάρτημα του Angular. Αφού δηλώσουμε μια αναφορά, στη συνέχεια
μπορούμε να τη χρησιμοποιήσουμε στο υπόλοιπο πρότυπο (χωρίς το `#`). Η
τιμής της δίνεται από την ιδιότητα `value`.

## Προσθήκη βιβλίου (2)

* Θα υλοποιήσουμε τη μέθοδο `add()` στο `BooksComponent`:
  ```javascript
  add(title: string, pubYearStr: string): void {
    title = title.trim();
    let pub_year = +pubYearStr;
    if (!title || !pub_year) { return; }
    this.bookService.addBook({ title, pub_year } as Book)
      .subscribe(book => {
        this.books.push(book);
      });
  }
  ```

</div>


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
  deleteBook (book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }
  ```

## Διαγραφή βιβλίου (4)

* Τέλος, στο `books.component.css` θα προσθέσουμε τα κατάλληλα
  στυλ ώστε το κουμπί να εμφανίζεται στα δεξιά του τίτλου:
  ```css
  .button {
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    cursor: hand;
    font-family: Arial;
  }

  button:hover {
    background-color: #cfd8dc;
  }

  button.delete {
    position: relative;
    left: 194px;
    top: -32px;
    background-color: gray !important;
    color: white;
  }
  ```

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
  αυτό τον επιλογέα του εξαρτήματος αναζήτησης, τον οποίο θα φτιάξουμε
  αμέσως μετά. Το αρχείο `dashboard.component.html` θα γίνει:
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

* Θα δημιουργηθεί ο κατάλογος `src/app/book-search` και μέσα σε αυτόν τα
  αρχεία:
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
οποία θα είναι στιγμιότυπο της κλάσης `Observable`.

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

## Αρχικοποίηση ιδιότητας `books` (1)

* Όταν αρχικοποιείται η κλάση `BookSearchComponent`, στη μέθοδο
  `ngOnInit()`, θα συνδέουμε τους όρους αναζήτησης (`searchTerms`) με
  το `BookSearchService`:
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

## Αρχικοποίηση ιδιότητας `books` (2)

* Το `debounceTime(300)` εισάγει μια καθυστέρηση 300ms μεταξύ της
  εκπομπής των όρων αναζήτησης. Εκπέμπει μια τιμή μόνο αν έχει περάσει
  ένα συγκεκριμένο χρονικό διάστημα χωρίς άλλη εκπομπή.

* Το `distinctUntilChanged()` εξασφαλίζει ότι αναζητήσεις θα
  πραγματοποιούνται μόνο αν οι όροι αναζήτησης αλλάζουν.

* Το `switchMap()` εξασφαλίζει ότι στην περίπτωση που γίνουν πολλαπλές
  αιτήσεις, θα απορριφθούν τα αποτελέσματα όλων πλην της τελευταίας.


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
  Copyright 2017 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
  */
  ```
