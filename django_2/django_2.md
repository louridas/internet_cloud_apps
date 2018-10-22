% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Django 2

## Συνέχεια της Εφαρμογής μας

* Θα εξελίξουμε την εφαρμογή μας υλοποιώντας πραγματικές λειτουργίες.

* Θα χρησιμοποιήσουμε σχέσεις πολλά προς πολλά.

* Θα δημιουργήσουμε σελίδες εμφάνισης των βιβλίων, συγγραφέων, και
  κριτικών.


# Σχέσεις Πολλά προς Πολλά

## Προσθήκη Συγγραφέων

* Αυτή τη στιγμή η εφαρμογή μας δεν έχει καθόλου συγγραφείς για τα
  βιβλία.

* Η σχέση μεταξύ βιβλίων και συγγραφέων είναι μια σχέση πολλά προς
  πολλά.

* Προσθέτουμε λοιπόν την ακόλουθη κλάση στο αρχείο `djbr/models.py`:

    ```python
    class Author(models.Model):
        name = models.CharField(max_length=200)
        books = models.ManyToManyField(Book)

        def __str__(self):
            return self.name
    ```

<div class="notes">

Ένας συγγραφέας μπορεί να γράψει πολλά βιβλία. Επίσης, ένα βιβλίο
μπορεί να έχει γραφτεί από πολλούς συγγραφείς (αυτό είναι πιο σύνηθες
στα ακαδημαϊκά βιβλία από ότι στα λογοτεχνικά). Σε τέτοιες περιπτώσεις
όπου έχουμε δύο οντότητες με σχέση πολλά προς πολλά μεταξύ τους πρέπει
να κατασκευάσουμε στη βάση δεδομένων έναν ενδιάμεσο πίνακα. Ο
ενδιάμεσος αυτός πίνακας έχει γραμμές όπου στην κάθε μία από αυτές
υπάρχει ένα ζεύγος από τα κλειδιά των δύο πινάκων που συσχετίζονται.
Στην περίπτωσή μας, ο ενδιάμεσος πίνακας θα περιέχει γραμμές όπου η
κάθε μία από αυτές θα περιέχει ένα κλειδί από τον πίνακα των βιβλίων
και ένα κλειδί από τον πίνακα των συγγραφέων.

</div>

## Ενδιάμεσος Πίνακας με Επιπλέον Πεδία

* Αν θέλουμε, μπορούμε να προσθέσουμε ενδιάμεσα πεδία στον ενδιάμεσο
  πίνακα, αλλά για να το κάνουμε αυτό θα πρέπει να τον ορίσουμε εμείς,
  π.χ.: 
  
   ```python
   from django.db import models

   class Person(models.Model):
       name = models.CharField(max_length=128)

       def __str__(self):
           return self.name

   class Group(models.Model):
       name = models.CharField(max_length=128)
       members = models.ManyToManyField(Person, through='Membership')

       def __str__(self):
           return self.name

   class Membership(models.Model):
       person = models.ForeignKey(Person, on_delete=models.CASCADE)
       group = models.ForeignKey(Group, on_delete=models.CASCADE)
       date_joined = models.DateField()
       invite_reason = models.CharField(max_length=64)
   ```

## Δημιουργία Μεταγωγής

* Όπως έχουμε πει, για να δημιουργήσουμε μια μεταγωγή που περιέχει τις
  αλλαγές μας, δίνουμε:

    ```bash
    python manage.py makemigrations
    ```

* Θα δούμε τότε ότι πράγματι θα δημιουργηθεί μία δεύτερη μεταγωγή:

    ```
    Migrations for 'djbr':
      djbr/migrations/0002_author.py
        - Create model Author
    ```
 
## Εφαρμογή Μεταγωγής
 
* Στη συνέχεια για να την εφαρμόσουμε δίνουμε:

    ```bash
    python manage.py migrate
    ```

* Στην οθόνη θα πληροφορηθούμε για την εφαρμογή της:

    ```
    Operations to perform:
      Apply all migrations: admin, auth, contenttypes, djbr, sessions
    Running migrations:
      Applying djbr.0002_author... OK   
    ```

