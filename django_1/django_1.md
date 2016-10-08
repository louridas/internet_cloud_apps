% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Django

## Γενικά

## Εγκατάσταση

```bash
pip install Django
```

# Δημιουργία πρώτης σελίδας

## Δημιουργία καταλόγων έργου

* Για να δημιουργηθεί η βασική δομή καταλόγων του έργου μας, γράφουμε
  τα παρακάτω:

    ```bash
    django-admin startproject project_site
    ```

* Τότε θα δημιουργηθεί η ακόλουθη δομή καταλόγων:

    ```
    project_site/
        manage.py
        project_site/
            __init__.py
            settings.py
            urls.py
            wsgi.py
    ```

## Εκκίνηση εξυπηρετητή ανάπτυξης

* Μετακινούμαστε στον κατάλογο `project_site` και γράφουμε:

    ```bash
    python manage.py runserver
    ```

* Ο εξυπηρετητής θα ξεκινήσει στη διεύθυνση `http://127.0.0.1:8000/`

## Δημιουργία εφαρμογής

* Κάθε έργο που φτιάχνουμε μπορεί να περιλαμβάνει μία ή περισσότερες
  εφαρμογές.

* Για να φτιάξουμε τον σκελετό της εφαρμογής μας δίνουμε:

    ```python
    python manage.py startapp djbr
    ```

* Θα δημιουργηθεί η ακόλουθη δομή καταλόγων:

    ```
    djbr/
        __init__.py
        admin.py
        apps.py
        migrations/
            __init__.py
        models.py
        tests.py
        views.py
    ```

## Δημιουργία της πρώτης εικόνας

* Ανοίγουμε το αρχείο `djbr/views.py`, το οποίο περιέχει:

    ```python
    from django.shortcuts import render

    # Create your views here.
    ```

* Σβήνουμε τα υπάρχοντα περιεχόμενα και γράφουμε:

    ```python
    from django.http import HttpResponse

    def index(request):
        return HttpResponse("Helo, world. You are at the djbr index.")
    ```

## Αντιστοίχιση εικόνας σε URL

* Για να μπορεί ο χρήστης να βλέπει την εικόνα, θα πρέπει να την
  αντιστοιχίσουμε σε ένα URL.

* Αυτό γίνεται δημιουργώντας ένα `URLconf`.

* Δημιουργούμε το αρχείο `djbr/urls.py` και γράφουμε:

    ```python
    from django.conf.urls import url

    from . import views

    urlpatterns = [
        url(r'^$', views.index, name='index'),
    ]
    ```

<div class="notes">

* Η πρώτη παράμετρος της συνάρτησης `url()` είναι μια *κανονική
  έκφραση* (regular expression), η οποία αντιστοιχεί στο μονοπάτι που
  θέλουμε να αντιστοιχίσουμε στην εικόνα.

* Η δεύτερη παράμετρος της συνάρτησης `url()` δίνει τη συνάρτηση μέσα
  στο `views.py` που θα χειριστεί την αίτηση του χρήστη.

* Η τρίτη παράμετρος της συνάρτησης `url()` βαφτίζει το συγκεκριμένο
  URL. Με το όνομα αυτό θα μπορούμε να αναφερόμαστε στο URL από άλλα
  σημεία της εφαρμογής μας. Επιπλέον, αν χρειαστεί να αλλάξουμε το
  URL, αρκεί να το αλλάξουμε μόνο στο συγκεκριμένο σημείο και όχι
  αλλού στην εφαρμογή.

* Μπορούμε να περάσουμε και άλλες παραμέτρους με τη μορφή `key=value`.
  Οι παράμετροι αυτοί θα χρησιμοποιηθούν από τη συνάρτηση χειρισμού
  της εικόνας.

</div>

## Περίληψη των URL της εφαρμογής

* Ανοίγουμε το αρχείο `project_site/urls.py`.

* Προσθέτουμε ένα `import` για το `django.conf.urls.include`.

* Συμπεριλαμβάνουμε το αρχείο `djbr/urls.py` μέσα στο αρχείο
  `project_site/urls.py`. 

    ```python
    from django.conf.urls import url, include
    from django.contrib import admin

    urlpatterns = [
        url(r'^djbr/', include('djbr.urls'))
        url(r'^admin/', admin.site.urls),
    ]
    ```
* Για να δούμε το αποτέλεσμα ξεκινάμε πάλι τον εξυπηρετητή και
  πηγαίνουμε στο `http://127.0.0.1:8000/djbr/`.

