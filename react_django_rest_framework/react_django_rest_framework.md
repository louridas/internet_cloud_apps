% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# React και Django Rest Framework

## Γενικά

* Μέχρι τώρα δεν έχουμε χρησιμοποιήσει κάποιον κανονικό εξυπηρετητεί ο
  οποίος θα ακούει τις αιτήσεις της εφαρμογής μας.

* Εμείς θέλουμε να χρησιμοποιήσουμε το React στο frontend και το
  Django στο backend.


## Δύο εφαρμογές σε μία

* Αν θυμηθούμε, φτιάχνουμε μια εφαρμογή, την `djbr`, χρησιμοποιώντας
  το Django.
  
* Επίσης φτιάχνουμε μια εφαρμογή, την `rbr`, χρησιμοποιώντας το
  React.
  
* Τώρα θα τις συνδέσουμε.


## Δομή καταλόγων

* Φτιάχνουμε έναν κατάλογο `djbr_rbr`.

* Μέσα στον κατάλογο αυτό μεταφέρουμε την εφαρμογή `djbr`, σε έναν
  κατάλογο που τον ονομάζουμε `server`.
  
* Επίσης μεταφέρουμε την εφαρμογή `rbr` σε έναν κατάλογο που τον
  ονομάζουμε `client`.
  
* Θα έχουμε λοιπόν μια δομή καταλόγων που τα δύο πρώτα επίπεδά της θα
  είναι:
  
   ```
   djbr_rbr/
   ├── client
   │   ├── README.md
   │   ├── node_modules/
   │   ├── package-lock.json
   │   ├── package.json
   │   ├── public/
   │   └── src/
   └── server
       ├── db.sqlite3
       ├── djbr/
       ├── manage.py
       ├── project_site/
       ├── setup.py
       └── venv/
   ```

# Προσαρμογή Backend

## Προσαρμογή Μοντέλου

* Στο front-end είχαμε προσθέσει στις ιδιότητες κάθε βιβλίου και ένα URL.

* Αυτό δεν το είχαμε στο backend.

* Θα το προσθέσουμε λοιπόν τώρα στην κλάση `Book` στο `models.py`:

   ```python
    from django.utils import timezone

    class Book(models.Model):
        title = models.CharField(max_length=200)
        url = models.URLField(null=True)
        pub_year = models.IntegerField('date published', default=2000)

        def was_published_recently(self):
            return (self.pub_year >= timezone.now().year - 1)

        def __str__(self):
            return "%s %s %s" % (self.title, self.url, self.pub_year)
   ```
   
<div class="notes">

