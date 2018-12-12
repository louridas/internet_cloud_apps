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

## Hello World Web Server (1)

* Με τη βιβλιοθήκη (module) `http` μπορούμε να χειριστούμε αιτήσεις
  και να δημιουργήσουμε απαντήσεις του πρωτοκόλλου HTTP.

* Έτσι, είναι εύκολο να φτιάξουμε έναν στοιχειώδη web server.


## Hello World Web Server (2)

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
μόλις ο server ξεκινήσει. 

Για να ξεκινήσουμε τον εξυπηρετητή μας, δίνουμε:

```bash
node hello_world_server.js
```

Ο εξυπηρετητής μας τρέχει στη διεύθυνση http://localhost:3000.

</div>

## Ο Server σε Λεπτομέρεια

* Ο τρόπος που δημιουργήσαμε τον web server
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

<div class="notes">

Ο εξυπηρετητής ανταποκρίνεται σε *γεγονότα*. Αφού τον δημιουργήσουμε,
ορίζουμε με ποιον τρόπο θα ανταποκριθεί στο γεγονός `request`, το
οποίο σηματοδοτείται όταν έρθει μία αίτηση HTTP. Όταν συμβεί αυτό, θα
κληθεί η συνάρτηση που παρέχουμε ως callback.

Η συνάρτηση που παρέχουμε ως callback είναι ο χειριστής της αίτησης
και παίρνει δύο παραμέτρους:

* την αίτηση (`request`)

* την απάντηση (`response`)

</div>


## Αιτήσεις και Απαντήσεις

* Το αντικείμενο `response` είναι τύπου `ServerResponse`, ενώ το
  αντικείμενο `request` είναι τύπου `IncomingMessage`.

* Όσον αφορά την απάντηση, θέτουμε τον κωδικό απάντησης και ό,τι
  επικεφαλλίδες χρειάζονται.

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
  υπάρχει μετά το `http://` ή `https://`), το αναζητούμε στην ιδιότητα
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

## Χειρισμός Δεδομένων Αίτησης (1)

* Τα δεδομένα που έρχονται μέσα από το αντικείμενο `request`
  εκπέμπονται μέσω του γεγονότος `data`.

* Αν λοιπόν θέλουμε να μαζέψουμε όλα τα δεδομένα που υποβλήθηκαν σε
  μία αίτηση, θα πρέπει να τα μαζέψουμε μέσα από το χειριστή του
  γεγονότος.
  
* Για παράδειγμα, μπορούμε να τα προσθέτουμε σε έναν πίνακα (array),
  μέχρι να τελειώσουν (όπως σηματοδοτεί το γεγονός `end`).
  
* Όταν τελειώσουν, τα ενώνουμε με τη στατική μέθοδο `Buffer.concat()`.


## Χειρισμός Δεδομένων Αίτησης (2)

```javascript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

## Χειρισμός Λαθών

* Για να αποφύγουμε καταστροφές στην εκτέλεση των προγραμμάτων μας, θα
  πρέπει να ορίζουμε χειριστές για τις περιπτώσεις λαθών.

* Στην περίπτωση που εμφανιστεί λάθος κατά την εξυπηρέτηση της
  αίτησης, θα σηματοδοτηθεί με το γεγονός `error`.

* Το απλούστερο που μπορούμε να κάνουμε είναι να το καταγράψουμε:

   ```javascript
   request.on('error', function(err) {
     // This prints the error message and stack trace to `stderr`.
     console.error(err.stack);
   });
   ```

## JSON Echo Server (1)

* Μπορούμε να χρησιμοποιήσουμε όσα έχουμε δει για να φτιάξουμε έναν
  απλό JSON echo server.

* Ο server αυτός θα παίρνει την αίτηση που λαμβάνει και θα την
  επιστρέφει στον αποστολέα.


## JSON Echo Server (2)

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
   }).listen(8080, () => {
     console.log('Server running at http://127.0.0.1:8080/');
   });
   ```

## Δοκιμή JSON Echo Server

* Μπορούμε να δοκιμάσουμε τη λειτουργία του JSON echo server δίνοντας
  απλώς:
  
   ```bash
   http PUT http://localhost:8080 message='Hello, World'
   ```

* Οπότε στο τερματικό μας θα δούμε τι ακριβώς μας επιστρέφει (ό,τι του
  στείλαμε). 


