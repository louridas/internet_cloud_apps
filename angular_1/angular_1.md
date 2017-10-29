% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular 1

## Γενικά

* Tο [Angular](https://angular.io/docs) είναι ένα μία από τις
  δημοφιλέστερες πλατφόρμες για ανάπτυξη σύγχρονων διαδικτυακών
  εφαρμογών.

* Μας επιτρέπει να δημιουργήσουμε εφαρμογές με πολύπλοκα μοντέλα
  αλληλεπίδρασης με το χρήστη.

* Αυτό παλαιότερα μπορούσε να γίνει μόνο με τη χρήση ιδιωμάτων JavaScript.


# Angular quickstart

## Γενικά

* Θα ακολουθήσουμε το [σύντομο παράδειγμα
  (quickstart)](https://angular.io/guide/quickstart) της Google.


## Εγκατάσταση απαιτήσεων (1)

* Για να δουλέψουμε με το Angular θα πρέπει να χρησιμοποιήσουμε το
  Node.js.

* Το [Node.js](https://nodejs.org/en/) είναι ένα περιβάλλον εκτέλεσης
  JavaScript (JavaScript runtime environment).

* Η JavaScript είναι μια γλώσσα φτιαγμένη για να εκτελείται μέσα σε
  browser.


## Εγκατάσταση απαιτήσεων (2)

* Το Node.js μας δίνει τη δυνατότητα να τη χρησιμοποιήσουμε σαν
  αυτοτελή γλώσσα, εκτός browser.

* Θα πρέπει να κατεβάσετε και να εγκαταστήσετε την πιο πρόσφατη
  σταθερή έκδοση για το λειτουργικό σας σύστημα.

* Επιβεβαιώστε ότι έχει εγκατασταθεί σωστά δίνοντας `node -v` και
  `npm -v` σε ένα τερματικό παράθυρο. Οι εκδόσεις που θα δείτε πρέπει να
  είναι node v.6.9.x και έπειτα και npm 3.x.x και έπειτα.

* Αν η έκδοση του npm είναι παλαιότερη, δώστε:
    ```bash
    sudo npm install npm -g
    ```

* Το sudo απαιτείται σε υπολογιστές Mac και Linux. Σε MS-Windows απλώς
    πρέπει να τις τρέξετε ως διαχειριστής.

* Εναλλακτικά, μπορείτε να χρησιμοποιήσετε το εργαλείο [nvm (Node
  Version Manager)](https://github.com/creationix/nvm).


## Δημιουργία του περιβάλλοντος ανάπτυξης

* Εγκαταστείστε το εργαλείο γραμμής εντολών του Angular, [Angular
  CLI](https://github.com/angular/angular-cli):
    ```bash
    npm install -g @angular/cli
    ```
  η παράμετρος `-g` υποδεικνύει ότι το Angular CLI θα εγκατασταθεί
  συνολικά (globally) και όχι μόνο για το συγκεκριμένο χρήστη.

* To Angular CLI μας δίνει εντολές με τις οποίες μπορούμε εύκολα να
  δημιουργούμε και να χειριζόμαστε την ανάπτυξη προγραμμάτων Angular.

<div class="notes">

Σε περίπτωση που χρησιμοποιούμε το nvm, η παράμετρος `-g` δεν θα
εγκαταστήσει το Angular CLI σε κάποιον κεντρικό κατάλογο του
συστήματός μας, αλλά στον κατάλογο
`~/.nvm/versions/node/v6.11.5/lib/node_modules`, όπου `v6.11.5` είναι
η έκδοση του node που έχει εγκατασταθεί.

</div>

## Δημιουργία project

* Για να δημιουργήσουμε ένα νέο project το οποίο θα περιέχει μια
  στοιχειώδη εφαρμογή, δίνουμε:
    ```bash
    ng new my-app
    ```

* Η εντολή αυτή μπορεί να χρειαστεί αρκετή ώρα να εκτελεστεί, αφού θα
  πρέπει να κατέβουν και να εγκατασταθούν αρκετά πακέτα.


## Εκτέλεση της εφαρμογής

* Για να εκτελέσουμε την εφαρμογή πρώτα μπαίνουμε στον κατάλογό της:
    ```bash
    cd my-app
    ```

* Στη συνέχεια τρέχουμε τον εξυπηρετητή:
    ```bash
    ng serve --open
    ```

<div class="notes">

Ο εξυπηρετητής που τρέχει τώρα είναι ένας εξυπηρετητής που εκτελείται
μέσω του Node.js. Προς το παρόν, επαρκεί. Στην πραγματικότητα όμως
μπορούμε να έχουμε έναν άλλο εξυπηρετητή. Το Angular αφορά μόνο το
front-end της εφαρμογής μας. Το back-end μπορεί να υλοποιείται σε
οποιαδήποτε τεχνολογία, π.χ. Python (Django), Ruby, Java, κ.λπ.

</div>


## Αλλάζοντας την επικεφαλίδα

* Αυτή τη στιγμή η επικεφαλίδα λέει «Welcome to app!».

* Έστω ότι θέλουμε να την αλλάξουμε σε «Welcome to My First Angular
  App!».

* Ανοίγουμε το αρχείο `src/app/app.component.ts`.

* Αλλάζουμε τη γραμμή:
    ```javascript
    title = 'app';
    ```
  σε:
    ```javascript
    title = 'My First Angular App';
    ```

* Παρατηρούμε ότι μόλις σώσουμε το αρχείο η σελίδα της εφαρμογής μας
  ανανεώνεται αυτομάτως.


## Αλλάζοντας το στυλ

* Έστω επίσης ότι θέλουμε να αλλάξουμε το στυλ της σελίδας.

* Ανοίγουμε το αρχείο `src/app/app.component.ts` (το οποίο είναι
  άδειο) και γράφουμε:
    ```css
    h1 {
      color: #369;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 250%;
    }
    ```

* Και πάλι οι αλλαγές θα εφαρμοστούν μόλις σώσουμε το αρχείο.


# Η δομή του project

## Γενικά

* Ένα project Angular έχει την παρακάτω δομή:
    ```
    my-app
    ├── .angular-cli.json
    ├── .editorconfig
    ├── .gitignore
    ├── README.md
    ├── e2e/
    ├── karma.conf.js
    ├── node_modules/
    ├── package.json
    ├── protractor.conf.js
    ├── src/
    ├── tsconfig.json
    └── tslint.json
    ```

* Στη συνέχεια θα δούμε τι σκοπό έχουν αυτά τα αρχεία και οι
  κατάλογοι.


## Αρχεία στο βασικό κατάλογο (1)

* `.angular-cli.json`: ρυθμίσεις για το Angular CLI.

* `.editorconfig`: ρυθμίσεις ώστε να εξασφαλίζεται ότι όλοι οι
  συνεργάτες στο project χρησιμοποιούν τις ίδιες ρυθμίσεις στον editor
  που χρησιμοποιούν.

* `.gitignore`: υποδεικνύει αρχεία τα οποία πρέπει να αγνοούνται από το
  git.

* `README.md`: βασική τεκμηρίωση για το project (αρχικά, οδηγίες
  χρήσης του Angular CLI).

* `e2e`: κατάλογος που περιέχει end-to-end tests.


## Αρχεία στο βασικό κατάλογο (2)

* `karma.conf.js`: ρυθμίσεις τον οδηγό ελέγχων (test runner)
  [Karma](https://karma-runner.github.io/). Χρησιμοποιούνται όταν
  δίνουμε `ng test`.

* `node_modules`: βιβλιοθήκες που αναφέρονται στο αρχείο
  `package.json`.

* `package.json`: περιέχει τις προαπαιτούμενες βιβλιοθήκες, όπως
  επίσης και τυχόν κώδικα (scripts) που θέλουμε να εκτελείται.

* `protractor.conf.js`: ρυθμίσεις για τον οδηγό ελέγχων end-to-end
  [Protactor](http://www.protractortest.org/). Χρησιμοποιείται όταν
  δίνουμε `ng e2e`.


## Αρχεία στο βασικό κατάλογο (3)

* `src`: περιέχει τα αρχεία της εφαρμογής μας.

* `tsconfig.json`: περιέχει ρυθμίσεις για τον μεταγλωττιστή της
  TypeScript.

* `tslint`: περιέχει ρυθμίσεις για τα εργαλεία
  [TSLint](https://palantir.github.io/tslint/) και
  [Codelyzer](http://codelyzer.com/). Χρησιμοποιούνται για τον έλεγχο
  του ύφους του κώδικάς μας, όταν εκτελούμε `ng lint`.


## Το αρχείο `package.json`

* Οι εφαρμογές του Angular (και του Node.js) χρησιμοποιούν πλήθος
  βιβλιοθηκών.

* Για τον χειρισμό τους, χρησιμοποιούμε το Node Package Manager
  [(npm)](https://docs.npmjs.com/).

* Το αρχείο `package.json` περιέχει, μεταξύ άλλων, τις *εξαρτήσεις* του
  προγράμματός μας από βιβλιοθήκες.

## Εξαρτήσεις

* Οι εξαρτήσεις του προγράμματός μας είναι δύο ειδών:

    * Εξαρτήσεις εκτέλεσης. Ονομάζονται απλώς `dependencies`. Είναι απαραίτητες
      για την εκτέλεση του προγράμματός μας.

    * Εξαρτήσεις ανάπτυξης. Ονομάζονται `devDependencies`. Είναι απαραίτητες
      για τη συγγραφή του προγράμματός μας, αλλά όχι για την εκτέλεσή
      του.

## Εξαρτήσεις εκτέλεσης

* Οι εξαρτήσεις εκτέλεσης περιλαμβάνουν:

    * Χαρακτηριστικά (features): βιβλιοθήκες που υλοποιούν τις
      δυνατότητες του προγραμματιστικού πακέτου που χρησιμοποιούμε
      (π.χ., τις βιβλιοθήκες του Angular).

    * Polyfills: βιβλιοθήκες που υλοποιούν συγκεκριμένες γλωσσικές
      δομές στη JavaScript, οι οποίες μπορεί να μην προσφέρονται από
      τον browser.

    * Άλλες βιβλιοθήκες, όπως π.χ. για τη χρήση του bootstrap.


## Εξαρτήσεις ανάπτυξης

* Οι εξαρτήσεις ανάπτυξης περιλαμβάνουν βιβλιοθήκες όπως:

    * `karma`: εργαλείο για front-end tests.

    * `protractor`: εργαλείο για end-to-end tests.

    * `typescript`: ένας εξυπηρετητής για τη γλώσσα TypeScript.
      Περιλαμβάνει το μεταγλωττιστή της TypeScript, `tsc`.

    * `codelyzer`, `tslint`: βιβλιοθήκες για τον έλεγχο ύφους.

## TypeScript

* Η προτεινόμενη γλώσσα για να δουλέψουμε με το Angular είναι η
  [TypeScript](https://www.typescriptlang.org/). Για το λόγο αυτό το
  Angular 2 δεν ονομάζεται πλέον Angular.js.

* Η TypeScript είναι μια γλώσσα που βελτιώνει την JavaScript και
  μεταγλωττίζεται σε αυτήν.

* Οι ακριβείς όροι είναι «διαγλωτίζεται», «διαγλώττιση» (transpile,
  transpilation) αφού η μεταγλώττιση γίνεται από μία γλώσσα σε άλλη. 
  
* Ο μεταγλωττιστής (ή μάλλον ο διαγλωττιστής) είναι ο `tsc`.


## Συντακτικό εξαρτήσεων (1)

* Το npm χρησιμοποιεί συγκεκριμένο συντακτικό για τον προσδιορισμό των
  βιβλιοθηκών που θέλουμε, σύμφωνα με τη βιβλιοθήκη
  [semver](https://docs.npmjs.com/misc/semver).

* Οι εκδόσεις είναι συνήθως της μορφής `1.2.3`, το οποίο σημαίνει
  `[major.minor.patch]`. Μπορούν να χρησιμοποιηθούν και αστερίσκοι
  (`*`).

* Μπορούμε να δώσουμε έκδοση με έναν από τους τελεστές `<`, `<=`, `>`,
  `>=`, `=`.


## Συντακτικό εξαρτήσεων (2)

* Επίσης μπορούμε να χρησιμοποιήσουμε τον τελεστή `~` που σημαίνει:

    * Αν δίνεται το patch, επιτρέπονται αλλαγές στο patch μεχρι το
    επόμενο minor.
    ```
    ~1.2.3 := >= 1.2.3 < 1.3.0
    ```

    * Αν δίνεται το minor, επιτρέπονται αλλαγές στο minor.
    ```
    ~1.2 := >= 1.2.0 < 1.3.0 (1.2.x)
    ```
    
    * Αν δίνεται το major, επιτρέπονται αλλαγές μέχρι το επόμενο
      major.
    ```
    ~1 := >= 1.0.0 < 2.0.0 (1.x)
    ```


## Συντακτικό εξαρτήσεων (3)

* Ο τελεστής `^` επιτρέπει αλλαγές που δεν επηρεάζουν το πρώτο
  μη-μηδενικό ψηφίο.

    * `^1.2.3 := >=1.2.3 <2.0.0`

    * `^0.2.3 := >=0.2.3 <0.3.0`

    * `^0.0.3 := >=0.0.3 <0.0.4`


<div class="notes">

Αυτό σημαίνει ότι επιτρέπει patch και minor updates στις εκδόσεις από
`1.0.0` και πάνω, patch updates για τις εκδόσεις `0.Χ >= 0.1.0`, ενώ
*δεν* επιτρέπει updates για τις εκδόσεις `0.0.X`.

</div>


# Δομή της εφαρμογής

## Αρχεία της εφαρμογής

```
src/
├── app
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets
├── environments
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts
├── polyfills.ts
├── styles.css
├── test.ts
├── tsconfig.app.json
├── tsconfig.spec.json
└── typings.d.ts
```

## Αρθρώματα

* Μια εφαρμογή αποτελείται από *αρθρώματα* (modules).

* Αυτά είναι κλάσεις, οι οποίες ρυθμίζονται μέσω του διακοσμητή
  `NgModule`, ώστε να έχουν συγκεκριμένα χαρακτηριστικά.

* Τα αρθρώματα μπορούν να φορτώνονται όποτε χρειάζονται (lazy
  loading), ώστε να μην επιβραδύνεται η λειτουργία της εφαρμογής μας.

* Ένα άρθρωμα συνήθως υλοποιεί ένα σύνολο λειτουργιών.


## Root module (1)

* Κάθε εφαρμογή έχει τουλάχιστον ένα άρθρωμα, το root module.

* Στην εφαρμογή μας βρίσκεται στο αρχείο `src/app/app.module.ts`.

## Root module (2)

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Root module (3)

* Ξεκινάμε διαβάζοντας τα αρθρώματα `NgModule` και `BrowserModule`.

* Αφού η εφαρμογή μας θα τρέχει μέσα σε έναν browser, δηλώνουμε ότι το
  root module θα χρησιμοποιήσει το `BrowserModule`.

* Το root module θα χρησιμοποιεί ένα εξάρτημα (θα το δούμε στη
  συνέχεια), το `AppComponent`.

* Στο τέλος, δηλώνουμε την κλάση που θα αποτελεί το root module μας.


## Root module (4)

* To `NgModule` είναι ένας διακοσμητής που περιέχει τα μετα-δεδομένα
  που περιγράφουν το άρθρωμά μας. Συγκεκριμένα, μπορεί να περιγράφει:

    * `declarations`: τις κλάσεις σελίδων (view classes) που ανήκουν
      στο άρθρωμα. Αυτές μπορεί να είναι *εξαρτήματα* (components),
      *οδηγίες* (directives), και *σωληνώσεις* (pipes).
    * `imports`: κλάσεις που χρειαζόμαστε από άλλα αρθρώματα.
    * `exports`: κλάσεις του αρθρώματος που θα μπορούν να
      χρησιμοποιηθούν από άλλα αρθρώματα.
    * `providers`: δημιουργοί *υπηρεσιών* (services)· αυτές είναι
      διαθέσιμες στο σύνολο της εφαρμογής μας.
    * `bootstrap`: το βασικό άρθρωμα της εφαρμογής· το προσδιορίζουμε
      στο root module.

## Έναρξη εφαρμογής

* Για να ξεκινήσει μια εφαρμογή Angular, πρέπει να ξεκινήσουμε το root
  module.
  
* Αυτό γίνεται στο αρχείο `src/main.ts`.

## `src/main.ts`

```javascript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

## Εξαρτήματα

* Κάθε εφαρμογή αποτελείται από *εξαρτήματα* (components).

* Κάθε εξάρτημα είναι αρμόδιο για ένα μέρος της οθόνης (που ονομάζεται
  view), το οποίο ελέγχει μέσω ενός *προτύπου* (template).


## `AppComponent` (1)

* Στην εφαρμογή μας θα έχουμε μόνο ένα εξάρτημα.

* Αυτό βρίσκεται στο αρχείο `src/app/app.component.ts`:

    ```javascript
    import { Component } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'My First Angular App';
    }
    ```

## `AppComponent` (2)

* Ξεκινάμε διαβάζοντας το διακοσμητή `@Component`.

* Ο διακοσμητής αυτός προσδίδει συγκεκριμένες ιδιότητες στο εξάρτημα
  `AppComponent`:

    * Το κλειδί `selector` ορίζει ότι το στοιχείο HTML το οποίο θα
      αναπαραστήσει το συγκεκριμένο εξάρτημα θα έχει τον συγκεκριμένο
      επιλογέα.

    * Το κλειδί `templateUrl` ορίζει το πρότυπο που είναι αρμόδιο για την
      εμφάνιση του εξαρτήματος.
      
    * Το κλειδί `styleUrls` ορίζει τα αρχεία στυλ που θα
      χρησιμοποιηθούν. 


## `AppComponent` (3)

* Ο διακοσμητής εφαρμόζεται στην κλάση `AppComponent`, η οποία
  περιέχει όλη τη λογική του συγκεκριμένου εξαρτήματος.

* Στην περίπτωσή μας, η κλάση περιέχει μόνο το ένα δεδομένο του
  εξαρτήματος, τη μεταβλητή `title`.

* Στο τέλος *εξάγουμε* (export) την κλάση του εξαρτήματος, ώστε να
  μπορεί να τη χρησιμοποιήσει η εφαρμογή μας.


## Πρότυπα

* Κάθε άρθρωμα είναι υπεύθυνο για την εμφάνιση ενός τμήματος της
  οθόνης.
  
* Το πώς ακριβώς θα εμφανιστεί το τμήμα αυτό προσδιορίζεται από το
  πρότυπο (template) του αρθρώματος.

* Ένα πρότυπο περιέχει HTML, με μερικές επεκτάσεις που αφορούν το
  Angular. 
  
* Στην εφαρμογή μας, το πρότυπο του (μοναδικού) αρθρώματός μας
  βρίσκεται στο αρχείο `src/app/app.component.html`.
  

## `src/app/app.component.html`

```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{title}}!
  </h1>
  <img width="300" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<h2>Here are some links to help you start: </h2>
<ul>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
  </li>
</ul>
```

## Διασύνδεση δεδομένων εξαρτήματος και προτύπου

* Στο πρότυπο της εφαρμογής μας χρησιμοποιούμε τα δεδομένα του
  εξαρτήματος.
  
* Το εξάρτημά μας έχει μόνο ένα δεδομένο, στη μεταβλητή `title`.

* Εισάγουμε την τιμή της μεταβλητής `title` στο σημείο που θέλουμε με
  το συντακτικό `{{title}}`.
  
* Θα δούμε ότι η αλληλεπίδραση μεταξύ εξαρτήματος και προτύπου μπορεί
  να είναι πολύ πιο ενδιαφέρουσα.
  
## Στυλ

* Για το αισθητικό ύφος κάθε αρθρώματος αρμόδιο είναι το αντίστοιχο
  αρχείο στυλ (CSS).

  
* Στην εφαρμογή μας, το πρότυπο του (μοναδικού) αρθρώματός μας
  βρίσκεται στο αρχείο `src/app/app.component.css`

## `src/app/app.component.css`

```css
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
```

## Έλεγχοι μονάδας

* Οι έλεγχοι μονάδας (unit tests) για το άρθρωμα βρίσκονται στο αρχείο
  `src/app/app.component.spec.ts`.
  
* Οι έλεγχοι αυτοί επιβεβαιώνουν ότι:
  * η εφαρμογή δημιουργείται
  * η εφαρμογή έχει τον τίτλο που θέλουμε
  * ο τίτλος εμφανίζεται σε μία επικεφαλίδα `h1`.
  
* Για να τρέξουμε τους ελέγχους δίνουμε:
    ```bash
    ng test
    ```
    
## `src/app/app.component.spec.ts`

```javascript
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('My First Angular App');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent)
      .toContain('Welcome to My First Angular App!');
  }));
});
```

# Άλλα αρχεία στον κατάλογο `src`

## `src`

```
src/
├── app
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets
├── environments
│   ├── environment.prod.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts
├── polyfills.ts
├── styles.css
├── test.ts
├── tsconfig.app.json
├── tsconfig.spec.json
└── typings.d.ts
```

## Κεντρική σελίδα

* Έχουμε γράψει τον κώδικα της εφαρμογής μας, αλλά ακόμα δεν έχουμε
  δει την ιστοσελίδα η οποία θα την περιέχει.

* Η σελίδα αυτή βρίσκεται στο αρχείο `src/index.html`.

* Στη σελίδα που ακολουθεί βλέπουμε ότι χρησιμοποιούμε το στοιχείο
  `app-root`. 
  
* Αυτός είναι ο επιλογέας που ορίσαμε για το εξάρτημά μας. Με τον τρόπο
  αυτό εισάγουμε το εξάρτημα σε μία σελίδα HTML.

## `index.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyApp</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

  
## Τα υπόλοιπα (1)

* `assets`: κατάλογος στον οποίο βάζουμε εικόνες και άλλους πόρους που
  θα χρησιμοποιηθούν αυτούσιοι.
  
* `environments`: κατάλογος που περιέχει ένα αρχείο ρυθμίσεων για κάθε
  περιβάλλον στο οποίο θα τρέξει η εφαρμογή
    * `environment.prod.ts`: περιβάλλον παραγωγής
    * `environment.ts`: περιβάλλον ανάπτυξης
    
* `favicon.ico`: το εικονίδιο που εμφανίζεται στα tabs του browser. 

* `polyfills.ts`: εξασφαλίζει ότι διαφορετικοί browsers ακολουθούν
  κοινά πρότυπα.

## Τα υπόλοιπα (2)

* `styles.css`: ρυθμίσεις ύφους που αφορούν το σύνολο της εφαρμογής
  (αντί για τις ρυθμίσεις των επιμέρους αρθρωμάτων).
  
* `test.ts`: ρυθμίσεις για ελέγχους μονάδας (δεν χρειάζεται να το
  πειράξουμε).
  
* `tsconfig.app.json`: ρυθμίσεις τον μεταγλωττιστή TypeScript για την
  εφαρμογή Angular.
  
* `tsconfig.spec.json`: ρυθμίσεις τον μεταγλωττιστή TypeScript για
  τους ελέγχους μονάδας.

* `typings.d.ts`: TypeScript type definition file: δεν χρειάζεται να
  το πειράξουμε. Χρησιμοποιείται από το μεταγλωττιστή της TypeScript.
