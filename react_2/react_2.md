% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# React 2

## Αποθήκευση Κατάστασης

* Στο μέχρι τώρα παράδειγμα αποθηκεύσαμε τη λίστα των βιβλίων που
  δείχνει το εξάρτημά μας σε μία μεταβλητή στο πρόγραμμά μας.
  
* Στην πραγματικότητα, τα δεδομένα του κάθε εξαρτήματος θα
  αποθηκεύονται σε κάθε εξάρτημα.
  
* Τα δεδομένα αυτά θα αποτελούν την *κατάσταση* (state) του
  εξαρτήματος.
  
* Η κατάσταση αποθηκεύεται στη μεταβλητή `this.state`.

## Αποθήκευση Κατάστασης στον Κατασκευαστή

* Αρχικοποιούμε την κατάσταση στον κατασκευαστή της κλάσης.

* Στη συνέχεια, όταν αλλάζει η κατάσταση θα καλείται αυτομάτως η
  `render()` και θα εμφανίζει τις αλλαγές.
  
* Την κατάσταση την αλλάζουμε *μόνο* μέσω της μεθόδου `setState()` του
  `Component`.

   ```javascript
   class App extends Component {

     constructor(props) {
       super(props);

       this.state = {
         list: list,
       };
       
     }

     render() {
       return (
         <div className="App">
       {this.state.list.map(item =>
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

## Διαγραφή Βιβλίου

* Θα προχωρήσουμε στην υλοποίηση της διαγραφής των βιβλίων από τη
  λίστα.
  
* Κατ' αρχήν θα γράψουμε μια μέθοδο στην κλάση `App` η οποία θα
  απομακρύνει συγκεκριμένο βιβλίο.
  
* Αυτό θα το κάνει φιλτράροντας όλα τα βιβλία εκτός από το
  συγκεκριμένο.
  
   ```javascript
   onDismiss(id) {
     const updatedList = this.state.list.filter(item => item.id !== id);

     this.setState({ list: updatedList });
   }
   ```
   
## Χειριστής Γεγονότος Διαγραφής

* Στη συνέχεια θα προσθέσουμε ένα κουμπί με το οποίο θα διαγράφουμε το
  βιβλίο που βρίσκεται δίπλα του.
  
* Το κουμπί θα το κάνει αυτό καλώντας τη μέθοδο `onDismiss()` όταν ο
  χρήστης κάνει κλικ επάνω του.
  
* Άρα η `onDismiss()` θα είναι ο *χειριστής γεγονότος* (event handler)
  για το κλικ.
  
   ```javascript
   render() {
     return (
       <div className="App">
         {this.state.list.map(
           item =>
             <div key={item.id}>
               <span>
                 <a href={item.url}>{item.title}</a>:
               </span>
               &nbsp;
               <span>{item.author}</span>
               &nbsp;Year Published:
               <span>{item.year_published}</span>
               <span>
                 <button onClick={() => this.onDismiss(item.id)}>
                   Dismiss
                 </button>
               </span>
             </div>
         )}
       </div>
     );
   }
   ``` 

## Γενικότερα περί Χειριστών

* Ας δούμε ένα άλλο
  [παράδειγμα](https://reactjs.org/docs/handling-events.html) χειριστή:
  
   ```javascript
   class Toggle extends React.Component {
     constructor(props) {
       super(props);
       this.state = {isToggleOn: true};

       // This binding is necessary to make `this` work in the callback
       this.handleClick = this.handleClick.bind(this);
     }

     handleClick() {
       this.setState(state => ({
         isToggleOn: !state.isToggleOn
       }));
     }

     render() {
       return (
         <button onClick={this.handleClick}>
           {this.state.isToggleOn ? 'ON' : 'OFF'}
         </button>
       );
     }
   }

   ReactDOM.render(
     <Toggle />,
     document.getElementById('root')
   );
   ```

## Το Πρόβλημα της Μη-Δέσμευσης

* Ένα πρόβλημα προκύπτει όταν εκτελείται το:

   ```javascript
   onClick={this.handleClick}
   ```
   
* Με την εντολή αυτή, θα αποθηκευτεί το `this.handleClick` ως χειριστής
  του κλικ.
  
* Πλην όμως, θα αποθηκευτεί *χωρίς να έχει δεσμευτεί το `this`*, εκτός
  και αν το έχουμε δεσμεύσει εμείς πριν.

* Αυτό φαίνεται ίσως αν προσέξουμε ότι γράφουμε:

   ```javascript
   onClick={this.handleClick}
   ```
   
   και όχι:
   
   ```javascript
   onClick={this.handleClick()}
   ```
   
## Δημιουργία Δέσμευσης

* Για να δεσμεύσουμε το `this.handleClick` στο εξάρτημα,
  χρησιμοποιούμε τη συνάρτηση `bind` στον κατασκευαστή του:
  
   ```javascript
    // This binding is necessary to make `this` work in the callback
   this.handleClick = this.handleClick.bind(this);
   ```
   
## Χρήση Συντομευμένης Συνάρτησης (1)

* Εναλλακτικά, μπορούμε να χρησιμοποιήσουμε συντομευμένες συναρτήσεις:

   ```javascript
   class LoggingButton extends React.Component {
     handleClick() {
       console.log('this is:', this);
     }

     render() {
       // This syntax ensures `this` is bound within handleClick
       return (
         <button onClick={(e) => this.handleClick(e)}>
           Click me
         </button>
       );
     }
   }
   ```
   
## Χρήση Συντομευμένης Συνάρτησης (2) 

* Η μέθοδος αυτή δημιουργεί όμως μία διαφορετική συνάρτηση για κάθε
  κουμπί. 
  
* Αυτό μπορεί να είναι μειονέκτημα αν εμφανίζεται πολλές φορές το ίδιο
  ακριβώς κουμπί· είναι οικονομικότερο να έχουμε μια συνάρτηση.
  
* Από την άλλη, αν περνάμε παραμέτρους στον χειριστή, ούτως ή άλλως
  δημιουργούμε διαφορετική συνάρτηση για κάθε φορά που εμφανίζεται το
  κουμπί (όπως το Dismiss πριν).
  
* Άρα τότε γράφουμε κάτι του τύπου:

   ```javascript
   <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
   <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
   ```
   
## Λειτουργία Αναζήτησης

* Προχωράμε τώρα στην εισαγωγή ενός πεδίου αναζήτησης στη σελίδα μας.

* Ενόσω γράφουμε στο πεδίο αυτό, η λίστα με τα βιβλία αυτομάτως θα
  ενημερώνεται ώστε να εμφανίζει μόνο τα βιβλία τα οποία ταιριάζουν με
  την αναζήτησή μας.
  

## Πεδίο Αναζήτησης

* Κατ' αρχήν θα πρέπει να εισάγουμε ένα πεδίο αναζήτησης στη σελίδα.

* Το πεδίο αυτό θα είναι μέρος μιας φόρμας, όμως η φόρμα αυτή δεν θα
  είναι μια κλασική φόρμα HTML.
  
   ```javascript
   render() {
     return (
       <div className="App">
         <form>
           <input 
             type="text" 
             value={this.state.searchTerm}
             onChange={this.onSearchChange}
           />
         </form>
         ...
       </div>
     );
   }
   ```

## Ελεγχόμενα Στοιχεία

* Στην HTML, στοιχεία όπως `<input>`, `<textarea>`, και `<select>`,
  χειρίζονται τα ίδια την κατάστασή τους (δηλαδή την είσοδο του
  χρήστη).
  
* Εμείς όμως θέλουμε η κατάστασή τους να ελέγχεται από το React.

* Αυτό το κάνουμε θέτοντας 

   ```
   value={this.state.searchTerm}
   ```

* Τα στοιχεία των οποίων η κατάσταση ελέγχεται πλήρως από το React
  ονομάζονται *ελεγχόμενα στοιχεία* (controlled elements).


## Χειριστής Αναζήτησης (1)

* Η αναζήτηση θα ενεργοποιεί τον χειριστή της αναζήτησης.

* Αυτόν τον ορίζουμε ως χειριστή του γεγονότος `onChange`.

* Ο χειριστής αυτός θα παίρνει ως παράμετρο αυτομάτως το ίδιο το
  γεγονός, το οποίο θα περιλαμβάνει την είσοδο του χρήστη.


## Χειριστής Αναζήτησης (2)

* Ο χειριστής θα είναι μια μέθοδος στην κλάση `App`:
 
   ```javascript
   onSearchChange(event) {
     // shallow merge, so list is preserved
     this.setState({ searchTerm: event.target.value });
   }

   ```

* Ο χειριστής παίρνει την είσοδο του χρήστη και την αποθηκεύει,
  συγχωνεύοντάς την στην κατάσταση του εξαρτήματος.


## Δέσμευση Χειριστή

* Επειδή ο χειριστής δεν δίνεται ως συντομευμένη συνάρτηση, θα πρέπει
  να δεσμεύσουμε το `this` για να δουλέψει σωστά.
  
* Αυτό το κάνουμε στον κατασκευαστή του `App.js`.

* Επίσης εκεί θα αρχικοποιούμε και τον όρο αναζήτησης `searchTerm`
  στην κατάσταση του εξαρτήματος.

   ```javascript
   constructor(props) {
     super(props);

     this.state = {
       list: list,
       searchTerm: '',
     };

     this.onSearchChange = this.onSearchChange.bind(this);
   }
   ```


## Φιλτράρισμα Βιβλίου

* Θα χρησιμοποιήσουμε μια βοηθητική μέθοδο η οποία για ένα βιβλίο θα
  αποφαίνεται αν ταιριάζει με τον όρο αναζήτησης.
  
   ```javascript
   searchItem(item) {
     return item.title.toLowerCase()
       .includes(this.state.searchTerm.toLowerCase());
   }
   ```

## Φιλτράρισμα Λίστας Βιβλίων

* Για να ολοκληρωθεί η λειτουργία, αρκεί να φιλτράρουμε τη λίστα των
  βιβλίων αναλόγως με τον όρο αναζήτησης που βρίσκεται στην κατάσταση
  του εξαρτήματος.
  
* Η λίστα θα φιλτράρεται καλώντας για κάθε βιβλίο τη μέθοδο
  `searchItem()` που ορίσαμε προηγούμενως.
  
   ```javascript
   render() {
     return (
       <div className="App">
         <form>
           <input 
             type="text" 
             value={this.state.searchTerm}
             onChange={this.onSearchChange}/>
         </form>
         {
           this.state.list.filter(item => this.searchItem(item)).map(
             item =>
             <div key={item.id}>
               <span>
                 <a href={item.url}>{item.title}</a>:
               </span>
               &nbsp;
               <span>{item.author}</span>
               &nbsp;Year Published:
               <span>{item.year_published}</span>
               <span>
                 <button onClick={() => this.onDismiss(item.id)}>
                   Dismiss
                 </button>
               </span>
             </div>
           )
         }
       </div>
     );
   }v
   ```

## Εξαρτήματα και Ιδιότητες (1)

* Στον ορισμό του εξαρτήματος `App` μπορούμε να προσέξουμε ότι ο
  κατασκευαστής παίρνει μια παράμετρο `props`:
  
   ```javascript
   constructor(props) {
     super(props);

     this.state = {
       list: list,
       searchTerm: '',
     };

     this.onSearchChange = this.onSearchChange.bind(this);
   }
   ```

* Η παράμετρος αυτή περιέχει τις *ιδιότητες* (properties) που μπορούμε
  να προσδώσουμε σε ένα εξάρτημα.
  
## Εξαρτήματα και Ιδιότητες (2)
  
* Προσοχή: *δεν πρέπει ποτέ να αλλάξουμε μέσα σε ένα εξάρτημα τις
  ιδιότητές του!*
  
* Αν θέλουμε να αλλάζουμε τα δεδομένα, χρησιμοποιούμε την κατάσταση
  (state) του εξαρτήματος.


## Παράδειγμα Ιδιοτήτων Εξαρτήματος (1)

* Το παρακάτω
  [παράδειγμα](https://reactjs.org/docs/components-and-props.html#rendering-a-component)
  εμφανίζει το μήνυμα «Hello, Sara»:

   ```javascript
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   const element = <Welcome name="Sara" />;
   ReactDOM.render(
     element,
     document.getElementById('root')
   );
   ```

## Παράδειγμα Ιδιοτήτων Εξαρτήματος (2)

* Το προηγούμενο εξάρτημα το ορίσαμε μέσω μιας συνάρτησης, γι' αυτό
  και ονομάζεται «συναρτησιακό εξάρτημα» (function component).
  
* Μπορούμε να το ορίσουμε εναλλακτικά ως κλάση:

   ```javascript
   class Welcome extends React.Component {

     render() {
        return <h1>Hello, {this.props.name}</h1>;
     }

   }

   const element = <Welcome name="Sara" />;
   ReactDOM.render(element, document.getElementById('root'));
   ```

## Σύνθεση Εξαρτημάτων

* Μπορούμε να φτιάξουμε εξαρτήματα που χρησιμοποιούν εξαρτήματα.

* Στη δομή αυτή, μπορούμε να χρησιμοποιήσουμε ιδιότητες για να δώσει
  ένα εξάρτημα δεδομένα σε ένα άλλο.
  
   ```javascript
   const names = [
     "Alice",
     "Bob",
     "Carol",
     "Dave",
   ]

   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   function App() {
     return (
       <div>
       {names.map(name => 
         <Welcome name={name}/>
       )}
       </div>
     );
   }

   ReactDOM.render(<App />, document.getElementById('root'));
   ```

## Διάσπαση Εξαρτημάτων

* Αφού λοιπόν μπορούμε να συνθέσουμε εξαρτήματα, μπορούμε να
  διασπάσουμε ένα εξάρτημα σε μικρότερα.
  
* Έτσι, μπορούμε αντί για ένα εξάρτημα όπως τώρα να φτιάξουμε τρία:

  1. Ένα «κεντρικό» εξάρτημα (`App`).
  
  2. Ένα εξάρτημα για την αναζήτηση (`Search`).
  
  3. Ένα εξάρτημα για την εμφάνιση της λίστας των βιβλίων
     (`ItemList`).


## Παρένθεση: Διαχωρισμός των Δεδομένων (1)

* Έχουμε συμπεριλάβει τα δεδομένα μας μέσα στο αρχείο `App.js`.

* Αυτό, έστω και προσωρινά, δεν είναι καλή λύση, γιατί θα θέλαμε το
  `App.js` να έχει μόνο κώδικα.
  
* Για το λόγο αυτό, φτιάχνουμε ένα αρχείο `src/Books.js` με
  περιεχόμενα:
  
   ```javascript
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
       title: 'Gravity\'s Rainbow',
       url: 'https://en.wikipedia.org/wiki/Gravity%27s_Rainbow',
       author: 'Thomas Pynchon',
       year_published: 1973,
       id: 2
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

   export default list;

   ```
   
## Παρένθεση: Διαχωρισμός των Δεδομένων (2)

* Για να χρησιμοποιήσουμε τα δεδομένα μας στο `src/App.js` αρκεί απλώς
  να βάλουμε στην αρχή:
  
   ```javascript
   import list from './Books.js';
   ```
   
* Για περισσότερες πληροφορίες δείτε πώς δουλεύει το [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). 

## Εξάρτημα Αναζήτησης

* Το εξάρτημα αναζήτησης θα έχει δύο ιδιότητες, το κείμενο που εισάγει
  ο χρήστης και τον χειριστή.
  
* Προσέξτε ότι δεν διατηρεί δεδομένα: τα δεδομένα θα παραμένουν στην
  κατάσταση του `App.js`.
  
* To εξάρτημα αναζήτησης θα υλοποιηθεί από την κλάση `Search` στο
  αρχείο `src/App.js`:

   ```javascript
   class Search extends Component {

     render() {
       const { searchTerm, onSearchChange } = this.props;
       return (
         <div className="Search">
           <form>
             <input
               type="text"
               value={searchTerm}
               onChange={onSearchChange}
             />
           </form>
         </div>
       );
     }
   }
   ```

## Εξάρτημα Λίστας

* Το εξάρτημα της λίστας θα υλοποιηθεί και αυτό στη δική του κλάση
  `ItelList` στο αρχείο `src/App.js`. 

* Η κλάση αυτή θα παίρνει ως ιδιότητες τον όρο αναζήτησης, τη λίστα
  των βιβλίων, και τη μέθοδο `onDismiss()`.

   ```javascript
   class ItemList extends Component {

     searchItem(item) {
       return item.title.toLowerCase()
         .includes(this.props.searchTerm.toLowerCase());
     }

     render() {
       return (
         <div className="books">
         <ul>
         {this.props.list.filter(item => this.searchItem(item)).map(
           item =>
           <li key={item.id}>
             <span className="badge">{item.id}</span>
             <span className="title">
               <a href={item.url}>{item.title}</a>
             </span>
             <button
               className="delete"
               onClick={() => this.props.onDismiss(item.id)}>
                 x
               </button>
           </li>
         )}
         </ul>
         </div>
       );
     }
   }
   ```

## Σύνθεση Εξαρτημάτων

* Μετά τα παραπάνω είμαστε σε θέση να συνθέσουμε τα εξαρτήματα,
  απλοποιώντας σημαντικά τη δομή της εφαρμογής.
  
* Η κλάση `App` θα γίνει:

   ```javascript
   class App extends Component {

     constructor(props) {
       super(props);

       this.state = {
         list: list,
         searchTerm: '',
       };

       this.onSearchChange = this.onSearchChange.bind(this);
       this.onDismiss = this.onDismiss.bind(this);
     }

     onDismiss(id) {
       const updatedList = this.state.list.filter(item => item.id !== id);
       this.setState({ list: updatedList });
     }

     onSearchChange(event) {
       // shallow merge, so list is preserved
       this.setState({ searchTerm: event.target.value });
     }

     render() {
       return (
         <div className="App">
           <Search
             value={this.searchTerm}
             onSearchChange={this.onSearchChange}
           />
           <ItemList
             list={this.state.list}
             searchTerm={this.state.searchTerm}
             onDismiss={this.onDismiss}
           />
         </div>
       );
     }

   }
   ```

## Βελτίωση Εμφάνισης

* Για να βελτιώσουμε την εμφάνιση της εφαρμογής θα χρησιμοποιήσουμε
  CSS.
  
* Στο αρχείο `index.css` βάζουμε στυλ που αφορούν το σύνολο της
  εφαρμογής.
  
* Στο αρχείο `App.css` βάζουμε στυλ που αφορούν μόνο τα εξαρτήματα που
  υλοποιούμε στο αρχείο `App.js` και στη συνέχεια τα εισάγουμε στο
  `App.js`:
  
   ```javacript
   import './App.css';
   ```
  
* Όταν κτίζεται (build) η εφαρμογή, το webpack θα αναλάβει να
  τροποποιήσει τα περιεχόμενα του `App.css` ώστε οι δηλώσεις κλάσεων
  να είναι μοναδικές, και θα τα εισάγει στο αρχείο `App.js` ως inline
  `<style>`.
  
## `index.css`

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
  width: 50%;
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
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
```

## `App.css`

```css
.books {
  margin: 0 0 2em 0;
  padding: 0;
  width: 25em;
}

.books ul {
  list-style-type: none;
}

.books li {
  width: 22em;
  position: relative;
  cursor: pointer;
  background-color: #EEE;
  margin-left: .5em;
  margin-top: .5em;
  margin-botton: 0.5em;
  padding-left: 0.25em;
  padding-top: 0.45em;
  padding-bottom: 0em;
  border-radius: 4px;
  white-space: nowrap;
}

.books .title {
  width: 17em;
  overflow-x: hidden;
  text-overflow: ellipsis;
  display: inline-block;
    
}

.books li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}

.books a {
  color: #888;
  text-decoration: none;
  position: relative;
}

.books a:hover {
  color:#607D8B;
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
  min-width: 16px;
  text-align: right;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}

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
  float: right;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  background-color: gray !important;
  color: white;
}

/*
Derived by the stylesheet for the Angular tutorial (2017).

See that for any copyright that might apply (have no idea,
taking into account the changes).
For the license, check http://angular.io/license
*/
```

