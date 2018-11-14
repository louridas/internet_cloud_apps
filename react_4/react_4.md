% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# React 4

## Μερικές Αρχές Ανάπτυξης Εφαρμογών με React

* Για να αναπτύξουμε σωστά εφαρμογές με React καλό είναι να
  ακολουθήσουμε μερικές αρχές.
  
* Αυτή συνοψίζεται στα εξής:

  1. Σχεδιάζουμε την ιεραρχία των εξαρτημάτων.
  
  2. Βρίσκουμε πού πρέπει να αποθηκεύσουμε την κατάσταση.
  
  3. Παιρνάμε τα δεδομένα της κατάστασης από πάνω προς τα κάτω στην ιεραρχία.
  
  4. Αν πρέπει εξαρτήματα χαμηλά στην ιεραρχία να αλλάξουν την
     κατάσταση ψηλά στην ιεραρχία, τα «υψηλόβαθμα» θα παιρνούν
     κατάλληλα callbacks στα «χαμηλόβαθμα».


## Ιεραρχία Εξαρτημάτων στην Εφαρμογή Βιβλίων
 
 * Η ιερααρχία των εξαρτημάτων στην εφαρμογή με τα βιβλία θα είναι:
 
    ```
    App
      |__Router
           |__ItemList (search)
           |__Home (return)
           |__BookDetails (update)
           |__BookDetails (insert)
    ```

## Το Εξάρτημα `ItemList`

* Το εξάρτημα `ItemList` είναι υπεύθυνο για την:

  * αναζήτηση βιβλίων
  
  * εμφάνιση λίστας βιβλίων
  
  * διαγραφή βιβλίων


## Κώδικας `ItemList`

* Ο κώδικας του εξαρτήματος `ItemList` δεν διαφέρει πολύ από αυτόν που
  είχαμε ήδη φτιάξει.
  
* Η βασική αλλαγή είναι ότι η λίστα αποτελείται από συνδέσμους που
  διαχειρίζεται ο δρομολογητής.
  
   ```javascript
   class ItemList extends Component {

     searchItem(item) {
       return item.title.toLowerCase()
         .includes(this.props.searchTerm.toLowerCase());
     }

     render() {
       return (
         <div className="books">
         <ListGroup>
         {this.props.list.filter(item => this.searchItem(item)).map(
           item =>
             <ListGroupItem
               key={item.id}
               className="justify-content-between">
               <div className="book-item">
               <Badge pill>{item.id}</Badge>&nbsp;
               <Link 
                 to={'/api/books/' + item.id}>{item.title}</Link>
               </div>            
               <Button close onClick={() => this.props.onDismiss(item.id)} />
             </ListGroupItem>
         )}
         </ListGroup>
         </div>
       );
     }
   }
   ```
   
## Εξάρτημα Επιστροφής

* Κάθε φορά που επιλέγουμε ένα σύνδεσμο από το `ItemList`, θα
  εμφανίζονται οι λεπτομέρειες ενός βιβλίου.
  
* Χρειαζόμαστε όμως έναν τρόπο για να απομακρύνουμε τις λεπτομέρειες
  και να επιστρέφουμε στην αρχική οθόνη, όπου εμφανίζεται μόνο η λίστα
  των βιβλίων.
  
* Για το σκοπό αυτό φτιάχνουμε ένα μικρό, στοιχειώδες, ανώνυμο
  εξάρτημα.
  
   ```javascript
   <Route path="/" component={(props) => <div/>}/>
   ```
   
## Χειρισμός Βιβλίου

* Για τον χειρισμό ενός συγκεκριμένου βιβλίου, θα χρειαστούμε να
  γράψουμε κώδικα για την εισαγωγή του ή για την αλλαγή του.
  
* Είναι καλό να βάλουμε τον κώδικα αυτόν ξεχωριστά από το αρχείο
  `src/App.js`.
  
* Θα δημιουργήσουμε λοιπόν και θα εργαστούμε με το αρχείο
  `src/BookDetails.js`
  

## Διάβασμα Βιβλίου

