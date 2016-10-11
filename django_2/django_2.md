% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Django 2

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

    def author_books(request, author_id):
        response = "You are looking at the books of author %s."
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
    * `djbr/author/1/books`

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

## Kεντρική σελίδα (1)

* Οι δυναμικές σελίδες στο Django δημιουργούνται με τα κατάλληλα
  πρότυπα.

* Τα πρότυπά μας θα τα αποθηκεύσουμε σε έναν κατάλογο
  `djbr/templates/djbr`, τον οποίο θα πρέπει να δημιουργήσετε.

* Στον κατάλογο αυτό, γράψτε όσα ακολουθούν σε ένα αρχείο
  `index.html`.

## Kεντρική σελίδα (2)

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
    <ul>
      <li>
        Title: {{ book.title }}
      </li>
      <li>
        Author:
        <ul>
          {% for author in book.author_set.all %}
            <li>
              <a href="{% url 'djbr:author' author.id %}">{{ author.name }}</a>
            </li>
          {% endfor %}
        </ul>
      <li>
        Year published: {{ book.pub_year }}
      </li>
      <li>Reviews: <a href="{% url 'djbr:reviews' book.id">
        {{ book.review_set.all.count }}</a></li>
    </ul>
    ```

## Σελίδα συγγραφέα

    ```python
    def author(request, author_id):
        author = get_object_or_404(Author, pk=author_id)
        return render(request, 'djbr/author.html', {'author': author})
    ```

## Πρότυπο συγγραφέα

```html
<ul>
  <li>
    Name: {{ author.name }}
  </li>
  <li>
    Books:
    <ul>
      {% for book in author.books.all %}
        <li>
          <a href="{% url 'djbr:book' book.id %}">{{ book.title }}</a>
        </li>
      {% endfor %}
    </ul>
</ul>
```

## Σελίδα κριτικής

```python
def reviews(request, book_id):
    book_reviews = Review.objects.filter(book_id=book_id)
    return render(request, 'djbr/reviews.html',
                  {'book_reviews': book_reviews })
```

## Πρότυπο κριτικής

```html
{% if not book_reviews %}
  No reviews yet.
{% else %}
  <ul>
    {% for review in book_reviews %}
      <li>
        Review Title: {{ review.title }}
        </li>
      <li>
        Review: {{ review.text }}
        </li>
      <li>
        Date reviewed: {{ review.review_date }}
      </li>
    {% endfor %}
  </ul>
{% endif %}
```
