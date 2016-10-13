% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Django 2

## Συνέχεια της εφαρμογής μας

* Θα εξελίξουμε την εφαρμογή μας υλοποιώντας πραγματικές λειτουργίες.

* Θα χρησιμοποιήσουμε σχέσεις πολλά προς πολλά.

* Θα δημιουργήσουμε σελίδες εμφάνισης των βιβλίων, συγγραφέων, και
  κριτικών.


# Σχέσεις πολλά προς πολλά

## Προσθήκη συγγραφέων

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

## Δημιουργία και εφαρμογή μεταγωγής

* Όπως έχουμε πει, για να δημιουργήσουμε μια μεταγωγή που περιέχει τις
  αλλαγές μας, δίνουμε:

    ```bash
    python manage.py makemigrations
    ```

* Και στη συνέχεια για να την εφαρμόσουμε δίνουμε:

    ```bash
    python manage.py migrate
    ```

<div class="notes">

Κάνοντας αυτό, θα δημιουργηθεί ένας πίνακας `djbr_author_books` που θα
απεικονίζει τη σχέση πολλά προς πολλά μεταξύ βιβλίων και συγγραφέων.

</div>

## Εισαγωγή συγγραφέων

* Ανοίγουμε μία γραμμή εντολών Django και γράφουμε:

    ```python
    >>> a1 = Author(name="David Foster Wallace")
    >>> a1.save()
    >>> a2 = Author(name="James Joyce")
    >>> a2.save()
    >>> a3 = Author(name="Thomas Pynchon")
    >>> a3.save()
    ```

## Εισαγωγή βιβλίων

* Συνεχίζουμε στη γραμμή εντολών Django:

    ```python
    >>> b1 = Book(title="Infinite Jest", pub_year=1996)
    >>> b1.save()
    >>> b2 = Book(title="Oblivion: Stories",
        pub_year=2004)
    >>> b2.save()
    ```

## Συσχέτιση βιβλίων συγγραφέων


* Τώρα μπορούμε να ορίσουμε συσχετίσεις μεταξύ βιβλίων και συγγραφέων:

    ```python
    >>> a1.books.add(b1)
    >>> a1.books.add(b2)
    >>> a1.books.all()
    <QuerySet [<Book: Infinite Jest 1996>, <Book: Oblivion: Stories 2004>]>
    ```

## Πλοήγηση από τα βιβλία στους συγγραφείς

* Δεδομένου ότι η σχέση είναι συμμετρική, μπορούμε πάντα να
  πλοηγηθούμε και από τα βιβλία στους συγγραφείς.

    ```python
    >>> b1.author_set.all()
    <QuerySet [<Author: David Foster Wallace>]>
    ```

## Βιβλία με πολλούς συγγραφείς

* Για να δούμε ότι η σχέση πολλά προς πολλά λειτουργεί σωστά, ας
  φτιάξουμε και ένα βιβλίο με πολλούς συγγραφείς.

    ```python
    >>> brian = Author(name="Brian Kernighan")
    >>> dennis = Author(name="Dennis Ritchie")
    >>> brian.save()
    >>> dennis.save()
    >>> c = Book(title="The C Programming Language, 2nd edition",
        pub_year=1988)
    >>> c.save()
    >>> c.author_set.add(brian, dennis)
    >>> c.author_set.all()
    <QuerySet [<Author: Brian Kernighan>, <Author: Dennis Ritchie>]>
    ```