* Για να διαβάσουμε ένα βιβλίο από τον εξυπηρετητή θα χρησιμοποιήσουμε
  μια βοηθητική συνάρτηση:

   ```javascript
   loadBook(url) {
     fetch(url)
       .then(response => response.json())
       .then(result => this.setState({...result}))
       .catch(error => error);
   }
   ```
   
## Εμφάνιση Βιβλίου 

* Για να εμφανίσουμε ένα βιβλίο όταν τοποθετηθεί το εξάρτημα στη θέση
  του, θα χρησιμοποιήσουμε τη μέθοδο `componentDidMount()`:
  
   ```javascript
   componentDidMount() {
     if (!this.props.match.params.id) {
       this.setState({...emptyBook});
     } else {
       this.loadBook(this.props.match.url);
     }
   }
   ```
   
* Στη μέθοδο ελέγχουμε αν μας έχει ζητηθεί να εμφανίσουμε υπάρχον
  βιβλίο (μέσω του URL του).
  
    * Αν ναι, το διαβάζουμε από τον εξυπηρετητή και το εμφανίζουμε.
    
    * Αν όχι, εμφανίζουμε ένα νέο, άδειο βιβλίο.


## Άδειο Βιβλίο

* Για διευκόλυνσή μας, κατασκευάζουμε ένα αντικείμενο που θα
  χρησιμοποιούμε όταν θέλουμε να φτιάξουμε νέα, άδεια βιβλία:
  
   ```javascript
   const emptyBook = {
     title: '',
     url: '',
     pub_year: ''
   };
   ```
   
## Διασπορά

