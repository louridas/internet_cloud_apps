% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Node.js MongoDB Auth

## Γενικά

* Έχουμε δει τα βασικά βήματα με τα οποία μπορούμε να δουλέψουμε με
  τη Mongo.

* Τώρα θα δούμε κάποια σημεία με περισσότερη λεπτομέρεια, ώστε να
  μπορούμε να επεκτείνουμε την εφαρμογή μας ώστε να σώζει κριτικές
  βιβλίων.

* Επίσης, θα δημιουργήσουμε χρήστες και θα δούμε πώς δουλεύει ο
  έλεγχος πρόσβασης στο Node.

## Ευρετήρια

* Με τη χρήση ευρετηρίων (indices) μπορούμε:
    * Να επιταχύνουμε αναζητήσει στη βάση
    * Να εξασφαλίσουμε ότι τα δεδομένα ακολουθούν περιορισμούς
      μοναδικότητας (uniqueness constraints).

* Όσον αφορά την εφαρμογή μας, θέλουμε να εισάγουμε κατ' αρχήν έναν
  περιορισμό σύμφωνα με τον οποίο δεν υπάρχουν δύο βιβλία με τον ίδιο
  τίτλο την ίδια χρονιά.

## Δημιουργία ευρετηρίου

* Για να δημιουργήσουμε ένα ευρετήριο χρησιμοποιούμε τη μέθοδο
  `createIndex()`.
    ```javascript
    db.books.createIndex({ title: 1, pub_year: 1}, { unique: true})
    ```
* Η τιμή `1` δείχνει ότι το ευρετήριο θα είναι σε αύξουσα σειρά. Αν
  θέλουμε φθίνουσα σειρά δίνουμε `-1`.

* Για να δούμε τα ευρετήρια τα οποία υπάρχουν στη βάση μας, δίνουμε:
    ```javascript
    db.books.getIndices()
    ```

## Διαγραφή ευρετηρίου

* Για να διαγράψουμε ένα υπάρχον ευρετήριο, χρησιμοποιούμε τη μέθοδο
  `dropIndex()`, για παράδειγμα (μην το κάνετε, γιατί θα χρειαστούμε
  το ευρετήριο που μόλις κατασκευάσαμε):
    ```javascript
    db.books.dropIndex("title_1_pub_year_1")
    ```

## Έλεγχος ευρετηρίου

* Εισάγουμε το παρακάτω βιβλίο:
    ```javascript
    db.books.insert({ title: "Freedom", pub_year: 2010 }) 
    ```

* Τώρα, αν προσπαθήσουμε να το ξαναεισάγουμε, θα πάρουμε ένα λάθος της
  μορφής:
    ```
    E11000 duplicate key error collection: bangular.books index: title_1_pub_year_1 dup key: { : "Freedom", : 2010.0 }
    ```

## Ευρετήρια στο Mongoose

* Ευρετήρια μπορούμε να ορίσουμε και μέσω του Mongoose.

* To Mongoose θα ελέγχει ότι υπάρχουν τα συγκεκριμένα ευρετήρια κατά
  την εκκίνηση της εφαρμογής, και αν δεν υπάρχουν θα τα δημιουργεί.

* Προσοχή: η δημιουργία των ευρετηρίων σε μία υπάρχουσα βάση με πολλές
  εγγραφές είναι χρονοβόρα. Συνεπώς στην παραγωγή συνήθως
  απενεργοποιούμε αυτή τη δυνατότητα.

## Ευρετήριο βιβλίων στο Mongoose

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String,
  pub_year: Number
}, { toJSON: { virtuals: true } });

bookSchema.index({ title: 1, pub_year: 1}, { unique: true} );

module.exports = mongoose.model('Book', bookSchema);
```

## Χρήστες και κριτικές

* Θέλουμε στην εφαρμογή μας να μπορούμε να εισάγουμε κριτικές.

* Η κάθε κριτική θα εισάγεται από κάποιον συγκεκριμένο χρήστη.

* Η κάθε κριτική θα αφορά ένα συγκεκριμένο βιβλίο. 

## Εγκατάσταση bcrypt

* Για την αποθήκευση των κωδικών των χρηστών θα χρησιμοποιήσουμε τη
  βιβλιοθήκη [bcrypt](https://www.npmjs.com/package/bcrypt) για την
  κρυπτογράφησή τους.

* Την εγκαθιστούμε δίνοντας:
    ```bash
    npm install --save bcrypt
    ```

## Μοντέλο χρηστών

* Θα δημιουργήσουμε ένα μοντέλο για τους χρήστες στο αρχείο
  `models/user.js`.

* Στο μοντέλο θα περιγράψουμε τα πεδία των χρηστών, όσο και τη λογική
  χειρισμού των κωδικών τους.

## `user.js`

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

var userSchema = new Schema({
  username: { type: String, index: { unique: true} },
  first_name: String,
  last_name: String,
  password: String
});

userSchema.pre('save', true, function(next, done) {

  var user = this;
  
  if (!this.isModified('password')) {
    next();
    done();
  } else {
    bcrypt.hash(this.password, SALT_ROUNDS, function(err, hash) {
      if (err) {
        next(err);
      } else {
        user.password = hash;
        next();
        done();
      }
    });
  }
});

userSchema.methods.checkPassword = function(plaintextPassword, callback) {
  bcrypt.compare(plaintextPassword, this.password, function(err, res) {
    if (err) {
      callback(err);
      console.log('Could not check password');
    } else {
      callback(null, res);
    }
  });
};
  
module.exports = mongoose.model('User', userSchema);
```

