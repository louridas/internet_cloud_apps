% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 2 CLI

## Γενικά

* Μέχρι τώρα ξεκινήσαμε δημιουργώντας την εφαρμογή μας δημιουργώντας
  κάποια «μαγικά» αρχεία, τα οποία τα αντιγράφαμε από τη μία έκδοση
  στην άλλη.

* Τώρα θα δούμε πώς μπορούμε να δημιουργούμε τις εφαρμογές μας με το
  [Angular CLI](https://cli.angular.io/).


## Δημιουργία έργου (1)

* Δίνουμε:

    ```bash
    ng new angular_cli
    ```
    
* Όταν ολοκληρωθεί η εκτέλεση της εντολής, μπαίνουμε στον κατάλογο
  `angular_cli`:
    ```bash
    cd angular_cli
    ```

## Δημιουργία έργου (2)

* Ως αποτέλεσμα θα δημιουργηθεί η παρακάτω δομή καταλόγων και αρχείων:

    ```bash
    .editorconfig
    README.md
    src/app/app.component.css
    src/app/app.component.html
    src/app/app.component.spec.ts
    src/app/app.component.ts
    src/app/app.module.ts
    src/app/index.ts
    src/assets/.gitkeep
    src/environments/environment.prod.ts
    src/environments/environment.ts
    src/favicon.ico
    src/index.html
    src/main.ts
    src/polyfills.ts
    src/styles.css
    src/test.ts
    src/tsconfig.json
    src/typings.d.ts
    angular-cli.json
    e2e/app.e2e-spec.ts
    e2e/app.po.ts
    e2e/tsconfig.json
    .gitignore
    karma.conf.js
    package.json
    protractor.conf.js
    tslint.json
    ```

## Προσαρμογή `main.ts`

* Στο `main.ts` προσθέτουμε το `import 'rxjs';` οπότε γίνεται:

    ```javascript
    import './polyfills.ts';

    import 'rxjs';

    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { enableProdMode } from '@angular/core';
    import { environment } from './environments/environment';
    import { AppModule } from './app/';

    if (environment.production) {
      enableProdMode();
    }

    platformBrowserDynamic().bootstrapModule(AppModule);
    ```

## Προσαρμογή `AppComponent`

* Αλλάζουμε το προκατασκευασμένο `app.component.ts` ώστε να είναι:

    ```javascript
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: [ './app.component.css' ]
    })
    export class AppComponent {
      title = 'Bangular';
    }
    ```

## Προσαρμογή `app.component.html`

* Στη συνέχεια αντικαθιστούμε το προκατασκευασμένο
  `app.component.html` με το παρακάτω:

    ```html
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/books" routerLinkActive="active">Books</a>
    </nav>
    <router-outlet></router-outlet>
    ```

## Προσαρμογή `app.component.css`

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

## Δημιουργία κλάσης `Book`

* Η εφαρμογή μας χρησιμοποιεί μια κλάση `Book`.

* Τη δημιουργούμε δίνοντας:
    ```bash
    ng generate class Book
    ```
 * Με την εντολή αυτή δημιουργείται το αρχείο `src/app/book.ts`

## Προσαρμογή κλάσης

* Η κλάση `Book` στο σημείο αυτό είναι άδεια.

* Αλλάζουμε τα περιεχόμενα του `src/app/book.ts` ώστε να είναι:

    ```javascript
    export class Book {
      id: number;
      title: string;
      pub_year: number;
    }
    ```

# Δημιουργία Υπηρεσιών

## Γενικά

* Θα κατασκευάσουμε τις παρακάτω υπηρεσίες:
    * `BookService`
    * `BookSearchService`

## Δημιουργία υπηρεσίας `BookService`

* Για τη δημιουργία της υπηρεσίας `BookService` δίνουμε:
    ```bash
    ng generate service Book
    ```
* Θα δημιουργηθούν τα αρχεία:
    ```bash
    src/app/book.service.spec.ts
    src/app/book.service.ts
    ```

## Προσαρμογή `BookService`

* Το `BookService` που δημιουργήθηκε δεν κάνει τίποτε.

* Αντιγράφουμε τα περιεχόμενα του αρχείου `book.service.ts` από την
  προηγούμενη έκδοση της εφαρμογής.

## `BookService`

```javascript
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Book } from './book';

@Injectable()
export class BookService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private booksUrl = 'api/books/';

  constructor(private http: Http) { }

  getBooks(): Promise<Book[]> {
    return this.http.get(this.booksUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Book[])
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

  update(book: Book): Promise <Book> {
    const url = `${this.booksUrl}/${book.id}`;
    return this.http
        .put(url, JSON.stringify(book), { headers: this.headers })
        .toPromise()
        .then(() => book)
        .catch(this.handleError);
  }

  create(title: string, pubDate: number): Promise <Book> {
    return this.http
      .post(this.booksUrl, JSON.stringify({ title: title, pubDate: pubDate }),
        { headers: this.headers })
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
```

## Δημιουργία υπηρεσίας `BookSearchService`

* Για τη δημιουργία της υπηρεσίας `BookSearchService` δίνουμε:
    ```bash
    ng generate service BookSearch
    ```
* Θα δημιουργηθούν τα αρχεία:
    ```bash
    src/app/book-search.service.spec.ts
    src/app/book-search.service.ts
    ```

## Προσαρμογή `BookSearchService`

* Το `BookService` που δημιουργήθηκε δεν κάνει τίποτε.

* Αντιγράφουμε τα περιεχόμενα του αρχείου `book-search.service.ts` από την
  προηγούμενη έκδοση της εφαρμογής.

## `BookSearchService`

```javascript
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Book } from './book';

@Injectable()
export class BookSearchService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http) {}

  search(term: string): Observable<Book[]> {
    return this.http
      .get(`api/books/?title=${term}`, { headers: this.headers } )
      .map((r: Response) => r.json() as Book[]);
  }
}
```

# Δημιουργία εξαρτημάτων

## Γενικά

* Θα χρειαστούμε τα ακόλουθα εξαρτήματα:
    * `BookDetailComponent`
    * `BooksComponent`
    * `BookSearchComponent`
    * `DashboardComponent`

* Δημιουργούμε το κάθε ένα από αυτά με την εντολή:
    ```bash
    ng generate component name-of-component
    ```
    ή εναλλακτικά:
    ```bash
    ng g component name-of-component
    ```

## `BookDetailComponent`

* Για τη δημιουργία του `BooksComponent` δίνουμε:
    ```bash
    ng generate component BookDetail
    ```
    
* Οπότε θα δημιουργηθούν τα:
    ```bash
    src/app/book-detail/book-detail.component.css
    src/app/book-detail/book-detail.component.html
    src/app/book-detail/book-detail.component.spec.ts
    src/app/book-detail/book-detail.component.ts
    ```

## Προσαρμογή `book-detail.component.ts`

* Το `book-detail.component.ts` ουσιαστικά δεν έχει λειτουργικότητα.

## `book-detail.component.ts`

```javascript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from '../book.service';

import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: [ './book-detail.component.css' ]
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

  save(): void {
    this.bookService.update(this.book)
      .then(() => this.goBack());
  }

}
```

## Προσαρμογή `book-detail.component.html`

* To `book-detail.component` που δημιουργήθηκε είναι:
    ```html
    <p>
      book-detail works!
    </p>
    ```
* Θα το αλλάξουμε σε:

    ```html
    <div *ngIf="book">
      <h2>{{book.title}} details:</h2>
      <div><label>id: </label>{{book.id}}</div>
      <label>title: </label>
      <input [(ngModel)]="book.title" placeholder="title">
      <div><label>Publication year: </label>{{book.pub_year}}</div>
      <button (click)="goBack()">Back</button>
      <button (click)="save()">Save</button>
    </div>
    ```

## Προσαρμογή `book-detail.component.css`

* To `book-detail.component.css` που δημιουργήθηκε είναι κενό.

## `book-detail.component.css`

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

## `BooksComponent`

* Για τη δημιουργία του `BooksComponent` δίνουμε:
    ```bash
    ng generate component Books
    ```

* Οπότε θα δημιουργηθούν τα:
    ```bash
    src/app/books-component/books.component.css
    src/app/books-component/books.component.html
    src/app/books-component/books.component.spec.ts
    src/app/books-component/books.component.ts
    ```

## Προσαρμογή `books.component.ts`

```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../book';

import { BookDetailComponent } from '../book-detail/book-detail.component';

import { BookService } from '../book.service';

@Component({
  selector: 'my-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
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

  delete(book: Book): void {
    this.bookService
      .delete(book.id)
      .then(() => {
        this.books = this.books.filter(b => b !== book);
        if (this.selectedBook === book) { this.selectedBook = null; }
      });
  }
}
```

## Προσαρμογή `books.component.html`

```html
<h2>Books</h2>
<div>
  <label>Book title:</label> <input #bookTitle />
  <label>Publication date:</label> <input #bookPubDate />
  <button (click)="add(bookTitle.value, bookPubDate.value);
                   bookTitle.value=''; bookPubDate.value=''">
    Add
  </button>
</div>
<ul class="books">
  <li *ngFor="let book of books"
      [class.selected]="book === selectedBook"
      (click)="onSelect(book)">
    <button class="delete"
      (click)="delete(book); $event.stopPropagation()">x</button>
    <span class="badge">{{book.id}}</span>
    <span> {{book.title}} </span>
  </li>
</ul>
<div *ngIf="selectedBook">
  <h2>
    {{selectedBook.title | uppercase}}
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
```

## Προσαρμογή `books.component.css`

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

button.delete {
  position: relative;
  float:right;
  margin-top: 2px;
  margin-right: .8em;
  background-color: gray !important;
  color: white;
}
```

## `BookSearchComponent`

* Για τη δημιουργία του `BookSearchComponent` δίνουμε:
    ```bash
    ng generate component BookSearch
    ```

* Οπότε θα δημιουργηθούν τα:
    ```bash
    src/app/book-search/book-search.component.css
    src/app/book-search/book-search.component.html
    src/app/book-search/book-search.component.spec.ts
    src/app/book-search/book-search.component.ts
    ```

## Προσαρμογή `book-search.component.ts`

```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BookSearchService } from '../book-search.service';
import { Book } from '../book';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: [ './book-search.component.css' ],
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

