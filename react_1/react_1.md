% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# React 1

## Γενικά

* Το [React](https://reactjs.org/) είναι μια από τις πιο δημοφιλείς
  βιβλιοθήκες για την κατασκευή διεπαφών χρήση με JavaScript.
  
* Δημιουργήθηκε από τον Jordan Walke, μηχανικό λογισμικού στο
  Facebook, και χρησιμοποιήθηκε στη ροή νέων του Facebook το 2011 και
  στο Instagram το 2012.
  
* Ο κώδικάς του έγινε ανοιχτός το Μάιο του 2013.

* Θα ακολουθήσουμε χαλαρά το [the Road to
  React;](https://roadtoreact.com/).


## Εγκατάσταση Προαπαιτούμενων

* Ο πιο εύκολος τρόπος να ξεκινήσουμε με το React είναι μέσω του node. 

* Εγκαθιστούμε κατ΄ αρχήν το [nvm (node version
  manager)](https://github.com/creationix/nvm):
   
   ```bash
   curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
   ```

  ή
  
  ```bash
  wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
  
  ```
  
  Δείτε και τις [σχετικές
  οδηγίες](https://github.com/creationix/nvm#installation).
  
  
* Μετά εγκαθιστούμε την τελευταία έκδοση του node με μακρόχρονη
  υποστήριξη (long term support, LTS):

   ```bash
   nvm install --lts node
   ```
   
## Εγκατάσταση React

* Για να αρχίσουμε να μαθαίνουμε το React, θα δημιουργήσουμε και θα
  πάμε σε έναν κατάλογο:
  
   ```bash
   mkdir learning_react
   cd learning_react
   ```

* Εγκαθιστούμε το React τοπικά στον κατάλογο αυτό:

   ```bash
   npm install react
   ```
   
<div class="notes">

Αν θέλουμε να το εγκαταστήσουμε ώστε να είναι διαθέσιμο και έξω από
τον κατάλογο αυτό, μπορούμε να δώσουμε:

```bash
npm install -g react
```

Στην περίπτωση αυτή, το React θα εγκατασταθεί στον υποκατάλογο
`lib/node/modules` της έκδοσης του node που χρησιμοποιούμε με το nvm.
Αυτήν μπορούμε να την βρούμε με:

```bash
nvm which current
```

Αυτό θα μας δώσει κάτι όπως:

```
<home directory>/.nvm/versions/node/<version>/
```

άρα το React θα είναι στο:

```
<home directory>/.nvm/versions/node/<version>/lib/node/modules
```

</div>

## Δημιουργία Σκελετού Εφαρμογής

* Για να δημιουργήσουμε τον σκελετό της εφαρμογής μας δίνουμε:

   ```bash
   npm install create-react-app
   ```
   
* Και στη συνέχεια:

   ```bash
   npx create-react-app rbr
   cd rbr
   ```
   
## Δομή Καταλόγων

```
rbr
├── README.md
├── node_modules 
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
``` 

## Έναρξη Εφαρμογής

* Για να τρέξουμε την εφαρομογή δίνουμε:

   ```bash
   npm start
   ```
   
* Η εφαρμογή θα τρέξει στο <http://localhost:3000>.


## `src/App.js`

* Η εφαρμογή μας βρίσκεται στο αρχείο `src/App.js`:

   ```javascript
   import React, { Component } from 'react';
   import logo from './logo.svg';
   import './App.css';

   class App extends Component {
     render() {
       return (
         <div className="App">
           <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
             <p>
               Edit <code>src/App.js</code> and save to reload.
             </p>
             <a
               className="App-link"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer"
             >
               Learn React
             </a>
           </header>
         </div>
       );
     }
   }

   export default App;
   ```
   
## Εξαρτήματα

* Η κλάση `App` είναι ένα *εξάρτημα* (component).

* Τα εξαρτήματα είναι οι βασικές δομικές μονάδες στο React.

* Ένα εξάρτημα αντιστοιχεί σε ένα επαναχρησιμοποιούμενο κομμάτι της
  εφαρμογής μας.
  
* Τα εξαρτήματα γράφονται σε μία διάλεκτο της JavaScript που
  ονομάζεται JSX (JavaScript eXtension).
   
* Τα χρησιμοποιούμε φτιάχνοντας στιγμιότυπα, σαν να ήταν στοιχεία
  HTML:
  
   ```html
   <App />
   ```
   
<div class="notes">

Κάθε εξάρτημα έχει μια μέθοδο `render()`, η οποία επιστρέφει την HTML
που θέλουμε να κατασκευάσει.

</div>


## JSX

* Η JSX μεταγλωττίζεται σε JavaScript με τον μεταγλωττιστή
  [Babel](https://babeljs.io/).
  
* Η Babel επίσης μεταγλωττίζει ES6+ σε παλαιότερες εκδόσεις
  JavaScript.
  
## JSX -> JavaScript

* Έστω το [παρακάτω κομμάτι
  κώδικα](https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects):
  
   ```javascript
   const element = (
      <h1 className="greeting">
        Hello, world!
      </h1>
   );
   ```

* Αυτό θα μετατραπεί σε:

   ```javascript
   const element = React.createElement(
     'h1',
     {className: 'greeting'},
     'Hello, world!'
   );
   ```

## Χρήση Εξαρτήματος

* Μπορούμε να δούμε πώς χρησιμοποιείται το εξάρτημα, διαβάζοντας το
  αρχείο `src/index.js`:
  
   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom';
   import './index.css';
   import App from './App';
   import * as serviceWorker from './serviceWorker';

   ReactDOM.render(<App />, document.getElementById('root'));

   // If you want your app to work offline and load faster, you can change
   // unregister() to register() below. Note this comes with some pitfalls.
   // Learn more about service workers: http://bit.ly/CRA-PWA
   serviceWorker.unregister();
   ```

* Στον παραπάνω κώδικα χρειάζεται να εισάγουμε το `React` γιατί στην
  πραγματικότητα το `<App />` θα μεταγλωττιστεί σε:

   ```javascript
   React.createElement(App, null)
   ```

## Απόδοση Εξαρτήματος

* Με τη μέθοδο `ReactDOM.render()` *αποδίδουμε* (render) ένα εξάρτημα.

* Η πρώτη παράμετρος είναι το εξάρτημα, η δεύτερη παράμετρος είναι το
  σημείο στο οποίο θα εισαχθεί μέσα στο δέντρο DOM.
  

## Απλοποίηση Εξαρτήματος

* Το εξάρτημα αυτή τη στιγμή έχει περισσότερα πράγματα από ό,τι
  χρειαζόμαστε.
  
* Εμείς θα το μετατρέψουμε σε ένα απλό Hello, World:

   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   class App extends Component {
     render() {
       return (
         <div className="App">
           <h2>Hello, World!</h2>
         </div>
       );
     }
   }

   export default App;
   ```

## Χρήση Μεταβλητών

* Εναλλακτικά, μπορούμε να χρησιμοποιήσουμε μια μεταβλητή:

   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   class App extends Component {
     render() {
       var helloWorld = "Hello, World!";
       return (
         <div className="App">
           <h2>{helloWorld}</h2>
         </div>
       );
     }
   }

   export default App;
   ```

## `var`, `let`, `const`

* Στην JavaScript υπάρχουν τρεις τρόποι να δηλώσουμε μεταβλητές, και
  ένας τρόπος να δηλώσουμε σταθερές.
  
* Μπορούμε να δηλώσουμε global μεταβλητές με:

   ```javascript
   name = value
   ```
  
* Με `var` δηλώνουμε μεταβλητές οι οποίες, ασχέτως που γίνεται η
  δήλωσή τους, ορίζονται στην αρχή της συνάρτησης που εμφανίζονται.
  
* Αυτό ονομάζεται [*ανύψωση*
  (hoisting)](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).
  
* Με `let` ορίζονται μεταβλητές με εμβέλεια ένα συγκεκριμένο μπλοκ, εντολή, ή
  έκφραση.

## Διαφορά `let` και `var` (1)

* Στην [παρακάτω
  συνάρτηση](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let),
  η μεταβλητή `x` στη δεύτερη δήλωση είναι στην πραγματικότητα η ίδια
  με την πρώτη:
  
   ```javascript
   function varTest() {
     var x = 1;
     if (true) {
       var x = 2;  // same variable!
       console.log(x);  // 2
     }
     console.log(x);  // 2
   }
   ```

## Διαφορά `let` και `var` (2)

* Αν δηλώσουμε τη μεταβλητή με `let`, η εμβέλειά της είναι πλέον μέσα
  στο μπλοκ της δήλωσής της:
  
   ```javascript
   function letTest() {
     let x = 1;
     if (true) {
       let x = 2;  // different variable
       console.log(x);  // 2
     }
     console.log(x);  // 1
   }
   ```

## Σταθερές

* Με το `const` δηλώνουμε σταθερές, οπότε το παρακάτω δεν επιτρέπεται:
   
   ```javascript
   const helloWorld = "Hello, World!";
   helloWorld = "Goodbye";
   ```
   
* Προσοχή, αν χρησιμοποιήσουμε το `const` σε αντικείμενο ή λίστα, τα
  περιεχόμενά τους *μπορούν* να αλλαχτούν:
   
   ```javascript
   const helloWorld = {
     text: "Hello, World!";
   };
   
   helloWorld.text = "Goodbye";
   ```
   
## Χρήση Σταθεράς στην Εφαρμογή

* Μετά από τα παραπάνω, μπορούμε να αλλάξουμε την εφαρμογή μας ώστε να
  χρησιμοποιούμε σταθερά:
  
   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   class App extends Component {
     render() {
       const helloWorld = "Hello, World!";
       return (
         <div className="App">
           <h2>{helloWorld}</h2>
         </div>
       );
     }
   }

   export default App;
   ```
   
## Συνεχής Ανανέωση Αρθρωμάτων

* Στη διάρκεια της ανάπτυξης μας βολεύει να μην χρειάζεται να
  ξαναξεκινάμε την εφαρμογή μας κάθε φορά που κάνουμε μια αλλαγή. 
  
* Για να γίνει αυτό, θα χρησιμοποιήσουμε τη συνεχή ανανέωση αρθρωμάτων
  (hot module replacement, HMR).
  
* Αλλάξουμε το `src/index.js` ώστε να το ενεργοποιήσουμε:

   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom';
   import './index.css';
   import App from './App';

   ReactDOM.render(<App />, document.getElementById('root'));

   if (module.hot) {
     module.hot.accept();
   }
   ```

## Εμφάνιση Λίστας Δεδομένων

* Έστω τώρα ότι θέλουμε να εμφανίσουμε μία λίστα με δεδομένα στην
  εφαρμογή μας.
  
* Προς το παρόν βάζουμε τη λίστα μέσα στον κώδικά μας (κανονικά θα την
  διαβάζαμε μέσω ενός API):
  
   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   const list = [
     {
       title: 'Infinite Jest',
       url: 'https://en.wikipedia.org/wiki/Infinite_Jest',
       author: 'David Foster Wallace',
       year_published: 1996,
       id: 0
     },
     {
       title: 'Ulysses',
       url: 'https://en.wikipedia.org/wiki/Ulysses_(novel)',
       author: 'James Joyce',
       year_published: 1922,
       id: 1
     },
     {
       title: 'City on Fire',
       url: 'https://en.wikipedia.org/wiki/City_on_Fire_(Hallberg_novel)',
       author: 'Garth Risk Hallbert',
       year_published: 2015,
       id: 3
     },
     {
       title: 'The Narrow Way to the Deep North',
       url: 'https://en.wikipedia.org/wiki/The_Narrow_Road_to_the_Deep_North_(novel)',
       author: 'Richard Flanagan',
       year_published: 2013,
       id: 4
     },
     {
       title: 'The Dispossessed',
       url: 'https://en.wikipedia.org/wiki/The_Dispossessed',
       author: 'Ursula Le Guin',
       year_published: 1974,
       id: 5
     },
     {
       title: 'A Death in the Family: My Struggle Book 1',
       url: 'https://en.wikipedia.org/wiki/My_Struggle_(Knausg%C3%A5rd_novels)',
       author: 'Karl Ove Knausgård',
       year_published: 2009,
       id: 6
     },
     {
       title: 'Conversations with Friends',
       url: 'https://en.wikipedia.org/wiki/Conversations_with_Friends',
       author: 'Sally Rooney',
       year_published: 2017,
       id: 7
     },      
     {
       title: 'La Septième Fonction du Langage',
       url: 'https://fr.wikipedia.org/wiki/La_Septi%C3%A8me_Fonction_du_langage',
       author: 'Laurent Binet',
       year_published: '2015',
       id: 8,
     },
     {
       title: 'La Vérité sur l\' Affaire Harry Quebert',
       url: 'https://fr.wikipedia.org/wiki/La_V%C3%A9rit%C3%A9_sur_l%27affaire_Harry_Quebert',
       author: 'Joël Dicker',
       year_published: 2012,
       id: 9
     },
   ];
   ```
   
## Εμφάνιση Περισσότερων Δεδομένων

* Βεβαίως, δεν υπάρχει λόγος να εμφανίζουμε μόνο τον τίτλο.

* Προσθέτουμε και τα υπόλοιπα δεδομένα των στοιχείων της λίστας.

   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   /* ... */
   
   class App extends Component {
     render() {
       return (
         <div className="App">
           {list.map(function(item) {
             return(
               <div key={item.id}>
                 <span>
                   <a href={item.url}>{item.title}</a>:
                 </span>
                 &nbsp;
                 <span>{item.author}</span>
                 &nbsp;Year Published:
                 <span>{item.year_published}</span>
               </div>
             );
           })}
         </div>
       );
     }
   }

   export default App;
   ```

## Κλειδιά

* Προσέξτε ότι στο `<div>` που περιέχει κάθε στοιχείο προσθέτουμε την
  ιδιότητα `key={item.id}`.
  
* Σε κάθε λίστα στοιχείων που κατασκευάζουμε πρέπει να προσθέτουμε μια
  τέτοια ιδιότητα σε κάθε στοιχείο της.
  
* Αυτό είνα απαραίτητο προκειμένου το React να μπορεί να εντοπίζει
  δυναμικές προσθήκες και διαγραφές στοιχείων.


## Συντομευμένες Συναρτήσεις (1)

* Στην JavaScript μπορούμε να ορίζουμε συναρτήσεις χρησιμοποιώντας μια
  εναλλακτική σύνταξη, οπότε ονομάζονται [arrow
  functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):
  
   ```
   (param1, param2, ..., paramN) => { statements } 
   (param1, param2, ..., paramN) => expression
   // equivalent to: => { return expression; } 

   // Parentheses are optional when there's only one parameter name:
   (singleParam) => { statements }
   singleParam => { statements }

   // The parameter list for a function with no parameters should be written with a pair of parentheses.
   () => { statements }
   ```
   
## Συντομευμένες Συναρτήσεις (2)

* Με τον τρόπο αυτό μπορούμε να [συντομεύουμε τον κώδικα που
  γράφουμε](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Shorter_functions):

   ```javascript
   var elements = [
     'Hydrogen',
     'Helium',
     'Lithium',
     'Beryllium'
   ];

   elements.map(function(element ) { 
     return element.length; 
   }); // [8, 6, 7, 9]

   elements.map(element => {
     return element.length;
   }); // [8, 6, 7, 9]

   elements.map(element => element.length); // [8, 6, 7, 9]

   elements.map(({ length }) => length); // [8, 6, 7, 9]
   ```

## Σώμα Συντομευμένων Συναρτήσεων

* Όπως βλέπουμε, μπορούμε να
  [συντομεύσουμε](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Function_body)
  το σώμα μιας συντομευμένης συνάρτησης:

   ```javascript
   var func = (x, y) => { return x + y; }; 
   // with block body, explicit "return" needed
   
   var func = x => x * x;
   // concise body syntax, implied "return"
   ```
   
## Επιστροφή Αντικειμένων (1)

* Χρειάζεται προσοχή στην περίπτωση που [επιστρέφουμε κατά γράμμα αντικείμενα
  (object literals)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Returning_object_literals):

   ```javascript
   var func = () => { foo: 1 };
   // Calling func() returns undefined!

   var func = () => { foo: function() {} };
   // SyntaxError: function statement requires a name
   ```
   
## Επιστροφή Αντικειμένων (2)

* Ο λόγος είναι ότι ο κώδικας μέσα σε άγκυστρα ερμηνεύεται ως σειρά
  εντολών, και άρα το `foo` στο παραπάνω παράδειγμα θα ερμηνευτεί ως
  ετικέτα (label).
  
* Για να δουλέψει σωστά το παράδειγμα, θα πρέπει να βάλουμε
  παρενθέσεις:
  
   ```javascript
   var func = () => ({foo: 1});
   ```
  
## Παρένθεση: Ετικέτες στην JavaScript (1)

* Η JavaScript δεν έχει `goto`. Έχει όμως ετικέτες για να ελέγξουμε,
  αν θέλουμε, την έξοδο από μια δομή επανάληψης.
  
* Για
  [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label#Examples)
  με το `continue`:

   ```javascript
   var i, j;

   loop1:
   for (i = 0; i < 3; i++) {      //The first for statement is labeled "loop1"
      loop2:
      for (j = 0; j < 3; j++) {   //The second for statement is labeled "loop2"
         if (i === 1 && j === 1) {
            continue loop1;
         }
         console.log('i = ' + i + ', j = ' + j);
      }
   }

   // Output is:
   //   "i = 0, j = 0"
   //   "i = 0, j = 1"
   //   "i = 0, j = 2"
   //   "i = 1, j = 0"
   //   "i = 2, j = 0"
   //   "i = 2, j = 1"
   //   "i = 2, j = 2"
   // Notice how it skips both "i = 1, j = 1" and "i = 1, j = 2"
   ```

## Παρένθεση: Ετικέτες στην JavaScript (2)

* [Παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label#Using_a_labeled_break_with_for_loops) με το `break`:

   ```javascript
   var i, j;

   loop1:
   for (i = 0; i < 3; i++) {      //The first for statement is labeled "loop1"
      loop2:
      for (j = 0; j < 3; j++) {   //The second for statement is labeled "loop2"
         if (i === 1 && j === 1) {
            break loop1;
         }
         console.log('i = ' + i + ', j = ' + j);
      }
   }

   // Output is:
   //   "i = 0, j = 0"
   //   "i = 0, j = 1"
   //   "i = 0, j = 2"
   //   "i = 1, j = 0"
   // Notice the difference with the previous continue example
   ```

## Αποδόμηση (Destructuring)

* Το παρακάτω (που είδαμε προηγουμένως) ίσως φαίνεται περίεργο:

   ```javascript
   elements.map(({ length }) => length); // [8, 6, 7, 9]
   ```

* Η `elements.map()` παίρνει κάθε στοιχείο του `elements` με τη σειρά.

* Κάθε στοιχείο του `elements` είναι ένα αντικείμενο τύπου string.

* Κάθε αντικείμενο τύπου string έχει ένα πεδίο `length`.

* Με το `{length}` [αποδομούμε (destructuring
  assignment)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
  το αντικείμενο και παίρνουμε το πεδίο `length`.
  
* Για [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Basic_assignment):

   ```javascript
   var o = {p: 42, q: true};
   var {p, q} = o;

   console.log(p); // 42
   console.log(q); // true
   ```

## Αποδόμηση σε Πίνακες και σε Αντικείμενα

* Η αποδόμηση λειτουργεί και σε πίνακες και σε αντικείμενα:

   ```javascript
   var a, b, rest;
   [a, b] = [10, 20];
   console.log(a); // 10
   console.log(b); // 20

   [a, b, ...rest] = [10, 20, 30, 40, 50];
   console.log(a); // 10
   console.log(b); // 20
   console.log(rest); // [30, 40, 50]

   ({ a, b } = { a: 10, b: 20 });
   console.log(a); // 10
   console.log(b); // 20
   ```

## Αποδόμηση και Αλλαγή Τιμών

* Με την αποδόμηση μπορούμε να ανταλλάξουμε τις τιμές δύο μεταβλητών
  χωρίς ενδιάμεση μεταβλητή:
  
   ```javascript
   var a = 1;
   var b = 3;

   [a, b] = [b, a];
   console.log(a); // 3
   console.log(b); // 1
   ```
   
## Συντόμευση `src/App.js` (1)

* Σύμφωνα με τα παραπάνω, μπορούμε να συντομεύσουμε το `src/App/js` ως
  εξής:
  
   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   /* ... */

   class App extends Component {
     render() {
       return (
         <div className="App">
       {list.map(item => {
         return(
           <div key={item.id}>
             <span>
               <a href={item.url}>{item.title}</a>:
             </span>
             &nbsp;
             <span>{item.author}</span>
             &nbsp;Year Published:
             <span>{item.year_published}</span>
           </div>
         );
       })}
         </div>
       );
     }
   }

   export default App;
   ```

## Συντόμευση `src/App.js` (2)

* Ή ακόμα περισσότερο, αφού μπορεί να παραληφθεί το `return` μετά το
  βελάκι:
  
   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   /* ... */
   
   class App extends Component {
     render() {
       return (
         <div className="App">
           {list.map(item =>
             <div key={item.id}>
               <span>
                 <a href={item.url}>{item.title}</a>:
               </span>
               &nbsp;
               <span>{item.author}</span>
               &nbsp;Year Published:
               <span>{item.year_published}</span>
             </div>
           )}
         </div>
       );
     }
   }
   
   export default App;
   
   ```

## `this` στην JavaScript

* Το `this` στην JavaScript συμπεριφέρεται διαφορετικά από ό,τι σε
  άλλες γλώσσες.
  
* Η συμπεριφορά του εξαρτάται από το αν χρησιμοποιείται:
  
  * εκτός συναρτήσεων 
  
  * εντός συναρτήσεων
  
  * εντός μεθόδων
  
  * σε συντομευμένες συναρτήσεις
  

## `this` εκτός Συναρτήσεων

* To `this` εκτός συνάρτησης αναφέρεται στο global object.

* Για
  [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Global_Context):
  
   ```javascript
   // In web browsers, the window object is also the global object:
   console.log(this === window); // true

   a = 37;
   console.log(window.a); // 37

   this.b = "MDN";
   console.log(window.b)  // "MDN"
   console.log(b)         // "MDN"
   ```

## `this` σε Συνάρτηση (όχι `strict` mode)

* Αν το `this` χρησιμοποιείται σε συνάρτηση, και δεν βρισκόμαστε σε
  strict mode, τότε το `this` αναφέρεται στο global object, που στην
  περίπτωση του browser είναι το `window`.
  
* Για [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Simple_call):

   ```javascript
   function f1() {
     return this;
   }

   // In a browser:
   f1() === window; // true 

   // In Node:
   f1() === global; // true
   ```
   
## `this` σε Συνάρτηση (`strict` mode)
   
* Αν βρισκόμαστε σε strict mode, το `this` αναφέρεται στην τιμή που
  είχε πριν την κλήση της συνάρτησης.
  
* Για [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Simple_call):

   ```javascript
   function f2() {
     'use strict'; // see strict mode
     return this; 
   }

   f2() === undefined; // true, because this was not defined before
                      // the call
   ```

## `this` σε Μεθόδους

* Αν καλέσουμε τη συνάρτηση ως μέθοδο, τότε το `this` αναφέρεται στο
  αντικείμενο πάνω στο οποίο καλείται η μέθοδος.
  
* Για
  [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#As_an_object_method):
  
   ```javascript
   var o = {
     prop: 37,
     f: function() {
       return this.prop;
     }
   };

   console.log(o.f()); // 37
   ```

## Κλάσεις στην JavaScript (1)

* Στην JavaScript στην πραγματικότητα οι κλάσεις είναι συναρτήσεις
  (και οι συναρτήσεις είναι αντικείμενα).
  
* Για [παράδειγμα](http://xahlee.info/js/javascript_class.html):

   ```javascript
   // this is the constructor
   function AA (x) {
     this.kk = x;
     console.log("constructor called with arg " + x)
   };

   // static method
   AA.sm = function (x) {console.log("sm called with arg " + x)}

   // this is the prototype
   AA.prototype = {
     ff: function (x) {console.log("ff called with arg " + x)},
   };

   // --------------------------------------------------
   // using the class

   const obj = new AA(4); // prints: constructor called with arg 4

   console.log(obj); // { kk: 4 }

   obj.ff(2); // prints: ff called with arg 2

   // static method
   AA.sm(3); // prints: sm called with arg 3
   ```

## Κλάσεις στην JavaScript (2)

* Στην ES6 μπορούμε να δηλώσουμε κλάσεις με έναν τρόπο που είναι πιο
  κοντά σε γλώσσες όπως Java.
  
* Για [παράδειγμα](http://xahlee.info/js/javascript_class.html):

   ```javascript
   // define a class
   class AA {

       constructor(x) {
           this.kk = x;
           console.log("constructor called with arg " + x)
       }

       ff (x) {console.log("ff called with arg " + x)}

       static sm (x) {console.log("sm called with arg " + x)}

   }

   // --------------------------------------------------
   // using the class

   const obj = new AA(4); // prints: constructor called with arg 4

   console.log(obj); // { kk: 4 }

   obj.ff(2); // prints: ff called with arg 2

   // static method is called directly, not via instance of a object
   AA.sm(3); // prints: sm called with arg 3
   ```
  
## Κλάσεις στην JavaScript (3)

* Μια κλάση στην JavaScript μπορεί να έχει στατικές μεθόδους, getters,
  και setters.
  
* Για [παράδειγμα](http://xahlee.info/js/javascript_class.html):

   ```javascript
   // example of a class
   class A {

       constructor(x) {
           this.p = x;
           console.log("constructor called with arg " + x)
       }

    ff (x) {console.log("ff called with arg " + x)}

    set p1 (x) {console.log("setter called")}

    get p1 () {console.log("getter called")}

    static ss (x) {console.log("ss called with arg " + x)}

   }

   // ---------------------------
   // using the class

   // static method is called directly, not via instance of a object
   A.ss(3); // prints: ss called with arg 3

   // create a instance.
   const x = new A(4); // prints: constructor called with arg 4

   console.log(x); // A { p: 4 }

   x.ff(1); // prints: ff called with arg 1

   x.p1 = 1; // prints: "setter called"

   x.p1; // prints: "getter called"
   ```

## Κληρονομικότητα στην JavaScript (1)

* Για να δούμε πώς δουλεύει η κληρονομικότητα στην JavaScript, έστω
  ότι έχουμε μια απλή ιεραρχία με τις κλάσεις `Person` και `Teacher`.
  
* Θα ακολουθήσουμε το [παράδειγμα του
  MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance).
  
## Κληρονομικότητα στην JavaScript (2)

* Η κλάση `Person` θα οριστεί ως εξής:

   ```javascript
   function Person(first, last, age, gender, interests) {
     this.name = {
       first,
       last
     };
     this.age = age;
     this.gender = gender;
     this.interests = interests;
   };

   Person.prototype.greeting = function() {
     console.log('Hi! I\'m ' + this.name.first  + '.');
   }

   p = new Person('John', 'Dow', 13, 'male', ['literature', 'music']);
   p.greeting();
   ```

## Κληρονομικότητα στην JavaScript (2)

* Η κλάση `Teacher` θα οριστεί όπως:

   ```javascript
   function Teacher(first, last, age, gender, interests, subject) {
     Person.call(this, first, last, age, gender, interests);

     this.subject = subject;
   }

   Teacher.prototype = Object.create(Person.prototype);

   Object.defineProperty(Teacher.prototype, 'constructor', { 
       value: Teacher, 
       enumerable: false, // so that it does not appear in 'for in' loop
       writable: true });

   Teacher.prototype.greeting = function() {
     var prefix;

     if (this.gender === 'male' || this.gender === 'Male'
         || this.gender === 'm' || this.gender === 'M') {
       prefix = 'Mr.';
     } else if (this.gender === 'female' || this.gender === 'Female'
            || this.gender === 'f' || this.gender === 'F') {
       prefix = 'Mrs.';
     } else {
       prefix = 'Mx.';
     }

     console.log('Hello. My name is ' + prefix + ' '
             + this.name.last + ', and I teach ' + this.subject + '.');
   };

   let t = new Teacher('Mary', 'Dow', 23, 'female', ['literature', 'music'],
                       'computer science');
   t.greeting();
   ```

<div class="notes">

Στο παραπάνω φαίνεται ίσως παράξενη η κλήση:

```javascript
Object.defineProperty(Teacher.prototype, 'constructor', { 
    value: Teacher, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });
```

Όταν ορίζουμε το `prototype` για την κλάση `Teacher` με τη γραμμή:

```javascript
Teacher.prototype = Object.create(Person.prototype);
```

η ιδιότητα `Teacher.prototype.constructor` είναι `Person()`. Πράγματι,
αν δώσουμε:

```javascript
console.log(Teacher.prototype)
```

θα πάρουμε:

```
Person { greeting: [Function] }
```

Για να μη γίνεται αυτό, ορίζουμε την ιδιότητα `constructor` του
`Teacher.prototype` ώστε να είναι πραγματικά `Teacher()`. Μπορούμε να
επιβεβαιώσουμε ότι λειτουργεί όπως πρέπει, γιατί μετά τη χρήση του
`Object.defineProperty()`, αν δώσουμε:

```javascript
console.log(Teacher.prototype)
```

θα πάρουμε:

```
Teacher { greeting: [Function] }
```

</div>

## Κληρονομικότητα στην JavaScript (3)

* Στην ES6 τα πράγματα έχουν απλοποιηθεί σημαντικά.

* Θα μπορούσαμε να γράψουμε την ιεραρχία απλώς ως:

   ```javascript
   class Person {
     constructor(first, last, age, gender, interests) {
       this.name = {
         first,
         last
       };
       this.age = age;
       this.gender = gender;
       this.interests = interests;
     }

     greeting() {
       console.log(`Hi! I'm ${this.name.first}`);
     };
   }

   class Teacher extends Person {
     constructor(first, last, age, gender, interests, subject) {
       super(first, last, age, gender, interests);

     // subject is specific to Teacher
     this.subject = subject;
     }
   }

   let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'],
                           'Dark arts');

   snape.greeting();
   ```

## Getters

* Στην JavaScript μπορούμε να συνδέσουμε μια ιδιότητα με μία συνάρτηση
  που θα κληθεί όταν αναζητήσουμε την τιμή της ιδιότητας.
  
* Για
  [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Examples):

   ```javascript
   var obj = {
     log: ['example','test'],
     get latest() {
       if (this.log.length == 0) return undefined;
       return this.log[this.log.length - 1];
     }
   }
   console.log(obj.latest); // "test".
   ```
   
## Setters

* Αντίστοιχα, μπορούμε να συνδέσουμε μια ιδιότητα με μία συνάρτηση η
  οποία θα κληθεί όταν θελήσουμε να αλλάξουμε την τιμή της ιδιότητας.
  
* Για
  [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set#Examples):
  
   ```javascript
   var language = {
     set current(name) {
       this.log.push(name);
     },
     log: []
   }

   language.current = 'EN';
   console.log(language.log); // ['EN']

   language.current = 'FA';
   console.log(language.log); // ['EN', 'FA']
   ```

## Χρήση σε Κλάσεις

* Φυσικά μπορούμε να χρησιμοποιήσουμε getters και setters και σε
  κλάσεις.
  
* Θέλει προσοχή το ότι η ιδιότητα δεν θα πρέπει να έχει το ίδιο όνομα
  με τον getter / setter (θα πάρουμε λάθος):
  
   ```javascript
   class Person {
     constructor(first, last, age, gender, interests) {
       this.name = {
         first,
         last
       };
       this.age = age; // calls setter; there is no this.age, only this._age
       this.gender = gender;
       this.interests = interests;
     }

     set age(newAge) {
       if (newAge > 0) {
         this._age = newAge;
       }
     }

     greeting() {
       console.log(`Hi! I'm ${this.name.first}`);
     };
   }
   ```

## Ανύψωση

* Η [ανύψωση
  (hoisting)](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
  στην JavaScript μας επιτρέπει να χρησιμοποιήσουμε μια συνάρτηση πριν
  τη δηλώσουμε:
  
   ```javascript
   catName("Tigger");


   function catName(name) {
     console.log("My cat's name is " + name);
   }

   /*
   The result of the code above is: "My cat's name is Tigger"
   */
   ```
   
## Ανύψωση και Κλάσεις

* Μια διαφορά των κλάσεων στην ES6 σε σχέση με τις παραδοδιακές κλάσεις
  της JavaScript είναι ότι οι δηλώσεις κλάσεων, σε αντίθεση με τις
  δηλώσεις συναρτήσεων, δεν ανυψώνονται:
  
   ```javascript
   const p = new Rectangle(); // ReferenceError

   class Rectangle {}
   ```

## Προβλήματα με το `this`

* Οι συνήθεις συναρτήσεις έχουν μια ιδιότητα `this`, ανάλογα με τον
  τρόπο με τον οποίο καλούνται. 
  
* Αυτό μπορεί να δημιουργήσει
  [προβλήματα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this):
  
   ```javascript
   function Person() {
     // The Person() constructor defines `this` as an instance of itself.
     this.age = 0;

     var growing = setInterval(function growUp() {
       // In non-strict mode, the growUp() function defines `this` 
       // as the global object (because it's where growUp() is executed.), 
       // which is different from the `this`
       // defined by the Person() constructor. 
       alert(this.age);
       this.age++;
       if (this.age > 5) {
         clearInterval(growing);
       }
     }, 1000);
   }

   var p = new Person();
   ```

## Διόρθωση `this` σε ECMAScript3/5

* Στην ECMAScript 3/5 το πρόβλημα διορθωνόταν αποθηκεύοντας την τιμή
  του `this` σε μία μεταβλητή:
  
   ```javascript
   function Person() {
     // The Person() constructor defines `this` as an instance of itself.
     var that = this;
     that.age = 0;

     var growing = setInterval(function growUp() {
       // The callback refers to the `that` variable of which
       // the value is the expected object.
       alert(that.age);
       that.age++;
       if (that.age > 5) {
         clearInterval(growing);
       }
     }, 1000);
   }

   var p = new Person();
   ```

## Δέσμευση `this`

* Εναλλακτικά, μπορούμε να δεσμεύσουμε το `this` στην τιμή που θέλουμε
  με χρήση του `bind()`:
  
   ```javascript
   function Person() {
     this.age = 0;

     this.growUp = function growUp() {
       alert(this.age);
       this.age++;
       if (this.age > 5) {
         clearInterval(this.growing);
       }
     };

     this.growUp = this.growUp.bind(this);

     this.growing = setInterval(this.growUp, 1000);
   }

   var p = new Person();
   ```

## Χρήση `this` σε Συντομευμένες Συναρτήσεις

* Στις συντομευμένες συναρτήσεις, εφ' όσον δεν έχουν `this`, η
  κατάσταση απλοποιείται πολύ:
  
   ```javascript
   function Person() {
     this.age = 0;

     this.growing = setInterval(() => {
       alert(this.age);
       this.age++;
       if (this.age > 5) {
         clearInterval(this.growing);
       }
     }, 1000);

   }

   var p = new Person();
   ```
