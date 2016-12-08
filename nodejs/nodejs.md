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

## Miminal web server (1)

* Με τη βιβλιοθήκη (module) `http` μπορούμε να χειριστούμε αιτήσεις
  και να δημιουργήσουμε απαντήσεις του πρωτοκόλλου HTTP.

* Έτσι, είναι εύκολο να φτιάξουμε έναν στοιχειώδη web server.

## Minimal web server (2)

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

<div class="notes">

Η εισαγωγή μιας βιβλιοθήκης στο πρόγραμμά μας γίνεται με τη χρήση της
συνάρτησης `require()`. Δημιουργούμε έναν HTTP server με τη συνάρτηση
`http.createserver()`. Η συνάρτηση αυτή παίρνει δύο παραμέτρους, την
αίτηση (request) και την απάντηση (response). Στο παράδειγμά μας,
δίνουμε τον κωδικό της απάντησης, την επικεφαλίδα, και ολοκληρώνουμε
με το περιεχόμενο που θα στείλουμε στο χρήστη.

Η συνάρτηση `http.createServer()` παίρνει ως παράμετρο μια συνάρτηση,
η οποία ακριβώς ορίζει τη συμπεριφορά του server. Η συνάρτηση αυτή θα
εκτελείται κάθε φορά που θα έρχεται μια αίτηση στον server, και είναι
μια συνάρτηση *callback*.

Στη συνέχεια, ξεκινάμε τον server με τη συνάρτηση `server.listen()`, η
οποία ως παραμέτρους παίρνει την πόρτα και τη διεύθυνση του server,
συν μια συνάρτηση η οποία θα εκτελεστεί μόλις ο server ξεκινήσει. Η
τελευταία συνάρτηση που περνάμε στην `http.createServer()` είναι
επίσης μια συνάρτηση callback. 
</div>

## Ανατομία του server (1)

* Ο τρόπος που δημιουργήσαμε τον web server είναι μια συντομευμένη
  έκδοση του παρακάτω:
    ```javascript
    const server = http.createServer();

    server.on('request', function(request, response) {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/plain');
      response.end('Hello World\n');
    });
    ```
## Ανατομία του server (2)

* Η συνάρτηση που περάσαμε στην `http.createServer()` καλείται για
  κάθε αίτηση, συνεπώς είναι ένας *χειριστής γενονότων* (request
  handler).

* Στην ουσία το αντικείμενο `server` είναι ένα αντικείμενο τύπου
  `EventEmitter`, που σημαίνει ότι εκπέμπει συγκεκριμένα γεγονότα, τα
  οποία χειρίζονται συγκεκριμένες συναρτήσεις, οι οποίες ονομάζονται
  χειριστές γεγονότων ή ακουστές (listeners).

## Ανατομία του server (3)

* Το αντικείμενο `response` είναι τύπου  `ServerResponse`, ενώ το
  αντικείμενο `request` είναι τύπου `IncomingMessage`.

* Και τα δύο αντικείμενα είναι τύπου `EventEmitter`.

* Η εκπομπή του γεγονότος `end` σηματοδοτεί ότι όλες οι επικεφαλλίδες
  και το σώμα του μηνύματος έχει σταλεί.

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

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', function(a, b) {
  console.log(a, b, this);
});

myEmitter.emit('event', 'a', 'b');
```

## Παράμετροι στους χειριστές (3)

* Αν όμως χρησιμοποιούμε το νεώτερο τρόπο ορισμού ανώνυμων συναρτήσεων
  στη JavaScript, αυτόν με το βελάκι, τότε η λέξη `this` δεν
  αναφέρεται στο στιγμιότυπο του `EventEmitter`.

## Παράμετροι στους χειριστές (4)

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
});

myEmitter.emit('event', 'a', 'b');
```

## Χειρισμός λαθών (1)

* Όταν εμφανιστεί ένα λάθος σε έναν `EventEmitter`, εκπέμπεται ένα
  γεγονός `error`.

* Η βέλτιστη πρακτική είναι πάντοτε να ορίζουμε χειριστές για τις
  περιπτώσεις των λαθών.

* αν *δεν* χειριστούμε ένα λάθος, το πιθανότερο είναι ότι το πρόγραμμά
  μας θα συντριβεί (crash).

## Χειρισμός λαθών (2)

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('error', (err) => {
  console.log('whoops! there was an error!');
});

myEmitter.emit('error', new Error('whoops!'));
```

## Μέθοδος και URL

* Αν θέλουμε να βρούμε τη μέθοδο με την οποία έγινε μια αίτηση (π.χ.
  GET, PUSH), την αναζητούμε στην ιδιότητα `method` του αντικειμένου
  της αίτησης:
    ```javascript
    var method = request.method;
    ```

* Αν θέλουμε να βρούμε το URL στο οποίο έγινε η αίτηση (δηλαδή ό,τι
  υπάρχει μετά το `http://` ή `https://`, την αναζητούμε στην ιδιότητα
  `url` του αντικειμένου της αίτησης:
    ```javascript
    var ulr = request.url;
    ```

## Επικεφαλλίδες

* Αν θέλουμε να πάρουμε τις επικεφαλλίδες μιας αίτησης, μπορούμε να
  τις βρούμε στην ιδιότητα `headers` του αντικειμένου της αίτησης:
    ```javascript
    var headers = request.headers;
    var userAgent = headers['user-agent'];
    ```
