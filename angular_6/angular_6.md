% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular2 6

## Γενικά

* Η εφαρμογή μας διαβάζει τα δεδομένα που χρειάζεται από ένα στατικό
  αρχείο που περιέχει τα βιβλία που εμφανίζει.

* Στην πραγματικότητα όμως, θα τα διαβάζει από κάποιον εξυπηρετητή.

* Η επικοινωνία μεταξύ του εξυπηρετητή και της εφαρμογής μας θα
  γίνεται μέσω HTTP.


# Angular bangular tutorial 5

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
            app-routing.module.ts
            app.component.css
            app.component.html
            app.component.ts
            app.module.ts
            book-detail.component.ts
            book-detail.component.css
            book-detail.component.html
            book-service.ts
            books.ts
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

## Υπηρεσία HTTP

* Η εφαρμογή μας θα επικοινωνεί μέσω HTTP προκειμένου να ανακτήσει τις
  πληροφορίες των βιβλίων.

* Για το σκοπό αυτό θα χρησιμοποιήσει την υπηρεσία HTTP (HTTP service)
  του Angular.

* Για να χρησιμοποιήσουμε την υπηρεσία αυτή:
    * Εισάγουμε το `HttpModule` στο `app/app.module.ts`
    * Προσθέτουμε το `HttpModule` στα `imports` του `AppModule`.


## `app/app.module.ts` (1)

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { BookDetailComponent } from './book-detail.component';
import { BooksComponent } from './books.component';
import { BookService } from './book.service';

