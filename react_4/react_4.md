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
           |__Home
           |    |__BookPreview
           |    |__Search
           |    |__ItemList
           |__Home (return)
           |__BookDetails (update)
           |__BookDetails (insert)
    ```

## Το Εξάρτημα `ItemList`

* Το εξάρτημα `ItemList` είναι υπεύθυνο για την:

  * αναζήτηση βιβλίων
  
  * εμφάνιση λίστας βιβλίων
  
  * διαγραφή βιβλίων


## Εξάρτημα `ItemList`

* Ο κώδικας του εξαρτήματος `ItemList` δεν διαφέρει πολύ από αυτόν που
  είχαμε ήδη φτιάξει.
  
* Μία βασική αλλαγή είναι ότι η λίστα αποτελείται από συνδέσμους που
  διαχειρίζεται ο δρομολογητής.
  
* Μία άλλη βασική αλλαγή είναι ότι προσθέτουμε ένα κουμπί για να
  εμφανίζεται μια προεπισκόπιση του κάθε βιβλίου.
  
## Κώδικας `ItemList`
  
```javascript
class ItemList extends Component {

  searchItem(item) {
    return item.title.toLowerCase()
      .includes(this.props.searchTerm.toLowerCase());
  }

  render() {
    return (
      <div>
        <div className="books">
          <ListGroup>
            {this.props.list.filter(item => this.searchItem(item)).map(
              item =>
                <ListGroupItem
                  key={item.id}
                  className="justify-content-between">
                  <div className="book-item">
                    <Badge pill>{item.id}</Badge>
                    <span className="books-buttons">
                      <Button color="link">
                        <FontAwesomeIcon
                          icon="eye"
                          onClick={() => this.props.onPreview(item.id)}
                        />
                      </Button>
                    </span>
                    <Link 
                      to={'/books/' + item.id}>{item.title}
                    </Link>
                  </div>
                  <Button
                    close
                    onClick={() => this.props.onDismiss(item.id)} />
                </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </div>
    );
  }
}
```
 
## Προεπισκόπιση Βιβλίου

* Η προεπισκόπιση ενός βιβλίου θα λειτουργεί εμφανίζοντας ένα modal
  κουτί διαλόγου.
  
* Το κουτί διαλόγου είναι παιδί του εξαρτήματος `Home`.

* Επομένως, θα πρέπει το εξάρτημα `ItemList` να ενημερώνει το εξάρτημα
  `Home` ότι πρέπει να το εμφανίσει.
  
## Διασύνδεση Προεπισκόπισης

* Αυτό από τη μεριά του `ItemList` γίνεται δηλώνοντας τον κατάλληλο
  χειριστή:

   ```javascript
   <Button color="link">
     <FontAwesomeIcon
       icon="eye"
       onClick={() => this.props.onPreview(item.id)}
     />
   </Button>
   ```

* Τον οποίο χειριστή θέτει το εξάρτημα `Home` όταν χρησιμοποιεί το
  `ItemList`:
  
   ```javascript
 	<ItemList
	  list={this.state.list}
	  searchTerm={this.state.searchTerm}
	  onDismiss={this.onDismiss}
      onPreview={this.onPreview}
	/>
    ```

## Χρήση Εικονιδίων FontAwesome

* Για να χρησιμοποιήσουμε εικονίδια FontAwesome με το React, θα πρέπει
  πρώτα να εγκαταστήσουμε τις κατάλληλες βιβλιοθήκες:
  
   ```bash
   npm i @fortawesome/fontawesome-svg-core \
   npm i @fortawesome/free-solid-svg-icons \
   npm i @fortawesome/react-fontawesome
   ```

* Στη συνέχεια πρέπει να εισάγουμε τις βιβλιοθήκες και να προσθέσουμε
  το εικονίδιο που θέλουμε στη βιβλιοθήκη των εικονιδίων:
  
   ```javascript
   import { library } from '@fortawesome/fontawesome-svg-core';
   
   import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
   import { faEye } from '@fortawesome/free-solid-svg-icons';

   library.add(faEye);
   ```

## Ο Χειριστής `onPreview`

* Ο χειριστής `onPreview`:
  
  1. διαβάζει το βιβλίο από τον εξυπηρετητή
  
  2. το αποθηκεύει στην κατάστασή του
  
  3.  ενεργοποιεί το modal παράθυρο διαλόγου καλώντας τη μέθοδο
  `togglePreview()`.
  
   ```javascript
   onPreview(id) {
     axios.get(`/api/books/${id}`)
       .then(response => {
         this.setState({bookToPreview: response.data});
         this.togglePreview();
       })
       .catch(error => error);
   }
   ```


## Παρένθεση: axios (1)

* Μέχρι τώρα χρησιμοποιούσαμε τη μέθοδο `fetch()` για να επικοινωνούμε
  με τον εξυπηρετητή.

* Αυτή η μέθοδος, παρότι δουλεύει, έχει κάποια προβλήματα:

  * Χρειάζονται δύο βήματα προκειμένου να πάρουμε τα δεδομένα:
  
     ```javascript
     fetch('/api/books')
       .then(response => response.json())
       .then(result =>  this.setState({list: result}))
       .catch(error => error);
     ```
     
   * Δεν θεωρεί λάθος απαντήσεις του εξυπηρετητή με κωδικό κατάστασης
     διαφορετικό του `2xx`.


## Παρένθεση: axios (2)

* Για το λόγο αυτό, από εδώ και πέρα θα χρησιμοποιούμε το
  [axios](βhttps://github.com/axios/axios) για την επικοινωνία με τον
  εξυπηρετητή.
  
* Το εγκαθιστούμε δίνοντας:

   ```bash
   npm install axios
   ```

## Λάθη από το Django Rest Framework

* Το Django Rest Framework χειρίζεται τις παρακάτω εξαιρέσεις:

  * `APIException`
  
  * `Http404`
  
  * `PermissionDenied`
  
* Πλην όμως, *δεν* χειρίζεται άλλες εξαιρέσεις, όπως για παράδειγμα
  αυτές που πετάγονται από τη βάση δεδομένων.
  
* Αυτές οι εξαιρέσεις δυστυχώς προωθούνται ως HTML στον πελάτη, και
  όχι ως JSON.
  

## Προσαρμογή Χειρισμού Λαθών 

* Για να χειριστούμε όλα τα λάθη στο Django Rest Framework, και αυτά
  που προέρχονται από τη βάση δεδομένων, πρέπει να γράψουμε έναν δικό
  μας χειριστή εξαιρέσεων.
  
* Στο αρχείο `views.py` προσθέτουμε την παρακάτω συνάρτηση:

   ```python
   def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    
    # Now add the HTTP status code to the response.
    if response is not None:
        # Make sure the message gets in the "data" property
        # and the status in the "status" property.
        response = Response(data=str(response.data),
                            status=response.status_code)
    else:
        # Create a new Response from scratch.
        response = Response(data=str(exc), status=status.HTTP_400_BAD_REQUEST)
        
    return response
    ```

## Προσαρμογή `settings.py`

* Θα πρέπει τώρα να ενημερώσουμε το Django για τη χρήση του δικού μας
  χειριστή λαθών.
  
* Αυτό γίνεται στο αρχείο `settings.py`:

   ```python
   REST_FRAMEWORK = {
       'DEFAULT_RENDERER_CLASSES': (
           'rest_framework.renderers.JSONRenderer',
           'rest_framework.renderers.BrowsableAPIRenderer',
       ),
       'EXCEPTION_HANDLER': 'djbr.views.custom_exception_handler',
   }
   ```




## Λειτουργία Modal

* Ένα παράθυρο διαλόγου modal είναι ένα εξάρτημα.

* Για να λειτουργήσει, θα πρέπει να έχουμε τα εξής:

  * Μία λογική (boolean) μεταβλητή στην κατάστασή *του εξαρτήματος που
    το περιέχει* που να δείχνει αν είναι ανοιχτό.
    
  * Μία μέθοδο *στο εξάρτημα που το περιέχει* μέσω της οποία να μπορούμε
    να αλλάζουμε αυτήν τη μεταβλητή κατάστασης.

## Προσαρμογή `Home` για το `BookPreview`

* Αφού το εξάρτημα `Home` περιέχει το `BookPreview`, βάζουμε τη
  σχετική μεταβλητή στην κατάστασή.
  
* Επίσης, προσθέτουμε στην κατάστασή του και το ίδιο το βιβλίο το
  οποίο θα προεπισκοπίσουμε (και το είδαμε στο `onBookPreview()`):

   ```javascript
   this.state = {
     /* ... */
     togglePreviewModal: false,
     bookToPreview: null,
   };
   ```

* Έτσι, γράφουμε τη μέθοδο που θα αλλάζει την κατάσταση του modal:

   ```javascript
   togglePreview() {
     this.setState({
       togglePreviewModal: !this.state.togglePreviewModal
     });
   }
   ```

## Χρήση `BookPreview`

* Το εξάρτημα `Home` χρησιμοποιεί το εξάρτημα `BookPreview` παιρνόντας
  ως ιδιότητες:
  
    1. το βιβλίο που θα προεπισκοπίσει

    2. τη μεταβλητή που δείχνει αν θα πρέπει να εμφανιστεί ή όχι
    
    3. τη μέθοδο που θα καλεί για να αλλάζει την κατάσταση της
       μεταβλητής αυτής.
       
    ```javascript
    <BookPreview
      book={bookToPreview}
      modal={this.state.togglePreviewModal}
      toggle={this.togglePreview}/>
    ```
    
* Παρατηρούμε ότι και πάλι δεδομένα και πληροφορίες κατάστασης
  μεταφέρονται από πάνω προς τα κάτω στην ιεραρχία.

## Το Εξάρτημα `BookPreview`

* Το εξάρτημα `BookPreview` εμφανίζει την προεπισκόπιση και επιπλέον
  δηλώνει σε κατάλληλες ιδιότητες τη μεταβλητή που δείχνει αν είναι
  ανοιχτό και τη μέθοδο με την οποία αλλάζει η μεταβλητή:
  
   ```javascript
   class BookPreview extends Component {

     render() {

       if (!this.props.book) { return null; }

       return (
         <div>
           <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
             <ModalHeader
               toggle={this.props.toggle}>
               Book Preview
             </ModalHeader>
             <ModalBody>
               <h5>Title</h5>
                 <a href={this.props.book.url}>
                   {this.props.book.title}</a>
               <h5>Year</h5>{this.props.book.pub_year}
             </ModalBody>
             <ModalFooter>
               <Button color="primary" onClick={this.props.toggle}>OK</Button>{' '}
             </ModalFooter>
           </Modal>
         </div>
       );
     }
   }
   ```

## Χειρισμός Βιβλίου

* Για τον χειρισμό ενός συγκεκριμένου βιβλίου, θα χρειαστούμε να
  γράψουμε κώδικα για την εισαγωγή του ή για την αλλαγή του.
  
* Είναι καλό να βάλουμε τον κώδικα αυτόν ξεχωριστά από το αρχείο
  `src/App.js`.
  
* Θα δημιουργήσουμε λοιπόν και θα εργαστούμε με το αρχείο
  `src/BookDetails.js`
  
  
## Εμφάνιση Βιβλίου 

* Για να εμφανίσουμε ένα βιβλίο όταν τοποθετηθεί το εξάρτημα στη θέση
  του, θα χρησιμοποιήσουμε τη μέθοδο `componentDidMount()`:
  
   ```javascript
   componentDidMount() {
     if (!this.props.match.params.id) {
       this.setState({book: {...emptyBook}});
     } else {
       axios.get('/api/' + this.props.match.url)
         .then(response => this.setState({book: {...response.data}}))
         .catch(error => this.handleError(error));
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

## Χειρισμός Λαθών

* Ένας από τους λόγους που χρησιμοποιούμε το axios είναι για τον
  καλύτερο χειρισμό λαθών.
  
* Στο `componentDidMount()`, αν εμφανιστεί λάθος, καλούμε μια μέθοδο
  `handleError()`.


## Μέθοδος `handleError()`

* Στη μέθοδο `handleError()`:

  * αποθηκεύουμε το μήνυμα λάθους στην κατάσταση του εξαρτήματος (θα δούμε
  μετά τι θα το κάνουμε) 
  
  * ενημερώνουμε την κατάσταση ότι δεν θέλουμε να επιστρέψουμε
  πίσω στο εξάρτημα που μας κάλεσε (επίσης θα το δούμε μετά αυτό).
  
   ```javascript
   handleError(error) {
     if (error.response) {
       // The request was made and the server responded with a status code
       // that falls out of the range of 2xx
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
       this.setState({toMain: false, message: error.response.data});
     } else if (error.request) {
       // The request was made but no response was received
       // `error.request` is an instance of XMLHttpRequest
       console.log(error.request);
       this.setState({toMain: false, message: 'No response'});
     } else {
       // Something happened in setting up the request that
       // triggered an Error
       console.log('Error', error.message);
       this.setState({toMain: false, message: error.message});
     }
   }
   ```
   
## Εμφάνιση Λαθών

* Για να εμφανίζουμε τα λάθη στον χρήστη, χρησιμοποιούμε ένα εξάρτημα
  `Alert`, στο οποίο απλώς δίνουμε το μήνυμα που έχουμε αποθηκεύσει
  στην κατάσταση του `BookDetails`:
  
   ```javascript
    {this.state.message && 
     <Alert
       className="message"
       color="danger">
       Error<span> </span>
       {this.state.message}
     </Alert>
    }
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
   arr2.push(4); // arr2 is now [1, 2, 3, 4]
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


## Φόρμα Βιβλίου

* Η ίδια η εμφάνιση του βιβλίου είναι δουλειά της `render()`, όπως
  πάντα.
  
* Η `render()` του `BookDetails` θα είναι:

   ```javascript
   render() {
     if (this.state.toMain) {
       const message = this.state.message;
       return <Redirect
                to={{
                  pathname: "/",
                  state: { message }
                }}
         />;
     }

     const book = this.state.book;

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
               type="url"
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
           <Button color="primary">Submit</Button>{' '}
           <Link to='/'>
             <Button color="secondary">Back</Button>{' '}
           </Link>
         </Form>
         {this.state.message && 
          <Alert
            className="message"
            color="danger">
            Error<span> </span>
            {this.state.message}
          </Alert>
         }
       </div>
     );
   }
   ```

## Λειτουργία της Φόρμας

* Όταν ο χρήστης αλλάζει τις τιμές στα πεδία εισόδου, καλείται η
  μέθοδος `handleInputChange()`.
  
* Όταν ο χρήστης υποβάλει τη φόρμα, καλείτα η μέθοδος
  `handleSubmit()`.
  
* Εάν ο χρήστης έχει υποβάλει τη φόρμα με επιτυχία, τότε θα έχουμε
  θέσει την ιδιότητα `this.state.toMain` σε `true`, ώστε ο χρήστης θα
  επιστρέφει στην κεντρική σελίδα, περνώντας σε αυτήν ό,τι μήνυμα
  θέλουμε να εμφανιστεί.


## Χειρισμός Αλλαγών στη Φόρμα

* Αρμόδιος για τον χειρισμό των αλλαγών στη φόρμα είναι ο χειριστής
  `handleInputChange()`:
  
   ```javascript
   handleInputChange(event) {
     const target = event.target;
     const name = target.name;
     const value = target.value;
     const newBook = {...this.state.book};

     newBook[name] = value;
     this.setState({book: newBook});
   }
   ```

## Υπολογιζόμενα Ονόματα Ιδιοτήτων

* Η `handleInputChange()` χρησιμοποιεί το συντακτικό για
  [υπολογιζόμενα ονόματα ιδιοτήτων (computer property
  names)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)
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
     const id = this.state.book.id || '';
     const book = this.state.book;
     const method = this.state.book.id ? "PUT" : "POST";
     axios(`/api/books/${id}`, {
       method: method,
       data: JSON.stringify(book),
       headers:{
         'Content-Type': 'application/json'
       }
     })
       .then(response => {
         let message = '';
         if (method === "POST") {
           message = 'book inserted';
         } else {
           message = 'book updated';
         }
         this.setState({toMain: true, message });
       })
       .catch(error => this.handleError(error));
     event.preventDefault();
   }
   ```

## Περιεχόμενο του `Home`

* Το περιεχόμενο του εξαρτήματος `Home` αποδίδεται από την αντίστοιχη
  μέθοδο `render()`:
  
   ```javascript
   render() {

     if (!this.state.list) { return null; }

     const referrerState = this.props.location.state;
     let message = '';
     if (referrerState) {
       message = referrerState.message;
       referrerState.message = '';
     }
     const bookToPreview = this.state.bookToPreview;

     return(
       <div>
         <BookPreview
           book={bookToPreview}
           modal={this.state.togglePreviewModal}
           toggle={this.togglePreview}/>
         <Search
           value={this.searchTerm}
           onSearchChange={this.onSearchChange}
         /> 
         <ItemList
           list={this.state.list}
           searchTerm={this.state.searchTerm}
           onDismiss={this.onDismiss}
           onPreview={this.onPreview}
         />
         <div>
           <Link to='/books/'>
             <Button color="primary">New</Button>
           </Link>
         </div>
         { message &&
           <Message
             color="success"
             message={message}
           />
         }
       </div>
     );
   }
   ```

## Η `render()` στο `Home`

* Αν δεν υπάρχει λίστα βιβλίων για να δείξει, η `render()` δεν κάνει
  τίποτε.
  
* Εξάγει το μήνυμα που τυχόν της έχει περάσει η φόρμα εισαγωγής
  βιβλίων.
  
* Εμφανίζει τα παρακάτω εξαρτήματα:

  * `BookPreview`
  
  * `Search`
  
  * `ItemList`
  
* Επίσης εμφανίζει ένα κουμπί για την εισαγωγή βιβλίου και το μήνυμα
  που της έχει περάσει η φόρμα εισαγωγής βιβλίων, αν υπάρχει.


## Εξάρτημα `Message`

* Για την εμφάνιση των μηνυμάτων, χρησιμοποιούμε ένα μικρό εξάρτημα
  `Message`:
  
   ```javascript
   class Message extends React.Component {
     constructor(props) {
       super(props);

       this.state = {
         visible: true
       };

       this.onDismiss = this.onDismiss.bind(this);
     }

     onDismiss() {
       this.setState({ visible: false });
     }

     render() {
       return (
         <Alert
           className="message"
           color={this.props.color}
           isOpen={this.state.visible}
           toggle={this.onDismiss}>
           {this.props.message}
         </Alert>
       );
     }
   }
   ```
