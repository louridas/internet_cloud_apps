% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Node.js Express

## Γενικά

* Η βασική βιβλιοθήκη με την οποία κατασκευάζουμε διαδικτυακές
  εφαρμογές με το Node είναι το [Express](http://expressjs.com/).

* Το Express μας προσφέρει έτοιμες διάφορες δυνατότητες που
  διευκολύνουν την υλοποίηση.

* Επίσης, αποτελεί μια πλατφόρμα πάνω στην οποία μπορούν να
  υλοποιηθούν άλλες βιβλιοθήκες που προσδίδουν επιπλέον δυνατότητες
  (όπως έλεγχος πρόσβασης).


## Δημιουργία Νέας Εφαρμογής

* Αν θέλουμε να ξεκινήσουμε μια νέα εφαρμογή με το Express από το
  μηδέν, δίνουμε:
  
   ```bash
   mkdir myapp
   cd myapp
   ```
  
* Στη συνέχεια αρχικοποιούμε την εφαρμογή δίνοντας:

   ```bash
   npm init
   ```
  Αυτή τη στιγμή μπορούμε απλώς να δεχτούμε τις προτεινόμενες τιμές
  των παραμέτρων που μας εμφανίζονται.
  
* Κατόπιν πρέπει να εγκαταστήσουμε το Express στον κατάλογο `myapp`
  και να το προσθέσουμε στις εξαρτήσεις της εφαρμογής:
  
   ```bash
   npm install express --save
   ```


## Hello World

* Το διάσημο Hello, World σε Express μπορούμε να το υλοποιήσουμε
  φτιάχνοντας ένα αρχείο `app.js` με τα εξής περιεχόμενα:
  
   ```javascript
   const express = require('express');
   const app = express();

   app.get('/', (req, res) => res.send('Hello World!'));

   app.listen(3000, () => console.log('Example app listening on port 3000!'));
   ```
  
* Για να τρέξουμε τον εξυπηρετητή που υλοποιεί το πρόγραμμα αυτό
  δίνουμε:
  
   ```bash
   node app.js
   ```

# Δρομολόγηση

## Βασικές Αρχές

* Η δρομολόγηση στο Express λειτουργεί με βάση ορισμούς διαδρομών.

* Οι ορισμοί αυτοί έχουν τη μορφή:

   ```javascript
   app.METHOD(PATH, HANDLER)
   ```
  
<div class="notes">

* `app` είναι ένα αντικείμενο τύπου `express`

* `METHOD` είναι μια μέθοδος του πρωτοκόλλου HTTP, γραμμένο σε πεζά
  γράμματα. 
  
* `PATH` είναι το μονοπάτι στο URL.

* `HANDLER` είναι η συνάρτηση που θα εκτελεστεί όταν ενεργοποιηθεί η
  διαδρομή.
  

</div>


## Παραδείγματα Διαδρομών (1)

* Εμφάνιση `Hello, World!` στην κεντρική σελίδα:

   ```javascript
   app.get('/', function (req, res) {
     res.send('Hello World!')
   })
   ```
  
* Απόκριση σε POST στην κεντρική σελίδα:

   ```javascript
   app.post('/', function (req, res) {
     res.send('Got a POST request')
   })
   ```
  
## Παραδείγματα Διαδρομών (2)

* Απόκριση σε POST στη διαδρομή `/user`:

   ```javascript
   app.put('/user', function (req, res) {
     res.send('Got a PUT request at /user')
   })
   ```
  
* Απόκριση σε DELETE στη διαδρομή `/user`:

   ```javascript
   app.delete('/user', function (req, res) {
     res.send('Got a DELETE request at /user')
   })
   ```

## Σύνταξη Διαδρομών

* Οι διαδρομές μπορεί να είναι συμβολοσειρές, ή μοτίβα, ή κανονικές
  εκφράσεις.
  
* Το Express χρησιμοποιεί τη βιβλιοθήκη
  [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) για
  την ερμηνεία των διαδρομών.


## Παραδείγματα Μοτίβων (1)

* Περιγράφει τη διαδρομή `/random.txt`:

   ```javascript
   app.get('/random.text', function (req, res) {
     res.send('random.text')
   })
   ```

* Περιγράφει τις διαδρομές `acd` και `abcd`:

   ```javascript
   app.get('/ab?cd', function (req, res) {
     res.send('ab?cd')
   })
   ```

* Περιγράφει τις διαδρομές `abcd`, `abbcd`, `abbbcd`, κ.λπ.:

   ```javascript
   app.get('/ab+cd', function (req, res) {
     res.send('ab+cd')
   })
   ```

## Παραδείγματα Μοτίβων (2)


* Περιγράφει τις διαδρομές `abcd`, `abxcd`, `abRANDOMcd`, κ.λπ.:

   ```javascript
   app.get('/ab*cd', function (req, res) {
     res.send('ab*cd')
   })
   ```

* Περιγράφει τις διαδρομές `abe` και `abcde`:

   ```javascript
   app.get('/ab(cd)?e', function (req, res) {
     res.send('ab(cd)?e')
   })
   ```

## Παραδείγματα Κανονικών Εκφράσεων


* Περιγράφει τις διαδρομές που περιέχουν `a`:

   ```javascript
   app.get('/a/, function (req, res) {
     res.send('/a/')
   })
   ```

* Περιγράφει τις διαδρομές `butterfly` και `dragonfly`, αλλά όχι
  `butterflyman`,  `dragonflyman`, κ.λπ.:
  
   ```javascript
   app.get(/.*fly$/, function (req, res) {
     res.send('/.*fly$/')
   })
   ```
  
## Παράμετροι Διαδρομών

* Οι διαδρομές που ορίζουμε μπορεί να είναι παραμετροποιημένες:

   ```javascript
   app.get('/users/:userId/books/:bookId', function (req, res) {
     res.send(req.params)
   })
   ```

* Στο παράδειγμα αυτό, το αντικείμενο `req.params` περιέχει τις τιμές
  των παραμέτρων. Π.χ. αν το URL είναι:
  
   ```
   http://localhost:3000/users/34/books/8989
   ```
  το `req.params` θα είναι:
  
   ```
   { "userId": "34", "bookId": "8989" }
   ```

## Χειρισμός Σώματος Αίτησης

* Το σώμα της αίτησης βρίσκεται στο αντικείμενο `req.body`.

* Όταν έρχεται μια αίτηση, το Express θα πρέπει να την ερμηνεύσει πριν
  την περάσει στον χειριστή της διαδρομής μας.
  
* Ο χειρισμός μιας αίτησης γίνεται μέσω βιβλιοθηκών.

* Για να χειριστούμε αιτήσεις JSON γράφουμε στην εφαρμογή μας:

   ```javascript
   app.use(express.json());
   ```

## express.Router

* Μπορούμε να χρησιμοποιήσουμε το `express.Router` για να φτιάξουμε
  ξεχωριστούς χειριστές διαδρομών που στη συνέχεια τους συνδέσουμε
  στην εφαρμογή μας.
  
* Η ιδέα είναι ότι έχουμε διαφορετικά αρχεία στα οποία χειριζόμαστε
  διαφορετικά υποσύνολα των διαδρομών.
  
* Επειδή ο χειρισμός των διαδρομών είναι στην ουσία η λογική της
  εφαρμογής, αυτό σημαίνει ότι φτιάχνουμε διαφορετικούς routers, με
  την ίδια λογική που στο Django φτιάχνουμε διαφορετικά models και
  views.
  

## Παράδειγμα express.Router (1)

* Έστω ότι φτιάχνουμε ένα αρχείο `birds.js` στον κατάλογο της
  εφαρμογής μας:
  
   ```javascript
   var express = require('express');
   var router = express.Router();

   // middleware that is specific to this router
   router.use(function timeLog (req, res, next) {
     console.log('Time: ', Date.now());
     next();
   });

   // define the home page route
   router.get('/', function (req, res) {
     res.send('Birds home page');
   });

   // define the about route
   router.get('/about', function (req, res) {
     res.send('About birds');
   });

   module.exports = router
   ```

## Παράδειγμα express.Router (2)

* Τότε, για να το χρησιμοποιήσουμε, αρκεί να συμπεριλάβουμε τα
  παρακάτω στο `app.js`:
  
   ```javascript
   var birds = require('./birds')

   // ...

   app.use('/birds', birds)
   ```
  
* Με αυτό, η εφαρμογή θα μπορεί να χειριστεί αιτήσεις στο `/birds` και
  στο `/birds/about`, ενώ σε κάθε μία τέτοια αίτηση θα καλείται και η
  συνάρτηση `timeLog()`.


## Έννοια Middleware

* Το middleware είναι μια βασική αρχιτεκτονική επιλογή του Express.

* Middleware ονομάζεται μια συνάρτηση η οποία έχει πρόσβαση στο
  αντικείμενο της αίτησης (`req`), στο αντικείμενο της απάντησης
  (`res`), και στο επόμενο middleware στη σειρά.
  
* Έτσι λοιπόν, μπορεί στο χειρισμό μιας αίτησης ή μιας απάντησης να
  έχουμε μια αλυσίδα middleware.

* Αν το middleware δεν είναι το τελευταίο στην αλυσίδα, θα πρέπει να
  καλεί την επόμενη συνάρτηση μέσω κλήσης `next()`.
 
* Οι χειριστές διαδρομών που έχουμε δει δεν είναι παρά middleware·
  δεν έχουμε δει κλήση `next()` γιατί ο χειρισμός της αίτησης
  τερμάτιζε εκεί.


## Παράδειγμα Middleware (1)

* Η παρακάτω συνάρτηση εκτελείται κάθε φορά που λαμβάνεται μια αίτηση:

   ```javascript
   var app = express()

   app.use(function (req, res, next) {
     console.log('Time:', Date.now());
     next();
   })
   ```

## Παράδειγμα Middleware (2)

* Η παρακάτω συνάρτηση αναρτάται στη διαδρομή `/user/:id`. Θα
  εκτελεστεί για κάθε αίτηση σε αυτή τη διαδρομή:
  
   ```javascript
   app.use('/user/:id', function (req, res, next) {
     console.log('Request Type:', req.method);
     next();
   })
   ```
  
## Middleware και Χειρισμός Λαθών

* Αν η συνάρτησή μας παίρνει τέσσερες παραμέτρους, η πρώτη αντιστοιχεί
  σε κάποιο λάθος που έχει εμφανιστεί:
  
   ```javascript
   app.use(function (err, req, res, next) {
     console.error(err.stack)
     res.status(500).send('Something broke!')
   })
   ```
  
# Γεννήτρια Εφαρμογών
  
## Express Generator

* Συνήθως δεν ξεκινάμε τη δημιουργία μιας νέας εφαρμογής από το μηδέν,
  όπως κάναμε παραπάνω.
  
* Αντί γι' αυτό, χρησιμοποιούμε τον Express generator.

  
## Δημιουργία Εφαρμογής

* Ξεκινάμε εγκαθιστώντας τον Express generator:

   ```bash
   npm install express-generator -g
   ```

* Στη συνέχεια δημιουργούμε τον σκελετό της εφαρμογής με:

   ```bash
   express --git --no-view server
   ```

<div class="notes">

* Η παράμετρος `--git` δημιουργεί και ένα αρχείο `.gitignore` στον κατάλογο
  `bangular_node`, ώστε να μην ανέβουν στο αποθετήριο αρχεία που δεν
  χρειάζονται. 

* Η παράμετρος `--no-view` ορίζει ότι δεν θα υλοποιήσουμε views στην
  εφαρμογή, αφού όλη η διεπαφή με τον χρήστη θα γίνεται μέσω
  Angular.

</div>


## Εγκατάσταση και Εκκίνηση 

* Μετακινούμαστε στον κατάλογο `bangular_node` που δημιουργήθηκε, και
  εγκαθιστούμε όλα τα απαραίτητα πακέτα:
  
   ```bash
   cd server
   npm install
   ```

* Για να τρέξουμε την εφαρμογή σε MacOS ή Linux, δίνουμε:

   ```bash
   DEBUG=server:* npm start
   ```
  
* Για να τρέξουμε την εφαρμογή σε MS-Windows, δίνουμε:

   ```bash
   set DEBUG=server:* & npm start
   ```
  
* Η εφαρμογή μας θα τρέχει στη διεύθυνση `http://localhost:3000`.


## Δομή Εφαρμογής

```
bangular_node
├── client/
└── server/
    ├── .gitignore
    ├── app.js
    ├── bin/
    │   └── www*
    ├── node_modules/
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   ├── images/
    │   ├── index.html
    │   ├── javascripts/
    │   └── stylesheets/
    │       └── style.css
    └── routes/
        ├── index.js
        └── users.js
```

## Αυτόματη Επανεκκίνηση σε Αλλαγές

* Κατά την ανάπτυξη της εφαρμογής, είναι πρακτικό να φορτώνεται
  αυτόματα κάθε φορά που κάνουμε κάποιες αλλαγές στον κώδικά της
  (automatic reload).

* Αυτό μπορούμε να το κάνουμε με το πακέτο [nodemon](https://nodemon.io/).

* Δίνουμε:

   ```bash
   npm install -g nodemon
   npm install --save-dev nodemon
   ```
    
* Για να λειτουργεί η αυτόματη επαναφόρτωση, θα δίνουμε:

   ```bash
   nodemon ./bin/www
   ```

<div class="notes">

Με το:

```basj
npm install -g nodemon
```

εγκαθιστούμε το `nodemon` βάζοντάς το στο μονοπάτι του συστήματος (ή
στο μονοπάτι που ορίζει το `nvm`).

Με το:

```bash
npm install --save-dev nodemon
```

το εγκαθιστούμε ως εξάρτηση ανάπτυξης (development dependency), οπότε
θα εγκαθίσταται αυτομάτως σε άλλες εγκαταστάσεις ανάπτυξης όταν
δίνουμε `npm install`.

</div>


## Καθάρισμα των Αρχείων

* To αρχείο `routes/users.js` είναι ένα υπόδειγμα, δεν θα μας
  χρειαστεί, οπότε μπορούμε να το σβήσουμε.
  
* Ομοίως σβήνουμε το αρχείο `routes/index.js`.
  
* Αντίστοιχα, στο αρχείο `app.js` σβήνουμε τις δύο γραμμές:

   ```javascript
   var indexRouter = require('./routes/index');
   var usersRouter = require('./routes/users');
   ```
  τις δύο γραμμές:

   ```javascript
   app.use('/', indexRouter);
   app.use('/users', usersRouter);
   ```
  
  και την:
  
   ```javascript
   app.use(express.urlencoded({ extended: false }));
   ```

<div class="notes">

Η γραμμή:

```javascript
app.use(express.urlencoded({ extended: false }));
```

χρειάζεται για το χειρισμό υποβολής δεδομένων με παραδοσιακούς
τρόπους, όχι μέσω JSON όπως τώρα.

</div>

## `app.js`

```javascript
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

module.exports = app;
```

# Αποθήκευση Δεδομένων

## Εγκατάσταση Οδηγού MySQL

* Για την αποθήκευση των δεδομένων μας μπορούμε να χρησιμοποιήσουμε
  ό,τι θέλουμε.

* Εμείς θα χρησιμοποιήσουμε τη βάση MySQL που ήδη έχουμε από την
  εφαρμογή που έχουμε αναπτύξει με το Django. 

* Για να εγκατασταθεί ο οδηγός της MySQL για το Node.js, δίνουμε:
  ```
  npm install mysql
  ```

## Σύνδεση με τη Βάση

* Για να συνδεθούμε με τη βάση φτιάχνουμε το αρχείο `db.js`:

   ```javascript
   const mysql = require('mysql');
   const fs = require('fs');

   const configPath = './config-db.json';
   const dbConfig = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

   const pool  = mysql.createPool({
     connectionLimit : 10,
     host            : dbConfig.host,
     user            : dbConfig.user,
     password        : dbConfig.password,
     database        : dbConfig.database
   });

   module.exports = pool;
   ```
  
## Ευαίσθητα Δεδομένα

* Τα ευαίσθητα δεδομένα της σύνδεσης, τα αποθηκεύουμε σε ένα άλλο
  αρχείο, `config-db.json`, το οποίο *δεν* συμπεριλαμβάνουμε στο
  αποθετήριο:
  
   ```javascript
   {
     "host" : "127.0.0.1",
     "user" : "djbr_user",
     "password" : "g8nzmktk6y",
     "database" : "djbr"
   }
   ```

<div class="notes">

Αναλόγως την έκδοση της MySQL που χρησιμοποιείτε (συγκεκριμένα, αν
είναι από την 8.0 και μετά) και την έκδοση του πακέτου MySQL του
Node.js, μπορεί να πρέπει να εκτελέσετε το παρακάτω στη γραμμή εντολών της 
MySQL:

```sql
ALTER USER 'djbr_user'@'localhost' IDENTIFIED WITH
mysql_native_password BY 'whateverthisis';
```

</div>

# Υλοποίηση Διασυνδεμένης Εφαρμογής

## Διαδρομή Βιβλίων

* Για να ενταχθούν οι διαδρομές των βιβλίων στην εφαρμογή μας,
  δημιουργούμε το αρχείο `routes/router.js` ως εξής:
  
   ```javascript
   const express = require('express');
   const router = express.Router();

   const books_router = require('./books-router');

   router.use('/books', books_router);

   module.exports = router;
   ```

## Αναζήτηση Όλων των Βιβλίων

* Για την αναζήτηση όλων των βιβλίων, θα υλοποιήσουμε ένα χειριστή της
  μεθόδου GET.

* Ο χειριστής απλά θα εκτελεί μια αναζήτηση στη βάση για το σύνολο των
  βιβλίων και στη συνέχεια θα τα επιστρέφει.

* Για να το κάνουμε αυτό, φτιάχνουμε ένα αρχείο
  `routes/books-router.js` όπως ακολούθως.


## `routes/books-router.js` (1)

```javascript
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.send(err);
      return;
    }
    connection.query('SELECT * FROM djbr_book',
      function(err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send(results);
        }
        connection.release();
    });
  });
});

module.exports = router;
```

## Βελτίωση Αναζήτησης Βιβλίων

* Ο παραπάνω κώδικας μπορεί να απλοποιηθεί σημαντικά.

* Μπορούμε να χρησιμοποιήσουμε τη μέθοδο `pool.query()` με την οποία
  η διαχείριση της σύνδεσης αυτοματοποιείται.
  
* Επίσης, θα γράψουμε μια βοηθητική συνάρτηση την οποία θα χρησιμοποιούμε 
  για την αποστολή δεδομένων (γιατί το ίδιο πράγμα θα κάνουμε σε όλες
  τις διαδρομές).


## Βελτιωμένη Αναζήτηση Βιβλίων 

```javascript
function response_handler(err, res, results,  next) {
  if (!err) {
    res.send(results);
  } else {
    next(err);
  } 
}

router.get('/', function(req, res, next) {
  pool.query(
    'SELECT * FROM djbr_book',
    (err, results, fields) => response_handler(err, res, results, next)
  );
});
```

## Αναζήτηση Βιβλίων και μέσω Τίτλου (1)

* Στην εφαρμογή μας κάνουμε αναζητήσεις των βιβλίων και μέσω του τίτλου τους, 
  στο typeahead component που έχουμε δημιουργήσει για την αναζήτηση.
  
* Οι αναζητήσεις γίνονται όταν το Angular στέλνει GET requests του τύπου:

   ```
   http://localhost:4200/api/books/?title=The
   ```

* Προσαρμόζουμε τη συνάρτηση που γράψαμε ώστε να εξυπηρετεί και
  τέτοιες αναζητήσεις.


## Ανάκτηση Βιβλίων και μέσω Τίτλου (2)

```javascript
router.get('/', function(req, res, next) {
  var sql;
  if (req.query.title) {
    sql = 'SELECT * FROM djbr_book WHERE title LIKE '
      + pool.escape('%' + req.query.title + '%');
  } else {
    sql = 'SELECT * FROM djbr_book';
  }
  pool.query(
    sql,
    (err, results, fields) => response_handler(err, res, results, next)    
  );
});
```

## Εύρεση Συγκεκριμένου Βιβλίου (1)

* Η εύρεση συγκεκριμένου βιβλίου, με βάση τον κωδικό του, κατά το
  πρότυπο REST θα είναι μέσω αίτησης GET σε URLs της μορφής:
  
   ```
   api/book/:book_id
   ```
   
  όπου το `:book_id` αντιστοιχεί στον κωδικό του βιβλίου.

* Αυτό το χειριζόμαστε προσθέτοντας τον αντίστοιχο χειριστή στο
  `books-router.js`.


## Εύρεση Συγκεκριμένου Βιβλίου (2)

```javascript
router.get('/:book_id', function(req, res, next) {
  pool.query(
    'SELECT * FROM djbr_book ' +
    'WHERE id = ?',
    [req.params.book_id],
    (err, results, fields) => response_handler(err, res, results, next)
  );
});
```

## Διαγραφή Bιβλίου (1)

* Η διαγραφή συγκεκριμένου βιβλίου, με βάση τον κωδικό του, κατά το
  πρότυπο REST θα είναι μέσω αίτησης DELETE σε URLs της μορφής
  
   ```
   api/book/:book_id
   ```
   
  όπου το `:book_id` αντιστοιχεί στον κωδικό του βιβλίου.

* Αυτό το χειριζόμαστε προσθέτοντας τον αντίστοιχο χειριστή στο
  `books-router.js`.


## Διαγραφή Bιβλίου (2) 

```javascript
router.delete('/:book_id', function(req, res, next) {
  pool.query(
    'DELETE FROM djbr_book ' +
    'WHERE id = ?',
    [req.params.book_id],
    (err, results, fields) => response_handler(err, res, results, next)
  );
});
```

## Αναζήτηση Κριτικών

```javascript
router.get('/:book_id/reviews', function(req, res, next) {
  pool.query(
    'SELECT * FROM djbr_review ' +
    'WHERE book_id = ?',
    [req.params.book_id],
    (err, results, fields) => response_handler(err, res, results, next)
  );
});
```

## Εισαγωγή Βιβλίου (1)

* Για την εισαγωγή ενός βιβλίου, θα υλοποιήσουμε ένα χειριστή της
  μεθόδου POST.

* Για να το κάνουμε αυτό, θα προσθέσουμε στο αρχείο
  `routes/books-router.js` τα ακόλουθα, πριν από το:
  
   ```javascript
   module.exports =  router;
   ```

## Εισαγωγή Βιβλίου (2)

```javascript
router.post('/', function(req, res, next) {
  pool.query(
    'INSERT INTO djbr_book SET ' +
    'title = ?, ' +
    'url = ?, ' +
    'pub_year = ?',
    [ req.body.title, req.body.url, req.body.pub_year ],
    (err, results, fields) => {
      var inserted_book = results;
      if (!err) {
	  inserted_book = {
	    id: results.insertId,
	    title: req.body.title,
	    url: req.body.url,
	    pub_year: req.body.pub_year
	  }
	}
      response_handler(err, res, inserted_book, next);
    }
  );
});
```

## Χειρισμός Λαθών

* Για τον χειρισμό λαθών θα φτιάξουμε ένα γενικής χρήσης χειριστή στο
  `app.js`.

## `app.js`

```javascript
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

app.use(function (err, req, res, next) {
  if (err) {
    console.error(err.code);
    if (err.sql) {
      console.log('While executing: ' + err.sql);
      console.log(err.sqlMessage);
    }
    res.status(500).send({'message': 'Something broke!'});
  }
});

module.exports = app;
```

## Προσαρμογή Angular front-end

* Για να χρησιμοποιήσουμε την εφαρμογή μας από το Angular front-end
  δεν χρειάζεται σχεδόν καμμία αλλαγή.

* Αν χρησιμοποιούμε proxy, απλώς πρέπει να αλλάξουμε την πόρτα στην
  οποία θα προωθεί τις αιτήσεις (στο αρχείο `proxy.conf.json`):
  ```javascript
  "target": "http://localhost:3000"
  ```

#  Έλεγχος Πρόσβασης

## passport

* Ο έλεγχος πρόσβασης στις εφαρμογές express γίνεται με τη βιβλιοθήκη
  [passport](http://www.passportjs.org/).
  
* Η βιβλιοθήκη αυτή περιλαμβάνει υλοποιήσεις για περισσότερες από 500
  στρατηγικές ελέγχου!
  
* Για να την εγκαταστήσουμε δίνουμε:

   ```bash
   npm install passport
   ```
   
## passport και JWT

* Εμείς θα χρησιμοποιήσουμε JWT.

* Συνεπώς θα εγκαταστήσουμε τη σχετική στρατηγική
  [passport-jwt](http://www.passportjs.org/packages/passport-jwt/):
  
   ```javascript
   npm install passport-jwt
   ```
   
## `config-jwt.js`

* Το JWT χρησιμοποιεί ένα μυστικό για την υπογραφή των tokens.

* Σε αντιστοιχία με τις ρυθμίσεις της βάσης, φτιάχνουμε ένα αρχείο
  `config-jwt.js` στο οποίο γράφουμε, για παράδειγμα:
  
   ```javascript
   module.exports = {
     'secret': 'khjih89klhjinaxolklasd2knasd'
   }
   ```

## Προσαρμογή `books-router.js`

* Κοντά στην αρχή του `books-router.js` προσθέτουμε

   ```javascript
   const config_jwt = require('../config-jwt');

   var JwtStrategy = require('passport-jwt').Strategy,
       ExtractJwt = require('passport-jwt').ExtractJwt;
   var opts = {}
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   opts.secretOrKey = config_jwt.secret;

   passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
     return done(null, true);
   }));
   ```

## Εισαγωγή Κριτικής

```javascript
router.post(
  '/:book_id/reviews',
  passport.authenticate('jwt', {session: false}),
  function(req, res, next) {
    var review_date = new Date();
    pool.query(
      'INSERT INTO djbr_review SET ' +
      'book_id = ?, ' +	
      'title = ?, ' +
      'text = ?, ' +
      'review_date = ?',
      [ req.params.book_id, req.body.title, req.body.text, review_date ],
      (err, results, fields) => {
	var inserted_review = results;
	if (!err) {
	  inserted_review = {
	    id: results.insertId,
	    book_id: req.params.book_id,
	    title: req.body.title,
	    text: req.body.text,
	    review_date: review_date
	  }
	}
	response_handler(err, res, inserted_review, next);
      }
    );
});
```

<div class="notes">

Ο έλεγχος γίνεται από τη γραμμή:

```javascript
passport.authenticate('jwt', {session: false}),
```

</div>

## Είσοδος Χρήστη (1)

* Για την είσοδο του χρήστη θα χρησιμοποιήσουμε έναν νέο δρομολογητή.

* Ο δρομολογητής θα ελέγχει το username και το password του χρήστη και
  θα επιστρέφει, αν όλα είναι σωστά, ένα JWT token.

* Τον δρομολογητή θα τον αποθηκεύσουμε στο αρχείο `routes/login-router.js`

* Το αρχείο το συμπεριλαμβάνουμε στο αρχείο `routes/router.js`:

```javascript
router.use('/token', login_router);
```

## `login-router.js`

```javascript
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const config_jwt = require('../config-jwt');

router.post('/', function(req, res, next) {
  var stored_password, plaintext_password;
  var algorithm, iterations, salt, hash;
  const hash_length = 32;
  var username = req.body.username;
  var plaintext_password = req.body.password;

  pool.query(
    'SELECT * FROM auth_user ' +
    'WHERE username = ?',
    [username],
    (err, results, fields) => {
      if (err) {
        next(err);
        return;
      }
      if (results.length == 0) { // User not found
        res.status(401).send('Wrong username');
        return;
      }
      // User found
      stored_password = results[0]['password'];
      [ algorithm, iterations, salt, hash ] = stored_password.split('$');
      // Check password
      crypto.pbkdf2(
        plaintext_password, salt, +iterations, hash_length, 'sha256',
        (err, derived_hash) => {
          if (err) { // Could not check password
            next(err);
            return;
          }
          let encoded_hash = derived_hash.toString('base64');
          if (encoded_hash == hash) {
            let token = jwt.sign(
              {username: username},
              config_jwt.secret,
              (err, token) => {
                if (err) {
                  next(err);
                  return;
                }
                res.send({access: token});
              }
            );
          } else {
            res.status(401).send('Wrong password');
          }
        } // end crypt.pbkdf2() callback
      ); // end crypt.pbkdf2()
    } // end pool.query() callback
  ); // end pool.query()
});


module.exports = router;
```


# Έλεγχος της Εφαρμογής

## Postman

* Για να δούμε ότι η εφαρμογή μας λειτουργεί σωστά, δίνουμε:
  ```bash
  http http://localhost:3000/api/books
  ```
  οπότε θα πρέπει να δούμε στην οθόνη μας τα βιβλία που έχουμε ορίσει.

* Εναλλακτικά, μπορούμε να εγκαταστήσουμε την εφαρμογή
  [Postman](https://www.getpostman.com/) για να ελέγχουμε το API μας. 

