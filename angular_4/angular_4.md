% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 4

## Γενικά

* Θα προσθέσουμε ένα dashboard στην εφαρμογή μας.

* Θα μπορούμε να μεταβαίνουμε από το dashboard στη λίστα των βιβλίων
  και το τούμπαλιν.

* Θα μπορούμε να επιλέγουμε ένα βιβλίο είτε από το dashboard είτε από
  τη λίστα των βιβλίων.

* Θα χρειαστούν πολλές αλλαγές, τις οποίες δεν θα τις ολοκληρώσουμε με
  μιας.

* Συνεχίζουμε προσαρμόζοντας το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.


## Αρχικό στήσιμο

* Ξεκινάμε από την τελευταία έκδοση της εφαρμογής `bangular` που
  είχαμε φτιάξει

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
    │   │   ├── book-detail.component.html
    │   │   ├── book-detail.component.ts
    │   │   ├── book.service.ts
    │   │   ├── book.ts
    │   │   └── mock-books.ts
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
    "version": "1.3.0",
    ```

## Δημιουργία εξαρτήματος βιβλίων

* Αυτή τη στιγμή το εξάρτημα `AppComponent` είναι αρμόδιο για την
  εμφάνιση της λίστας των βιβλίων.

* Θα το αλλάξουμε, ώστε η λίστα των βιβλίων να έχει το δικό της
  εξάρτημα.

* Το `AppComponent` θα είναι υπεύθυνο μόνο για την πλοήγηση του
  χρήστη.

* Στην ιστοσελίδα του μαθήματος, αντιστοιχεί στον Κώδικα (v1).

## `BooksComponent` (1)

* Μετονομάζουμε τα:
  * `app.component.ts` σε `books.component.ts`
  * `app.component.html` σε `books.component.html`
  * `app.component.css` σε `books.component.css`

* Στο `books.component.ts` αλλάζουμε:
    * το όνομα της κλάσης από `AppComponent` σε `BooksComponent`
    * την τιμή της ιδιότητας `selector` από `my-app` σε `my-books`
    * την τιμή της ιδιότητας `templateUrl` από `app.component.html` σε
      `books.component.html`
    * την τιμή της ιδιότητας `styleUrls` από `[app.component.css]` σε
      `[books.component.css]`
    * αφαιρούμε την ιδιότητα `title`.

## `BooksComponent` (2)

* Το αρχείο `books.component.ts` θα είναι πλέον:

    ```javascript
    import { Component, OnInit } from '@angular/core';

    import { BookDetailComponent } from './book-detail.component';
    import { BookService } from './book.service';

    import { Book } from './book';

    @Component({
      selector: 'my-books',
      templateUrl: './books.component.html',
      styleUrls: ['./books.component.css'],
      providers: [BookService]
    })
    export class BooksComponent implements OnInit {
      books: Book[];
      selectedBook: Book;

      constructor(private bookService: BookService) { }

      ngOnInit(): void {
          this.getBooks();
      }

      onSelect(book: Book): void {
        this.selectedBook = book;
      }

      getBooks(): void {
        this.bookService.getBooks().then(books => this.books = books);
      }

    }
    ```

## `AppComponent` (1)

* Δημιουργούμε τώρα ένα νέο αρχείο `app.component.ts`.

* Το αρχείο αυτό θα ορίζει και θα εξάγει την κλάση `AppComponent`.

* Επίσης, θα έχει τα δικά του HTML και CSS αρχεία που θα το
  συνοδεύουν.

* Προσέξτε ότι ο επιλογέας (selector) θα πρέπει να είναι `app-root`.
  Αν θέλουμε κάτι άλλο, θα πρέπει να αλλάξουμε αντίστοιχα το αρχείο
  `index.html`.


## `AppComponent` (2)

* Το αρχείο `app.component.ts` θα είναι:

    ```javascript
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: 'app.component.html'
    })
    export class AppComponent {
      title = 'Bangular';
    }
    ```

## `app.component.html`

* Στη συνέχεια, φτιάχνουμε το πρότυπο HTML που συνοδεύει το
  `AppComponent`.

* Θα είναι το αρχείο `app.component.html`:

    ```html
    <h1>{{title}}</h1>
    <my-books></my-books>
    ```

## `app.module.ts` (1)

* Τέλος, θα πρέπει να δηλώσουμε τα νέα εξαρτήματα στο αρχείο
  `app.module.ts`. Συγκεκριμένα, θα πρέπει να:
  
      * τα εισάγουμε
      * να τα συμπεριλάβουμε στα `declarations`

* Επιπλέον, το `BookService` θα το συμπεριλάβουμε στη λίστα
  `providers` του `app.module.ts` γιατί θα χρησιμοποιείται από όλη την
  εφαρμογή. 


## `app.module.ts` (2)

* Το αρχείο `app.module.ts` θα είναι:

    ```javascript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule }   from '@angular/forms';

    import { AppComponent } from './app.component';
    import { BookDetailComponent }   from './book-detail.component';
    import { BooksComponent } from './books.component';
    import { BookService } from './book.service';

    @NgModule({
      declarations: [
        AppComponent,
        BookDetailComponent,
        BooksComponent
      ],
      imports: [
        BrowserModule,
        FormsModule
      ],
      providers: [BookService],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

## Αφαίρεση του `BookService` από τους παρόχους του `BooksComponent`

* Αφού το `BookService` προσφέρεται σε όλην την εφαρμογή από το
  `AppModule`, μπορούμε να το αφαιρέσουμε από τη λίστα `providers` του
  `BookComponent`.
    ```javascript
    import { Component, OnInit } from '@angular/core';

    import { BookDetailComponent } from './book-detail.component';
    import { BookService } from './book.service';

    import { Book } from './book';

    @Component({
      selector: 'my-books',
      templateUrl: './books.component.html',
      styleUrls: ['./books.component.css'],
    })
    export class BooksComponent implements OnInit {
      books: Book[];
      selectedBook: Book;

      constructor(private bookService: BookService) { }

      ngOnInit(): void {
          this.getBooks();
      }

      onSelect(book: Book): void {
        this.selectedBook = book;
      }

      getBooks(): void {
        this.bookService.getBooks().then(books => this.books = books);
      }

    }
    ```

## Εκκίνηση της εφαρμογής

* Ελέγχουμε ότι όλα πάνε καλά και ότι παρ' όλες τις αλλαγές η εφαρμογή
  παραμένει λειτουργική με:

    ```bash
    ng serve --open
    ```

# Πλοήγηση

## Γενικά

* Αντί να εμφανίζεται αυτομάτως η λίστα των βιβλίων, θέλουμε να
  εμφανίζεται μια κεντρική οθόνη πλοήγησης (dashboard).

* Από το dashboard θα μπορεί ο χρήστης να πλοηγηθεί στην εφαρμογή
  πατώντας τα κατάλληλα κουμπιά.

* Αυτό γίνεται χρησιμοποιώντας *δρομολογητές* (routers).

* Στην ιστοσελίδα του μαθήματος, αντιστοιχεί στον Κώδικα (v2).

## Προσθήκη στοιχείου `<base>`

* Ξεκινάμε πηγαίνοντας στο αρχείο `index.html`.

* Στο αρχείο αυτό προσθέτουμε το `<base href="/">` στην αρχή του
  `<head>`.

* Αυτό είναι απαραίτητο προκειμένου να δουλεύουν τα URLs που
  εμφανίζονται στον browser σαν να ήταν κανονικές σελίδες που μας
  στέλνει ένας εξυπηρετητής.

    ```html
    <head>
      <base href="/"/>
      ...
    </head>
    ```

## Ρύθμιση διαδρομών

* Η πλοήγηση ορίζεται με βάση *διαδρομές* (routes).

* Μια διαδρομή επιλέγει το τι θα δείξει ο browser αναλόγως με το
  σύνδεσμο που επιλέγει ο χρήστης.

* Για κάθε διαδρομή ορίζουμε:
    * το μονομάτι (path)
    * το εξάρτημα που θα χρησιμοποιηθεί στο συγκεκριμένο μονοπάτι

* Για το χειρισμό των διαδρομών αρμόδιος είναι ένας *δρομολογητής*
  (router). 


## Δημιουργία δρομολογητή `AppRoutingModule`

* Μια καλή πρακτική είναι ο δρομολογητής να είναι ένα άρθρωμα που
  χρησιμοποιείται από το `AppModule`.
  
* Κατά σύμβαση το ονομάζουμε `AppRoutingModule` και το αποθηκεύουμε
  στο αρχείο `app-routing.module.ts`.
  
* Φτιάχνουμε το αρχείο ως εξής:
    ```bash
    ng generate module app-routing --flat --module=app
    ```

<div class="notes">

* Το `--flat` σημαίνει ότι το αρχείο θα μπει στον κατάλογο `src/app`
  και όχι σε κάποιον ξεχωριστό δικό του.
  
* Το `--module=app` σημαίνει ότι θα συμπεριληφθεί στον πίνακα
  `imports` του `AppModule`.


## `app-routing.module.ts`

* Το αρχείο που δημιουργήθηκε έχει ως εξής:
    ```javascript
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';

    @NgModule({
      imports: [
        CommonModule
      ],
      declarations: []
    })
    ```

* Σβήνουμε το `declarations` και τις αναφορές στο `CommonModule` γιατί
  δεν μας χρειαστούν.


## Προσαρμογή του `AppRoutingModule`

* Αλλάζουμε το `AppRoutingModule` ως εξής:

    ```javascript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';

    import { BooksComponent } from './books.component';

    const routes: Routes = [
      { path: 'books', component: BooksComponent }
    ];

    @NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [ RouterModule ]
    })
    export class AppRoutingModule { }
    ```

## Εισαγωγή-εξαγωγή του `RouterModule`

* Βλέπουμε ότι το `AppRoutingModule` εισάγει *και εξάγει* το
  `RootingModule`.
  
* Εισάγει το `RootingModule` για να μπορεί να ορίσει διαδρομές
  χρησιμοποιώντας αυτήν τη βιβλιοθήκη.
  
* Εξάγει το `RootingModule` έτσι ώστε οδηγίες (directives) που
  ορίζονται από το `RootingModule` να είναι διαθέσιμες στα εξαρτήματα
  του `AppModule`.


##  Ορισμός διαδρομών

* Κάθε διαδρομή στο Angular ορίζεται μέσω ενός αντικειμένου τύπου
  `Routes`.
  
* Κάθε ένα τέτοιο αντικείμενο έχει συνήθως τις ακόλουθες ιδιότητες:
    * `path`: μια συμβολοσειρά που δείχνει τι θα πρέπει να έχει
      εισαχθεί στο URL του browser.
    * `component`: το εξάρτημα το οποίο θα δημιουργήσει και θα μας
      οδηγήσει ο δρομολογητής.


## `RouterModule.forRoot()`

* Για να αρχικοποιηθεί ο δρομολογητής και να το χρησιμοποιήσει η
  εφαρμογή μας, πρέπει να:
      * τον προσθέσουμε στον πίνακα `imports` του `AppModule`
      * να τον ρυθμίσουμε σύμφωνα με τις διαδρομές που έχουμε ορίσει.
      
* Αυτά τα δύο βήματα εκτελούνται μαζί μέσω της γραμμής:
    ```javascript
    imports: [ RouterModule.forRoot(routes) ],
    ```
    
<div class="notes">

Δεν υπάρχει κάτι μαγικό στη μέθοδο forRoot(). Όταν ένα άρθρωμα
αρχικοποιείται στη βάση της εφαρμογής μας (δηλαδή στο `AppModule`), η
σύμβαση είναι η αρχικοποίηση να γίνεται μέσω μιας μεθόδου με το όνομα
`forRoot()`. Όταν ένα άρθρωμα δεν αρχικοποιείται στη βάση της
εφαρμογής μας, η αρχικοποίηση γίνεται μέσω μια μεθόδου με το όνομα
`forChild()`.

</div>
      

## Χρήση `AppRoutingModule`

* Για να χρησιμοποιήσουμε το `AppRoutingModule`, θα πρέπει να το
  εξασφαλίσουμε ότι έχει εισαχθεί στο `AppModule` και έχει
  συμπεριληφθεί στον πίνακα `imports`.

    ```javascript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule }   from '@angular/forms';

    import { AppComponent } from './app.component';
    import { BookDetailComponent }   from './book-detail.component';
    import { BooksComponent } from './books.component';
    import { BookService } from './book.service';

    import  { AppRoutingModule } from './app-routing-module';

    @NgModule({
      declarations: [
        AppComponent,
        BookDetailComponent,
        BooksComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
      ],
      providers: [BookService],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

## Οδηγίες πλοήγησης

* Τώρα, θα χρησιμοποιήσουμε το σύνδεσμο `/books` στο πρότυπο του
  `AppComponent`, οπότε το αρχείο `app.component.html` θα γίνει:

    ```html
    <h1>{{title}}</h1>
    <a routerLink="/books">Books</a>
    <router-outlet></router-outlet>
    ```

* Τα `routerLink` και `routerOutlet` ορίζονται στο `RooterModule` και
  μπορούμε να τα χρησιμοποιήσουμε γιατί, όπως είδαμε:
      * τα εξάγουμε από το `AppRoutingModule`
      * εισάγουμε το `AppRoutingModule` στο `AppModule`, άρα είναι
        ορατά στα εξαρτήματά του.


## Η οδηγία `RouterOutlet`

* Το `router-outlet` ορίζεται στην *οδηγία* (directive) `RouterOutlet`
  που υπάρχει στο `RooterModule`.
  
* Η οδηγία αυτή υποδεικνύει σε ποιο σημείο της οθόνης θα εμφανιστεί το
  εξάρτημα που θα επιλέξει ο χρήστης μέσω της διαδρομής στο URL του
  browser. 


## Η οδηγία `RouterLink`

* Το `routerLink` ορίζεται στην οδηγία `RouterLink` που υπάρχει στο
  `RooterModule`.

* Όταν ο χρήστης επιλέξει το συγκεκριμένο σύνδεσμο, η οδηγία
  `RouterLink` θα μετατρέψει την επιλογή (κλικ) του χρήστη σε πλοήγηση
  μέσω του δρομολογητή.


# Προσθήκη dashboard

## Γενικά

* Θα φτιάξουμε μία κεντρική οθόνη πλοήγησης.

* Έτσι ο χρήστης θα πλοηγείται μεταξύ διαφορετικών όψεων της
  εφαρμογής.


## Δημιουργία dashboard

* Θα ξεκινήσουμε με ένα κενό dashboard.

* Φτιάχνουμε λοιπόν ένα αρχείο `dashboard.component.ts`:

    ```javascript
    import { Component } from '@angular/core';

    @Component({
      selector: 'my-dashboard',
      templateUrl: 'dashboard.component.html'
    })
    export class DashboardComponent { }
    ```

## Δημιουργία προτύπου HTML dashboard

* Το συνοδευτικό πρότυπο HTML του dashboard θα είναι προς το παρόν
  στοιχειώδες, στο αρχείο `dashboard.component.html`:

    ```html
    <h3>Bangular Dashboard</h3>
    ```

## Δήλωση της διαδρομής του dashboard

* Γνωστοποιούμε τη διαδρομή στην εφαρμογή μας εισάγοντάς την και
  προσθέτοντάς την στον πίνακα `Routes` στο
  `app-routing.module.ts`:

    ```javascript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';

    import { DashboardComponent } from './dashboard.component';
    import { BooksComponent } from './books.component';

    const routes: Routes = [
      { path: 'books', component: BooksComponent },
      { path: 'dashboard', component: DashboardComponent}
    ];

    @NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [ RouterModule ]
    })
    export class AppRoutingModule { }
    ```

## Δήλωση του `DashboardComponent` (1)

* Για να χρησιμοποιηθεί το `DashboardComponent` από την εφαρμογή μας,
  πρέπει να την εισάγουμε στο αρχείο `app.module.ts`.

* Επίσης, πρέπει να τη συμπεριλάβουμε στο `declarations` του
  `AppModule` (στο ίδιο αρχείο).


## Δήλωση του `DashboardComponent` (2)

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BookDetailComponent,
    BooksComponent
  ],
  providers: [ BookService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

## Ανακατεύθυνση

* Όταν ο χρήστης ξεκινάει την εφαρμογή, βρίσκεται στο μονοπάτι `/`.

* Εμείς θα τον *ανακατευθύνουμε* (redirect) στο μονοπάτι `dashboard`.

* Βάζουμε λοιπόν τη διαδρομή αυτή στο `app.routing-module.ts`:

    ```javascript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';

    import { BooksComponent } from './books.component';

    const routes: Routes = [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'books', component: BooksComponent },
      { path: 'dashboard', component: DashboardComponent}
    ];

    @NgModule({
      imports: [ RouterModule.forRoot(routes) ],
      exports: [ RouterModule ]
    })
    export class AppRoutingModule { }
    ```

## Πλοήγηση στο dashboard

* Για να μπορεί ο χρήστης να πλοηγηθεί στο dashboard, θα προσθέσουμε
  ένα σχετικό σύνδεσμο στο `app.component.html`:

    ```html
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/books">Books</a>
    </nav>
    <router-outlet></router-outlet>
    ```

* Το στοιχείο `<nav>` θα το χρησιμοποιήσουμε αργότερα.


# Εμφάνιση των πρώτων βιβλίων στο dashboard

## Γενικά

* Αντί να περιέχει μόνο τους σύνδεσμους πλοήγησης, θα αλλάξουμε το
  dashboard μας ώστε να περιέχει και τα πρώτα τέσσερα βιβλία.

* Στην ιστοσελίδα του μαθήματος, αντιστοιχεί στον Κώδικα (v3).

## Προσαρμογή `dashboard.component.html`

* Αλλάζουμε το `app/dashboard.component.html` ώστε να δείχνει τα πρώτα
  τέσσερα βιβλία:

    ```html
    <h2>Top Books</h2>
    <div class="grid grid-pad">
      <div *ngFor="let book of books" (click)="gotoDetail(book)" class="col-1-4">
        <div class="module book">
          <h4>{{book.title}}</h4>
        </div>
      </div>
    </div>
    ```

## Προσαρμογή `dashboard.component.ts` (1)

* Θα πρέπει να υλοποιήσουμε στο `DashboardComponent` τη
  λειτουργικότητα που χρειάζεται το `dashboard.component.html`.


## Προσαρμογή `dashboard.component.ts` (2)

```javascript
import { Component, OnInit } from '@angular/core';