<div class="notes">

Κάνοντας αυτό, θα δημιουργηθεί ένας πίνακας `djbr_author_books` που θα
απεικονίζει τη σχέση πολλά προς πολλά μεταξύ βιβλίων και συγγραφέων.

</div>

## Εισαγωγή Συγγραφέων

* Ανοίγουμε μία γραμμή εντολών Django και γράφουμε:

    ```python
    >>> from djbr.models import Author, Book

    >>> a1 = Author(name="David Foster Wallace")
    >>> a1.save()
    >>> a2 = Author(name="James Joyce")
    >>> a2.save()
    >>> a3 = Author(name="Thomas Pynchon")
    >>> a3.save()
    ```

## Εισαγωγή Βιβλίων

* Συνεχίζουμε στη γραμμή εντολών Django:

   ```python
   >>> b1 = Book(title="Infinite Jest", pub_year=1996)
   >>> b1.save()
   >>> b2 = Book(title="Oblivion: Stories", pub_year=2004)
   >>> b2.save()
   ```

## Συσχέτιση Βιβλίων Συγγραφέων


* Τώρα μπορούμε να ορίσουμε συσχετίσεις μεταξύ βιβλίων και συγγραφέων:

    ```python
    >>> a1.books.add(b1)
    >>> a1.books.add(b2)
    >>> a1.books.all()
    <QuerySet [<Book: Infinite Jest 1996>, <Book: Oblivion: Stories 2004>]>
    ```

## Εναλλακτική Εισαγωγή Δεδομένων με την Εφαρμογή Διαχείρισης

* Όπως είδαμε το Django μας προσφέρει μια εφαρμογή διαχείρισης με την
  οποία μπορούμε να διαχειριστούμε τα δεδομένα της εφαρμογής μας.
  
* Μπορούμε λοιπόν να χρησιμοποιήσουμε την εφαρμογή διαχείρισης για την
  εισαγωγή δεδομένων στην εφαρμογή μας.
  
## Εισαγωγή Συγγραφέων στην Εφαρμογή Διαχείρισης

* Για να μπορούμε να χειριστούμε τους συγγραφείς από την εφαρμογή
  διαχείρισης πρέπει να προσαρμόσουμε το αρχείο `djbr/admin.py`.
  
* Συγκεκριμένα θα πρέπει να προσθέσουμε καταγράψουμε την κλάση των
  συγγραφέων· έτσι το αρχείο `djbr/admin.py` θα γίνει:

    ```python
    from django.contrib import admin

    from .models import Book, Review, Author

    admin.site.register(Book)
    admin.site.register(Review)
    admin.site.register(Author)
    ```

* Στη συνέχεια μπορούμε να εισάγουμε συγγραφείς από το γραφικό
  περιβάλλον της εφαρμογής διαχείρισης.

## Πλοήγηση από τα Βιβλία στους Συγγραφείς

* Δεδομένου ότι η σχέση είναι συμμετρική, μπορούμε πάντα να
  πλοηγηθούμε και από τα βιβλία στους συγγραφείς.

    ```python
    >>> b1.author_set.all()
    <QuerySet [<Author: David Foster Wallace>]>
    ```

## Βιβλία με Πολλούς Συγγραφείς

* Για να δούμε ότι η σχέση πολλά προς πολλά λειτουργεί σωστά, ας
  φτιάξουμε και ένα βιβλίο με πολλούς συγγραφείς.

    ```python
    >>> brian = Author(name="Brian Kernighan")
    >>> dennis = Author(name="Dennis Ritchie")
    >>> brian.save()
    >>> dennis.save()
    >>> c = Book(title="The C Programming Language, 2nd edition", pub_year=1988)
    >>> c.save()
    >>> c.author_set.add(brian, dennis)
    >>> c.author_set.all()
    <QuerySet [<Author: Brian Kernighan>, <Author: Dennis Ritchie>]>
    ```

## Πλοήγηση μεταξύ Συσχετίσεων