## Προσαρμογή `book-search.component.html`

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

## Προσαρμογή `book-search.component.css`

```css
.search-result{
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  width:295px;
  height: 20px;
  padding: 5px;
  background-color: white;
  cursor: pointer; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#search-box{
  width: 200px;
  height: 20px;
}
```

## `DashboardComponent`

* Για τη δημιουργία του `DashboardComponent` δίνουμε:
    ```bash
    ng generate component Dashboard
    ```

* Οπότε θα δημιουργηθούν τα:
    ```bash
    src/app/dashboard/dashboard.component.css
    src/app/dashboard/dashboard.component.html
    src/app/dashboard/dashboard.component.spec.ts
    src/app/dashboard/dashboard.component.ts
    ```

## Προσαρμογή `dashboard.component.ts`

    ```javascript
    import { Component, OnInit } from '@angular/core';

    import { Book } from '../book';
    import { BookService } from '../book.service';

    @Component({
      selector: 'my-dashboard',
      templateUrl: './dashboard.component.html',
      styleUrls: [ './dashboard.component.css' ]
    })
    export class DashboardComponent implements OnInit {

      books: Book[] = [];

      constructor(private bookService: BookService) { }

      ngOnInit(): void {
        this.bookService.getBooks()
          .then(books => this.books = books.slice(0, 4));
      }

    }
    ```

