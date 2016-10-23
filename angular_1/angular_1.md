% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular2 1

## Γενικά

* Tο Angular είναι ένα μία από τις δημοφιλέστερες πλατφόρμες για
  ανάπτυξη σύγχρονων διαδικτυακών εφαρμογών.

* Μας επιτρέπει να δημιουργήσουμε εφαρμογές με πολύπλοκα μοντέλα
  αλληλεπίδρασης με το χρήστη.

* Αυτό παλαιότερα μπορούσε να γίνει μόνο με τη χρήση ιδιωμάτων JavaScript.


# Angular tutorial


## Γενικά

* Θα ακολουθήσουμε το σύντομο παράδειγμα
  [(quickstart)](https://angular.io/docs/ts/latest/quickstart.html)
  της Google.


## Εγκατάσταση απαιτήσεων (1)

* Για να δουλέψουμε με το Angular θα πρέπει να χρησιμοποιήσουμε το
  Node.js

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
  είναι node v.4.x.x και έπειτα και npm 3.x.x και έπειτα.

* Αν η έκδοση του npm είναι παλαιότερη, δώστε:

    ```bash
    sudo npm install npm -g
    ```

* Το sudo απαιτείται σε υπολογιστές Mac και Linux. Σε MS-Windows απλώς
    πρέπει να τις τρέξετε ως διαχειριστής.

## Δημιουργία του καταλόγου του προγράμματος

* Δημιουργείστε έναν κατάλογο `angular-quickstart`.

* Πηγαίνετε σε αυτόν τον κατάλογο.


# Αρχεία ρυθμίσεων


## `package.json` (1)

* Δημιουργείστε ένα αρχείο `package.json` ως εξής:

    ```json
    {
      "name": "angular-quickstart",
      "version": "1.0.0",
      "scripts": {
        "start": "tsc && concurrently \"tsc -w\" \"lite-server\" ",
        "lite": "lite-server",
        "postinstall": "typings install",
        "tsc": "tsc",
        "tsc:w": "tsc -w",
        "typings": "typings"
      },
      "licenses": [
        {
          "type": "MIT",
          "url": "https://github.com/angular/angular.io/blob/master/LICENSE"
        }
      ],
      "dependencies": {
        "@angular/common": "~2.1.0",
        "@angular/compiler": "~2.1.0",
        "@angular/core": "~2.1.0",
        "@angular/forms": "~2.1.0",
        "@angular/http": "~2.1.0",
        "@angular/platform-browser": "~2.1.0",
        "@angular/platform-browser-dynamic": "~2.1.0",
        "@angular/router": "~3.1.0",
        "@angular/upgrade": "~2.1.0",
        "angular-in-memory-web-api": "~0.1.5",
        "bootstrap": "^3.3.7",
        "core-js": "^2.4.1",
        "reflect-metadata": "^0.1.8",
        "rxjs": "5.0.0-beta.12",
        "systemjs": "0.19.39",
        "zone.js": "^0.6.25"
      },
      "devDependencies": {
        "concurrently": "^3.0.0",
        "lite-server": "^2.2.2",
        "typescript": "^2.0.3",
        "typings":"^1.4.0"
      }
    }
    ```

## `package.json` (2)

* Οι εφαρμογές του Angular (και του Node.js) χρησιμοποιούν πλήθος
  βιβλιοθηκών.

* Για τον χειρισμό τους, χρησιμοποιούμε το Node Package Manager
  [(npm)](https://docs.npmjs.com/).

* Το αρχείο `package.json` περιέχει, μεταξύ άλλων, τις *εξαρτήσεις* του
  προγράμματός μας από από βιβλιοθήκες. 


## Εξαρτήσεις

* Οι εξαρτήσεις του προγράμματός μας είναι δύο ειδών:

    * Εξαρτήσεις εκτέλεσης. Ονομάζονται απλώς `dependencies`. Είναι απαραίτητες
      για την εκτέλεση του προγράμματός μας.

    * Εξαρτήσεις ανάπτυξης. Ονομάζονται `devDependencies`. Είναι απαραίτητες
      για τη συγγραφή του προγράμματός μας. Αν δεν θέλουμε να εγκατασταθούν
      στην παραγωγική υποδομή δίνουμε:
      
    ```bash
    npm instal my-application --production
    ```

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

    * `concurrently`: βιβλιοθήκη για την παράλληλη εκτέλεση εντολών
      του `npm`.

    * `lite-server`: ένας μικρός εξυπηρετητής HTML.

    * `typescript`: ένας εξυπηρετητής για τη γλώσσα TypeScript.
      Περιλαμβάνει το μεταγλωττιστή της TypeScript, `tsc`.

    * `typings`: βιβλιοθήκη χειρισμού ορισμών τύπων της TypeScript.


## TypeScript

* Το Angular μπορεί να χρησιμοποιηθεί είτε με JavaScript, είτε με
  TypeScript, είτε με Dart.

* Η προτεινόμενη γλώσσα όμως είναι η TypeScript. Για το λόγο αυτό το
  Angular 2 δεν ονομάζεται πλέον Angular.js.

* Η TypeScript είναι μια γλώσσα που βελτιώνει την JavaScript και
  μεταγλωττίζεται σε αυτήν.


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
        
    * Αν δίνεται το minor, επιτρέπονται αλλαγές στο patch.
      ```1.2.3 := >= 1.2.3 < 1.3.0```

    * Αν δεν δίνεται το minor, επιτρέπονται αλλαγές στο minor.
      ```1.2 := >= 1.2.0 < 1.3.0```


## Συντακτικό εξαρτήσεων (3)

* Ο τελεστής `^` επιτρέπει αλλαγές που δεν επηρεάζουν το πρώτο
  μη-μηδενικό ψηφίο.

    * ```^1.2.3 := >=1.2.3 <2.0.0```

    * ```^0.2.3 := >=0.2.3 <0.3.0```

    * ```^0.0.3 := >=0.0.3 <0.0.4```


## `tsconfig.json`

* Δημιουργείστε ένα αρχείο `tsconfig.json` ως εξής:

    ```json
    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
      }
    }
    ```

## `typings.json`

* Δημιουργείστε ένα αρχείο `typings.json` ως εξής:

    ```json
    {
      "globalDependencies": {
        "core-js": "registry:dt/core-js#0.0.0+20160725163759",
        "jasmine": "registry:dt/jasmine#2.2.0+20160621224255",
        "node": "registry:dt/node#6.0.0+20160909174046"
      }
    }
    ```

## `systemjs.config.js`

* Δημιουργείστε ένα αρχείο `systemjs.config.js` ως εξής:

    ```javascript
    /**
     * System configuration for Angular samples
     * Adjust as necessary for your application needs.
     */
    (function (global) {
      System.config({
        paths: {
          // paths serve as alias
          'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
          // our app is within the app folder
          app: 'app',
          // angular bundles
          '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
          '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
          '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
          '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
          '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
          '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
          '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
          '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
          // other libraries
          'rxjs':                      'npm:rxjs',
          'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
          app: {
            main: './main.js',
            defaultExtension: 'js'
          },
          rxjs: {
            defaultExtension: 'js'
          },
          'angular-in-memory-web-api': {
            main: './index.js',
            defaultExtension: 'js'
          }
        }
      });
    })(this);
    ```

## Εγκατάσταση βιβλιοθηκών

* Για να εγκατασταθούν οι βιβλιοθήκες, δίνουμε:

    ```bash
    npm install
    ```

* Αν όλα πάνε καλά, θα πρέπει να υπάρχει η ακόλουθη δομή:

    ```
    angular-quickstart/
        node_modules/
        typings/
        package.json
        systemjs.config.json
        tsconfig.json
        typings.json
    ```

* Αν δεν υπάρχει ο κατάλογος `typings`, δώστε:
    ```bash
    npm run typings install
    ```

# Δημιουργία της εφαρμογής

## NgModules

* Μια εφαρμογή αποτελείται από *αρθρώματα* (modules).

* Αυτά είναι κλάσεις, οι οποίες ρυθμίζονται μέσω του διακοσμητή
  `NgModule`, ώστε να έχουν συγκεκριμένα χαρακτηριστικά.

* Τα αρθρώματα μπορούν να φορτώνονται όποτε χρειάζονται (lazy
  loading), ώστε να μην επιβραδύνεται η λειτουργία της εφαρμογής μας.

* Ένα άρθρωμα συνήθως υλοποιεί ένα σύνολο λειτουργιών.


## Root module (1)

* Κάθε εφαρμογή έχει τουλάχιστον ένα άρθρωμα, το root module.

* Στην εφαρμογή μας θα ονομάζεται `AppModule`.

* Δημιουργείστε έναν κατάλογο `app` κάτω από το `angular-quickstart`.

* Δημιουργείστε ένα αρχείο `app/app.module.ts`:

    ```typescript
    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';

    @NgModule({
      imports:      [ BrowserModule ]
    })
    export class AppModule { }
    ```

## Root module (2)

* Ξεκινάμε διαβάζοντας τα αρθρώματα `NgModule` και `BrowserModule`.

* Αφού η εφαρμογή μας θα τρέχει μέσα σε έναν browser, δηλώνουμε ότι το
  root module θα χρησιμοποιήσει το `BrowserModule`.

* Στο τέλος, δηλώνουμε την κλάση που θα αποτελεί το root module μας.


# Δημιουργία εξαρτήματος


## Γενικά

* Κάθε εφαρμογή αποτελείται από *εξαρτήματα* (components).

* Κάθε εξάρτημα είναι αρμόδιο για ένα μέρος της οθόνης (που ονομάζεται
  view), το οποίο ελέγχει μέσω ενός *προτύπου* (template).


## `AppComponent` (1)

* Στην εφαρμογή μας θα έχουμε μόνο ένα εξάρτημα.

* Δημιουργούμε το αρχείο `app/app.component.ts`:

    ```typescript
    import { Component } from '@angular/core';

    @Component({
      selector: 'my-app',
      template: '<h1>My First Angular App</h1>'
    })
    export class AppComponent { }
    ```

## `AppComponent` (2)

* Ξεκινάμε διαβάζοντας το διακοσμητή `@Component`.

* Ο διακοσμητής αυτός προσδίδει συγκεκριμένες ιδιότητες στο εξάρτημα
  `AppComponent`:

    * Το κλειδί `selector` ορίζει ότι το στοιχείο HTML το οποίο θα
      αναπαραστήσει το συγκεκριμένο εξάρτημα θα έχει τον συγκεκριμένο
      επιλογέα.

    * Το κλειδί `template` ορίζει το πρότυπο που είναι αρμόδιο για την
      εμφάνιση του εξαρτήματος.


## `AppComponent` (3)

* Ο διακοσμητής εφαρμόζεται στην κλάση `AppComponent`, η οποία
  περιέχει όλη τη λογική του συγκεκριμένου εξαρτήματος.

* Εδώ δεν υπάρχει καμμία, άρα είναι κενή.

* Στο τέλος *εξάγουμε* (export) την κλάση του εξαρτήματος, ώστε να
  μπορεί να τη χρησιμοποιήσει η εφαρμογή μας.


## `AppModule` (1)

* Στη συνέχεια θα πρέπει να χρησιμοποιήσουμε το εξάρτημά μας από την
  εφαρμογή μας.

* Αλλάζουμε το αρχείο `app/app.module.ts` ώστε να είναι ως εξής:

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

## `AppModule` (2)

* Διαβάζουμε το εξάρτημα που μόλις δημιουργήσαμε.

* Στο διακοσμητή `NgModule` δηλώνουμε επιπλέον ότι:

    * Οι δηλώσεις του `AppComponent` (`declarations`) θα είναι
      διαθέσιμες στην εφαρμογή μας. Έτσι θα μπορούμε να
      χρησιμοποιήσουμε τον επιλογέα `my-app`.

    * Η εφαρμογή θα ξεκινήσει με το εξάρτημα `AppComponent`.


# Εκκίνηση της εφαρμογής


## Γενικά

* Τώρα είμαστε σε θέση να ξεκινήσουμε την εφαρμογή μας.

* Για να το κάνουμε αυτό, πρέπει να δώσουμε οδηγίες στο Angular για
  τον τρόπο με τον οποίο θα την ξεκινήσει.
  

## `main.ts` (1)

* Για να μπορεί να ξεκινήσει η εφαρμογή, δημιουργείστε το αρχείο
  `app/main.ts`:

    ```typescript
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

    import { AppModule } from './app.module';

    const platform = platformBrowserDynamic();

    platform.bootstrapModule(AppModule);
    ```

## `main.ts` (2)

* Προσέξτε ότι αφού η εφαρμογή μας τρέχει στον browser, διαβάζει τη
  συνάρτηση `platformBrowserDynamic` από τη βιβλιοθήκη
  `@angular/platform-browser-dynamic`

* Αν θέλαμε η εφαρμογή μας να τρέξει σε ένα κινητό τηλέφωνο, θα
  διαβάζαμε μια βιβλιοθήκη όπως η
  [Apache Cordova](https://cordova.apache.org/) ή η
  [NativeScript](https://www.nativescript.org/).


## `main.ts` (3)

* Υπάρχουν δύο διαφορετικοί τρόποι να ξεκινήσει η εφαρμογή μας στο
  `main.ts`.

* Με το `platformBrowserDynamic`, το Angular μεταγλωττίζει την
  εφαρμογή στον browser και στη συνέχεια την εκτελεί.

* Αυτό ονομάζεται *δυναμική εκκίνηση* (dynamic bootstrapping) και
  χρησιμοποιεί *επί τόπου μεταγλώττιση* (Just-in-Time, JiT, compiler).


## `main.ts` (4)

* Αν αλλάξουμε το αρχείο ως εξής:

    ```typescript
    import { platformBrowser } from '@angular/platform-browser';

    // The app module factory produced by the static offline compiler
    import { AppModuleNgFactory } from './app.module.ngfactory';

    // Launch with the app module factory.
    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
    ```

* Τότε χρησιμοποιείται η *στατική εκκίνηση* (static bootstrapping),
  οπότε η μεταγλώττιση γίνεται κατά τη διαδικασία του κτισίματος
  (build) της εφαρμογής.

* Αυτό χρησιμοποιεί *πρότερη μεταγλώττιση* (Ahead-of-Time, AoΤ
  compiler). 

* Η εφαρμογή που προκύπτει είναι μικρότερη και καταλληλότερη για
  κινητές συσκευές.


# Δημιουργία ιστοσελίδας


## Γενικά

* Έχουμε γράψει τον κώδικα της εφαρμογής μας, αλλά ακόμα δεν έχουμε
  γράψει την ιστοσελίδα η οποία θα την περιέχει.

* Πρόκειται για μία σελίδα HTML η οποία φορτώνει τις απαραίτητες
  βιβλιοθήκες και στη συνέχεια εμφανίζει την εφαρμογή μας στο
  κατάλληλο σημείο.


## `index.html` (1)

* Δημιουργείστε ένα αρχείο `index.html`:

    ```html
    <html>
      <head>
        <title>Angular QuickStart</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles.css">
        <!-- 1. Load libraries -->
         <!-- Polyfill(s) for older browsers -->
        <script src="node_modules/core-js/client/shim.min.js"></script>
        <script src="node_modules/zone.js/dist/zone.js"></script>
        <script src="node_modules/reflect-metadata/Reflect.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <!-- 2. Configure SystemJS -->
        <script src="systemjs.config.js"></script>
        <script>
          System.import('app').catch(function(err){ console.error(err); });
        </script>
      </head>
      <!-- 3. Display the application -->
      <body>
        <my-app>Loading...</my-app>
      </body>
    </html>
    ```

## `index.html` (2)

* Αρχίζουμε διαβάζοντας τις απαραίτητες βιβλιοθήκες JavaScript.

* Στη συνέχεια διαβάζουμε το αρχείο ρυθμίσεων για το `SystemJS` και
  μετά διαβάζουμε και τρέχουμε την εφαρμογή μας.

* Η εφαρμογή μας εμφανίζεται στο στοιχείο `<my-app>` μέσα στο
  `<body>`.


## Stylesheet

* Για να βελτιώσουμε κάπως την εμφάνιση της εφαρμογής μας,
  δημιουργούμε το αρχείο `styles.css` στον κατάλογο της εφαρμογής μας:

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

# Εκτέλεση της εφαρμογής


## Γενικά

* Μπορούμε να ξεκινήσουμε την εφαρμογή μας με το `npm`.

* Δίνουμε:

    ```bash
    npm start
    ```

## Τι συμβαίνει

* Τρέχει ο μεταγλωττιστής της TypeScript σε *λειτουργία
  παρακολούθησης* (watch mode). Παρακολουθεί τα αρχεία για αλλαγές,
  ώστε να τα επαναμεταγλωττίζει αυτομάτως.

* Ταυτόχρονα ξεκινάει η εξυπητητής lite-server, ο οποίος φορτώνει το
  αρχείο `index.html` στον browser και ανανεώνει τον browser όταν
  αλλάζουν τα αρχεία της εφαρμογής.

## Εφαρμογή αλλαγών

* Αν αλλάξετε το μήνυμα στο αρχείο `app/app.component.ts`, τότε θα
  ανανεωθεί αυτομάτως η σελίδα στον browser.

* Αυτό συμβαίνει γιατί ο μεταγλωττιστής της TypeScript θα αντιληφθεί
  την αλλαγή και θα επαναμεταγλωττίσει το αρχείο, ενώ ο lite-server θα
  ξαναφορτώσει τη σελίδα.
