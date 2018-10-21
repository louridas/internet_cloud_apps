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

# Δημιουργία Εφαρμογής

## Δημιουργία Καταλόγων Έργου

* Για να δημιουργηθεί η βασική δομή καταλόγων του έργου μας, γράφουμε
  τα παρακάτω:

    ```bash
    django-admin startproject project_site
    ```

* Τότε θα δημιουργηθεί η ακόλουθη δομή καταλόγων:

    ```
    project_site
    ├── manage.py
    └── project_site
        ├── __init__.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py
    ```

<div class="notes">

* Ο εξωτερικός κατάλογος `project_site/` περιέχει το σύνολο του έργου που θα
  φτιάξουμε. Μπορούμε να αλλάξουμε το όνομά του, καθώς δεν έχει κάποια
  σημασία για το Django.

* Το `manage.py` είναι ένα εργαλείο το οποίο μας επιτρέπει να
  [αλληλεπιδράσουμε και να διαχειριστούμε το Django](https://docs.djangoproject.com/en/2.1/ref/django-admin/).
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
  [ρυθμίσεις](https://docs.djangoproject.com/en/2.1/topics/settings/)
  αφορούν τις συνδέσεις με τη βάση δεδομένων, τη ζώνη ώρας, κ.ά.

* Το αρχείο `project_site/urls.py` δηλώνει τα
  [URLs τα οποία θα διαχειρίζεται το έργο μας](https://docs.djangoproject.com/en/2.1/topics/http/urls/).
  Στην ουσία είναι ένας «πίνακας περιεχόμενων» για το έργο μας.

* Το αρχείο `project_site/wsgi.py` χρησιμοποιείται για την
  αλληλεπίδραση του Django με εξυπηρετητές WSGI, όπως ο Gunicorn.

</div>

## Εκκίνηση Εξυπηρετητή Ανάπτυξης

* Μετακινούμαστε στον κατάλογο `project_site` και γράφουμε:

    ```bash
    python manage.py runserver
    ```

* Ο εξυπηρετητής θα ξεκινήσει στη διεύθυνση `http://127.0.0.1:8000/`

* Τη στιγμή αυτή αφού δεν έχουμε φτιάξει κάτι, θα πάρουμε απλώς μια
  πληροφοριακή σελίδα.

<div class="notes">

Λέμε *εξυπηρετής ανάπτυξης* (development server) γιατί ο συγκεκριμένος
εξυπηρετητής είναι βολικός για τη συγγραφή της εφαρμογής μας, αλλά
*δεν* είναι κατάλληλος για την παραγωγική χρήση της εφαρμογής μας.

Στην οθόνη του τερματικού μας θα δούμε ένα μήνυμα που θα προειδοποιεί
ότι δεν έχουμε εφαρμόσει κάποιες μεταγωγές (You have unapplied
migrations). Θα δούμε στη συνέχεια τι σημαίνει αυτό.

Όταν θέλουμε να βγάλουμε την υπηρεσία μας στην παραγωγή θα πρέπει να
χρησιμοποιήσουμε άλλους εξυπηρετητές, και συγκεκριμένα είτε τον
[Apache](https://httpd.apache.org/) 
είτε τον [nginx](https://www.nginx.com/).

Αν θέλουμε να ξεκινήσει ο εξυπηρετητής σε άλλη πόρτα, τη δίνουμε ως
παράμετρο π.χ.:

```bash
python manage.py runserver 8080
```

Αν θέλουνε να ακούει ο εξυπηρετητής σε άλλη διεύθυνση, την δίνουμε
επίσης ως παράμετρο, π.χ.:

```bash
python manage.py runserver 0:8080
```

Η διεύθυνση `0` είναι συντομογραφία της `0.0.0.0`, η οποία δηλώνει ότι
το Django θα ακούει σε όλες τις δημόσιες διευθύνσεις IP του
μηχανήματός μας.

</div>

## Δημιουργία Εφαρμογής

* Κάθε έργο που φτιάχνουμε μπορεί να περιλαμβάνει μία ή περισσότερες
  εφαρμογές (apps).

* Για να φτιάξουμε τον σκελετό της εφαρμογής μας δίνουμε, μέσα στον
  εξωτερικό κατάλογο `project_site` που φτιάξαμε:

    ```bash
    python manage.py startapp djbr
    ```

* Το `djbr` σημαίνει «Django Book Reviews».

* Θα δημιουργηθεί η ακόλουθη δομή καταλόγων:

    ```
    djbr/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
    ```

<div class="notes">

* Κάθε εφαρμογή είναι απλώς ένα πακέτο Python το οποίο ακολουθεί
  κάποιες συγκεκριμένες συμβάσεις ως προς τα ονόματα των αρχείων του
  και τις δομές καταλόγων.

* Με το `python manage.py startapp` δημιουργείται αυτομάτως η σωστή
  δομή. 

</div>

## Δημιουργία της Πρώτης Σελίδας

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

Στα αγγλικά δεν μιλάμε για σελίδα, αλλά για όψη (view). Ο όρος
προέρχεται από την αρχιτεκτονική
[Model-View Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).
Στην αρχιτεκτονική αυτή, μια εφαρμογή απαρτίζεται από *μοντέλα*
(models), *όψεις* (views), και *ελεγκτές* (controllers). Στα
ελληνικά όμως ο όρος όψη ίσως δεν φαίνεται πολύ καλά, οπότε θα
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

* Δημιουργούμε το αρχείο `djbr/urls.py`. Αυτό σημαίνει ότι η δομή
  καταλόγων μας θα έχει γίνει:
  
    ```
    djbr/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    ├── urls.py
    └── views.py
    ```

## Περιεχόμενα `urls.py`

* Στο αρχείο `djbr/urls.py` γράφουμε:

    ```python
    from django.urls import path

    from . import views

    urlpatterns = [
        path('', views.index, name='index'),
    ]
    ```

<div class="notes">

* Η πρώτη παράμετρος της συνάρτησης `url()`αντιστοιχεί στο μονοπάτι
  που θέλουμε να αντιστοιχίσουμε στη σελίδα. 

* Η δεύτερη παράμετρος της συνάρτησης `url()` δίνει τη συνάρτηση μέσα
  στο `views.py` που θα χειριστεί την αίτηση του χρήστη.

* Η τρίτη παράμετρος της συνάρτησης `url()` βαφτίζει το συγκεκριμένο
  URL. Με το όνομα αυτό θα μπορούμε να αναφερόμαστε στο URL από άλλα
  σημεία της εφαρμογής μας. Επιπλέον, αν χρειαστεί να αλλάξουμε το
  URL, αρκεί να το αλλάξουμε μόνο στο συγκεκριμένο σημείο και όχι
  αλλού στην εφαρμογή.

* Μπορούμε να περάσουμε και άλλες παραμέτρους με τη μορφή `key=value`.
  Οι παράμετροι αυτοί θα χρησιμοποιηθούν από τη συνάρτηση χειρισμού
  της σελίδας.

</div>

## Συμπερίληψη των URL της εφαρμογής

* Ανοίγουμε το αρχείο `project_site/urls.py`.

* Εισάγουμε (κάνουμε `import`) το `django.urls.include`.

* Συμπεριλαμβάνουμε το αρχείο `djbr/urls.py` μέσα στο αρχείο
  `project_site/urls.py`. 

    ```python
    from django.contrib import admin
    from django.urls import include, path

    urlpatterns = [
        path('djbr/', include('djbr.urls')),
        path('admin/', admin.site.urls),
    ]
    ```
* Για να δούμε το αποτέλεσμα ξεκινάμε πάλι τον εξυπηρετητή και
  πηγαίνουμε στο `http://127.0.0.1:8000/djbr/`.

<div class="notes">

Η συνάρτηση `include()` κόβει το κομμάτι του URL το οποίο ταιριάζει
μέχρι εκείνη τη στιγμή και περνάει το υπόλοιπο URL για περαιτέρω
επεξεργασία στο αρχείο που περνάμε ως παράμετρο. Χρησιμοποιούμε πάντα
`include` για να συμπεριλάβουμε περιγραφές URLs από άλλα αρχεία. Το
`admin.site.urls` είναι η μόνη εξαίρεση.

Με τις ρυθμίσεις αυτές, ορίζουμε ότι:

* Όταν το μονοπάτι που δίνει ο χρήστης ξεκινάει με `djbr/`, θα
  χρησιμοποιούνται οι κανόνες που έχουν προδιαγραφεί στο αρχείο
  `djbr.urls`.

* Όταν το μονοπάτι που δίνει ο χρήστης ξεκινάει με `admin/`, θα
  χρησιμοποιούνται οι κανόνες που έχουν προδιαγραφεί για την εφαρμογή
  διαχείρισης (admin). Την εφαρμογή αυτή θα τη δούμε σε λίγο.

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

* Αν θέλουμε να δούμε τους πίνακες αυτούς, δίνουμε:
   
   ```bash
   sqlite3 db.sqlite3
   
   .schema
   ```

<div class="notes">

Με την εντολή αυτή θα δημιουργηθούν οι απαραίτητοι πίνακες στη βάση.
Στην οθόνη του τερματικού μας θα εμφανιστούν κάποια μηνύματα τα οποία
μας ενημερώνουν για τη σχετική τρόπο μέσω των μεταγωγών που
εφαρμόζονται. Το τι είναι οι μεταγωγές θα το δούμε σε λίγο. 

</div>

# Δημιουργία μοντέλων

## Βασικές οντότητες

* Θα ξεκινήσουμε την εφαρμογή μας με δύο οντότητες.

* Η οντότητα `Book` θα αντιπροσωπεύει ένα βιβλίο.

* Η οντότητα `Review` θα αντιπροσωπεύει μια κριτική για ένα βιβλίο.

* Γράφουμε στο αρχείο `djbr/models.py` τα παρακάτω.

<div class="notes">

Το Django έχει ενσωματωμένες δυνατότητες αντιστοίχισης μεταξύ
αντικειμένων Python και οντοτήτων στη βάση (Object-Relational Mapping,
ORM). Οι κλάσεις μας που θα αποθηκευτούν στη βάση ονομάζονται
*μοντέλα* (models) και είναι παιδιά της κλάσης `Model`. 

Κάθε ένα μοντέλο είναι μία κλάση τα πεδία της οποία θα αντιστοιχιστούν
σε στήλες του αντίστοιχου πίνακα της βάσης. Κάθε πεδίο έχει έναν τύπο
που προσδιορίζει πώς ακριβώς θα αποθηκευτεί στη βάση (ως ακέραιος,
συμβολοσειρά, κ.ά.)

</div>


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

* Στο αρχείο `project_site/settings.py` αλλάζουμε τη ρύθμιση
  `INSTALLED_APPS` ως εξής:

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
    "title" varchar(200) NOT NULL, 
    "year" integer NOT NULL);
    --
    -- Create model Review
    --
    CREATE TABLE "djbr_review" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" varchar(200) NOT NULL, 
    "text" text NOT NULL,
    "review_date" datetime NOT NULL,
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

    ```
    Operations to perform:
      Apply all migrations: admin, auth, contenttypes, djbr, sessions
    Running migrations:
      Applying djbr.0001_initial... OK
    ```

## Κύκλος μεταγωγών

* Κάνουμε τις αλλαγές στα μοντέλα μας (στο `models.py`).

* Δίνουμε `python manage.py makemigrations` για να δημιουργήσουμε τις
  μεταγωγές που αντιστοιχούν στις αλλαγές που κάναμε.

* Δίνουμε `python manage.py migrate` για να εφαρμόσουμε τις μεταγωγές
  στη βάση.

* Το Django καταγράφει ποιες μεταγωγές έχουν εφαρμοστεί σε έναν δικό
  του πίνακα, τον `django_migrations`, που φτιάχνει και διατηρεί στη
  βάση. 

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
  εφαρμογής μας. Για το λόγο αυτό θα τη λέμε «γραμμή εντολών Django».

<div class="notes">

Αν έχουμε εγκαταστήσει το IPython στον υπολογιστή μας η παραπάνω
εντολή θα ξεκινήσει μία γραμμή εντολών IPython&ndash;άρα ένας λόγος
ακόμα να εγκαταστήσετε το IPython αν δεν το έχετε κάνει ήδη.

</div>

## Αναζήτηση βιβλίων

* Για να αναζητήσουμε όλα τα βιβλία στη βάση χρησιμοποιούμε τη μέθοδο
  `Book.objects.all()`

* Κατ΄ αρχήν θα πρέπει να εισάγουμε τα αντίστοιχα αντικείμενα στο
  περιβάλλον μας, οπότε ξεκινάμε με τα κατάλληλα imports.

    ```pythonconsole[python3]
    >>> from djbr.models import Book, Review
    >>> Book.objects.all()
    <QuerySet []>
    ```

## Δημιουργία βιβλίου

* Για να δημιουργήσουμε βιβλία, απλώς καλούμε τον κατασκευαστή των
  αντικειμένων `Book` και στη συνέχεια τη μέθοδο `save()`.

    ```pythonconsole[python3]
    >>> b = Book(title="The Seventh Function of Language", pub_year=2017)
    >>> b.save()
    ```

## Προσπέλαση πεδίων

* Έχουμε πρόσβαση στα πεδία των αντικειμένων ως απλά πεδία στην
  Python. 

    ```pythonconsole[python3]
    >>> b.id
    1
    >>> b.title
    'The Seventh Function of Language'
    >>> b.pub_year
    2017
    ```

## Αλλαγές στα πεδία

* Ομοίως μπορούμε να τα αλλάξουμε κατά βούληση.

    ```pythonconsole[python3]
    >>> b.title = "The 7th Function of Language"
    >>> b.save()
    >>> Book.objects.all()
    <QuerySet [<Book: Book object (1)>]>
    ```

## Προσθήκη και άλλων βιβλίων

* Ας προσθέσουμε δύο ακόμα βιβλία για να έχουμε λίγα περισσότερα
  δεδομένα στη βάση.

    ```pythonconsole[python3]
    >>> b = Book(title="La Septième Fonction du langage : qui a tué Roland Barthes?", pub_year=2015)
    >>> b.save()
    >>> b = Book(title="La Vérité sur l'affaire Harry Quebert", pub_year=2012)
    >>> b.save()
    >>> Book.objects.all()
    <QuerySet [<Book: Book object (1)>, <Book: Book object (2)>, <Book: Book object (3)>]>
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
    text = models.TextField(default="")
    review_date = models.DateTimeField('review date')

    def __str__(self):
        return "%s %s %s" % (self.title, self.text, self.review_date)
```

## Βελτιωμένη εμφάνιση αντικειμένων

* Τώρα μπορούμε να διαπιστώσουμε ότι τα βιβλία μας εμφανίζονται
  καλύτερα.
  
* Βγαίνουμε από το shell, ξαναμπαίνουμε, και δίνουμε:
  
```pythonconsole[python3]
>>> from djbr.models import Book
>>> Book.objects.all()
 <QuerySet [<Book: The 7th Function of Language 2017>, <Book: La Septième Fonction du langage : qui a tué Roland Barthes? 2015>, <Book: La Vérité sur l'affaire Harry Quebert 2012>]>
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
            return (self.pub_year >= timezone.now().year - 1)

        def __str__(self):
            return "%s %s" % (self.title, self.pub_year)
    ```

## Αναζητήσεις στη βάση

* Ξαναρχίζουμε μια γραμμή εντολή Django προκειμένου να δοκιμάσουμε τα
  αντικείμενά μας.
  
* Ας θυμηθούμε την απλή αναζήτηση όλων:

    ```pythonconsole[python3]
    >>> from djbr.models import Book, Review

    >>> Book.objects.all()
    <QuerySet [<Book: The 7th Function of Language 2017>, <Book: La Septième Fonction du langage : qui a tué Roland Barthes? 2015>, <Book: La Vérité sur l'affaire Harry Quebert 2012>]>    
    ```

* Αναζήτηση με βάση συγκεκριμένο πεδίο:

    ```pythonconsole[python3]
    >>> Book.objects.filter(id=1)
    <QuerySet [<Book: The 7th Function of Language 2017>]>
    ```

## Αναζήτηση ενός αντικειμένου με άλλα φίλτρα

* Έστω ότι θέλουμε να βρούμε τα βιβλίο που ο τίτλος τους αρχίζει με «The»:

    ```pythonconsole[python3]
    >>> Book.objects.filter(title__startswith='The')
    <QuerySet [<Book: The 7th Function of Language 2017>]>  
    ```

* Ή ότι θέλουμε να βρούμε τα βιβλία τα οποία έχουν εκδοθεί τα τελευταία
  τρία χρόνια (βρισκόμαστε στο 2018):

    ```pythonconsole[python3]
    >>> from django.utils import timezone

    >>> pub_year = timezone.now().year - 3

    >>> Book.objects.filter(pub_year__gte=pub_year)
    <QuerySet [<Book: The 7th Function of Language 2017>, <Book: La Septième Fonction du langage : qui a tué Roland Barthes? 2015>]>    
    ```

<div class="notes">

Οι αναζητήσεις γίνονται περνώντας τις κατάλληλες παραμέτρους στη
μέθοδο `filter()`. Η `filter()` επιστρέφει ένα αντικείμενο τύπου
`QuerySet` το οποίο περιέχει τα αποτελέσματα της αναζήτησης, αν
υπάρχουν. Αν δεν υπάρχουν το `QuerySet` είναι κενό. 

Η συγκεκριμένη παράμετρος σημαίνει: «βρες τα βιβλία των οποίων το
πεδίο `pub_year` είναι μεγαλύτερο ή ίσο (`gte`) από τη μεταβλητή
`pub_year`». Οι τελεστές της αναζήτησης χωρίζονται από τα πεδία της
αναζήτησης με `__`. Υπάρχουν πολλοί τελεστές αναζήτησης, έτσι ώστε να
μπορούν να καλυφθούν διάφορα σενάρια. Για να τους βρείτε, δείτε την
[τεκμηρίωση του QuerySet](https://docs.djangoproject.com/en/2.1/ref/models/querysets/).

</div>

## Ανεπιτυχείς αναζητήσεις

* Αν αναζητούμε μόνο ένα αντικείμενο, μπορούμε να χρησιμοποιήσουμε τη
  μέθοδο `get()`. Αν το αντικείμενο δεν υπάρχει θα πάρουμε μια
  εξαίρεση τύπου `DoesNotExist`:

    ```pythonconsole[python3]
    >>> Book.objects.get(id=10)
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

    ```pythonconsole[python3]
    >>> Book.objects.get(pk=1)
    <Book: The 7th Function of Language 2017>
    ```

* Με την ευκαιρία, μπορούμε να δοκιμάσουμε αν δουλεύει η μέθοδος
  `was_published_recently()` που προσθέσαμε:

    ```pythonconsole[python3]
    >>> b = Book.objects.get(pk=1)
    >>> b.was_published_recently()
    True
    ```

## Δημιουργία σχετιζόμενων αντικειμένων

* Αυτή τη στιγμή το βιβλίο μας δεν έχει καμμία κριτική:


    ```pythonconsole[python3]
    >>> b.review_set.all()
    <QuerySet []>
    ```
    
* Ας προσθέσουμε λοιπόν τρεις κριτικές:

```pythonconsole[python3]
>>> b.review_set.create(title='The 7th Function of Language by Laurent Binet – who killed Roland Barthes? By Lauren Elkin in The Guardian',
text='With this freewheeling fantasy about the death of the celebrated French critic, Binet delivers a second novel as erudite and engaging as his first', 
review_date="2017-05-05 06:30:00+01:00")
<Review: The 7th Function of Language by Laurent Binet – who killed Roland Barthes? By Lauren Elkin in The Guardian With this freewheeling fantasy about the death of the celebrated French critic, Binet delivers a second novel as erudite and engaging as his first 2017-05-05 06:30:00+01:00>

>>>b.review_set.create(title='Imagining the Real. By Wyatt Mason in the New York Review of Books',
text='The idea that certain words in a certain order can alter the balance of political power is central to the French writer Laurent Binet’s most recent novel, The Seventh Function of Language',
review_date="2018-07-19 00:00:00+00:00")
<Review: Imagining the Real. By Wyatt Mason in the New York Review of Books The idea that certain words in a certain order can alter the balance of political power is central to the French writer Laurent Binet’s most recent novel, The Seventh Function of Language 2018-07-19 00:00:00+00:00>

>>> r = b.review_set.create(title="The Seventh Function of Language",
text='A conspiracy thriller about the death of the French literary theorist, Roland Barthes, that draws on the work of Jacques Derrida and Dan Brown with tongue firmly in cheek—to hilarious effect.',
review_date="2017-12-09 00:00:00-00:00")
```

<div class="notes">

Δημιουργούμε τρεις κριτικές, οι οποίες αποθηκεύονται αμέσως στη βάση
δεδομένων μας. Το Django επιστρέφει κάθε αντικείμενο που δημιουργεί,
οπότε το βλέπουμε στην οθόνη μας. Εκμεταλλευόμαστε το γεγονός αυτό για
να αποθηκεύσουμε την τρίτη κριτική και σε μία μεταβλητή στο πρόγραμμά
μας.

</div>

## Πλοήγηση μεταξύ αντικειμένων

* Σε μία σχέση ένα προς πολλά μπορούμε πάντα να πάμε από τη μεριά των
  πολλών στη μεριά του ενός:

```pythonconsole[python3]
>>> r.book
<Book: The 7th Function of Language 2017>
```

* Ενώ φυσικά μπορούμε πάντα να πάμε από τη μεριά του ενός στα πολλά:

```pythonconsole[python3]
>>> b.review_set.all()
<QuerySet [<Review: The 7th Function of Language by Laurent Binet – who killed Roland Barthes? By Lauren Elkin in The Guardian With this freewheeling fantasy about the death of the celebrated French critic, Binet delivers a second novel as erudite and engaging as his first 2017-05-05 05:30:00+00:00>, <Review: Imagining the Real. By Wyatt Mason in the New York Review of Books The idea that certain words in a certain order can alter the balance of political power is central to the French writer Laurent Binet’s most recent novel, The Seventh Function of Language 2018-07-19 00:00:00+00:00>, <Review: The Seventh Function of Language A conspiracy thriller about the death of the French literary theorist, Roland Barthes, that draws on the work of Jacques Derrida and Dan Brown with tongue firmly in

>>> b.review_set.count()
3
```

## Πλοήγηση και φίλτρα

* Επίσης, μπορούμε να πλοηγηθούμε μέσω αντικειμένων και στα φίλτρα
  αναζητήσεων:

```pythonconsole[python3]
>>> Review.objects.filter(book__pub_year=2017)
<QuerySet [<Review: The 7th Function of Language by Laurent Binet – who killed Roland Barthes? By Lauren Elkin in The Guardian With this freewheeling fantasy about the death of the celebrated French critic, Binet delivers a second novel as erudite and engaging as his first 2017-05-05 05:30:00+00:00>, <Review: Imagining the Real. By Wyatt Mason in the New York Review of Books The idea that certain words in a certain order can alter the balance of political power is central to the French writer Laurent Binet’s most recent novel, The Seventh Function of Language 2018-07-19 00:00:00+00:00>, <Review: The Seventh Function of Language A conspiracy thriller about the death of the French literary theorist, Roland Barthes, that draws on the work of Jacques Derrida and Dan Brown with tongue firmly in cheek—to hilarious effect. 2017-12-09 00:00:00+00:00>]>
```

<div class="notes">

Το παραπάνω φίλτρο διαβάζεται ως: «βρες τις κριτικές που αντιστοιχούν
σε βιβλία των οποίων το πεδίο `pub_year` είναι ίσο με 2017». 

</div>

## Διαγραφή αντικειμένων 

* Η διαγραφή αντικειμένων γίνεται με τη μέθοδο `delete()`:

    ```pythonconsole[python3]
    >>>  r = b.review_set.filter(text__startswith='The idea')
    >>> r.delete()
    (1, {'djbr.Review': 1})

    >>> r = b.review_set.filter(text__startswith='A conspiracy')
    >>> r.delete()
    (1, {'djbr.Review': 1})
    ```


# Μεταφορά σε MySQL


## Δημιουργία βάσης

* Για να δημιουργήσουμε τη βάση πρέπει να δώσουμε τα παρακάτω στη MySQL:

    ```sql
    CREATE DATABASE djbr CHARACTER SET utf8 COLLATE utf8_general_ci;

    CREATE USER 'djbr_user'@'localhost' IDENTIFIED BY 'g8nzMktk6@y';

    GRANT ALL PRIVILEGES ON djbr.* TO 'djbr_user'@'localhost';
    ```

<div class="notes">

Στη πρώτη εντολή, το `CHARACTER SET utf8 COLLATE utf8_general_ci`
χρειάζεται για να χειριστεί σωστά η MySQL χαρακτήρες Unicode (άρα
ελληνικά όπως και άλλες γλώσσες).

</div>

## Εγκατάσταση οδηγού

* Το Django λειτουργεί πιο εύκολα με τον οδηγό
  [mysqlclient](https://pypi.python.org/pypi/mysqlclient).

* Για να τον εγκαταστήσουμε δίνουμε:

    ```bash
    pip install mysqlclient
    ```
* Hic sunt dracones / Here be dragons.


<div class="notes">

* Στην περίπτωση του Ubuntu, θα πρέπει πρώτα να εγκαταστήσετε κάποια
  επιπλέον πακέτα στο μηχάνημά σας:
  
   ```bash
   sudo apt install build-essential
   sudo apt install libmysqlclient-dev
   sudo apt install python3-dev
   ```
   
   Αυτά χρειάζονται διότι ο `mysqlclient` είναι γραμμένος σε C, και θα
   πρέπει να μεταγλωτιστεί. 
   
   * Το `build-essential` περιέχει τα βασικά εργαλεία μεταγλώτισης
     (compiler, make)
	 
   * Το `libmysqlclient-dev` περιέχει βιβλιοθήκες πηγαίου κώδικα για
     τα προγράμματα που χρησιμοποιούν MySQL.
	 
   * Το `python3-dev` περιέχει τον πηγαίο κώδικα για την ανάπτυξη του
     Python 3.


* Μπορεί επίσης να χρειάζεται η MySQL να είναι στο μονοπάτι του συστήματος.

    * Στην περίπτωση που έχουμε Mac OS ή Linux δίνουμε:
    ```bash
    export PATH=$PATH:/usr/local/mysql/bin
    ```
    (ή όποιο άλλο είναι το μονοπάτι)
	
   * Για να είναι πάντοτε διαθέσιμες οι εντολές της MySQL, μπορούμε να
   βάλουμε την παραπάνω εντολή στο τέλος του αρχείου `~/.bash_profile`
   στον βασικό μας κατάλογο στο σύστημά μας.

* Σε Mac OS μπορεί να χρειαστεί να εκτελέσουμε τα παρακάτω
  προκειμένου να δουλέψει κανονικά ο οδηγός:
  
   ```bash
   export DYLD_FALLBACK_LIBRARY_PATH=/usr/local/opt/openssl/lib:/usr/local/mysql/lib:$DYLD_FALLBACK_LIBRARY_PATH
   ```

   Αυτά τα εισάγουμε στο τέλος του αρχείου `~/.bash_profile` ώστε να
   μην χρειάζεται να τα επαναλαμβάνουμε κάθε φορά που αρχίζουμε νέο
   τερματικό. 
   
</div>


## Επίπεδα Απομόνωσης Δοσοληψιών

* Στα συστήματα διαχείρισης βάσεων δεδομένων διακρίνουμε τέσσερα
  [επίπεδα απομόνωσης (isolation
  levels)](https://en.wikipedia.org/wiki/Isolation_(database_systems)):
  
  * Serializable
  
  * Repeatable reads
  
  * Read committed
  
  * Read uncommitted


## Read Uncommitted

* Το επίπεδο read uncommitted είναι το χαμηλότερο επίπεδο απομόνωσης. 

* Στο επίπεδο αυτό επιτρέπονται [*βρώμικες αναγνώσεις* (dirty
  reads)](https://en.wikipedia.org/wiki/Isolation_(database_systems)#Dirty_reads).
  
* Με άλλα λόγια, μια δοσοληψία μπορεί να δει αλλαγές που κάνει μια
  άλλη δοσοληψία, ακόμα και αν αυτές δεν έχουν γίνει commit.


## Dirty Reads

* Στο παρακάτω παράδειγμα, έστω ότι αρχικά ο χρήστης με `id=1` έχει
  καταχωρησμένη ως ηλικία το 20.

  | Δοσοληψία 1 | Δοσοληψία 2 |
  |-------------|-------------|
  | `SELECT age from users WHERE id = 1;` | |
  | | `UPDATE users SET AGE = 21 WHERE id = 1;` |
  | `SELECT age from users WHERE id = 1;` | |
  | | `ROLLBACK;` |

<div class="notes">

Το πρόβλημα είναι ότι η 1η δοσοληψία θα διαβάζει τη δεύτερη φορά ότι η
ηλικία έχει αλλάξει στο 21, παρά το ότι δεν έχει commit η αλλαγή (και
όπως βλέπουμε μάλιστα, δεν θα γίνει).

Το μόνο πράγμα που μας εγγυάται η βάση στο επίπεδο read uncommitted
είναι ότι οι ενημερώσεις θα εφαρμόζονται με τη σωστή σειρά.

</div>


## Read Committed

* Το επίπεδο read committed είναι το αμέσως αυστηρότερο μετά το read
  committed. 
  
* Στο επίπεδο αυτό, δεν επιτρέπονται βρώμικες αναγνώσεις, αλλά μπορεί
  να εμφανιστούν προβλήματα σε [μη επαναλαμβόμενες αναγνώσεις (non-repeatable
  reads)](https://en.wikipedia.org/wiki/Isolation_(database_systems)#Non-repeatable_reads).
  
* Με άλλα λόγια, ενώ μια δοσοληψία δεν θα δει ποτέ βρώμικα δεδομένα,
  μπορεί η ίδια δοσοληψία να διαβάσει διαφορετικά δεδομένα σε
  επαναλαμβόμενες αναγνώσεις.
  
* Non repeatable reads = αν ξανακάνουμε την ίδια αναζήτηση στη βάση,
  δεν υπάρχει εγγύηση ότι θα πάρουμε τα ίδια αποτελέσματα.


## Non-Repeatable Reads


  | Δοσοληψία 1 | Δοσοληψία 2 |
  |-------------|-------------|
  | `SELECT * from users WHERE id = 1;` | |
  | | `UPDATE users SET AGE = 21 WHERE id = 1;` <br/>`COMMIT;` |
  | `SELECT * from users WHERE id = 1;` <br/> `COMMIT` | |


<div class="notes">

Τώρα η 1η δοσοληψία διαβάζει μόνο δεδομένα που έχουν γίνει commit.
Αυτό σημαίνει ότι η δεύτερη αναζήτηση δεν θα δώσει τα ίδια
αποτελέσματα με την πρώτη.

Υπάρχουν δύο τρόποι να λυθεί το πρόβλημα:

1. Γίνονται τα απαραίτητα κλειδώματα (read locks, write locks), ώστε η
   εκτέλεση της 2ης δοσοληψίας θα γίνει αφού ολοκληρωθεί (commit) ή
   εγκαταληφθεί (rollback) η πρώτη.
   
2. Χρησιμοποιείται [multiversion concurrency
   control](https://en.wikipedia.org/wiki/Multiversion_concurrency_control),
   όπου η 2η δοσοληψία δουλεύει σε στιγμιότυπο της βάσης και όταν
   γίνεται commit ελέγχεται αν το αποτέλεσμα στο στιγμιότυπο θα είναι
   το ίδιο με το αποτέλεσμα που θα προέκυπτε αν εκτελούνταν πρώτα η 1η
   δοσοληψία και μετά η 2η δοσοληψία.

</div>

## Repeatable Reads

* Το επίπεδο αυτό εγγυάται ότι δεν θα εμφανιστεί το πρόβλημα
  repeatable reads.
  
* Μπορεί όμως να εμφανιστεί το πρόβλημα των [αναγνώσεων φαντασμάτων
  (phantom
  reads)](https://en.wikipedia.org/wiki/Isolation_(database_systems)#Phantom_reads). 

* Αυτό σημαίνει ότι μια δοσοληψία μπορεί να διαβάσει, όσο εκτελείται,
  δεδομένα που πρόσθεσε μια άλλη δοσοληψία που εκτελέστηκε στο μεταξύ.
  
  
## Phantom Reads

* Φαντάσματα εμφανίζονται όταν μία δοσοληψία προσθέτει δεδομένα τη
  στιγμή που τα διαβάζει μια άλλη.

  | Δοσοληψία 1 | Δοσοληψία 2 |
  |-------------|-------------|
  | `SELECT * from users`<br/>`WHERE age`<br/>`BETWEEN 10 AND 30;` | |
  | | `INSERT INTO`<br/>`users(id, name, age)`<br/>` VALUES(3, 'Bob', 27);`<br/>`COMMIT;` |
  | `SELECT * from users`<br/>`WHERE age`<br/>`BETWEEN 10 AND 30;` <br/> `COMMIT` | |


<div class="notes">

Ενώ η 1η δοσοληψία θα διαβάσει στη 2η αναζήτηση τα δεδομένα που βρήκε
στην 1η, θα διαβάσει *και επιπλέον δεδομένα*.

Phantom reads μπορούν να εμφανιστούν σε αναζητήσεις εύρους τιμών
(range queries), οπότε για να αποφευχθούν πρέπει η βάση δεδομένων να
χρησιμοποιήσει range locks (επιπλέον των read και write locks).

</div>

## Serializable

* Το επίπεδο serializable είναι το ανώτερο επίπεδο απομόνωσης.

* Σημαίνει ότι αν εκτελούνται δοσοληψίες ταυτόχρονα, αυτό θα γίνει με
  τέτοιο τρόπο ώστε το αποτελέσματα να είναι το ίδιο όπως αν αυτές
  εκτελούνταν σειριακά.
  
<div class="notes">

Για να εξασφαλιστεί αυτό το επίπεδο απομόνωσης, πρέπει είτε να
χρησιμοποιήσουμε διάφορα locks, είτε η βάση να δίνει στιγμιότυπα στις
δοσοληψίες, τα οποία θα πρέπει να «συμφιλιώνονται» στο τέλος.

</div>

## Επίπεδο Απομόνωσης στο Django

* Στο Django χρησιμοποιούμε συνήθως το επίπεδο απομόνωσης read
  committed.
  
* Ο λόγος είναι ότι αν δώσουμε repeatable read ή παραπάνω, η
  εφαρμογή μας θα αρχίζει να εμφανίζει εξαιρέσεις όταν αποτυγχάνουν οι
  δοσοληψίες. 
  
* Συνήθως θέλουμε να το αποφύγουμε αυτό, οπότε δουλεύουμε με read
  committed και προσέχουμε να χειριζόμαστε σωστά τις δοσοληψίες, όπως
  θα δούμε στη συνέχεια.


## Δοσοληψίες στο Django

* Είναι σημαντικό να καταλάβουμε πώς ακριβώς χειρίζεται το Django τις
  δοσοληψίες. 
  
* Διαβάστε τη [σχετική
  τεκμηρίωση](https://docs.djangoproject.com/en/2.1/topics/db/transactions/).
  

## Αυτόματες Δοσοληψίες

* Εκτός και να δώσουμε διαφορετικές ρυθμίσεις, το Django εκτελεί κάθε
  εντολή της βάσης και στη συνέχεια κάνει commit.
  
* Με άλλα λόγια, λειτουργεί σε καθεστώς autocommit.

* Τι γίνεται όμως αν θέλουμε να εκτελεστεί ένα σύνολο εντολών σε μία
  δοσοληψία;
  
## Δοσοληψίες ανά Αίτηση

* Μια συνηθισμένη περίπτωση είναι να θέλουμε να ξεκινάει μια δοσοληψία
  με την αρχή της εξυπηρέτησης μιας αίτησης και να τελειώνει όταν
  ολοκληρωθεί.
  
* Για να το κάνουμε αυτό δίνουμε:

   ```python
   ATOMIC_REQUESTS = True
   ```
   
   στις ρυθμίσεις της βάσης μας στο Django.
   
* Για να μην έχουμε προβλήματα, θα πρέπει όλες οι αιτήσεις να
  εξυπηρετούνται γρήγορα (και βεβαίως να μη χρειάζεται να περιμένουν
  μια άλλη υπηρεσία).


## Πρόληψη Δοσοληψίας

* Αν έχουμε ορίζει ότι θέλουμε δοσοληψίες ανά αίτηση, αλλά θέλουμε να
  απενεργοποιήσουμε αυτή τη συμπεριφορά για κάποιες αιτήσεις,
  χρησιμοποιούμε το διακοσμητή `@transaction.non_atomic_requests`.
  
* Για παράδειγμα:

    ```python
	from django.db import transaction

	@transaction.non_atomic_requests
	def my_view(request):
		do_stuff()

	@transaction.non_atomic_requests(using='other')
	def my_other_view(request):
		do_stuff_on_the_other_database()
	```

## Έλεγχος Δοσοληψιών (1)

* Αν θέλουμε να ελέγχουμε εμείς οι ίδιες τις δοσοληψίες, μπορούμε να
  χρησιμοποιούμε τον διακοσμητή `@atomic`:
  
   ```python
   from django.db import transaction

   @transaction.atomic
   def viewfunc(request):
	   # This code executes inside a transaction.
	   do_stuff()
   ```
  
## Έλεγχος Δοσοληψιών (2)

* Εναλλακτικά, μπορούμε να χρησιμοποιήσουμε έναν [διαχειριστή
  περιβάλλοντος (context
  manager)](https://docs.python.org/3/glossary.html#term-context-manager):
  
   ```python
   from django.db import transaction

   def viewfunc(request):
	   # This code executes in autocommit mode (Django's default).
	   do_stuff()

	   with transaction.atomic():
		   # This code executes inside a transaction.
		   do_more_stuff()
	```

## `select_for_update()`

* Μέσα σε μία δοσοληψία, για να δηλώσουμε ότι τα αποτελέσματα μιας
  αναζήτησης θα πρέπει να κλειδωθούν μέχρι το τέλος της,
  χρησιμοποιούμε τη μέθοδο `select_for_update()`:
  
   ```python
   from django.db import transaction

   entries = Entry.objects.select_for_update().filter(author=request.user)
   with transaction.atomic():
	   for entry in entries:
		   ...
   ```
   
* Υπάρχουν διάφορες παράμετροι που ρυθμίζουν τη συμπεριφορά του
  `select_for_update()`· δείτε τη [σχετική
  τεκμηρίωση](https://docs.djangoproject.com/en/2.1/ref/models/querysets/#select-for-update).

## Ρυθμίσεις Django

* Θα φτιάξουμε ένα αρχείο `site_config.py` στον κατάλογο
  `project_site/project_site` με τα εξής περιεχόμενα:

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'djbr',
            'USER': 'djbr_user',
            'PASSWORD': 'g8nzMktk6@y,
            'HOST': '127.0.0.1',
            'OPTIONS': {
                'isolation_level': 'read committed'
            }
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
  τιμή της μεταβλητής `SECRET_KEY` που *θέλουμε να παραμείνει όσο
  το δυνατόν μυστική*.

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

    ```sql
    mysql> USE djbr;

    mysql> SHOW TABLES;
    ```

# Django admin

## Η Διαχειριστική Εφαρμογή

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

    ```
    Username (leave blank to use 'panos'): louridas
    ```

* Και στη συνέχεια τη διεύθυνση ηλεκτρονικού ταχυδρομείου του:

    ```
    Email address: louridas@aueb.gr
    ```

* Τέλος, θα πρέπει να εισάγουμε δύο φορές τον κωδικό εισόδου:

    ```
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
