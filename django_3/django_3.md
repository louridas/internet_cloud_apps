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

* Η πρώτη γραμμή ξεκινάει με τη μέθοδο, ακολουθεί ένα URI που υποδεικνύει τον
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
from django.urls import path

from . import views

app_name = 'djbr'

urlpatterns = [
    path('', views.index, name='index'),
    path('books/<int:book_id>/', views.book, name='book'),
    path('books/<int:book_id>/reviews/', views.reviews, name='reviews'),
    path('books/<int:book_id>/reviews/<int:review_id>',
        views.review, name='review'),
    path('authors/<int:author_id>/', views.author, name='author'),
]
```

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
  όφελός του ο επιτιθέμενος.

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

## Παράδειγμα CSRF

* Για να το καταλάβουμε καλύτερα, ας δούμε [το ακόλουθο
  παράδειγμα](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)).

* Έστω ότι η Alice θέλει να μεταφέρει στον Bob €100 χρησιμοποιώντας
  τις ηλεκτρονικές υπηρεσίες `bank.com`.
  
* Ο Mallory θέλει να κοροϊδέψει την Alice ώστε να λάβει αυτός τα χρήματα.

## Παράδειγμα CSRF GET (1)

* Έστω ότι η μεταφορά χρημάτων γίνεται με την παρακάτω αίτηση HTTP
  GET:
  
   ```
   GET http://bank.com/transfer.do?acct=BOB&amount=100 HTTP/1.1
   ```
   
* Ο Mallory θα δημιουργήσει ένα URL της μορφής:

   ```
   http://bank.com/transfer.do?acct=MALLORY&amount=100
   ```
   
## Παράδειγμα CSRF GET (2)

* Ο Mallory, μέσω *κοινωνικής μηχανικής* (social engineering), θα
  εξαπατήσει την Alice να ακολουθήσει το σύνδεσμο.
  
* Για παράδειγμα, μπορεί να στείλει ένα e-mail το οποίο να περιέχει το
  σύνδεσμο:
  
   ```html
   <a href="http://bank.com/transfer.do?acct=MALLORY&amount=100">View my Pictures!</a>
  ```
  
## Παράδειγμα CSRF GET (3)

* Ή να βάλει το σύνδεσμο σε μία εικόνα με μηδενικές διαστάσεις:
   
   ```html
   <img src="http://bank.com/transfer.do?acct=MALLORY&amount=100" width="0" height="0" border="0">
   ```
  Η Alice δεν θα δει τίποτε στο e-mail, αλλά θα επισκεφτεί άθελά της
  το σύνδεσμο!

* Σε κάθε περίπτωση, αν η Alice ακολουθήσει το σύνδεσμο ενόσω έχει
  μπει στο `bank.com`, θα εκτελεστεί η μεταφορά.
  
* Η μέθοδος αυτή είχε χρησιμοποιηθεί το 2008 στο
  [uTorrent](https://www.utorrent.com/), βλ.
  [CVE-2008-6586](https://nvd.nist.gov/vuln/detail/CVE-2008-6586).


## Παράδειγμα CSRF POST (1)

* Στην περίπτωση που έχουμε HTTP POST, η πληροφορία για την επίθεση
  δεν εμπεριέχεται μέσα στο URL.
  
* Σύμφωνα με τους κανόνες του POST, περιέχεται στο σώμα της αίτησης:

   ```
   POST http://bank.com/transfer.do HTTP/1.1

   acct=BOB&amount=100
   ```
   
## Παράδειγμα CSRF POST (2)

* Για να το καταφέρει αυτό ο Mallory, θα πρέπει να φτιάξει μία φόρμα,
  όπως:
  
   ```html
   <form action="http://bank.com/transfer.do" method="POST">
   <input type="hidden" name="acct" value="MALLORY"/>
   <input type="hidden" name="amount" value="100"/>
   <input type="submit" value="View my pictures"/>
   </form>
   ```

* Για να μη χρειάζεται να πατήσει η Alice το κουμπί υποβολής της
  φόρμας, ο Mallory μπορεί να αυτοματοποιήσει την υποβολή με
  JavaScript:
  
   ```javascript
   <body onload="document.forms[0].submit()">
   ```


## Django και CSRF

* Βάζουμε το `{% csrf_token %}` σε κάθε φόρμα που φτιάχνουμε.

* Αυτό σημαίνει ότι σε κάθε φόρμα θα εμπεριέχεται ένα τυχαίο token, το
  οποίο παράγεται δυναμικά όταν ο χρήστης ζητά τη φόρμα,
  χρησιμοποιώντας αλάτι και μία μυστική τιμή.

* Επίσης στον browser του χρήστη στέλνεται και ένα cookie το οποίο
  περιέχει πάλι το μυστικό, κρυπτογραφημένο με αλάτι.

* Όταν ο χρήστης υποβάλλει τη φόρμα, υποβάλλεται μαζί το token της
  φόρμας. Το Django ελέγχει αν το μυστικό του έχει την ίδια τιμή με
  αυτό του cookie. Αν όχι, τότε απορρίπτει την υποβολή.


<div class="notes">

Η τιμή του cookie δεν αλλάζει όσο διαρκεί το session του χρήστη. Η
τιμή του token στη φόρμα αλλάζει κάθε φορά που εμφανίζεται η φόρμα,
ώστε να είναι διαφορετικό σε κάθε υποβολή, χρησιμοποιώντας διαφορετικό
αλάτι. Αλλά το μυστικό που περιέχεται στο token είναι το ίδιο με το
μυστικό που περιέχεται στο cookie.

</div>

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
            return HttpResponseRedirect(reverse('djbr:reviews', 
			                                    args=(book_id,)))
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

* To `templates/dbjr/book.html` θα γίνει:

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
path('book/(<int:book_id>/review/$', views.review, name='review'),
```

