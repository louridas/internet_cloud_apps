% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# node.js express

## Γενικά

* Η βασική βιβλιοθήκη με την οποία κατασκευάζουμε διαδικτυακές
  εφαρμογές με το node.js είναι το [Express](http://expressjs.com/).

* Το Express μας προσφέρει έτοιμες διάφορες δυνατότητες που
  διευκολύνουν την υλοποίηση.

* Επίσης, αποτελεί μια πλατφόρμα πάνω στην οποία μπορούν να
  υλοποιηθούν άλλες βιβλιοθήκες που προσδίδουν επιπλέον δυνατότητες
  (όπως έλεγχος πρόσβασης).

## Δημιουργία εφαρμογής

* Ξεκινάμε εγκαθιστώντας τον express generator:
    ```bash
    npm install express-generator -g
    ```

* Στη συνέχεια δημιουργούμε τον σκελετό της εφαρμογής με:
    ```bash
    express bangular_node
    ```
* Μετακινούμαστε στον κατάλογο `bangular_node` που δημιουργήθηκε, και
  εγκαθιστούμε όλα τα απαραίτητα πακέτα:
    ```bash
    npm install
    ```

## Δομή εφαρμογής

```
bangular_node
bangular_node/package.json
bangular_node/app.js
bangular_node/public
bangular_node/public/javascripts
bangular_node/public/images
bangular_node/public/stylesheets
bangular_node/public/stylesheets/style.css
bangular_node/routes
bangular_node/routes/index.js
bangular_node/routes/users.js
bangular_node/views
bangular_node/views/index.jade
bangular_node/views/layout.jade
bangular_node/views/error.jade
bangular_node/bin
bangular_node/bin/www
```

## Αυτόματη επανεκκίνηση σε αλλαγές

* Κατά την ανάπτυξη της εφαρμογής, είναι πρακτικό να φορτώνεται
  αυτόματα κάθε φορά που κάνουμε κάποιες αλλαγές στον κώδικά της
  (automatic reload)

* Αυτό μπορούμε να το κάνουμε με το πακέτο [nodemon](https://nodemon.io/).

* Δίνουμε:
    ```bash
    npm install --save-dev nodemon
    ```
    
* Προσθέτουμε στο `package.json` τα παρακάτω, στην ιδιότητα `scripts`:
    ```javascript
    "start-watch": "nodemon ./bin/www"
    ```

## Προσθήκη router

* Στο αρχείο `app.js` προσθέτουμε κάπου στην αρχή:
    ```javascript
    var router = require('./routes/router');
    ```

* Και στη συνέχεια, προσθέτουμε μετά από τη γραμμή:
    ```javascript
    var app = express();
    ```
    τη γραμμή:
    ```javascript
    app.use('/api', router);
    ```

## `routes/router.js`

```javascript
const express = require('express');
const router = express.Router();

const books = [
  { id: 11, title: 'Infinite Jest', pub_year: 1996},
  { id: 12, title: 'Oblivion', pub_year: 2004 },
  { id: 13, title: 'Ulysses', pub_year: 1922 },
  { id: 14, title: 'The Crying of Lot 49', pub_year: 1966 },
  { id: 15, title: 'City on Fire', pub_year: 2015 },
  { id: 16, title: 'The Narrow Road to the Deep North', pub_year: 2013 },
  { id: 17, title: 'The Dispossessed', pub_year: 1974 },
  { id: 18, title: 'The Left Hand of Darkness', pub_year: 1969 },
  { id: 19, title: 'A Death in the Family: My Struggle Book 1',
    pub_year: 2013 },
  { id: 20, title: 'A Man in Love: My Struggle Book 2', pub_year: 2013 }
];

router.route('/books')
  .get(function(req, res) {
    res.json(books);
  });

module.exports = router;
```

## Εκκίνηση της εφαρμογής

* Για να ξεκινήσουμε την εφαρμογή δίνουμε:
    ```bash
    DEBUG=bangular_node:* npm start
    ```

* Για να ξεκινήσουμε την εφαρμογή μας με αυτόματη επαναφόρτωση
  δίνουμε:
    ```bash
    DEBUG=bangular_node:* npm run start-watch
    ```
    
* Η εφαρμογή μας ξεκινάει στη θύρα 3000 (δηλαδή,
  [http://localhost:3000](http://localhost:3000)).

## Έλεγχος της εφαρμογής

* Εγκαθιστούμε στον Chrome το [Postman](https://www.getpostman.com/).

* Δίνουμε ένα GET request:
  [http://localhost:3000/api/books](http://localhost:3000/api/books).

* Θα πρέπει να δούμε τα βιβλία μας στην οθόνη του Postman. Αυτό
  σημαίνει ότι η συγκεκριμένη κλήση του API δουλεύει σωστά.

## Αποθήκευση δεδομένων

* Για την αποθήκευση των δεδομένων μας μπορούμε να χρησιμοποιήσουμε
  ό,τι θέλουμε.

* Παρ' όλα αυτά, το node.js συνεργάζεται πολύ καλά με τη
  [MongoDB](https://www.mongodb.com/), η οποία αποτελεί συνήθως την
  πρώτη επιλογή στις σχετικές εφαρμογές.

## Εγκατάσταση σε Ubuntu (1)

* Για να εγκαταστήσουμε τη MongoDB σε Ubuntu, ακολουθούμε τις
  [online οδηγίες](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

* Ξεκινάμε εισάγοντας το δημόσιου κλειδί του πακέτου:
    ```bash
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    ```

## Εγκατάσταση σε Ubuntu (2)

* Προσαρμόζουμε τα apt sources ως εξής:
    ```bash
    echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    ```

* Ενημερώνουμε τη βάση των πακέτων:
    ```bash
    sudo apt-get update
    ```

* Εγκαθιστούμε τα πακέτα της MongoDB:
    ```bash
    sudo apt-get install -y mongodb-org
    ```

* Εκκίνηση της βάσης:
    ```bash
    sudo service mongod start
    ```
    Αν όλα έχουν γίνει σωστά, μπορούμε να επιβεβαιώσουμε ότι η Mongo
    τρέχει βλέποντας τις εγγραφές στο αρχείο
    `/var/log/mongodb/mongod.log`. Συγκεκριμένα, θα πρέπει να υπάρχει
    μια γραμμή η οποία θα γράφει:
    ```
    /var/log/mongodb/mongod.log
    ```

## Έλεγχος πρόσβασης

* Στο αρχείο `/etc/mongod.conf` γράφουμε:
    ```
    security:
      authorization: enabled
    ```

## Χειρισμός της βάσης

* Για να ξεκινήσουμε τη βάση, δίνουμε:
    ```bash
    service mongod start
    ```

* Για να σταματήσουμε τη βάση, δίνουμε:
    ```bash
    service mongod stop
    ```
* Για να ξαναξεκινήσουμε τη βάση, δίνουμε:
    ```bash
    service mongod start
    ```

## Δημιουργία διαχειριστή

* Συνδεόμαστε με το κέλυφος της Mongo δίνοντας:
    ```bash
    mongo
    ```

* Δημιουργούμε έναν διαχειριστή ως εξής:
    ```javascript
    use admin

    db.createUser(
      {
        user: "admin",
        pwd: "12345",
        roles: [
          { role: "userAdminAnyDatabase", db: "admin" }
         ]
      }
    )
    ```

## Δημιουργία χρήστη βάσης εφαρμογής

```javascript
use bangular


db.createUser(
  {
    user: "bangular",
    pwd: "12345",
    roles: [
      { role: "readWrite", db: "bangular" }
    ]
  }
)
```

## Είσοδος στη βάση

* Τώρα για να μπούμε στη βάση θα πρέπει να δώσουμε όνομα χρήστη και
  κωδικό:
    ```bash
    mongo bangular -u bangular -p
    ```

* Στην προτροπή που θα εμφανιστεί, δίνουμε τον κωδικό του χρήστη που
  δημιουργήσαμε.


## Εισαγωγή βιβλίου

* Για να εισάγουμε ένα βιβλίο, δίνουμε:

    ```javascript
    db.books.insert({ title: "Infinite Jest", pub_year: 1996 });
    ```
* Οπότε ως απάντηση θα λάβουμε:
    ```
    WriteResult({ "nInserted" : 1 })
    ```

## Εισαγωγή βιβλίων

```javascript
db.books.insert({ title: "Oblivion", pub_year: 2004 });
db.books.insert({ title: "Ulysses", pub_year: 1922 });
db.books.insert({ title: "The Crying of Lot 49", pub_year: 1966 });
db.books.insert({ title: "City on Fire", pub_year: 2015 });
db.books.insert({ title: "The Narrow Road to the Deep North", pub_year: 2013 });
db.books.insert({ title: "The Dispossessed", pub_year: 1974 });
db.books.insert({ title: "The Left Hand of Darkness", pub_year: 1969 });
db.books.insert({ title: "A Death in the Family: My Struggle Book 1", pub_year: 2013 });
db.books.insert({ title: "A Man in Love: My Struggle Book 2", pub_year: 2013 });
```

## Μαζική εισαγωγή

* Εναλλακτικά, θα μπορούσαμε να χρησιμοποιήσουμε τη μέθοδο
  `insertMany()`:

    ```javascript

    db.books.remove({});

    db.books.insertMany([
      { title: "Oblivion", pub_year: 2004 },
      { title: "Ulysses", pub_year: 1922 },
      { title: "The Crying of Lot 49", pub_year: 1966 },
      { title: "City on Fire", pub_year: 2015 },
      { title: "The Narrow Road to the Deep North", pub_year: 2013 },
      { title: "The Dispossessed", pub_year: 1974 },
      { title: "The Left Hand of Darkness", pub_year: 1969 },
      { title: "A Death in the Family: My Struggle Book 1", pub_year: 2013 },
      { title: "A Man in Love: My Struggle Book 2", pub_year: 2013 }
    ]);
    ```

## Αναζήτηση βιβλίων

* Η αναζήτηση βιβλίων γίνεται μέσω κλήσεων, στις οποίες περνάμε τις
  παραμέτρους της αναζήτησης με μορφή JavaScript.

* Για παράδειγμα, εύρεση βιβλίου που να περιέχει κείμενο στον τίτλο:
    ```javascript
    db.books.find({ title: "Oblivion"})
    ```
* Ή, εύρεση βιβλίου με κριτήριο στο έτος έκδοσης:
    ```javascript
    db.books.find({ pub_year: { $lt: 2005 }})
    ```

## Mongoose

* Για να εγκαταστήσουμε το mongoose δίνουμε:
    ```bash
    npm install --save mongoose
    ```
    
* Στη συνέχεια, για να το χρησιμοποιήσουμε στην εφαρμογή μας, γράφουμε
  στην αρχή του `app.js`:
    ```javascript
    const mongoose = require('mongoose');
    ```
* Και τέλος, πριν το τέλος του αρχείου:
    ```javascript
    mongoose.connect('mongodb://bangular:12345@127.0.0.1/bangular');
    ```

## Μοντέλα αντικειμένων

* Για κάθε αντικείμενο που θα αποθηκεύσουμε στη Mongo θα
  δημιουργήσουμε ένα μοντέλο.

* Για να τα έχουμε όλα μαζεμένα σε ένα σημείο, θα δημιουργήσουμε έναν
  κατάλογο `models`.

## Μοντέλο βιβλίων

* Δημιουργούμε το αρχείο `models/book.js` με περιεχόμενα:
    ```javascript
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    var BookSchema = new Schema({
      title: String,
      pub_year: Number
    }, { toJSON: { virtuals: true } });

    module.exports = mongoose.model('Book', BookSchema);
    ```
* Η παράμετρος `toJson: { virtuals: true }` σημαίνει ότι σε κάθε
    βιβλίο, όταν μετατρέπεται σε JSON, θα προστίθεται ένα πεδίο `id`
    ίδιο με το `_id` της Mongo. 

## Διαδρομή βιβλίων

* Δημιουργούμε το αρχείο `routes/book-routes.js` στο οποίο θα χειριστούμε
  τις διαδρομές που αφορούν τον χειρισμό βιβλίων.

* Για να ενταχθούν οι διαδρομές των βιβλίων στην εφαρμογή μας,
  αλλάζουμε το αρχείο `routes/router.js` ως εξής:
    ```javascript
    const express = require('express');
    const router = express.Router();

    const books_router = require('./books-router');

    router.use(books_router);

    module.exports = router;
    ```

## `routes/books-router.js`

```javascript
const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.route('/books')
  .get(function(req, res) {
    Book.find(function(err, books) {
      if (err) {
        res.send(err);
      }
    res.json(books);
    });
  });

router.route('/books')
  .post(function(req, res) {
    var book = new Book();
    book.title = req.body.title;
    book.pub_year = req.body.pub_year;
    
    book.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  });

module.exports = router;
```

## Εύρεση συγκεκριμένου βιβλίου

* Η εύρεση συγκεκριμένου βιβλίου, με βάση τον κωδικό του, κατά το
  πρότυπο REST θα είναι μέσω αίτησης GET σε URLs της μορφής
  `api/book/:book_id`, όπου το `:book_id` αντιστοιχεί στον κωδικό του
  βιβλίου.

* Αυτό το χειριζόμαστε προσθέτοντας τον αντίστοιχο χειριστή στο
  `books-router.js`.

## `routes/books-router.js`

```javascript
router.get('/books/:book_id')
  .get(function(req, res) {
    Book.findById(req.params.book_id, function(err, book) {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  });
```
## Διαγραφή βιβλίου

* Η διαγραφή συγκεκριμένου βιβλίου, με βάση τον κωδικό του, κατά το
  πρότυπο REST θα είναι μέσω αίτησης DELETE σε URLs της μορφής
  `api/book/:book_id`, όπου το `:book_id` αντιστοιχεί στον κωδικό του
  βιβλίου.

* Αυτό το χειριζόμαστε προσθέτοντας τον αντίστοιχο χειριστή στο
  `books-router.js`.

## `routes/books-router.js`

```javascript
router.route('/books/:book_id').
  delete(function(req, res) {
    Book.remove({
      _id: req.params.book_id
    }, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  });
```

## Αναζήτηση βιβλίου με βάση τίτλο

* Η αναζήτηση βιβλίου με βάση συγκεκριμένο τίτλο θα γίνει, κατά το
  πρότυπο REST, μέσω αίτησης GET της μορφής
  `api/book?title=:book_title` όπου ο τίτλος αντιστοιχεί στον όρο
  αναζήτησης του τίτλου.

* Αυτό το χειριζόμαστε αλλάζοντας κατάλληλα τον χειριστή της αίτησης
  GET `/books`.

## `routes/books-router.js`

```javascript
router.route('/books')
  .get(function(req, res) {
    if (req.query.title) {
      Book.find({
        title: new RegExp(req.query.title)
      }, function(err, books) {
        if (err) {
          res.send(err);
        }
        res.json(books);
      });
    } else {
      Book.find(function(err, books) {
        if (err) {
          res.send(err);
        }
        res.json(books);
      });
    }
  });
```

## Προσαρμογή Angular front-end (1)

* Για να χρησιμοποιήσουμε την εφαρμογή μας από το Angular front-end
  δεν χρειάζεται σχεδόν καμμία αλλαγή.

* Αν χρησιμοποιούμε proxy, απλώς πρέπει να αλλάξουμε την πόρτα στην
  οποία θα προωθεί τις αιτήσεις (στο αρχείο `proxy.conf.json`):
    ```javascript
    "target": "http://localhost:3000"
    ```

## Προσαρμογή Angular front-end (2)

* Δεδομένου ότι τα `id` των βιβλίων είναι αριθμοί στο δεκαεξαδικό,
  πρέπει στο `book-details.component.ts` να αλλάξουμε τη γραμμή:
    ```javascript
    let id = +params['id'];
    ```
  σε:
    ```javascript
    let id = params['id'];
    ```
* Επίσης, μάλλον είναι καλό να μην τα εμφανίζουμε πλέον στον χρήστη,
  αφού δεν έχουν κάποια άμεση σημασία (και είναι μακρινάρια).