# Αλληλεπίδραση με τη βάση


## Ρυθμίσεις για SQLite

* Η εφαρμογή είναι ήδη ρυθμισμένη για να λειτουργήσει με την SQLite.

* Πράγματι, ανοίξτε το αρχείο `project_site/settings.py` και
  επιβεβαιώστε ότι περιλαμβάνει τα εξής:

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
    ```

<div class="notes">

* Το κλειδί `ENGINE` δίνει τον τύπο της βάσης. Στην περίπτωσή μας,
  SQLite.

* Το κλειδί `NAME` δίνει την τοποθεσία της βάσης. Στην περίπτωσή μας,
  το αρχείο της βάσης θα έχει το όνομα `db.sqlite3` και θα αποθηκευτεί
  στον βασικό κατάλογο της εφαρμογής μας.

</div>

## Ρύθμιση ζώνης ώρας

* Οι τρέχουσες ρυθμίσεις στο αρχείο `project_site/settings.py` ορίζουν
  ως ζώνη ώρας `UTC`:

    ```python
    TIME_ZONE = 'UTC'
    ```

* Αλλάξτε τη γραμμή στην κατάλληλη ζώνη ώρας:

    ```python
    TIME_ZONE = 'ΕΕΤ'
    ```

## Συμπεριλαμβανόμενες εφαρμογές

* Η ρύθμιση `INSTALLED_APPS` δίνει τις βοηθητικές εφαρμογές που θα
  ενεργοποιηθούν όταν τρέχει το Django.

* Οι εφαρμογές αυτές μας δίνουν έτοιμη λειτουργικότητα και μπορούν να
  χρησιμοποιηθούν στα έργα μας.

* Κατ' αρχήν η ρύθμιση `INSTALLED_APPS` περιέχει τις ακόλουθες
  εφαρμογές:

    * `django.contrib.admin`
    * `django.contrib.auth`
    * `django.contrib.contenttypes`
    * `django.contrib.sessions`
    * `django.contrib.messages`
    * `django.contrib.staticfiles`


## Δημιουργία πινάκων βοηθητικών εφαρμογών

* Oι βοηθητικές εφαρμογές χρειάζονται για να λειτουργήσουν κάποιους
  πίνακες στη βάση μας.

* Για να δημιουργηθούν αυτοί οι πίνακες πρέπει να τρέξουμε:

    ```bash
    python manage.py migrate
    ```

# Δημιουργία μοντέλων

## Βασικές οντότητες

* Θα ξεκινήσουμε την εφαρμογή μας με δύο οντότητες.

* Η οντότητα `Book` θα αντιπροσωπεύει ένα βιβλίο.

* Η οντότητα `Review` θα αντιπροσωπεύει μια κριτική για ένα βιβλίο.

* Γράφουμε στο αρχείο `djbr/models.py` τα παρακάτω.


## Κώδικας βασικών οντοτήτων

```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    review_date = models.DateTimeField('review date')
```


## Ενεργοποιήση μοντέλων

* Το Django μπορεί να δημιουργήσει μόνο του τους πίνακες των μοντέλων
  μας στη βάση.

* Για να το κάνει όμως αυτό, πρέπει να του γνωστοποιήσουμε την ύπαρξη
  της εφαρμογής μας.

* Για να το κάνουμε αυτό, πρέπει να συμπεριλάβουμε την εφαρμογή μας
  στη λίστα `INSTALLED_APPS` στις ρυθμίσεις της εφαρμογής.

## Ρύθμιση `INSTALLED_APPS`

```python
INSTALLED_APPS = [
    'djbr.apps.DjbrConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

## Δημιουργία μεταγωγής

* Ένα σύνολο αλλαγών που πρέπει να γίνουν στη βάση δεδομένων
  ονομάζεται *μεταγωγή* (migration).

* Για να δημιουργήσουμε μια μεταγωγή που να περιλαμβάνει τις
  τελευταίες αλλαγές στη βάση δίνουμε:

    ```bash
    python manage.py makemigrations polls
    ```
* Θα εμφανιστεί τότε κάτι παρόμοιο με τα εξής:

    ```
    Migrations for 'djbr':
      djbr/migrations/0001_initial.py:
        - Create model Book
        - Create model Review
    ```

## Κώδικας SQL

* Για να δούμε τον κώδικα SQL που αντιστοιχεί στη μεταγωγή δίνουμε:

    ```bash
    python manage.py sqlmigrate djbr 0001
    ```

* Τότε θα δούμε τα παρακάτω:

    ```sql
    BEGIN;
    --
    -- Create model Book
    --
    CREATE TABLE "djbr_book" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" varchar(200) NOT NULL, "pub_date" datetime NOT NULL);
    --
    -- Create model Review
    --
    CREATE TABLE "djbr_review" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" varchar(200) NOT NULL, "review_date" datetime NOT NULL,
    "book_id" integer NOT NULL REFERENCES "djbr_book" ("id"));
    CREATE INDEX "djbr_review_0a4572cc" ON "djbr_review" ("book_id");
    COMMIT;
    ```

## Εφαρμογή της μεταγωγής

* Για να εφαρμόσουμε τις μεταγωγές που δεν έχουν ακόμα εφαρμοστεί στη
  βάση, δίνουμε:

    ```bash
    python manage.py migrate
    ```

* Τότε θα δούμε στην οθόνη:

    ```bash
    Operations to perform:
    Apply all migrations: admin, auth, contenttypes, djbr, sessions
    Running migrations:
    Applying contenttypes.0001_initial... OK
    Applying auth.0001_initial... OK
    Applying admin.0001_initial... OK
    Applying admin.0002_logentry_remove_auto_add... OK
    Applying contenttypes.0002_remove_content_type_name... OK
    Applying auth.0002_alter_permission_name_max_length... OK
    Applying auth.0003_alter_user_email_max_length... OK
    Applying auth.0004_alter_user_username_opts... OK
    Applying auth.0005_alter_user_last_login_null... OK
    Applying auth.0006_require_contenttypes_0002... OK
    Applying auth.0007_alter_validators_add_error_messages... OK
    Applying auth.0008_alter_user_username_max_length... OK
    Applying djbr.0001_initial... OK
    Applying sessions.0001_initial... OK
    ```

## Κύκλος μεταγωγών

* Κάνουμε τις αλλαγές στα μοντέλα μας (στο `models.py`).

* Δίνουμε `python manage.py makemigrations` για να δημιουργήσουμε τις
  μεταγωγές που αντιστοιχούν στις αλλαγές που κάναμε.

* Δίνουμε `python manage.py migrate` για να εφαρμόσουμε τις μεταγωγές
  στη βάση.

# Χρησιμοποιώντας το API


## Αλληλεπίδραση με το API

* Μπορούμε να αλληλεπιδράσουμε απ' ευθείας με το API και τα
  αντικείμενα της εφαρμογής μας, δίνοντας:

    ```bash
    python manage.py shell
    ```

* Αυτό θα ξεκινήσει μια γραμμή εντολών Python ή IPython (αν είναι
  εγκατεστημένο), με τις απαραίτητες ρυθμίσεις για να έχουμε πρόσβαση
  στα αντικείμενα του Django και τις εφαρμογής μας.


## Αναζήτηση βιβλίων

* Για να αναζητήσουμε όλα τα βιβλία στη βάση χρησιμοποιούμε τη μέθοδο
  `Book.objects.all()`

* Κατ΄ αρχήν θα πρέπει να εισάγουμε τα αντίστοιχα αντικείμενα στο
  περιβάλλον μας, οπότε ξεκινάμε με τα κατάλληλα imports.

    ```python
    >>> from djbr.models import Book, Review
    >>> Book.objects.all()
    <QuerySet []>
    ```

## Δημιουργία βιβλίου

* Για να δημιουργήσουμε βιβλία, απλώς καλούμε τον κατασκευαστή των
  αντικειμένων `Book` και στη συνέχεια τη μέθοδο `save()`.

    ```python
    >>> from django.utils import timezone
    >>> b = Book(title="The Great Greek Novel", pub_date=timezone.now())
    >>> b.save()

## Προσπέλαση πεδίων

* Έχουμε πρόσβαση στα πεδία των αντικειμένων ως απλά πεδία στην
  Python. 

    ```python
    >>> b.id
    1
    >>> b.title
    'The Great Greek Novel'
    >>> b.pub_date
    datetime.datetime(2016, 10, 8, 17, 57, 55, 646201, tzinfo=<UTC>)
    ```

## Αλλαγές στα πεδία

* Ομοίως μπορούμε απλώς να τα αλλάξουμε κατά βούληση.

    ```python
    >>> b.title = "The Great Greek Novel, Vol. 2"
    >>> b.save()
    >>> Book.objects.all()
    <QuerySet [<Book: Book object>]>
    ```

