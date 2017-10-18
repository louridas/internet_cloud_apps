% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Django 3

## Συνέχεια της εφαρμογής μας

* Μέχρι αυτή τη στιγμή η εφαρμογή μας εμφανίζει βιβλία,
  συγγραφείς, και κριτικές.

* Δεν μας δίνει όμως τη δυνατότητα να εισάγουμε νέα πληροφορία (εκτός
  και αν χρησιμοποιήσουμε την εφαρμογή admin).

* Για να δούμε πώς γίνεται αυτό, θα υλοποιήσουμε τη λειτουργία
  εισαγωγής και αλλαγής κριτικών.

# Βασικές έννοιες HTTP

## Το πρωτόκολλο HTTP

* Ο παγκόσμιος ιστός λειτουργεί με το πρωτόκολλο HTTP (Ηypertext
  Transfer Protocol).

* Το πρωτόκολλο αυτό είναι ένα πρωτόκολλο *αιτήσεων-απαντήσεων*
  (request-response).

* Ένας web browser στέλνει αιτήσεις σε έναν εξυπηρετητή (server), ο
  οποίος στέλνει τις απαντήσεις πίσω στον browser.

## Μεθόδοι αιτήσεων

* Το HTTP ορίζει *μεθόδους* (methods) οι οποίες δηλώνουν τι είδους
  ενέργεια θέλουμε να πραγματοποιηθεί σε έναν *πόρο* (resource) που
  χειρίζεται ο εξυπηρετητής.

* Οι πιο συνηθισμένοι μέθοδοι είναι:
    * GET
    * POST
    * PUT
    * DELETE
    * HEAD

## Μορφή αιτήσεων

* Μία αίτηση HTTP έχει τη μορφή:

```
GET /index.html HTTP/1.1
Host: www.example.com
```

* Η πρώτη γραμμή ξεκινάει με τη μέθοδο, ακολουθεί ένα URI που υποδυκνείει τον
  πόρο που θέλουμε και στο τέλος δίνεται η έκδοση του πρωτοκόλλου.

* Στις επόμενες γραμμές μπαίνουν διάφορες επικεφαλλίδες, όπως η
  διεύθυνση του εξυπηρετητή.

## Διαφορά URI και URL

* Θα δείτε συχνά τους όρους URL (Uniform Resource Locator) και URI
  (Uniform Resource Identifier).

* Η διαφορά μεταξύ των δύο είναι πολύ λεπτή, και συχνά
  χρησιμοποιούνται και οι δύο χωρίς να γίνεται διαχωρισμός.

* Πάντως ένα URL είναι ένα URI το οποίο δείχνει και τον τρόπο με τον
  οποίο μπορούμε να έχουμε πρόσβαση σε έναν συγκεκριμένο πόρο.

* Το `www.example.com/index.html` είναι URI, αλλά όχι URL.

* Το `http://www.example.com/index.html` είναι και URL και URI.

## Μορφή απαντήσεων

* Μια απάντηση HTTP έχει τη μορφή:

```
HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Encoding: UTF-8
Content-Length: 138
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html>
<head>
  <title>An Example Page</title>
</head>
<body>
  Hello World, this is a very simple HTML document.
</body>
</html>
```

## Η μέθοδος GET

* Η μέθοδος GET ζητά να επιστραφεί μια αναπαράσταση ενός πόρου.

* Οι αιτήσεις GET θα πρέπει μόνο να *ανακτούν* δεδομένα, και σε καμμία
  περίπτωση δεν θα πρέπει να τα αλλάζουν.

## Η μέθοδος POST

* Η μέθοδος POST στέλνει μια αίτηση, ώστε τα περιεχόμενά της να πρέπει
  να αποθηκευτούν ως μέρος του πόρου που δείχνει το URI της αίτησης.

* Τυπική χρήση της μεθόδου POST είναι η υποβολή μιας φόρμας ή η
  προσθήκη μιας εγγραφής σε μία βάση δεδομένων.

## Η μέθοδος PUT

* Η μέθοδος PUT στέλνει μια αίτηση, ώστε τα περιεχόμενά της να
  αποθηκευτούν στο URI της αίτησης.

