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


## Δημιουργία νέας εφαρμογής

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

## Βασικές αρχές

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


## Παραδείγματα διαδρομών (1)

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
  
## Παραδείγματα διαδρομών (2)

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

## Σύνταξη διαδρομών

* Οι διαδρομές μπορεί να είναι συμβολοσειρές, ή μοτίβα, ή κανονικές
  εκφράσεις.
  
* Το Express χρησιμοποιεί τη βιβλιοθήκη
  [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) για
  την ερμηνεία των διαδρομών.


## Παραδείγματα σύνταξης (1)

* Περιγράφει τη διαδρομή `/random.txt`:
  ```javascript
  app.get('/random.text', function (req, res) {
    res.send('random.text')
  })
  ```

* Περιγράφει τις διαδρομές `acd`, `abcd`, `abbbcd`, κ.λπ.:
  ```javascript
  app.get('/ab?cd', function (req, res) {
    res.send('ab+cd')
  })
  ```

* Περιγράφει τις διαδρομές `abcd`, `abbcd`, `abbbcd`, κ.λπ.:
  ```javascript
  app.get('/ab+cd', function (req, res) {
    res.send('ab+cd')
  })
  ```


## Παραδείγματα σύνταξης (2)


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

## Παραδείγματα σύνταξης με κανονικές εκφράσεις


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
  
## Παράμετροι διαδρομών

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

## Χειρισμός σώματος αίτησης

* Το σώμα της αίτησης βρίσκεται στο αντικείμενο `req.body`.

* Όταν έρχεται μια αίτηση, το Express θα πρέπει να την ερμηνεύσει πριν
  την περάσει στον χειριστή της διαδρομής μας.
  
* Ο χειρισμός μιας αίτησης γίνεται μέσω βιβλιοθηκών.

* Για τον χειρισμό του σώματος των αιτήσεων χρησιμοποιούμε τη
  βιβλιοθήκη [body-parser](https://github.com/expressjs/body-parser).
  
* Για να χειριστούμε αιτήσεις JSON γράφουμε στην εφαρμογή μας:
  ```javascript
  app.use(bodyParser.json());
  ```
  
* Για να χειριστούμε την υποβολή παραδοσιακής φόρμας γράφουμε στην
  εφαρμογή μας:
  ```javascript
  app.use(bodyParser.urlencoded({ extended: false }));
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


# Middleware

## Έννοια middleware

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


## Παράδειγμα middleware (1)

* Η παρακάτω συνάρτηση εκτελείται κάθε φορά που λαμβάνεται μια αίτηση:
  ```javascript
  var app = express()

  app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  })
  ```

## Παράδειγμα middleware (2)

* Η παρακάτω συνάρτηση αναρτάται στη διαδρομή `/user/:id`. Θα
  εκτελεστεί για κάθε αίτηση σε αυτή τη διαδρομή:
  ```javascript
  app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  })
  ```
  
## Middleware και χειρισμός λαθών

* Αν η συνάρτησή μας παίρνει τέσσερες παραμέτρους, η πρώτη αντιστοιχεί
  σε κάποιο λάθος που έχει εμφανιστεί:
  ```javascript
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  ```
  
# Γεννήτρια εφαρμογών
  
## Express generator

* Συνήθως δεν ξεκινάμε τη δημιουργία μιας νέας εφαρμογής από το μηδέν,
  όπως κάναμε παραπάνω.
  
* Αντί γι' αυτό, χρησιμοποιούμε τον Express generator.

  
## Δημιουργία εφαρμογής

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
 



## Εγκατάσταση και εκκίνηση 

* Μετακινούμαστε στον κατάλογο `bangular_node` που δημιουργήθηκε, και
  εγκαθιστούμε όλα τα απαραίτητα πακέτα:
  ```bash
  cd bangular_node
  npm install
  ```

* Για να τρέξουμε την εφαρμογή σε MacOS ή Linux, δίνουμε:
  ```bash
  DEBUG=bangular_node:* npm start
  ```
  
* Για να τρέξουμε την εφαρμογή σε MS-Windows, δίνουμε:
  ```bash
  set DEBUG=bangular_node:* & npm start
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

