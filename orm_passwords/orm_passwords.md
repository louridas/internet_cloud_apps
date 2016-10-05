% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Object Relational Mapping

## SQLAlchemy

* Η πιο δημοφιλής βιβλιοθήκη για ORM στην Python είναι η
  [SQLAlchemy](http://www.sqlalchemy.org/).

* Αν θέλουμε να τη χρησιμοποιήσουμε με το Flask, μπορούμε να
  εγκαταστήσουμε το πακέτο
  [Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/).

```bash
pip install flask-sqlalchemy
```

## Εγκατάσταση iPython

```bash
pip install iPython
```

# Microblog με Flask-SQLAlchemy

## Δημιουργία περιβάλλοντος

* Δημιουργείστε την παρακάτω δομή καταλόγων.

* Στους καταλόγους `static`
  και `templates` θα αντιγράψετε τα αρχεία που δημιουργήσατε στην
  έκδοση του microblog που είδαμε στην πρώτη διάλεξη.

    ```
    /flaskr_orm_1
        /static
        /templates
    ```

## Προοίμιο εφαρμογής

* Στον κατάλογο `flaskr_orm_1` δημιουργείστε ένα αρχείο `flaskr.py`, στο
  οποίο θα γράφετε αυτά που ακολουθούν.

    ```python
    from flask import Flask
    from flask import Flask, request, session, g, redirect, url_for, abort, \
         render_template, flash

    from flask_sqlalchemy import SQLAlchemy

    app = Flask(__name__)
    app.config.from_object(__name__)

    app.config.update(dict(
        SECRET_KEY='development key',
        USERNAME='admin',
        PASSWORD='default',
        SQLALCHEMY_DATABASE_URI = 'sqlite:///flaskr.db',
        SQLALCHEMY_TRACK_MODIFICATIONS = False
    ))

    app.config.from_envvar('FLASKR_SETTINGS', silent=True)

    db = SQLAlchemy(app)
    ```

## Μοντέλο βάσης

* Αυτή τη φορά δεν θα χρειαστεί να γράψουμε κώδικα SQL για τον ορισμό
  του πίνακα `entries`.

* Ο πίνακας θα οριστεί μέσω αντίστοιχης κλάσης Python.

    ```python
    class Entry(db.Model):
        __tablename__ = 'entries'
        id = db.Column(db.Integer, primary_key=True)
        title = db.Column(db.String(120), nullable=False)
        text = db.Column(db.Text(), nullable=False)

        def __init__(self, title="", text=""):
            self.title = title
            self.text = text

        def __repr__(self):
            return '<Entry %r %r>' % (self.title, self.text)
    ```

## Δημιουργία βάσης

* Έχοντας γράψει τον παραπάνω κώδικα, μπορούμε να δημιουργήσουμε τη
  βάση μας κατ' ευθείαν από μία γραμμή εντολών Python.

* Ξεκινάμε την Python μέσα στον κατάλογο `flaskr_orm_1`
  πληκτρολογόντας `python`, ή καλύτερα `ipython`.

* Στη συνέχεια γράφουμε:

    ```python
    from flaskr import db
    db.create_all()
    ```

## Εισαγωγή δεδομένων

* Τώρα μπορούμε να χειριστούμε πλήρως τη βάση μας από τη γραμμή
  εντολών της Python.

* Για παράδειγμα, για να εισάγουμε δύο αναρτήσεις, γράφουμε:

    ```python
    from flaskr import Entry

    entry_1 = Entry("First Entry", "This is the first entry")
    entry_2 = Entry("Second Entry", "This is the second entry")

    db.session.add(entry_1)
    db.session.add(entry_2)
    db.session.commit()
    ```

## Αναζήτηση δεδομένων

* Για να κάνουμε μια αναζήτηση στα δεδομένα, γράφουμε:

    ```python

    entries = Entry.query.all()
    entries
    ```

## Διαγραφή δεδομένων

* Για να διαγράψουμε τα δεδομένα, γράφουμε:

    ```python
    Entry.query.delete()
    db.session.commit()
    ```

## Εμφάνιση αναρτήσεων

* Θα συνεχίσουμε με τη συγγραφή των μεθόδων για το χειρισμό των
  λειτουργιών της υπηρεσίας.

* Η εμφάνιση των αναρτήσεων, με τη χρήση πλέον Flask-SQLAlchemy,
  είναι:

    ```python
    @app.route('/')
    def show_entries():
        entries = Entry.query.all()
        return render_template('show_entries.html', entries=entries)
    ```

## Προσθήκη ανάρτησης

* Αντίστοιχα, η προσθήκη αναρτήσεων γίνεται:

    ```python
    @app.route('/add', methods=['POST'])
    def add_entry():
        if not session.get('logged_in'):
            abort(401)
        entry = Entry(request.form['title'], request.form['text'])
        db.session.add(entry)
        db.session.commit()
        flash('New entry was successfully posted')
        return redirect(url_for('show_entries'))
    ```

## Λοιπές λειτουργίες και εκκίνηση

* Οι άλλες δύο λειτουργίες, είσοδος και έξοδος, παραμένουν ως έχουν.

* Συνεπώς, απλώς αντιγράψτε τες από την προηγούμενη έκδοση της
  εφαρμογής.

* Για να τρέξετε την εφαρμογή δίνετε ότι και στην προηγούμενη έκδοση.

# Microblog με Πολλαπλούς Χρήστες

## Δημιουργία περιβάλλοντος

* Δημιουργείστε την παρακάτω δομή καταλόγων.

    ```
    /flaskr_orm_2
        /static
        /templates
    ```

## Προοίμιο εφαρμογής

* Στον κατάλογο `flaskr_orm_2` δημιουργείστε ένα αρχείο `flaskr.py`, στο
  οποίο θα γράφετε αυτά που ακολουθούν.

    ```python

    from flask import Flask
    from flask import Flask, request, session, g, redirect, url_for, abort, \
         render_template, flash

    from flask_sqlalchemy import SQLAlchemy

    from datetime import datetime

    app = Flask(__name__)
    app.config.from_object(__name__)

    app.config.update(dict(
        SECRET_KEY='development key',
        SQLALCHEMY_DATABASE_URI = 'sqlite:///flaskr.db',
        SQLALCHEMY_TRACK_MODIFICATIONS = False
    ))

    app.config.from_envvar('FLASKR_SETTINGS', silent=True)

    db = SQLAlchemy(app)
    ```

## Μοντέλο βάσης: αναρτήσεις

* Τώρα θα επεκτείνουμε το μοντέλο της βάσης μας ώστε να έχουμε πολλούς
  χρήστες.

* Ο χρήστης θα μπορεί να δημιουργεί αναρτήσεις.

* Κάθε ανάρτηση θα ανήκει σε έναν χρήστη.

* Το μοντέλο των αναρτήσεων θα είναι το ακόλουθο.

## Κώδικας αναρτήσεων


```python
class Entry(db.Model):
    __tablename__ = 'entries'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    text = db.Column(db.Text(), nullable=False)
    datetime = db.Column(db.DateTime(), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, title, text, user_id, datetime):
        self.title = title
        self.text = text
        self.user_id = user_id
        self.datetime = datetime

    def __repr__(self):
        return '<Entry %r %r %r %r>' % (self.title, self.text,
                                        self.user_id, self.datetime)
```

## Μοντέλο βάσης: χρήστες

* Ο κάθε χρήστης θα έχει όνομα, επώνυμο, κωδικό, e-mail.

* Επίσης κάθε χρήστης έχει ένα σύνολο αναρτήσεων που έχει δημιουργήσει.

## Κώδικας χρηστών

```python
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20),
                         nullable=False,
                         unique=True,
                         index=True)
    password = db.Column(db.String(30), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    surname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    entries = db.relationship('Entry', backref='user',
                              lazy='dynamic')

    def __init__(self, username, name, surname, email, password):
        self.username = username
        self.name = name
        self.surname = surname
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r %r %r %r>' % (self.username, self.email,
                                       self.name, self.surname)
```

## Δημιουργία βάσης

* Για να δημιουργήσουμε τη βάση θα χρησιμοποιήσουμε και πάλι τη γραμμή
  εντολών της Python ή iPython:

    ```python
    from flaskr import *
    db.create_all()
    ```

## Εισαγωγή χρηστών

* Αυτή τη στιγμή δεν θα υλοποιήσουμε τη διαδικασία εγγραφής χρηστών
  μέσα στην εφαρμογή, οπότε απλώς θα τους εισάγουμε απ' ευθείας μέσω
  της γραμμής εντολών Python:
  

    ```python

    from flaskr import *

    user_1 = User("louridas", "Panos", "Louridas", "louridas@aueb.gr", "12345")

    user_2 = User("johndoe", "John", "Doe", "johndoe@gmail.com", "54321")

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.commit()
    ```
	
## Εμφάνιση αναρτήσεων

* Για να δούμε τις αναρτήσεις θα κάνουμε αναζήτηση στη βάση μέσω
  SQLAlchemy:
  

    ```python
    @app.route('/')
    def show_entries():
        entries = Entry.query.order_by(Entry.datetime.desc()).all()
        return render_template('show_entries.html', entries=entries)
    ```

## Προσθήκη ανάρτησης

* Όταν ο χρήστης δημιουργεί μια νέα ανάρτηση θα πρέπει να αποθηκεύουμε
  στη βάση:
      * τον τίτλο
      * το κείμενό της
      * ποιος χρήστης έκανε την ανάρτηση,
      * ποια ακριβώς χρονική στιγμή

* Ταυτόχρονα, η εισαγωγή θα γίνει μέσω SQLAlchemy.


## Κώδικας προσθήκης

```python
@app.route('/add', methods=['POST'])
def add_entry():
    user_id = session.get('user_id')
    if user_id is None:
        abort(401)
    entry = Entry(request.form['title'],
                  request.form['text'],
                  user_id,
                  datetime.now()
    )
    db.session.add(entry)
    db.session.commit()
    flash('New entry was successfully posted')
    return redirect(url_for('show_entries'))
```

## Είσοδος

```python
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user is None:
            error = 'Invalid username'
        elif request.form['password'] != user.password:
            error = 'Invalid password'
        else:
            session['user_id'] = user.id
            session['username'] = user.username
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)
```

## Έξοδος

```python
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))
```

## Βασικό πρότυπο εμφάνισης

* Το βασικό πρότυπο των σελίδων μας θα δίνεται από τη σελίδα
  `layout.html` στον κατάλογο `static`.

    ```html
    <!doctype html>
    <title>Flaskr</title>
    <link rel=stylesheet type=text/css
          href="{{ url_for('static', filename='style.css') }}">
    <div class=page>
      <h1>Flaskr</h1>
      <div class=metanav>
      {% if not session.user_id %}
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

* Η σελίδα εμφάνισης αναρτήσεων επεκτείνει το βασικό πρότυπο.

* Δημιουργούμε το ακόλουθο αρχείο `show_entries.html` στον κατάλογο
  `static`.


## Κώδικας εμφάνισης

```html
{% extends "layout.html" %}
{% block body %}
  {% if session.user_id %}
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
    <li><h2>{{ entry.title }}</h2>
      {{ entry.user.username }} {{ entry.datetime }}
      <p>
      {{ entry.text|safe }}
      </p>
  {% else %}
    <li><em>Unbelievable.  No entries here so far</em>
  {% endfor %}
  </ul>
{% endblock %}
```

## Είσοδος

* Η σελίδα εμφάνισης αναρτήσεων επεκτείνει επίσης το βασικό πρότυπο.

* Δημιουργούμε το ακόλουθο αρχείο `login.html` στον κατάλογο
  `static`.

## Κώδικας εισόδου 

```html
{% extends "layout.html" %}
{% block body %}
  <h2>Login</h2>
  {% if error %}
    <p class=error><strong>Error:</strong> {{ error }}
  {% endif %}
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

<div class="notes">

Αντίστοιχα, η σελίδα `login.html` επεκτείνει τη `layout.html`,
εισάγοντας σε αυτήν τη φόρμα της εισαγωγής του ονόματος και του
κωδικού του χρήστη.

</div>

## Στυλ

* Για να δώσουμε στυλ στην εφαρμογή μας, δημιουργούμε το αρχείο
  `style.css` στον κατάλογο `static`:

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


# Χειρισμός Κωδικών

## Το πρόβλημα

* Μέχρι τώρα, οι κωδικοί των χρηστών αποθηκεύονται στη βάση έτσι όπως
  ακριβώς δίνονται.

* Αυτό είναι τεράστιο πρόβλημα ασφαλείας.

* Οι κωδικοί πρέπει να αποθηκεύονται με τρόπο τέτοιο ώστε να μην είναι
  δυνατόν να διαπιστωθούν τα περιεχόμενά τους, ακόμα και αν έχουμε
  πλήρη πρόσβαση στη βάση.

* Για το σκοπό αυτό οι κωδικοί κρυπτογραφούνται με κατάλληλη συνάρτητη
  κατακερματισμού. 

## Bcrypt

* Κατ' αρχήν θα πρέπει να εγκαταστήσουμε τη βιβλιοθήκη bcrypt.

    ```bash
    pip3 install bcrypt
    ```

## Φόρμα εγγραφής

* Αυτή τη φορά θα εμπλουτίσουμε την εφαρμογή με τη δυνατότητα online
  εγγραφής χρηστών.

* Η φόρμα εγγραφής θα είναι η ακόλουθη, την οποία θα την αποθηκεύσουμε
  με το όνομα `register.html` στον κατάλογο `templates`.


## Κώδικας φόρμας


```html
{% extends "layout.html" %}
{% block body %}
  <h2>Register</h2>
  {% if error %}
    <p class=error><strong>Error:</strong> {{ error }}
  {% endif %}
  <form action="{{ url_for('register') }}" method=post>
    <dl>
      <dt>Name:
      <dd><input type=text name=name>
      <dt>Surname:
      <dd><input type=text name=surname>
      <dt>email:
      <dd><input type=email name=email>
      <dt>Username:
      <dd><input type=text name=username>
      <dt>Password:
      <dd><input type=password name=password>
      <dt>Repeat Password:
      <dd><input type=password name=repeat-password>
      <dd><input type=submit value=Register>
    </dl>
  </form>
{% endblock %}
```

## Εγγραφή χρηστών

* Ο χειρισμός της εγγραφής θα γίνεται από την παρακάτω συνάρτηση, η
  οποία θα απαντά σε αιτήσεις στο μονοπάτι `/register`.

    ```python
    @app.route('/register', methods=['GET', 'POST'])
    def register():
        error = None
        if request.method == 'POST':
            password = bcrypt.hashpw(request.form['password'].encode('utf8'),
                                     bcrypt.gensalt())
            user = User(request.form['username'],
                        request.form['name'],
                        request.form['surname'],
                        request.form['email'],
                        password)
            db.session.add(user)
            try:
                db.session.commit()
                session['user_id'] = user.id
                session['username'] = user.username
            except exc.SQLAlchemyError as ex:
                error = 'Error inserting record in the database'
            if not error:
                flash('Registration successful')
                return redirect(url_for('show_entries'))
        return render_template('register.html', error=error)
    ```

## Είσοδος

* Η διαδικασία εισόδου του χρήστη θα πρέπει να αλλάξει ελαφρώς,
  προκειμένου να ελέγχεται ο κρυπτογραφημένος κωδικός.

    ```python
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        error = None
        if request.method == 'POST':
            user = User.query.filter_by(username=request.form['username']).first()
            if user is None:
                error = 'Invalid username'
            elif not bcrypt.checkpw(request.form['password'].encode('utf8'),
                                    user.password):
                error = 'Invalid password'
            else:
                session['user_id'] = user.id
                session['username'] = user.username
                flash('You have been logged in')
                return redirect(url_for('show_entries'))
        return render_template('login.html', error=error)
    ```

## Βασικό πρότυπο εμφάνισης

* Το βασικό πρότυπο εμφάνισης επίσης πρέπει να αλλαχθεί λίγο, ώστε στο
  πάνω μέρος να εμφανίζουμε όταν πρέπει το σύνδεσμο για είσοδο ή για
  εγγραφή.

    ```html
    <!doctype html>
    <title>Flaskr</title>
    <link rel=stylesheet type=text/css
          href="{{ url_for('static', filename='style.css') }}">
    <div class=page>
      <h1>Flaskr</h1>
      <div class=metanav>
      {% if not session.user_id %}
        <a href="{{ url_for('login') }}">log in</a>
        {% if request.path != '/register' %} 
          or
          <a href="{{ url_for('register') }}">register</a>
        {% endif %}
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

# MySQL

## Εγκατάσταση MySQL

* Πηγαίνετε στο
  [http://dev.mysql.com/downloads/](http://dev.mysql.com/downloads/)
  και κατεβάστε την τελευταία έκδοση του MySQL Community Server.

* Επίσης, πηγαίνετε στο
  [http://dev.mysql.com/downloads/](http://dev.mysql.com/downloads/)
  και κατεβάστε την τελευταία έκδοση του MySQL Workbench.

## Εγκατάσταση οδηγού

* Για να επικοινωνήσουμε με τη MySQL από προγράμματα Python
  χρειαζόμαστε τον κατάλληλο *οδηγό* (driver).

* Κατεβάστε και εγκαταστήστε τον οδηγό
  [Connector/Python](http://dev.mysql.com/downloads/connector/python/).

## Δημιουργία βάσης

* Δημιουργείστε τη βάση `flaskr` εισάγοντας τις ακόλουθες εντολές SQL
  στον MySQL Workbench:

    ```sql
    CREATE DATABASE flaskr CHARACTER SET utf8 COLLATE utf8_general_ci;

    CREATE USER 'flaskr_user'@'localhost' IDENTIFIED BY 'aojkqw3m2t';

    GRANT ALL PRIVILEGES ON flaskr.* TO 'flaskr_user'@'localhost';
    ```

## Ρύθμιση για χρήση MySQL

* Δημιουργείστε στον κατάλογο `flaskr` ένα αρχείο `config.py` στο
  οποίο θα εισάγετε την παρακάτω γραμμή:

    ```python
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://flaskr_user:aojkqw3m2t@localhost/flaskr'
    ```

* Στη συνέχεια, αν έχετε υπολογιστή MS-Windows, δώστε το παρακάτω στη
  γραμμή εντολών:

    ```
    set FLASKR_SETTINGS=config.py
    ```

* Αν έχετε υπολογιστή Linux ή Mac, δώστε το παρακάτω στη γραμμή
  εντολών:

    ```bash
    export FLASKR_SETTINGS=config.py
    ```

## Δημιουργία πινάκων

* Για να δημιουργήσουμε τους πίνακες της βάσης μας (entries, users)
  μπορούμε πάλι να χρησιμοποιήσουμε τη γραμμή εντολών Python:

    ```python
    from flaskr import db
    db.create_all()
    ```

## Δημιουργία πινάκων

* Εναλλακτικά, μπορούμε να δημιουργήσουμε αντίστοιχη εντολή,
  προσθέτοντας στο αρχείο `flaskr.py`:

    ```python
    @app.cli.command('initdb')
    def initdb_command():
        """Initializes the database."""
        db.create_all()
        print('Initialized the database.')
    ```

* Οπότε μπορούμε να δώσουμε από τη γραμμή εντολών:

    ```bash
    flask initdb
    ```

* Αυτό θα μπορούσαμε να το είχαμε κάνει προηγουμένως με την SQLite·
  απλώς προτιμούσαμε να χρησιμοποιούμε τη γραμμή εντολών της Python.

## Επόμενα βήματα

* Δεν υπάρχουν!

