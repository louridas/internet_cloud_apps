% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Angular & Django

## Γενικά

* Μέχρι τώρα δεν έχουμε χρησιμοποιήσει κάποιον κανονικό εξυπηρετητεί ο
  οποίος θα ακούει τις αιτήσεις της εφαρμογής μας.

* Τώρα θα χρησιμοποιήσουμε το Angular στο frontend και το Django στο
  backend. 


## Δύο εφαρμογές σε μία

* Αν θυμηθούμε, είχαμε φτιάξει μια εφαρμογή, την `djbr`,
  χρησιμοποιώντας το Django.
  
* Επίσης έχουμε φτιάξει μια εφαρμογή, την `bangular`, χρησιμοποιώντας
  το Angular.
  
* Τώρα θα τις συνδέσουμε.


## Δομή καταλόγων

* Φτιάχνουμε έναν κατάλογο `bangular_djbr`.

* Μέσα στον κατάλογο αυτό μεταφέρουμε την εφαρμογή `djbr`, σε έναν
  κατάλογο που τον ονομάζουμε `server`.
  
* Επίσης μεταφέρουμε την εφαρμογή `bangular` σε έναν κατάλογο που τον
  ονομάζουμε `client`.
  
* Θα έχουμε λοιπόν μια δομή καταλόγων που τα δύο πρώτα επίπεδά της θα
  είναι:
  ```
  ├── client/
  │  ├── README.md
  │  ├── e2e/
  │  ├── karma.conf.js
  │  ├── node_modules/
  │  ├── package.json
  │  ├── protractor.conf.js
  │  ├── src/
  │  ├── tsconfig.json
  │  └── tslint.json
  └── server/
      ├── djbr/
      ├── manage.py
      ├── project_site/
      └── static/
  ```


# Δημιουργία εντολής στο Django

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
  
* Μέσα σε ένα τέτοιο αρχείο θα πρέπει να ορίσουμε μια κλάση `Command`
  η οποία είναι παιδί της `BaseCommand` ή κάποιου απογόνου της.


## `seed_db.py`

* Θα δημιουργήσουμε λοιπόν το ακόλουθο αρχείο `seed_db.py`, το οποίο
  υλοποιεί την εντολή που θέλουμε:
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

      def handle(self, *args, **options):
          djbr_models = inspect.getmembers(models, inspect.isclass)
          to_seed = None
          for djbr_model in djbr_models:
              if djbr_model[0] == options['model']:
                  to_seed = djbr_model[1]
                  break
          if not to_seed:
              return
          with open(options['seed_file']) as seed_file:
              seed_reader = csv.reader(seed_file, skipinitialspace=True)
              headers = next(seed_reader)
              for row in seed_reader:
                  obj = to_seed()
                  for attr, value in zip(headers, row):
                      setattr(obj, attr, value)
                  print('saving', obj)
                  obj.save()
  ```
    
## Χρήση `seed_db.py`

* Από εδώ και στο εξής, μπορούμε να δώσουμε εντολές του τύπου:
  ```bash
  python manage.py seed_db Book seed_books.csv
  ```
  Βεβαίως αντί για `Book` μπορούμε να έχουμε μια άλλη κλάση.
  
* Το αρχείο `seed_books.csv` περιέχει ένα βιβλίο ανά γραμμή:
  ```
  title, pub_year
  Infinite Jest, 1996
  Oblivion, 2004
  Conversations with Friends, 2017
  The Crying of Lot 49, 1966
  City on Fire, 2015 
  The Narrow Road to the Deep North, 2013
  The Dispossessed, 1974
  The Left Hand of Darkness, 1969
  A Death in the Family: My Struggle Book 1, 2013
  A Man in Love: My Struggle Book 2, 2013
  ```

# Διαμοιρασμός αρμοδιοτήτων

## Django και Angular

* Η εφαρμογή μας θα είναι μια Django εφαρμογή, με τη διαφορά ότι το
  Django δεν θα είναι αρμόδιο για την εμφάνιση.

* Το Django θα δέχεται HTTP αιτήσεις και θα δίνει απαντήσεις, όπου τα
  δεδομένα θα δίνονται σε μορφή JSON.

* Το Angular θα στέλνει τις αιτήσεις, θα λαμβάνει τις απαντήσεις, και
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
          fields = ('id', 'title', 'pub_year')
  ```