## Αυτόματη επανεκκίνηση σε αλλαγές

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


## Καθάρισμα των αρχείων

* To αρχείο `routes/users.js` είναι ένα υπόδειγμα, δεν θα μας
  χρειαστεί, οπότε μπορούμε να το σβήσουμε.
  
* Ομοίως σβήνουμε το αρχείο `routes/index.js`.
  
* Αντίστοιχα, στο αρχείο `app.js` σβήνουμε τις δύο γραμμές:

   ```javascript
   var indexRouter = require('./routes/index');
   var usersRouter = require('./routes/users');
   ```
  και τις δύο γραμμές:

   ```javascript
   app.use('/', indexRouter);
   app.use('/users', usersRouter);
   ```

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

# Υλοποίηση bangular_node

## Προσθήκη router

* Στο αρχείο `app.js` προσθέτουμε κάπου στην αρχή τη γραμμή:

   ```javascript
   var router = require('./routes/router');
   ```

* Στη συνέχεια, προσθέτουμε μετά από τη γραμμή:

   ```javascript
   app.use(bodyParser.json());
   ```
   
  τη γραμμή:
  
   ```javascript
   app.use('/api', router);
   ```

## `app.js`

***

## `routes/router.js`

* Στο αρχείο `routes/router.js` θα βάλουμε προς το παρόν απλώς λίγο
  κώδικα για να μας επιστρέφει κάποια βιβλία:
  
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

  router.get('/books', function(req, res) {
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

* Για να δούμε ότι η εφαρμογή μας λειτουργεί σωστά, δίνουμε:
  ```bash
  http http://localhost:3000/api/books
  ```
  οπότε θα πρέπει να δούμε στην οθόνη μας τα βιβλία που έχουμε ορίσει.

* Εναλλακτικά, μπορούμε να εγκαταστήσουμε την εφαρμογή
  [Postman](https://www.getpostman.com/) για να ελέγχουμε το API μας. 


# Αποθήκευση δεδομένων

## Εγκατάσταση οδηγού MySQL

* Για την αποθήκευση των δεδομένων μας μπορούμε να χρησιμοποιήσουμε
  ό,τι θέλουμε.

* Εμείς θα χρησιμοποιήσουμε τη βάση MySQL που ήδη έχουμε από την
  εφαρμογή που έχουμε αναπτύξει με το Django. 

* Για να εγκατασταθεί ο οδηγός της MySQL για το Node.js, δίνουμε:
  ```
  npm install mysql
  ```

## Σύνδεση με τη βάση

* Για να συνδεθούμε με τη βάση φτιάχνουμε το αρχείο `db.js`:

   ```javascript
   const mysql = require('mysql');
   const fs = require('fs');

   const configPath = './db_config.json';
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
  
## Ευαίσθητα δεδομένα

* Τα ευαίσθητα δεδομένα της σύνδεσης, τα αποθηκεύουμε σε ένα άλλο
  αρχείο, `db_config.json`, το οποίο *δεν* συμπεριλαμβάνουμε στο
  αποθετήριο:
  
   ```javascript
   {
     "host" : "127.0.0.1",
     "user" : "djbr_user",
     "password" : "whateverthisis",
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

# Υλοποίηση διασυνδεμένης εφαρμογής

## Διαδρομή βιβλίων

* Για να ενταχθούν οι διαδρομές των βιβλίων στην εφαρμογή μας,
  αλλάζουμε το αρχείο `routes/router.js` ως εξής:
  
   ```javascript
   const express = require('express');
   const router = express.Router();

   const books_router = require('./books-router');

   router.use(books_router);

   module.exports = router;
   ```

## Ανάκτηση όλων των βιβλίων

* Για την ανάκτηση όλων των βιβλίων, θα υλοποιήσουμε ένα χειριστή της
  μεθόδου GET.

* Ο χειριστής απλά θα εκτελεί μια αναζήτηση στη βάση για το σύνολο των
  βιβλίων και στη συνέχεια θα τα επιστρέφει.

* Για να το κάνουμε αυτό, φτιάχνουμε ένα αρχείο
  `routes/books-router.js` όπως ακολούθως.

## `routes/books-router.js`

```javascript
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/books', function(req, res) {
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

## Εισαγωγή βιβλίου

* Για την εισαγωγή ενός βιβλίου, θα υλοποιήσουμε ένα χειριστή της
  μεθόδου POST.

* Για να το κάνουμε αυτό, θα προσθέσουμε στο αρχείο
  `routes/books-router.js` τα ακόλουθα, πριν από το:
  
   ```javascript
   module.exports =  router;
   ```

## `routes/books-router.js`

```javascript
router.post('/books', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.send(err);
      return;
    }
    connection.query('INSERT INTO djbr_book SET ' +
      'title = ?, ' +
      'pub_year = ?',
      [ req.body.title, req.body.pub_year ],
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
```

## POST με Postman

* Για να κάνουμε ένα  HTTP POST request με το postman, πρέπει να
  ορίσουμε σωστά την αίτηση.

* Επιλέγουμε τύπο αίτησης POST.

* Επιλέγουμε Body.

* Από κάτω, επιλέγουμε raw.

* Στο dropdown menu που θα εμφανιστεί, επιλέγουμε JSON
  (application/json)

* Από κάτω εισάγουμε σε JSON το σώμα της αίτησης.


## Εύρεση συγκεκριμένου βιβλίου

* Η εύρεση συγκεκριμένου βιβλίου, με βάση τον κωδικό του, κατά το
  πρότυπο REST θα είναι μέσω αίτησης GET σε URLs της μορφής:
  
   ```
   api/book/:book_id
   ```
   
  όπου το `:book_id` αντιστοιχεί στον κωδικό του βιβλίου.

* Αυτό το χειριζόμαστε προσθέτοντας τον αντίστοιχο χειριστή στο
  `books-router.js`.


## `routes/books-router.js`

```javascript
router.get('/books/:book_id', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.send(err);
      return;
    }
    connection.query('SELECT * FROM djbr_book ' +
      'WHERE id = ?',
      [req.params.book_id],
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
```

## Διαγραφή βιβλίου

* Η διαγραφή συγκεκριμένου βιβλίου, με βάση τον κωδικό του, κατά το
  πρότυπο REST θα είναι μέσω αίτησης DELETE σε URLs της μορφής
  
   ```
   api/book/:book_id
   ```
   
  όπου το `:book_id` αντιστοιχεί στον κωδικό του βιβλίου.

* Αυτό το χειριζόμαστε προσθέτοντας τον αντίστοιχο χειριστή στο
  `books-router.js`.


## `routes/books-router.js`

```javascript
router.delete('/books/:book_id', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.send(err);
      return;
    }
    connection.query('DELETE FROM djbr_book ' +
      'WHERE id = ?',
      [req.params.book_id],
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
```

## Αναζήτηση βιβλίου με βάση τίτλο

* Η αναζήτηση βιβλίου με βάση συγκεκριμένο τίτλο θα γίνει, κατά το
  πρότυπο REST, μέσω αίτησης GET της μορφής:
  
   ```javascript
   api/book?title=:book_title
   ```
   
  όπου ο τίτλος αντιστοιχεί στον όρο αναζήτησης του τίτλου.

* Αυτό το χειριζόμαστε αλλάζοντας κατάλληλα τον χειριστή της αίτησης
  GET `/books`.

## `routes/books-router.js`

```javascript
router.get('/books', function(req, res) {
  pool.getConnection(function(err, connection) {
    var sql;
    if (err) {
      res.send(err);
      return;
    }
    if (req.query.title) {
      sql = 'SELECT * FROM djbr_book WHERE title LIKE '
        + connection.escape('%' + req.query.title + '%');
    } else {
      sql = 'SELECT * FROM djbr_book';
    }
    connection.query(sql,
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
```

## Προσαρμογή Angular front-end

* Για να χρησιμοποιήσουμε την εφαρμογή μας από το Angular front-end
  δεν χρειάζεται σχεδόν καμμία αλλαγή.

* Αν χρησιμοποιούμε proxy, απλώς πρέπει να αλλάξουμε την πόρτα στην
  οποία θα προωθεί τις αιτήσεις (στο αρχείο `proxy.conf.json`):
  ```javascript
  "target": "http://localhost:3000"
  ```
