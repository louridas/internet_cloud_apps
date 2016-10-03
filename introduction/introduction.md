% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Γενικά

------------------

## Αντικείμενο Μαθήματος

* Διαδικτυακές Εφαρμογές

* Νεφοϋπολογιστική (cloud computing)

------------------

## Απαιτήσεις Μαθήματος

* Δημιουργία πλήρους εφαρμογής

* Το αντικείμενο της εφαρμογής θα συμφωνηθεί στην αρχή
  του μαθήματος

------------------

# Διαδικτυακές Εφαρμογές

------------------

## Χαρακτηριστικά Διαδικτυακών Εφαρμογών

* Μοντέλο πελάτη-εξυπηρετητή (client-server)

* Ασύγχρονες (asynchronous)

* Πολυεπίπεδες (multi-tier)

------------------

## Συστατικά Διαδικτυακών Εφαρμογών

* Διεπαφή με τον χρήστη (user interface)

* Λογική εφαρμογής (application logic)

* Δεδομένα εφαρμογών


## Διεπαφή με τον χρήστη

* HTML, iOS, Android

* CSS (Bootstrap)

* JavaScript (Angular.js, React)


## Λογική Εφαρμογής

* Python (Flask, Django)

* Ruby (Ruby on Rails)

* Java (Spring)

* JavaScript (Node.js)


## Δεδομένα Εφαρμογών

* Σχεδιακές βάσεις δεδομένων (MySQL, PostgreSQL)

* Μη σχεσιακές βάσεις δεδομένων (MongoDB, Redis, Cassandra)



# Εισαγωγή στο Flask


## Εγκατάσταση Flask

```bash
pip install Flask
```

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

## Εκτέλεση

* Εκτελούμε το πρόγραμμα
```bash
python hello_world.py
```

* Η εφαρμογή είναι προσβάσιμη στο http://127.0.0.1:5000/

## Παραμετροποιημένο Hello World

* Προσθέτουμε την παρακάτω συνάρτηση κάτω από την πρώτη:

```python
@app.route('/user/<name>')
def user(name):
    return '<h1>Hello user %s!</h1>' % name
```

# Flask Tutorial

## Flaskr

* Εφαρμογή microblogging.

