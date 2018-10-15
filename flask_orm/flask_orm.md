% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Object Relational Mapping

## Γενικά

* Οι περισσότερες βάσεις δεδομένουν χρησιμοποιούν το *σχεσιακό
  μοντέλο* (relational model).

* Στα προγράμματα που γράφουμε όμως, δεν έχουμε σχέσεις. Έχουμε
  αντικείμενα και άλλες δομές δεδομένων.

* Πρέπει λοιπόν να μεταφράζουμε μεταξύ των σχέσεων και των
  αντικειμένων του προγράμματός μας.


## Επιπλέον προβλήματα

* Στις σχεσιακές βάσεις δεδομένων χρησιμοποιούμε SQL.

* Στα προγράμματά μας χρησιμοποιούμε άλλες γλώσσες.

* Πρέπει λοιπόν ταυτόχρονα να χρησιμοποιούμε SQL συν ό,τι άλλες
  γλώσσες χρειαζόμαστε.

* Ο κώδικας SQL ελέγχεται μόνο κατά τη διάρκεια εκτέλεσης του
  προγράμματος (runtime).


## Απεικόνιση αντικειμένων-οντοτήτων

* Η *απεικόνιση αντικεμένων-οντοτήτων* (Object Relational Mapping,
  ORM) είναι μια σειρά τεχνολογιών με τις οποίες τα αντικείμενα που
  χρησιμοποιούμε στην εφαρμογή μας μεταφράζονται αυτομάτως σε σχέσεις.

* Υπάρχουν πολλές υλοποιήσεις, σε πολλές γλώσσες.


## SQLAlchemy

