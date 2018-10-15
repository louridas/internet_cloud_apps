% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Flask Deployment

# Εγκατάσταση

## Περιγραφή Εφαρμογής (1)

* Για να περιγράψουμε την εφαρμογή δημιουργούμε ένα αρχείο
  `flaskr_project/setup.py`:
  
    ```python
	setup(
		name='flaskr',
		version='1.0.0',
		packages=find_packages(),
		include_package_data=True,
		zip_safe=False,
		install_requires=[
			'flask',
		],
	)
	```

<div class="notes">

Για περισσότερες πληροφορίες για το πώς φτιάχνουμε πακέτα Python,
μπορεί να δείτε
[εδώ](https://packaging.python.org/tutorials/packaging-projects/). Το
παραπάνω αρχείο `setup.py` δηλώνει το όνομα της εφαρμογής, την έκδοσή
της, και ζητά να βρεθούν αυτομάτως οι κατάλογοι και τα αρχεία με
κώδικα Python (μέσω του `find_packages()`). Επειδή θέλουμε το πακέτο
μας να περιέχει και επιπλέον αρχεία, που δεν είναι Python, δίνουμε
`include_package_data=True`. Η παράμετρος `zip_safe` ορίζει κατά πόσο
το πακέτο μας θα εγκατασταθεί συμπιεσμένο, ή αποσυμπιεσμένο σε
καταλόγους· θέλουμε το δεύτερο. Τέλος, δηλώνουμε τις εξαρτήσεις, στην
περίπτωσή μας, το Flask.

</div>

## Περιγραφή Εφαρμογής (2)

* Δεδομένου ότι η εφαρμογή μας χρησιμοποιεί και αρχεία που δεν είναι
  Python, πρέπει να δημιουργήσουμε επιπλέον το αρχείο
  `flaskr/MANIFEST.in`:
  
    ```
	include flaskr/schema.sql
	graft flaskr/static
	graft flaskr/templates
	global-exclude *.pyc
    global-exclude *.*~
	```

<div class="notes">

Θέλουμε το πακέτο μας να περιλαμβάνει το αρχείο με το σχήμα της βάσης,
όλα τα περιεχόμενα κάτω από τον κατάλογο `static` και όλα τα
περιεχόμενα κάτω από τον κατάλογο `templates`, ενώ δεν θέλουμε τα
αρχεία με κατάληξη `pyc` ή `*~`.

</div>

## Eγκατάσταση της Εφαρμογής (1)

* Για να εγκαταστήσουμε την εφαρμογή μας στο ιδεατό μας περιβάλλον δίνουμε:

    ```bash
	pip3 install -e .
	```
	
* Το `-e` σημαίνει ότι το flaskr θα εγκατασταθεί σε *κατάσταση
  ενημερώσεων* ή *ανάπτυξης* (editable or development mode). Όταν
  αλλάζουμε κάτι στον κώδικά μας, δεν θα χρειάζεται να κάνουμε
  επανεγκατάσταση, παρά μόνο αν αλλάξουμε τις εξαρτήσεις.
  
## Eγκατάσταση της Εφαρμογής (2)

* Μπορούμε να ελέγξουμε ότι όλα πήγαν καλά δίνοντας:

  ```bash
   pip3 list
   ```
  
* Θα πρέπει να δούμε ότι το flaskr περιλαμβάνονται στα πακέτα που
  έχουν εγκατασταθεί στο ιδεατό περιβάλλον:

   ```
   Package      Version Location
   ------------ ------- --------------------------------------------------------------------
   Click        7.0
   Flask        1.0.2
   flaskr       1.0.0   /Users/panos/Documents/Work/aueb/courses/internet_cloud_apps/flask_1
   itsdangerous 0.24
   Jinja2       2.10
   MarkupSafe   1.0
   pip          18.1
   setuptools   39.0.1
   Werkzeug     0.14.1
   ```

## Δημιουργία Πακέτου Εγκατάστασης

* Για να δημιουργήσουμε ένα πακέτο εγκατάστασης, πρέπει κατ' αρχήν να
  εξασφαλίσουμε ότι έχουμε εγκατεστημένα τα απαραίτητα εργαλεία, με:

   ```bash
   pip3 install wheel
   ```
   
* Μετά δίνουμε:

   ```bash
   python3 setup.py bdist_wheel
   ```
   
* Το πακέτο εγκατάστασης θα δημιουργηθεί στο:

    ```
	dist/flaskr-1.0.0-py3-none-any.whl
	```

# Μεταφορά σε Εξυπηρετητή

## Εγκατάσταση σε Εξυπηρετητή (1)

* Για να εγκαταστήσουμε την εφαρμογή σε έναν εξυπηρετητή, φτιάχνουμε
  στον εξυπηρετητή έναν κατάλογο όπου θα την φιλοξενήσουμε:
  
   ```bash
    mkdir flaskr_project
	cd flaskr_project
	```

* Κατασκευάζουμε ένα ιδεατό περιβάλλον Python στον εξυπηρετητή:

   ```bash
   python3 -m venv venv
   ```

<div class="notes">

Σε περίπτωση που μας εμφανιστεί ένα μήνυμα λάθους ότι δεν υπάρχει
εγκατεστημένο το απαραίτητο πακέτο στο σύστημά μας, το εγκαθιστούμε
με:

```bash
sudo apt install python3-venv
```

</div>


## Εγκατάσταση σε Εξυπηρετητή (2)

* Αντιγράφουμε το αρχείο εγκατάστασης από τον υπολογιστή που
  χρησιμοποιούμε για την ανάπτυξη στον εξυπηρετητή:

   ```bash
   scp dist/flaskr-1.0.0-py3-none-any.whl user@snf-842276.vm.okeanos.grnet.gr:flaskr_project
   ```

* Στον *εξυπηρετητή* ενεργοποιούμε το ιδεατό περιβάλλον και
  εγκαθιστούμε την εφαρμογή σε αυτό:

   ```bash
   cd ~/flaskr_project/
   source venv/bin/activate
   pip install wheel
   pip install flaskr-1.0.0-py3-none-any.whl
   ```

<div class="notes">

Σε περίπτωση που το `pip` δεν είναι εγκατεστημένο στον εξυπηρετητή,
το εγκαθιστούμε δίνοντας:

```bash
sudo apt install python3-pip
```

</div>

## Δημιουργία Βάσης στον Εξυπηρετητή

* Δημιουργούμε τη βάση στον εξυπηρετητή δίνοντας:

   ```bash
   export FLASK_APP=flaskr
   flask init-db
   ```
   
* Η βάση θα δημιουργηθεί στον κατάλογο:

   ```
   venv/var/flaskr-instance
   ```
   
## Ρύθμιση του Εξυπηρετητή (1)

* Θυμηθείτε ότι μία από τις ρυθμίσεις αφορά τη μεταβλητή `SECRET_KEY`,
  η οποία δεν θέλουμε στην παραγωγή να διαβάζεται από το αρχείο
  `__init__.py` όπου την έχουμε ορίσει.
  
* Δημιουργούμε ένα τυχαίο κλειδί, π.χ. δίνοντας:

   ```bash
   python3 -c 'import os; import binascii; print(binascii.hexlify(os.urandom(24)))'
   ```
   
* Αυτο θα εμφανίσει κάτι όπως
  `b'e828c36ea007cf42326be6b8cb647cd43cac12a21522b14b'`
  
## Ρύθμιση του Εξυπηρετητή (2)
  
* Φτιάχνουμε το αρχείο `venv/var/flaskr-instance/config.py` και μέσα
  σε αυτό βάζουμε:
  
   ```python
   SECRET_KEY = b'e828c36ea007cf42326be6b8cb647cd43cac12a21522b14b'
   ```

* Τώρα ο εξυπηρετητής θα χρησιμοποιεί αυτό το τυχαίο κλειδί, και όχι
  αυτό που έχουμε γράψει μέσα στον κώδικα.


## Το Αρχείο `config.py`

* Το αρχείο `config.py` περιέχει ρυθμίσεις οι οποίες αντικαθιστούν τις
  αντίστοιχες ρυθμίσεις στο `__init__.py`.
  
* Αν δεν υπάρχει, ισχύουν οι ρυθμίσεις του `__init__.py`.

* Αν υπάρχει, υπερτερούν οι ρυθμίσεις του `config.py`.

* *Προσοχή: δεν το βάζουμε ποτέ σε αποθετήριο*.

* Μπορούμε να το χρησιμοποιήσουμε και στο μηχάνημα ανάπτυξης, οπότε το
  αποθηκεύουμε ως `flaskr/config.py`.


## Έλεγχος Εφαρμογής

* Για να ελέγξουμε ότι όλα πάνε καλά, ξεκινάμε την εφαρμογή μας με:

   ```
   flask run --host=0.0.0.0
   ```
   
* Η παράμετρος `--host=0.0.0.0` είναι απαραίτητη, διότι διαφορετικά η
  εφαρμογή μας δεν θα είναι προσβάσιμη από το διαδίκτυο.
  
* Μπορούμε να τη δούμε αν πλοηγηθούμε στο
  <http://snf-842276.vm.okeanos.grnet.gr:5000/> (βάζετε τη διεύθυνση
  του δικού σας server).