* Αν το URI υπάρχει ήδη, τότε τα παλιά περιεχόμενα θα αντικασταθούν
  από τα νέα.

* Αν το URΙ δεν υπάρχει, θα δημιουργηθεί μια νέα οντότητα με τα
  περιεχόμενα της αίτησης.

## H μέθοδος DELETE

* Η μέθοδος DELETE διαγράφει τον πόρο που υποδεικνύεται από το URI.

## Η μέθοδος HEAD

* Η μέθοδος HEAD στέλνει μια αίτηση, όπως η GET, αλλά θα λάβει μόνο
  τις επικεφαλίδες της απάντησης, και όχι και το σώμα.

# Φόρμες

## Γενικά

* Μία φόρμα ζητάει από το χρήστη να εισάγει κάποια δεδομένα.

* Πιθανόν να περιέχει ήδη κάποια δεδομένα, αν αφορά ήδη υπάρχοντα πόρο
  τον οποίο θέλουμε να διορθώσουμε.

* Η φόρμα συνήθως παίρνει τα δεδομένα που εισάγει ο χρήστης και τα υποβάλει με
  μία μέθοδο POST.

## Φόρμα επεξεργασίας κριτικής

* Με τη φόρμα αυτή θα μπορεί ο χρήστης να εισάγει μια νέα κριτική
  βιβλίου.

* Με τη φόρμα αυτή θα μπορεί επίσης ο χρήστης να κάνει αλλαγές σε μία
  υπάρχουσα κριτική βιβλίου.

* Θα υλοποιήσουμε και τις δύο λειτουργίες με τον ίδιο κώδικα και
  πρότυπο.

## Προσαρμογή URLs

* Αλλάζουμε το αρχείο `djbr/urls.py` ώστε να είναι ως εξής:

```python
from django.conf.urls import url

from . import views

app_name = 'djbr'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^book/(?P<book_id>[0-9]+)/$', views.book, name='book'),
    url(r'^book/(?P<book_id>[0-9]+)/reviews/$', views.reviews, name='reviews'),
    url(r'^book/(?P<book_id>[0-9]+)/review/(?P<review_id>[0-9]+)$',
        views.review, name='review'),
    url(r'^book/(?P<book_id>[0-9]+)/review/$', views.review, name='review'),
    url(r'^author/(?P<author_id>[0-9]+)/$', views.author, name='author'),
]
```

<div class="notes">

* Προσοχή στη σειρά των URLs.

* Τα URLs εφαρμόζονται με τη σειρά, μέχρι να βρεθεί κάποιο που να
  ταιριάζει.

* To 5o URL είναι πιο γενικό από το 4o URL. Συνεπώς, αν ήταν σε
  αντίστροφη σειρά δεν θα εφαρμοζόταν ποτέ.

* Πράγματι, τα URLs του τύπου `book/1/review` είναι γενικότερα από τα
  URLs του τύπου `book/1/review/2`.

* To 4o URL παίρνει δύο παραμέτρους, τον κωδικό του βιβλίου και τον
  κωδικό της κριτικής: αφορά τη λειτουργία που θέλουμε να εκτελεστεί
  για *αλλαγή* υπάρχουσας κριτικής.

* To 5o URL παίρνει μόνο μία παράμετρο, τον κωδικό του βιβλίου: αφορά
  τη λειτουργία που θέλουμε να εκτελεστεί για προσθήκη νέας κριτικής.

</div>

## Φόρμα κριτικής

* Τη φόρμα της κριτικής θα την αποθηκεύσουμε στο αρχείο
  `djbr/templates/djbr/review.html`. 

```html
{% extends "djbr/base.html" %}

{% block content %}
{% if review_id %}
<form action="{% url 'djbr:review' book_id review_id %}"  method="post">
{% else %}
<form action="{% url 'djbr:review' book_id %}"  method="post">
{% endif %}
  {% csrf_token %}
    <div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="title"
           class="form-control" placeholder="Title" value="{{ title }}"/>
  </div>
  <div class="form-group">
    <label for="text">Content</label>
    <textarea id="text" name="text"
              class="form-control" placeholder="content" rows="10">{{ text }}
    </textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>  
{% endblock %}
```