## Δημιουργία χρηστών (1)

* Για να μπορέσουμε να δημιουργούμε χρήστες από τη γραμμή εντολών, θα
  φτιάξουμε ένα μικρό πρόγραμμα το οποίο θα μας ζητάει τα στοιχεία
  τους και θα τα εισάγει στη βάση.

* Για το σκοπό αυτό θα χρησιμοποιήσουμε τη βιβλιοθήκη
  [prompt](https://www.npmjs.com/package/prompt).

* Την εγκαθιστούμε δίνοντας:
    ```bash
    npm install --save prompt
    ```

## Δημιουργία χρηστών (2)

* Θα αποθηκεύσουμε το πρόγραμμά μας σε ένα αρχείο `create_user.js` σε
  έναν νέο κατάλογο που θα φτιάξουμε, τον κατάλογο `management`.

* Συνεπώς ξεκινάμε φτιάχνοντας τον κατάλογο:
    ```bash
    mkdir management
    ```

## `create_user.js`

```javascript
const prompt = require('prompt');
const mongoose = require('mongoose');

const User = require('../models/user');

mongoose.connect('mongodb://bangular:12345@127.0.0.1/bangular');

prompt.message = '';
prompt.colors = false;

prompt.start();

prompt.get([{
    name: 'username',
    required: true
  }, {
    name: 'first_name',
    required: true
  }, {
    name: 'last_name',
    required: true
  }, {
    name: 'password',
    replace: '*',
    hidden: true
  }], function (err, result) {
    var user = new User();
    
    user.username = result.username;
    user.first_name = result.first_name;
    user.last_name = result.last_name;
    user.password = result.password;
    
    user.save(function(err) {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log('User created');
        process.exit(0);
      }
    });
  });
```

## Εγκατάταση jsonwebtoken

* Για τον έλεγχο της πρόσβασης θα χρησιμοποιήσουμε, όπως και πριν,
  JSON web tokens (JWT).

* Στο Node, μπορούμε να χρησιμοποιήσουμε για το χειρισμό τους τη
  βιβλιοθήκη
  [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).

* Για να την εγκαταστήσουμε δίνουμε:
    ```bash
    npm install --save jswonwebtoken
    ```

## Ρυθμίσεις ασφαλείας

* Το JWT λειτουργεί με ένα μυστικό το οποίο θέτουμε στον εξυπηρετητή.

* Επίσης, πρέπει να θυμηθούμε ότι στον εξυπηρετητή δίνουμε το όνομα
  και τον κωδικό του χρήστη.

* Γενικώς δεν είναι καλό να τα έχουμε αυτά σε κοινή θέα, οπότε θα τα
  βάλουμε σε ένα ξεχωριστό αρχείο `config.js` στον κεντρικό κατάλογο
  της εφαρμογής.

## `config.js`

```javascript
module.exports = {
  'database': 'mongodb://bangular:12345@127.0.0.1/bangular',
  'jwt_secret': 'eo5mhtsmzv6ndwo8bpug'
};
```

## Χρήση `config.js`

* Στην αρχή του `app.js` προσθέτουμε:
    ```javascript
    const config = require('./config');
    ```

* Στο τέλος, πριν από την τελευταία γραμμή με το `module.exports`,
  βάζουμε:
    ```javascript
    mongoose.connect(config.database);

    app.set('jwt_secret', config.jwt_secret);
    ```

## Ταυτοποίηση χρήστη

* Για την ταυτοποίηση του χρήστη θα χρησιμοποιήσουμε τη διαδρομή
  `api-token-auth/`.

* Για να γίνει αυτό, θα πρέπει να φτιάξουμε τον κατάλληλο router.

* Αυτόν θα τον γράψουμε στο αρχείο `routes/login-router.js`


## `login-router.js`

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.route('/')
  .post(function(request, response) {
    User.findOne({
      username: request.body.username
      }, function(err, user) {
      if (err) {
        response.send(err);
      } else if (!user) {
        response.json({ success: false, message: 'User not found' });
      } else {
        user.checkPassword(request.body.password, function (err, res) {
          if (err) {
            response.json({ success: false, message: err});
          } else {
            if (!res) {
              response.json({ success: false, message: 'Invalid password' });
            } else {
              var token = jwt.sign(user, request.app.settings['jwt_secret'], {
                expiresIn: "1 day"
              });
              response.json({ success: true, token: token });
            }
          }
        });
      }
    });
  });

module.exports = router;
```

## Προσαρμογή `router.js`

* Για να χρησιμοποιηθεί ο `login-router.js` θα πρέπει να προσαρμόσουμε
  κατάλληλα το `app.js`.

* Συγκεκριμένα, στην αρχή θα προσθέσουμε:
    ```javascript
    var login_router = require('./routes/login-router');
    ```
* Και παρακάτω, πριν από το `app.use('/api', router);` θα προσθέσουμε: 
    ```javascript
    app.use('/api-token-auth', login_router);
    ```

## Κριτικές

* Για την αποθήκευση των κριτικών θα φτιάξουμε το κατάλληλο μοντέλο.

* Θα το αποθηκεύσουμε στο αρχείο `models/review.js`

## `models/review.js`

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
  title: String,
  text: String,
  review_datetime: { type: Date, default: Date.now },
  book: Schema.Types.ObjectId
  
});

module.exports = mongoose.model('Review', reviewSchema);
```

## Διαδρομή κριτικών

* Όπως και για τα βιβλία, θα φτιάξουμε μια ξεχωριστή διαδρομή για τον
  χειρισμό των κριτικών.

* Η διαδρομή αυτή θα αποθηκευτεί στο αρχείο
  `routes/reviews-router.js`.

## `routes/reviews-router.js`

```javascript
const express = require('express');
const router = express.Router();
const Review = require('../models/review');

router.get('/books/:book_id/reviews', function(req, res) {
  Review.find({ book: req.params.book_id })
    .sort({ review_datetime: -1 })
    .exec(function(err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
});

router.route('/books/:book_id/reviews')
  .post(function(req, res) {
    var review = new Review();
    review.title = req.body.title;
    review.text = req.body.text;
    review.book = req.params.book_id;
    review.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json(review);
    });
  });

module.exports = router;
```

## Προσαρμογή `router.js`

Για να ενεργοποιηθεί η διαδρομή των κριτικών, θα προσαρμόσουμε το
`routes/router.js` ως εξής:

```javascript
const express = require('express');
const router = express.Router();

const books_router = require('./books-router');
const reviews_router = require('./reviews-router');

router.use(books_router);
router.use(reviews_router);

module.exports = router;
```

## Έλεγχος πρόσβασης στο backend

* Αυτή τη στιγμή ο έλεγχος πρόσβασης γίνεται μόνο στο front-end.

* Θα πρέπει να εξασφαλίσουμε ότι γίνεται και στο backend, ώστε να μην
  μπορεί ένας κακόβουλος χρήστης παρακάπτοντας το backend να
  διαχειριστεί τις κριτικές.


## Απαιτήσεις ελέγχου πρόσβασης

* Οι απαιτήσεις μας σχετικά με τον έλεγχο πρόσβασης είναι:
  * Όλοι οι επισκέπτες να μπορούν να δουν κριτικές
  * Μόνο χρήστες που έχουν περάσει τη διαδικασία εισόδου να μπορού να
    δημιουργήσουν κριτικές

* Ένα βασικό χαρακτηριστικό του Express είναι ότι διάφοροι χειριστές
  διαδρομών μπορούν να μπουν σε αλυσίδα.

* Αυτό γίνεται χρησιμοποιώντας callbacks της μορφής `function(req,
  res, next)`, όπου `next` είναι η επόμενη συνάρτηση που θα εκτελεστεί
  μετά την τρέχουσα.

* Στην ουσία, καλούμε τη `next()` στα κατάλληλα σημεία.

## `reviews-router.js`

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Review = require('../models/review');

router.get('/books/:book_id/reviews', function(req, res) {
  Review.find({ book: req.params.book_id })
    .sort({ review_datetime: -1 })
    .exec(function(err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
});

router.post('/books/:book_id/reviews', function(req, res, next) {
  var token = req.get('authorization');
  
  if (token && token.startsWith("JWT ")) {
    token = token.slice(4);
    jwt.verify(token, req.app.get('jwt_secret'), function(err, decoded) {
      if (err) {
        res.status(401).json({ success: false,
                               message: 'Invalid token.'
                             });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
});

router.post('/books/:book_id/reviews', function(req, res) {
  var review = new Review();
  review.title = req.body.title;
  review.text = req.body.text;
  review.book = req.params.book_id;
  review.save(function(err) {
    if (err) {
        res.send(err);
    }
    res.json(review);
  });
});

module.exports = router;
```