## Δημιουργία views 

* Τα views για τα βιβλία τα ορίζουμε ως συνήθως στο αρχείο
  `djbr/views.py`.

* Δεδομένου ότι για την εμφάνιση θα είναι αρμόδιο το Angular,
  *σβήνουμε όλα τα υπάρχοντα περιεχόμενα του αρχείου*.

* Προσέξτε ότι θα προσθέσουμε και ένα view `index()` το οποίο θα
  επιστρέφει τα αρχεία της εφαρμογής που έχουμε φτιάξει με Angular.

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
που θα χρησιμοποιούμε και όχι ο Django, αυτό σημαίνει ότι τελικά η
μέθοδος `index()` δεν θα χρησιμοποιείται.

Αυτή τη στιγμή όμως, αφού δεν έχουμε ανεβάσει ακόμα την εφαρμογή σε
έναν HTTP server, μας χρειάζεται και κάνει τα εξής:

  * Αν ο browser ζητήσει ένα JavaScript αρχείο, θα το επιστρέψει. Πότε
    θα γίνει αυτό; Όλη η εφαρμογή Angular είναι γραμμένη σε
    JavaScript, και τα αρχεία JavaScript που την απαρτίζουν
    αναφέρονται από τη κεντρική σελίδα `index.html`. Άρα όταν ο
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
  from django.conf.urls import url
  from . import views

  app_name = 'djbr'

  urlpatterns = [
      url(r'^books/?$', views.BookList.as_view()),
      url(r'^books/(?P<pk>[0-9]+)/?$', views.BookDetail.as_view()),
  ]
  ```

## Προσαρμογή `bangular_project/urls.py`

* Και κατόπιν θα πρέπει τα URLs να συμπεριληφθούν στο σύνολο των URLs
  στο αρχείο `project_site/urls.py`:
  ```python
  from django.conf.urls import url, include
  from django.contrib import admin

  from djbr import views

  urlpatterns = [
      url(r'^api/', include(djbr.urls')),
      url(r'^admin/', admin.site.urls),
  ] 

  urlpatterns += url(r'^(?P<path>.*)$', views.index),
  ```

<div class="notes">

Με τον τρόπο αυτό, το Django θα ανταποκρίνεται σε τριών τύπων URLs:
  * `api/`, π.χ. `api/books/1`
  * `admin/`
  * οτιδήποτε άλλο θα καλεί τη συνάρτηση `index()` στο `views.py`.
  
Στην πρώτη περίπτωση θα χειριζόμαστε τα αντικείμενα της εφαρμογής μας.
Στη δεύτερη περίπτωση έχουμε πρόσβαση στην εφαρμογή διαχείρισης του
Django. Στην τρίτη περίπτωση το Django επιστρέφει την εφαρμογή του
front-end, δηλαδή το σύνολο της εφαρμογής Angular. Να θυμηθούμε εδώ
ότι όλη αυτή η εφαρμογή δίνεται μέσω του αρχείου `index.html`. 

Η τρίτη περίπτωση θα πάψει να εφαρμόζεται όταν χρησιμοποιήσουμε έναν
εξυπηρετητή HTTP, γιατί τότε αυτός θα δίνει τη σελίδα `index.html` και
το σύνολο του κώδικα JavaScript.


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
  

# Angular & Django


## Ολοκλήρωση

* Για να μπορέσουμε να χρησιμοποιήσουμε την εφαρμογή του Angular με το
  Django, θα πρέπει να κάνουμε κάποιες τροποποιήσεις στις υπηρεσίες,
  αφού πλέον θα χρησιμοποιεί έναν πραγματικό εξυπηρετητή.

* Επιπλέον, θα πρέπει να μαζέψουμε το σύνολο των αρχείων της εφαρμογής
  και να τα αντιγράψουμε στον κατάλληλο κατάλογο του Django.


## `app.module.ts` (1)

* Το `app.module.ts` πλέον δεν θα χρησιμοποιεί τα
  `InMemoryWebApiModule` και `InMemoryDataService`.

* Συνεπώς τα αφαιρούμε.


## `app.module.ts` (2)

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { BookDetailComponent } from './book-detail.component';
import { BooksComponent } from './books.component';
import { BookService } from './book.service';

import { BookSearchComponent } from './book-search.component';

import  { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BookDetailComponent,
    BooksComponent,
    BookSearchComponent
  ],
  providers: [ BookService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Συμμάζεμα αρχείων

* Για να μαζέψουμε όλα τα αρχεία της Angular εφαρμογής, δίνουμε, στον
  κατάλογο `client`:
  ```bash
  ng build
  ```
  
* Τα αρχεία θα συμμαζευτούν και θα αποθηκευτούν στον κατάλογο
  `client/dist`.


## Προσαρμογή `settings.py`

* Στο αρχείο `settings.py` προσθέτουμε κάτω από τη γραμμή:
  ```python
  STATIC_URL = '/static/'
  ```
  τις γραμμές:
  ```
  from pathlib import Path
  STATICFILES_DIRS = (
      os.path.join(str(Path(BASE_DIR).parents[0]), os.path.join('client', 'dist')),
  )

  STATIC_ROOT = os.path.join(BASE_DIR, 'dist')
  ```
  
<div class="notes">

Με τις γραμμές:
```python
from pathlib import Path
STATICFILES_DIRS = (
    os.path.join(str(Path(BASE_DIR).parents[0]), os.path.join('client', 'dist')),
)
```
ενημερώνουμε το Django ώστε να αναζητά τα στατικά αρχεία και στον
κατάλογο `../client/dist`, όπου έχουμε συγκεντρώσει την εφαρμογή
Angular. Με το `Path(BASE_DIR).parents[0]` παίρνουμε ένα αντικείμενο
που αντιστοιχεί στον κατάλογο γονέα του τρέχοντος καταλόγου· σε αυτόν,
ενώνουμε το `client/dist`.

Η γραμμή:
```python
STATIC_ROOT = os.path.join(BASE_DIR, 'dist')
```
δεν χρειάζεται αυτή τη στιγμή· θα χρησιμεύσει όταν θα μαζέψουμε όλα τα
στατικά αρχεία και θα θέλουμε να τα μεταφέρουμε στον εξυπηρετητή μας.

</div>


## Έλεγχος εφαρμογής

* Η εφαρμογή μας είναι προσβάσιμη μέσω του URL:
    ```
    http://127.0.0.1:8000/
    ```

* Ταυτόχρονα, το API είναι προσβάσιμο μέσω των URLs που είδαμε
  προηγουμένως.


# Εγκατάσταση σε nginx

## Εγκατάσταση παραγωγής

* Όταν βγει η υπηρεσία μας στην παραγωγή, το Django θα είναι αρμόδιο
  *μόνο* για την εξεπεργασία των αιτήσεων του REST API (`api/books`). 
  
* Το σύνολο των σελίδων που εμφανίζει το Angular θα δίνονται από τον
  nginx.
  

## Δημιουργία `production_settings.py`

* Στον εξυπηρετητή παραγωγής μπορεί να θέλουμε να έχουμε διαφορετικές
  ρυθμίσεις για το Django από ό,τι στον υπολογιστή ανάπτυξης.

* Για το σκοπό αυτό δημιουργούμε ένα αρχείο `production_settings.py`,
  στον ίδιο κατάλογο με το `project_settings.py`.
  
* Στη συνέχεια αλλαγές που αφορούν τον εξυπηρετητή παραγωγής θα τις
  κάνουμε στο `production_settings.py`.


## Προσαρμογή `production_settings.py`

* Στο αρχείο `production_settings.py` αλλάζουμε τη γραμμή:
  ```python
  STATIC_URL = '/static/'
  ```
  σε:
  ```python
  STATIC_URL = '/'
  ```

* Αυτό χρειάζεται γιατί στον εξυπηρετητή παραγωγής τα στατικά αρχεία
  δεν θα διατίθενται μέσω διαδρομής που ξεκινά από `/static`.
  
<div class="notes">

Φυσικά μπορούμε να κάνουμε και ό,τι άλλες αλλαγές χρειάζεται για να
λειτουργήσει η εφαρμογή μας στην παραγωγή.

</div>


## Ενεργοποίηση ρυθμίσεων παραγωγής

* Για να ενεργοποιείται αυτομάτως το αρχείο των ρυθμίσεων παραγωγής
  αλλάζουμε το αρχείο `/etc/systemd/system/gunicorn.service` ώστε να
  είναι: 
  
  ```
  [Unit]
  Description=gunicorn daemon
  After=network.target

  [Service]
  User=user
  Group=www-data
  WorkingDirectory=/home/user/project_site
  Environment=DJANGO_SETTINGS_MODULE=project_site.production_settings
  ExecStart=/home/user/project_site/env/bin/gunicorn --workers 3 --bind unix:/home/user/project_site/project_site.sock project_site.wsgi:application

  [Install]
  WantedBy=multi-user.target
  ```
  
* Με αυτόν τον τρόπο, όταν τρέχει το Django, η μεταβλητή συστήματος
  `DJANGO_SETTINGS_MODULE` θα υποδεικνύει το αρχείο ρυθμίσεων της
  παραγωγής.
  
* Το Django τότε χρησιμοποιεί ως αρχείο ρυθμίσεων αυτό που
  υποδεικνύεται από το `DJANGO_SETTINGS_MODULE`.

<div class="notes">

Αυτό που κάναμε ήταν να προσθέσουμε τη γραμμή:
```
Environment=DJANGO_SETTINGS_MODULE=project_site.production_settings
```
μέσα στο αρχείο.

Επίσης, προσέξτε, η γραμμή `ExecStart` είναι *μία γραμμή*. Απλώς εδώ
δεν χωράει στην οθόνη και φαίνεται να σπάει σε δύο.

</div>


## Εγκατάσταση Django REST framework

* Θα πρέπει να εγκαταστήσουμε το Django REST framework στον
  εξυπηρετητή που φιλοξενεί τον nginx.
  
* Αν θεωρήσουμε ότι η εφαρμογή είναι αποθηκευμένη στον κατάλογο
  `/home/user/project_site`, ενεργοποιούμε πρώτα το virtualenv που έχουμε
  δημιουργήσει:
  ``` 
  source /home/user/project_site/env/bin/activate
  ```

* Στη συνέχεια προχωράμε στην εγκατάσταση:
  ```
  pip install djangorestframework
  ```
  
  
## Κατάλογος στατικών αρχείων εφαρμογής

* Θα κατασκευάσουμε στον εξυπηρετητή μας έναν κατάλογο στον οποίο θα
  αποθηκεύσουμε τα στατικά αρχεία της εφαρμογής μας.
  
* Δίνουμε:
  ```bash
  sudo mkdir -p /srv/books
  ```
  
* Εκεί θα μεταφερθούν όλα τα στατικά αρχεία (HTML, CSS, JavaScript).


## Συγκέντρωση στατικών αρχείων εφαρμογής

* Για να συγκεντρώσουμε τα στατικά αρχεία, θα χρησιμοποιήσουμε το
  Django, δίνοντας:
  ```bash
  python manage.py collectstatic
  ```
  
* Με την εντολή θα μαζευτούν όλα τα στατικά αρχεία στον κατάλογο
  `server/dist` του υπολογιστή ανάπτυξης.
  
<div class="notes">

Τα στατικά αρχεία που θα μαζευτούν είναι τα εξής:

* Τα στατικά αρχεία που χρησιμοποιεί η εφαρμογή Django admin.

* Τα στατικά αρχεία που χρησιμοποιεί το browsable API του Django REST
  framework.
  
* Το σύνολο της εφαρμογής Angular που έχουμε φτιάξει.

Το `collectstatic` θα μαζέψει τα στατικά αρχεία του Django admin και
του browsable API. Επίσης, θα μαζέψει τα αρχεία που θα βρει στο αρχείο
`client/dist`, τα οποία είναι η εφαρμογή Angular. Τα αρχεία αυτά τα
έχουμε ήδη τοποθετήσει στο `client/dist` όταν δώσαμε την εντολή `ng build`.

</div>

## Μεταφορά των αρχείων της εφαρμογής

* Για να μεταφέρουμε όλα τα αρχεία που θα χρησιμοποιήσουμε στον
  εξυπηρετητή, μπορούμε να χρησιμοποιήσουμε την εντολή `scp`, ή ακόμα
  καλύτερα την εντολή `rsync`:
  ```bash
  rsync -avz --exclude 'dist' server/ icc:project_site/
  ```
  
* Στο παραπάνω υποθέτουμε ότι `icc` είναι ο εξυπηρετητής μας, και ότι
  εκεί αποθηκεύουμε τα αρχεία μας κάτω από τον κατάλογο `project_site`
  του προσωπικού μας καταλόγου.

<div class="notes">

Στο `rsync` αποκλείουμε τον κατάλογο `dist` από τη διαδικασία
μεταφοράς. Εκεί όπως είδαμε έχουμε συμμαζέψει το σύνολο των στατικών
αρχείων. Αυτά τα αρχεία θα μεταφερθούν σε άλλο σημείο του εξυπηρετητή
εφαρμογής, από όπου θα προσφέρονται κατ' ευθείαν από τον HTTP server
που θα έχουμε. Με το `rsync` λοιπόν μεταφέρουμε αυτή τη στιγμή τα
αρχεία της εφαρμογής Django *και μόνο αυτά* στον εξυπηρετητή
εφαρμογής, στο σημείο όπου έχουμε στήσει το Django.

Η παράμετρος `-avz` σημαίνει τα εξής:

  * Το `-a` (`--archive`) ζητά να ληφθούν υπόψη όλα τα αρχεία
    αναδρομικά (σε καταλόγους και υποκαταλόγους) και να διατηρηθούν
    όσες από τις ιδιότητες των αρχείων γίνεται.
  * Το `-v` (`--verbose`) σημαίνει να μας εμφανίζεται αυξημένη
    ποσότητα πληροφορίας για την εξέλιξη της διαδικασίας.
  * Το `-z` (`--compress`) σημαίνει ότι τα αρχεία θα συμπιέζονται κατά
    τη μεταφορά τους.

</div>


## Καταγραφή λειτουργίας

* Από τη στιγμή που η εφαρμογή μας τρέχει σε έναν εξυπηρετητή, και όχι
  στον τοπικό μας υπολογιστή, πρέπει να έχουμε έναν τρόπο να
  καταγράφουμε λεπτομερώς τη λειτουργία της.
  
* Αυτό γίνεται με τη χρήση *αρχείων καταγραφής* (log files). 


## Αρχεία καταγραφής nginx

* Ο nginx διατηρεί δύο βασικά αρχεία καταγραφής στον κατάλογο
  `/var/log/nginx`.
  
* Το αρχείο `access.log` στον συγκεκριμένο κατάλογο καταγράφει την
  πρόσβαση, δηλαδή τις αιτήσεις του πρωτοκόλλου HTTP που φτάνουν στον
  nginx.
  
* Το αρχείο `error.log` στον ίδιο κατάλογο καταγράφει ό,τι λάθη
  εμφανίζονται στις αιτήσεις (π.χ. λάθη στις ρυθμίσεις του nginx).


<div class="notes">

Παλαιότερα αρχεία έχουν αριθμητικές καταλήξεις (`access.log.1`,
`error.log.1`, ενώ επίσης αποθηκεύονται συμπιεσμένα
(`access.log.2.gz`, `error.log.2.gz`, κ.λπ.)

</div>


## Αρχεία καταγραφής Django / gunicorn (1)

* Εμείς θέλουμε το αρχείο καταγραφής του Django (μέσω του gunicorn) να
  αποθηκεύεται σε σημείο της επιλογής μας.
  
* Συγκεκριμένα, θα το αποθηκεύουμε σε έναν κατάλογο `log` μέσα στην
  εφαρμογή μας.

* Στον κατάλογο της εφαρμογής μας (π.χ. `/home/user/project_site`)
  δημιουργούμε έναν κατάλογο `log`:
  ```
  mkdir log
  ```

## Αρχεία καταγραφής Django / gunicorn (2)

* Αλλάζουμε το αρχείο `/etc/systemd/system/gunicorn.service` ώστε να
  γίνει ως εξής:
  ```
  [Unit]
  Description=gunicorn daemon
  After=network.target

  [Service]
  User=user
  Group=www-data
  WorkingDirectory=/home/user/project_site
  Environment=DJANGO_SETTINGS_MODULE=project_site.production_settings  
  ExecStart=/home/user/project_site/env/bin/gunicorn --workers 3 --bind unix:/home/user/project_site/project_site.sock --log-config /home/user/project_site/logging.conf project_site.wsgi:application

  [Install]
  WantedBy=multi-user.target
  ```
  
<div class="notes">

Προσθέσαμε το `--log-config /home/user/project_site/logging.conf` στη
γραμμή που ξεκινά με `ExecStart`. Και πάλι προσέξτε πως ό,τι ακολουθεί
το `ExecStart` είναι μία γραμμή, απλώς στην οθόνη εμφανίζεται παραπάνω
από μία.

</div>
  
  
## Αρχεία καταγραφής Django / gunicorn (3)

* Στον εξυπηρετητή μας, στον κατάλογο `project_site` δημιουργούμε το
  ακόλουθο αρχείο `logging.conf`:
  ```
  [loggers]
  keys=root, gunicorn.error, gunicorn.access

  [handlers]
  keys=console, error_file, access_file

  [formatters]
  keys=generic, access

  [logger_root]
  level=INFO
  handlers=console

  [logger_gunicorn.error]
  level=INFO
  handlers=error_file
  propagate=1
  qualname=gunicorn.error

  [logger_gunicorn.access]
  level=INFO
  handlers=access_file
  propagate=0
  qualname=gunicorn.access

  [handler_console]
  class=StreamHandler
  formatter=generic
  args=(sys.stdout, )

  [handler_error_file]
  class=logging.FileHandler
  formatter=generic
  args=('/home/user/project_site/log/gunicorn.error.log',)

  [handler_access_file]
  class=logging.FileHandler
  formatter=access
  args=('/home/user/project_site/log/gunicorn.access.log',)

  [formatter_generic]
  format=%(asctime)s [%(process)d] [%(levelname)s] %(message)s
  datefmt=%Y-%m-%d %H:%M:%S
  class=logging.Formatter

  [formatter_access]
  format=%(message)s
  class=logging.Formatter
  ```

<div class="notes">

Προσέξτε ότι στις γραμμές:
```
args=('/home/user/project_site/log/gunicorn.error.log',)
args=('/home/user/project_site/log/gunicorn.access.log',)
```
ορίζουμε την τοποθεσία όπου θα αποθηκευτούν τα logs:
  * το αρχείο λαθών θα είναι το `gunicorn.error.log`
  * το αρχείο πρόσβασης θα είναι το `gunicorn.access.log`
Και τα δύο αρχεία θα βρίσκονται στον κατάλογο `log` που φτιάξαμε
προηγουμένως. 

</div>


## Ρυθμίσεις nginx (1)

* Στο αρχείο ρυθμίσεων του nginx (`/etc/nginx/sites-available/default`)
  σβήνουμε τη γραμμή:
  ```
  root /var/www/html;
  ```
    
* Την αντικαθιστούμε με τη γραμμή:
  ```
  root /srv/books;
  ```
    
<div class="notes">

Η οδηγία `root` ορίζει τον κατάλογο από τον οποίο θα βρίσκει ο nginx
τα αρχεία που του ζητούνται. Για παράδειγμα, αν γράφαμε:
```
location /i/ {
    root /data/w3;
}
```
τότε αν ο browser ζητούσε το αρχείο `/i/top.gif`, ο nginx θα
επιστρέψει το αρχείο `/data/w3/i/top.gif`.

</div>


## Ρυθμίσεις nginx (2)

* Στο αρχείο ρυθμίσεων του nginx, σβήνουμε ό,τι γραμμές ξεκινούν με
  `location` και στη θέση τους γράφουμε:
  ```
  location = /favicon.ico { access_log off; log_not_found off; }

  location /api/books {
          include proxy_params;
          proxy_pass http://unix:/home/user/project_site/project_site.sock;
  }
  ```

<div class="notes">

Αυτά σημαίνουν τα εξής:

  * Το πρώτο `location` απενεργοποιεί την καταγραφή του `favicon.ico`
    στα αρχεία καταγραφής (γιατί δεν μας ενδιαφέρει).

  * Το `location /api/books` ορίζει ότι οι αιτήσεις που ξεκινούν
    `/api/books` θα διοχετευθούν στο Django. Αυτό είναι και το κλειδί
    της επικοινωνίας μεταξύ nginx και Django.

Αν αναρωτιέστει τι σημαίνουν αυτά που αναφέρονται μέσα στο `location
/api/books`:

  * `include proxy_params`: ο nginx διαβάζει τις οδηγίες που
    βρίσκονται στο αρχείο `/etc/nginx/proxy_params`. Εκεί ορίζονται
    διάφορες επικεφαλλίδες (headers) που θα προωθεί ο nginx στον
    Django.
    
  * `proxy_pass`: o nginx θα περάσει την αίτηση HTTP στον Django
    χρησιμοποιώντας το Unix socket
    `/home/user/project_site/project_site.sock`. 

</div>


## Ρυθμίσεις nginx (3)

* Επίσης στο ίδιο αρχείο, σβήνουμε την παρακάτω γραμμή που είχαμε
  γράψει παλαιότερα:
  ```
  rewrite ^/$ /djbr;
  ```
  
* Προσθέτουμε την παρακάτω γραμμή:
  ```
  try_files $uri $uri /index.html;
  ```

* Για να ελέγξουμε ότι οι ρυθμίσεις είναι ΟΚ, δίνουμε:
  ```bash
  sudo nginx -t
  ```

<div class="notes">

Τη γραμμή:
```
rewrite ^/$ /djbr;
```
την είχαμε βάλει ώστε αν ο χρήστης έβαζε απλώς τη διεύθυνση του
εξυπηρετητή, χωρίς να δώσει πιο συγκεκριμένο μονοπάτι, ο εξυπηρετητής
θα τον καθοδηγούσε να κάνει την ίδια αίτηση προσθέτοντας το `/djbr`
στην αρχή της. Αυτό πλέον δεν χρειάζεται· αν ο χρήστης δεν δώσει
κάποιο συγκεκριμένο μονοπάτι, θα δει την κεντρική σελίδα της εφαρμογής
Angular.

Η γραμμή:
```
try_files $uri $uri /index.html;
```
σημαίνει ότι αν ο χρήστης δώσει κάποιο URL το οποίο δεν αναγνωρίζει ο
nginx, θα επιστρέψει απλώς την κεντρική σελίδα της εφαρμογής μας,
`index.html`. Με τον τρόπο αυτό *όλες* οι σελίδες της εφαρμογής μας θα
δρομολογούνται μέσω της `index.html`, και άρα μέσω της δρομολόγησης
του Angular.

Προσέξτε λοιπόν το εξής: όλα τα URLs που βλέπουν οι χρήστες στον
browser τους είναι URLs που χειρίζεται το Angular. Αναλόγως με το τι
κάνει ο χρήστης, το Angular στέλνει αιτήσεις του τύπου `/api/books`
στον εξυπηρετητή. Έχουμε λοιπόν δύο παράλληλους κόσμους URLs: αυτές
που βλέπει ο χρήστης στον browser και αυτές που χρησιμοποιεί η
front-end εφαρμογή για να επικοινωνήσει με την back-end εφαρμογή.

</div>

##  Αντιγραφή στατικών αρχείων

* Αντιγράφουμε τα περιεχόμενα του καταλόγου `server/dist` από τον
  υπολογιστή ανάπτυξης στον κατάλογο
  `/srv/books` του εξυπηρετητή:
  ```
  rsync -avz --rsync-path="sudo rsync" dist icc:/srv/books
  ```
    
<div class="notes">

Η παράμετρος `--rsync-path="sudo rsync"` σημαίνει ότι θα
χρησιμοποιηθεί `sudo` στον εξυπηρετητή για την αντιγραφή των αρχείων.
Αυτό είναι απαραίτητο διότι ο κατάλογος `/srv/books` ανήκει στον
χρήστη `root`, εφόσον τον φτιάξαμε με την εντολή:
```
sudo mkdir -p /srv/books
```
Ούτως ή άλλως, απλοί χρήστες δεν έχουν δυνατότητα να γράψουν στη ρίζα
του συστήματος αρχείων (`/`) ούτε να δημιουργήσουν καταλόγους σε
αυτόν.

Αν παραλείψουμε την παράμετρο `--rsync-path="sudo rsync"`, θα λάβουμε
μια σειρά μηνυμάτων που θα μας ενημερώνει ότι δεν έχουμε άδεια ή
πρόσβαση να αντιγράψουμε τα συγκεκριμένα αρχεία.

</div>
    
## Εκκίνηση 

* Για να ξαναξεκινήσουμε τον nginx δίνουμε:
  ```bash
  sudo servicectl reload nginx
  ```
  αν δεν θέλουμε να διακοπούν οι υπάρχουσες συνδέσεις.

* Επειδή αλλάξαμε το αρχείο περιγραφής της υπηρεσίας `gunicorn`
  (`/etc/systemd/system/gunicorn.service`), θα
  πρέπει να δώσουμε και την εξής εντολή:
  ```
  sudo systemctl daemon-reload
  ```
 
## Παρακολούθηση της εφαρμογής μας

* Αν όλα έχουν πάει καλά, η εφαρμογή μας τώρα είναι διαθέσιμη στο
  διαδίκτυο.
  
* Αν θέλουμε να παρακολουθήσουμε τη χρήση της, τα αρχεία καταγραφής
  του nginx βρίσκονται στον κατάλογο `/var/log/nginx`:
  * `access.log`: προσβάσεις
  * `error.log`: λάθη
  
* Τα αρχεία καταγραφής του gunicorn βρίσκονται στις θέσεις που ορίσαμε
  παραπάνω.
  
* Αν δούμε το αρχείο προσβάσεων του gunicorn
  (`/home/user/project_site/gunicorn.access.log`), θα διαπιστώσουμε
  ότι φτάνουν μόνο αιτήσεις για το API, και τίποτε άλλο, δηλαδή αυτό
  ακριβώς που θέλαμε.


## Ενημερώσεις της εφαρμογής

* Από εδώ και μετά κάθε φορά που θέλουμε να ενημερώσουμε την εφαρμογή
  μας, τα πράγματα θα είναι πιο απλά.
  
* Αν θέλουμε να ενημερώσουμε μόνο το Angular, αρκεί να αντιγράφουμε τα
  αρχεία που προκύπτουν από το `ng build` στον κατάλογο `/srv/books`.
  
* Αν θέλουμε να ενημερώσουμε μόνο το Django, αρκεί να αντιγράψουμε τα
  περιεχόμενα του `server/project_site` του υπολογιστή μας στο
  `/home/user/project_site` στον εξυπηρετητή.


## Βελτιστοποίηση παραγωγής

* Αν θέλουμε μπορούμε να βελτιστοποιήσουμε την εφαρμογή Angular
  δίνοντας το εξής:
  ```
  ng build --prod
  ```
  
* Μπορούμε να ζητήσουμε και επιπλέον βελτιστοποιήσεις δίνοντας:
  ```
  ng build --prod --build-optimizer
  ```

<div class="notes">

* Το `ng build --prod` κάνει τα εξής:
  * προ-μεταγλωτίζει τα εξαρτήματα του Angular ([Ahead-of-Time, AOT,
    Compilation)](https://angular.io/guide/aot-compiler)
  * ενεργοποιεί τη λειτουργία παραγωγής [(production
    mode)](https://angular.io/guide/deployment#enable-prod-mode)
  * συγκεντρώνει περισσότερα μαζί ώστε τελικά να προκύψουν λιγότερα
  * minification (ελαχιστοποίηση): αφαιρεί κενούς χαρακτήρες, σχόλια,
    κ.ά. λεκτικά που δεν χρειάζονται
  * uglification: ξαναγράφει τον κώδικα ώστε να χρησιμοποιεί σύντομα
    και δυσνόητα ονόματα μεταβλητών και συναρτήσεων
  * απαλοιφή νεκρού κώδικα

</div>