<div class="notes">

* Το στοιχείο `<form>` είναι διαφορετικό, αναλόγως με το αν στο
  πρότυπο έχουμε περάσει τον κωδικό μιας κριτικής (`review_id`), ή
  όχι.

* Αν έχουμε περάσει τον κωδικό μιας κριτικής, η φόρμα αφορά αλλαγή
  υπάρχουσας κριτικής. Αν όχι, αφορά την προσθήκη νέας.

* Και στις δύο περιπτώσεις θα εκτελεστεί η μέθοδος POST. Πλην όμως,
  στην πρώτη περίπτωση το URI θα είναι της μορφής
  `djbr/book/1/review/2`, ενώ στη δεύτερη περίπτωση θα είναι της
  μορφής `djbr/book/1/review`.

</div>

## CSRF

* H CSRF (Cross-Site Request Forgery) είναι μια πολύ συνηθισμένη
  επίθεση στο διαδίκτυο.

* Η βασική ιδέα είναι να παρασύρουμε το χρήστη (μέσω τεχνικών social
  engineering) να επισκεφτεί άθελά του ένα σύνδεσμο.

* Ο σύνδεσμος αυτός είναι ένας υπαρκτός σύνδεσμος σε μία υπηρεσία που
  χρησιμοποιεί ο χρήστης, και το αποτέλεσμά του το χρησιμοποιεί προς
  ώφελός του ο επιτιθέμενος.

* Για παράδειγμα, ο σύνδεσμος μπορεί να ζητά τη μεταφορά ποσού, την
  αλλαγή κωδικού, τη διαγραφή στοιχείων, κ.λπ.

## Πώς δουλεύει

* Ο χρήστης λαμβάνει μια πρόσκληση με ένα σύνδεσμο (μπορεί να είναι
  κρυφός, π.χ. πίσω από μία εικόνα).

* Ακολουθώντας το σύνδεσμο, θα εκτελεστεί η πράξη που αντιστοιχεί σε
  αυτόν, χωρίς ο χρήστης να το γνωρίζει.

* Αυτό μπορεί να γίνει ακόμα και σε υπηρεσίες που ζητούν την
  ταυτοποίηση του χρήστη, αν ο χρήστης έχει κάνει ταυτοποίηση και δεν
  έχει πραγματοποιήσει έξοδο από την υπηρεσία.

## Django και CSRF

* Βάζουμε το `{% csrf_token %}` σε κάθε φόρμα που φτιάχνουμε.

* Αυτό σημαίνει ότι σε κάθε φόρμα θα εμπεριέχεται ένα τυχαίο token, το
  οποίο παράγεται δυναμικά όταν ο χρήστης ζητά τη φόρμα.

* Όταν ο χρήστης υποβάλλει τη φόρμα, το Django ελέγχει αν υπάρχει
  token το οποίο έχει δημιουργήσει προηγουμένως. Αν όχι, τότε
  απορρίπτει την υποβολή.

## Χειρισμός φόρμας

* Για το χειρισμό της φόρμας, προσθέτουμε τα παρακάτω στο αρχείο
  `djbr/views.py`:


    ```python

    from django.urls import reverse
    from django.utils import timezone
    from django.http.response import HttpResponseRedirect
    

    def review(request, book_id, review_id=None):
        if review_id is not None:
            review = get_object_or_404(Review, pk=review_id)
        else:
            review = Review()
            review.book_id = book_id
        if request.method == 'POST':
            review.title = request.POST['title']
            review.text = request.POST['text']
            review.review_date = timezone.now()
            review.save()
            return HttpResponseRedirect(reverse('djbr:reviews', args=(book_id,)))
        else:
            context = {
            'book_id': book_id,
            'review_id': review_id,
            'title': review.title,
            'text': review.text
        }
        return render(request, 'djbr/review.html', context)
    ```

## Σύνδεσμος για προσθήκη κριτικής

* Αυτή τη στιγμή ο χρήστης δεν μπορεί να προσθέσει κριτική, εκτός και
  αν μαντέψει το URL που θα πρέπει να χρησιμοποιήσει (της μορφής
  `www.example.com/djbr/book/1/review`). 
  
  * Αυτό βεβαίως δεν είναι πρακτικό.
  
  * Θα πρέπει να βάλουμε σύνδεσμο για την προσθήκη νέας κριτικής από
    τη σελίδα ενός βιβλίου.