* Προσαρμοσμένο από την
  [τεκμηρίωση του Flask](http://flask.pocoo.org/docs/0.11/tutorial/).

## Δημιουργία περιβάλλοντος

* Δημιουργείστε την παρακάτω δομή καταλόγων:

```
/flaskr
    /static
    /templates
```

## Δημιουργία βάσης

* Δημιουργείστε ένα αρχείο `schema.sql` μέσα στον κατάλογο `flaskr`.

* Τα περιεχόμενα του αρχείου θα είναι:

```sql
drop table if exists entries;
create table entries (
  id integer primary key autoincrement,
  title text not null,
  'text' text not null
);
```

## Προοίμιο εφαρμογής

* Στον κατάλογο `flaskr` δημιουργείστε ένα αρχείο `flaskr.py`, στο
  οποίο θα γράφετε αυτά που ακολουθούν.

```python
# all the imports
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
    abort, render_template, flash
```

## Δημιουργία εφαρμογής

* Στη συνέχεια γράψτε τον παρακάτω κώδικα ο οποίος δημιουργεί την εφαρμογή.

```python
# create our little application :)
app = Flask(__name__)
```

## Ρυθμίσεις εφαρμογής

```python
# Load default config and override config from an environment variable

app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))

app.config.from_envvar('FLASKR_SETTINGS', silent=True)
```

## Σύνδεση με τη βάση

* Θα χρησιμοποιήσουμε τη βάση δεδομένων SQLite.

* Για να συνδεθούμε μαζί της, θα χρησιμοποιήσουμε την παρακάτω
  συνάρτηση.

```python
def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    # Return dictionaries instead of tuples
    rv.row_factory = sqlite3.Row
    return rv
```

## Αποσύνδεση από τη βάση

* Μετά από τη διαχείριση κάθε αίτησης, ή κάποιο λάθος, θα πρέπει να
αποσυνδεθούμε από τη βάση:

```python
@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()
```

## Εκκίνηση εφαρμογής σε Mac και Linux

* Για να ξεκινήσουμε την εφαρμογή σε Mac και Linux πρέπει καταρχήν να δώσουμε
  από τη γραμμή εντολών:

```bash
export FLASK_APP=flaskr.py
export FLASK_DEBUG=1
```
* Στη συνέχεια για να ξεκινήσουμε την εφαρμογή θα πρέπει να βρισκόμαστε μέσα
  στον κατάλογο `flaskr` και να δώσουμε:
```bash
flask run
```

## Εκκίνηση εφαρμογής σε MS-Windows

*  Για να ξεκινήσουμε την εφαρμογή σε MS-Windows πρέπει καταρχήν να δώσουμε
  από τη γραμμή εντολών:

```
set FLASK_APP=flaskr
set FLASK_DEBUG=1
python -m flask run
```

* Στη συνέχεια για να ξεκινήσουμε την εφαρμογή θα πρέπει να βρισκόμαστε μέσα
  στον κατάλογο `flaskr` και να δώσουμε:
```bash
python -m flask run
```

## Πρόσβαση στην εφαρμογή

* Για να δούμε την εφαρμογή πηγαίνουμε με τον browser στο
  http://127.0.0.1:5000/

* Αυτή τη στιγμή θα πάρουμε ένα μήνυμα λάθους, γιατί η εφαρμογή μας
  δεν δείχνει απολύτως τίποτε.

## Δημιουργία της βάσης

* Για να εκτελεστούν οι εντολές του `schema.sql` μέσα από το Flask,
  γράφουμε τα εξής:

```python
def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
```

## Εντολή δημιουργίας της βάσης

* Για να δημιουργούμε τη βάση κατά βούληση από τη γραμμή εντολών,
  προσθέτουμε στο αρχείο:

```python
@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')
```


* Αν όλα πάνε καλά μπορείτε να τρέξετε την παρακάτω εντολή για να
δημιουργηθεί η βάση σε MS-Windows:
```bash
pythoh -m flask initdb
```

* Εναλλακτικά, σε Mac OS ή Linux δίνετε:
```bash
flask initdb
```

## Εμφάνιση αναρτήσεων

* Οι αναρτήσεις θα εμφανίζονται στη ρίζα της εφαρμογής (`/`):

```python
@app.route('/')
def show_entries():
    db = get_db()
    cur = db.execute('select title, text from entries order by id desc')
    entries = cur.fetchall()
    return render_template('show_entries.html', entries=entries)
```

## Προσθήκη ανάρτησης

* Νέες αναρτήσεις θα προστίθενται στο μονοπάτι `/add`:

```python
@app.route('/add', methods=['POST'])
def add_entry():
    if not session.get('logged_in'):
        abort(401)
    db = get_db()
    db.execute('insert into entries (title, text) values (?, ?)',
                 [request.form['title'], request.form['text']])
    db.commit()
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))
```

## Είσοδος

* Οι χρήστες θα μπορούν να μπουν στην εφαρμογή με το μονοπάτι `/login`:

```python
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)
```

## Έξοδος

* Η έξοδος από την εφαρμογή θα γίνεται από το μονοπάτι `/logout`:

```python
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))
```

## Σκελετός εμφάνισης

* Ο βασικός σκελετός των σελίδων μας θα δίνεται από τη σελίδα
  `layout.html` στον κατάλογο `static`.

```html
<!doctype html>
<title>Flaskr</title>
<link rel=stylesheet type=text/css
      href="{{ url_for('static', filename='style.css') }}">
<div class=page>
  <h1>Flaskr</h1>
  <div class=metanav>
  {% if not session.logged_in %}
    <a href="{{ url_for('login') }}">log in</a>
  {% else %}
    <a href="{{ url_for('logout') }}">log out</a>
  {% endif %}
  </div>
  {% for message in get_flashed_messages() %}
    <div class=flash>{{ message }}</div>
  {% endfor %}
  {% block body %}{% endblock %}
</div>
```

## Εμφάνιση αναρτήσεων

* Η σελίδα εμφάνισης αναρτήσεων επεκτείνει το βασικό σκελετό.

* Δημιουργούμε το παρακάτω αρχείο `show_entries.html` στον κατάλογο
  `static`.

```html
{% extends "layout.html" %}
{% block body %}
  {% if session.logged_in %}
    <form action="{{ url_for('add_entry') }}" method=post class=add-entry>
      <dl>
        <dt>Title:
        <dd><input type=text size=30 name=title>
        <dt>Text:
        <dd><textarea name=text rows=5 cols=40></textarea>
        <dd><input type=submit value=Share>
      </dl>
    </form>
  {% endif %}
  <ul class=entries>
  {% for entry in entries %}
    <li><h2>{{ entry.title }}</h2>{{ entry.text|safe }}
  {% else %}
    <li><em>Unbelievable.  No entries here so far</em>
  {% endfor %}
  </ul>
{% endblock %}
```

## Είσοδος

* Η σελίδα εμφάνισης αναρτήσεων επεκτείνει επίσης το βασικό σκελετό.

* Δημιουργούμε το παρακάτω αρχείο `login.html` στον κατάλογο
  `static`.

```html
{% extends "layout.html" %}
{% block body %}
  <h2>Login</h2>
  {% if error %}<p class=error><strong>Error:</strong> {{ error }}{% endif %}
  <form action="{{ url_for('login') }}" method=post>
    <dl>
      <dt>Username:
      <dd><input type=text name=username>
      <dt>Password:
      <dd><input type=password name=password>
      <dd><input type=submit value=Login>
    </dl>
  </form>
{% endblock %}
```

## Στυλ

* Για να δώσουμε στυλ στην εφαρμογή μας, δημιοργούμε το αρχείο
  `style.css` στον κατάλογο `static`.

```css
body            { font-family: sans-serif; background: #eee; }
a, h1, h2       { color: #377ba8; }
h1, h2          { font-family: 'Georgia', serif; margin: 0; }
h1              { border-bottom: 2px solid #eee; }
h2              { font-size: 1.2em; }

.page           { margin: 2em auto; width: 35em; border: 5px solid #ccc;
                  padding: 0.8em; background: white; }
.entries        { list-style: none; margin: 0; padding: 0; }
.entries li     { margin: 0.8em 1.2em; }
.entries li h2  { margin-left: -1em; }
.add-entry      { font-size: 0.9em; border-bottom: 1px solid #ccc; }
.add-entry dl   { font-weight: bold; }
.metanav        { text-align: right; font-size: 0.8em; padding: 0.3em;
                  margin-bottom: 1em; background: #fafafa; }
.flash          { background: #cee5F5; padding: 0.5em;
                  border: 1px solid #aacbe2; }
.error          { background: #f0d6d6; padding: 0.5em; }
```