import  { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BookDetailComponent,
    BooksComponent
  ],
  providers: [ BookService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Προσομοιώνοντας τον εξυπηρετητή

* Επειδή αυτή τη στιγμή δεν έχουμε κάποιον εξυπηρετητή με τον οποίο να
  μπορεί να επικοινωνεί η εφαρμογή μας, θα χρησιμοποιήσουμε έναν
  ψεύτικο.

* Συγκεκριμένα, θα χρησιμοποιήσουμε μία υπηρεσία που θα προσομοιώνει
  την επικοινωνία μέσω HTTP με έναν εξυπηρετητή.

* Η υπηρεσία αυτή ονομάζεται *in-memory web API*.

* Για το σκοπό αυτό θα χρησιμοποιήσουμε το `InMemoryWebApiModule`.

* Θα πρέπει και αυτό να το εισάγουμε και να προσθέσουμε στα imports
  του `AppModule`.


## `app/app.module.ts` (2)

    ```javascript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule } from '@angular/forms';
    import { HttpModule } from '@angular/http';

    // Imports for loading & configuring the in-memory web api
    import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
    import { InMemoryDataService } from './in-memory-data.service';

    import { AppComponent } from './app.component';
    import { DashboardComponent } from './dashboard.component';
    import { BookDetailComponent } from './book-detail.component';
    import { BooksComponent } from './books.component';
    import { BookService } from './book.service';

    import  { AppRoutingModule } from './app-routing.module';

    @NgModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
      ],
      declarations: [
        AppComponent,
        DashboardComponent,
        BookDetailComponent,
        BooksComponent
      ],
      providers: [ BookService ],
      bootstrap: [ AppComponent ]
    })
    export class AppModule { }
    ```

## `InMemoryDataService`

* To `InMemoryWebApiModule` χρησιμοποιεί το `InMemoryDataService`.

* Αυτό με τη σειρά του θα είναι μια υπηρεσία που θα επιστρέφει μια
  λίστα με τα βιβλία της εφαρμογής μας.

* Πλέον δεν θα χρειαστούμε το αρχείο `app/mock-books.ts`, άρα μπορούμε
  να το σβήσουμε.


## `app/in-memory-data.service.ts`

    ```javascript
    import { InMemoryDbService } from 'angular-in-memory-web-api';
    export class InMemoryDataService implements InMemoryDbService {
      createDb() {
        let books = [
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
        return { books };
      }
    }
    ```

## Προσαρμογή `systemjs.config.js`

* Στο αρχείο `systemjs.config.js` θα πρέπει:
    * Το κλειδί `angular-in-memory-web-api` να ορίζεται ως:
    ```javascript
    'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    ```
    * Στα packages να μην υπάρχει αναφορά στο
      `angular-in-memory-web-api` (σβήνουμε το σχετικό κομμάτι, αν υπάρχει).


## Κλήση HTTP από το `BookService` (1)

* Για να γίνει η κλήση HTTP από το `BookService`, θα πρέπει να
  εισάγουμε τα εξής:

    ```javascript
    import { Headers, Http } from '@angular/http';

    import 'rxjs/add/operator/toPromise';
    ```

## Κλήση HTTP από το `BookService` (2)

* Στη συνέχεια, στο σώμα της κλάσης `BookService` θα πρέπει να
  προσθέσουμε:

    ```javascript
    private booksUrl = 'app/books';

    constructor(private http: Http) { }

    getBooks(): Promise<Book[]> {
      return this.http.get(this.booksUrl)
        .toPromise()
        .then(response => response.json().data as Book[])
        .catch(this.handleError);
    }
    ```

## Κλήση HTTP από το `BookService` (3)

* Για τη διαχείριση τυχόν λαθών στην επικοινωνία μέσω HTTP θα
  προσθέσουμε την παρακάτω μέθοδο:

    ```javascript
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
    ```

## `app/book.service.ts`

    ```javascript
    import { Injectable } from '@angular/core';
    import { Headers, Http } from '@angular/http';

    import 'rxjs/add/operator/toPromise';

    import { Book } from './book';

    @Injectable()
    export class BookService {

      private booksUrl = 'app/books';

      constructor(private http: Http) { }

      getBooks(): Promise<Book[]> {
        return this.http.get(this.booksUrl)
          .toPromise()
          .then(response => response.json().data as Book[])
          .catch(this.handleError);
      }

      getBook(id: number): Promise<Book> {
        return this.getBooks()
          .then(books => books.find(book => book.id === id));
      }

      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
    }
    ```

## Έλεγχος της εφαρμογής

* Ελέξτε ότι η εφαρμογή εξακολουθεί να λειτουργεί κανονικά.

* Θα εμφανίζει πάλι τα βιβλία όπως πριν, παρ' ότι δεν τα διαβάζει από
  ένα στατικό αρχείο αλλά τα παίρνει μέσω κλήσης HTTP.


# Ενημέρωση στοιχείων βιβλίου

## Γενικά

* Αν δοκιμάσουμε να αλλάξουμε τον τίτλο ενός βιβλίου, θα δούμε ότι
  αυτός αλλάζει στην οθόνη με τις λεπτομέρειες του βιβλίου...

* ...αλλά αν επιστρέψουμε στη λίστα των βιβλίων, θα διαπιστώσουμε ότι
  η αλλαγή δεν διατηρείται.

* Ενώ στην προηγούμενη έκδοση αλλάζαμε τη λίστα που κρατούσε η
  εφαρμογή στη μνήμη, τώρα τα βιβλία τα λαμβάνουμε μέσω HTTP.

* Συνεπώς οι αλλαγές δεν διατηρούνται αν δεν εγγραφούν στον
  εξυπηρετητή.


## Αποθήκευση στοιχείων βιβλίου (1)

* Στο `app/book-detail.component.html` θα προσθέσουμε ένα κουμπί για
  την αποθήκευση των στοιχείων του βιβλίου.

    ```html
    <button (click)="save()">Save</button>
    ```

## Αποθήκευση στοιχείων βιβλίου (2)

* Θα υλοποιήσουμε τη μέθοδο `save()` στο `BookDetailComponent`:

    ```javascript
    save(): void {
      this.bookService.update(this.book)
        .then(() => this.goBack());
    }
    ```

## Αποθήκευση στοιχείων βιβλίου (3)

* Τέλος, θα υλοποιήσουμε τη μέθοδο `update()` στο `BookService`:

    ```javascript
    update(book: Book): Promise <Book> {
      const url = `${this.booksUrl}/${book.id}`;
      return this.http
          .put(url, JSON.stringify(book), { headers: this.headers })
          .toPromise()
          .then(() => book)
          .catch(this.handleError);
    }
    ```


## Έλεγχος της εφαρμογής

* Ελέξτε ότι η εφαρμογή εξακολουθεί να λειτουργεί κανονικά.

* Δοκιμάστε να αλλάξετε τα στοιχεία ενός βιβλίου και επιβεβαιώστε ότι
  πραγματικά αλλάζουν.


# Προσθήκη βιβλίων

## Γενικά

* Εκτός από αλλαγές σε υπάρχοντα βιβλία, θέλουμε να μπορούμε και να
  αποθηκεύουμε νέα βιβλία.

* Για να προσθέσουμε ένα βιβλίο θα πρέπει να δώσουμε τον τίτλο και το
  έτος έκδοσής του.


## Προσθήκη βιβλίου (1)

* Στο `app/books.component.html` θα προσθέσουμε στο πάνω μέρος πεδία
  εισόδου και ένα κουμπί για την προσθήκη νέου βιβλίου.

    ```html
    <div>
      <label>Book title:</label> <input #bookTitle />
      <label>Publication date:</label> <input #bookPubDate />
      <button (click)="add(bookTitle.value, bookPubDate.value);
                       bookTitle.value=''; bookPubDate.value=''">
        Add
      </button>
    </div>
    ```

## Προσθήκη βιβλίου (2)

* Θα υλοποιήσουμε τη μέθοδο `add()` στο `BooksComponent`:

    ```javascript
    add(title: string, pubDateStr: string): void {
      title = title.trim();
      let pubDate = +pubDateStr;
      if (!title || !pubDate) { return; }
      this.bookService.create(title, pubDate)
        .then(book => {
          this.books.push(book);
          this.selectedBook = null;
      });
    }
    ```

## Προσθήκη βιβλίου (3)

* Τέλος, θα υλοποιήσουμε τη μέθοδο `create()` στο `BookService`:

    ```javascript
    create(title: string, pubDate: number): Promise <Book> {
      return this.http
        .post(this.booksUrl, JSON.stringify({ title: title, pubDate: pubDate }),
          { headers: this.headers })
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);
    }
    ```

## Έλεγχος της εφαρμογής

* Ελέξτε ότι η εφαρμογή εξακολουθεί να λειτουργεί κανονικά.

* Επιβεβαιώστε ότι πραγματικά μπορείτε να εισάγετε βιβλία.


# Διαγραφή βιβλίων

## Γενικά

* Εκτός από αλλαγές σε υπάρχοντα βιβλία και προσθήκη βιβλίων, θέλουμε
  να μπορούμε και να διαγράφουμε βιβλία.

* Θα επιλέγουμε το προς διαγραφή βιβλίο από ένα κουμπί που θα
  εμφανίζεται στο πλάι του στη λίστα των βιβλίων.


## Διαγραφή βιβλίου (1)

* Στο `app/books.component.html` θα προσθέσουμε στη λίστα των βιβλίων
  δίπλα στον τίτλο κάθε βιβλίου ένα κουμπί για τη διαγραφή του:

    ```javascript
    <li *ngFor="let book of books"
        [class.selected]="book === selectedBook"
        (click)="onSelect(book)">
      <button class="delete"
        (click)="delete(book); $event.stopPropagation()">x</button>
      <span class="badge">{{book.id}}</span>
      <span> {{book.title}} </span>
    </li>
    ```

## Διαγραφή βιβλίου (2)

* Θα υλοποιήσουμε τη μέθοδο `delete()` στο `BooksComponent`:

    ```javascript
    delete(book: Book): void {
      this.bookService
        .delete(book.id)
        .then(() => {
          this.books = this.books.filter(b => b !== book);
          if (this.selectedBook === book) { this.selectedBook = null; }
        });
    }
    ```

## Διαγραφή βιβλίου (3)

* Στη συνέχεια, θα υλοποιήσουμε τη μέθοδο `delete()` στο
  `BookService`:

    ```javascript
    delete(id: number): Promise<void> {
      const url = `${this.booksUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
    ```

## Διαγραφή βιβλίου (4)

* Τέλος, στο `app/books.component.css` θα προσθέσουμε τα κατάλληλα
  στυλ ώστε το κουμπί να εμφανίζεται στα δεξιά του τίτλου:

    ```css
    button.delete {
      position: relative;
      float:right;
      margin-top: 2px;
      margin-right: .8em;
      background-color: gray !important;
      color: white;
    }
    ```

## Έλεγχος της εφαρμογής

* Ελέξτε ότι η εφαρμογή εξακολουθεί να λειτουργεί κανονικά.

* Επιβεβαιώστε ότι πραγματικά μπορείτε να διαγράφετε βιβλία.


# Αναζήτηση βιβλίων

## Γενικά

* Θα προσθέσουμε στην εφαρμογή μας τη δυνατότητα αναζήτησης βιβλίου.

* Για να το κάνουμε αυτό, θα δημιουργήσουμε μια υπηρεσία αναζήτησης.

* Επίσης, θα δούμε πώς εκτός από υποσχέσεις (promises) μπορούμε να
  χρησιμοποιούμε και ένα άλλο είδους αντικειμένου, τα *παρατηρήσιμα*
  (observables).


## `Observable`

* Ένα `Observable` είναι ένα αντικείμενο το οποίο μπορεί να μας
  επιστρέψει, από τη στιγμή που το καλούμε και μετά, από καμμία έως
  άπειρες τιμές.

* Η βασική διαφορά με τις υποσχέσεις είναι ότι οι υποσχέσεις μπορεί να
  επιστρέψουν μέχρι *μία* τιμή.

* Για να λάβουμε τις τιμές ενός `Observable` πρέπει να γραφτούμε
  συνδρομητές (subscribe) σε αυτό.


## Υπηρεσία αναζήτησης

* Θα γράψουμε το `BookSearchService` στο αρχείο
  `app/book-search.service.ts`.

* Στην κλάση αυτή, η μέθοδος `search()` θα επιστρέφει ένα `Objervable`
  με τα αποτελέσματα της αναζήτησης.


## `BookSearchService`

```javascript
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Book } from './book';

@Injectable()
export class BookSearchService {
  
  constructor(private http: Http) {}

  search(term: string): Observable<Book[]> {
    return this.http
      .get(`app/books/?title=${term}`)
      .map((r: Response) => r.json().data as Book[]);
  }
}
```

## Εξάρτημα αναζήτησης

* Θα δημιουργήσουμε ένα εξάρτημα, `BookSearchComponent` το οποίο θα
  χρησιμοποιεί ο χρήστης για τις αναζητήσεις.

* Το εξάρτημα θα απαρτίζεται από τρία αρχεία:
    * `app/book-search.component.html`
    * `app/book-search.component.css`
    * `app/book-search.component.ts`


## `app/book-search.component.html` (1)

```html
<div id="search-component">
  <h4>Book Search</h4>
  <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
  <div>
    <div *ngFor="let book of books | async"
         (click)="gotoDetail(book)" class="search-result" >
      {{book.title}}
    </div>
  </div>
</div>
```

## `app/book-search.component.html` (2)

* Όταν ο χρήστης πληκτρολογεί έναν όρο αναζήτησης, καλείται η μέθοδος
  `search()` του `BookSearchComponent`.

* Τα βιβλία που θα εμφανίζονται θα βρίσκονται στην ιδιότητα `books` η
  οποία θα είναι στιγμιότυπο της κλάσης `Observable`.

* Για να τα χειριστούμε, τα διοχετεύουμε στο `async`, ώστε η λίστα των
  βιβλίων να ενημερώνεται καθώς έρχονται αποτελέσματα.


## Χειρισμός όρων αναζήτησης (1)

* Για να χειριστούμε τους όρους αναζήτησης θα χρησιμοποιήσουμε την
  κλάση `Subject`.

* Ένα αντικείμενο τύπου `Subject` παράγει μία *παρατηρίσιμη*
  (observable) ροή δεδομένων.

* Εμείς λοιπόν θα χρησιμοποιήσουμε μια ροή δεδομένων η οποία θα δίνει
  τους όρους αναζήτησης του χρήστη.


## Χειρισμός όρων αναζήτησης (2)

```javascript
private searchTerms = new Subject<string>();

// Push a search term into the observable stream.
search(term: string): void {
  this.searchTerms.next(term);
}
```

## Αρχικοποίηση ιδιότητας `books` (1)

* Όταν αρχικοποιείται η κλάση `BookSearchComponent` θα συνδέουμε τους
  όρους αναζήτησης (`searchTerms`) με το `BookSearchService`.

* Τα αποτελέσματα της αναζήτησης θα είναι με τη σειρά τους ένα
  `Observable`, το οποίο θα χρησιμοποιεί το εξάρτημα για να εμφανίζει
  ενημερωμένη τη λίστα των βιβλίων.


## Αρχικοποίηση ιδιότητας `books` (2)

```javascript
books: Observable<Book[]>;

ngOnInit(): void {
  this.books = this.searchTerms
    .debounceTime(300)        // wait for 300ms pause in events
    .distinctUntilChanged()   // ignore if next search term is same as previous
    .switchMap(term => term   // switch to new observable each time
      // return the http search observable
      ? this.bookSearchService.search(term)
      // or the observable of empty books if no search term
      : Observable.of<Book[]>([]))
    .catch(error => {
      // TODO: real error handling
      console.log(error);
      return Observable.of<Book[]>([]);
    });
}
```

## Αρχικοποίηση ιδιότητας `books` (3)

* Το `debounceTime(300)` εισάγει μια καθυστέρηση 300ms μεταξύ της
  εκπομπής των όρων αναζήτησης. 

* Το `distinctUntilChanged()` εξασφαλίζει ότι αναζητήσεις θα
  πραγματοποιούνται μόνο αν οι όροι αναζήτησης αλλάζουν.

* Το `switchMap()` εξασφαλίζει ότι στην περίπτωση που γίνουν πολλαπλές
  αιτήσεις, θα απορριφθούν τα αποτελέσματα όλων πλην της τελευταίας.


## `BookSearchComponent`

```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import './rxjs-extensions';

import { BookSearchService } from './book-search.service';
import { Book } from './book';

@Component({
  moduleId: module.id,
  selector: 'book-search',
  templateUrl: 'book-search.component.html',
  styleUrls: [ 'book-search.component.css' ],
  providers: [BookSearchService]
})
export class BookSearchComponent implements OnInit {
  books: Observable<Book[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private bookSearchService: BookSearchService,
              private router: Router) { }
  
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  ngOnInit(): void {
    this.books = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as prev
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.bookSearchService.search(term)
        // or the observable of empty books if no search term
        : Observable.of<Book[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Book[]>([]);
      });
  }
  
  gotoDetail(book: Book): void {
    let link = ['/detail', book.id];
    this.router.navigate(link);
  }
}
```

## Εισαγωγή των μεθόδων RxJS

* Για τη χρήση αντικειμένων `Observable` χρησιμοποιούμε μια σειρά
  μεθόδων, όπως:
      * `of`
      * `filter`
      * `map`
      * `switchMap`
      * `debounceTime`

* Αυτές θα πρέπει να τις εισάγουμε στις κλάσεις που τις χρησιμοποιούν.

* Θα φτιάξουμε ένα αρχείο `app/rxjs-extensions.ts` με όλα τα
  απαραίτητα imports.

* Αυτό το εισάγουμε στο `BookSearchComponent`.


## `app/rxjs-extensions.ts`

```javascript
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
```

## Έλεγχος της εφαρμογής

* Ελέξτε ότι η εφαρμογή εξακολουθεί να λειτουργεί κανονικά.

* Στο dashboard πλέον θα προσφέρεται στο χρήστη και η δυνατότητα
  αναζήτησης. 