## Νέα σελίδα βιβλίου

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
  <li class="list-group-item">
    <span>Reviews:
    <a href="{% url 'djbr:reviews' book.id %}">
      <span class="badge badge-secondary">{{ book.review_set.all.count }}</span>
    </a>
    <a href="{% url 'djbr:review' book.id %}">
      write review
    </a>
    </span>
  </li>
</ul>
{% endblock %}
```

<div class="notes">

Όπως βλέπουμε, προσθέσαμε το σύνδεσμο γράφοντας:

```html
<a href="{% url 'djbr:review' book.id %}">
  write review
</a>
```

Αυτό θα δημιουργήσει το σύνδεσμο με όνομα `review`. Θυμηθείτε ότι τη
μορφή του συνδέσμου αυτού την έχουμε ορίσει στο αρχείο `djbr/urls.py`,
δίνοντάς του το συγκεκριμένο όνομα `review`:

```python
url(r'^book/(?P<book_id>[0-9]+)/review/$', views.review, name='review')
```

</div>

## Γραφική απεικόνιση του συνδέσμου

* Ο σύνδεσμος που φτιάξαμε έχει το κείμενο "write review".

* Θα ήταν κομψότερο αν αντί γι΄ αυτό είχαμε ένα κατάλληλο εικονίδιο.

* Θα χρησιμοποιήσουμε το εικονίδιο "μολύβι" (pencil) από το σύνολο εικονιδίων
  [Font Awesome](http://fontawesome.io/icons/).


## Στατικοί πόροι

* Πόροι όπως εικονίδια, γραμματοσειρές, βίντεο, ήχοι, κ.λπ.,
  ονομάζονται *στατικοί πόροι* (static resources) γιατί δεν αλλάζουν
  αναλόγως με τις επιλογές του χρήστη.
  
* Αυτοί οι πόροι αποθηκεύονται σε συγκεκριμένο σημείο στην ιεραρχία
  καταλόγων του εξυπηρετητή.
  
* Στην περίπτωσή μας θα χρησιμοποιήσουμε ως πόρους μια γραμματοσειρά
  και ένα αρχείο στυλ, που υλοποιούν το σύνολο εικονιδίων που θέλουμε.
 

## Αποθήκευση στατικών πόρων στην ανάπτυξη

* Στη φάση της ανάπτυξης της εφαρμογής μας τοποθετούμε τους στατικούς
  πόρους σε έναν υποκατάλογο `static/djbr`.
  
* Στην περίπτωσή μας λοιπόν θα φτιάξουμε τους καταλόγους
  `static/djbr/css` και `static/djbr/fonts`, άρα η συνολική δομή θα
  είναι: 

    ```
    project_site
    ├── djbr
    │   ├── migrations
    │   ├── static
    │   │   └── djbr
    │   │       ├── css
    │   │       └── fonts
    │   └── templates
    │       └── djbr
    └── project_site
    ```

<div class="notes">

* Αν είχαμε εικόνες, θα είχαμε προσθέσει έναν κατάλογο
  `static/djbr/images`.
  
* Αν είχαμε βίντεο, θα είχαμε προσθέσει έναν κατάλογο
  `static/dbjr/videos`.
  
* Κ.ο.κ. Τα ονόματα είναι ενδεικτικά· θα μπορούσαμε να επιλέξουμε άλλα.

</div>


## Αντιγραφή των στατικών πόρων

* Κατεβάζουμε τη συλλογή των εικονιδίων [Font
  Awesome](http://fontawesome.io/get-started/#modal-download).
  
* Αφού το αποσυμπιέσουμε, αντιγράφουμε:
    * το αρχείο `font-awesome.min.css` στον υποκατάλογο
      `static/djbr/css`
    * τα αρχεία του υποκαταλόγου `fonts` του Font Awesome στον
      υποκατάλογο `static/djbr/fonts`
    
## Προσαρμογή του αρχείου `base.html`

* Στο τμήμα `<head> ... </head>` προσθέτουμε στην αρχή τη γραμμή:

```html
{% load static %}
```

* Στη συνέχεια προσθέτουμε το παρακάτω:

```html
<!-- Font Awesome -->
<link rel="stylesheet"
      href="{% static "/djbr/css/font-awesome.min.css" %}"/>