* Η πιο δημοφιλής βιβλιοθήκη για ORM στην Python είναι η
  [SQLAlchemy](http://www.sqlalchemy.org/).

* Αν θέλουμε να τη χρησιμοποιήσουμε με το Flask, μπορούμε να
  εγκαταστήσουμε το πακέτο
  [Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/).

    ```bash
    pip install flask-sqlalchemy
    ```

## Εγκατάσταση IPython

* Θα χρειαστεί να χρησιμοποιήσουμε αρκετές φορές τη γραμμή εντολών της
  Python.

* Επειδή η γραμμή εντολών της Python είναι λίγο δύσχρηστη, στην πράξη
  χρησιμοποιούμε το εργαλείο [IPython](https://ipython.org/).

* Αν δεν είναι διαθέσιμο στο σύστημά μας, για να το εγκαταστήσουμε
  δίνουμε:

    ```bash
    pip install ipython
    ```

* Στο εξής μπορούμε να δίνουμε `ipython` για να ξεκινάμε μία γραμμή
  εντολών της Python.

<div class="notes">

Το IPython έχει πολλές δυνατότητες που κάνουν την αλληλεπίδραση με την
Python ευκολότερη. Επιγραμματικά:

* Συμπλήρωση εντολών (command line completion). Καθώς πληκτρολογούμε
κάτι σε Python, μπορούμε να πατάμε Tab οπότε θα φαίνονται η διαθέσιμες
επιλογές για τη συμπλήρωση της εντολής μας.

* Πλήρες ιστορικό εντολών (command history). Μπορούμε να πλοηγηθούμε
στις εντολές που έχουμε δώσει χρησιμοποιώντας τα βελάκια άνω και κάτω.

* Αντιγραφή και επικόλληση (copy and paste). Μπορούμε να αντιγράφουμε
εύκολα κώδικα από και προς το IPython.

Για μία σύντομη εισαγωγή, μπορείτε να δείτε
την
[online τεκμηρίωση](http://ipython.readthedocs.io/en/stable/interactive/tutorial.html).

</div>

# Microblog με Flask-SQLAlchemy

## Από SQL σε SQLAlchemy

* Θα μετατρέψουμε την εφαρμογή που γράψαμε στις προηγούμενες διαλέξεις
  ώστε να χρησιμοποιεί SQLAlchemy.

* Θα δούμε ότι με τον τρόπο αυτό δεν θα γράψουμε καθόλου κώδικα SQL.


## Μοντέλο βάσης

* Αυτή τη φορά δεν θα χρειαστεί να γράψουμε κώδικα SQL για τον ορισμό
  των πινάκων της βάσης.

* Θα τους ορίσουμε μέσω Python, στο αρχείο `flaskr/models.py`.

## `models.py`

```python
from sqlalchemy.sql import func

from flaskr import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120),
                         nullable=False,
                         unique=True,
                         index=True)
    password = db.Column(db.String(150), nullable=False)

    def __repr__(self):
        return '<User %r>' % (self.username,)

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    created = db.Column(db.DateTime(), nullable=False,
                        server_default=func.now())
    author_id = db.Column(db.Integer,
                          db.ForeignKey('users.id'),
                          nullable=False)
    author = db.relationship('User', lazy=True
                             backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return '<Post %r %r %r %r>' % (self.title, self.body, self.created,
                                       self.author.username)
```

<div class="notes">

Στο SQLAlchemy θα απεικονίζουμε τους πίνακες της βάσης μέσω κλάσεων
στην Python. Οι κλάσεις θα πρέπει να είναι απόγονοι της κλάσης
`db.Model`. Η αντιστοίχηση μεταξύ της κλάσης και του πίνακα στη βάση
δεδομένων γίνεται με την ιδιότητα `__tablename__`. Προσέξτε τη σύμβαση
στην ονοματολογία: τα ονόματα των κλάσεων στις γλώσσες
προγραμμματισμού είναι στον *ενικό*. Τα ονόματα των πινάκων είναι
συνήθως στον *πληθυντικό*. Θα δημιουργήσουμε δύο κλάσεις:
  * `User` για τους χρήστες
  * `Post` για τις αναρτήσεις.

Ξεκινώντας από την κλάση `User`, o πίνακας `users` θέλουμε να έχει ως
στήλες έναν κωδικό (`id`), ένα όνομα χρήστη (`username`), και ένα
κωδικό εισόδου (`password`). Το κάθε ένα από αυτά ορίζεται μέσω
κατάλληλης κλήσης της μεθόδου `db.Column()`. Η πρώτη παράμετρος της
μεθόδου δίνει τον τύπο της στήλης και επιπλέον παράμετροι δίνουν
ιδιότητες, όπως αν πρόκειται για κλειδί, αν επιτρέπονται οι τιμές
null, κ.λπ. Περισσότερες πληροφορίες μπορείτε να βρείτε στην
[τεκμηρίωση του
Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/models/). Αν
θέλετε να εμβαθύνετε, δείτε την [τεκμηρίωση του
SQLAlchemy](http://docs.sqlalchemy.org/en/latest/index.html).

Η μέθοδος `__repr__()` θα μας εκτυπώνει μια αναπάρασταση του
κάθε αντικειμένου τύπου `Entry`. Μοιάζει με τη μέθοδο `__str__`,
αλλά ενώ η μέθοδος `__str__` δημιουργεί απλώς μια συμβολοσειρά από το
αντικείμενό μας, η μέθοδος `__repr__` δημιουργεί μια συμβολοσειρά η
οποία περιέχει όλη την πληροφορία που χρειαζόμαστε για να το
κατασκευάσουμε, αν θέλουμε. Αντίστοιχα με το `%s`, το οποίο όταν
εμφανίζεται σε μία συμβολοσειρά θα αντικασταθεί με μία κλήση της
`__str__`, το `%r` θα αντικατασταθεί με μία κλήση της `__repr__`.

Η κλάση `Post` δηλώνεται και αυτή ως απόγονος της κλάσης `db.Model`
και μας επιτρέπει να δούμε κάποιες επιπλέον δυνατότητες του
SQLAlchemy. Το:

```python
created = db.Column(db.DateTime(), nullable=False,
                    server_default=func.now())
```
δηλώνει μια στήλη όπου θα αποθηκεύεται η ημερομηνία και η ώρα της
ανάρτησης, και η τιμή της οποίας θα δίνεται από τη βάση, όχι από την
εφαρμογή μας.

</div>

## Δήλωση Συσχέτισης

* Τη συσχέτιση μεταξύ των δύο πινάκων `users` και `posts` τη δηλώνουμε
  με τις παρακάτω γραμμές:

   ```python
   author_id = db.Column(db.Integer,
                         db.ForeignKey('users.id'),
                         nullable=False)
   author = db.relationship('User', lazy=True
                            backref=db.backref('posts', lazy=True))
   ```

* Με τα παραπάνω, μπορούμε:
  * από μία ανάρτηση `my_post` να πηγαίνουμε στον χρήστη που την
    ανέρτησε, με `my_post.user`.
  * από μία ανάρτηση να βρίσκουμε το `id` του χρήστη που την ανέρτησε,
    με `my_post.user_id` (ή φυσικά με `my_post.user.id`).
  * από έναν χρήστη `a_user` να βρίσκουμε τις αναρτήσεις του με
    `a_user.posts`.

## Αναζήτηση Συσχέτισης

* Η παράμετρος `lazy` δηλώνει με ποιον τρόπο θα γίνει η αναζήτηση της
  συσχετιζόμνης οντότητας σε μία συσχέτιση.
  
* Μπορεί να πάρει τις εξής τιμές:

  * `select` ή `True`: η αναζήτηση της συσχέτισης θα γίνει όταν
     χρειαστεί με ένα `SELECT`.
  * `joined` ή `False`: η αναζήτηση της συσχέτισης θα γίνει τη στιγμή
     που γίνεται η αναζήτηση της πρώτης οντότητας, χρησιμοποιώντας ένα
     `JOIN`.
  *  `subquery`: όπως και το `joined`, αλλά θα χρησιμοποιηθεί
     δευτερεύουσα αναζήτηση (subquery).
  * `dynamic`: πιο προχωρημένη δυνατότητα, θα επιστραφεί ένα
     αντικείμενο τύπου `Query` στο οποίο θα μπορούμε να εφαρμόσουμε
     επιπλέον φίλτρα.

<div class="notes">

Για περισσότερες πληροφορίες, βλ. τη σχετική τεκμηρίωση του
[Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/models/#one-to-many-relationships)
και του
[SQLAlchemy](http://docs.sqlalchemy.org/en/latest/orm/tutorial.html#building-a-relationship)
και του [Eager
Loading](https://docs.sqlalchemy.org/en/latest/orm/tutorial.html#eager-loading). 
</div>


## `__init__.py`

* Το αρχείο `__init__.py` θα προσαρμοστεί ως εξής:

    ```python
   import os

   from flask import Flask

   from flask_sqlalchemy import SQLAlchemy

   db = SQLAlchemy()

   def create_app(test_config=None):
	   # create and configure the app
	   app = Flask(__name__, instance_relative_config=True)
	   app.config.from_mapping(
		   SECRET_KEY='dev',
	       # SQLALCHEMY_ECHO = True, uncomment to echo SQL statements
		   SQLALCHEMY_DATABASE_URI = 'sqlite:///flaskr.sqlite',
		   SQLALCHEMY_TRACK_MODIFICATIONS = False
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

	   db.init_app(app)

	   from . import init_db
	   init_db.init_db(app)

	   from . import auth
	   app.register_blueprint(auth.bp)

	   from . import blog
	   app.register_blueprint(blog.bp)
	   app.add_url_rule('/', endpoint='index')

	   return app
    ```

<div class="notes">

Οι διαφορές είναι:

* Χρησιμοποιούμε και τη βιβλιοθήκη SQLAlchemy, οπότε απαιτείται το
  κατάλληλο `import`.

* Οι ρυθμίσεις για τη βάση αλλάζουν. Το `SQLALCHEMY_DATABASE_URI`
  δείχνει την τοποθεσία της βάσης. Στη συγκεκριμένη περίπτωση, θα
  είναι το αρχείο `flaskr.db` στον κατάλογο της εφαρμογής μας.

* Η ρύθμιση `SQLALCHEMY_TRACK_MODIFICATIONS = False` είναι μια τεχνική
  λεπτομέρεια και δεν χρειάζεται να μας απασχολήσει τώρα.

* Η γραμμές `db = SQLAlchemy()` και `db.init_app(app)` δημιουργούν και
  αρχικοποιούν το αντικείμενο `db` με το οποίο θα αλληλεπιδρούμε με τη
  βάση δεδομένων μας.

* Οι γραμμές:

   ```python
   from . import init_db
   init_db.init_db(app)
   ```

  δημιουργούν την εντολή `flask init-db` που θα μπορούμε να
  χρησιμοποιούμε στη γραμμή εντολών.

* Αν θέλουμε να εμφανίζονται οι εντολές SQL που δημιουργεί το
  SQLAlchemy, προσθέτουμε στο `app.config.from_mapping()` την
  παράμετρο: 
   ```python
   SQLALCHEMY_ECHO = True
   ```

</div>

## Εντολή Δημιουργίας Βάσης

* Για να μπορούμε να δημιουργούμε προγραμματιστικά τη βάση,
  μετονομάζουμε το αρχείο `db.py` που είχαμε φτιάξει σε `init_db.py`,
  με τα εξής περιεχόμενα:

   ```python
   import click

   from flask.cli import with_appcontext

   from flaskr import db

   @click.command('init-db')
   @with_appcontext
   def init_db_command():
       """Clear the existing data and create new tables."""
       db.drop_all()
       db.create_all()
       click.echo('Initialized the database.')

   def init_db(app):
       app.cli.add_command(init_db_command)
   ```

## Διαγραφή `schema.sql`

* Πριν αρχίσουμε να χρησιμοποιούμε το SQLAlchemy είχαμε το σχήμα της
  βάσης στο αρχείο `schema.sql`.
  
* Αυτό πλέον δεν χρειάζεται, οπότε το διαγράφουμε.


## Χρήση Βάσης από τη Γραμμή Εντολών Python

* Έχοντας γράψει τον παραπάνω κώδικα, μπορούμε να δημιουργήσουμε τη
  βάση μας κατ' ευθείαν από μία γραμμή εντολών Python.

* Ξεκινάμε την Python μέσα στον κατάλογο `flaskr_project`
  πληκτρολογόντας `python`, ή καλύτερα `ipython`.

* Στη συνέχεια γράφουμε στη γραμμή εντολών της Python:

   ```python
   from flaskr import db, create_app
   app = create_app()
   app.app_context().push()
   ```

## Διαγραφή και Δημιουργία Βάσης

* Για να δημιουργήσουμε τη βάση εισάγουμε στη γραμμή εντολών της
  Python:

   ```python
   db.create_all()
   ```
* Αν θέλουμε να διαγράψουμε τους πίνακες μιας βάσης δίνουμε στη γραμμή
  εντολών της Python:

    ```python
    db.drop_all()
    ```

## Εισαγωγή δεδομένων

* Τώρα μπορούμε να χειριστούμε πλήρως τη βάση μας από τη γραμμή
  εντολών της Python.

* Για παράδειγμα, για να εισάγουμε ένα χρήστη και δύο αναρτήσεις, γράφουμε:

    ```python
    from flaskr.models import User, Post

    user_1 = User(username="marydoe", password="askj_63d9k")
    post_1 = Post(title="First Post", body="This is the first post", author=user_1)
    post_2 = Post(title="Second Post", body="This is the second post", author=user_1)

    db.session.add(user_1)
    db.session.add(post_1)
    db.session.add(post_2)
    db.session.commit()
    ```

## Αναζήτηση δεδομένων

* Για να κάνουμε μια αναζήτηση στα δεδομένα, γράφουμε:

    ```python
    posts = Post.query.all()
    ```

* Πράγματι, ενόσω είμαστε στη γραμμή εντολών μπορούμε να
  επιβεβαιώσουμε τις εγγραφές:

    ```python
    posts

    [<Post 'First Post' 'This is the first post' datetime.datetime(2018, 10, 15, 11, 5, 15) 'marydoe'>,
     <Post 'Second Post' 'This is the second post' datetime.datetime(2018, 10, 15, 11, 5, 25) 'marydoe'>]
    ```

<div class="notes">

Στο συγκεκριμένο παράδειγμα αναζητούμε το σύνολο των δεδομένων. Φυσικά
μπορούμε να κάνουμε πιο λεπτομερείς και περίπλοκες αναζητήσεις. Δείτε
τη
[σχετική τεκμηρίωση του Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/queries/#querying-records) και
την [πλήρη τεκμηρίωση του SQLAlchemy](http://docs.sqlalchemy.org/en/latest/orm/tutorial.html#common-filter-operators).

</div>


## Αναζήτηση Συσχετισμένων Δεδομένων

* Για να βρούμε το συγγραφέα μιας ανάρτησης αρκεί απλώς να δώσουμε:

   ```python
   posts[0].author
   ```

* Για να βρούμε τον κωδικό του συγγραφέα αρκεί να δώσουμε:

   ```python
   posts[0].author_id
   ```

* Ή φυσικά:

   ```python
   posts[0].author.id
   ```

<div class="notes">

Όπως αναφέραμε προηγουμένως, η χρήση του `posts[0].author_id` δεν θα
απαιτήσει αναζήτηση στη βάση, ενώ η χρήση του `posts[0].author.id`
ενδέχεται να απαιτήσει, αναλόγως την τιμή του `lazy` στον ορισμό της
συσχέτισης. 

</div>

## Εμφάνιση Εντολών SQL

* Αν θέλουμε να δούμε τις εντολές που δημιουργεί και εκτελεί το
  SQLAlchemy, προσθέτουμε το παρακάτω στις ρυθμίσεις αρχικοποίησης
  μέσα στην κλήση `app.config.update()`.

    ```python
    SQLALCHEMY_ECHO = True
    ```

## Διαγραφή Δεδομένων

* Για να σβήσουμε μια συγκεκριμένη εγγραφή, έστω την `post_1`, δίνουμε:

   ```python
   db.session.delete(post_1)
   db.session.commit()
   ```

* Για να διαγράψουμε όλες τις εγγραφές ενός πίνακα δίνουμε:

    ```python
    >>> Post.query.delete()
    1
    >>> db.session.commit()
    ```
* Επιβεβαιώνουμε:

    ```python
    >>> posts = Post.query.all()
    >>> posts
    []
    ```

## Εμφάνιση αναρτήσεων

* Θα συνεχίσουμε με τη συγγραφή των μεθόδων για το χειρισμό των
  λειτουργιών της υπηρεσίας.

* Η εμφάνιση των αναρτήσεων, με τη χρήση πλέον Flask-SQLAlchemy,
  θα γίνει, στο `blog.py`:

    ```python
	@bp.route('/')
	def index():
		posts = Post.query.order_by(Post.created.desc()).all()
		print(posts)
		return render_template('blog/index.html', posts=posts)
    ```

<div class="notes">

Η μέθοδος είναι στην ουσία η ίδια με αυτήν που είχαμε στην προηγούμενη
έκδοση της εφαρμογής, αλλά αντί να γράψουμε την εντολή της αναζήτησης
σε SQL γράφουμε μόνο τις αντίστοιχες εντολές σε Python.

Προσέξτε ότι στο προοίμιο του `blog.py` θα πρέπει να προσθέσουμε:

```python
from flaskr import db

from flaskr.models import Post
```

(Όσον αφορά το `from flaskr import db`, δεν χρειάζεται σε αυτή τη
συνάρτηση, αλλά θα χρειαστεί σε λίγο.)

</div>

## Προσθήκη ανάρτησης

* Αντίστοιχα, η προσθήκη αναρτήσεων στο `blog.py` γίνεται:

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
				post = Post(title=title, body=body, author_id=g.user.id)
				db.session.add(post)
				db.session.commit()
				return redirect(url_for('blog.index'))

		return render_template('blog/create.html')
    ```

<div class="notes">

Και πάλι, οι αλλαγές σε σχέση με την προηγούμενη εκδοσή αφορούν στη
χρήση Python αντί για τη χρήση SQL. Δημιουργούμε ένα αντικείμενο της
κλάσης `Post` χρησιμοποιώντας τα στοιχεία που έχει συμπληρώσει ο
χρήστης στη φόρμα της εφαρμογής, και στη συνέχεια εισάγουμε τη νέα
ανάρτηση στη βάση και επικυρώνουμε την εισαγωγή.

</div>


## Εύρεση Ανάρτησης

* Χρειαζόμαστε, όπως και πριν, μια βοηθητική συνάρτηση για την εύρεση
  συγκεκριμένης ανάρτησης. Αυτή θα γίνει, στο `blog.py`:

   ```python
   def get_post(id, check_author=True):
	   post = Post.query.filter_by(id=id).first()

	   if post is None:
		   abort(404, "Post id {0} doesn't exist.".format(id))

	   if check_author and post.author_id != g.user.id:
		   abort(403)

	   return post
    ```

## Ενημέρωση Ανάρτησης

* Η ενημέρωση της ανάρτησης θα είναι, στο `blog.py`:

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
			   post.title = title
			   post.body = body
			   db.session.add(post)
			   db.session.commit()
			   return redirect(url_for('blog.index'))

	   return render_template('blog/update.html', post=post)
   ```

## Διαγραφή Ανάρτησης

* Τέλος, η διαγραφή ανάρτησης θα είναι, στο `blog.py`:

   ```python
   @bp.route('/<int:id>/delete', methods=('POST',))
   @login_required
   def delete(id):
	   post = get_post(id)
	   db.session.delete(post)
	   db.session.commit()
	   return redirect(url_for('blog.index'))
   ```   

## Εγγραφή Χρήστη

* Η εγγραφή χρήστη θα γίνει μέσα αρχείο `auth.py`:
  
    ```python
	@bp.route('/register', methods=('GET', 'POST'))
	def register():
		if request.method == 'POST':
			username = request.form['username']
			password = request.form['password']
			error = None

			if not username:
				error = 'Username is required.'
			elif not password:
				error = 'Password is required.'
			elif User.query.filter_by(username=username).first() is not None:
				error = 'User {} is already registered.'.format(username)

			if error is None:
				user = User(username=username,
							password=generate_password_hash(password))
				db.session.add(user)
				db.session.commit()
				return redirect(url_for('auth.login'))

			flash(error)

		return render_template('auth/register.html')
	```
   
<div class="notes">

Στο προοίμιο του αρχείου θα χρειαστεί να προσθέσουμε:

```python
from flaskr import db
from flaskr.models import User
```

</div>

## Είσοδος Χρήστη

* Η είσοδος χρήστη θα είναι πάλι μέσα αρχείο `auth.py`:
  
   ```python
   @bp.route('/login', methods=('GET', 'POST'))
   def login():
	   if request.method == 'POST':
		   username = request.form['username']
		   password = request.form['password']
		   error = None
		   user = User.query.filter_by(username=username).first()

		   if user is None:
			   error = 'Incorrect username.'
		   elif not check_password_hash(user.password, password):
			   error = 'Incorrect password.'

		   if error is None:
			   session.clear()
			   session['user_id'] = user.id
			   return redirect(url_for('index'))

		   flash(error)

	   return render_template('auth/login.html')
	```

## Έλεγχος Χρήστη

* Ο έλεγχος χρήστη στο `auth.py` χρειάζεται και αυτός μια μικρή
  προσαρμογή  για τη χρήση SQlAlchemy:
  
	```python
	@bp.before_app_request
	def load_logged_in_user():
		user_id = session.get('user_id')

		if user_id is None:
			g.user = None
		else:
			g.user = User.query.filter_by(id=user_id).first()
	```

## Εκκίνηση Εφαρμογής

* Για να τρέξετε την εφαρμογή δίνετε ό,τι και στην προηγούμενη έκδοση.

   ```bash
   export FLASK_APP=flaskr
   flask run
    ```

## Αλλαγές στα Πρότυπα Εμφάνισης

* Αν και τα πρότυπα εμφάνισης δουλεύουν και ως έχει, μπορούμε να τα
  προσαρμόσουμε ώστε να είναι πιο σαφές ότι δουλεύουμε με αντικείμενα.
  
* Οι αλλαγές θα γίνουν στα:

  * `index.html`
  * `update.html`

## `templates/blog/index.html`

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
          <div class="about">by {{ post.author.username }} on {{ post.created.strftime('%Y-%m-%d') }}</div>
        </div>
        {% if g.user['id'] == post.author_id %}
          <a class="action" href="{{ url_for('blog.update', id=post.id) }}">Edit</a>
        {% endif %}
      </header>
      <p class="body">{{ post.body }}</p>
    </article>
    {% if not loop.last %}
      <hr>
    {% endif %}
  {% endfor %}
{% endblock %}
```

## `templates/blog/update.html`

```html
{% extends 'base.html' %}

{% block header %}
  <h1>{% block title %}Edit "{{ post.title }}"{% endblock %}</h1>
{% endblock %}

{% block content %}
  <form method="post">
    <label for="title">Title</label>
    <input name="title" id="title"
      value="{{ request.form['title'] or post.title }}" required>
    <label for="body">Body</label>
    <textarea name="body" id="body">{{ request.form['body'] or post.body }}</textarea>
    <input type="submit" value="Save">
  </form>
  <hr>
  <form action="{{ url_for('blog.delete', id=post.id) }}" method="post">
    <input class="danger" type="submit" value="Delete" onclick="return confirm('Are you sure?');">
  </form>
{% endblock %}
```

# MySQL

## Μεταφορά σε MySQL

* Η SQLite είναι μια πολύ βολική λύση, αλλά το πιθανότερο είναι ότι θα
  θέλουμε να χρησιμοποιήσουμε μια άλλη βάση δεδομένων στην παραγωγή.

* Για το σκοπό αυτό, θα κάνουμε τις απαραίτητες αλλαγές στην εφαρμογή
  μας ώστε να χρησιμοποιήσει τη βάση δεδομένων MySQL.

* Χάρη στο ORM θα διαπιστώσετε ότι οι αλλαγές είναι ελάχιστες.

## Εγκατάσταση MySQL σε Τοπικό Μηχάνημα

* Πηγαίνετε στο
  [http://dev.mysql.com/downloads/](http://dev.mysql.com/downloads/)
  και κατεβάστε την τελευταία έκδοση του MySQL Community Server.

* Επίσης, πηγαίνετε στο
  [http://dev.mysql.com/downloads/](http://dev.mysql.com/downloads/)
  και κατεβάστε την τελευταία έκδοση του MySQL Workbench.

## Εγκατάσταση Οδηγού σε Τοπικό Μηχάνημα

* Υπάρχουν διάφοροι οδηγοί για εγκατάσταση. Ίσως το απλούστερο είναι
  να εγκαταστήσουμε τον `mysql-connector-python` μέσω pip.
   
   ```bash
   pip install mysql-connector-python
   ```
   
* Φυσικά, αν έχουμε εγκαταστήσει ένα ιδεατό περιβάλλον Python,
  τρέχουμε την παραπάνω εντολή στο ενεργοποιημένο περιβάλλον.
  
<div class="notes">

Για λόγους απόδοσης μπορεί να είναι καλύτερο να εγκαταστήσουμε τον
οδηγό που δίνεται από την ίδια τη MySQL στο
<https://dev.mysql.com/downloads/connector/python/>.

</div>

## Εγκατάσταση MySQL στον Εξυπηρετητή

* Στον εξυπηρετητή δίνουμε:

   ```bash
   sudo apt update
   sudo apt install mysql-server
   sudo mysql_secure_installation
   ```

<div class="notes">

Το `mysql_secure_installation` θα μας κάνει μια σειρά ερωτημάτων
προκεικέμου να θωρακιστεί η βάση δεδομένων μας.

1. Θα μας ρωτήσει αν θέλουμε να εγκαταστήσουμε το validate password
   plugin, με το οποίο θα ελέγχουμε αν οι κωδικοί πρόσβασης είναι
   ανθεκτικοί. Επιλέγουμε ναι και στη συνέχεια δίνουμε το επιθυμητό
   επίπεδο ασφάλειας (strong).

2. Θα μας ρωτήσει αν θέλουμε να διαγράψουμε τους ανώνυμους χρήστες.
   Επιλέγουμε ναι.

3. Θα μας ρωτήσει αν θέλουμε ο χρήστης root να μπορεί να μπει στη βάση
   μόνο από το ίδιο το μηχάνημα, και όχι απομακρυσμένα. Επιλέγουμε
   ναι.

4. Θα μας ρωτήσει αν θέλουμε να διαγραφεί η test βάση δεδομένων.
   Επιλέγουμε ναι.

5. Θα μας ρωτήσει αν θέλουμε να ξαναδιαβάσει η βάση τους πίνακες με τα
   προνόμια των χρηστών. Επιλέγουμε ναι.

</div>

## Ρύθμιση Προνομίων

* Συνδεόμαστε με τη βάση δίνοντας:

   ```bash
   sudo mysql -u root -p
   ```

* Ελέγχουμε τη μέθοδο αυθεντικοποίησης που χρησιμοποιεί η βάση και
  επιβεβαιώνουμε ότι χρησιμοποιείται το `mysql_native_plugin`:

   ```sql
   SELECT user,authentication_string,plugin,host FROM mysql.user;

   +------------------+-------------------------------------------+-----------------------+-----------+
 | user             | authentication_string                     | plugin                | host      |
 +------------------+-------------------------------------------+-----------------------+-----------+
 | root             | *02164506DE054EB94C3380B7A7CFD7464D445D3B | mysql_native_password | localhost |
 | mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
 | mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
 | debian-sys-maint | *0D75601793150ABE156A0FD541F7114A1FDACC53 | mysql_native_password | localhost |
 +------------------+-------------------------------------------+-----------------------+-----------+
 4 rows in set (0.00 sec)
   ```

## Δημιουργία Bάσης και Χρήστη

* Δημιουργείστε τη βάση `flaskr` εισάγοντας τις ακόλουθες εντολές SQL:

    ```sql
    CREATE DATABASE flaskr CHARACTER SET utf8 COLLATE utf8_general_ci;

    CREATE USER 'flaskr_user'@'localhost' IDENTIFIED BY '4aTik$iaGcN';

    GRANT ALL PRIVILEGES ON flaskr.* TO 'flaskr_user'@'localhost';
    ```

## Ρύθμιση για χρήση MySQL

* Εισάγετε στο αρχείο `instance/config.py` την παρακάτω γραμμή:

    ```python
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://flaskr_user:4aTik$iaGcN@localhost/flaskr'
    ```

## Ενημέρωση `setup.py`

* Θα πρέπει να ενημερώσουμε το αρχείο `setup.py` που χρησιμοποιούμε
  για την εγκατάσταση της εφαρμογής, ώστε να περιλαμβάνει τις
  εξαρτήσεις για τη MySQL:

   ```python
   from setuptools import find_packages, setup

   setup(
       name='flaskr',
       version='1.1.0',
       packages=find_packages(),
       include_package_data=True,
       zip_safe=False,
       install_requires=[
           'flask',
           'flask_sqlalchemy',
           'mysql-connector-python'
       ],
   )
   ```

<div class="notes">

Προσθέσαμε στις εξαρτήσεις τα `flask_sqlalchemy` και
`mysql-connector-python`. Επίσης ενημερώσαμε την έκδοση, σε `1.1.0`.

</div>


## Συσκευασία Εφαρμογής

* Για να δημιουργήσουμε το πακέτο εγκατάστασης δίνουμε:

   ```bash
   python3 setup.py bdist_wheel
   ```
   
* Το πακέτο εγκατάστασης θα δημιουργηθεί στο:

    ```
	dist/flaskr-1.1.0-py3-none-any.whl
	```

## Εγκατάσταση σε Εξυπηρετητή

* Αντιγράφουμε το αρχείο εγκατάστασης από τον υπολογιστή που
  χρησιμοποιούμε για την ανάπτυξη στον εξυπηρετητή:

   ```bash
   scp dist/flaskr-1.1.0-py3-none-any.whl user@snf-842276.vm.okeanos.grnet.gr:flaskr_project
   ```

* Στον *εξυπηρετητή* ενεργοποιούμε το ιδεατό περιβάλλον και
  εγκαθιστούμε την εφαρμογή σε αυτό:

   ```bash
   cd ~/flaskr_project/
   source venv/bin/activate
   pip install wheel
   pip install flaskr-1.1.0-py3-none-any.whl
   ```


## Δημιουργία Πινάκων στη MySQL

* Για να δημιουργήσουμε τους πίνακες της βάσης μας (`posts`, `users`)
  θα δώσουμε από τη γραμμή εντολών:

    ```bash
    export FLASK_APP=flaskr
    flask initdb
    ```

## Επόμενα βήματα

* Δεν υπάρχουν!

<div class="notes">

Όπως είδατε, η μόνη αλλαγή που χρειάστηκε ήταν η δημιουργία ενός
αρχείου και μιας μεταβλητής περιβάλλοντος. Δεν άλλαξε τίποτε στην ίδια
την εφαρμογή μας.

Αν στη συνέχεια θέλουμε να χρησιμοποιήσουμε μια άλλη βάση, όπως SQL
Server, Oracle, PostreSQL, κ.λπ., αρκεί μόνο να αλλάξουμε τα
περιεχόμενα του αρχείου `config.py` και τίποτε άλλο.

</div>