import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks()
      .then(books => this.books = books.slice(0, 4));
  }

  gotoDetail(book: Book): void { /* TODO */ }

}
```

# Βελτίωση εμφάνισης


## Γενικά

* Η εφαρμογή αυτή τη στιγμή δεν είναι ιδιαιτέρως κομψή.

* Θα βελτιώσουμε ελαφρώς την εμφάνισή της, χρησιμοποιώντας κατάλληλα
  στυλ. 


## Βελτίωση εμφάνισης dashboard

* Για να βελτιωθεί η εμφάνιση του dashboard θα χρησιμοποιήσουμε το
  κατάλληλο CSS.
  
* Αλλάζουμε το αρχείο `dashboard.component.ts` ώστε να αναφέρει ως
  αρχείο στυλ το `dashboard.component.css`:
    ```javascript
    import { Component, OnInit } from '@angular/core';

    import { Book } from './book';
    import { BookService } from './book.service';

    @Component({
      selector: 'my-dashboard',
      templateUrl: 'dashboard.component.html',
      styleUrls: ['dashboard.component.css']
    })
    export class DashboardComponent implements OnInit {

      books: Book[] = [];

      constructor(private bookService: BookService) { }

      ngOnInit(): void {
        this.bookService.getBooks()
          .then(books => this.books = books.slice(0, 4));
      }

      gotoDetail(book: Book): void { /* TODO */ }

    }
    ```
    
## `dashboard.component.css`

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
.dashboard {
  width: 50%;
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

## Προσαρμογή `app.component.ts`

* Για να βελτιωθεί η εμφάνιση των συνδέσμων στην κορυφή της σελίδας θα
  χρησιμοποιήσουμε το κατάλληλο CSS.
  
* Αλλάζουμε το αρχείο `app.component.ts` ώστε να αναφέρει ως
  αρχείο στυλ το `app.component.css`:
    ```javascript
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: 'app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'Bangular';
    }
    ```

## `app.component.css`

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

## Καθολικό στυλ

* Για τη βελτίωση του καθολικού στυλ της εφαρμογής μας, αλλάζουμε το
  αρχείο `bangular/src/styles.css`:
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
    ```