## Προσαρμογή `dashboard.component.html`

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
<book-search></book-search>
```

## Προσαρμογή `dashboard.component.css`

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

# Τελικές αλλαγές

## Γενικά

* Θα ολοκληρώσουμε τις απαιτούμενες αλλαγές με τα:
    * `app.module.ts`
    * τις διαδρομές της εφαρμογής
    * τα καθολικά στυλ της εφαρμογής

## Προσαρμογή `app.module.ts`

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './book.service';

import { BookSearchComponent } from './book-search/book-search.component';

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
    BooksComponent,
    BookSearchComponent
  ],
  providers: [ BookService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Ορισμός διαδρομών

* Για να ορίσουμε τις διαδρομές της εφαρμογής μας, δημιουργούμε το
  αρχείο `src/app/app-routing.module.ts`:

    ```javascript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';

    import { DashboardComponent } from './dashboard/dashboard.component';
    import { BooksComponent } from './books/books.component';
    import { BookDetailComponent } from './book-detail/book-detail.component';

    const routes: Routes = [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'books', component: BooksComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'detail/:id', component: BookDetailComponent }
    ];

    @NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [ RouterModule ]
    })
    export class AppRoutingModule { }
    ```

## Καθολικά στυλ

* Για να ορίσουμε τα καθολικά στυλ της εφαρμογής μας, αλλάζουμε το
  `styles.css` ως εξής:

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

# Εγκατάσταση της εφαρμογής

## Γενικά

* Η εφαρμογή μας θα τρέχει σε έναν server (π.χ. Django).

* Όλα τα αρχεία που την απαρτίζουν θα πρέπει λοιπόν να συγκεντρωθούν
  και να αντιγραφούν στον server ο οποίος θα τα διαθέτει.

## Build

* Για να δημιουργήσουμε τα πακέτα της εφαρμογής θα πρέπει να
  εκτελέσουμε την εντολή:
    ```bash
    ng build
    ```
* Τα αρχεία της εφαρμογής θα δημιουργηθούν στον κατάλογο `dist`.

* Στη συνέχεια τα αντιγράφουμε στον κατάλληλο κατάλογο του server που
  θα χρησιμοποιήσουμε (π.χ. `static` στο Django).