</div>

# Στοιχειώδεις Αισθητικές Βελτιώσεις

## Γραφική απεικόνιση του συνδέσμου

* Ο σύνδεσμος που φτιάξαμε έχει το κείμενο «write review».

* Θα ήταν κομψότερο αν αντί γι΄ αυτό είχαμε ένα κατάλληλο εικονίδιο.

* Θα χρησιμοποιήσουμε το εικονίδιο «συν σε κύκλο» (plus-circle) από το
  σύνολο εικονιδίων [Font Awesome](http://fontawesome.com/icons/).


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
  `static/djbr/css` και `static/djbr/webfonts`, άρα η συνολική δομή θα
  είναι: 

    ```
    project_site
    ├── djbr
    │   ├── migrations
    │   ├── static
    │   │   └── djbr
    │   │       ├── css
    │   │       └── webfonts
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
  Awesome](http://fontawesome.com/get-started/#modal-download).
  
* Αφού το αποσυμπιέσουμε, αντιγράφουμε:
    * το αρχείο `/css/all.min.css` του Font Awesome στον υποκατάλογο
      `static/djbr/css` με το όνομα `fontawesome-all.min.css`
    * τα αρχεία του υποκαταλόγου `/webfonts` του Font Awesome στον
      υποκατάλογο `static/djbr/webfonts`
    
## Προσαρμογή του αρχείου `base.html`

* Στο τμήμα `<head> ... </head>` προσθέτουμε στην αρχή τη γραμμή:

   ```html
   {% load static %}
   ```

* Στη συνέχεια προσθέτουμε το παρακάτω:

    ```html
    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="{% static "/djbr/css/fontawesome-all.min.css" %}"/>
    ```

<div class="notes">

Το `{% load static %}` δίνει τη δυνατότητα στο Django να κατασκευάζει
σωστά τα URLs τα οποία θα αντιστοιχούν στους στατικούς πόρους. Έτσι,
στη συνέχεια το 
`href="{% static "/djbr/css/fontawesome-all.min.css" %}"` 
θα κατασκευάσει σωστά το URL που θα αντιστοιχεί στο
`fontawesome-all.min.css`, όπου κι αν βρίσκεται αυτό μέσα στην
ιεραρχία των καταλόγων του υπολογιστή.

</div>

## Αρχείο `base.html`

```html
<!doctype html>
<html lang="en">
  <head>

    <!-- Required meta tags for Bootstrap -->
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1,
          shrink-to-fit=no">

    {% load static %}

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="{% static "/djbr/css/fontawesome-all.min.css" %}"/>
	  	  
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
      <span class="fas fa-plus-circle" aria-hidden="true"></span>
    </a>
    ```

## Αλλαγή κριτικής

* Έχουμε δώσει τη δυνατότητα στους χρήστες να προσθέτουν νέες κριτικές
  σε ένα βιβλίο, αλλά όχι ακόμα τη δυνατότητα να αλλάζουν μια
  υπάρχουσα κριτική.
  
* Αυτό θα το κάνουμε προσθέτοντας τον κατάλληλο σύνδεσμο δίπλα στον
  τίτλο της κάθε κριτικής που εμφανίζεται στη λίστα όλων των κριτικών
  του κάθε βιβλίου.
  
* Ο σύνδεσμός μας αυτή τη φορά θα εμφανίζεται ως ένα λευκό μολυβάκι.


## Δημιουργία συνδέσμου αλλαγής κριτικής

* Για τη δημιουργία συνδέσμου θα προσθέσουμε στον σκελετό
  `djbr/templates/reviews.html` τον παρακάτω κώδικα στο κατάλληλο
  σημείο:
  
   ```html
   <a href="{% url 'djbr:review' review.book.id review.id %}">
     <span class="fa fa-inverse fa-pencil" aria-hidden="true"></span>
   </a>
   ```
   
* Η πρώτη γραμμή θα δημιουργήσει το σωστό σύνδεσμο της μορφής
  `djbr/book/<book_id>/review/<review_id>`.
  
* Η δεύτερη γραμμή θα εισάγει το λευκό μολυβάκι.

* Χρειάζονται επίσης κάποιες στυλιστικές αλλαγές, μπορείτε να δείτε το
  σύνολο των αλλαγών στη συνέχεια.
  
## Το αρχείο `reviews.html`

```html
{% extends "djbr/base.html" %}

{% block content %}
{% if not book_reviews %}
  <h2 class="bg-warning">No reviews yet.</h2>
{% else %}
  <div class="list-group">
    {% for review in book_reviews %}
      <div class="list-group-item list-group-item-action flex-column
                  align-items-start active">
        <div class="d-flex w-100 justify-content-between">
          <span class="mb=1">Summary: {{ review.title }}</span>
          <span>
            <a href="{% url 'djbr:review' review.book.id review.id %}">
              <span class="fas fa-inverse fa-edit" aria-hidden="true"></span>
            </a>
        </span>
        </div>
      </div>
      <div class="list-group-item">
        Review: {{ review.text }}
      </div>
      <div class="list-group-item">
        Date reviewed: {{ review.review_date }}
        {{ review.id }}
      </div>
    {% endfor %}
  </div>
{% endif %}
{% endblock %}
```

## Προσθήκη `djbr.css` (1)

* Με την ευκαιρία, θα δημιουργήσουμε το αρχείο `static/djbr/css/djbr.css`
  το οποίο θα χρησιμοποιήσουμε για την προσαρμογή του στυλ της
  εφαρμογής μας.
  
* Προς το παρόν θα είναι στοιχειώδες:

   ```css
   body {
	 padding-top: 40px;
	 padding-bottom: 40px;
   }
   ```
    
## Προσθήκη `djbr.css` (2)

* Για να το χρησιμοποιήσουν οι σελίδες της εφαρμογής μας, προσθέτουμε
  το παρακάτω στο τμήμα `<head> ... </head>` του σκελετού `base.html` (για
  παράδειγμα, κάτω ακριβώς από το σημείο που δηλώσαμε το
  `fontawesome-all.min.css`):
  
    ```html
    <!-- DJBR -->
    <link rel="stylesheet"
          href="{% static "/djbr/css/djbr.css" %}"/>
    ```

## Αν κάτι πάει στραβά

* Προσοχή. Αν δούμε ότι το εικονίδιο δεν εμφανίζεται, ενώ ταυτόχρονα στο
  τερματικό του Django εμφανίζεται ένα μήνυμα όπως:
  
    ```
    GET /static/djbr/css/fontawesome-all.min.css HTTP/1.1" 404 110
    ```
  τότε προφανώς κάτι δεν έχει πάει καλά.
  
* Εξασφαλίζουμε ότι η δομή των καταλόγων είναι σωστή και έχουν
  πραγματικά αντιγραφεί τα αρχεία όπως περιγράψαμε.
  
* Εξασφαλίζουμε επίσης ότι το Django δεν βρίσκεται σε κατάσταση
  εκσφαλμάτωσης (debug mode), δηλαδή δεν υπάρχει `DEBUG = False` στις
  ρυθμίσεις μας.
  
## Στατικοί πόροι στην παραγωγή

* Όταν βγάλουμε την εφαρμογή μας στην παραγωγή δεν θα χρησιμοποιούμε
  μόνο του το Django.
  
* Το Django θα βρίσκεται πίσω από έναν άλλο web server, όπως ο
  [Apache](https://httpd.apache.org/) ή ο
  [nginx](https://nginx.org/en/) (o [NGINX](https://www.nginx.com/)
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
  [εδώ](https://docs.djangoproject.com/en/2.1/howto/static-files/)
  και
  [εδώ](https://docs.djangoproject.com/en/2.1/howto/static-files/deployment/).
    


