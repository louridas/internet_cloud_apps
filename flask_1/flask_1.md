% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Εισαγωγή στο Flask

## Flask

* Το [Flask](http://flask.pocoo.org/) είναι μια μικρο-πλατφόρμα
  ανάπτυξης διαδικτυακών εφαρμογών.

* Προσφέρεται για τη γρήγορη ανάπτυξη σχετικά μικρών εφαρμογών και
  υπηρεσιών.

* Είναι ιδιαίτερα δημοφιλές και χρησιμοποείται ευρύτατα.

<div class="notes">

Από εδώ και στο εξής θα χρησιμοποιήσουμε την παρακάτω ορολογία:

* Θα λέμε *χρήστη* της εφαρμογής τον άνθρωπο που αλληλεπιδρά με αυτήν.

* Στην πραγματικότητα, ο χρήστης δεν αλληλεπιδρά απ' ευθείας με την
  εφαρμογή. Αλληλεπιδρά χρησιμοποιώντας ένα πρόγραμμα και
  συγκεκριμένα έναν browser. Το πρόγραμμα αυτό είναι ο *πελάτης*
  (client) της εφαρμογής μας.

* Η ίδια η εφαρμογή μας είναι ο *εξυπηρετητής* (server). Έτσι έχουμε το
  μοντέλο πελάτη-εξυπηρετητή.

* Σε μία διαδικτυακή εφαρμογή, κάθε αλληλεπίδραση του πελάτη με τον
  εξυπηρετητή έχει τη μορφή *αίτησης* (request) και *απάντησης*
  (response). Για παράδειγμα, αν ο χρήστης εισάγει το όνομα και τον
  κωδικό του σε μία σελίδα εισόδου, ο πελάτης (browser) στέλνει στην
  εφαρμογή μία αίτηση με τα στοιχεία αυτά και η εφαρμογή απαντά με το
  αποτέλεσμα της αίτησης (πρόσβαση ή απαγόρευση πρόσβασης).

</div>

## Εγκατάσταση Flask

```bash
pip install Flask
```

<div class="notes">

Η εντολή `pip` είναι ο γενικός τρόπος με τον οποίον εγκαθιστούμε
πακέτα και βιβλιοθήκες στην Python.

</div>

## Hello World στο Flask

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World!</h1>"

if __name__ == "__main__":
    app.run()
```

<div class="notes">

Η πρώτη γραμμή, `app = Flask(__name__)`, δημιουργεί το
αντικείμενο `app` που αντιπροσωπεύει την εφαρμογή που φτιάχνουμε. Η
μεταβλητή `__name__` στην Python παίρνει αυτομάτως συγκεκριμένες
τιμές:

* Αν τρέχει το κυρίως πρόγραμμα, τότε η τιμή είναι ίση με
  `"__main__"`. 
   
* Αν το αρχείο έχει διαβαστεί από κάποιο άρθρωμα (module), τότε το
  `__name__` θα είναι το όνομα του αρθρώματος.

Η γραμμή `@app.route("/")` δηλώνει ότι η συνάρτηση που θα ακολουθεί θα
υλοποιεί τη συμπεριφορά της εφαρμογής μας στο μονοπάτι `/`. Το
μονοπάτι είναι το κομμάτι ενός URL που ακολουθεί της διεύθυνσης του
υπολογιστή. Το μονοπάτι `/` είναι ουσιαστικά το «κενό» μονοπάτι, π.χ.
http://www.google.com ή http://www.google.com/. Παρακάτω θα δούμε
άλλα μονοπάτια.

Αν δεν έχετε ξαναδεί το σύμβολο `@` στην Python, με το σύμβολο αυτό
ορίζουμε *διακοσμητές* (decorators) στη γλώσσα. Οι διακοσμητές είναι
ένας μηχανισμός με τον οποίο μία συνάρτηση τυλίγεται μέσα σε μία άλλη,
εξωτερική συνάρτηση. Στην περίπτωσή μας, ο διακοσμητής `app.route`
τυλίγει τη συνάρτηση `hello` σε μία συνάρτηση η οποία εξασφαλίζει ότι
όταν το μονοπάτι που δίνεται είναι `/` θα εκτελεστεί ο κώδικας μέσα
στη `hello`. 

</div>

## Διακοσμητές (Decorators)

* Οι διακοσμητές περιτυλίγουν μια συνάρτηση αλλάζοντας τη συμπεριφορά
  της.

* Στην ουσία, όταν γράφουμε:

    ```python
    @my_decorator
    def my_function():
        pass
    ```
είναι το ίδιο με το:

    ```python
    my_function = my_decorator(my_function)
    ```


## Παράδειγμα Διακοσμητή

* Έστω ότι θέλουμε να φτιάξουμε ένα μηχανισμό με τον οποίο να
  χρονομετρούμε μια συνάρτηση.
  
* Αυτό μπορεί να γίνει με έναν διακοσμητή ως εξής:

    ```python
    import time

    def time_execution(f):

        def decorator(*args, **kwargs):
            start = time.time()
            r = f(*args, **kwargs)
            end = time.time()
            print(end - start)
            return r

        return decorator

    def fib(n):
        a, b = 0, 1
        for i in range(2, n):
            a, b = b, a + b
        return b

    fib = time_execution(fib)
    result = fib(1000)
    print(result)
    ```

<div class="notes">

Στο παράδειγμα αυτό, η συνάρτηση `fib()` διακοσμείται, και το
αποτέλεσμα της διακόσμησης το αποθηκεύουμε στη μεταβλητή `fib`. Αυτό
μπορεί αν φαίνεται παράξενο, αν δεν το έχετε ξαναδεί. Στην Python οι
συναρτήσεις είναι κανονικά αντικείμενα της γλώσσας, και το όνομά τους
δείχνει στο περιεχόμενό τους (δηλαδή στον κώδικα του σώματός τους).
Άρα με το

```python
fib = time_execution(fib)
```

η κλήση `fib(1000)` καλεί τη *διακοσμημένη* συνάρτηση.

Αν θέλαμε να έχουμε και τη διακοσμημένη συνάρτηση αλλά και την
αφτιασίδωτη, θα κάναμε απλώς κάτι του τύπου:

```python
decorated_fib = time_execution(fib)
```

οπότε η κλήση `fib(1000)` θα καλεί την αφτιασίδωτη έκδοση ενώ η
`decorated_fib(1000)` θα καλεί τη φτιασιδωμένη.

</div>

## Διακοσμητής με Συντακτική Ζάχαρη

* Αντί να γράφουμε το προηγούμενο, χρησιμοποιούμε την παρακάτω
  συντακτική ζάχαρη (syntactic sugar):
  
    ```python
    import time

    def time_execution(f):

        def decorator(*args, **kwargs):
            start = time.time()
            r = f(*args, **kwargs)
            end = time.time()
            print(end - start)
            return r

        return decorator

    @time_execution
    def fib(n):
        a, b = 0, 1
        for i in range(2, n):
            a, b = b, a + b
        return b

    result = fib(1000)
    print(result)
    ```

## Διακοσμητές στο Flask

* Στην ουσία το `route()` που είδαμε στην Flask είναι λοιπόν απλώς ο
  διακοσμητής που βλέπετε παρακάτω.
  
* Αυτό που κάνει είναι μάλιστα πιο απλό από το προηγούμενο. 

* Δεν αλλάζει καν τη συμπεριφορά της συνάρτηση που του περνάμε. Απλώς
  καλεί τη συνάρτηση `add_url_rule`, η οποία καταγράφει το μονοπάτι
  στα μονοπάτια που γνωρίζει η εφαρμογή.

    ```python
    def route(self, rule, **options):
         def decorator(f):
             endpoint = options.pop('endpoint', None)
             self.add_url_rule(rule, endpoint, f, **options)
             return f
         return decorator
    ```

## Εκτέλεση

* Εκτελούμε το πρόγραμμα:

	```bash
	python hello_world.py
	 ```

* Η εφαρμογή είναι προσβάσιμη στη διεύθυνση http://127.0.0.1:5000/.

<div class="notes">

Αν δώσουμε http://127.0.0.1:5000/ στον browser μας, θα δούμε να
εμφανίζεται το μήνυμα Hello World!.

Η διεύθυνση http://127.0.0.1 είναι η *τοπική* διεύθυνση του
υπολογιστή. Κάθε υπολογιστής που είναι συνδεμένος στο διαδίκτυο έχει
μία διεύθυνση με την οποία είναι προσβάσιμος από άλλους υπολογιστές.
Πώς όμως μπορούμε να αναφερθούμε στον ίδιο τον υπολογιστή μας από τον
υπολογιστή μας; Αυτό κάνει η διεύθυνση 127.0.0.1: είναι ο τρόπος με
τον οποίο ένας υπολογιστής μπορεί να αναφερθεί στον εαυτό του.

Το 5000 που βλέπετε μετά τη διεύθυνση είναι η *θύρα* ή *πόρτα*
(port) του υπολογιστή. Μπορείτε να φανταστείτε κάθε υπολογιστή σαν μία
πολυκατοικία με πολλά διαμερίσματα. Για την ίδια λοιπόν διεύθυνση
έχουμε πολλές διαφορετικές κατοικίες, σε κάθε μία από την οποία
αντιστοιχεί μια διαφορετική πόρτα.

Αν σε μία διεύθυνση στο διαδίκτυο δεν δώσουμε τον αριθμό της πόρτας,
εννοείται η πόρτα 80. Δηλαδή, το http://www.google.com είναι το
ίδιο με το http://www.google.com:80. Η πόρτα 80 είναι η κεντρική
είσοδος για τις εφαρμογές HTTP, δηλαδή για τις διαδικτυακές εφαρμογές.

</div>

## Παραμετροποιημένο Hello World

* Προσθέτουμε την παρακάτω συνάρτηση κάτω από την πρώτη:

    ```python
    @app.route('/user/<name>')
    def user(name):
        return '<h1>Hello user %s!</h1>' % name
    ```

<div class="notes">

Η συνάρτηση αυτή χειρίζεται ένα διαφορετικό μονοπάτι: `/user/<name>`,
δηλαδή μονοπάτια του τύπου http://127.0.0.1/user/Panos, ή όποιο άλλο
όνομα, το `<name>` είναι παράμετρος. Αν δώσουμε τη διεύθυνση
http://127.0.0.1/user/Panos στον browser μας, θα εμφανιστεί το μήνυμα
Hello user Panos!.

</div>

# Flask Tutorial

## Flaskr

* Εφαρμογή microblogging.

* Προσαρμοσμένο από την
  [τεκμηρίωση του Flask](http://flask.pocoo.org/docs/1.0/tutorial/).

## Δημιουργία Περιβάλλοντος

* Δημιουργείστε τον παρακάτω κατάλογο, στον οποίο θα αναπτύξουμε την
  εφαρμογή μας:

    ```
    flaskr
    ```

## Δημιουργία Εφαρμογής

* Αυτή τη φορά, θα δημιουργήσουμε την εφαρμογή μας γράφοντας τον
  απαραίτητο κώδικα στο αρχείο:
  
  ```
  flaskr/__init__.py
  ```

## `flaskr/__init__.py`

```python
import os

from flask import Flask


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
```

<div class="notes">

Κάθε ρεαλιστική εφαρμογή χρειάζεται μια σειρά ρυθμίσεων για να
λειτουργήσει. Τέτοιες ρυθμίσεις μπορεί να είναι το είδος και η
τοποθεσία της βάσης δεδομένων που χρησιμοποιεί, όπως και οποιοδήποτε
άλλο στοιχείο θα πρέπει να γνωρίζει η εφαρμογή τη στιγμή που ξεκινά.

Στην περίπτωσή μας, χρησιμοποιούμε τις παρακάτω ρυθμίσεις:

* `DATABASE`, η οποία θα δείχνει στο αρχείο που θα αποθηκεύονται τα
  δεδομένα της βάσης μας. Το αρχείο θα ονομάζεται `flaskr.sqlite` και θα
  βρίσκεται στον κατάλογο στον οποίο βρίσκεται και η εφαρμογή μας
  (`app.instance_path`).

* `SECRET_KEY`, το οποίο είναι μια μυστική συμβολοσειρά, με την οποία
  θα υπογράφει η εφαρμογή μας κάποια στοιχεία που θα στέλνει στο
  χρήστη. Συγκεκριμένα, η εφαρμογή μας θα χρησιμοποιεί
  [cookies](https://en.wikipedia.org/wiki/HTTP_cookie). Τα cookies
  αυτά θα είναι κρυπτογραφικά υπογεγραμμένα από την εφαρμογή μας με
  το `SECRET_KEY`, ώστε να μην μπορούν να αλλαχθούν από τον χρήστη (ή
  όποιον άλλον). 

</div>


## Εκκίνηση Εφαρμογής

* Μετακινούμαστε τον κατάλογο που *περιέχει* τον `flaskr`.

* Αν έχουμε Linux ή Mac, δίνουμε:

```bash
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```

* Στο MS-Windows cmd δίνουμε:

```
set FLASK_APP=flaskr
set FLASK_ENV=development
flask run
```

* Στο MS-Windows PowerShell δίνουμε:

```
$env:FLASK_APP = "flaskr"
$env:FLASK_ENV = "development"
flask run
```

<div class="notes">

Οι δύο πρώτες εντολές ορίζουν δύο *μεταβλητές περιβάλλοντος*
(environment variables) του λειτουργικού συστήματος. Η πρώτη θα δώσει
στο Flask την εφαρμογή, η δεύτερη θα του δηλώσει ότι θα τρέχει σε
λειτουργία αποσφαλμάτωσης (debug mode). Με τη λειτουργία
αποσφαλμάτωσης θα εμφανίζονται αναλυτικές πληροφορίες σε περίπτωση
προγραμματιστικών λαθών, ώστε να μπορούμε να τα διορθώσουμε
ευκολότερα. Προσοχή, η λειτουργία αποσφαλμάτωσης δεν πρέπει να
χρησιμοποιείται όταν μια υπηρεσία χρησιμοποιείται παραγωγικά, διότι
την κάνει ευάλωτη σε επιθέσεις. Μας δίνει πρόσβαση σε ένα περιβάλλον
στο οποίο μπορούμε να εκτελέσουμε οποιονδήποτε κώδικα θέλουμε·
πρακτικό στη διαδικασία της ανάπτυξης, καταστροφικό στην παραγωγή.

</div>

# Αλληλεπίδραση με Βάση Δεδομένων

## Σύνδεση και Αποσύνδεση με τη ΒΧάση

* Θα χρησιμοποιήσουμε τη βάση δεδομένων
  [SQLite](https://www.sqlite.org/).

* Δημιουργείστε το αρχείο:

   ```
   flaskr/db.py
   ```

##  `flaskr/db.py`

```python
import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(error=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()
```

<div class="notes">

Η SQLite είναι μια *ενσωματωμένη* (embedded) σχεσιακή βάση δεδομένων.
Ενσωματωμένη σημαίνει ότι δεν εγκαθίσταται ως ανεξάρτητη εφαρμογή,
στην οποία έχει πρόσβαση το πρόγραμμά μας, αλλά ενσωματώνεται μέσα στο
ίδιο το πρόγραμμα. Στην περίπτωσή μας, μας εξυπηρετεί για να
μπορέσουμε να δοκιμάσουμε γρήγορα τον κώδικά μας. Για να
χρησιμοποιήσουμε την SQLite με την Python δεν χρειάζεται να κάνουμε
κάτι ιδιαίτερο. Αναλόγως του λειτουργικού μας συστήματος, είτε
περιλαμβάνεται στην εγκατάσταση της Python, είτε η εγκατάσταση της
Python χρησιμοποιεί την SQLite που βρίσκεται ήδη εγκατεστημένη στο
σύστημα. 

Ανεξαρτήτως ποιας βάσης χρησιμοποιούμε, κάθε φορά που θέλουμε να
διαβάσουμε ή να γράψουμε δεδομένα σε αυτήν πρέπει να *συνδεθούμε* με
τη βάση. Η συνάρτηση που γράψαμε συνδέεται με τη βάση που ορίζεται ως
`DATABASE` στις ρυθμίσεις της εφαρμογής. Επίσης, ορίζουμε ότι τα
αποτελέσματα που θα διαβάζονται από τη βάση θα μας επιστρέφονται με τη
μορφή λεξικού (dictionary) της Python. Μία γραμμή της βάσης θα είναι
ένα λεξικό, με ένα κλειδί για κάθε στήλη.

Κατά τη διάρκεια της εξυπηρέτησης μιας αίτησης, η εφαρμογή μας μπορεί
να χρειαστεί να επικοινωνήσει με τη βάση περισσότερες από μία φορές.
Εμείς όμως θα πρέπει κατά τη διάρκεια της εξυπηρέτησης της αίτησης να
χρησιμοποιούμε την ίδια σύνδεση. Για το σκοπό αυτό θα χρησιμοποιούμε
τη συνάρτηση `get_db()`, η οποία, αν στην τρέχουσα αίτηση δεν έχει ήδη
δημιουργηθεί σύνδεση,  θα δημιουργήσει μια καινούργια, αλλιώς θα μας
επιστρέψει αυτή που έχει ήδη δημιουργηθεί.

Το αντικείμενο `g` που βλέπετε είναι ένα αντικείμενο στο οποίο
μπορούμε να αποθηκεύουμε πράγματα που θα χρειαστούν για την
επεξεργασία των αιτήσεων που έρχονται από τον πελάτη. Το αντικείμενο
αυτό δεν χρειάζεται να το δηλώσουμε εμείς κάπου. Δημιουργείται πριν
την εξυπηρέτηση της αίτησης και ανήκει στο λεγόμενο *περιβάλλον της
εφαρμογής* (application context). Το περιβάλλον της εφαρμογής περιέχει
διάφορα αντικείμενα τα οποία χρησιμεύουν για την εξυπηρέτηση μιας
αίτησης. Στην περίπτωσή μας, στο αντικείμενο `g` αποθηκεύουμε τη
σύνδεση που δημιουργούμε, όταν τη δημιουργούμε, και εκεί την
αναζητούμε στη συνέχεια κατά τη διάρκεια εξυπηρέτησης μιας αίτησης.

Κάθε σύνδεση στη βάση απαιτεί υπολογιστικούς πόρους, οπότε κοστίζει.
Για το λόγο αυτό θέλουμε να ελαχιστοποιούμε τον αριθμό ανοιχτών
συνδέσεων σε μία βάση δεδομένων. Εξ΄ άλλου, σχετικοί περιορισμοί
τίθενται και από κάθε βάση: συνήθως επιτρέπεται να υπάρχει μέχρι ένας
αριθμός ανοιχτών συνδέσεων. Για το σκοπό αυτό θα χρησιμοποιήσουμε τη
συνάρτηση `close_db()`, την οποία στη συνέχεια θα δούμε πώς θα
καλείται αυτόματα στο τέλος της επεξεργασίας κάθε αίτησης.

Η συνάρτηση `close_db()` μπορεί να κληθεί είτε στο τέλος μιας
επιτυχημένης αίτησης, είτε στο τέλος μιας αίτησης που τερματίζεται
λόγω κάποιου λάθους. Στην περίπτωση αυτή, η παράμετρος `error` θα
δείχνει το λάθος που εμφανίστηκε.

</div>

## Δημιουργία Βάσης

* Δημιουργείστε το αρχείο:

   ``` 
   flaskr/schema.sql
   ```

## `flaskr/schema.sql`

```sql
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL);

CREATE TABLE post(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user (id));
```

## Εκτέλεση εντολών δημιουργίας της βάσης

* Για να εκτελεστούν οι εντολές του `schema.sql` μέσα από το Flask,
  προσθέτουμε τα παρακάτω στο `flaskr/db.py`:

    ```python
	def init_db():
		db = get_db()

		with current_app.open_resource('schema.sql') as f:
			db.executescript(f.read().decode('utf8'))


	@click.command('init-db')
	@with_appcontext
	def init_db_command():
		"""Clear the existing data and create new tables."""
		init_db()
		click.echo('Initialized the database.')
	```

<div class="notes">

Στη συνάρτηση `init_db()` ξεκινάμε παίρνοντας μια σύνδεση από τη βάση.
Στη συνέχεια, διαβάζουμε το αρχείο `schema.sql` το οποίο βρίσκουμε
στον κατάλογο του πακέτου `flaskr` (αυτό κάνει η `open_resource()`).
Τα περιεχόμενα του αρχείου εκτελούνται μέσω της `executescript()`.

Η συνάρτηση `init_db_command` ορίζει την εντολή `init-db` η οποία θα
είναι πλέον διαθέσιμη στη γραμμή εντολών μας. Έτσι θα μπορούμε πολύ
εύκολα να δημιουργούμε ξανά και ξανά τη βάση μας στις δοκιμές μας.

</div>

## Εγγραφή Συναρτήσεων στην Εφαρμογή

* Για να μπορέσει να βρει η εφαρμογή μας τις συναρτήσεις που φτιάξαμε,
  θα πρέπει να τις καταγράψουμε (register) στην εφαρμογή.
  
* Προσθέστε την παρακάτω συνάρτηση στο τέλος του `flaskr/db.py`:

    ```python
	def init_app(app):
        app.teardown_appcontext(close_db)
        app.cli.add_command(init_db_command)
    ```

<div class="notes">

Η συνάρτηση `app.teardown_appcontext()` λέει στο Flask να καλεί τη
συνάρτηση `close_db()` κάθε φορά που επιστρέφει από τη διαχείριση μιας
αίτησης.

Η συνάρτηση `app.cli.add_command()` δημιουργεί μια νέα εντολή που θα
μπορούμε να χρησιμοποιούμε στη γραμμή εντολών μέσω της εντολής `flask`.

</div>

## Χρήση στο `flasrk/__init__.py`

* Τα παραπάνω θα πρέπει να τα χρησιμοποιήσουμε κατά τη δημιουργία της
  εφαρμογής μας.
  
* Προσθέστε τις παρακάτω γραμμές στο τέλος της συνάρτησης
  `create_app()`, πριν από το `return app`:
  
  ```python
  from . import db
  db.init_app(app)
  ```
  
## Αρχικοποίηση της Βάσης

* Αν όλα πάνε καλά μπορείτε να τρέξετε την παρακάτω εντολή *από τον
  κατάλογο που περιέχει το `flaskr`* για να δημιουργηθεί η βάση:

    ```bash
    flask init-db
    ```
  
# Αυθεντικοποίηση

## Προσχέδιο Αυθεντικοποίησης

* Θα συνεχίσουμε την εφαρμογή φτιάχοντας τις σελίδες ελέγχου εισόδου,
  δηλαδή την αυθεντικοποίηση (authentication).
  
* Οι σελίδες αυτές θα γραφτούν σύμφωνα με ένα *προσχέδιο* (blueprint). 

* Στη συνέχεια, θα καταγράψουμε το προσχέδιο στην εφαρμογή.

## Δημιουργία Προσχέδιου

* Ξεκινάμε το προσχέδιο δημιουργώντας το αρχείο:

   ```
   flaskr/auth.py
   ```
   
## `flaskr/auth.py`

```python
import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')
```

<div class="notes">

Κατασκευάζουμε το προσχέδιο με την κλήση στο `Blueprint()`. Η πρώτη
παράμετρος δίνει το όνομα, στην περίπτωσή μας, `auth`. Η δεύτερη
παράμετρος δίνει πού ορίζεται το προσχέδιο, οπότε χρησιμοποιούμε τη
μεταβλητή `__name__`.

Το `url_prefix` θα μπαίνει στην αρχή των διευθύνσεων (URLs) που
αντιστοιχούν σε αυτό το προσχέδιο.

</div>

## Καταγραφή Προσχέδιου

* Για να αναγνωρίζει η εφαρμογή μας το προσχέδιο, θα πρέπει να το
  καταγράψουμε σε αυτήν.
  
* Όπως και προηγουμένως, προσθέτουμε τα παρακάτω στο τέλος της
  συνάρτησης `create_app()` στο `flaskr/__init__.py`, πριν από το
  `return app`:
  
  ```python
  from . import auth
  app.register_blueprint(auth.bp)
  ```

## Σελίδα Εγγραφής

* Η σελίδα εγγραφής χρήστη θα είναι διαθέσιμη στο μονοπάτι
  `/auth/register`.
  
* Η σελίδα αυτή θα επιστρέφει μια φόρμα προς συμπλήρωση.

* Όταν ο χρήστης την υποβάλει, η φόρμα θα ελέγχει τα δεδομένα και είτε
  θα πραγματοποιεί την εγγραφή είτε θα εμφανίζει τα τυχόν λάθη και θα
  οδηγεί το χρήστη εκ νέου στην ίδια σελίδα.

## Κώδικας εγγραφής

* Ο κώδικας της εγγραφής θα μπει στο αρχείο:

   ```
   flaskr/auth.py
   ```
   
## `flaskr/auth.py`

```python
@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.execute(
            'SELECT id FROM user WHERE username = ?', (username,)
        ).fetchone() is not None:
            error = f'User {username} is already registered.'

        if error is None:
            db.execute(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                (username, generate_password_hash(password))
            )
            db.commit()
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('auth/register.html')
```

<div class="notes">

Κατά την παραπάνω διαδικασία:

* Οι κωδικοί του χρήστη δεν αποθηκεύονται όπως τους δίνει·
  αποθηκεύουμε το αποτέλεσμα μιας συνάρτησης κατακερματισμού. Η
  προκαθορισμένη συνάρτηση κατακερματισμού που χρησιμοποιούμε είναι η
  SHA-256.
  
* Για να εξασφαλίσουμε τους κωδικούς από επιθέσεις, πριν δώσουμε τον
  κωδικό στη SHA-256, προσθέτουμε στην αρχή του έναν αριθμό τυχαίων
  χαρακτήρων (ο προκαθορισμένος αριθμός είναι 8). Αυτό ονομάζεται
  *αλάτι* (salt).
  
* Έτσι, στη βάση δεδομένων οι κωδικοί αποθηκεύονται ως:
   ```
   method$salt$hash
   ```

Όσον αφορά τη λειτουργία της φόρμας εγγραφής:

* Η εγγραφή του χρήστη θα γίνεται στο μονοπάτι `/auth/register`. Ο
  διακοσμητής `@bp.route` ορίζει το μονοπάτι `/register`. Αφού έχουμε
  δηλώσει παραπάνω ότι το προσχέδιο `auth` θα βρίσκεται στο μονοπάτι
  `/auth`, τελικά παίρνουμε το μονοπάτι `/auth/register`.
  
* Στον διακοσμητή δηλώνουμε επίσης ότι η συνάρτηση θα μπορεί να
  χειριστεί μεθόδους `HTTP GET` και `HTTP POST`. Αν ο χρήστης
  υποβάλλει τη φόρμα, η συνάρτηση `register()` θα καλείται ως
  αποτέλεσμα `HTTP POST`. Αν ο χρήστης διαβάζει τη φόρμα, θα καλείται
  ως αποτέλεσμα `HTTP GET`. 
  
* Το αντικείμενο `request` περιέχει τις πληροφορίες για την αίτηση
  HTTP που ήρθε από τον browser.

* Το αν βρισκόμαστε σε αίτηση `HTTP GET` ή `HTTP POST` φαίνεται από το
  πεδίο `request.post`.
  
* Αν βρισκόμαστε σε αίτηση `HTTP GET`, η συνάρτηση απλώς θα εμφανίσει
  τη σελίδα εγγραφής. Αυτό θα γίνει με την κλήση της
  `render_template()`, η οποία θα αποδώσει την ιστοσελίδα που
  περιγράφεται από το πρότυπο `auth/register.html` (το οποίο θα
  γράψουμε στη συνέχεια).
  
* Για να δούμε αν το όνομα και ο κωδικός του χρήστη συμφωνούν με αυτά
  που έχουν αποθηκευτεί στη βάση, εκτελούμε τον αντίστοιχο κώδικα SQL.
  Στον κώδικα αυτό, οι μεταβλητές τιμές δίνονται με `?` ώστε να
  αποφύγουμε [επιθέσεις ένεσης κώδικα (SQL
  injection)](https://en.wikipedia.org/wiki/SQL_injection).
  
* Η συνάρτηση `fetchone()` επιστρέφει ένα αποτέλεσμα, αν το βρει, ή
  `None`.
  
* Η συνάρτηση `url_for()` δημιουργεί το URL που αντιστοιχεί σε ένα
  συγκεκριμένο *άκρο* (endpoint) της εφαρμογής. Τα άκρα της εφαρμογής
  είναι οι συναρτήσεις που γράφουμε για τον χειρισμό των αιτήσεων του
  χρήστη. 
  
* Τα μηνύματα λάθους αποθηκεύονται με τη συνάρτηση `flash()` ώστε να
  τα εμφανίσουμε μετά στο χρήστη.
  
</div>

## Είσοδος

* Για την είσοδο του χρήστη, θα χρησιμοποιήσουμε την παρακάτω
  συνάρτηση `login()`, την οποία προσθέτουμε στο `flaskr/auth.py`:

   ```python
   @bp.route('/login', methods=('GET', 'POST'))
   def login():
	  if request.method == 'POST':
		  username = request.form['username']
		  password = request.form['password']
		  db = get_db()
		  error = None
		  user = db.execute(
			  'SELECT * FROM user WHERE username = ?', (username,)
		  ).fetchone()

		  if user is None:
			  error = 'Incorrect username.'
		  elif not check_password_hash(user['password'], password):
			  error = 'Incorrect password.'

		  if error is None:
			  session.clear()
			  session['user_id'] = user['id']
			  return redirect(url_for('index'))

		  flash(error)

	  return render_template('auth/login.html')
    ```

<div class="notes">

Για να χειριστούμε την είσοδο του χρήστη πρέπει να διακρίνουμε δύο
περιπτώσεις.

1. Ο χρήστης απλώς βλέπει τη σελίδα εισόδου. Στην περίπτωση αυτή, ο
   πελάτης (browser) στέλνει μια αίτηση με τη μέθοδο HTTP GET. Όπως
   και πριν, το πεδίο `method` του αντικειμένου `request` δείχνει τη
   μέθοδο με την οποία έγινε η αίτηση. Στην περίπτωση αυτή, η
   συνάρτηση δεν θα κάνει τίποτε παρά θα επιστρέψει τη σελίδα
   `auth/login.html`.

2. Ο χρήστης υποβάλλει το όνομα και τον κωδικό του στη σελίδα εισόδου.
   Στην περίπτωση αυτή, ο πελάτης (browser) στέλνει τα στοιχεία αυτά
   με τη μέθοδο HTTP POST. Αν τα στοιχεία δεν συμφωνούν με αυτά που
   ορίστηκαν στις ρυθμίσεις της εφαρμογής, θα επιστρέψουμε τη σελίδα
   `login.html` με το κατάλληλο λάθος. Αν τα στοιχεία είναι σωστά,
   τότε καθαρίζουμε το λεξικό της συνεδρίας, `session`, και στη
   συνέχεια αποθηκεύουμε σε αυτό το κλειδί `user_id` με τιμή το
   αναγνωριστικό του χρήστη. Μετά ανακατευθύνουμε το χρήστη στη
   κεντρική σελίδα.

Κατά τα παραπάνω:

* Ο έλεγχος του κωδικού του χρήστη γίνεται με την
  `check_password_hash()`, η οποία κατακερματίζει τον κωδικό
  προκειμένου να τον συγκρίνει με αυτόν που έχει αποθηκευτεί στη βάση.
  
* Το λεξικό `session` χρησιμοποιείται για την αποθήκευση δεδομένων
  μεταξύ των αιτήσεων του χρήστη. Τα δεδομένα αποθηκεύονται σε
  cookies, τα οποία υπογράφονται κρυπτογραφικά, ώστε να μην μπορούν να
  πειραχτούν. Ο browser στέλνει το cookie σε κάθε αίτηση.

</div>

## Εύρεση χρήστη σε κάθε αίτηση

* Θέλουμε πριν από *κάθε αίτηση* να ελέγχουμε ποιος είναι ο τρέχων
  χρήστης. 
  
* Για να το κάνουμε αυτό, προσθέτουμε την παρακάτω συνάρτηση στο
  `flaskr/auth.py`:
  
    ```python
	@bp.before_app_request
	def load_logged_in_user():
		user_id = session.get('user_id')

		if user_id is None:
			g.user = None
		else:
			g.user = get_db().execute(
				'SELECT * FROM user WHERE id = ?', (user_id,)
			).fetchone()
	```

<div class="notes">

Με το διακοσμητή `@bp.before_app_request` ορίζουμε ότι πριν
προχωρήσουμε στην εξυπηρέτηση κάθε αίτησης θα τρέχει η συνάρτηση που
ακολουθεί. Αναζητούμε το αναγνωριστικό του χρήστη από τη συνεδρία. Αν
δεν το βρούμε, θέτουμε στο `g.user` `None`. Αν το βρούμε, αναζητούμε το
συγεκριμένο χρήστη στη βάση. Αν τον βρούμε εκεί αποθηκεύουμε στο
`g.user` τον χρήστη που βρήκαμε, αλλιώς `None`.

Γιατί τον αναζητούμε στη βάση; Γιατί μπορεί να τον έχουμε διαγράψει,
αλλά η συνεδρία του να μην έχει λήξει ακόμα!

</div>

## Έξοδος

* Η έξοδος από την εφαρμογή θα γίνεται από το μονοπάτι `/logout`. 

* Για να βγάλουμε έναν χρήστη από την εφαρμογή, αφαιρούμε το
  αναγνωριστικό του από τη συνεδρία.
  
* Προσθέτουμε την παρακάτω συνάρτηση στο `flaskr/auth.py`:

    ```python
	@bp.route('/logout')
	def logout():
		session.clear()
		return redirect(url_for('index'))
    ```

<div class="notes">

Για να βγει ο χρήστης από την εφαρμογή, καθαρίζουμε τη συνεδρία του
χρήστη και τον ανακατευθύνουμε στην κεντρική σελίδα της εφαρμογής.

</div>

## Εφαρμογή αυθεντικοποίησης σε άλλες σελίδες

* Θέλουμε ο χρήστης να είναι αυθεντικοποιημένος για να μπορεί να
  δημιουργήσει, αλλάξει, και να σβήσει αναρτήσεις. 
  
* Ο ευκολότερος τρόπος να το κάνουμε αυτό είναι να φτιάξουμε ένα
  διακοσμητή. Μπορούμε να τον φτιάξουμε με την παρακάτω συνάρτηση στο
  `flaskr/auth.py`: 
  
   ```python
   def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
    ```

<div class="notes">

Εδώ βλέπουμε ότι χρησιμοποιούμε το διακοσμητή `@functools.wraps()`.
Ο σκοπός του είναι ο εξής. Με έναν διακοσμητή «τυλίγουμε» μια
συνάρτηση σε μία άλλη συνάρτηση. Οι συναρτήσεις στην Python, όμως,
έχουν διάφορες ιδιότητες, όπως την ιδιότητα `___name__`, τη
συμβολοσειρές τεκμηρίωσης (docstring), κ.λπ. Εμείς θέλουμε η νέα
συνάρτηση να διατηρεί τις ιδιότητες της παλιάς, και να μην παίρνει τις
ιδιότητες από τη συνάρτηση που την τυλίγει. Αυτό λοιπόν το
πετυχαίνουμε με το διακοσμητή `@functools.wraps()`.

</div>

# Πρότυπα Εμφάνισης

## Βασικό Πρότυπο Εμφάνισης

* Το βασικό πρότυπο των σελίδων μας θα δίνεται από τη σελίδα
  `base.html` στον κατάλογο `templates`.

    ```html
	<!doctype html>
	<title>{% block title %}{% endblock %} - Flaskr</title>
	<link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
	<nav>
	  <h1>Flaskr</h1>
	  <ul>
		{% if g.user %}
		  <li><span>{{ g.user['username'] }}</span>
		  <li><a href="{{ url_for('auth.logout') }}">Log Out</a>
		{% else %}
		  <li><a href="{{ url_for('auth.register') }}">Register</a>
		  <li><a href="{{ url_for('auth.login') }}">Log In</a>
		{% endif %}
	  </ul>
	</nav>
	<section class="content">
	  <header>
		{% block header %}{% endblock %}
	  </header>
	  {% for message in get_flashed_messages() %}
		<div class="flash">{{ message }}</div>
	  {% endfor %}
	  {% block content %}{% endblock %}
	</section>
    ```

<div class="notes">

Οι σελίδες HTML που θα εμφανίζονται στον χρήστη θα κατασκευάζονται
δυναμικά από την εφαρμογή μας. Για το σκοπό αυτό θα χρησιμοποιήσουμε
πρότυπα σχεδίασης σελίδων, τα οποία θα γεμίζουν με περιεχόμενα καθώς
εξυπηρετείται η αντίστοιχη αίτηση.

Το βασικό πρότυπο δίνει τη γενική δομή που θα έχουν όλες οι σελίδες
της εφαρμογής μας. Στο επάνω μέρος τους θα εμφανίζουν σύνδεσμο είτε
για είσοδο είτε για έξοδο του χρήστη από την εφαρμογή. Στη συνέχεια θα
εμφανίζουν τυχόν μηνύματα που περνάμε με τη μέθοδο `flash()`.

Το Flask χρησιμοποιεί το μηχανισμό
[Jinga](http://jinja.pocoo.org/docs/templates/) για την περιγραφή
των προτύπων. Αυτή τη στιγμή αρκεί να γνωρίζουμε ότι:

* Μπορούμε να συμπεριλάβουμε κώδικα μέσα σε `{% ... %}`. Ο κώδικας
  αυτός είναι εντολές σε μία γλώσσα που μοιάζει με την Python. Ο
  κώδικας αυτός θα καθορίσει τα περιεχόμενα της τελικής σελίδας HTML.
  Έτσι, στο παραπάνω πρότυπο, ορίζουμε τι θα εμφανιστεί αν ο χρήστης
  έχει ταυτοποιηθεί και τι αν δεν έχει, και εμφανίζουμε τα μηνύματα
  που έχουμε περάσει με τη συνάρτηση `flash()`.

* Με τη σύνταξη `{{ ... }}` μπορούμε να χρησιμοποιήσουμε εκφράσεις, η
  τιμή των οποίων θα αντικαταστήσει το `{{ ... }}`. Με τον τρόπο αυτό
  δίνουμε στην τελική σελίδα HTML τα σωστά URLs και τα εκάστοτε
  μηνύματα (δείτε το βρόχο `for`).

* Τα πρότυπα μπορεί να εντάσσονται σε μία ιεραρχία. Το παραπάνω βασικό
  πρότυπο μπορεί να επεκταθεί από άλλα, πιο εξειδικευμένα πρότυπα.
  Τα πρότυπα αυτά θα εισαχθούν στο σημείο `{% block body %}{%
  endblock %}`.

</div>

## Πρότυπο εγγραφής

* Η σελίδα εγγραφής επεκτείνει το βασικό πρότυπο. Τα πρότυπα των
  προσχεδίων μπαίνουν σε υποκαταλόγους που αντιστοιχούν σε κάθε
  προσχέδιο. 

* Δημιουργούμε τον κατάλογο `flaskr/templates/auth` και μετά το αρχείο
	`flaskr/templates/auth/register.html`:

    ```html
	{% extends 'base.html' %}

	{% block header %}
	  <h1>{% block title %}Register{% endblock %}</h1>
	{% endblock %}

	{% block content %}
	  <form method="post">
		<label for="username">Username</label>
		<input name="username" id="username" required>
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required>
		<input type="submit" value="Register">
	  </form>
	{% endblock %}
    ```

<div class="notes">

Η σελίδα `register.html` επεκτείνει τη `base.html`. Το τμήμα που
βρίσκεται ανάμεσα στο `{% block content %}` και το `{% endblock %}` θα
εισαχθεί στο τμήμα `{% block content %}{% endblock %}` της `base.html`.

Ενδιαφέρον έχει το τι γίνεται στο `{% block header %}`. Εκεί βλέπουμε
ότι χρησιμοποιούμε το `{% block title %}`. Έτσι, πρώτα θα δημιουργηθεί
το τμήμα του τίτλου και στη συνέχεια αυτό θα χρησιμοποιηθεί στο μπλοκ
της επικεφαλίδας. Έτσι, και η σελίδα και το παράθυρο θα έχουν τον ίδιο
τίτλο.

Προσέξτε επίσης τις ιδιότητες `required`. Αυτές ενημερώνουν τον
browser να μην υποβάλει τη φόρμα αν ο χρήστης δεν έχει συμπληρώσει τα
πεδία. Παλαιότεροι όμως browsers ενδέχεται να μην υποστηρίζουν τη
δυνατότητα αυτή. 

*Σε κάθε περίπτωση, ποτέ μα ποτέ δεν επαφειώμαστε client να κάνει
ελέγχους· πάντα τους κάνουμε και στον server!*

</div>

## Πρότυπο Εισόδου

* Η σελίδα εισόδου είναι η ίδια με τη σελίδα εγγραφής, εκτός από τον
  τίτλο και το κουμπί υποβολής.

* Δημιουργούμε το αρχείο `flaskr/templates/auth/login.html`:
 
    ```html
	{% extends 'base.html' %}

	{% block header %}
	  <h1>{% block title %}Log In{% endblock %}</h1>
	{% endblock %}

	{% block content %}
	  <form method="post">
		<label for="username">Username</label>
		<input name="username" id="username" required>
		<label for="password">Password</label>
		<input type="password" name="password" id="password" required>
		<input type="submit" value="Log In">
	  </form>
	{% endblock %}
	```

# Στατικά Αρχεία


## `flaskr/static/style.css`

```css
html {
  font-family: sans-serif;
  background: #eee;
  padding: 1rem;
}

body {
  max-width: 960px;
  margin: 0 auto;
  background: white;
}

h1, h2, h3, h4, h5, h6 {
  font-family: serif;
  color: #377ba8;
  margin: 1rem 0;
}

a {
  color: #377ba8;
}

hr {
  border: none;
  border-top: 1px solid lightgray;
}

nav {
  background: lightgray;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}

nav h1 {
  flex: auto;
  margin: 0;
}

nav h1 a {
  text-decoration: none;
  padding: 0.25rem 0.5rem;
}

nav ul  {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li a, nav ul li span, header .action {
  display: block;
  padding: 0.5rem;
}

.content {
  padding: 0 1rem 1rem;
}

.content > header {
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: flex-end;
}

.content > header h1 {
  flex: auto;
  margin: 1rem 0 0.25rem 0;
}

.flash {
  margin: 1em 0;
  padding: 1em;
  background: #cae6f6;
  border: 1px solid #377ba8;
}

.post > header {
  display: flex;
  align-items: flex-end;
  font-size: 0.85em;
}

.post > header > div:first-of-type {
  flex: auto;
}

.post > header h1 {
  font-size: 1.5em;
  margin-bottom: 0;
}

.post .about {
  color: slategray;
  font-style: italic;
}

.post .body {
  white-space: pre-line;
}

.content:last-child {
  margin-bottom: 0;
}

.content form {
  margin: 1em 0;
  display: flex;
  flex-direction: column;
}

.content label {
  font-weight: bold;
  margin-bottom: 0.5em;
}

.content input, .content textarea {
  margin-bottom: 1em;
}

.content textarea {
  min-height: 12em;
  resize: vertical;
}

input.danger {
  color: #cc2f2e;
}

input[type=submit] {
  align-self: start;
  min-width: 10em;
}
``` 

# Διαχείριση Αναρτήσεων

## Προσχέδιο Διαχείρισης Αναρτήσεων

* Οι υπόλοιπες λειτουργίες της εφαρμογής αφορούν τη διαχείριση του
  περιεχομένου του blog.
  
* Αυτές θα υλοποιηθούν μέσω του δικού τους προσχέδιου.

* Στη συνέχεια, θα καταγράψουμε το προσχέδιο στην εφαρμογή.

## Δημιουργία Προσχέδιου

* Ξεκινάμε το προσχέδιο δημιουργώντας το αρχείο:

   ```
   flaskr/blog.py
   ```
   
## `flaskr/blog.py`

```python
from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('blog', __name__)
```

<div class="notes">

Αυτή τη φορά, δεν δίνουμε τιμή στην παράμετρο `url_prefix`. Αυτό
σημαίνει ότι το προσχέδιο θα είναι προσβάσιμο από το μονοπάτι `/`.

</div>

## Καταγραφή Προσχέδιου

* Όπως και πριν, να αναγνωρίζει η εφαρμογή μας το προσχέδιο, θα πρέπει να το
  καταγράψουμε σε αυτήν.
  
* Συνεπώς, προσθέτουμε τα παρακάτω στο τέλος της συνάρτησης
  `create_app()` στο `flaskr/__init__.py`, πριν από το `return app`:
  
  ```python
  from . import blog
  app.register_blueprint(blog.bp)
  app.add_url_rule('/', endpoint='index')
  ```

<div class="notes">

Με τη συνάρτηση `add_url_rule()` ορίζουμε ότι το `index` θα συνδεθεί
με το μονοπάτι `/`. Επιπλέον, από εδώ και πέρα, και το
`url_for('index')` αλλά και το `url_for('blog.index')` θα αναφέρονται
στο ίδιο μονοπάτι `/`.

</div>

## Κεντρική Σελίδα

* Η κεντρική σελίδα θα δείχνει όλες τις αναρτήσεις, σε φθίνουσα
  χρονολογική σειρά. Προσθέτουμε την παρακάτω συνάρτηση στο
  `flaskr/blog.py`:
  
    ```python
	@bp.route('/')
	def index():
		db = get_db()
		posts = db.execute(
			'SELECT p.id, title, body, created, author_id, username'
			' FROM post p JOIN user u ON p.author_id = u.id'
			' ORDER BY created DESC'
		).fetchall()
		return render_template('blog/index.html', posts=posts)
    ```
   
## Πρότυπο Κεντρικής Σελίδας
   
* Για το πρότυπο της κεντρικής σελίδας θα δημιουργήσουμε τον κατάλογο
  `flaskr/templates/blog` και μέσα σε αυτόν θα φτιάξουμε το αρχείο
  `index.html`:
  
   ```html
   {% extends 'base.html' %}

	{% block header %}
	  <h1>{% block title %}Posts{% endblock %}</h1>
	  {% if g.user %}
		<a class="action" href="{{ url_for('blog.create') }}">New</a>
	  {% endif %}
	{% endblock %}

	{% block content %}
	  {% for post in posts %}
		<article class="post">
		  <header>
			<div>
			  <h1>{{ post['title'] }}</h1>
			  <div class="about">by {{ post['username'] }} on {{ post['created'].strftime('%Y-%m-%d') }}</div>
			</div>
			{% if g.user['id'] == post['author_id'] %}
			  <a class="action" href="{{ url_for('blog.update', id=post['id']) }}">Edit</a>
			{% endif %}
		  </header>
		  <p class="body">{{ post['body'] }}</p>
		</article>
		{% if not loop.last %}
		  <hr>
		{% endif %}
	  {% endfor %}
	{% endblock %}
	```
	
## Δημιουργία Ανάρτησης

* Η λογική της δημιουργίας ανάρτησης είναι αντίστοιχη με την εγγραφή,
  αλλά επιπλέον απαιτούμε ο χρήστης να έχει αυθεντικοποιηθεί, με χρήση
  του διακοσμητή `@login_required`. Προσθέτουμε την παρακάτω συνάρτηση
  στο `flaskr/blog.py`:

    ```python
	@bp.route('/create', methods=('GET', 'POST'))
	@login_required
	def create():
		if request.method == 'POST':
			title = request.form['title']
			body = request.form['body']
			error = None

			if not title:
				error = 'Title is required.'

			if error is not None:
				flash(error)
			else:
				db = get_db()
				db.execute(
					'INSERT INTO post (title, body, author_id)'
					' VALUES (?, ?, ?)',
					(title, body, g.user['id'])
				)
				db.commit()
				return redirect(url_for('blog.index'))

		return render_template('blog/create.html')	
	```
	
## Πρότυπο Δημιουργίας Ανάρτησης

* Δημιουργούμε το πρότυπο δημιουργίας ανάρτησης στο
  `flaskr/templates/blog/create.html`:
  
    ```html
	{% extends 'base.html' %}

	{% block header %}
	  <h1>{% block title %}New Post{% endblock %}</h1>
	{% endblock %}

	{% block content %}
	  <form method="post">
		<label for="title">Title</label>
		<input name="title" id="title" value="{{ request.form['title'] }}" required>
		<label for="body">Body</label>
		<textarea name="body" id="body">{{ request.form['body'] }}</textarea>
		<input type="submit" value="Save">
	  </form>
	{% endblock %}
	```

## Εύρεση Εγγραφής

```python
def get_post(id, check_author=True):
    post = get_db().execute(
        'SELECT p.id, title, body, created, author_id, username'
        ' FROM post p JOIN user u ON p.author_id = u.id'
        ' WHERE p.id = ?',
        (id,)
    ).fetchone()

    if post is None:
        abort(404, "Post id {0} doesn't exist.".format(id))

    if check_author and post['author_id'] != g.user['id']:
        abort(403)

    return post
```

## Ενημέρωση Εγγραφής

```python
@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    post = get_post(id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE post SET title = ?, body = ?'
                ' WHERE id = ?',
                (title, body, id)
            )
            db.commit()
            return redirect(url_for('blog.index'))

    return render_template('blog/update.html', post=post)
```

## Πρότυπο Ενημέρωσης Εγγραφής

```html
{% extends 'base.html' %}

{% block header %}
  <h1>{% block title %}Edit "{{ post['title'] }}"{% endblock %}</h1>
{% endblock %}

{% block content %}
  <form method="post">
    <label for="title">Title</label>
    <input name="title" id="title"
      value="{{ request.form['title'] or post['title'] }}" required>
    <label for="body">Body</label>
    <textarea name="body" id="body">{{ request.form['body'] or post['body'] }}</textarea>
    <input type="submit" value="Save">
  </form>
  <hr>
  <form action="{{ url_for('blog.delete', id=post['id']) }}" method="post">
    <input class="danger" type="submit" value="Delete" onclick="return confirm('Are you sure?');">
  </form>
{% endblock %}
```

## Διαγραφή

```python
@bp.route('/<int:id>/delete', methods=('POST',))
@login_required
def delete(id):
    get_post(id)
    db = get_db()
    db.execute('DELETE FROM post WHERE id = ?', (id,))
    db.commit()
    return redirect(url_for('blog.index'))
```