* Μπορούμε να πλοηγηθούμε μεταξύ των συσχετίσεων πολλά προς πολλά,
  όπως μεταξύ των άλλων συσχετίσεων.

    ```python
    >>> Book.objects.filter(author__name__startswith="David")
    <QuerySet [<Book: Infinite Jest 1996>, <Book: Oblivion: Stories 2004>]>
    >>> Author.objects.filter(books__title__startswith="The C")
    <QuerySet [<Author: Brian Kernighan>, <Author: Dennis Ritchie>]>
    ```

<div class="notes">

Γενικώς, μπορείτε να κάνετε ό,τι θέλετε με τις σχέσεις πολλά προς
πολλά. Για περισσότερες πληροφορίες, δείτε τη
[σχετική τεκμηρίωση](https://docs.djangoproject.com/en/2.1/topics/db/examples/many_to_many/). 

</div>

# Δημιουργία Επιπλέον Σελίδων

## Βιβλία, Συγγραφείς, Κριτικές

* Θα ξεκινήσουμε γράφοντας στοιχειώδη κώδικα στο αρχείο
  `djbr/views.py`. Θα προσθέσουμε τον παρακάτω κώδικα:

    ```python
    def book(request, book_id):
        return HttpResponse("You are looking at book %s." % book_id)

    def reviews(request, book_id):
        response = "You are looking at the reviews of book %s."
        return HttpResponse(response % book_id)

    def author(request, author_id):
        response = "You are looking at author %s."
        return HttpResponse(response % author_id)
    ```
  
 <div class="notes">
 
 Με τον κώδικα αυτό κάθε φορά που ο χρήστης θα προσπαθεί να δει ένα
 βιβλίο θα βλέπει ένα μήνυμα «You are looking at book ...». Ομοίως για
 τις κριτικές και τους συγγραφείς. Ο σκοπός μας αυτή τη στιγμή είναι
 να δούμε πώς θα συνδέσουμε τις σελίδεσ των βιβλίων, κριτικών, και
 συγγραφέων, και όχι (ακόμα) να βελτιώσουμε τα περιεχόμενα της κάθε
 σελίδας. 
 
 </div>
  
## Δημιουργία URLs

* Για τις σελίδες αυτές θα δημιουργήσουμε τα αντίστοιχα URLs στο
  αρχείο `djrb/urls.py`. Κάντε τις αλλαγές ώστε το αρχείο να περιέχει
  τα εξής:

    ```python
    from django.urls import path

    from . import views

    app_name = 'djbr'

    urlpatterns = [
        path('', views.index, name='index'),
        path('books/<int:book_id>/', views.book, name='book'),
        path('books/<int:book_id>/reviews/', views.reviews, name='reviews'),
        path('authors/<int:author_id>/', views.author, name='author'),
    ]
    ```

<div class="notes">

Στον κώδικα έχουμε προσθέσει τη γραμμή:

```python
app_name = 'djbr'
```

Αυτό γίνεται προκειμένου να δηλώσουμε το *πεδίο ονομάτων* (namespace)
των URLs. Όταν δίνουμε στη δήλωση ενός URL το πεδίο `name`, όπως π.χ.:

```python
path('', views.index, name='index'),
```

το URL μας θα ονομάζεται `index`. Αλλά τι γίνεται αν έχουμε πολλές
εφαρμογές; Είναι πιθανό να υπάρχει το ίδιο όνομα URL σε άλλη εφαρμογή.
Με τη μεταβλητή `app_name` ορίζουμε το πεδίο στο οποίο ορίζονται τα
ονόματα. Έτσι, τα URLs που ορίσαμε έχουν όνομα:

```
djbr:index
djbr:book
djbr:reviews
djbr:author
```

και με αυτά τα ονόματα θα μπορούμε να αναφερόμαστε σε αυτά μέσα στα
πρότυπά μας.

</div>

## Λειτουργία URLs

* Τα URLs που δηλώσαμε είναι των παρακάτω τύπων:

    * `djbr/books/1/`
    * `djbr/books/1/reviews/`
    * `djbr/authors/1/`

* Το πρόθεμα `djbr` το χειρίζεται το αρχείο `project_site/urls.py` που
  είχαμε δει την προηγούμενη φορά.

## Λογική Κατασκευής URLs

* Τα URLs που θα χρησιμοποιούμε θα πρέπει να έχουν μια ξεκάθαρη
  λογική.

* Κάθε URL θα πρέπει να αντιστοιχεί σε κάποιον *πόρο* (resource) που
  χειριζόμαστε. Αυτοί θα είναι συνήθως αντικείμενα της εφαρμογής μας.

* Το URL θα δίνει το είδος και την ταυτότητα των πόρων που
  χειριζόμαστε.

<div class="notes">

Θα δούμε στη συνέχεια των μαθημάτων ότι τέτοιου είδους URLs είναι
ακριβώς ο ενδεδειγμένος τρόπος να δουλεύουμε με δεδομένα στις
διαδικτυακές εφαρμογές. Στα URLs αυτά ξεκινάμε με το είδος της
οντότητας (`books`) και στη συνέχεια βάζουμε το κλειδί της οντότητας.
Αν υπάρχουν οντότητες που εξαρτώνται από μια οντότητα, το σχήμα
συνεχίζεται αναδρομικά (`books/1/reviews`, `books/1/reviews/1`, κ.λπ.). 

</div>

## Δημιουργία Κεντρικής Σελίδας

* Σαν πρώτο βήμα, θα αλλάξουμε την κεντρική σελίδα της εφαρμογής σε
  κάτι ποιο λειτουργικό.

* Συγκεκριμένα, θα την κάνουμε να δείχνει μια λίστα με τα υπάρχοντα
  βιβλία.

## Πρότυπα Σελίδων 

* Οι δυναμικές σελίδες στο Django δημιουργούνται με τα κατάλληλα
  πρότυπα.

* Τα πρότυπά μας θα τα αποθηκεύσουμε σε έναν κατάλογο
  `djbr/templates/djbr`, τον οποίο θα πρέπει να δημιουργήσετε.


## Βασικό Πρότυπο Εμφάνισης

* Το βασικό πρότυπο εμφάνισης των σελίδων μας θα δίνεται από το αρχείο<br/>
  `djbr/templates/djbr/base.html`:

    ```html
    <!doctype html>
    <html lang="en">
      <head>

        <!-- Required meta tags for Bootstrap -->
        <meta charset="utf-8">
        <meta name="viewport"
          content="width=device-width, initial-scale=1,
          shrink-to-fit=no">

        <!-- Bootstrap CSS -->

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
          integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
          crossorigin="anonymous">

        <title>{% block title %}Django Book Reviews{% endblock %}</title>
      </head>

      <body>
        <div class="container">
          <div class="jumbotron">
            <h1>{% block heading %}Django Book Reviews{% endblock %}</h1>
          </div>
          <div class="col-md-offset-1 col-md-6">
            {% block content %}{% endblock %}
          </div>
        </div>

        <!-- Optional JavaScript for Bootstrap --> 
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
      </body>
    </html>
    ```

<div class="notes">

Στο βασικό πρότυπο βάζουμε τον κώδικα που θέλουμε να συμπεριλαμβάνεται
σε όλες τις υπόλοιπες σελίδες της εφαρμογής μας (ή τουλάχιστον στις
περισσότερες). 

Για την αισθητική της εφαρμογής μας θα χρησιμοποιήσουμε τη βιβλιοθήκη
[Bootstrap](http://getbootstrap.com/). Στην αρχή της σελίδας λοιπόν
βάζουμε τον απαραίτητο HTML κώδικα για να λειτουργήσει το Bootstrap.
Στο κάτω μέρος της σελίδας βάζουμε τον απαραίτητο κώδικα για να
είναι διαθέσιμες οι λειτουργίες JavaScript του Bootstrap (δεν θα τις
χρησιμοποιήσουμε τώρα, αλλά τις βάζουμε για χάρη της γενικότητας).

Όσον αφορά το πραγματικό περιεχόμενο των σελίδων μας, ορίζουμε τρία
blocks τα οποία θα μπορούν να αλλαχθούν στις επιμέρους σελίδες που θα
φτιάξουμε:

* `title`

* `heading`

* `content`

Θα δούμε αμέσως μετά πώς θα χρησιμοποιήσουμε το content block.

</div>

## Kεντρική Σελίδα

* Η κεντρική σελίδα θα εμφανίζει τα 10 βιβλία που έχουν εκδοθεί
  τελευταία (θα δούμε πώς προκύπτουν τα 10). Ο σκελετός της κεντρικής
  σελίδας θα αποθηκευτεί στο αρχείο `djbr/templates/djbr/index.html`:

    ```html
    {% extends "djbr/base.html" %}

    {% block content %}
    {% if latest_books_published %}
      <ul class="list-group">
        {% for book in latest_books_published %}
          <li class="list-group-item">
            <a href= "{% url 'djbr:book' book.id %}">{{ book.title }}</a>
          </li>
        {% endfor %}
      </ul>
    {% else %}
      <p>No books are available.</p>
    {% endif %}
    {% endblock %}
    ```

<div class="notes">

Ορίζουμε ότι η σελίδα αυτή χρησιμοποιεί τον βασικό σκελετό,
χρησιμοποιώντας τη γραμμή `{% extends "djbr/base.html" %}`. Στη
συνέχεια ορίζουμε ότι τα υπόλοιπα περιεχόμενα θα εισαχθούν μέσα στο
contentm block, χρησιμοποιώντας τη γραμμή `{% block content %}...{%
endblock %}`.

Προσέξτε επίσης πώς κατασκευάζουμε το σύνδεσμο στο URL που αντιστοιχεί
σε ένα βιβλίο:

```html
<a href= "{% url 'djbr:book' book.id %}">{{ book.title }}</a>
```

Το όνομα του URL είναι `djbr:book`, σύμφωνα με το namespace που
ορίσαμε. Το URL αυτό παίρνει μία παράμετρο, έναν ακέραιο, την οποία
δίνουμε με το `book.id`.

</div>


## Κώδικας Κεντρικής Σελίδας (1)

* Αλλάζουμε το αρχείο `views.py` ως εξής:

	```python
	from django.http import HttpResponse
    from django.template import loader

    from .models import Book

	def index(request):
		latest_books_published = Book.objects.order_by('-pub_year', 'title')[:10]
		template = loader.get_template('djbr/index.html')
		context = {'latest_books_published': latest_books_published}
		return HttpResponse(template.render(context, request))
	```

<div class="notes">

Για να χρησιμοποιήσουμε ένα πρότυπο πρέπει πρώτα να το φορτώσουμε,
πράγμα που κάνουμε με τη μέθοδο `loader.get_template()` δίνοντας ως
παράμετρο το `djbr/index.html`. Αφού αναζητήσουμε το περιεχόμενο που
θα εισάγουμε στο πρότυπο, το αποδίδουμε με τη μέθοδο `render()`, στην
οποία περνάμε ένα λεξικό με το περιεχόμενο, `context` και την αίτηση
του χρήστη, `request`. Στο λεξικό `context` δημιουργούμε κλειδιά και
τιμές που αντιστοιχούν στα δεδομένα μας· εδώ, φτιάχνουμε ένα κλειδί
`latest_books_published` στο οποίο δίνουμε ως τιμή τη μεταβλητή με το
ίδιο όνομα, η οποία περιέχει τα αποτελέσματα της αναζήτησης στη βάση.

Η αναζήτηση:

```python
Book.objects.order_by('-pub_year', 'title')[:10]
```
θα έχει ως αποτέλεσμα να εκτελεστεί η κατάλληλη εντολή SQL με τη χρήση
`LIMIT`. Αυτό σημαίνει ότι η ίδια η βάση θα μας επιστρέψει μέχρι 10
βιβλία· δεν είναι κάτι που θα γίνει ως Python slice. Πράγματι, αυτό
μπορούμε να το επιβεβαιώσουμε ζητώντας από το Django να μας τυπώσει
τον κώδικα SQL που δημιουργεί:

```python
>>> print(Book.objects.order_by('-pub_year', 'title')[:10].query)
```

Θα πάρουμε:

```sql
SELECT `djbr_book`.`id`, `djbr_book`.`title`, `djbr_book`.`pub_year` 
FROM `djbr_book` 
ORDER BY `djbr_book`.`pub_year` DESC, `djbr_book`.`title` ASC
LIMIT 10
```

Αντίστοιχα αν γράφαμε:

```python
Book.objects.order_by('-pub_year', 'title')[5:10]
```

η βάση θα μας επέστρεφε από το πέμπτο μέχρι το δέκατο βιβλίο (αν
υπάρχουν) με χρήση `LIMIT` και `OFFSET`. Μπορούμε πάλι να το
επιβεβαιώσουμε αυτό:

```python
>>> print(Book.objects.order_by('-pub_year', 'title')[5:10].query)
```

που θα δώσει:

```sql
SELECT `djbr_book`.`id`, `djbr_book`.`title`, `djbr_book`.`pub_year` 
FROM `djbr_book` 
ORDER BY `djbr_book`.`pub_year` DESC, `djbr_book`.`title` ASC
LIMIT 5 OFFSET 5
```

Παρά το ότι λοιπόν αυτό που γράφουμε είναι Python, αφού η αναζήτηση θα
γίνει μέσω SQL, κάποια πράγματα που θα μπορούσαμε να γράψουμε σε
Python δεν επιτρέπονται. Έτσι δεν μπορούμε να δώσουμε αρνητικές
θέσεις:

```python
Book.objects.order_by('-pub_year', 'title')[5:-1]
```

Αντίθετα, η χρήση της τρίτης παραμέτρου (βήματος) σε slice
επιτρέπεται. Αλλά τότε, η αναζήτηση:

```python
Book.objects.order_by('-pub_year', 'title')[:10:2]
```

θα εκτελεστεί διαφορετικά από ό,τι πριν. Το Django θα εκτελέσει την
αναζήτηση:

```python
Book.objects.order_by('-pub_year', 'title')
```

οπότε θα επιστραφούν όλες οι σχετικές εγγραφές από τη βάση σε μία
λίστα. Τότε θα εφαρμοστεί το `[:10:2]` από την Python πάνω στη λίστα.
Προφανώς, είναι πολύ λιγότερο αποτελεσματικό από το να μπορέσουμε να
εκτελέσουμε κάτι αποκλειστικά στη βάση.

</div>

## Κώδικας Κεντρικής Σελίδας (2)

* Επειδή το διάβασμα και η απόδοση ενός προτύπου είναι πολύ
  συνηθισμένη αλληλουχία, το Django μας δίνει τη συντόμευση `render()`
  στα `django.shortcuts` που τα κάνει μαζί. 
  
* Αλλάζουμε λοιπόν το αρχείο `views.py` ως εξής:

    ```python
    from django.shortcuts import render

    from .models import Book

    def index(request):
        latest_books_published = Book.objects.order_by('-pub_year', 'title')[:10]
        context = {'latest_books_published': latest_books_published}
        return render(request, 'djbr/index.html', context)
    ```

## Σελίδα Βιβλίου

* Για τη σελίδα κάθε βιβλίου, θα χρειαστεί να εμπλουτίσουμε την
  αντίστοιχη μέθοδο στο `djbr/views.py` και να γράψουμε το αντίστοιχο
  πρότυπο της σελίδας.

* Στο `dbjr/views.py` αλλάζουμε τη μέθοδο `book()` ως εξής:

    ```python
    def book(request, book_id):
        book = get_object_or_404(Book, pk=book_id)
        return render(request, 'djbr/book.html', {'book': book})
    ```

* Επίσης, στο import θα πρέπει να προσθέσουμε και το
  `get_object_or_404`, δηλαδή θα γίνει:

    ```python
    from django.shortcuts import render, get_object_or_404
    ```

<div class="notes">

Η μέθοδος `get_object_or_404()` παίρνει ως πρώτη παράμετρο το όνομα
ενός μοντέλου στο Django. Οι υπόλοιπες παράμετροι διοχετεύονται στη
μέθοδο `get()` του συγκεκριμένου μοντέλου. Έτσι εδώ η
`get_object_or_404()` θα προσπαθήσει να βρει το βιβλίο με το
συγκεκριμένο κλειδί. Αν δεν το βρει, θα πετάξει μια εξαίρεση
(exception) `Http404`. 

Όταν το κάνει αυτό, το Django θα εμφανίσει ένα τυπικό μήνυμα λάθους
που θα ενημερώνει το χρήστη ότι η σελίδα δεν υπάρχει. Αν θέλουμε να
προσαρμόσουμε το μήνυμα αυτό μπορούμε να δημιουργήσουμε μια σελίδα
`404.html` στη ρίζα των καταλόγων προτύπων της εφαρμογής μας, δηλαδή
μια σελίδα `djbr/templates/404.html`.

Στην περίπτωση που το κάνουμε αυτό, η σελίδα θα εμφανίζεται μόνο όταν
η εφαρμογή μας τρέχει σε συνθήκες παραγωγής. Μέχρι τώρα τρέχουμε την
εφαρμογή μας σε συνθήκες αποσφαλμάτωσης (debug), το οποίο σημαίνει ότι
το Django εμφανίζει στις σελίδες λάθους λεπτομέρειες που μας βοηθούν
να τα διορθώσουμε. Αυτές όμως δεν αφορούν τους χρήστες και όταν η
εφαρμογή μας είναι έτοιμη θα την τρέξουμε σε συνθήκες παραγωγής. Για
να την τρέξουμε σε συνθήκες παραγωγής θα πρέπει να θέσουμε `DEBUG =
False` στο αρχείο `project_site/settings.py`, ή ακόμα καλύτερα στο
αρχείο `project_site/site_config.py` το οποίο έχουμε δημιουργήσει όπως
είπαμε σε προηγούμενο μάθημα. 

Τότε θα πρέπει επίσης να δηλώσουμε ποιες διευθύνσεις εξυπηρετεί το
Django· για παράδειγμα τη διεύθυνση `www.example.com` αν πραγματικά η
υπηρεσία μας έτρεχε σε αυτή τη διεύθυνση. Αυτό το κάνουμε δίνοντας
`ALLOWED_HOSTS = [ 'www.example.com' ]` στο `project_site/settings.py`
(ή στο `project_site/site_config.py`). Αν ακόμα δεν έχουμε πάρει μια
διεύθυνση για την εφαρμογή μας, τότε μπορούμε να βάλουμε
`ALLOWED_HOSTS = ['localhost', '127.0.0.1', '[::1]']`. Το `::1` είναι
το αντίστοιχο του `127.0.0.1` στην περίπτωση που χρησιμοποιούμε
πρωτόκολλο IPv6.

</div>

## Πρότυπο Βιβλίου

* Δημιουργούμε το αρχείο `djbr/templates/djbr/book.html` με τα
  παρακάτω περιεχόμενα:

    ```html
    {% extends "djbr/base.html" %}

    {% block content %}
    <ul class="list-group">
      <li class="list-group-item">
        Title: {{ book.title }}
      </li>
      <li class="list-group-item">
        Author:
        <ul>
          {% for author in book.author_set.all %}
            <li>
              <a href="{% url 'djbr:author' author.id %}">{{ author.name }}</a>
            </li>
          {% endfor %}
        </ul>
      <li class="list-group-item">
        Year published: {{ book.pub_year }}
      </li>
      <li class="list-group-item"><span>Reviews:
        <a href="{% url 'djbr:reviews' book.id %}">
          <span class="badge badge-secondary">{{ book.review_set.all.count }}
          </span>
      </li>
    </ul>
    {% endblock %}
    ```

## Σελίδα Συγγραφέα

* Για τη σελίδα κάθε συγγραφέα, θα χρειαστεί ομοίως εμπλουτίσουμε την
  αντίστοιχη μέθοδο στο `djbr/views.py` και να γράψουμε το αντίστοιχο
  πρότυπο της σελίδας.

* Στο `dbjr/views.py` αλλάζουμε τη μέθοδο `author()` ως εξής:

    ```python
    def author(request, author_id):
        author = get_object_or_404(Author, pk=author_id)
        return render(request, 'djbr/author.html', {'author': author})
    ```

* Επίσης θα πρέπει να προσαρμόσουμε τα imports:

    ```python
    from .models import Book, Author
    ```

## Πρότυπο Συγγραφέα

* Δημιουργούμε το αρχείο `djbr/templates/djbr/author.html` με τα
  παρακάτω περιεχόμενα:

    ```html
    {% extends "djbr/base.html" %}

    {% block content %}
    <ul class="list-group">
      <li class="list-group-item">
        Name: {{ author.name }}
      </li>
      <li class="list-group-item">
        Books:
        <ul>
          {% for book in author.books.all %}
            <li>
              <a href="{% url 'djbr:book' book.id %}">{{ book.title }}</a>
            </li>
          {% endfor %}
        </ul>
    </ul>
    {% endblock %}
    ```

## Σελίδα Κριτικών

* Τέλος, για τις κριτικές, θα κάνουμε αντίστοιχες αλλαγές στο
  `djbr/views.py` και θα γράψουμε το αντίστοιχο πρότυπο της σελίδας:

    ```python
    def reviews(request, book_id):
        book_reviews = Review.objects.filter(book_id=book_id)
        return render(request, 'djbr/reviews.html',
                      {'book_reviews': book_reviews })
    ```

* Δεν πρέπει να ξεχάσουμε να προσαρμόσουμε τα imports!

    ```python
    from .models import Book, Author, Review
    ```

## Πρότυπο Κριτικών

* Δημιουργούμε το αρχείο `djbr/templates/djbr/reviews.html` με τα
  παρακάτω περιεχόμενα:

    ```html
    {% extends "djbr/base.html" %}

    {% block content %}
    {% if not book_reviews %}
      <h2 class="bg-warning">No reviews yet.</h2>
    {% else %}
      <div class="list-group">
        {% for review in book_reviews %}
          <div class="list-group-item active">
            Summary: {{ review.title }}
          </div>
          <div class="list-group-item">
            Review: {{ review.text }}
          </div>
          <div class="list-group-item">
            Date reviewed: {{ review.review_date }}
          </div>
        {% endfor %}
      </div>
    {% endif %}
    {% endblock %}
    ```
    
## Μια Λεπτομέρεια Ακόμα

* Αυτή τη στιγμή η εφαρμογή ακούει στα URL που ξεκινούν από 
  `http://127.0.0.1:8000/djbr`.

* Επίσης η εφαρμογή διαχείρισης ακούει στα URL που ξεκινούν από
  `http://127.0.0.0.1:8000/admin`.

* Αν λοιπόν ο χρήστης δώσει `http://127.0.0.0.1:8000/` θα πάρει λάθος.

* Μπορούμε να το αλλάξουμε αυτό, ώστε αν δώσει
  `http://127.0.0.0.1:8000/` να ανακατευθυνθεί στο
  `http://127.0.0.1:8000/djbr/`.

## Ανακατεύθυνση στο `djbr/`

* Για να το πετύχουμε αυτό, πηγαίνουμε στο αρχείο
  `project_site/urls.py` και το αλλάζουμε ώστε να είναι όπως παρακάτω:

    ```python
	from django.contrib import admin
	from django.urls import include, path

	from django.http.response import HttpResponseRedirect

	urlpatterns = [
		path('', lambda r: HttpResponseRedirect('djbr/')),
		path('djbr/', include('djbr.urls')),
		path('admin/', admin.site.urls),
	]
    ```