# Εκτέλεση με WSGI Server

## Python και WSGI

* Αυτή τη στιγμή όταν ξεκινάμε την εφαρμογή με `flask run`, ξεκινάει
  ένας εξυπηρετής ενσωματωμένος στο Flask.
  
* Στην παραγωγή δεν θέλουμε να γίνεται αυτό, γιατί ο ενσωματωμένος
  εξυπηρετητής είναι εντελώς στοιχειώδης.
  
* Θέλουμε έναν ξεχωριστό εξυπηρετητή, ο οποίος να παίρνει τις αιτήσεις
  HTTP από τον πελάτη, να τις διοχετεύει στο Flask, και να επιστρέφει
  τις απαντήσεις στον πελάτη.
  
* Για την επικοινωνία μεταξύ εξυπηρετητών και εφαρμογών Python
  χρησιμοποιούμε το [Web Server Gateway Interface
  (WSGI)](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface).


## Εξυπηρετητές WSGI

* Το πρωτόκολλο WSGI υλοποιείται μέσω *εξυπηρετητών WSGI* (WSGI
  containers).
  
* Υπάρχουν διάφοροι τέτοιοι, όπως:

  * [Gunicorn](https://gunicorn.org/)
  
  * [Waitress](https://docs.pylonsproject.org/projects/waitress/en/latest/)

  * [uWSGI](https://uwsgi-docs.readthedocs.io/en/latest/)
  
* Εμείς θα χρησιμοποιήσουμε τον Gunicorn.


## Εγκατάσταση Gunicorn

* Για να εγκαταστήσουμε τον Gunicorn στο ιδεατό μας περιβάλλον
  δίνουμε:
  
   ```bash
   pip install gunicorn
   ```
   
## Εκτέλεση Εφαρμογής

* Για να ξεκινήσουμε την εφαρμογή δίνουμε:

   ```bash
    gunicorn --bind=0.0.0.0 'flaskr:create_app()'
	```
	
* Η εφαρμογή θα είναι διαθέσιμη στο ιδεατό μηχάνημά σας στη θύρα 8000, π.χ.:

	```
	http://snf-842276.vm.okeanos.grnet.gr:8000/
	```
	
* Αν θέλουμε να ξεκινήσουμε τέσσερεις διεργασίες εξυπηρέτησης πελατών
  (worker processes), θα δώσουμε:
  
   ```bash
   gunicorn -w 4 --bind=0.0.0.0 'flaskr:create_app()'
   ```

<div class="notes">

Με το παραπάνω θα ξεκινήσουν στην πραγματικότητα πέντε διεργασίες του
Gunicorn. Η μία θα είναι η διεργασία master, η οποία δεν εξυπηρετεί
πελάτες, αλλά είναι αρμόδια για τη διαχείριση των workers.

Οι workers που ξεκινούν δεν είναι πολυνηματικοί (δεν είναι
multi-threaded, είναι single threaded). Αυτό σημαίνει ότι η
εξυπηρέτηση των αιτήσεων δεν θα πρέπει να απαιτούν απεριόριστο χρόνο,
γιατί τότε θα «μπλοκάρουν» όλοι οι workers. 

Στην περίπτωση που οι αιτήσεις μπορεί να χρειάζονται πολύ χρόνο να
εκτελεστούν, θα πρέπει να χρησιμοποιήσουμε πολυνηματικούς workers (βλ.
τη [σχετική
τεκμηρίωση](http://docs.gunicorn.org/en/stable/design.html)). Λόγοι
για τους οποίους μπορεί να χρειαστούμε πολυνηματικούς workers:

* Η εφαρμογή μας κάνει κλήσεις σε άλλες εξωτερικές εφαρμογές (π.χ. web
  services), οι οποίες μπορεί να θέλουν πολύ χρόνο για να επιστρέψουν.
  
* Streaming

* Web sockets

Γενικότερα πάντως, η παραλληλία σε επίπεδο διεργασιών, αντί για
νημάτων, είναι πιο σταθερή, καθώς αν παρουσιαστεί πρόβλημα στην
εξυπηρέτηση μιας αίτησης δεν θα επηρεαστούν άλλες αιτήσεις που μπορεί
να εκτελούνται ταυτόχρονα.

</div>

## Διαχείριση Υπηρεσιών στο Linux

* Στο Linux (και στο Unix γενικότερα), διεργασίες που τρέχουν στο
  παρασκήνιο ονομάζονται *δαίμονες* (daemons).
  
* Τέτοιοι δαίμονες υλοποιούν πλήθος υπηρεσιών. 

* Πολλές από αυτές είναι αόρατες στο χρήστη, ενώ κάποιες άλλες όχι.

* Εμείς θέλουμε ο Gunicorn να τρέχει στο παρασκήνιο και να τον παρέχει
  το λειτουργικό σύστημα ως υπηρεσία.
  
* Η διαχείριση υπηρεσιών σε σύγχρονες διανομές Linux γίνεται μέσω του
  systemd 
  
* Για περισσότερες πληροφορίες βλ. για παράδειγμα
  [εδώ](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units).

## Δημιουργία Αρχείου Υπηρεσίας Gunicorn

* Θα δημιουργήσουμε το αρχείο `/etc/systemd/system/flaskr.service`
  με τα εξής περιεχόμενα, προσαρμοσμένα στο σύστημά σας:
  ```
  [Unit]
  Description=gunicorn flaskr daemon
  After=network.target

  [Service]
  User=user
  Group=www-data
  WorkingDirectory=/home/user/flaskr_project
  Environment="PATH=/home/user/flaskr_project/venv/bin"
  ExecStart=/home/user/flaskr_project/venv/bin/gunicorn --workers 4 --bind unix:flaskr.sock -m 007 flaskr:create_app()

  [Install]
  WantedBy=multi-user.target
  ```
    
* Όταν λέμε «προσαρμοσμένα στο σύστημά μας» εννοούμε ότι στο παραπάνω
  αρχείο θα βάλετε τα στοιχεία των δικών σας καταλόγων.

<div class="notes">

Στο παραπάνω αρχείο:

* Ό,τι ακολουθεί τo `ExecStart` είναι μία γραμμή (ασχέτως αν στην
  οθόνη μπορεί να εμφανίζεται κομμένη).

* Αυτή τη φορά δεν δίνουμε `--bind=0.0.0.0` αλλά `--bind
  unix:flaskr.sock`. Αυτό σημαίνει ότι ο Gunicorn θα περιμένει τις
  αιτήσεις από ένα socket στον κατάλογο της εφαρμογής, αντί να
  περιμένει τις αιτήσεις από το διαδίκτυο. Θα δούμε στη συνέχεια γιατί
  το κάνουμε αυτό. Προς το παρόν, δεδομένου ότι δεν περιμένει αιτήσεις
  από το διαδίκτυο, η εφαρμογή μας δεν είναι προσπελάσιμη.

* Τι είναι ένα socket; Είναι ένας μηχανισμός επικοινωνίας μεταξύ
  διεργασιών στο λειτουργικό σύστημα. Με ένα socket μπορεί μία
  διεργασία να στείλει και να λάβει δεδομένα από μία άλλη. Τα socket
  ονομάζονται σαν αρχεία στο λειτουργικό σύστημα. Συνεπώς έχουμε
  στήσει τον Gunicorn ώστε να μην επικοινωνεί με το διαδίκτυο, αλλά να
  μπορεί να επικοινωνεί με άλλες διεργασίες μέσα στο λειτουργικό, μέσω
  του socket `flaskr.sock`. 

* Η γραμμή `After=network.target` σημαίνει ότι η υπηρεσία θα πρέπει να
  ενεργοποιηθεί αφού έχει ενεργοποιηθεί το δίκτυο.
  
* Η γραμμή `WantedBy=multi-user.target` σημαίνει ότι η υπηρεσία θα
  πρέπει να ενεργοποιηθεί πριν το σύστημα μπει σε λειτουργία πολλαπλών
  χρηστών. Όταν ένα λειτουργικό σύστημα Linux / Unix ξεκινάει, αρχικά
  βρίσκεται σε λειτουργία ενός χρήστη (single user mode). Αφού
  αρχικοποιηθούν διάφορες υπηρεσίες μπαίνει σε πολυχρηστική λειτουργία
  (multi-user mode).

</div>

## Ενεργοποίηση Gunicorn (1)

* Για να ενεργοποιήσουμε τον Gunicorn δίνουμε:
  ```bash
  sudo systemctl start flaskr
  ```
    
## Ενεργοποίηση Gunicorn (2)

* Για να ελέγξουμε ότι όλα πάνε καλά, μπορούμε να δώσουμε:
  ```bash
  sudo systemctl status flaskr
  ```
    
* Θα πρέπει να δούμε κάτι της μορφής:
  ```bash
	● flaskr.service
	   Loaded: loaded (/etc/systemd/system/flaskr.service; bad; vendor preset: enabled)
	   Active: active (running) since Fri 2018-10-12 13:48:29 EEST; 9s ago
	 Main PID: 5953 (gunicorn)
		Tasks: 5
	   Memory: 69.5M
		  CPU: 1.449s
	   CGroup: /system.slice/flaskr.service
			   ├─5953 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_project/venv/bin/guni
			   ├─5958 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_project/venv/bin/guni
			   ├─5959 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_project/venv/bin/guni
			   ├─5960 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_project/venv/bin/guni
			   └─5961 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_project/venv/bin/guni

	Oct 12 13:48:29 snf-843604 systemd[1]: Started flaskr.service.
	Oct 12 13:48:30 snf-842276 gunicorn[5953]: [2018-10-12 13:48:30 +0300] [5953] [INFO] Starting gunico
	Oct 12 13:48:30 snf-842276 gunicorn[5953]: [2018-10-12 13:48:30 +0300] [5953] [INFO] Listening at: u
	Oct 12 13:48:30 snf-842276 gunicorn[5953]: [2018-10-12 13:48:30 +0300] [5953] [INFO] Using worker: s
	Oct 12 13:48:30 snf-842276 gunicorn[5953]: [2018-10-12 13:48:30 +0300] [5958] [INFO] Booting worker
	Oct 12 13:48:30 snf-842276 gunicorn[5953]: [2018-10-12 13:48:30 +0300] [5959] [INFO] Booting worker
	Oct 12 13:48:30 snf-842276 gunicorn[5953]: [2018-10-12 13:48:30 +0300] [5960] [INFO] Booting worker
	Oct 12 13:48:30 snf-842276 gunicorn[5953]: [2018-10-12 13:48:30 +0300] [5961] [INFO] Booting worker
  ```

## Ενεργοποίηση flaskr στην Εκκίνηση

* Για να ξεκινάει αυτομάτως το flaskr με την εκκίνηση του μηχανήματος,
  δίνουμε:
  
   ```bash
   sudo systemctl enable flaskr
   ```

* Αν θέλουμε να μην ξεκινάει αυτομάτως το flaskr όταν ξεκινάει το
  μηχάνημα, δίνουμε:
  ```bash
  sudo systemctl disable flaskr
    ```

# nginx

## nginx

* Παρ' ότι ο Gunicorn είναι ένας αξιοπρεπής εξυπηρετητής WSGI, δεν
  είναι η καλύτερη λύση ως εξυπηρετητής HTTP.
  
* Ως εκ τούτου, θα χρησιμοποιήσουμε τον
  [nginx](https://www.nginx.com/), τον έναν από τους δύο καλύτερους
  εξυπηρετητές HTTP. 
  
* Ο έταιρος καλύτερος είναι φυσικά ο [Apache](https://httpd.apache.org/).

## Εγκατάσταση nginx

* Για να εγκαταστήσουμε τον nginx στο σύστημά μας, δίνουμε:

   ```bash
   sudo apt update
   sudo apt install nginx
   ```

## Τοίχος Προστασίας

* Από τη στιγμή που θέλουμε να ανοίξουμε την εφαρμογή μας στο
  διαδίκτυο, θα πρέπει να ασφαλίσουμε το σύστημά μας όσο καλύτερα
  γίνεται.
  
* Θα χρησιμοποιήσουμε λοιπόν ένα *τοίχος προστασίας* (firewall).

## Ενεργοποίηση Τοίχους Προστασίας

* Ο πιο εύκολος τρόπος να χειριστούμε το τοίχος προστασίας στη διανομή
  Ubuntu είναι μέσω του εργαλείου [UFW (Uncomplicated
  Firewall)](https://help.ubuntu.com/community/UFW).

* Εναλλακτικά, για τους πιο έμπειρους, υπάρχει το
  [Iptables](https://help.ubuntu.com/community/IptablesHowTo),
  αλλά δεν θα μας χρειαστεί εδώ.

## Ρύθμιση τοίχους προστασίας (1)

* Για να δούμε ποιες εφαρμογές γνωρίζει το `ufw`, δίνουμε:
  ```bash
  sudo ufw app list
  ```
    
* Τότε θα πρέπει να δούμε:
  ```
  Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
  ```
	
* Όπως βλέπουμε, υπάρχουν τα εξής προφίλ:
    * Nginx Full: επιτρέπει την πρόσβαση από τη θύρα 80 (μη
      κρυπτογραφημένη κίνηση διαδικτύου) και από τη θύρα 443 (κίνηση
      κρυπτογραφημένη με TLS/SSL).
    * Nginx HTTP: επιτρέπει μόνο την πρόσβαση από τη θύρα 80.
    * Nginx HTTPS: επιτρέπει μόνο την πρόσβαση από τη θύρα 443.
    * OpenSSH: επιτρέπει την πρόσβαση μέσω ssh (απομακρυσμένη πρόσβαση).
  
## Ρύθμιση Τοίχους Προστασίας (2)

* Για να συνεχίσουμε να έχουμε απομακρυσμένη πρόσβαση, δίνουμε:
  ```bash
  sudo ufw allow OpenSSH
  ```
    
* Στη συνέχεια, για να επιτρέψουμε την πρόσβαση από τη θύρα 80,
  δίνουμε:
  ```bash
  sudo ufw allow 'Nginx HTTP'
  ```

## Ενεργοποίηση Τοίχους Προστασίας

* Για να ενεργοποιήσουμε το τοίχος προστασίας στη διανομή Ubuntu
  δίνουμε:
  ```bash
  sudo ufw enable
  ```

* Για να δούμε την κατάσταση του τοίχους προστασίας δίνουμε:
  ```bash
  sudo ufw status verbose
  ```

* Ή αν θέλουμε λιγότερες πληροφορίες:
  ```bash
  sudo ufw status
  ```


## Έλεγχος Τοίχους Προστασίας

* Τώρα αν δώσουμε:
  ```bash
  sudo ufw status
  ```
    
* Θα δούμε:
  ```
  To                         Action      From
  --                         ------      ----
  Nginx HTTP                 ALLOW       Anywhere
  OpenSSH                    ALLOW       Anywhere
  Nginx HTTP (v6)            ALLOW       Anywhere (v6)
  OpenSSH (v6)               ALLOW       Anywhere (v6)
  ```
    
## Έλεγχος Λειτουργίας nginx

* Για να ελέγξουμε ότι ο nginx δουλεύει, δίνουμε:
  ```bash
  systemctl status nginx
  ```
    
* Τότε θα πρέπει να δούμε κάτι όπως το παρακάτω:
  ```
  ● nginx.service - A high performance web server and a reverse proxy server
	 Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
	 Active: active (running) since Fri 2018-10-12 13:54:42 EEST; 7s ago
	Process: 6797 ExecStop=/sbin/start-stop-daemon --quiet --stop --retry QUIT/5 --pidfile /run/nginx.
	Process: 6785 ExecReload=/usr/sbin/nginx -g daemon on; master_process on; -s reload (code=exited,
	Process: 6808 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SU
	Process: 6804 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, st
   Main PID: 6810 (nginx)
	  Tasks: 3
	 Memory: 2.2M
		CPU: 78ms
	 CGroup: /system.slice/nginx.service
			 ├─6810 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
			 ├─6811 nginx: worker process
			 └─6812 nginx: worker process
  ```

## Χειρισμός nginx (1)

* Για να σταματήσουμε τον nginx δίνουμε:
  ```bash
  sudo systemctl stop nginx
    ```
    
* Για να ξεκινήσουμε τον nginx δίνουμε:
  ```bash
  sudo systemctl start nginx
  ```
    
* Για να σταματήσουμε και να ξεκινήσουμε τον nginx δίνουμε:
  ```bash
  sudo systemctl restart nginx
  ```
  
## Χειρισμός nginx (2) 
	
* Αν αλλάξουμε τις ρυθμίσεις του nginx και θέλουμε να τις εφαρμόσουμε
  χωρίς να διακόψουμε τις υπάρχουσες συνδέσεις, δίνουμε:
  ```bash
  sudo systemctl reload nginx
  ```
  
* Αν θέλουμε να ξεκινάει αυτομάτως ο nginx όταν ξεκινάει ο
  υπολογιστής, δίνουμε:
  ```bash
  sudo systemctl enable nginx
  ```

* Αν θέλουμε να μην ξεκινάει αυτομάτως ο nginx όταν ξεκινάει ο
  υπολογιστής, δίνουμε:
  ```bash
  sudo systemctl disable nginx
    ```

# Ενεργοποίηση HTTPS

## Server Certificate

* Θέλουμε ο nginx να διαχειρίζεται όλη την επικοινωνία μέσω TLS
  (HTTPS).
  
* Για να γίνει αυτό χρειαζόμαστε ένα ψηφιακό πιστοποιητικό (digital
  certificate) για τον εξυπηρετητή. 
  
* Yπάρχουν διάφοροι πάροχοι που δίνουν ψηφιακά πιστοποιητικά, έναντι
  διαφόρων αμοιβών αναλόγως με το είδος των πιστοποιητικών.
  
* Εμείς θα χρησιμοποιήσουμε τα δωρεάν πιστοποιητικά που εκδίδει το
  (Let's Encrypt)[https://letsencrypt.org/], μέσω της υπηρεσίας
  [Certbot](https://certbot.eff.org/).

## Εγκατάσταση Certbot

* Κατ' αρχήν θα πρέπει να προσθέσουμε το αποθετήριο του Certbot στα
  αποθετήρια που χρησιμοποιεί το σύστημά μας για ενημερώσεις:
  
   ```bash
   sudo add-apt-repository ppa:certbot/certbot
   ```
   
* Ενημερώνουμε τη λίστα των πακέτων λογισμικού, ώστε να
  περιλαμβάνονται και αυτά του certbot:

   ```bash
   sudo apt-get update
   ```
* Εγκαθιστούμε το πακέτο με το οποίο θα μπορέσουμε να πάρουμε
  και να εγκαταστήσουμε πιστοποιητικό:

   ```bash
   sudo apt install python-certbot-nginx
   ```

## Λήψη Πιστοποιητικού

* Για να αιτηθούμε, λάβουμε, και εγκαταστήσουμε το πιστοποιητικό στο
  μηχάνημά μας, δίνουμε (θα αντικαταστήσετε το δικό σας μηχάνημα):
  
   ```bash
   sudo certbot --nginx -d snf-842276.vm.okeanos.grnet.gr
   ```

* Στην ερώτηση:

   ```
   Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   1: No redirect - Make no further changes to the webserver configuration.
   2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
   new sites, or if you're confident your site works on HTTPS. You can undo this
   change by editing your web server's configuration.
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
   ```
    θα απαντήσετε 2, προκειμένου *όλη* η κίνηση να ανακατευθύνεται
    μέσω HTTPS.
 
## Απάντηση Certbot
 
```
Congratulations! You have successfully enabled
https://snf-842276.vm.okeanos.grnet.gr

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=snf-842276.vm.okeanos.grnet.gr
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/snf-842276.vm.okeanos.grnet.gr/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/snf-842276.vm.okeanos.grnet.gr/privkey.pem
   Your cert will expire on 2019-01-07. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le 
```

## Ρύθμιση τοίχους προστασίας

* Αυτή τη στιγμή το τοίχος προστασίας δεν επιτρέπει τις συνδέσεις
  TLS/SSL, όπως μπορούμε να διαπιστώσουμε δίνοντας:
  ```bash
  sudo ufw status
  ```
  (δεν θα δούμε στην έξοδο να μας ενημερώνει ότι επιτρέπονται).
  
* Για να τις επιτρέψουμε, δίνουμε:
  ```bash
  sudo ufw allow 'Nginx Full'
  ```
    
* Σβήνουμε τον παλιό, πιο περιοριστικό κανόνα, αφού πλέον δεν
  χρειάζεται:
  ```bash
  sudo ufw delete allow 'Nginx HTTP'
  ```

## Έλεγχος ασφάλειας TLS/SSL

* Μπορούμε να ελέγξουμε την ασφάλεια των ρυθμίσεων TLS/SSL
  δίνοντας το εξής URL (προσαρμοσμένο στο σύστημά μας):
  ```
  https://www.ssllabs.com/ssltest/analyze.html?d=snf-779124.vm.okeanos.grnet.gr
    ```
    
* Αν το κάνουμε αυτό, ενδέχεται να δούμε ότι ο βαθμός μας είναι Grade B.

* Μπορούμε να βελτιώσουμε το βαθμό μας αναβαθμίζοντας τις παραμέτρους
  Diffie-Hellman που χρησιμοποιούμε.
  
* Αυτές επηρεάζουν την αρχική ανταλλαγή κλειδιών μεταξύ του browser
  και του εξυπηρετητή.
  
  
<div class="notes">

Το κλειδί Diffie-Hellman που αρχικά δημιουργείται έχει μήκος 1024
bits· για να πάρουμε Grade A θα πρέπει το κλειδί να έχει μήκος
τουλάχιστον 2048 bits.

</div>

## Αναβάθμιση παραμέτρων Diffie-Hellman (1)

* Δίνουμε:
  ```bash
  sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
  ```
  Προσέξτε ότι αυτό θα χρειαστεί κάποια λεπτά για να εκτελεστεί.
  
* Στη συνέχεια ανοίγουμε το αρχείο `etc/nginx/sites-available/default`
  και προσθέτουμε όπου θέλουμε μέσα στο τμήμα `server` (π.χ., ακριβώς
  κάτω από τις γραμμές για το SSL certificate `managed by Certbot`) το εξής
  ```
  ssl_dhparam /etc/ssl/certs/dhparam.pem;
  ```

<div class="notes">

Για την ανταλλαγή κλειδιών με τη μέθοδο Diffie-Hellman χρησιμοποιούμε
έναν πρώτο αριθμό $p$ και μία βάση $g$. Στη συνέχεια, αν επικοινωνούν
η Alice και ο Bob, η Alice επιλέγει έναν τυχαίο αριθμό $a$ και στέλνει
στον Bob τον αριθμό $g^a\ \textrm{mod} p$. Αντίστοιχα ο Bob επιλέγει
έναν τυχαίο αριθμό $b$ και στέλνει στην Alice τον αριθμό 
$g^b\ \textrm{mod} p$. Τελικά το κλειδί στο οποίο συμφωνούν είναι το $g^{ab}\
\textrm{mod} p$.

Στο αρχείο `dhparam.pem` αποθηκεύονται οι παράμετροι $g$ και $p$. Αν
θέλουμε να τους δούμε, δίνουμε:
```bash
openssl dhparam -inform PEM -in /etc/ssl/certs/dhparam.pem -text
```
Τότε στην οθόνη θα εμφανιστεί ο πρώτος $p$ (prime) και η βάση $g$
(generator).

Το πρόγραμμα `dhparam` βρίσκει τον $p$ και τη $g$ ώστε να είναι όσο το
δυνατόν δυσκολότερη η παραβίαση της κρυπτογραφίας. Έτσι, ο $p$ πρέπει
να είναι της μορφής $p = 2q + 1$, όπου $q$ πρώτος. Ένας τέτοιος
αριθμός ονομάζεται [ασφαλής πρώτος (safe
prime)](https://en.wikipedia.org/wiki/Safe_prime).

</div>
    
    
## Αναβάθμιση παραμέτρων Diffie-Hellman (2)
    
* Ελέγχουμε ότι όλα είναι ΟΚ:
  ```bash
  sudo nginx -t
  ```
    
* Αν ναι, φορτώνουμε τις νέες ρυθμίσεις. 
  ```bash
  sudo systemctl reload nginx
  ```
     
* Μετά, αν ξανατρέξουμε τους ελέγχους των SSL Labs (με το ίδιο URL), θα
  δούμε ότι θα έχουμε Grade A.



## Ρύθμιση nginx

* Για να ρυθμίσουμε τη σύνδεση του nginx με το Gunicorn αλλάζουμε το
  αρχείο το αρχείο `/etc/nginx/sites-available/default` με τα εξής
  περιεχόμενα, προσαρμοσμένα στο μηχάνημά μας:
  ```
  server {
	  listen 80;
	  listen [::]:80;

	  if ($host = snf-843015.vm.okeanos.grnet.gr) {
		  return 301 https://$host$request_uri;
	  }

	  return 404; # managed by Certbot
  }

  server {
	  server_name snf-843015.vm.okeanos.grnet.gr;

	  listen [::]:443 ssl ipv6only=on; # managed by Certbot
	  listen 443 ssl; # managed by Certbot
	  ssl_certificate /etc/letsencrypt/live/snf-842276.vm.okeanos.grnet.gr/fullchain.pem; # managed by Certbot
	  ssl_certificate_key /etc/letsencrypt/live/snf-842276.vm.okeanos.grnet.gr/privkey.pem; # managed by Certbot
	  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
	  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

	  location / {
		  include proxy_params;
		  proxy_pass http://unix:/home/user/flaskr_project/flaskr.sock;
	  }

	  location /static/ {
		  root /home/user/flaskr_project/venv/lib/python3.5/site-packages/flaskr/;
	  }
  }   
  ```
   
<div class="notes">

Στο αρχείο αυτό:

* Προφανώς στη γραμμή που αρχίζει με `server_name` θα πρέπει να
  βάλουμε τη διεύθυνση του δικού μας μηχανήματος.

* Στο τμήμα που αρχίζει με `location /static/` δηλώνουμε ότι τα
  στατικά αρχεία θα τα εξυπηρετεί ο ίδιος ο nginx, από την τοποθεσία
  που ορίζουμε (όπου και έχουν εγκατασταθεί). Γενικότερα, σε
  οποιαδήποτε εφαρμογή δημιουργούμε, θα μαζεύουμε τα στατικά αρχεία σε
  κάποια τοποθεσία, και από εκεί θα τα εξυπηρετεί ο nginx *και όχι ο
  εξυπηρετητής WSGI που θα χρησιμοποιούμε*. Το ίδιο θα κάνουμε και αν
  δεν χρησιμοποιούμε καν Python: τα στατικά αρχεία θα τα εξυπηρετεί
  *πάντα* ο nginx.

* Με τη γραμμή `proxy_pass` λέμε στον nginx να προωθήσει τις αιτήσεις
  HTTP στο socket που ορίσαμε, και άρα στον Gunicorn.

</div>

## Ενεργοποίηση Εφαρμογής στον nginx

* Για να ελέγξουμε ότι το αρχείο ρυθμίσεων είναι σωστό δίνουμε:

   ```bash
   sudo nginx -t
   ```

* Για να ενεργοποιήσουμε την εφαρμογή μας στον nginx θα δώσουμε:

   ```bash
   sudo ln -s /etc/nginx/sites-available/flaskr /etc/nginx/sites-enabled
   ```

## Επανεκίνηση Εφαρμογής στον nginx

* Επανεκινούμε τον nginx με:

   ```bash
		sudo systemctl restart nginx
   ```
   
* Ελέγχουμε ότι η εφαρμογή μας είναι διαθέσιμη στο διαδίκτυο
  δείχνοντας με τον browser στη
  <http://snf-842276.vm.okeanos.grnet.gr> (θα βάλετε τη δική σας
  διεύθυνση).

* Θα πρέπει να ανακατευνθείτε απευθείας στην αντίστοιχη διεύθυνση HTTPS.


## Κι αν Κάτι Πάει Στραβά;

Για να ελέγξουμε τυχόν λάθη, μπορούμε να κάνουμε τα εξής:

* `sudo less /var/log/nginx/error.log`: αρχείο λαθών nginx (error log).
* `sudo less /var/log/nginx/access.log` αρχείο προσβάσεων nginx
    (access log).
* `sudo journalctl -u nginx`: αρχείο συμβάντων nginx (process log)
* `sudo journalctl -u flaskr`: αρχείο συμβάντων Gunicorn (app log).


## Ανανέωση Πιστοποιητικού

* Το Linux (και Unix) έχουν ενσωματωμένο μηχανισμό προκειμένου να
  ορίζουμε διαδικασίες που θέλουμε να εκτελούνται ανά περιοδικά
  χρονικά διαστήματα.
  
* Χάρη σε αυτό, το ψηφιακό πιστοποιητικό θα ανανεώνεται αυτομάτως δύο
  φορές την ημέρα!
  
* Αυτό γίνεται χρησιμοποιώντας *χρονόμετρα* (timers).

* Μπορούμε να τα δούμε, δίνοντας:
  ```bash
  systemctl list-timers
  ```
  
## Certbot Timer (1)

* Αν θέλουμε να δούμε πληροφορίες για τον certbot timer δίνουμε:

   ```bash
   sudo systemctl status certbot.timer
  ```
   
* Οπότε θα δούμε κάτι της μορφής:

   ```
   ● certbot.timer - Run certbot twice daily
	Loaded: loaded (/lib/systemd/system/certbot.timer; enabled; vendor preset: enabled)
	Active: active (waiting) since Fri 2018-10-12 13:57:24 EEST; 40min ago

   Oct 12 13:57:24 snf-843604 systemd[1]: Started Run certbot twice daily.
   ```
  
## Certbot Timer (2)

* Οι ρυθμίσεις για τον certbot timer δίνονται, όπως δείχνει το
  παραπάνω, στο αρχείο `/lib/systemd/system/certbot.timer`:
  ```
  [Unit]
  Description=Run certbot twice daily

  [Timer]
  OnCalendar=*-*-* 00,12:00:00
  RandomizedDelaySec=43200
  Persistent=true

  [Install]
  WantedBy=timers.target
  ```

## Προγραμματισμός Διαδικασιών με `cron`

* Εκτός των timers, υπάρχει και το παραδοσιακό εργαλείο
  προγραμματισμού διαδικασιών
  [cron](https://en.wikipedia.org/wiki/Cron).
  
* Δείτε την τεκμηρίωσή του για περισσότερες πληροφορίες, μιας και
  είναι από τα πολύ γνωστά εργαλεία στο Linux / Unix.