* Για ευκολία, τα ονόματα των επικεφαλλίδων είναι πάντοτε με πεζά
  γράμματα.

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
  τελειώσουν (όπως σηματοδοτεί το γεγονός `end`, οπότε μπορούμε να τα
  ενώσουμε και να πάρουμε το σύνολό τους.

## Χειρισμός δεδομένων (2)

```javascript
var body = [];

request.on('data', function(chunk) {
  body.push(chunk);
}).on('end', function() {
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

```javascript
var http = require('http');

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();

    response.on('error', function(err) {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))
  });
}).listen(8080, () => {
  console.log('Server started at port ' + 8080);
});
```

## Δοκιμή JSON echo server

* Μπορούμε να δοκιμάσουμε τη λειτουργία του JSON echo server δίνοντας
  απλώς:
    ```bash
    http PUT http://localhost:8080 message='Hello, World'
    ```

* Οπότε στο τερματικό μας θα δούμε τι ακριβώς μας επιστρέφει (ό,τι του
  στείλαμε). 

## Echo server (1)

* Ας απλοποιήσουμε τον echo server ώστε να επιστρέφει μόνο το σώμα της
  αίτησης.

* Συνεπώς, θα αδιαφορήσουμε για τους headers της αίτησης.

## Echo server (2)

```javascript
var http = require('http');

http.createServer(function(request, response) {
  var body = [];
  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    response.end(body);
  });
}).listen(8080);
```

## Echo server με ορισμένο μονοπάτι και πρωτόκολλο (1)

* Έστω ότι θέλουμε να περιορίσουμε τις αιτήσεις που δέχεται ο echo
  server.

* Συγκεκριμένα, επιθυμούμε να απαντάει μόνο σε αιτήσεις του
  πρωτοκόλλου `GET` και μόνο στη διαδρομή `/echo`.

## Echo server με ορισμένο μονοπάτι και πρωτόκολλο (2)

```javascript
var http = require('http');

http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/echo') {
    var body = [];
    request.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      response.end(body);
    })
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

## Echo server streams (1)

* Προσέξτε ότι τόσο το αντικείμενο της αίτησης (request) όσο και το
  αντικείμενο της απάντησης (response) είναι streams.

* Η αίτηση είναι `ReadableStream` και η απάντηση είναι
  `WritableStream`.

* Άρα μπορούμε να απλοποιήσουμε τον κώδικα και απλώς να διοχετεύουμε
  το περιεχόμενο της αίτησης στην απάντηση.


## Echo server streams (2)

```javascript
var http = require('http');

http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/echo') {
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

* Ακολουθεί μια αντιμετώπιση με απλοϊκό χειρισμό.

## Echo server streams με χειρισμό λαθών (2)

```javascript
var http = require('http');

http.createServer(function(request, response) {
  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', function(err) {
    console.error(err);
  });
  if (request.method === 'GET' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

# Blocking, Non-Blocking

## Γενικά

* Είναι πολύ σημαντικό να καταλάβουμε τη διαφορά μεταξύ των blocking
  και non-blocking συναρτήσεων στο Node.

* Οι blocking συναρτήσεις, εκτελούνται *σύγχρονα*, ενώ οι non-blocking
  συναρτήσεις εκτελούνται *ασύγχρονα*.

## Σύγχρονη ανάγνωση αρχείου

```javascript
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
```

## Ασύγχρονη ανάγνωση αρχείου

```javascript
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

## Διαφορές (1)

* Στη σύγχρονη ανάγνωση του αρχείου, το πρόγραμμα θα περιμένει μέχρι
  να ολοκληρωθεί η ανάγνωση, και μετά θα εκτελεστεί η εντολή που
  ακολουθεί:
    ```javascript
    const fs = require('fs');
    const data = fs.readFileSync('/file.md'); // blocks here until file is read
    console.log(data);
    moreWork(); // will run after console.log(data)
    ```

## Διαφορές (2)

* Στην ασύγχρονη ανάγνωση του αρχείου, το πρόγραμμα επιστρέφει αμέσως
  από την κλήση της συνάρτησης `readFile()`. Η εντολή που ακολουθεί θα
  εκτελεστεί αμέσως, και αργότερα η εντολή `console.log(data)`.
    ```javascript
    const fs = require('fs');
    fs.readFile('/file.md', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    moreWork(); // will run before console.log(data)
    ```

## Παγίδες (1)

* Τυχόν παρεξηγήσεις στη λειτουργία των ασύγχρονων κλήσεων μπορούν να
  οδηγήσουν σε ύπουλα λάθη, με μη ντετερμινιστική συμπεριφορά.

* Για παράδειγμα, στον κώδικα που ακολουθεί, το αρχείο `/file.md` θα
  σβηστεί πριν διαβαστεί!

## Παγίδες (2)

```javascript
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

## Αποφυγή Παγίδων (1)

* Ένας τρόπος να αποφεύγουμε τις παγίδες είναι να χρησιμοποιούμε παντού
  non-blocking συναρτήσεις.

* Έτσι, θα αντικαταστήσουμε το `fs.unlinkSync()` με το `fs.unlink()`,
  το οποίο θα καλούμε στο callback του `fs.readFile()`.

## Αποφυγή Παγίδων (2)

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