To `URLField` είναι ένα `CharField` για URLs, τα οποία ελέγχονται μέσω
της κλάσης [`URLValidator`](https://docs.djangoproject.com/en/2.1/ref/validators/#django.core.validators.URLValidator). Βάζουμε:

```python
url = models.URLField(null=True)
```

διότι στη βάση μας υπάρχουν ήδη εγγραφές, οι οποίες δεν έχουν URLs,
συνεπώς θα πρέπει να επιτρέψουμε την ύπαρξη NULLs.

</div>


## Δημιουργία και Εφαρμογή Μεταγωγής

* Για να δημιουργήσουμε τη μεταγωγή κατά τα γνωστά τρέχουμε:

   ```bash
   python manage.py makemigrations
   ```
   
* Και στη συνέχεια για να την εφαρμόσουμε δίνουμε:

   ```bash
   python manage.py migrate
   ```

# Δημιουργία Εντολής στο Django

## Σκοπός

* Μέχρι τώρα χρησιμοποιούμε διάφορες εντολές του Django, όπως
  `runserver`, `migrate`, κ.λπ.

* Δεν είναι δύσκολο να φτιάξουμε μια δική μας εντολή για κάτι που
  θέλουμε να κάνουμε.

* Στη συγκεκριμένη περίπτωση, θα φτιάξουμε μια εντολή με την οποία θα
  μπορούμε να τροφοδοτούμε τη βάση μας με δεδομένα.

## Δομή καταλόγου εντολών

* Για να φτιάξουμε νέες εντολές δημιουργούμε τον κατάλογο
  `djbr/management/commands`.

* Το Django θα δημιουργεί μια εντολή του `manage.py` για κάθε αρχείο
  της Python που βρίσκεται σε αυτόν τον κατάλογο και το όνομά του δεν
  αρχίζει από `_`.

* Μέσα σε ένα τέτοιο αρχείο θα πρέπει να ορίσουμε μια κλάση `Command` η
  οποία είναι παιδί της `BaseCommand` ή κάποιου απογόνου της. 

## `seed_db.py`

* Θα δημιιουργήσουμε λοιπόν το ακόλουθο αρχείο `seed_db.py`, το οποίο
  θα υλοποιεί την εντολή που θέλουμε:
  
   ```python
   from django.core.management.base import BaseCommand, CommandError

   import inspect

   from djbr import models

   import csv

   class Command(BaseCommand):
       help = 'Seeds the database with the specified file'

       def add_arguments(self, parser):
           parser.add_argument('model', type=str)
           parser.add_argument('seed_file', type=str)
           parser.add_argument('-s', '--simulate',
                               action='store_true',
                               dest='simulate',
                               help='Show actions without saving')

       def handle(self, *args, **options):
           djbr_models = inspect.getmembers(models, inspect.isclass)
           ModelToSeed = None
           for djbr_model in djbr_models:
               if djbr_model[0] == options['model']:
                   ModelToSeed = djbr_model[1]
                   break
           if not ModelToSeed:
               return
           with open(options['seed_file']) as seed_file:
               seed_reader = csv.reader(seed_file, skipinitialspace=True)
               headers = next(seed_reader)
               for row in seed_reader:
                   obj = ModelToSeed()
                   for attr, value in zip(headers, row):
                       setattr(obj, attr, value)
                   if options['simulate']:
                       print('would save', obj)
                   else:
                       print('saving', obj)
                       obj.save()
   ```

<div class="notes">

Η παραπάνω εντολή έχει ενδιαφέρον ως προς το ότι διαβάζει δυναμικά τις
κλάσεις των μοντέλων του Django. Αυτό το κάνει με τη βιβλιοθήκη
[inspect](https://docs.python.org/3/library/inspect.html). Με το:

```python
djbr_models = inspect.getmembers(models, inspect.isclass)
```

παίρνουμε όλες τις κλάσεις που ορίζονται μέσα στο models.py, σε μία
λίστα που περιέχει ζευγάρια (όνομα, κλάση). Στη συνέχεια, ψάχνουμε να
βρούμε την κλάση που αντιστοιχεί στο μοντέλο που θέλουμε, και την
αποθηκεύουμε στη μεταβλητή `ModelToSeed`. Αφού το κάνουμε αυτό,
διαβάζουμε το αρχείο με τα δεδομένα, δημιουργούμε ένα αντικείμενο για
κάθε εγγραφή (γραμμή) και το σώζουμε, ή λέμε ότι θα το σώζαμε αν ο
χρήστης έχει δώσει `--simulate`.

</div>

## Χρήση `seed_db.py`

* Από εδώ και στο εξής, μπορούμε να δώσουμε εντολές του τύπου:

  ```bash
  python manage.py seed_db Book seed_books.csv
  ```
  
  ή 

  ```bash
  python manage.py seed_db --simulate Book seed_books.csv
  ```

* Το αρχείο `seed_books.csv` περιέχει ένα βιβλίο ανά γραμμή:

   ```
   title, url, author, year_published
   "Infinite Jest", "https://en.wikipedia.org/wiki/Infinite_Jest", "David Foster Wallace", 1996
   "Ulysses", "https://en.wikipedia.org/wiki/Ulysses_(novel)", "James Joyce",1922
   "Gravity's Rainbow", "https://en.wikipedia.org/wiki/Gravity%27s_Rainbow","Thomas Pynchon", 1973
   "City on Fire", "https://en.wikipedia.org/wiki/City_on_Fire_(Hallberg_novel)", "Garth Risk Hallbert", 2015
   "The Narrow Way to the Deep North", "https://en.wikipedia.org/wiki/The_Narrow_Road_to_the_Deep_North_(novel)", "Richard Flanagan",2013
   "The Dispossessed", "https://en.wikipedia.org/wiki/The_Dispossessed", "Ursula Le Guin", 1974
   "A Death in the Family: My Struggle Book 1", "https://en.wikipedia.org/wiki/My_Struggle_(Knausg%C3%A5rd_novels)", "Karl Ove Knausgård", 2009
   "Conversations with Friends", "https://en.wikipedia.org/wiki/Conversations_with_Friends", "Sally Rooney", 2017
   "La Septième Fonction du Langage", "https://fr.wikipedia.org/wiki/La_Septi%C3%A8me_Fonction_du_langage", "Laurent Binet", "2015"
   "La Vérité sur l' Affaire Harry Quebert", "https://fr.wikipedia.org/wiki/La_V%C3%A9rit%C3%A9_sur_l%27affaire_Harry_Quebert", "Joël Dicker", 2012
   ```

# Διαμοιρασμός Αρμοδιοτήτων

## Django και React

* Η εφαρμογή μας θα είναι μια Django εφαρμογή, με τη διαφορά ότι το
  Django δεν θα είναι αρμόδιο για την εμφάνιση.

* Το Django θα δέχεται HTTP αιτήσεις και θα δίνει απαντήσεις, όπου τα
  δεδομένα θα δίνονται σε μορφή JSON.

* Το React θα στέλνει τις αιτήσεις, θα λαμβάνει τις απαντήσεις, και
  θα τις εμφανίζει κατάλληλα στην οθόνη.


## REST API

* Η επικοινωνία μεταξύ του Angular και του Django θα γίνεται με βάση
  το πρότυπο REST.
  
    * Για να δημιουργούνται νέα αντικείμενα, θα χρησιμοποιείται η
      μέθοδος `HTTP POST`.
      
    * Για να βλέπουμε υπάρχοντα αντικείμενα, θα χρησιμοποιείται η μέθοδος
      `HTTP GET`.
      
    * Για να αλλάξουμε ένα υπάρχον αντικείμενο, θα χρησιμοποιείται η
      μέθοδος `HTTP PUT`.
      
    * Για να διαγράψουμε ένα αντικείμενο, θα χρησιμοποιείται η
      μέθοδος `HTTP DELETE`.


## Django REST Framework

* Την επικοινωνία μέσω το προτύπου REST και το χειρισμό των δεδομένων
  JSON θα την αναλάβει το
  [Django REST Framework](http://www.django-rest-framework.org/).

* Για να το εγκαταστήσουμε δίνουμε:

   ```bash
   pip install djangorestframework
   ```

## Ρυθμίσεις `djbr/settings.py` (1)

* Στο αρχείο `project_site/settings.py` προσθέτουμε στο
  `INSTALLED_APPS` το παρακάτω:
  
    ```python
    INSTALLED_APPS = [
      # ...
     'rest_framework',
     # ...
    ]
    ```

## Serializers

* Εκτός από τα μοντέλα μας, θα χρειαστούμε και έναν τρόπο με τον οποίο
  τα αντικείμενα της Python μετατρέπονται σε JSON και το τούμπαλιν.

* Αυτό το κάνουν οι serializers.


## Δημιουργία serializer

* Για τα βιβλία θα γράψουμε τον `BookSerializer` στο αρχείο
  `djbr/serializers.py`: 
  
   ```python
   from rest_framework import serializers
   from .models import Book

   class BookSerializer(serializers.ModelSerializer):
       class Meta:
           model = Book
           fields = ('id', 'title', 'url', 'pub_year')
   ```

## Δημιουργία views 

* Τα views για τα βιβλία τα ορίζουμε ως συνήθως στο αρχείο
  `djbr/views.py`.

* Δεδομένου ότι για την εμφάνιση θα είναι αρμόδιο το React,
  *σβήνουμε όλα τα υπάρχοντα περιεχόμενα του αρχείου*.

* Προσέξτε ότι θα προσθέσουμε και ένα view `index()` το οποίο θα
  επιστρέφει τα αρχεία της εφαρμογής που έχουμε φτιάξει με React.

* Σε μία τελική εγκατάσταση, τα αρχεία αυτά θα τα φιλοξενεί ο HTTP
  server που θα χρησιμοποιούμε (π.χ. Apache ή nginx), αλλά προς το
  παρόν για λόγους ευκολίας θα τα φιλοξενεί το Django.

* Κρατάμε όμως στο μυαλό μας ότι αυτό δεν το κάνουμε ποτέ στην
  παραγωγή.


## `views.py`

```python
from .models import Book
from .serializers import BookSerializer
from rest_framework import generics

from django.contrib.staticfiles import views

def index(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
        return views.serve(request, 'index.html')

class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__contains=title)
        return queryset

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
```

<div class="notes">

Όταν λέμε ότι τελικά τα στατικά αρχεία θα τα εξυπηρετεί ο HTTP server
που θα χρησιμοποιούμε και όχι το Django, αυτό σημαίνει ότι τελικά η
μέθοδος `index()` δεν θα χρησιμοποιείται.

Αυτή τη στιγμή όμως, αφού δεν έχουμε ανεβάσει ακόμα την εφαρμογή σε
έναν HTTP server, μας χρειάζεται και κάνει τα εξής:

  * Αν ο browser ζητήσει ένα JavaScript αρχείο, θα το επιστρέψει. Πότε
    θα γίνει αυτό; Όλη η εφαρμογή React είναι γραμμένη σε
    JavaScript, και τα αρχεία JavaScript που την απαρτίζουν
    αναφέρονται από τη κεντρική σελίδα `index.js`. Άρα όταν ο
    χρήστης πλοηγηθεί στην εφαρμογή μας, ο browser θα ζητήσει από τον
    εξυπηρετητή όλα τα σχετικά JavaScript αρχεία. Αφού αυτή τη στιγμή
    ο εξυπηρετητής είναι το Django, θα πρέπει να μπορεί να τα δώσει.
    
* Η μόνη άλλη περίπτωση είναι η σελίδα `index.html` που φιλοξενεί το
  σύνολο της εφαρμογής Angular. Άρα πρέπει να την προσφέρει και αυτή
  το Django.
  
Επαναλαμβάνουμε: αυτά χρειάζονται όσο *δεν* χρησιμοποιούμε κάποιον
άλλο HTTP server. Όταν αρχίσουμε να χρησιμοποιούμε nginx ή Apache,
αυτή η μέθοδος θα είναι πλέον άχρηστη.

Η κλάση `BookList` είναι αρμόδια για να χειρίζεται την εμφάνιση πολλών
βιβλίων και τη δημιουργία νέου βιβίου. Αυτό φαίνεται από το ότι
κληρονομεί από την κλάση `generics.ListCreateAPIView`. 

Αντίστοιχα, η κλάση `BookDetail` είναι αρμόδια για να χειρίζεται την
εμφάνιση ενός συγκεκριμένου βιβλίου και την ενημέρωση ενός
συγκεκριμένου βιβλίου. Αυτό φαίνεται από το ότι κληρονομεί από την
κλάση `generics.RetrieveUpdateDestroyAPIView`.

Αναλόγως με το τι θέλουμε να κάνουμε, η κλάση μας μπορεί να κληρονομεί
από τις παρακάτω:

  * `CreateAPIView`: δημιουργία αντικειμένου

  * `ListAPIView`: εμφάνιση και αναζήτηση αντικειμένων
  
  * `RetrieveAPIView`: εύρεση ενός συγκεκριμένου αντικειμένου
  
  * `DestroyAPIView`: διαγραφή ενός συγκεκριμένου αντικειμένου
  
  * `UpdateAPIView`: ενημέρωση ενός συγκεκριμένου αντικειμένου
  
  * `ListCreateAPIView`: εμφάνιση και αναζήτηση αντικειμένων,
    δημιουργία αντικειμένου
    
  * `RetrieveUpdateAPIView`: εύρεση και ενημέρωση ενός συγκεκριμένου
    αντικειμένου 
    
  * `RetrieveDestroyAPIView`: εύρεση και διαγραφή ενός συγκεκριμένου
    αντικειμένου 
    
  * `RetrieveUpdateDestroyAPIView`: εύρεση, ενημέρωση, και διαγραφή
    ενός συγκεκριμένου αντικειμένου
    
Σε κάθε κλάση που ορίζουμε πρέπει να δίνουμε το μοντέλο στο οποίο
αντιστοιχεί. Αυτό το κάνουμε ορίζοντας την ιδιότητα
`serializer_class`. Επίσης πρέπει να δώσουμε τον τρόπο με τον οποίο θα
γίνεται η αναζήτηση στη βάση ώστε να βρεθεί το αντικείμενο ήτα
αντικείμενα που θέλουμε. Για το λόγο αυτό γράφουμε τη μέθοδο
`get_queryset()`. Ειδικά στην περίπτωση που μιλάμε για ένα
συγκεκριμένο αντικείμενο (όπως στην `BookDetail`, μπορούμε απλώς να
πούμε ότι το αντικείμενο είναι ένα από όλα τα αντικείμενα· στη
συνέχεια, το Django REST framework θα εφαρμόσει το απαραίτητο φίλτρο
ώστε να βρει το ένα συγκεκριμένο βιβλίο που μας ενδιαφέρει. Στην
περίπτωσή μας λοιπόν, γράφουμε απλώς:

```python
queryset = Book.objects.all()
```

</div>

## Δημιουργία `djbr/urls.py`

* Στη συνέχεια θα πρέπει να ορίσουμε τα αντίστοιχα URLs στο αρχείο
  `djbr/urls.py` (και πάλι σβήνουμε τα προηγούμενα περιεχόμενα):
  
   ```python
   from django.urls import re_path

   from . import views

   app_name = 'djbr'

   urlpatterns = [
       re_path('^books/?$', views.BookList.as_view()),
       re_path(r'^books/(?P<pk>\d+)/?$', views.BookDetail.as_view()),
   ]
   ```

## Προσαρμογή `project_site/urls.py`

* Και κατόπιν θα πρέπει τα URLs να συμπεριληφθούν στο σύνολο των URLs
  στο αρχείο `project_site/urls.py`:
  
   ```python
   from django.contrib import admin
   from django.urls import include, path

   urlpatterns = [
       path('api/', include('djbr.urls')),
       path('admin/', admin.site.urls),
   ]
   ```

<div class="notes">

Με τον τρόπο αυτό, το Django θα ανταποκρίνεται σε τριών τύπων URLs:

  * `api/`, π.χ. `api/books/1`

  * `admin/`
  
  * οτιδήποτε άλλο θα καλεί τη συνάρτηση `index()` στο `views.py`.
  
Στην πρώτη περίπτωση θα χειριζόμαστε τα αντικείμενα της εφαρμογής μας.
Στη δεύτερη περίπτωση έχουμε πρόσβαση στην εφαρμογή διαχείρισης του
Django. Στην τρίτη περίπτωση το Django επιστρέφει την εφαρμογή του
front-end, δηλαδή το σύνολο της εφαρμογής React. Η τρίτη περίπτωση θα
πάψει να εφαρμόζεται όταν χρησιμοποιήσουμε έναν εξυπηρετητή HTTP,
γιατί τότε αυτός θα δίνει το σύνολο του κώδικα JavaScript.


## Εκκίνηση της εφαρμογής

* Η εφαρμογή ξεκινά όπως όλες οι εφαρμογές Django με:
  ```bash
  python manage.py runserver
  ```

## Έλεγχος της εφαρμογής

* Για να ελέγξουμε την εφαρμογή θα πρέπει να μπορούμε να κάνουμε
  κλήσεις σε αυτήν και να πάρουμε τις απαντήσεις με μορφή JSON.

* Για να κάνουμε εύκολα κλήσεις οποιουδήποτε τύπου σε μία διαδικτυακή
  υπηρεσία χρησιμοποιούμε εργαλεία που τρέχουν στη γραμμή εντολών.

* Το πιο γνωστό σχετικό εργαλείο είναι το
  [curl](https://curl.haxx.se/).

* Μιας και εργαζόμαστε σε Python θα χρησιμοποιήσουμε το
  [HTTPie](https://httpie.org/).

## HTTPie

* Εγκαθιστούμε το HTTPie με:
  ```bash
  pip install httpie
  ```

## Λήψη των βιβλίων

* Ελέγχουμε ότι μπορούμε να πάρουμε όλα τα βιβλία με:
  ```bash
  http http://127.0.0.1:8000/api/books/
  ```

* Για να πάρουμε ένα βιβλίο δίνουμε:
  ```bash
  http http://127.0.0.1:8000/api/books/1/
  ```

## Αποθήκευση και ενημέρωση

* Για να αποθηκεύσουμε ένα νέο βιβλίο δίνουμε:
  ```bash
  http --json POST http://127.0.0.1:8000/api/books/ title="Ulyses" pub_year="1922"
   ```

* Για να ενημερώσουμε ένα βιβλίο δίνουμε:
  ```bash
  http --json PUT http://127.0.0.1:8000/api/books/1 title="Ulysses"
  ```

## Αναζήτηση βιβλίων

* Για να αναζητήσουμε ένα βιβλίο με βάση τον τίτλο του, δίνουμε:
  ```bash
  http http://127.0.0.1:8000/api/books/?title=City
  ```

## Έλεγχος μέσω του browser

* Εκτός από τη γραμμή εντολών, ένας καλός τρόπος να ελέγξουμε το API
  της εφαρμογής μας είναι μέσω του browser μας.
  
* Αυτό τη δυνατότητα, που ονομάζεται browsable API, την προσφέρει το
  Django REST Framework.


## Χρήση του browsable API

* Για να δούμε τα βιβλία στον browser δίνουμε:
  ```
  http://localhost:8000/api/books/
  ```
  Επίσης μπορούμε με χρήση της HTTP POST να προσθέσουμε βιβλίο.
  
* Για να δούμε τις λεπτομέρειες ενός βιβλίου δίνουμε:
  ```
  http://localhost:8000/api/books/1
  ```
  Επίσης μπορούμε με χρήση της HTTP PUT να το αλλάξουμε, ή με χρήση 
  της HTTP DELETE να το σβήσουμε.
  

## Απενεργοποίηση του browsable API

* Αν θέλουμε να απενεργοποιήσουμε το browsable API, βάζουμε τα εξής
μέσα στο αρχείο `settings.py`:
  ```python
  REST_FRAMEWORK = {
      'DEFAULT_RENDERER_CLASSES': (
          'rest_framework.renderers.JSONRenderer',
      )
  }
  ```

* Αυτό δεν σημαίνει ότι το API δεν είναι πλέον διαθέσιμο: απλώς δεν
  μπορείτε να το δείτε με αυτόν τον ωραίο τρόπο μέσω του browser.
  

# React & Django

## Ολοκλήρωση

* Για να μπορέσουμε να χρησιμοποιήσουμε την εφαρμογή του React με το
  Django, θα πρέπει το front-end να επικοινωνεί με το API του backend.

* Στην παραγωγή, θα πρέπει να συσκευάσουμε όλη την εφαρμογή του React
  και να δώσουμε τα στατικά αρχεία (HTML, CSS, JavaScript) στον server
  της παραγωγής (Apache ή nginx).
  
* Στη διάρκεια της ανάπτυξης βολεύει πολύ περισσότερο να συνεχίσουμε
  να τρέχουμε το React μέσω του Node, και αυτό να προωθεί τις αιτήσεις
  του API στο Django.


## Ρύθμιση Ενδιάμεσου (Proxy)

* Η συνεργασία μεταξύ Node και Django θα γίνει δηλώνοντας ότι το Node
  θα λειτουργεί ως ενδιάμεσος (proxy).
  
* Ανοίγουμε το αρχείο `package.json` και προσθέτουμε τη γραμμή:

   ```javascript
   "proxy": "http://localhost:8000",
   ```
   
## Ανέβασμα και Κατέβασμα Εξαρτήματος

* Όταν ένα εξάρτημα μπαίνει στο DOM της σελίδας, λέμε ότι το εξάρτημα
  «ανεβαίνει» (mount).
  
* Όταν ένα εξάρτημα καταστρέφεται, λέμε ότι το εξάρτημα «καταβαίνει»
  (unmount).
  
* Στις στιγμές αυτές της ζωής του εξαρτήματος καλούνται δύο
  αντίστοιχες μέθοδοι (lifecycle methods):
  
    * `componentDidMount()`
    
    * `componentWillUnmount()`
    
* Η μέθοδος `componentDidMount()` καλείται μετά τον κατασκευαστή και
  σε αυτήν μπορούμε να βάλουμε τον κώδικα για την αρχική τροφοδοσία
  δεδομένων από το Django.
  

## Ανέβασμα Εξαρτήματος `App`

* Στο συνάρτημα `App` προσθέτουμε τη μέθοδο `componentDidMount()`:

   ```javascript
     componentDidMount() {
       fetch('/api/books')
         .then(response => response.json())
         .then(result =>  this.setState({list: result}))
         .catch(error => error);
     }
   ```

## Αφαίρεση Υπάρχουσας Λίστας

* Δεν θέλουμε πλέον να διαβάζουμε τη λίστα των βιβλίων από ένα στατικό
  αρχείο JavaScript.

* Συνεπώς, στο `App.js` διαγράφουμε τη γραμμή:

  ```javascript
   import list from './Books.js';
   ```

* Επιπλέον, στον κατασκευαστή του εξαρτήματος `App` αρχικοποιούμε τη
  λίστα σε `null`:

   ```javascript
    this.state = {
      list: null,
      searchTerm: '',
    };
   ```

## Προσαρμογή `render()`

* Χρειαζόμαστε μία μικρή αλλαγή στη μέθοδο `render()`.

* Αν η λίστα δεν είναι ορισμένη (είναι `null`), η μέθοδος δεν θέλουμε να
  κάνει τίποτε.
  
* Έτσι η `render()` γίνεται:

   ```javascript
   render() {

     if (!this.state.list) { return null; }

     return (
       <div className="App">
         <Search
           value={this.searchTerm}
           onSearchChange={this.onSearchChange}
         />
         <ItemList
           list={this.state.list}
           searchTerm={this.state.searchTerm}
           onDismiss={this.onDismiss}
         />
       </div>
     );
   }
   ```

<div class="notes">

Η μέθοδος `render()` ανήκει και αυτή στον κύκλο ζωής ενός εξαρτήματος.
Καλείται πριν από τη μέθοδο `componentDidMount()`. Έτσι, στην αρχή δεν
θα κάνει τίποτε γιατί ακόμα δεν έχουν διαβαστεί βιβλία από το Django.
Μόλις γίνει αυτό, θα ξανακληθεί και τότε τα βιβλία θα εμφανιστούν στην
οθόνη.

</div>

## Διαγραφή Βιβλίου

* Για τη διαγραφή ενός βιβλίου θα αλλάξουμε τη μέθοδο `onDismiss()`:

   ```javascript
   onDismiss(id) {
     fetch(`/api/books/${id}`, {method: "DELETE"})
       .then(response => {
         const updatedList = this.state.list.filter(item => item.id !== id);
         this.setState({ list: updatedList });
       })
       .catch(error => error);
   }
   ```