* Σε νέες εκδόσεις JavaScript (ECMAScript 2015, ECMAScript 2018)
  μπορούμε να χρησιμοποιήσουμε [συντακτικό διασποράς (spread
  syntax)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
  όπου οι τιμές αντικειμένων ή πινάκων διασπείρονται σε μία έκφραση.

* Για παράδειγμα:

   ```javascript
   function sum(x, y, z) {
     return x + y + z;
   }

   const numbers = [1, 2, 3];

   console.log(sum(...numbers));
   // expected output: 6
   ```
   
## Διασπορά σε Κλήσεις

* Μπορούμε να χρησιμοποιήσουμε το νέο συντακτικό [αντί για το
  παραδοσιακό
  `Function.prototype.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_function_calls):
  
   ```javascript
   function myFunction(x, y, z) { }
   var args = [0, 1, 2];
   myFunction.apply(null, args);
   
   function myFunction(x, y, z) { }
   var args = [0, 1, 2];
   myFunction(...args);
   ```
   
## Διασπορά σε `new()`

* Αυτό είναι πολύ πρακτικό όταν κατασκευάζουμε νέα αντικείμενα με το
  `new()`: 
  
   ```javascript
   var dateFields = [1970, 0, 1];  // 1 Jan 1970
   var d = new Date(...dateFields);
   ```
   
## Διασπορά σε Πίνακες

* Επίσης πολύ πρακτική είναι η χρήση του νέου συντακτικού [σε δηλώσεις
  πινάκων](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals):
  
   ```javascript
   var parts = ['shoulders', 'knees']; 
   var lyrics = ['head', ...parts, 'and', 'toes']; 
   // ["head", "shoulders", "knees", "and", "toes"]
   ```

## Αντιγραφή Πινάκων

* Μπορούμε εύκολα να κατασκευάσουμε (προσοχή, *ρηχά!*) αντίγραφα
  πινάκων:
  
   ```javascript
   var arr = [1, 2, 3];
   var arr2 = [...arr]; // like arr.slice()
   arr2.push(4);
   ```
   
## Ένωση Πινάκων

* Αντίστοιχα, μπορούμε να το χρησιμοποιήσουμε για ένωση πινάκων.
  Παραδοσιακά γινόταν έτσι:
  
   ```javascript
   var arr1 = [0, 1, 2];
   var arr2 = [3, 4, 5];
   // Append all items from arr2 onto arr1
   arr1 = arr1.concat(arr2);
   ```
   
* Ενώ τώρα μπορούμε να γράψουμε:

   ```javascript
   var arr1 = [0, 1, 2];
   var arr2 = [3, 4, 5];
   arr1 = [...arr1, ...arr2];
   ```
   
## Εισαγωγή στην Αρχή Πίνακα

* Παραδοσιακά, αν θέλουμε να εισάγουμε στοιχεία στην αρχή ενός πίνακα,
  γράφαμε:
  
   ```javascript
   var arr1 = [0, 1, 2];
   var arr2 = [3, 4, 5];
   // Prepend all items from arr2 onto arr1
   Array.prototype.unshift.apply(arr1, arr2) // arr1 is now [3, 4, 5, 0, 1, 2]
   ```
   
* Τώρα γράφουμε:

   ```javascript
   var arr1 = [0, 1, 2];
   var arr2 = [3, 4, 5];
   arr1 = [...arr2, ...arr1]; // arr1 is now [3, 4, 5, 0, 1, 2]
   ```
   
* Προσέξτε όμως ότι πλέον το `arr1` δεν μεταβάλεται επιτόπου
  (inplace).
  
## Διασπορά σε Αντικείμενα

* Μπορούμε επίσης να χρησιμοποιήσουμε το συντακτικό για να
  αντιγράψουμε (ρηχά!) τις ιδιότητες ενός αντικειμένου σε άλλο, [για
  παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals):
  
   ```javascript
   var obj1 = { foo: 'bar', x: 42 };
   var obj2 = { foo: 'baz', y: 13 };

   var clonedObj = { ...obj1 };
   // Object { foo: "bar", x: 42 }

   var mergedObj = { ...obj1, ...obj2 };
   // Object { foo: "baz", x: 42, y: 13 }
   ```

* Παραδοσιακά για κάτι τέτοιο χρησιμοποιούσαμε το `Object.assign()`:

   ```javascript
    var obj = { foo: 'bar', x: 42 };
    var copy = Object.assign({}, obj);
    ```

## Ενημέρωση `BookDetails`

* Στην εφαρμογή μας, το εξάρτημα `BookDetails` πρέπει να ανανεώνεται
  και κάθε φορά που αλλάζει το βιβλίο του οποίου τις λεπτομέρειες
  θέλουμε να δούμε.
  
* Η μέθοδος `componentDidMount()` καλείται μόνο όταν το εξάρτημα
  τοποθετείται στη θέση του.
  
* Επομένως, θα χρειαστούμε και τη μέθοδο του κύκλου ζωής
  `componentDidUpdate()`, η οποία καλείται κάθε φορά που αλλάζει κάτι
  στο εξάρτημα.


## `componentDidUpdate()`

* Η `componengDidUpdate()` θα ελέγχει αν έχει αλλάξει η ιδιότητα που
  αντιστοιχεί στο URL του βιβλίου.
  
* Αν ναι, πρέπει να δείξει νέο βιβλίο· αν όχι, απλώς δεν κάνει τίποτε:

   ```javascript
   componentDidUpdate(prevProps) {
     if (prevProps.match.url !== this.props.match.url) {
       this.loadBook(this.props.match.url);
     }
   }
   ```

## Φόρμα Βιβλίου

* Η ίδια η εμφάνιση του βιβλίου είναι δουλειά της `render()`, όπως
  πάντα.
  
* Η `render()` του `BookDetails` θα είναι:

   ```javascript
   render() {
     const book = this.state;

     return (
       <div className="book">
         <Form onSubmit={this.handleSubmit}>
           <FormGroup>
             <Label for="bookTitle">Title</Label>
             <Input
               type="text"
               name="title"
               value={book.title}
               onChange={this.handleInputChange}
             />
           </FormGroup>
           <FormGroup>
             <Label for="bookUrl">
               <a href={book.url}
                  target="_blank"
                  rel="noopener noreferrer">URL</a>
             </Label>
             <Input
               type="text"
               name="url"
               value={book.url}
               onChange={this.handleInputChange}
             />
           </FormGroup>
           <FormGroup>
             <Label for="bookPubYear">Publication Year</Label>
             <Input
               type="text"
               name="pub_year"
               value={book.pub_year}
               onChange={this.handleInputChange}
             />
           </FormGroup>
           <Button color="success">Submit</Button>{' '}
           <Link to='/'>
             <Button color="secondary">Dismiss</Button>{' '}
           </Link>
         </Form>
       </div>
     );
   }
   ```

## Χειρισμός Αλλαγών στη Φόρμα

* Αρμόδιος για τον χειρισμό των αλλαγών στη φόρμα είναι ο χειριστής
  `handleInputChange()`:
  
   ```javascript
   handleInputChange(event) {
     const target = event.target;
     const name = target.name;
     const value = target.value;

     this.setState({[name]: value});
   }
   ```

## Υπολογιζόμενα Ονόματα Ιδιοτήτων

* Η `handleInputChange()` χρησιμοποιεί το συντακτικό για [υπολογιζόμνα
  ονόματα ιδιοτήτων (computer property
  names)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)
  που είναι στη διάθεσή μας από την ES6:
  
   ```javascript
   var i = 0;
   var a = {
     ['foo' + ++i]: i,
     ['foo' + ++i]: i,
     ['foo' + ++i]: i
   };

   console.log(a.foo1); // 1
   console.log(a.foo2); // 2
   console.log(a.foo3); // 3

   var param = 'size';
   var config = {
     [param]: 12,
     ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
   };

   console.log(config); // {size: 12, mobileSize: 4}
   ```

## Υποβολή της Φόρμας

* Αρμόδιος για την υποβολή της φόρμας είναι ο χειριστής
  `handleSubmit()`:
  
   ```javascript
   handleSubmit(event) {
     const id = this.state.id || '';
     const book = this.state;
     const method = this.state.id ? "PUT" : "POST";
     fetch(`/api/books/${id}`, {
       method: method,
       body: JSON.stringify(book),
       headers:{
         'Content-Type': 'application/json'
       }
     })
       .then(response => response.json())
       .then(result => {
         const fillerBook = Object.assign({}, emptyBook);
         this.setState({fillerBook});
         if (method === "POST") {
           this.props.onBookInsert(result);
           this.setState({...emptyBook});
         } else {
           this.props.onBookUpdate(result);
         }
       })
       .catch(error => console.error('Error:', error));
     event.preventDefault();
   }
   ```

## Εξάρτημα Ενημέρωσης Βιβλίου

* Το εξάρτημα ενημέρωσης βιβλίου ορίζεται στον `Router` του εξαρτήματος
  `App`.
  
* Δεδομένου ότι θέλουμε η ενημέρωση βιβλίου να αλλάζει την κατάσταση
  στο `App`, θα πρέπει να του περάσουμε τη μέθοδο του `App` που θα
  καλεί για να το πετύχει αυτό:
  
   ```javascript
    <Route path="/api/books/:id"
        render={(props) => <BookDetails
                             onBookUpdate={this.onBookUpdate}
                             {...props}
                           />}
    />
    ```
    
## `onBookUpdate()`

* Η `onBookUpdate()` πλέον ορίζεται στο εξάρτημα `App` και ενημερώνει
  τη λίστα με το ενημερωμένο βιβλίο:
  
   ```javascript
   onBookUpdate(updatedBook) {
     const updatedList = this.state.list.map(book => {
       return (book.id === updatedBook.id
               ? updatedBook
               : book);
     });
     this.setState({ list: updatedList });
   }
   ```

## Εξάρτημα Εισαγωγής Βιβλίου

* Το εξάρτημα εισαγωγής βιβλίου ορίζεται ομοίως στον `Router` του εξαρτήματος
  `App`.
  
* Και πάλι, δεδομένου ότι θέλουμε η εισαγωγή βιβλίου να αλλάζει την
  κατάσταση στο `App`, θα πρέπει να του περάσουμε τη μέθοδο του `App`
  που θα καλεί για να το πετύχει αυτό:
  
   ```javascript
   <Route path="/api/books/" exact
          render={(props) => <BookDetails
                               onBookInsert={this.onBookInsert}
                               {...props}
                             />}
   />
    ```
    
## `onBookInsert()`

* Η `onBookInsert()` ορίζεται και αυτή στο εξάρτημα `App` και ενημερώνει
  τη λίστα, προσθέτοντας στο τέλος της το νέο βιβλίο:
  
   ```javascript
   onBookInsert(newBook) {
     const updatedList = [...this.state.list, newBook];
     this.setState({ list: updatedList });
   }
   ```

