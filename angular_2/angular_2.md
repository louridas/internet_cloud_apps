% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 2

## Γενικά {#angular-general}

* Μέχρι στιγμής έχουμε δει τη δομή μιας εφαρμογής Angular, αλλά δεν
  έχουμε δει πώς μπορούμε να φτιάξουμε μια εφαρμογή με πιο ρεαλιστική
  λειτουργικότητα.

* Για να γίνει αυτό θα πρέπει να δούμε σε περισσότερη λεπτομέρεια
  διάφορα στοιχεία του Angular.

* Θα προσαρμόσουμε το 
  [online tutorial](https://angular.io/docs/ts/latest/tutorial/)
  της Google.


# Αρχικό στήσιμο

## Δημιουργία Σκελετού

* Θα φτιάξουμε μια εφαρμογή η οποία θα χειρίζεται βιβλία, κριτικές,
  κ.λπ.
  
* Θα ονομάσουμε την εφαρμογή μας bangular (= books Angular).
  
* Για να δημιουργήσουμε τον σκελετό της εφαρμογής δίνουμε:

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
  και στη συνέχεια να πλοηγηθούμε στη διεύθυνση:
  
    `http://localhost:4200/`.


## Scripts και `package.json`

* Η εντολή `npm start` που δίνουμε ερμηνεύεται με βάση τα ορισθέντα
  στο αρχείο `package.json`.
  
* Πράγματι, στο αρχείο αυτό υπάρχει ένα τμήμα `scripts`, το οποίο
  ορίζει τις εντολές που μπορούμε να καλέσουμε μέσω του npm.
  

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


## Root Module

* Αυτή τη στιγμή έχουμε κατασκευάσει το *κέλυφος* (shell) της
  εφαρμογής μας. 

* Το κέλυφος της εφαρμογής υλοποείται σε ένα *άρθρωμα* (module) το οποίο
  έχει κατασκευάσει το Angular.
  
* Κάθε εφαρμογή έχει τουλάχιστον ένα άρθρωμα το οποίο ονομάζεται root module. 


## Αρθρώματα

* Κάθε άρθρωμα στο Angular είναι μια *ενότητα μεταγλώττισης* (compilation
  context).

* Αυτό σημαίνει ότι κάθε άρθρωμα περιέχει ό,τι χρειάζεται για να
  μεταγλωττιστεί από τον μεταγλωττιστή στης TypeScript χωρίς λάθη.
  
* Ένα άρθρωμα μπορεί να περιέχει διάφορα αρχεία που υλοποιούν
  επιμέρους λειτουργικότητες.
  

## Εξαρτήματα

* Ένα άρθρωμα μπορεί να περιέχει έναν αριθμό *εξαρτημάτων* (components).
  
* Ένα εξάρτημα ελέγχει ένα μέρος της οθόνης, το οποίο ονομάζεται *view*. 

* Ένα view ορίζεται από τον κώδικα του εξαρτήματος, το πρότυπο, και το
  στυλ εμφάνισης.


## `AppComponent`

* Το κέλυφος της εφαρμογής ελέγχεται από ένα εξάρτημα το οποίο
  ονομάζεται `AppComponent`.
  
* Η υλοποίηση του εξαρτήματος αυτού μοιράζεται στα αρχεία:

  * `app.component.ts`: ο κώδικας της κλάσης του εξαρτήματος, σε TypeScript.
    
  * `app.component.html`: το πρότυπο του εξαρτήματος, σε HTML.
   
  * `app.compponent.css`: το στυλ του εξαρτήματος, σε CSS.


## Αλλαγή του τίτλου της εφαρμογής

* Για να αλλάξουμε τον τίτλο της εφαρμογής ώστε να ξεκινάει με
  κεφαλαίο αλλάζουμε αναλόγως το αρχείο `app.component.ts`:
  
    ```javascript
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'Bangular';
    }
    ```
    
<div class="notes">


Η λέξη `export` που βλέπουμε μπροστά από το `class AppComponent`
σημαίνει ότι η κλάση αυτή μπορεί να χρησιμοποιηθεί και από άλλα
JavaScript αρθρώματα (modules) με τη χρήση της αντίστοιχης εντολής
`import`.

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
    
    
## Αλλαγή προτύπου κελύφους

* Επίσης θα αλλάξουμε το `app.component.html`, το οποίο θα γίνει
  απλώς:
  
   ```html
   <h1>{{title}}</h1>
   ```

## Καθολικό στυλ

* Στο αρχείο `src/styles.css` θα ορίσουμε το καθολικό στυλ της εφαρμογής.

* Το αρχείο θα γίνει ως εξής (διάφορα στοιχεία θα μας χρειαστούν στη
  συνέχεια):
  
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
     margin-right: 10px;
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

   /* everywhere else */
   * {
     font-family: Arial, Helvetica, sans-serif;
   }


   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```

# Χειρισμός βιβλίου

## Εξάρτημα Βιβλίου

* Θα προχωρήσουμε στην κατασκευή του εξαρτήματος για την εμφάνιση και
  το χειρισμό βιβλίων.
  
* Αυτό θα γίνει μέσω του Angular CLI.


## Κατασκευή σκελετού εξαρτήματος

* Για να κατασκευάσουμε ένα νέο εξάρτημα, δίνουμε:

   ```bash
   ng generate component books
   ```
    
* Η εντολή αυτή θα δημιουργήσει έναν νέο κατάλογο, `src/app/books`, με
  τα εξής αρχεία:
  
    * `books.component.css`
    
    * `books.component.html`
    
    * `books.component.spec.ts`
    
    * `books.component.ts`


## Ενημέρωση `app.module.ts`

* Επίσης ενημερώνει κατάλληλα το αρχείο `app.module.ts`:

   ```javascript
   import { BrowserModule } from '@angular/platform-browser';
   import { NgModule } from '@angular/core';

   import { AppComponent } from './app.component';
   import { BooksComponent } from './books/books.component';

   @NgModule({
     declarations: [
       AppComponent,
       BooksComponent
     ],
     imports: [
       BrowserModule
     ],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

## Δήλωση Εξαρτημάτων

* Στο Angular, κάθε εξάρτημα πρέπει να δηλώνεται σε ακριβώς ένα
  άρθρωμα (module).
  
* Αυτό ισχύει και για το `BooksComponent`.

* Δεν χρειάστηκε να το δηλώσουμε εμείς γιατί το Angular CLI έκανε τις
  απαραίτητες αλλαγές στο `app.module.ts` όταν δημιουργήσαμε το
  `BooksComponent`. 
  
* Πράγματι, μπορείτε να δείτε ότι εισάγεται (`import`), και ότι
  περιλαμβάνεται στον πίνακα `declarations`.
  

## `books.component.ts`

* Το αρχείο `books.component.ts` είναι ως εξής:

   ```javascript
   import { Component, OnInit } from '@angular/core';

   @Component({
     selector: 'app-books',
     templateUrl: './books.component.html',
     styleUrls: ['./books.component.css']
   })
   export class BooksComponent implements OnInit {

     constructor() { }

     ngOnInit() {
     }

   }
   ```
 
<div class="notes">

Στην αρχή του εξαρτήματος πρέπει να εισάγουμε τον διακοσμητή
`@Component`, προκειμένου να τον εφαρμόσουμε στην κλάση που θέλουμε.
Επίσης, πρέπει να εισάγουμε το `OnInit`, ώστε να μπορούμε να γράψουμε
τυχόν κώδικα αρχικοποίησης σε μία μέθοδο που ονομάζεται `ngOnInit`. Το
Angular θα καλέσει αυτή τη μέθοδο λίγο μετά τη δημιουργία του
εξαρτήματος. Θα δούμε την ακριβή λειτουργία αργότερα.

Το εξάρτημα, δηλώνει στα μεταδεδομένα του:
 
   * Τον επιλογέα του (`selector`), με τον οποίο θα μπορούμε να το
     χρησιμοποιούμε στον κώδικα HTML.
     
   * Το πρότυπό του (`templateURL`).
   
   * Τα στυλ του (`styleUrls`).
   
</div>


## Εμφάνιση Βιβλίου (1)

* Προσθέτουμε στο `books.component.ts` μια ιδιότητα `title` με τον
  τίτλο ενός βιβλίου:
  
   ```javascript
   import { Component, OnInit } from '@angular/core';

   @Component({
     selector: 'app-books',
     templateUrl: './books.component.html',
     styleUrls: ['./books.component.css']
   })
   export class BooksComponent implements OnInit {

     title = 'Infinite Jest';

     constructor() { }

     ngOnInit() {
     }

   }
   ``` 

## Εμφάνιση Βιβλίου (2)

* Στη συνέχεια αλλάζουμε το πρότυπο στο αρχείο `books.component.html`:

    ```html
    {{title}}
    ```

* Οι χαρακτήρες `{{` και `}}` ειδοποιούν το Angular ότι στο σημείο
  αυτό θα τοποθετηθούν οι αντίστοιχες τιμές από το εξάρτημα
  (component) του προτύπου.

* Αυτό ονομάζεται *μονόδρομη σύνδεση δεδομένων* (one-way data
  binding).


## Προσαρμογή `app.component.html`

* Για να χρησιμοποιήσουμε το εξάρτημα που φτιάξαμε, θα πρέπει να το
  βάλουμε στο κατάλληλο σημείου του προτύπου που θέλουμε.

* Θα το βάλουμε στο πρότυπο του κελύφους της εφαρμογής, άρα το αρχείο
  `app.component.html` θα γίνει:
  
   ```html
   <h1>{{title}}</h1>
   <app-books></app-books>
   ```

* Μπορείτε να επιβεβαιώσετε ότι η εμφάνιση της σελίδας στον browser
  έχει αλλάξει.


## Εναλλακτική δήλωση HTML

* Εναλλακτικά, αν ο κώδικας HTML που αντιστοιχεί σε ένα εξάρτημα είναι
  μικρός, μπορούμε να τον συμπεριλάβουμε κατευθείαν στο εξάρτημα αντί
  να τον έχουμε σε ξεχωριστό αρχείο.
  
* Στην περίπτωσή μας, θα γράφαμε στο `app.component.ts`:

   ```javascript
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-root',
     template: `<h1>{{title}}</h1>
               <app-books></app-books>`
     styleUrls: ['./app.component.css']
   })
   export class AppComponent {
     title = 'Bangular';
   }
   ```

* Προσέξτε τα backticks (` `). Μπορούμε να βάλουμε και ' ' ή " ",
    αλλά τα backticks στην TypeScript μας επιτρέπουν να έχουμε
    συμβολοσειρές πολλών γραμμών. 


## Μοντελοποίηση βιβλίων 

* Προς το παρόν, δείχνουμε μόνο έναν τίτλο ενός βιβλίου.

* Θέλουμε όμως ένα βιβλίο να έχει περισσότερες ιδιότητες.

* Για το σκοπό αυτό θα χρησιμοποιήσουμε μια κλάση ώστε τα βιβλία να
  είναι αντικείμενα αυτής της κλάσης.


## Ορισμός βιβλίου

* Φτιάχνουμε στον κατάλογο `src/app` ένα αρχείο `book.ts` με τα
  ακόλουθα περιεχόμενα:

   ```javascript
   export class Book {
     id: number;
     title: string;
     url: string;
     pub_year: number;
   }
   ```

## Εναλλακτική δημιουργία αρχείου

* Εναλλακτικά, μπορούμε να δώσουμε:

   ```bash
   ng generate class book
   ```
    
* Στην περίπτωση αυτή το Angular CLI θα δημιουργήσει το αρχείο
  `src/app/book.ts` με περιεχόμενα:
  
    ```javascript
    export class Book {
    }
    ```
    
* Αλλάζουμε το αρχείο όπως παραπάνω.


## Τύποι μεταβλητών στην TypeScript

* Στην προηγούμενη δήλωση κλάσης βλέπουμε ότι δηλώνουμε κάποιες
  ιδιότητες (πεδία) και τύπους.
  
* Στην TypeScript οι μεταβλητές έχουν τύπους. Οι τύποι είναι:
    * `number`
    * `boolean`
    * `string`
    * Array
    * Tuple
    * `enum`
    * `any`
    * `void`
    * `null`, `undefined`
    * `never`
    

## Δημιουργία Βιβλίου (1)

* Από τη στιγμή που έχουμε στη διάθεσή μας μια κλάση `Book`, μπορούμε
  να κατασκευάσουμε ένα αντικείμενο αυτής της κλάσης.

* Συγκεκριμένα, η ιδιότητα `book` του `BooksComponent` θα είναι ένα
  αντικείμενο: 

   ```javascript
   import { Component, OnInit } from '@angular/core';
   import { Book } from '../book';
   
   @Component({
     selector: 'app-books',
     templateUrl: './books.component.html',
     styleUrls: ['./books.component.css']
   })
   export class BooksComponent implements OnInit {

     book: Book = {
       id: 1,
       title: 'Infinite Jest',
       url: 'https://en.wikipedia.org/wiki/Infinite_Jest',
       pub_year: 1996
     };

     constructor() { }

     ngOnInit() {
     }

   }
   ```

<div class="notes">

Προσέξτε ότι για να χρησιμοποιήσουμε την κλάση `Book` στο
`BookComponent` θα πρέπει να την εισάγουμε με το κατάλληλο `import`.

</div>

## Δημιουργία Bιβλίου (2)

* Μπορούμε να παρατηρήσουμε ότι τώρα η σελίδα μας δεν εμφανίζεται
  σωστά.

* Θα πρέπει ταυτόχρονα να αλλάξουμε και το πρότυπο
  `books.component.html`, ώστε να χρησιμοποιεί πλέον αυτό το βιβλίο:
  
   ```html   
   <h2>{{ book.title | uppercase }} Details </h2>
   <div><span>id: </span>{{ book.id }}</div>
   <div><span>title: </span>{{ book.title }}</div>
   <div><span>URL: </span>{{ book.url }}</div>
   <div><span>publication year: </span>{{ book.pub_year }}</div>
   ```

## Διοχετεύσεις

* Για την επικεφαλίδα με τον τίτλο χρησιμοποιήσαμε τον κώδικα:

   ```html
   <h2>{{ book.title | uppercase }} Details </h2>
   ```
    
* Το `uppercase` είναι μία οδηγία (directive) *διοχέτευση* (pipe).

* Το Angular έχει ένα σύνολο έτοιμων διοχετεύσεων που μπορούμε να
  χρησιμοποιήσουμε για τη μορφοποίηση συμβολοσειρών, ημερομηνιών,
  χρηματικών ποσών, κ.λπ. 
  
* Για περισσότερες πληροφορίες δείτε τη [σχετική
  τεκμηρίωση](https://angular.io/guide/pipes).


## Αλλαγές στο βιβλίο

* Στη συνέχεια, θέλουμε να μπορούμε να αλλάξουμε τον τίτλο του
  βιβλίου.

* Για να το κάνουμε αυτό, θα πρέπει να δώσουμε τη δυνατότητα στο
  χρήστη να μπορεί να αλλάζει τα δεδομένα που εμφανίζονται στην οθόνη,
  όπως περίπου με τις κλασικές φόρμες (αλλά πιο δυναμικά).
  
* Για το σκοπό αυτό πρέπει να χρησιμοποιήσουμε το `FormsModule` που
  μας δίνει η Angular.


## `FormsModule`

* Για να ενεργοποιήσουμε την αμφίδρομη σύνδεση, θα πρέπει να
  χρησιμοποιήσουμε το πακέτο `FormsModule`. Για το σκοπό αυτό πρέπει
  το αρχείο `app.module.ts` να γίνει όπως το παρακάτω:

   ```javascript
   import { BrowserModule } from '@angular/platform-browser';
   import { NgModule } from '@angular/core';
   import { FormsModule } from '@angular/forms';

   import { AppComponent } from './app.component';
   import { BooksComponent } from './books/books.component';

   @NgModule({
     declarations: [
       AppComponent,
       BooksComponent
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

Κάναμε δύο αλλάγες. 

1. Η δυνατότητα της αμφίδρομης σύνδεσης προσφέρεται από το άρθρωμα
  `FormsModule`, οπότε χρειάζεται να το εισάγουμε στο τρέχον άρθρωμα:

   ```javascript
   import { FormsModule }   from '@angular/forms';
   ```
   
   Με τον τρόπο αυτό εισάγουμε ένα άρθρωμα TypeScript σε ένα άλλο άρθρωμα
   TypeScript. 
  
2. Στην περίπτωσή μας όμως, το `FormsModule` είναι και
  άρθρωμα της Angular (θυμηθείτε, είναι δύο διαφορετικά πράγματα). Άρα
  θα πρέπει να δηλώσουμε μέσα στο διακοσμητή `NgModule` ότι θέλουμε να
  το εισάγουμε. Για το λόγο αυτό το προσθέτουμε στη λίστα `imports`.

</div>


## Αμφίδρομη Σύνδεση (1)

* Στη συνέχεια, αλλάζουμε το `books.component.html`:

   ```html
   <h2>{{ book.title | uppercase }} Details </h2>
   <div><span>id: </span>{{ book.id }}</div>
   <div>
     <label>title:
       <input [(ngModel)]="book.title" placeholder="name"/>
     </label>
   </div>
   <div><span>URL: </span> {{ book.url }} </div>
   <div><span>publication year: </span>{{ book.pub_year }}</div>
   ```

* Τώρα, οι αλλαγές που κάνουμε φαίνονται αμέσως στον τίτλο.


## Αμφίδρομη Σύνδεση (2)

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
  

# Λίστα Βιβλίων

## Προσθήκη Λίστας

* Μέχρι τώρα έχουμε μόνο ένα βιβλίο στην εφαρμογή μας.

* Τώρα θέλουμε να την εξελίξουμε ώστε να έχουμε μία λίστα από βιβλία.


## Δημιουργία Βιβλίων

* Θα ξεκινήσουμε προσθέτοντας έναν πίνακα από βιβλία στο αρχείο
  `mock-books.ts`, στον κατάλογο `src/app`:

   ```javascript
   import { Book } from './book';

   export const BOOKS: Book[] = [
     {
       id: 11,
       title: 'Infinite Jest',
       url: 'https://en.wikipedia.org/wiki/Infinite_Jest',
       pub_year: 1996
     },
     {
       id: 12,
       title: 'Ulysses',
       url: 'https://en.wikipedia.org/wiki/Ulysses_(novel)',
       pub_year: 1922
     },
     {
       id: 13,
       title: "Gravity's Rainbow",
       url: 'https://en.wikipedia.org/wiki/Gravity%27s_Rainbow',
       pub_year: 1973
     },
     {
       id: 14,
       title: 'City on Fire',
       url: 'https://en.wikipedia.org/wiki/City_on_Fire_(Hallberg_novel)',
       pub_year: 2015
     },
     {
       id: 15,
       title: 'The Narrow Way to the Deep North',
       url: 'https://en.wikipedia.org/wiki/The_Narrow_Road_to_the_Deep_North_(novel)',
       pub_year: 2013
     },
     {
       id: 16,
       title: 'The Dispossessed',
       url: 'https://en.wikipedia.org/wiki/The_Dispossessed',
       pub_year: 1974
     },
     {
       id: 17,
       title: 'A Death in the Family: My Struggle Book 1',
       url: 'https://en.wikipedia.org/wiki/My_Struggle_(Knausg%C3%A5rd_novels)',
       pub_year: 2009
     },
     {
       id: 18,
       title: 'Conversations with Friends',
       url: 'https://en.wikipedia.org/wiki/Conversations_with_Friends',
       pub_year: 2017
     },
     {
       id: 19,
       title: 'La Septième Fonction du Langage',
       url: 'https://fr.wikipedia.org/wiki/La_Septi%C3%A8me_Fonction_du_langage',
       pub_year: 2015
     },
     {
       id: 20,
       title: "La Vérité sur l' Affaire Harry Quebert",
       url: 'https://fr.wikipedia.org/wiki/La_V%C3%A9rit%C3%A9_sur_l%27affaire_Harry_Quebert',
       pub_year: 2012
     }
   ];
   ```

<div class="notes">

Εφ' όσον η εφαρμογή μας, προς το παρόν, δεν επικοινωνεί με κάποιο
back-end, θα την ταΐσουμε με όσα δεδομένα χρειαζόμαστε. Φτιάχνουμε μια
λίστα `BOOKS` η οποία περιέχει τα βιβλία τα οποία θέλουμε αυτή τη
στιγμή να χρησιμοποιήσουμε.

</div>


## Δήλωση βιβλίων

* Μέσα στην κλάση `BooksComponent`, στο αρχείο `books.component.ts`,
  δηλώνουμε μία ιδιότητα που αναφέρεται στα βιβλία που φτιάξαμε:

   ```javascript
   books = BOOKS;
   ```

* Αντιστρόφως δεν χρειαζόμαστε πλέον την ιδιότητα `book` που είχαμε
  βάλει προηγουμένως.
  
* Αν' αυτής θα προσθέσουμε μια ιδιότητα `selectedBook` που θα
  αντιστοιχεί στο βιβλίο που επιλέγει ο χρήστης.

* Επίσης θα χρειαστεί να εισάγουμε τα βιβλία που ορίσαμε, άρα στην
  αρχή θα προσθέσουμε:
  
   ```javascript
   import { BOOKS } from '../mock-books';
   ```

## `books.component.ts`

* Το αρχείο `books.component.ts` θα είναι τότε:

   ```javascript
   import { Component, OnInit } from '@angular/core';

   import { Book } from '../book';
   import { BOOKS } from '../mock-books';

   @Component({
     selector: 'app-books',
     templateUrl: './books.component.html',
     styleUrls: ['./books.component.css'],
   })
   export class BooksComponent implements OnInit {

     books = BOOKS;
     selectedBook : Book;

     constructor() { }

      ngOnInit() {
      }

   }
   ```


## Εξέλιξη προτύπου βιβλίων

* Για να δούμε όλα τα βιβλία, αλλάζουμε το `books.component.html` ως εξής:

    ```html
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

<div class="notes">

Αφαιρέσαμε τη διοχέτευση `uppercase` γιατί αισθητικά δεν πήγαινε και
πολύ καλά.

</div>

## Δομικές οδηγίες

* Στον προηγούμενο κώδικα προσέξτε το `*ngFor` και το `*ngIf`.

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
  `BookComponent`.
  
* Το `book` είναι μια μεταβλητή που σε κάθε επανάληψη θα πάρει την
  τιμή ενός βιβλίου από το `books`.


## Η δομική οδηγία `*ngIf`

* Στο παράδειγμά μας, η δομική οδηγία `*ngIf` είναι:

   ```html
   <div *ngIf="selectedBook">
   ```
    
* Αυτό σημαίνει ότι το `<div>` και τα περιεχόμενά του θα εισαχθούν
  στην HTML σελίδα (για την ακρίβεια, στο DOM), αν το πεδίο
  `selectedBook` του `BookComponent` είναι αληθής.


## Διασύνδεση κλάσης CSS

* Παρατηρήστε την ακόλουθη γραμμή του κώδικά μας:

   ```html
   [class.selected]="book === selectedBook"
   ```

* Αυτή είναι ένα παράδειγμα *διασύνδεσης κλάσης* (class binding). Στην
  ιδιότητα class του συγκεκριμένου HTML στοιχείου θα προστεθεί ή θα
  αφαιρεθεί η τιμή `selected` αναλόγως της τιμής της έκφρασης:
  
   ```javascript
   book === selectedBook
   ```
  
* Γενικότερα, με την έκφραση 

   ```javascript
   [class.some-css-class]="some-condition"
   ```
   
   στο στοιχείο θα προστίθεται ή θα αφαιρείται η κλάση `some-css-class`
   αναλόγως της τιμής της έκφρασης `some-condition`.


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

* Αυτόν τον προσθέτουμε στην κλάση `BooksComponent`:

   ```javascript
   import { Component, OnInit } from '@angular/core';

   import { Book } from '../book';
   import { BOOKS } from '../mock-books';

   @Component({
     selector: 'app-books',
     templateUrl: './books.component.html',
     styleUrls: ['./books.component.css'],
   })
   export class BooksComponent implements OnInit {

     books = BOOKS;
     selectedBook : Book;

     constructor() { }

     ngOnInit() {
     }

     onSelect(book: Book): void {
       this.selectedBook = book;
     }

   }
   ```


## Στυλ βιβλίων

* Για τη βελτίωση της εμφάνισης της σελίδας μας, θα δημιουργήσουμε ένα
  ξεχωριστό αρχείο CSS ειδικά για τη λίστα των βιβλίων.

* Το αρχείο αυτό θα είναι το `books.component.css`:

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

   /*
   Copyright 2017-2018 Google Inc. All Rights Reserved.
   Use of this source code is governed by an MIT-style license that
   can be found in the LICENSE file at http://angular.io/license
   */
   ```

# Δημιουργία οδηγίας

## Οδηγίες Ιδιοτήτων

* Αν θέλουμε να αλλάζουμε την εμφάνιση ή τη συμπεριφορά ενός στοιχείου
  HTML (για την ακρίβεια, ενός στοιχείου DOM), μπορούμε να
  χρησιμοποιήσουμε μια *οδηγία ιδιότητας* (attribute directive).
  
* Έχουμε ήδη δει δομικές οδηγίες, όπως η `*ngFor`, και οδηγίες
  εξαρτημάτων, όπως το `app-book`.
  
* Τώρα θα δούμε πώς μπορούμε να φτιάξουμε μια απλή οδηγία ιδιότητας.


## Εμφάνιση με πλάγιους χαρακτήρες

* Θα θέλαμε να εμφανίζεται ο τίτλος του βιβλίου με πλάγιους
  χαρακτήρες, όταν δείχνουμε τις λεπτομέρειές του.
  
* Αυτό μπορεί να γίνει εύκολα με κατάλληλη χρήση CSS.

* Εμείς όμως θα το κάνουμε με μια νέα οδηγία που θα κατασκευάσουμε,
  ώστε να δούμε πώς δουλεύουν.


## Δημιουργία σκελετού οδηγίας

* Για να δημιουργήσουμε τον σκελετό της οδηγίας που θέλουμε, θα δώσουμε:
    ```
    ng generate directive italics
    ```
    
* Τότε στον κατάλογο `src/app` θα δημιουργηθούν τα αρχεία:
    * `italics.directive.spec.ts`
    * `italics.directive.ts`

* Επίσης θα προσαρμοστεί το αρχείο `app.module.ts` ώστε να εισάγει την
  οδηγία και να τη δηλώνει κατάλληλα.
  

## Ο σκελετός της οδηγίας

* Ο σκελετός της οδηγίας έχει ως εξής:

   ```javascript
   import { Directive } from '@angular/core';

   @Directive({
     selector: '[appItalics]'
   })
   export class ItalicsDirective {

     constructor() { }

   }
   ```
    
* Βλέπουμε ότι θα μπορούμε να την εφαρμόσουμε γράφοντας `appItalics`.


## Συγγραφή οδηγίας 

* Τώρα θα φτιάξουμε την οδηγία μας ώστε όταν εφαρμόζεται να μεταβάλλει
  τους χαρακτήρες του στοιχείου στο οποίο εφαρμόζεται σε πλάγιους.

   ```javascript
   import { Directive, ElementRef } from '@angular/core';

   @Directive({
     selector: '[appItalics]'
   })
   export class ItalicsDirective {

     constructor(el: ElementRef) {
       el.nativeElement.style['font-style'] = 'italic';
     }

   }
   ```
  
## Λειτουργία οδηγίας

* Εισάγουμε το `ElementRef`. Αυτό θα δείχνει στο στοιχείο του DOM στο
  οποίο εφαρμόζεται η οδηγία.
  
* Με τον κώδικα:

   ```javascript
   el.nativeElement.style['font-style'] = 'italic';
   ```
  πηγαίνουμε στο στοιχείο του DOM και προσδίδουμε στην ιδιότητα
    `font-style` την τιμή `italic`.
    
## Χρήση οδηγίας

* Για να χρησιμοποιήσουμε την οδηγία μας, αρκεί να την εισάγουμε σε
  ένα στοιχείο σε ένα πρότυπό μας. 
  
* Στην περίπτωσή μας, αλλάζουμε το `books.component.html` και τη
  γραμμή:

   ```html
   <h2>{{ selectedBook.title }} details:</h2>
   ```
  την κάνουμε:
  
   ```html
   <h2><span appItalics> {{ selectedBook.title }}</span> details:</h2>
   ```
