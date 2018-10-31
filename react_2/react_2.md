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
           <input type="text" onChange={this.onSearchChange}/>
         </form>
         ...
       </div>
     );
   }

   ```

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
           <input type="text" onChange={this.onSearchChange}/>
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