## Απλοποίηση Echo Server

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
   }).listen(8080, () => {
     console.log('Server running at http://127.0.0.1:8080/');
   });
   ```

## Echo Server με Ορισμένο Μονοπάτι και Πρωτόκολλο (1)

* Έστω ότι θέλουμε να περιορίσουμε τις αιτήσεις που δέχεται ο echo
  server.

* Συγκεκριμένα, επιθυμούμε να απαντάει μόνο σε αιτήσεις του
  πρωτοκόλλου `POST` και μόνο στη διαδρομή `/echo`.
  
* Σε όλες τις άλλες περιπτώσεις θέλουμε να επιστρέψουμε ένα 404.


## Echo Server με Ορισμένο Μονοπάτι και Πρωτόκολλο (2)

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
   }).listen(8080, () => {
     console.log('Server running at http://127.0.0.1:8080/');
   });
   ```

<div class="notes">

Στην ουσία αυτή τη στιγμή υλοποιούμε μία στοιχειώδη δρομολόγηση. Θα
δούμε αργότερα ότι στην πραγματικότητα χρησιμοποιούμε βιβλιοθήκες για
το χειρισμό της δρομολόγησης, ώστε να μην χρειάζεται να δουλεύουμε σε
αυτό το χαμηλό επίπεδο αφαίρεσης.

</div>

## Echo Server Streams (1)

* Προσέξτε ότι τόσο το αντικείμενο της αίτησης (`request`) όσο και το
  αντικείμενο της απάντησης (`response`) είναι streams.

* Η αίτηση είναι `ReadableStream` και η απάντηση είναι
  `WritableStream`.

* Άρα μπορούμε να απλοποιήσουμε τον κώδικα και απλώς να διοχετεύουμε
  το περιεχόμενο της αίτησης στην απάντηση.


## Echo Server Streams (2)

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
   }).listen(8080, () => {
     console.log('Server running at http://127.0.0.1:8080/');
   });
   ```

## Echo Server Streams με Χειρισμό Λαθών (1)

* Σε ένα πραγματικό παραγωγικό περιβάλλον, πάντα μπορούν να προκύψουν
  λάθη, τόσο κατά το χειρισμό της αίτησης, όσο και κατά το χειρισμό
  της απάντησης.

* Θα πρέπει λοιπόν να χειριστούμε τα γεγονότα `error` και στις δύο
  περιπτώσεις.


## Echo Server Streams με Χειρισμό Λαθών (2)

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
   }).listen(8080, () => {
     console.log('Server running at http://127.0.0.1:8080/');
   });
   ```

# Blocking, Non-Blocking

## Η διαφορά

* Είναι πολύ σημαντικό να καταλάβουμε τη διαφορά μεταξύ των blocking
  και non-blocking συναρτήσεων στο Node.

* Οι blocking συναρτήσεις εκτελούνται *σύγχρονα*, ενώ οι non-blocking
  συναρτήσεις εκτελούνται *ασύγχρονα*.

## Σύγχρονη Ανάγνωση Αρχείου

```javascript
const fs = require('fs');
const data = fs.readFileSync('../nodejs.md'); // blocks here until file is read
```

## Ασύγχρονη Ανάγνωση Αρχείου

```javascript
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  // do something with the data
});
```

## Τι θα Συμβεί στη Σύγχρονη Περίπτωση

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

## Τι θα Συμβεί στην Ασύγχρονη Περίπτωση

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
  non-blocking συναρτήσεις και callbacks.

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

## Παράδειγμα: Non-blocking Fibonacci

```javascript
const http = require('http');
const url = require('url');

function fibonacci(n, callback) {
  
    var inner = function(n1, n2, i) {
        if (i > n) {
            callback(null, n2);
            return;
        }
        var func = (i % 100) ? inner : inner_tick;
        func(n2, n1 + n2, i + 1);
    };
  
    var inner_tick = function(n1, n2, i) {
        process.nextTick(function() { inner(n1, n2, i); });
    };
  
    if (n == 1 || n == 2) {
        callback(null, 1);
    } else {
        inner(1, 1, 3);
    }
}

http.createServer(function(request, response) {
  var query;
  var result = 0;
  var parsedUrl = url.parse(request.url, parseQueryString=true);
  if (request.method === 'GET' && parsedUrl.pathname === '/fib') {
    query = parsedUrl.query;
    result = fibonacci(query.n, function(err, number) {
      response.write(''+number);
       response.end();      
    });
  } else {
    console.log(request.url);
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

<div class="notes">

Το παράδειγμα είναι προσαρμοσμένο από το
<https://github.com/glenjamin/node-fib>.

</div>