## Πλοήγηση μεταξύ συσχετίσεων

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
[σχετική τεκμηρίωση](https://docs.djangoproject.com/en/1.10/topics/db/examples/many_to_many/). 

</div>

# Δημιουργία επιπλέον σελίδων

## Βιβλία, συγγραφείς, κριτικές.

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
    
## Δημιουργία URLs

* Για τις σελίδες αυτές θα δημιουργήσουμε τα αντίστοιχα URLs στο
  αρχείο `djrb/urls.py`. Κάντε τις αλλαγές ώστε το αρχείο να περιέχει
  τα εξής:

    ```python
    from django.conf.urls import url

    from . import views

    app_name = 'djbr'

    urlpatterns = [
        url(r'^$', views.index, name='index'),
        url(r'^book/(?P<book_id>[0-9]+)/$', views.book, name='book'),
        url(r'^book/(?P<book_id>[0-9]+)/reviews/$', views.reviews, name='reviews'),
        url(r'^author/(?P<author_id>[0-9]+)/$', views.author, name='author'),
    ]
    ```

## Λειτουργία URLs

* Τα URLs που δηλώσαμε είναι των παρακάτω τύπων:

    * `djbr/book/1/`
    * `djbr/book/1/reviews/`
    * `djbr/author/1/`

* Το πρόθεμα `djbr` το χειρίζεται το αρχείο `project_site/urls.py` που
  είχαμε δει την προηγούμενη φορά.

## Λογική κατασκευής URLs

* Τα URLs που θα χρησιμοποιούμε θα πρέπει να έχουν μια ξεκάθαρη
  λογική.

* Κάθε URL θα πρέπει να αντιστοιχεί σε κάποιον *πόρο* (resource) που
  χειριζόμαστε. Αυτοί θα είναι συνήθως αντικείμενα της εφαρμογής μας.

* Το URL θα δίνει το είδος και την ταυτότητα των πόρων που
  χειριζόμαστε.

## Δημιουργία κεντρικής σελίδας

* Σαν πρώτο βήμα, θα αλλάξουμε την κεντρική σελίδα της εφαρμογής σε
  κάτι ποιο λειτουργικό.

* Συγκεκριμένα, θα την κάνουμε να δείχνει μια λίστα με τα υπάρχοντα
  βιβλία.

## Πρότυπα σελίδων 

* Οι δυναμικές σελίδες στο Django δημιουργούνται με τα κατάλληλα
  πρότυπα.

* Τα πρότυπά μας θα τα αποθηκεύσουμε σε έναν κατάλογο
  `djbr/templates/djbr`, τον οποίο θα πρέπει να δημιουργήσετε.

## Βασικό πρότυπο εμφάνισης

* Το βασικό πρότυπο εμφάνισης των σελίδων μας θα δίνεται από το αρχείο
  `djbr/templates/djbr/base.html`:

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
          crossorigin="anonymous">

        <script src="http://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossorigin="anonymous"></script>

        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
          integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
          crossorigin="anonymous"></script>

        <title>{% block title %}Django Book Reviews{% endblock %}</title>
      </head>

      <body>
        <div class="container theme-showcase">
          <div class="jumbotron">
            <h1>{% block heading %}Django Book Reviews{% endblock %}</h1>
          </div>
          <div class="col-md-offset-1 col-md-6">
            {% block content %}{% endblock %}
          </div>
        </div>
      </body>
    </html>
    ```

## Kεντρική σελίδα

* Η κεντρική σελίδα θα εμφανίζει τα 10 βιβλία που έχουν εκδοθεί
  τελευταία (θα δούμε πώς προκύπτουν τα 10):

    ```html
    {% if latest_books_published %}
        <ul>
        {% for book in latest_books_published %}
            <li><a href= "{% url 'djbr:book' book.id %}">{{ book.title }}</a></li>
        {% endfor %}
        </ul>
    {% else %}
        <p>No books are available.</p>
    {% endif %}
    ```

## Κώδικας κεντρικής σελίδας

* Αλλάζουμε το αρχείο `views.py` ως εξής:

    ```python
    from django.shortcuts import render

    from .models import Book

    def index(request):
        latest_books_published = Book.objects.order_by('-pub_year', 'title')[:10]
        context = {'latest_books_published': latest_books_published}
        return render(request, 'djbr/index.html', context)
    ```

## Σελίδα βιβλίου

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

## Πρότυπο βιβλίου

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
        <a class="badge" href="{% url 'djbr:reviews' book.id %}">
          {{ book.review_set.all.count }}
        </a></span>
      </li>
    </ul>
    {% endblock %}
    ```

## Σελίδα συγγραφέα

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

## Πρότυπο συγγραφέα

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

## Σελίδα κριτικών

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

## Πρότυπο κριτικών

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
    
## Μια λεπτομέρεια ακόμα

* Αυτή τη στιγμή η εφαρμογή ακούει στα URL που ξεκινούν από 
  `http://127.0.0.1:8000/djbr`.

* Επίσης η εφαρμογή διαχείρισης ακούει στα URL που ξεκινούν από
  `http://127.0.0.0.1:8000/admin`.

* Αν λοιπόν ο χρήστης δώσει `http://127.0.0.0.1:8000/` θα πάρει λάθος.

* Μπορούμε να το αλλάξουμε αυτό, ώστε αν δώσει
  `http://127.0.0.0.1:8000/` να ανακατευνθεί στο
  `http://127.0.0.1:8000/djbr/`.

## Ανακατεύθυνση στο `djbr/`

* Για να το πετύχουμε αυτό, πηγαίνουμε στο αρχείο
  `project_site/urls.py` και το αλλάζουμε ώστε να είναι όπως παρακάτω:

    ```python
    from django.conf.urls import url, include
    from django.contrib import admin

    from django.http.response import HttpResponseRedirect

    urlpatterns = [
        url(r'^$', lambda r: HttpResponseRedirect('djbr/')),
        url(r'^djbr/', include('djbr.urls')),
        url(r'^admin/', admin.site.urls),
    ]
    ```

