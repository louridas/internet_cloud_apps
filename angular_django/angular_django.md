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
  'Infinite Jest', 1996
  'Oblivion', 2004
  'Conversations with Friends', 2017
  'The Crying of Lot 49', 1966
  'City on Fire', 2015 
  'The Narrow Road to the Deep North', 2013
  'The Dispossessed', 1974
  'The Left Hand of Darkness', 1969
  'A Death in the Family: My Struggle Book 1', 2013
  'A Man in Love: My Struggle Book 2', 2013
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


## Στατικά αρχεία στο Django

* Όλη η frontend εφαρμογή θα δίνεται ως στατικά αρχεία.

* Δημιουργούμε λοιπόν έναν κατάλογο `static/djbr` στην εφαρμογή
  μας στο Django, στον κατάλογο `server`.

* Αντιγράφουμε τα περιεχόμενα του καταλόγου `client/dist` στον κατάλογο
  `server/static/djbr`.


## Προσαρμογή `project_site/urls.py`

* Στη συνέχεια ορίζουμε στο `project_site/urls.py` ότι αν δεν δώσει
  τίποτε ο χρήστης, το Django θα επιστρέψει την κεντρική σελίδα της
  εφαρμογής: 
  ```python
  from django.conf.urls import url, include
  from django.contrib import admin

  from djbr import views

  urlpatterns = [
      url(r'^api/', include('djbr.urls')),
      url(r'^admin/', admin.site.urls),
  ] 

  urlpatterns += url(r'^(?P<path>.*)$', views.index),
  ```

## Προσαρμογή `settings.py`

* Στο αρχείο `settings.py` προσθέτουμε κάτω από τη γραμμή:
  ```python
  STATIC_URL = '/static/'
  ```
  τη γραμμή:
  ```python
  STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static/djbr'),
  )
  ```

## Έλεγχος εφαρμογής

* Η εφαρμογή μας είναι προσβάσιμη μέσω του URL:
    ```
    http://127.0.0.1:8000/
    ```

* Ταυτόχρονα, το API είναι προσβάσιμο μέσω των URLs που είδαμε
  προηγουμένως.


    
