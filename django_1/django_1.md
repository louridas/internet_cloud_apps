% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Django

## Γενικά

* Το [Django](https://www.djangoproject.com/) είναι η πιο δημοφιλής
  πλατφόρμα για την ανάπτυξη διαδικτυακών εφαρμογών σε Python.

* Είναι από τις πιο δημοφιλείς πλατφόρμες, ανεξαρτήτως γλώσσας.

* Εμείς θα φτιάξουμε μια εφαρμογή στην οποία οι χρήστες θα μπορούν να
  εισάγουν κριτικές (reviews) για βιβλία που έχουν διαβάσει.

## Εγκατάσταση

```bash
pip install Django
```

<div class="notes">

Στην πραγματικότητα το Django δεν είναι τίποτε άλλο από ένα σύνολο
βιβλιοθηκών Python, οπότε εγκαθίσταται όπως οποιοδήποτε άλλο πακέτο
της γλώσσας.

</div>

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

<div class="notes">

* Ο εξωτερικός κατάλογος `project_site/` περιέχει το σύνολο του έργου που θα
  φτιάξουμε. Μπορούμε να αλλάξουμε το όνομά του, καθώς δεν έχει κάποια
  σημασία για το Django.

* Το `manage.py` είναι ένα εργαλείο το οποίο μας επιτρέπει να
  [αλληλεπιδράσουμε και να διαχειριστούμε το Django](https://docs.djangoproject.com/en/1.10/ref/django-admin/).
  Θα δούμε στη συνέχεια πώς χρησιμοποιείται.

* Ο εσωτερικός κατάλογος `project_site` περιέχει το
  [πακέτο Python (Python package)](https://docs.python.org/3/tutorial/modules.html#tut-packages)
  για το έργο μας. Υπενθυμίζουμε ότι ένα πακέτο Python είναι ένας
  κατάλογος ο οποίος περιέχει ένα αρχείο `__init__.py`. Θα
  χρησιμοποιήσουμε το όνομα του πακέτου αυτού κάθε φορά που θα
  χρειαστεί να εισάγουμε κάπου (import) κάποια από τα περιεχόμενά του,
  όπως θα δούμε παρακάτω.

* Το `__init__.py` είναι ακριβώς το αρχείο το οποίο δηλώνει ότι ο
  κατάλογος είναι πακέτο Python.

* Το αρχείο `project_site/settings.py` περιέχει τις ρυθμίσεις για το
  σύνολο του έργου μας. Οι
  [ρυθμίσεις](https://docs.djangoproject.com/en/1.10/topics/settings/)
  αφορούν τις συνδέσεις με τη βάση δεδομένων, τη ζώνη ώρας, κ.ά.

* Το αρχείο `project_site/urls.py` δηλώνει τα
  [URLs τα οποία θα διαχειρίζεται το έργο μας](https://docs.djangoproject.com/en/1.10/topics/http/urls/).
  Στην ουσία είναι ένας "πίνακας περιεχόμενων" για το έργο μας.

* Το αρχείο `project_site/wsgi.py` χρησιμοποιείται για τη μεταφορά του
  έργου μας σε έναν εξυπηρετητή παραγωγής. θα μιλήσουμε για
  εξυπηρετητές παραγωγής σε μία μελλοντική διάλεξη.

</div>

## Εκκίνηση εξυπηρετητή ανάπτυξης

* Μετακινούμαστε στον κατάλογο `project_site` και γράφουμε:

    ```bash
    python manage.py runserver
    ```

* Ο εξυπηρετητής θα ξεκινήσει στη διεύθυνση `http://127.0.0.1:8000/`

<div class="notes">

Λέμε *εξυπηρετής ανάπτυξης* (development server) γιατί ο συγκεκριμένος
εξυπηρετητής είναι βολικός για τη συγγραφή της εφαρμογής μας, αλλά
*δεν* είναι κατάλληλος για την παραγωγική χρήση της εφαρμογής μας.

Όταν θέλουμε να βγάλουμε την υπηρεσία μας στην παραγωγή θα πρέπει να
χρησιμοποιήσουμε άλλους εξυπηρετητές, και συγκεκριμένα είτε τον
[Apache](https://httpd.apache.org/) 
είτε τον [nginx](https://www.nginx.com/resources/wiki/).

</div>

## Δημιουργία εφαρμογής

* Κάθε έργο που φτιάχνουμε μπορεί να περιλαμβάνει μία ή περισσότερες
  εφαρμογές (apps).

* Για να φτιάξουμε τον σκελετό της εφαρμογής μας δίνουμε, μέσα στον
  εξωτερικό κατάλογο `project_site` που φτιάξαμε:

    ```python
    python manage.py startapp djbr
    ```

* Το `djbr` σημαίνει "Django Book Reviews".

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

<div class="notes">

* Κάθε εφαρμογή είναι απλώς ένα πακέτο Python το οποίο ακολουθεί
  κάποιες συγκεκριμένες συμβάσεις ως προς τα ονόματα των αρχείων του
  και τις δομές καταλόγων.

* Με το `python manage.py startapp` δημιουργείται αυτομάτως η σωστή
  δομή. 

</div>

## Δημιουργία της πρώτης σελίδας

* Ανοίγουμε το αρχείο `djbr/views.py`, το οποίο περιέχει:

    ```python
    from django.shortcuts import render

    # Create your views here.
    ```

* Σβήνουμε τα υπάρχοντα περιεχόμενα και γράφουμε:

    ```python
    from django.http import HttpResponse

    def index(request):
        return HttpResponse("Hello, world. You are at the djbr index.")
    ```

<div class="notes">

Η συνάρτηση `index()` παίρνει ως παράμετρο ένα αντικείμενο το οποίο
περιέχει όλα τα δεδομένα της αίτησης του χρήστη. Απαντά με ένα
αντικείμενο `HttpResponse`, το οποίο απλώς θα εμφανίσει στον browser
το μήνυμα που της περάσαμε.

Στα αγγλικά δεν μιλάμε για σελίδα, αλλά για εικόνα (view). Ο όρος
προέρχεται από την αρχιτεκτονική
[Model-View Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).
Στην αρχιτεκτονική αυτή, μια εφαρμογή απαρτίζεται από *μοντέλα*
(models), *εικόνες* (views), και *ελεγκτές* (controllers). Στα
ελληνικά όμως ο όρος εικόνας ίσως δεν φαίνεται πολύ καλά, οπότε θα
μιλάμε για σελίδα.

* Μια σελίδα λοιπόν είναι αυτό το οποίο βλέπει ο χρήστης. Στο Django
  οι σελίδες περιγράφονται μέσα στο αρχείο `views.py` και σε πρότυπα
  (templates).

* Ένα μοντέλο αποτελείται από δεδομένα που διαχειρίζεται και
  αποθηκεύει η εφαρμογή. Τα μοντέλα περιγράφονται μέσα στο αρχείο
  `models.py`. 

* Ο ελεγκτής καθορίζει ποια σελίδα θα εμφανιστεί αναλόγως με τις
  ενέργειες του χρήστη. Το ρόλο του ελεγκτή παίζει το ίδιο το Django. 

</div>

## Αντιστοίχιση σελίδας σε URL

* Για να μπορεί ο χρήστης να βλέπει τη σελίδα, θα πρέπει να την
  αντιστοιχίσουμε σε ένα URL.

* Δημιουργούμε το αρχείο `djbr/urls.py` στο οποίο γράφουμε:

    ```python
    from django.conf.urls import url

    from . import views

    urlpatterns = [
        url(r'^$', views.index, name='index'),
    ]
    ```

<div class="notes">

* Η πρώτη παράμετρος της συνάρτησης `url()` είναι μια
  [κανονική έκφραση (regular expression)](https://en.wikipedia.org/wiki/Regular_expression),
  η οποία αντιστοιχεί στο μονοπάτι που θέλουμε να αντιστοιχίσουμε στην
  εικόνα. Αν δεν γνωρίζετε τι είναι μια κανονική έκφραση, θα πρέπει να
  αφιερώσετε λίγο χρόνο να μάθετε, δεδομένου ότι χρησιμοποιούνται πάρα
  πολύ στην ανάπτυξη εφαρμογών (διαδικτυακών και μη). Ειδικότερα για
  τη χρήση κανονικών εκφράσεων σε Python, μπορείτε να δείτε τη
  [σχετική τεκμηρίωση](https://docs.python.org/3/library/re.html). Η
  συγκεκριμένη κανονική έκφραση (`^$`) αντιστοιχεί στην κενή
  συμβολοσειρά. Το πρόθεμα `r` σημαίνει στην Python ότι αυτό που
  ακολουθεί είναι *ωμή συμβολοσειρά* (raw string), δηλαδή συμβολοσειρά
  στην οποία αγνοείται η ειδική σημασία που μπορεί να έχουν κάποιοι
  χαρακτήρες (όπως `\n`).

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

## Συμπερίληψη των URL της εφαρμογής

* Ανοίγουμε το αρχείο `project_site/urls.py`.

* Εισάγουμε (κάνουμε `import`) το `django.conf.urls.include` και το
  `django.conf.urls.url`.

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

<div class="notes">

Με τις ρυθμίσεις αυτές, ορίζουμε ότι:

* Όταν το μονοπάτι που δίνει ο χρήστης ξεκινάει με `djbr/`, θα
  χρησιμοποιούνται οι κανόνες που έχουν προδιαγραφεί στο αρχείο
  `djbr.urls`.

* Όταν το μονοπάτι που δίνει ο χρήστης ξεκινάει με `admin/`, θα
  χρησιμοιούνται οι κανόνες που έχουν προδιαγραφεί για την εφαρμογή
  admin. Την εφαρμογή αυτή θα τη δούμε σε λίγο.

</div>

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

<div class="notes">

Οι βοηθητικές αυτές εφαρμογές υλοποιούν λειτουργικότητες που συνήθως
χρειάζονται οι εφαρμογές τις οποίες εμείς αναπτύσσουμε.

* `django.contrib.admin`: είναι η εφαρμογή διαχείρισης admin που θα
  δούμε σε λίγο.

* `django.contrib.auth`: είναι σύστημα ταυτοποίησης (authentication)
  χρηστών.

* `django.contrib.contenttypes`: διαχειρίζεται τα διαφορετικά είδη
  περιεχομένου που μπορεί να περιέχει ένας διαδικτυακός τόπος (βίντεο,
  εικόνες, κείμενο, κ.λπ.).

* `django.contrib.sessions`: διαχειρίζεται τις συνεδρίες των χρηστών.

* `django.contrib.messages`: είναι σύστημα διαχείρισης μυνημάτων.

* `django.contrib.staticfiles`: διαχειρίζεται στατικά αρχεία. 

<div>


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
    pub_year = models.IntegerField('date published', default=2000)

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField(default="")
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

<div class="notes">

Πράγματι, αν ανοίξουμε το αρχείο `djbr/apps.py`, το οποίο έχει
δημιουργηθεί αυτόματα από το Django, θα δούμε ότι μέσα σε αυτό
ορίζεται η κλάση DjbrConfig. Περιλαμβάνοντας την κλάση αυτή μέσα στη
λίστα `INSTALLED_APPS` το Django θα τη συμπεριλαμβάνει πλέον στο
σύνολο των εφαρμογών που θα διαχειρίζεται για το συγκεκριμένο έργο.

</div>

## Δημιουργία μεταγωγής

* Ένα σύνολο αλλαγών που πρέπει να γίνουν στη βάση δεδομένων
  ονομάζεται *μεταγωγή* (migration).

* Για να δημιουργήσουμε μια μεταγωγή που να περιλαμβάνει τις
  τελευταίες αλλαγές στη βάση δίνουμε:

    ```bash
    python manage.py makemigrations djbr
    ```
* Θα εμφανιστεί τότε κάτι παρόμοιο με τα εξής:

    ```
    Migrations for 'djbr':
      djbr/migrations/0001_initial.py:
        - Create model Book
        - Create model Review
    ```

<div class="notes">

Ο μηχανισμός των μεταγωγών είναι από τα πιο πολύτιμα εργαλεία του
Django. Καθώς αναπτύσσουμε μια εφαρμογή, είναι φυσικό στην αρχή να
αλλάζουμε το σχεδιασμό των μοντέλων μας, και άρα αντίστοιχα και το
σχήμα της βάσης δεδομένων μας.

Χωρίς το μηχανισμό των μεταγωγών, θα ήμασταν υποχρεωμένοι να αλλάζουμε
το σχήμα της βάσης με SQL, και να κρατάμε κάπου όλο το ιστορικό των
αλλαγών που έχουμε κάνει, προκειμένου να ξέρουμε ακριβώς πώς έχουμε
φτάσει στο τρέχον σχήμα.

Με τις μεταγωγές όλα αυτά γίνονται αυτομάτως. Επιπλέον, αν χρειαστεί
να μεταφερθούμε σε μία άλλη βάση δεδομένων, το Django θα δει ότι στη
νέα βάση δεν έχουν εφαρμοστεί οι μεταγωγές, και θα κάνει ό,τι είναι
απαραίτητο ώστε στη νέα βάση να δημιουργηθεί το σχήμα που πρέπει.

Κάθε μεταγωγή αποθηκεύεται με το σειριακό της αριθμό στον κατάλογο
`djbr/migrations`. Σε μία εφαρμογή μπορούμε να έχουμε εκατοντάδες
μεταγωγές, που αντιστοιχούν σε εκατοντάδες αντίστοιχα αρχεία, τα οποία
διαχειρίζεται αυτομάτως το Django.

</div>

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
    "title" varchar(200) NOT NULL, "year" integer NOT NULL);
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

<div class="notes">

Αυτός είναι ο βασικός κύκλος με τον οποίο πραγματοποιούμε αλλαγές στη
βάση. Κάθε φορά που κάνουμε αλλαγές, δημιουργούμε μία μεταγωγή, την
οποία στη συνέχεια εφαρμόζουμε.

Τις μεταγωγές τις κρατάμε κανονικά στον αποθετήριο κώδικα του έργου
μας (π.χ. git), γιατί αποτελούν αναπόσπαστο κομμάτι του έργου μας.

</div>


# Χρησιμοποιώντας το API


## Αλληλεπίδραση με το API

* Μπορούμε να αλληλεπιδράσουμε απ' ευθείας προγραμματιστικά (δηλαδή με
  το Application Programming Interface, API) με τα αντικείμενα της
  εφαρμογής μας, δίνοντας:

    ```bash
    python manage.py shell
    ```

* Αυτό θα ξεκινήσει μια γραμμή εντολών Python με τις απαραίτητες
  ρυθμίσεις για να έχουμε πρόσβαση στα αντικείμενα του Django και τις
  εφαρμογής μας. Για το λόγο αυτό θα τη λέμε "γραμμή εντολών Django".


## Χρήση IPython (1)

* Ακόμα καλύτερα, μπορούμε να χρησιμοποιήσουμε το IPython αντί για την
  απλή γραμμή εντολών της Python.

* Για να το κάνουμε αυτό εγκαθιστούμε το πακέτο Django Extensions:

    ```python
    python install django_extensions
    ```

## Χρήση IPython (2)

* Κσι στη συνέχεια προσθέτουμε το πακέτο στη λίστα των
  `INSTALLED_APPS` στις ρυθμίσεις του Django:

    ```python
    INSTALLED_APPS = [
    ...,
    'django_extensions',
    ]
    ```

* Οπότε μπορούμε να ξεκινήσουμε γραμμή εντολών IPython με τις
  ρυθμίσεις του Django ως εξής:
  
    ```bash
    python manage.py shell_plus --ipython
    ```

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
    >>> b = Book(title="The Great Greek Novel", pub_year=2015)
    >>> b.save()
    ```

## Προσπέλαση πεδίων

* Έχουμε πρόσβαση στα πεδία των αντικειμένων ως απλά πεδία στην
  Python. 

    ```python
    >>> b.id
    1
    >>> b.title
    'The Great Greek Novel'
    >>> b.pub_year
    2015
    ```

## Αλλαγές στα πεδία

* Ομοίως μπορούμε να τα αλλάξουμε κατά βούληση.

    ```python
    >>> b.title = "The Great Greek Novel, Vol. 2"
    >>> b.save()
    >>> Book.objects.all()
    <QuerySet [<Book: Book object>]>
    ```

## Εμφάνιση αντικειμένων

* Το `<Book: Book object>` δεν είναι καθόλου κατατοπιστικό.

* Μπορούμε να βελτιώσουμε τον τρόπο με τον οποίο εμφανίζονται τα
  αντικείμενα προσθέτοντας μια μέθοδο `__str()__`.

## Κλάση `Book`

```python
class Book(models.Model):
    title = models.CharField(max_length=200)
    pub_year = models.IntegerField('year published', default=2000)

    def __str__(self):
        return "%s %s" % (self.title, self.pub_year)
```

<div class="notes">

Η μέθοδος `__str()__` στην Python επιστρέφει πάντα μία συμβολοσειρά
που δίνει μια ευανάγνωστη αναπαραστάση του αντικειμένου. Είναι
αντίστοιχη με τη μέθοδο `toString()` της Java.

</div>

## Κλάση `Review`

```python
class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    review_date = models.DateTimeField('review date')

    def __str__(self):
        return "%s %s" % (self.title, self.review_date)
```

## Επιπλέον μέθοδοι

* Φυσικά μπορούμε να εισάγουμε επιπλέον μεθόδους στις κλάσεις μας.

* Ας εισάγουμε μία μέθοδο που θα μας δείχνει αν ένα βιβλίο έχει
  εκδοθεί πρόσφατα (μέσα στον τελευταίο χρόνο):

    ```python
    import datetime
    from django.utils import timezone

    class Book(models.Model):
        title = models.CharField(max_length=200)
        pub_year = models.IntegerField('year published', default=2000)


        def was_published_recently(self):
            return self.pub_year >= timezone.now().year - 1)

        def __str__(self):
            return "%s %s" % (self.title, self.pub_year)
    ```

## Αναζητήσεις στη βάση

* Ξαναρχίζουμε μια γραμμή εντολή Django προκειμένου να δοκιμάσουμε τα
  αντικείμενά μας.
  
* Απλή αναζήτηση όλων:

    ```python
    >>> from djbr.models import Book, Review

    >>> Book.objects.all()
<QuerySet [<Book: The Great Greek Novel, Vol. 2 2015>]>
    ```

* Αναζήτηση με βάση συγκεκριμένο πεδίο:

    ```python
    >>> Book.objects.filter(id=1)
    <QuerySet [<Book: The Great Greek Novel, Vol. 2 2015>]>
    ```

## Αναζήτηση ενός αντικειμένου με άλλα φίλτρα

* Έστω ότι θέλουμε να βρούμε τα βιβλίο που ο τίτλος τους αρχίζει με "The":

    ```
    >>> Book.objects.filter(title__startswith='The')
    <QuerySet [<Book: The Great Greek Novel, Vol. 2 2015>]>
    ```

* Ή ότι θέλουμε να βρούμε τα βιβλία τα οποία έχουν εκδοθεί τον
  τελευταίο χρόνο.

    ```python
    >>> from django.utils import timezone

    >>> last_year = timezone.now().year - 1

    >>> Book.objects.filter(pub_year__gte=last_year)
    <Book: The Great Greek Novel, Vol. 2 2015>
    ```

<div class="notes">

Οι αναζητήσεις γίνονται περνώντας τις κατάλληλες παραμέτρους στη
μέθοδο `filter()`. Η `filter()` επιστρέφει ένα αντικείμενο τύπου
`QuerySet` το οποίο περιέχει τα αποτελέσματα της αναζήτησης, αν
υπάρχουν. Αν δεν υπάρχουν το `QuerySet` είναι κενό. 

Η συγκεκριμένη παράμετρος σημαίνει: "βρες τα βιβλία των οποίων το
πεδίο `pub_year` είναι μεγαλύτερο ή ίσο (`gte`) από τη μεταβλητή
`last_year`". Οι τελεστές της αναζήτησης χωρίζονται από τα πεδία της
αναζήτησης με `__`. Υπάρχουν πολλοί τελεστές αναζήτησης, έτσι ώστε να
μπορούν να καλυφθούν διάφορα σενάρια. Για να τους βρείτε, δείτε την
[τεκμηρίωση του QuerySet](https://docs.djangoproject.com/en/1.10/ref/models/querysets/).

</div>

## Ανεπιτυχείς αναζητήσεις

* Αν αναζητούμε μόνο ένα αντικείμενο, μπορούμε να χρησιμοποιήσουμε τη
  μέθοδο `get()`. Αν το αντικείμενο δεν υπάρχει θα πάρουμε μια
  εξαίρεση τύπου `DoesNotExist`:

    ```python
    >>> Book.objects.get(id=2)
    ...

    DoesNotExist: Book matching query does not exist.
    ```

* Αν τυχόν υπάρχουν περισσότερα από ένα αντικείμενο που ταιριάζουν
  στους όρους αναζήτησης, θα πάρουμε μια εξαίρεση τύπου
  `MultipleObjectsReturned`. 

<div class="notes">

Η μέθoδος `get()` παίρνει αντίστοιχες παραμέτρους με τη μέθοδο
`filter()`.

</div>

## Αναζήτηση με βάση το πρωτεύον κλειδί.

* Επειδή η αναζήτηση με το πρωτεύον κλειδί είναι πολύ συνηθισμένη, το
  Django προσφέρει μια συντόμευση γι' αυτήν.

    ```python
    >>> Book.objects.get(pk=1)
    <Book: The Great Greek Novel, Vol. 2 2015>
    ```

* Με την ευκαιρία, μπορούμε να δοκιμάσουμε αν δουλεύει η μέθοδος
  `was_published_recently()` που προσθέσαμε:

    ```python
    >>> b = Book.objects.get(pk=1)
    >>> b.was_published_recently()
    True
    ```

## Δημιουργία σχετιζόμενων αντικειμένων

* Αυτή τη στιγμή το βιβλίο μας δεν έχει καμμία κριτική:


    ```python
    >>> b.review_set.all()
    <QuerySet []>
    ```
    
* Ας προσθέσουμε λοιπόν τρεις κριτικές:

    ```python
    >>> b.review_set.create(title="Excellent", text="Best book read this year", review_date=timezone.now())
    <Review: Excellent 2016-10-09 15:44:22.452253+00:00>

    >>> b.review_set.create(title="Not bad", text="Good stuff to fill some afternoons", review_date=timezone.now())
    <Review: Not bad 2016-10-09 15:45:34.550851+00:00>

    >>> r = b.review_set.create(title="Awful", text="Trivial pulp", review_date=timezone.now())
    Out[4]: <Review: Awful 2016-10-09 15:46:39.238401+00:00>
    ```


## Πλοήγηση μεταξύ αντικειμένων

* Σε μία σχέση ένα προς πολλά μπορούμε πάντα να πάμε από τη μεριά των
  πολλών στη μεριά του ενός:

    ```python
    >>> r.book
    <Book: The Great Greek Novel, Vol. 2 2016-10-08 17:57:55.646201+00:00>
    ```

* Ενώ φυσικά μπορούμε πάντα να πάμε από τη μεριά του ενός στα πολλά:

    ```python
    >>> b.review_set.all()
    <QuerySet [<Review: Excellent 2016-10-09 15:44:22.452253+00:00>,
    <Review: Not bad 2016-10-09 15:45:34.550851+00:00>,
    <Review: Awful 2016-10-09 15:50:01.586050+00:00>]>
    >>> b.review_set.count()
    3
    ```

## Πλοήγηση και φίλτρα

* Επίσης, μπορούμε να πλοηγηθούμε μέσω αντικειμένων και στα φίλτρα
  αναζητήσεων:

    ```python
    >>> Review.objects.filter(book__pub_year=last_year)
    <QuerySet [<Review: Excellent 2016-10-09 15:44:22.452253+00:00>,
    <Review: Not bad 2016-10-09 15:45:34.550851+00:00>,
    <Review: Awful 2016-10-09 15:50:01.586050+00:00>]>
    ```

<div class="notes">

Το παραπάνω φίλτρο διαβάζεται ως: "βρες τις κριτικές που αντιστοιχούν
σε βιβλία των οποίων το πεδίο `pub_year` είναι ίσο με τη μεταβλητή
`last_year`". 

</div>

## Διαγραφή αντικειμένων 

* Η διαγραφή αντικειμένων γίνεται με τη μέθοδο `delete()`:

    ```python
    >>> r = b.review_set.filter(text__startswith='Trivial')
    >>> r.delete()
    (1, {'djbr.Review': 1})
    ```

# Μεταφορά σε MySQL


## Δημιουργία βάσης

* Για να δημιουργήσουμε τη βάση πρέπει να δώσουμε τα παρακάτω στη MySQL:

    ```sql
    CREATE DATABASE djbr CHARACTER SET utf8 COLLATE utf8_general_ci;

    CREATE USER 'djbr_user'@'localhost' IDENTIFIED BY 'g8nzmktk6y';

    GRANT ALL PRIVILEGES ON djbr.* TO 'djbr_user'@'localhost';
    ```


## Εγκατάσταση οδηγού

* Το Django λειτουργεί πιο εύκολα με τον οδηγό
  [mysqlclient](https://pypi.python.org/pypi/mysqlclient).

* Για να τον εγκαταστήσουμε δίνουμε:

    ```bash
    pip install mysqlclient
    ```
* Αν στην εγκατάσταση λάβουμε κάποιο μήνυμα λάθους, ίσως φταίει ότι
  η MySQL δεν είναι στο μονοπάτι του συστήματος.

    * Στην περίπτωση που έχουμε Mac OS ή Linux δίνουμε:
    ```bash
    export PATH=$PATH:/usr/local/mysql/bin
    ```
    (ή όποιο άλλο είναι το μονοπάτι)


## Ρυθμίσεις Django

* Θα φτιάξουμε ένα αρχείο `site_config.py` στον κατάλογο
  `project_settings/project_settings` με τα εξής περιεχόμενα:

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'djbr',
            'USER': 'djbr_user',
            'PASSWORD': 'g8nzmktk6y',
            'HOST': '127.0.0.1',
        }
    }
    ```

* Επίσης, στο *τέλος* του αρχείου `settings.py` θα προσθέσουμε τα
  εξής:

    ```python
    try:
        from .site_config import *
    except ImportError as ex:
        print(ex)
        pass
    ```

<div class="notes">

Αυτό είναι ένα κλασικό ιδίωμα στην Python. Προσπαθούμε να φορτώσουμε
το αρχείο `site_config.py` από τον τοπικό κατάλογο.

* Σε περίπτωση που δεν υπάρχει, θα εμφανίσουμε ένα σχετικό μήνυμα και
  θα συνεχίσουμε κανονικά. Συνεπώς θα εξακολοθήσουν να ισχύουν οι
  ρυθμίσεις που υπάρχουν στο αρχείο `settings.py`.

* Σε περίπτωση που υπάρχει, θα διαβαστεί και θα εκτελεστεί ο
  κώδικάς του. Συνεπώς, θα ισχύσουν οι ρυθμίσεις για τη μεταβλητή
  `DATABASES` από το `site_config.py`. 

* Το αρχείο `settings.py` μπορούμε λοιπόν να το αποθηκεύουμε χωρίς
  πρόβλημα, ακόμα και σε δημόσια αποθετήρια. Αντιθέτως, το αρχείο
  `site_config.py` το κρατάμε μυστικό.

</div>

## `SECRET_KEY`

* Με την ευκαιρία, στο ίδιο αρχείο `site_config.py` αποθηκεύουμε την
  τιμή της μεταβλητής `SECRET_KEY` που *δεν* θέλουμε να παραμείνει όσο
  το δυνατόν μυστική.

    ```python
    SECRET_KEY = '#8*xfqx#w(k@*fr9i=50i1k&wt2xr1b5k!f9%rq@^ewb2%l69*'
    ```

<div class="notes">

Η τιμή αυτής της μεταβλητής είναι μία τυχαία συμβολοσειρά. Όταν ένα
έργο δημιουργείται με `django_admin startproject` στη μεταβλητή αυτή
δίνεται μια τυχαία τιμή μέσα στο αρχείο `settings.py`.

Το `SECRET_KEY` χρησιμοποιείται για δημιουργία κρυπτογραφικών
υπογραφών και είναι σημαντικό να μη διαρρεύσει. Συνεπώς, με την ίδια
λογική όπως προηγουμένως, μπορούμε να έχουμε την πραγματική τιμή του
στο αρχείο `site_config.py`, και μία άλλη τιμή στο `settings.py`.

</div>


## Δημιουργία πινάκων

* Για τη δημιουργία των πινάκων της βάσης απλώς δίνουμε:

    ```bash
    python manage.py migrate
    ```

* Μπορούμε να επιβεβαιώσουμε τι δημιουργήθηκε από το MySQL Workbench
  ως εξής:

    ```bash
    USE djbr;

    SHOW TABLES;
    ```

# Django admin

## Γενικά

* Για κάθε εφαρμογή που φτιάχνουμε στο Django, το Django αυτόματα
  δημιουργεί μια *εφαρμογή διαχείρισης* (admin app).

* Με την εφαρμογή αυτή μπορούμε να διαχειριστούμε όλα τα αντικείμενα
  της εφαρμογής μας με εύκολο τρόπο, μέσω του browser μας.

<div class="notes">

Η εφαρμογή διαχείρισης του Django είναι από τα πιο δημοφιλή
χαρακτηριστικά του. Υπάρχουν προγραμματιστές για τους οποίους οι
ευκολίες που παρέχει την καθιστούν βασικό παράγοντα επιλογής του
Django για την εφαρμογή τους.

</div>


## Δημιουργία διαχειριστή

* Ξεκινάμε δημιουργώντας ένα διαχειριστή της εφαρμογής μας.

    ```bash
    python manage.py createsuperuser
    ```
* Θα μας ζητηθεί να δώσουμε το όνομα του χρήστη:

    ```bash
    Username (leave blank to use 'panos'): admin
    ```

* Και στη συνέχεια τη διεύθυνση ηλεκτρονικού ταχυδρομείου του:

    ```bash
    Email address: louridas@aueb.gr
    ```

* Τέλος, θα πρέπει να εισάγουμε δύο φορές τον κωδικό εισόδου:

    ```bash
    Password:
    Password (again):
    Superuser created successfully.
    ```

<div class="notes">

To Django έχει ενσωματωμένο ολοκληρωμένο σύστημα διαχείρισης χρηστών.
Ανάμεσα στους χρήστες υπάρχει και ένας χρήστης με αυξημένα προνόμια, ο
superuser, ο οποίος έχει πλήρη πρόσβαση σε όλες τις δυνατότητες της
εφαρμογής διαχείρισης.

</div>

## Πρόσβαση στην εφαρμογή διαχείρισης

* Η εφαρμογή διαχείρισης είναι ήδη ενεργοποιημένη.

* Αν ο εξυπηρετής δεν τρέχει, τον ξεκινάμε:

    ```bash
    python manage.py runserver
    ```

* Στη συνέχεια, πηγαίνουμε στη σελίδα `/admin/`, δηλαδή
  `http://127.0.0.1:8000/admin`.

## Είσοδος στην εφαρμογή διαχείρισης

![admin login](./django_1/django_admin_1.jpg){ width=50% }


<div class="notes">

Εισάγουμε το όνομα και τον κωδικό του superuser που δημιουργήσαμε.

</div>

## Κεντρική σελίδα ελέγχου

![main page](./django_1/django_admin_2.jpg){ width=70% }

<div class="notes">

Αφού πιστοποιηθούμε, θα μπούμε στην κεντρική σελίδα της εφαρμογής
διαχείρισης, όπου όμως δεν θα δούμε τα αντικείμενα της εφαρμογής μας,
αλλά άλλα αντικείμενα (Groups, Users) που συντηρεί το Django. Παρότι
είναι πολύ χρήσιμα, προς το παρόν ας επικεντρωθούμε στα αντικείμενα
που εμείς οι ίδιοι δημιουργούμε.

</div>

## Εμφάνιση της εφαρμογής μας

* Για να συμπεριληφθεί η εφαρμογή μας στην εφαρμογή διαχείρισης, θα
  πρέπει να κάνουμε τις απαραίτητες ρυθμίσεις.

* Ανοίγουμε το αρχείο `djbr/admin.py` και γράφουμε τα παρακάτω:

    ```python
    from django.contrib import admin

    from .models import Book, Review

    admin.site.register(Book)
    admin.site.register(Review)
    ```

* Τώρα θα δούμε, και θα μπορούμε να χειριστούμε, και τα αντικείμενα
  της εφαρμογής μας.

## Κεντρική σελίδα ελέγχου

![main page](./django_1/django_admin_3.jpg){ width=70% }

<div class="notes">

Μέσα από την εφαρμογή διαχείρισης μπορείτε να δημιουργήσετε νέα
αντικείμενα, να αλλάξετε αντικείμενα, ή να διαγράψετε αντικείμενα.
Αξίζει τον κόπο να αφιερώσετε λίγο χρόνο να εξερευνήσετε τη
λειτουργικότητά της. 

</div>