```

<div class="notes">

Το `{% load static %}` δίνει τη δυνατότητα στο Django να κατασκευάζει
σωστά τα URLs τα οποία θα αντιστοιχούν στους στατικούς πόρους. Έτσι,
στη συνέχεια το 
`href="{% static "/djbr/css/font-awesome.min.css" %}"` 
θα κατασκευάσει σωστά το URL που θα αντιστοιχεί στο
`font-awesome.min.cs`, όπου κι αν βρίσκεται αυτό μέσα στην
ιεραρχία των καταλόγων του υπολογιστή.

</div>

## Αρχείο `base.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>

    {% load static %}
    
    <!-- Required meta tags for Bootstrap -->
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1,
          shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
          integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
          crossorigin="anonymous"/>

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="{% static "/djbr/css/font-awesome.min.css" %}"/>
      
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
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
                    integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
                    crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
            integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
            crossorigin="anonymous"></script>
  </body>
</html>
```
    
## Χρήση εικονιδίου

* Τώρα μπορούμε να χρησιμοποιήσουμε το εικονίδιο που θέλουμε ως
  σύνδεσμο για την εισαγωγή κριτικής ενός βιβλίου.
  
* Στο αρχείο `book.html` αλλάζουμε το:
    ```html
    <a href="{% url 'djbr:review' book.id %}">
      write review
    </a>
    ```
    σε
    ```html
    <a href="{% url 'djbr:review' book.id %}">
      <span class="fa fa-pencil" aria-hidden="true"></span>
    </a>
    ```

<div class="notes">

## Αν κάτι πάει στραβά

* Προσοχή. Αν δούμε ότι το εικονίδιο δεν εμφανίζεται, ενώ ταυτόχρονα στο
  τερματικό του Django εμφανίζεται ένα μήνυμα όπως:
    ```
    GET /static/djbr/css/font-awesome.min.css HTTP/1.1" 404 110
    ```
  τότε προφανώς κάτι δεν έχει πάει καλά.
  
* Εξασφαλίζουμε ότι η δομή των καταλόγων είναι σωστή και έχουν
  πραγματικά αντιγραφεί τα αρχεία όπως περιγράψαμε.
  
* Εξασφαλίζουμε επίσης ότι το Django δεν βρίσκεται σε κατάσταση
  εκσφαλμάτωσης (debug mode), δηλαδή δεν υπάρχει `DEBUG = True` στις
  ρυθμίσεις μας.
  
## Στατικοί πόροι στην παραγωγή

* Όταν βγάλουμε την εφαρμογή μας στην παραγωγή δεν θα χρησιμοποιούμε
  μόνο του το Django.
  
* Το Django θα βρίσκεται πίσω από έναν άλλο web server, όπως ο
  [Apache](https://httpd.apache.org/) ή ο
  [nginx](https://nginx.org/en/) (o NGINX[https://www.nginx.com/]
  είναι η εμπορική έκδοση), ο οποίος θα λειτουργεί ως [reverse
  proxy](https://en.wikipedia.org/wiki/Reverse_proxy).
  
* O reverse proxy θα είναι υπεύθυνος, ανάμεσα στα άλλα, για τη διάθεση
  των στατικών πόρων.
  
* Τους συλλέγουμε από το Django με την εντολή:
    ```bash
    python manage.py collectstatic
    ```
    και στη συνέχεια τους αντιγράφουμε στον κατάλληλο κατάλογο του web
    server που έχουμε επιλέξει.
    
* Η διαδικασία αυτή μπορεί να αυτοματοποιηθεί. Για περισσότερες
  λεπτομέρειες, βλ.
  [εδώ](https://docs.djangoproject.com/en/1.11/howto/static-files/)
  και
  [εδώ](https://docs.djangoproject.com/en/1.11/howto/static-files/deployment/).
    
