% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Node.js

## Γενικά

* Το [Node.js](https://nodejs.org) είναι από τα πιο δημοφιλή πλαίσια
  ανάπτυξης εφαρμογών.

* Μας επιτρέπει να γράφουμε back-end, server side εφαρμογές, σε
  Javascript.

* Προσφέρει πολλές ευκολίες, αλλά χρειάζεται προσοχή για να αποφύγουμε
  τις κακοτοπιές.

## `Hello, World`

* Το διάσημο πρόγραμμα `Hello, World` σε Node είναι ως εξής:

    ```javascript
    console.log('Hello, World!');
    ```

* Αν το αποθηκεύσουμε σε ένα αρχείο `hello.js`, εκτελούμε:

    ```bash
    node hello.js
    ```

## Hello World web server (1)

* Με τη βιβλιοθήκη (module) `http` μπορούμε να χειριστούμε αιτήσεις
  και να δημιουργήσουμε απαντήσεις του πρωτοκόλλου HTTP.

* Έτσι, είναι εύκολο να φτιάξουμε έναν στοιχειώδη web server.


## Hello World web server (2)

* Δημιουργούμε ένα αρχείο `hello_world_server.js` στο οποίο βάζουμε τα
  παρακάτω:
  ```javascript
  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;

  const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World\n');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  ```

<div class="notes">

Η εισαγωγή μιας βιβλιοθήκης στο πρόγραμμά μας γίνεται με τη χρήση της
συνάρτησης `require()`. Δημιουργούμε έναν HTTP server με τη συνάρτηση
`http.createserver()`. 

Η συνάρτηση `http.createServer()` παίρνει ως παράμετρο μια συνάρτηση,
η οποία ακριβώς ορίζει τη συμπεριφορά του server. Η συνάρτηση αυτή θα
εκτελείται κάθε φορά που θα έρχεται μια αίτηση στον server, και είναι
μια συνάρτηση *callback*.

Η συνάρτηση αυτή παίρνει δύο παραμέτρους, την αίτηση (`request`) και
την απάντηση (`response`). Στο παράδειγμά μας, δίνουμε τον κωδικό της
απάντησης, την επικεφαλίδα, και ολοκληρώνουμε με το περιεχόμενο που θα
στείλουμε στο χρήστη.

Στη συνέχεια, ξεκινάμε τον `server` με τη συνάρτηση `server.listen()`,
η οποία ως παραμέτρους παίρνει την πόρτα (`port`) και τη διεύθυνση του
εξυπηρετητή (`hostname`), συν μια συνάρτηση η οποία θα εκτελεστεί
μόλις ο server ξεκινήσει. Η τελευταία συνάρτηση που περνάμε στην
`server.listen()` είναι επίσης μια συνάρτηση callback, η οποία θα
εκτελεστεί μόλις δημιουργηθεί ο `server`. 

Για να ξεκινήσουμε τον εξυπηρετητή μας, δίνουμε:
```bash
node helloworldserver.js
```
Ο εξυπηρετητής μας τρέχει στη διεύθυνση http://localhost:3000.

</div>

## Ανατομία του server

* Η συνάρτηση που περάσαμε στην `http.createServer()` καλείται για
  κάθε αίτηση, συνεπώς είναι ένας *χειριστής αιτήσεων* (request
  handler).

* Στην ουσία το αντικείμενο `server` είναι ένα αντικείμενο τύπου
  `EventEmitter`, που σημαίνει ότι εκπέμπει συγκεκριμένα γεγονότα, τα
  οποία χειρίζονται συγκεκριμένες συναρτήσεις, οι οποίες ονομάζονται
  *χειριστές γεγονότων* (request handlers) ή ακουστές (listeners).


# Γεγονότα

## `EventEmitter`

* Όλα τα αντικείμενα που εκπέμπουν γεγονότα είναι στιγμιότυπα της
  κλάσης `EventEmitter`.

* Τα αντικείμενα αυτού του τύπου έχουν μια μέθοδο `eventEmitter.on()`,
  με την οποία μπορούμε να προσκολλήσουμε μία ή περισσότερες
  συναρτήσεις στα γεγονότα που εκπέμπει.

* Όταν ένα αντικείμενο `EventEmitter` εκπέμπει ένα γεγονός, όλες οι
  συναρτήσεις που είναι προσκολλημένες σε αυτό καλούνται *σύγχρονα*
  (synchronously).

* Τυχόν τιμές που επιστρέφονται από τις προσκολλημένες συναρτήσεις
  *αγνοούνται*.


## Παράδειγμα `EventEmitter`

* Ως ένα απλό παράδειγμα `EventEmitter`, μπορούμε να δημιουργήσουμε το
  παρακάτω αρχείο `event_emmiter_1.js`:
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  myEmitter.on('event', () => {
    console.log('an event occurred!');
  });

  myEmitter.emit('event');
  ```

## Παράμετροι στους χειριστές (1)

* Μπορούμε να περάσουμε όσες παραμέτρους θέλουμε στις συναρτήσεις που
  προσαρτούμε σε έναν `EventEmitter`.

* Αν ορίζουμε τη συνάρτηση με το παραδοσιακό συντακτικό της
  JavaScript, η λέξη `this` αναφέρεται στο στιγμιότυπο του
  `EventEmitter`.


## Παράμετροι στους χειριστές (2)

* Για να δούμε τα παραπάνω, δημιουργούμε το παρακάτω αρχείο
  `event_emitter_2.js`: 
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  myEmitter.on('event', function(a, b) {
    console.log(a, b, this);
  });

  myEmitter.emit('event', 'one', 'two');
  ```

## Παράμετροι στους χειριστές (3)

* Πρέπει να προσέξουμε ότι η λέξη `this` θα αναφέρεται *πάντα* στο
  αντικείμενο `EventEmitter`, και όχι σε κάποιο άλλο αντικείμενο που
  μπορεί ίσως να περιμέναμε.


## Παράμετροι στους χειριστές (4)

* Για να δούμε το παραπάνω, δημιουργούμε το παρακάτω αρχείο
  `event_emitter_3.js`: 
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  class MyEmitterUser {

    constructor() {
      this.myEmitter = new MyEmitter();
      this.myEmitter.on('event', function(a, b) {
        console.log(a, b, this);
      });
    }

    fire() {
      this.myEmitter.emit('event', 'one', 'two');
    }
  }

  var myEmitterUser = new MyEmitterUser();

  myEmitterUser.fire();
  ```

## Παράμετροι στους χειριστές (5)

* Αν όμως χρησιμοποιούμε το νεώτερο τρόπο ορισμού ανώνυμων συναρτήσεων
  στη JavaScript, αυτόν με το βελάκι, τότε η λέξη `this` δεν
  αναφέρεται στο στιγμιότυπο του `EventEmitter`.


## Παράμετροι στους χειριστές (6)

* Για να δούμε το παραπάνω, δημιουργούμε το παρακάτω αρχείο
  `event_emitter_4.js`: 
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  myEmitter.on('event', (a, b) => {
    console.log(a, b, this);
  });

  myEmitter.emit('event', 'one', 'two');
  ```

## Πόσες φορές θα κληθεί; (1)

* Όταν καταγραφεί ένας χειριστής με το `eventEmitter.on()`, ο
  χειριστής θα καλείται *κάθε φορά* που θα εκπέμπεται το συγκεκριμένο
  γεγονός. 
  
* Για παράδειγμα, δείτε το παρακάτω στο αρχείο `event_emitter_5.js`:
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  let m = 0;
  myEmitter.on('event', () => {
    console.log(++m);
  });
  myEmitter.emit('event');
  // Prints: 1
  myEmitter.emit('event');
  // Prints: 2
  ```
  
## Πόσες φορές θα κληθεί; (2)

* Αν όμως θέλουμε να κληθεί ο χειριστής *μόνο την πρώτη φορά* που θα
  εκπέμψουμε ένα γεγονός, τότε θα χρησιμοποιήσουμε το
  `eventEmitter.once()`.
  
* Για παράδειγμα, δείτε το παρακάτω στο αρχείο `event_emitter_6.js`:
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  let m = 0;
  myEmitter.once('event', () => {
    console.log(++m);
  });
  myEmitter.emit('event');
  // Prints: 1
  myEmitter.emit('event');
  // Ignored
  ```
  
## Χειρισμός λαθών (1)

* Όταν εμφανιστεί ένα λάθος σε έναν `EventEmitter`, εκπέμπεται ένα
  γεγονός `error`.

* Η βέλτιστη πρακτική είναι πάντοτε να ορίζουμε χειριστές για τις
  περιπτώσεις των λαθών.

* Aν *δεν* χειριστούμε ένα λάθος, το πρόγραμμά μας θα συντριβεί
  (crash).


## Χειρισμός λαθών (2)

* Δείτε πώς καταγράφουμε έναν χειριστή λαθών στο αρχείο
  `event_emitter_7.js`: 
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  myEmitter.on('error', (err) => {
    console.log('whoops! there was an error!');
  });

  myEmitter.emit('error', new Error('whoops!'));
  ```

## Χειρισμός λαθών (3)

* Επίσης, αν θέλουμε να αποφύγουμε τη συντριβή του προγράμματός μας,
  μπορούμε να καταγράψουμε ένα χειριστή του γεγονότος
  `uncaughtException` του αντικειμένου `process`.
  
* Δείτε για παράδειγμα το αρχείο `event_emitter_8.js`:
  ```javascript
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  process.on('uncaughtException', (err) => {
    console.error('whoops! there was an error');
  });

  myEmitter.emit('error', new Error('whoops!'));
  ```

<div class="notes">
  
Το αντικείμενο `process` είναι ένα αντικείμενο που παρέχει πληροφορίες
και ελέγχει τη διαδικασία (process) του Node.js. Είναι ένα καθολικό
(global) αντικείμενο, άρα είναι διαθέσιμο στο πρόγραμμά μας χωρίς να
χρειάζεται να το εισάγουμε με `require()`.

</div>


## Ανατομία του server (πάλι)

* Τώρα μπορούμε να δούμε ότι ο τρόπος που δημιουργήσαμε τον web server
  είναι μια συντομευμένη  έκδοση του παρακάτω αρχείου
  `hello_world_server_detailed_.js`: 
  ```javascript
  const http = require('http');

  const hostname = '127.0.0.1';
  const port = 3000;

  const server = http.createServer();

  server.on('request', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World\n');
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  ```

# Χειρισμός αιτήσεων και απαντήσεων

## Αιτήσεις και απαντήσεις

* Το αντικείμενο `response` είναι τύπου `ServerResponse`, ενώ το
  αντικείμενο `request` είναι τύπου `IncomingMessage`.

* Και τα δύο αντικείμενα είναι τύπου `EventEmitter`.

* Η εκπομπή του γεγονότος `end` σηματοδοτεί ότι όλες οι επικεφαλλίδες
  και το σώμα του μηνύματος έχει σταλεί.


## Μέθοδος και URL

* Αν θέλουμε να βρούμε τη μέθοδο με την οποία έγινε μια αίτηση (π.χ.
  GET, PUSH), την αναζητούμε στην ιδιότητα `method` του αντικειμένου
  της αίτησης:
  ```javascript
  const method = request.method;
  ```

* Αν θέλουμε να βρούμε το URL στο οποίο έγινε η αίτηση (δηλαδή ό,τι
  υπάρχει μετά το `http://` ή `https://`, την αναζητούμε στην ιδιότητα
  `url` του αντικειμένου της αίτησης:
  ```javascript
  const ulr = request.url;
  ```

* Μπορούμε να πάρουμε και τα δύο μαζί:
  ```javascript
  const { method, url } = request;
  ```

## Επικεφαλλίδες

* Αν θέλουμε να πάρουμε τις επικεφαλλίδες μιας αίτησης, μπορούμε να
  τις βρούμε στην ιδιότητα `headers` του αντικειμένου της αίτησης:
  ```javascript
  const headers = request.headers;
  const userAgent = headers['user-agent'];
  ```
* Για ευκολία, τα ονόματα των επικεφαλλίδων είναι πάντοτε με πεζά
  γράμματα.

* Εναλλακτικά, μπορούμε να πάρουμε τις επικεφαλλίδες ως εξής:
  ```javascript
  const { headers } = request;
  const userAgent = headers['user-agent'];
  ```

## Σώμα της αίτησης

* Το αντικείμενο που αντιπροσωπεύει την αίτηση του χρήστη υλοποιεί τη
  διεπαφή `ReadableStream`.

* Αυτό σημαίνει ότι μπορούμε να δηλώσουμε χειριστές στα γεγονότα του,
  ή να διοχετεύσουμε (pipe) τα δεδομένα του σε άλλο stream.

* Οι χειριστές ακούν στα γεγονότα `data` και `end`.


## Χειρισμός δεδομένων (1)

* Τα δεδομένα που έρχονται μέσα από το αντικείμενο εκπέμπονται μέσω
  ενός αντικειμένου τύπου `Buffer`.

* Τυπικά, απλώς τα προσθέτουμε σε έναν πίνακα (array), μέχρι να
  τελειώσουν (όπως σηματοδοτεί το γεγονός `end`), οπότε μπορούμε να τα
  ενώσουμε και να πάρουμε το σύνολό τους.


## Χειρισμός δεδομένων (2)

```javascript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

## Χειρισμός λαθών

* Όπως είπαμε, για να αποφύγουμε καταστροφές στην εκτέλεση των
  προγραμμάτων μας, θα πρέπει να ορίζουμε χειριστές για τις
  περιπτώσεις λαθών.

* Το απλούστερο που μπορούμε να κάνουμε είναι να το καταγράψουμε:
  ```javascript
  request.on('error', function(err) {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });
  ```

## JSON echo server (1)

* Μπορούμε να χρησιμοποιήσουμε όσα έχουμε δει για να φτιάξουμε έναν
  απλό JSON echo server.

* Ο server αυτός θα παίρνει την αίτηση που λαμβάνει και θα την
  επιστρέφει στον αποστολέα.

## JSON echo server (2)

* Μπορούμε να τον υλοποιήσουμε με το παρακάτω αρχείο `echo_server_1.js`:
  ```javascript
  const http = require('http');

  http.createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      // BEGINNING OF NEW STUFF

      response.on('error', (err) => {
        console.error(err);
      });

      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      // Note: the 2 lines above could be replaced with this next one:
      // response.writeHead(200, {'Content-Type': 'application/json'})

      const responseBody = { headers, method, url, body };

      response.write(JSON.stringify(responseBody));
      response.end();
      // Note: the 2 lines above could be replaced with this next one:
      // response.end(JSON.stringify(responseBody))

      // END OF NEW STUFF
    });
  }).listen(8080);
  ```

## Δοκιμή JSON echo server

* Μπορούμε να δοκιμάσουμε τη λειτουργία του JSON echo server δίνοντας
  απλώς:
  ```bash
  http PUT http://localhost:8080 message='Hello, World'
  ```

* Οπότε στο τερματικό μας θα δούμε τι ακριβώς μας επιστρέφει (ό,τι του
  στείλαμε). 


## Απλοποίηση echo server

* Ας απλοποιήσουμε τον echo server ώστε να επιστρέφει μόνο το σώμα της
  αίτησης.

* Συνεπώς, θα αδιαφορήσουμε για τους headers της αίτησης, όπως
  μπορούμε να δούμε στο αρχείο `echo_server_2.js`:
  ```javascript
  const http = require('http');

  http.createServer((request, response) => {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      response.end(body);
    });
  }).listen(8080);
  ```

## Echo server με ορισμένο μονοπάτι και πρωτόκολλο (1)

* Έστω ότι θέλουμε να περιορίσουμε τις αιτήσεις που δέχεται ο echo
  server.

* Συγκεκριμένα, επιθυμούμε να απαντάει μόνο σε αιτήσεις του
  πρωτοκόλλου `POST` και μόνο στη διαδρομή `/echo`.
  
* Σε όλες τις άλλες περιπτώσεις θέλουμε να επιστρέψουμε ένα 404.


## Echo server με ορισμένο μονοπάτι και πρωτόκολλο (2)

  * Το αποτέλεσμα είναι στο παρακάτω αρχείο `echo_server_3.js`:
  ```javascript
  const http = require('http');

  http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      let body = [];
      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        response.end(body);
      });
    } else {
      response.statusCode = 404;
      response.end();
    }
  }).listen(8080);
  ```

<div class="notes">

Στην ουσία αυτή τη στιγμή υλοποιούμε μία στοιχειώδη δρομολόγηση. Θα
δούμε αργότερα ότι στην πραγματικότητα χρησιμοποιούμε βιβλιοθήκες για
το χειρισμό της δρομολόγησης, ώστε να μην χρειάζεται να δουλεύουμε σε
αυτό το χαμηλό επίπεδο αφαίρεσης.

</div>

## Echo server streams (1)

* Προσέξτε ότι τόσο το αντικείμενο της αίτησης (request) όσο και το
  αντικείμενο της απάντησης (response) είναι streams.

* Η αίτηση είναι `ReadableStream` και η απάντηση είναι
  `WritableStream`.

* Άρα μπορούμε να απλοποιήσουμε τον κώδικα και απλώς να διοχετεύουμε
  το περιεχόμενο της αίτησης στην απάντηση.


## Echo server streams (2)

* Η διοχέτευση μεταξύ δύο streams γίνεται με τη μέθοδο `pipe()`, όπως
  φαίνεται στο παρακάτω αρχείο `echo_server_4.js`:
  ```javascript
  const http = require('http');

  http.createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  }).listen(8080);
  ```

## Echo server streams με χειρισμό λαθών (1)

* Σε ένα πραγματικό παραγωγικό περιβάλλον, πάντα μπορούν να προκύψουν
  λάθη, τόσο κατά το χειρισμό της αίτησης, όσο και κατά το χειρισμό
  της απάντησης.

* Θα πρέπει λοιπόν να χειριστούμε τα γεγονότα `error` και στις δύο
  περιπτώσεις.


## Echo server streams με χειρισμό λαθών (2)

* Ακολουθεί μια αντιμετώπιση με απλοϊκό χειρισμό στο αρχείο
  `echo_server_5.js`: 
  ```javascript
  const http = require('http');

  http.createServer((request, response) => {
    request.on('error', (err) => {
      console.error(err);
      response.statusCode = 400;
      response.end();
    });
    response.on('error', (err) => {
      console.error(err);
    });
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  }).listen(8080);
  ```

# Blocking, Non-Blocking

## Η διαφορά

* Είναι πολύ σημαντικό να καταλάβουμε τη διαφορά μεταξύ των blocking
  και non-blocking συναρτήσεων στο Node.

* Οι blocking συναρτήσεις, εκτελούνται *σύγχρονα*, ενώ οι non-blocking
  συναρτήσεις εκτελούνται *ασύγχρονα*.

## Σύγχρονη ανάγνωση αρχείου

```javascript
const fs = require('fs');
const data = fs.readFileSync('../nodejs.md'); // blocks here until file is read
```

## Ασύγχρονη ανάγνωση αρχείου

```javascript
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  // do something with the data
});
```

## Τι θα συμβεί στη σύγχρονη περίπτωση

* Στη σύγχρονη ανάγνωση του αρχείου, το πρόγραμμα θα περιμένει μέχρι
  να ολοκληρωθεί η ανάγνωση, και μετά θα εκτελεστεί η εντολή που
  ακολουθεί.
  
* Δοκιμάστε να τρέξτε το πρόγραμμα `file_read_sync.js`:
  ```javascript
  const fs = require('fs');

  function moreWork() {
    console.log('Doing more work');
  }

  const data = fs.readFileSync('../nodejs.md'); // blocks here until file is read

  console.log(data.toString());
  moreWork(); // will run after console.log(data.toString())
  ```

<div class="notes">

Θα δείτε στην οθόνη τα περιεχόμενα του παρόντος αρχείου, και μετά το
μήνυμα `Doing more work`.

</div>

## Τι θα συμβεί στην ασύγχρονη περίπτωση

* Στην ασύγχρονη ανάγνωση του αρχείου, το πρόγραμμα επιστρέφει αμέσως
  από την κλήση της συνάρτησης `readFile()`. Η εντολή που ακολουθεί θα
  εκτελεστεί αμέσως, και αργότερα η εντολή
  `console.log(data.toString())`.
  
* Δοκιμάστε να τρέξτε το πρόγραμμα `file_read_async.js`:
  ```javascript
  const fs = require('fs');

  function moreWork() {
    console.log('Doing more work');
  }

  const data = fs.readFile('../nodejs.md', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  });

  moreWork(); // will run before console.log(data.toString())
  ```

<div class="notes">

Θα δείτε στην οθόνη το μήνυμα `Doing more work.` και μετά τα
περιεχόμενα του παρόντος αρχείου. Επειδή το αρχείο είναι μεγάλο, το
πιθανότερο είναι να μην προλάβετε να δείτε το μήνυμα `Doing more
work.`. Αν το λειτουργικό σας σύστημα το υποστηρίζει, δοκιμάστε:
```bash
node file_read_async.js | more
```

</div>


## Προσοχή!

* Τυχόν παρεξηγήσεις στη λειτουργία των ασύγχρονων κλήσεων μπορούν να
  οδηγήσουν σε ύπουλα λάθη, ή μη ντετερμινιστική συμπεριφορά.

* Για παράδειγμα, στον κώδικα που ακολουθεί, το αρχείο `/file.md` θα
  σβηστεί πριν διαβαστεί!
  ```javascript
  const fs = require('fs');
  fs.readFile('/file.md', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  fs.unlinkSync('/file.md');
  ```

## Αποφυγή Παγίδων

* Ένας τρόπος να αποφεύγουμε τις παγίδες είναι να χρησιμοποιούμε παντού
  non-blocking συναρτήσεις.

* Έτσι, θα αντικαταστήσουμε το `fs.unlinkSync()` με το `fs.unlink()`,
  το οποίο θα καλούμε στο callback του `fs.readFile()`.
  ```javascript
  const fs = require('fs');
  fs.readFile('/file.md', (err, data) => {
    if (err) throw err;
    console.log(data);
    fs.unlink('/file.md', (err) => {
      if (err) throw err;
    });
  });
  ```

