% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Deployment

## Γενικά

* Αυτή τη στιγμή η εφαρμογή μας τρέχει σε έναν εξυπηρετητή ανάπτυξης
  (development server) στο τοπικό μας μηχάνημα.

* Για να χρησιμοποιηθεί η εφαρμογή και από άλλους, θα πρέπει να
  εγκατασταθεί σε έναν παραγωγικό εξυπηρετητή.

## Βοήθεια, τι είναι αυτά τα πράγματα;

* Οποιοσδήποτε θέλει να δουλέψει στον χώρο της πληροφορικής πρέπει να
  ξέρει το λειτουργικό σύστημα Linux.
  
* Αν δεν έχετε σχετικές γνώσεις, καλό είναι να τις αποκτήσετε τώρα.

* Υπάρχουν πολλές πηγές στο διαδίκτυο. Μια καλή επιλογή είναι το
  βιβλίο [The Linux Command Line](http://linuxcommand.org/tlcl.php) το
  οποίο διατίθεται δωρεάν σε μορφή PDF.
  
* Φιλική συμβουλή: διαβάστε τουλάχιστον το πρώτο μέρος για να
  αποκτήσετε μια σχετική ευχέρεια.

# Δημιουργία ιδεατής μηχανής

## Δημιουργία ιδεατής μηχανής (1)

* Αφού εισέλθουμε στον [~okeanos](https://okeanos.grnet.gr) προχωράμε
  στο dashboard.

* Στο okeanos dashboard επιλέγουμε Projects.

* Στο projects δημιουργούμε ένα project με τα χαρακτηριστικά που
  θέλουμε.
  
* Υποβάλουμε αίτηση για την έγκρισή του και ενημερώνουμε το
  διδάσκοντα. 

## Δημιουργία ιδεατής μηχανής (2)

* Προχωράμε στη δημιουργία νέας ιδεατής μηχανής (New Machine +).

* Επιλέγουμε ως μήτρα (image) την πιο πρόσφατη έκδοση Ubuntu Server.

## Δημιουργία ιδεατής μηχανής (3)

* Επιλέγουμε το project το οποίο έχουμε αιτηθεί (και έχει εγκριθεί). 

* Επιλέγουμε 1 CPU, 4 GB μνήμης RAM, 40 GB δίσκο.

* Στη συνέχεια, αν θέλουμε να της δώσουμε και διεύθυνση IPv4, θα
  πρέπει στην επόμενη οθόνη να δημιουργήσουμε μια νέα (create new).

* Όταν αυτή δημιουργηθεί, τσεκάρουμε τη διεύθυνση αυτή στην επιλογή
  Internet (public IPv4).

## Δημιουργία ιδεατής μηχανής (4)

* Στην επόμενη οθόνη, δίνουμε ένα περιγραφικό όνομα στη μηχανή μας.

* Επιβεβαιώνουμε τις συνολικές επιλογές μας και δίνουμε create
  machine. 

## Δημιουργία ιδεατής μηχανής (5)

* Όταν δημιουργηθεί η ιδεατή μηχανή, θα μας εμφανιστεί στην οθόνη
  ένας κωδικός, τον οποίον πρέπει να αντιγράψουμε.

* Αν δεν εμφανιστεί τέτοιο μήνυμα, αλλά ένα μήνυμα που μας ενημερώνει
  ότι η διαδικασία καθυστερεί για κάποιο λόγο:
    * δίνουμε Reload, και περιμένουμε να ολοκληρωθεί η διαδικασία.
    * όταν ολοκληρωθεί, πατάμε πάνω στο εικονίδιο της μηχανής, όπου
      θα δούμε πάλι τον κωδικό μας.

* Τότε, θα εμφανιστεί μήνυμα με το όνομα χρήστη και τον τρόπο
  σύνδεσης, όπως:

    ```bash
    ssh snf-779124.vm.okeanos.grnet.gr
    ```

## Ενημέρωση ιδεατής μηχανής (1)

* Πρέπει να εγκαταστήσουμε στην ιδεατή μηχανή μας τις νεώτερες
  εκδόσεις των πακέτων του λειτουργικού.

* Μπαίνουμε στη μηχανή μας με (η δική σας μηχανή θα έχει άλλα
  στοιχεία):
  
    ```bash
    ssh user@snf-779124.vm.okeanos.grnet.gr
    ```

## Ενημέρωση ιδεατής μηχανής (2)

* Στη συνέχεια δίνουμε:

    ```bash
    sudo apt-get update
    sudo apt-get upgrade
    ```

* Όταν μας ζητηθεί, δίνουμε τον κωδικό εισόδου μας.

* Στο τέλος της διαδικασίας καλό είναι να βγούμε και να ξαναμπούμε στο
  σύστημα.
  
* Αν μπαίνοντας στο σύστημα δούμε μήνυμα:
  ```
  *** System restart required ***
  ```
  τότε δίνουμε:
  ```bash
  sudo reboot now
  ```
    
## Ενημέρωση ιδεατής μηχανής (3)

* Αν παίρνουμε πάλι μηνύματα που μας λένε ότι υπάρχουν ενημερώσεις,
  ακόμα και αμέσως μετά τα παραπάνω, τότε δίνουμε:
  
    ```bash
    sudo apt-get dist-upgrade
    ```
    
* Στο τέλος ξεκινάμε πάλι το σύστημα.


# Εγκατάσταση δημοσίου κλειδιού

## Ετοιμάζοντας το έδαφος σε MS-Windows (1)

* Σε περίπτωση που χρησιμοποιείτε λειτουργικό σύστημα Mac OS ή Linux,
  έχετε ήδη τα απαραίτητα εργαλεία για κρυπτογραφία δημοσίου κλειδιού
  στον υπολογιστή σας.
  
* Σε περίπτωση που χρησιμοποιείτε MS-Windows, ένας εύκολος τρόπος να
  τα αποκτήσετε είναι να εγκαταστήσετε το [git for
  windows](https://git-for-windows.github.io/).
  
* Όταν το εγκαταστήσουμε θα δούμε ότι θα είναι διαθέσιμο το git BASH,
  ένα τερματικό από το οποίο έχουμε πρόσβαση σε αρκετά εργαλεία του
  Linux. 
  
## Ετοιμάζοντας το έδαφος σε MS-Windows (2)

* Εναλλακτικά, μπορούμε να εγκαταστήσουμε την εργαλειοθήκη
  [Cygwin](https://www.cygwin.com/).
  
* Αφού την εγκαταστήσετε, ξεκινήστε το πρόγραμμα Cygwin και στη
  συνέχεια μέσα από αυτό μπορείτε να εγκαταστήσετε τα πακέτα SSH.
  
* Στη συνέχεια θεωρούμε ότι έχουμε στη διάθεσή μας ένα τερματικό bash
  (μας το δίνει το Cygwin).
  
## Ετοιμάζοντας το έδαφος σε MS-Windows (3)
  
* Το τερματικό πρόγραμμα των MS-Windows (cmd.exe) είναι απλώς
  απαράδεκτο.
  
* Καλύτερα να χρησιμοποιήσετε κάποιο εναλλακτικό, όπως το
  [ConEmu](https://conemu.github.io/).


## Δημιουργία κλειδιού RSA

* Θα ξεκινήσουμε δημιουργώντας ένα νέο κλειδί RSA.

    ```
    ssh-keygen -b 4096 -t rsa
    Generating public/private rsa key pair.
    ```

## Αποθήκευση κλειδιού

* Το πρόγραμμα θα μας ζητήσει το όνομα και τη θέση όπου θα αποθηκευτεί
  το ζεύγος κλειδιών.

    ```
    Enter file in which to save the key (/Users/panos/.ssh/id_rsa): /Users/panos/.ssh/id_rsa_icc
    ```

## Κωδικός κλειδιού

* Αν θέλουμε μπορούμε να δώσουμε ένα κλειδί το οποίο θα μας ζητείται
  όταν το χρησιμοποιούμε. Μπορείτε να το

* Μπορείτε να το αφήσετε κενό.

    ```
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    ```

## Αποθήκευση κλειδιού

* Τότε θα αποθηκευτεί το κλειδί μας στην τοποθεσία που δώσαμε και θα
  δούμε κάτι όπως το παρακάτω:

    ```
    Your identification has been saved in /Users/panos/.ssh/id_rsa_icc.
    Your public key has been saved in /Users/panos/.ssh/id_rsa_icc.pub
    The key fingerprint is:
    SHA256:hk8lt0M4fVtOP2buCFeRbqEm9YyM/Q8MTtU3I4XjL0A panos@Panos-MBP.lan
    The key's randomart image is:
    +---[RSA 4096]----+
    |              .. |
    |         o E o...|
    |        + * oo=*o|
    |       . * +=BB.*|
    |      . S oo=*oX.|
    |       +   +o+B..|
    |        .  ...+o |
    |            o o..|
    |             . ..|
    +----[SHA256]-----+
    ```

<div class="notes">

Μπορεί να αναρωτιέστε τι είναι αυτό το "randomart image" που
εμφανίστηκε. Κάθε κλειδί έχει ένα ψηφιακό αποτύπωμα, με βάση το οποίο
μπορούμε να το αναγνωρίζουμε. Έτσι, όταν συνδεόμαστε σε έναν
εξυπηρετητή, μπορούμε να ελέγχουμε το ψηφιακό του αποτύπωμα,
προκειμένου να διαπιστώσουμε ότι είναι πράγματι αυτό που περιμένουμε.

Όπως εμείς δημιουργήσαμε ένα δικό μας ζευγάρι κλειδιών, έτσι έχει
δημιουργήσει αυτομάτως και ο εξυπηρετητής στον οποίο θέλουμε να
συνδεθούμε ένα δικό του. Το δικό μας ζευγάρι κλειδιών ταυτοποιεί εμάς.
Το ζευγάρι του εξυπηρετητεί ταυτοποιεί τον εξυπηρετητή. Άρα για να
είμαστε σίγουροι ότι όλα πάνε καλά θα μπορούσαμε να ελέγχουμε κάθε
φορά που συνδεόμαστε με τον εξυπηρετητή ότι ο εξυπηρετητής εξακολουθεί
να έχει το σωστό κλειδί. 

Το πρόβλημα είναι ότι δεν είναι εύκολο να θυμόμαστε ποιο είναι αυτό το
ψηφιακό αποτύπωμα (παραπάνω, στο δικό μας κλειδί, είναι αυτό που
ακολουθεί το `SHA256:`). Το randomart image είναι ένα ψηφιακό αποτύπωμα
που μπορούμε εύκολα να το αναγνωρίζουμε οπτικά.

Αν στο αρχείο `~/.ssh/config` του υπολογιστή μας (βλ. παρακάτω),
δώσουμε την παράμετρο `VisualHostKey=yes` στις ρυθμίσεις για τον
συγκεκριμένο εξυπηρετητή, τότε κάθε φορά που μπαίνουμε σε αυτόν θα μας
εμφανίζει το randomart image του κλειδιού του. Αν λοιπόν κάποια στιγμή
δούμε ένα διαφορετικό, ξέρουμε ότι κάτι πολύ καλό συμβαίνει.

*Προσοχή*: όταν συνδεόμαστε στον εξυπηρετητή βλέπουμε το randomart του
κλειδιού *του*, όχι του κλειδιού μας. Τότε, μπορεί να αναρωτηθείτε,
για ποιο λόγο εμφανίζεται το randomart του κλειδιού μας, όταν αυτό
δημιουργείται, αφού δεν το ξαναβλέπουμε; Γιατί η δημιουργία του
κλειδιού είναι ανεξάρτητη από τη χρήση του. Μπορούμε κάλλιστα να
δημιουργήσουμε ένα κλειδί και αντί για προσωπική χρήση να το
χρησιμοποιήσουμε ως κλειδί του εξυπηρετητή μας.

Θυμηθείτε ότι στη μέθοδο κρυπτογράφησης RSA και οι δύο συνομιλητές
έχουν ζευγάρια κλειδιών, ένα ο καθένας. Εδώ λοιπόν μας ενδιαφέρει να
μπορούμε να διαπιστώσουμε με μια ματιά ότι το κλειδί του εξυπηρετητή
είναι αυτό που περιμένουμε.

Αν από περιέργεια θέλουμε να δούμε το κλειδί που χρησιμοποιεί ο
εξυπηρετητής, μπορούμε να βρούμε την τοποθεσία του κοιτάζοντας το
αρχείο `/etc/ssh/ssh_host_rsa_key`. Συνήθως το ιδιωτικό κλειδί του
εξυπηρετητή είναι το `/etc/ssh/ssh_host_rsa_key` και το δημόσιο κλειδί
του εξυπηρετητή είναι το `/etc/ssh/ssh_host_rsa_key.pub`.

Το δημόσιο κλειδί είναι αποθηκευμένο στο αρχείο του σε συγκεκριμένη
μορφοποίηση η οποία περιγράφεται στο [RFC
4253](https://tools.ietf.org/html/rfc4253#section-6.6), ενώ το
ιδιωτικό κλειδί είναι αποθηκευμένοι στο αρχείο του σε μορφοποίηση που
περιγράφεται στο [RFC 8017](https://tools.ietf.org/html/rfc8017). Το
πρότυπο αυτό ονομάζεται [PKCS
#1](https://en.wikipedia.org/wiki/PKCS_1) (PKCS σημαίνει Public-Key
Cryptography Standards) και έχει δημιουργηθεί από την εταιρεία RSA
(των δημιουργών του κρυπτοσυστήματος RSA). 

Αν θέλουμε να δούμε τι ακριβώς αποθηκεύεται σε αυτά τα αρχεία, αρκεί
να δώσουμε:
```bash
openssl rsa -text -noout -in ~/.ssh/id_rsa_icc
```
οπότε στην οθόνη μας θα εμφανιστούν οι ακόλουθες πληροφορίες:

* μήκος κλειδιού σε bits
* modulus
* publicExponent
* privateExponent
* prime1
* prime2
* exponent1
* exponent2

Οι αριθμοί θα εμφανιστούν κωδικοποιημένοι στο δεκαεξαδικό σύστημα
αρίθμησης, όπου κάθε byte αναπαρίσταται με δύο χαρακτήρες· τα bytes
χωρίζονται μεταξύ τους, για λόγους εμφάνισης, με τον χαρακτήρα :.

Τι είναι τα παραπάνω; Θυμηθείτε ότι το σύστημα RSA λειτουργεί με βάση
τα εξής:

* Δύο πρώτους αριθμούς $p$ κα $q$: αυτοί είναι οι prime1 και prime2.
* Το γινόμενό τους $n = pq$: αυτό είναι το modulus.
* Το δημόσιο κλειδί είναι το $(e, n)$, όπου $e$ είναι το
  publicExponent.
* Το ιδιωτικό κλειδί είναι το $(d, n)$, όπου $d$ είναι το
  privateExponent. 
* Το exponent1 είναι ίσο με $d\ \textrm{mod} (p - 1)$ και το exponent2
  είναι ίσο με $d\ \textrm{mod} (q - 1)$· αυτά χρησιμοποιούνται για πιο
  αποτελεσματικούς υπολογισμούς, βλ. [τη χρήση του Κινέζικου
  Θεωρήματος στο
  RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Using_the_Chinese_remainder_algorithm).

</div>

## Εγκατάσταση του δημόσιου κλειδιού (1)

* Αντιγράφουμε το κλειδί στην ιδεατή μηχανή μας ως εξής (αντικαθιστάτε
τα δικά σας στοιχεία):

    ```bash
    scp /Users/panos/.ssh/id_rsa_icc.pub user@snf-779124.vm.okeanos.grnet.gr:
    ```

## Εγκατάσταση του δημόσιου κλειδιού (2)

* Στη συνέχεια μπαίνουμε πάλι στην ιδεατή μας μηχανή και δίνουμε:

    ```bash
    mkdir .ssh
    mv id_rsa_icc.pub ~/.ssh/authorized_keys
    chmod 700 .ssh
    chmod 400 .ssh/authorized_keys
    ```
    
* Βγαίνουμε από την ιδεατή μηχανή μας και ελέγχουμε ότι μπορούμε να
  συνδεθούμε χωρίς να δώσουμε κωδικό:
  
    ```bash
    ssh -i /Users/panos/.ssh/id_rsa_icc user@snf-779124.vm.okeanos.grnet.gr
    ```

## Εγκατάσταση του δημόσιου κλειδιού (3)

* Για να συνδεόμαστε πιο εύκολα, φτιάχνουμε ένα αρχείο `config` στον
  κατάλογο `.ssh` του υπολογιστή μας (ή το ανοίγουμε αν ήδη υπάρχει)
  και γράφουμε:

    ```
    Host icc
    Hostname snf-779124.vm.okeanos.grnet.gr
    User user
    VisualHostKey=yes
    IdentityFile ~/.ssh/id_rsa_icc
    ```

* Στη συνέχεια θα μπορούμε να μπούμε κατ' ευθείαν στην ιδεατή μηχανή
  μας δίνοντας:

    ```bash
    ssh icc
    ```

## Ρύθμιση `sudo`

* Αυτή τη στιγμή κάθε φορά που τρέχουμε την εντολή `sudo` στην ιδεατή
  μηχανή μας, χρειάζεται να δώσουμε τον κωδικό μας.

* Για να μην χρειάζεται αυτό, αφού μπούμε στη μηχανή μας δίνουμε:

    ```bash
    sudo visudo
    ```
* Στη συνέχεια αλλάζουμε τη γραμμή:
  ```
  %sudo   ALL=(ALL:ALL) ALL
  ```
  σε
  ```
  %sudo   ALL=(ALL:ALL) NOPASSWD:ALL
  ```

# Ενημέρωση συστήματος

## Διαδικασία ενημέρωσης

* Πρέπει σε τακτά χρονικά διαστήματα να ενημερώνουμε τα συστήματά μας
  με τις νεώτερες εκδόσεις του λογισμικού που χρησιμοποιούμε. 
  
* Βλέπουμε ότι χρειάζεται να το κάνουμε αυτό όταν μπαίνοντας στο
  σύστημα μας εμφανίσει αντίστοιχο μήνυμα.
  
* Αφού μπούμε στο σύστημά μας δίνουμε τις εντολές:

    ```bash
    sudo apt-get update
    sudo apt-get upgrade
    ```
    
* Στη συνέχεια βγαίνουμε και ξαναμπαίνουμε στο σύστημά μας. Αν λάβουμε
  πάλι μήνυμα ότι χρειάζονται ενημερώσεις, τότε δίνουμε:
  
    ```bash
    sudo apt-get dist-upgrade
    ```
    
<div class="notes">

Στην περίπτωση που κάνουμε `dist-upgrade` μπορεί να ανανεωθεί και ο
πυρήνας (kernel) του λογισμικού. Στην περίπτωση αυτή καλό είναι να
επανεκκινήσουμε το σύστημά μας με:

```bash
sudo shutdown -r now
```

Σε κάθε περίπτωση όταν απαιτείται επανεκκίνηση μας εμφανίζεται
κατάλληλο μήνυμα (```*** System restart required ***```) όταν
μπαίνουμε στο σύστημα.

</div>


# Εγκατάσταση MySQL

## Εγκατάσταση πακέτου MySQL

* Για την εγκατάσταση του πακέτου MySQL στο Ubuntu δίνουμε:

    ```bash
    sudo apt-get install mysql-server
    ```
    
* Στη διάρκεια της εγκατάστασης θα μας ζητήσει να δώσουμε έναν κωδικό
  για τον διαχειριστή της βάσης δεδομένων (root user). Καλό είναι να
  δώσουμε ένα καλό κωδικό.
  
* Επίσης θα χρειαστεί να εγκαταστήσουμε το πακέτο
  `libmysqlclient-dev`, οπότε δίνουμε:
  
    ```bash
    sudo apt-get install libmysqlclient-dev
    ```
  
  
## Θωράκιση MySQL

* Η αυτόματη εγκατάσταση της MySQL δεν έχει τις πιο ασφαλείς ρυθμίσεις
  για παραγωγική χρήση.
  
* Για να τη θωρακίσουμε δίνουμε:

    ```bash
    mysql_secure_installation
    ```
* Στη συνέχεια επιλέγουμε:
    * Να ελέγχονται οι κωδικοί για την ασφάλειά τους.
    * Να μην έχουμε ανώνυμους χρήστες.
    * Να μην επιτρέπονται συνδέσεις των διαχειριστών παρά μόνο από το
      τοπικό μηχάνημα (localhost).
    * Να αφαιρεθεί η test database.
    * Να εφαρμοστούν όλες οι αλλαγές τώρα (reloading priviledge tables).
    
    
## Έλεγχος λειτουργίας MySQL

* Για να ελέγξουμε ότι η MySQL λειτουργεί, δίνουμε:
  ```bash
  systemctl status mysql.service
  ```
* Θα πρέπει να εμφανιστεί κάτι της μορφής:
  ```bash
  ● mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2017-10-21 19:43:45 EEST; 2min 3s ago
  Main PID: 16514 (mysqld)
    CGroup: /system.slice/mysql.service
           └─16514 /usr/sbin/mysqld

  Oct 21 19:43:43 snf-779124 systemd[1]: Starting MySQL Community Server...
  Oct 21 19:43:45 snf-779124 systemd[1]: Started MySQL Community Server.
  ```
    
## Σύνδεση με τη MySQL

* Για να ελέγξουμε ότι μπορούμε να συνδεθούμε στη MySQL ως
  διαχειριστές, δίνουμε:
  ```bash
  mysqladmin -p -u root version
  ```

* Οπότε θα πρέπει να εμφανιστεί κάτι της μορφής:
  ```bash
  mysqladmin  Ver 8.42 Distrib 5.7.19, for Linux on x86_64
  Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

  Oracle is a registered trademark of Oracle Corporation and/or its
  affiliates. Other names may be trademarks of their respective
  owners.

  Server version		5.7.19-0ubuntu0.16.04.1
  Protocol version	10
  Connection		Localhost via UNIX socket
  UNIX socket		/var/run/mysqld/mysqld.sock
  Uptime:			2 min 15 sec

  Threads: 1  Questions: 13  Slow queries: 0  Opens: 115  Flush tables: 1  Open tables: 34  Queries per second avg: 0
  .096
  ```

## Παύση, επανεκκίνηση MySQL

* Αν θέλουμε να σταματήσουμε τη MySQL δίνουμε:
  ```bash
  sudo systemctl stop mysql
  ```

* Mπορούμε να επιβεβαιώσουμε ότι σταμάτησε δίνοντας:
  ```bash
  sudo systemctl status mysql
  ```

## Εκκίνηση, επανεκκίνηση MySQL

* Αν θέλουμε να ξεκινήσουμε τη MySQL δίνουμε:
  ```bash
  sudo systemctl start mysql
  ```
  μπορούμε να επιβεβαιώσουμε ότι ξεκίνησε δίνοντας:
  ```bash
  sudo systemctl status mysql
  ```
    
* Αν θέλουμε να σταματήσουμε και να ξεκινήσουμε τη MySQL δίνουμε:
  ```bash
  sudo systemctl restart mysql
  ```

# Εγκατάσταση nginx

## Εγκατάσταση nginx

* Για να εγκαταστήσουμε τον nginx δίνουμε:
  ```bash
  sudo apt-get install nginx
  ```

* Όταν ολοκληρωθεί η εκτέλεση αυτής της εντολής θα έχει εγκατασταθεί ο
  nginx. Πριν προχωρήσουμε όμως, θα πρέπει να ρυθμίσουμε και να
  ενεργοποιήσουμε το *τοίχος προστασίας* (firewall) στον εξυπηρετητή
  μας!

* Ναι, χρειάζεται. Στο διαδίκτυο είναι άγρια τα πράγματα.

## Ενεργοποίηση τοίχους προστασίας

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
  
## Ρύθμιση τοίχους προστασίας (2)

* Για να συνεχίσουμε να έχουμε απομακρυσμένη πρόσβαση, δίνουμε:
  ```bash
  sudo ufw allow OpenSSH
  ```
    
* Στη συνέχεια, για να επιτρέψουμε την πρόσβαση από τη θύρα 80,
  δίνουμε:
  ```bash
  sudo ufw allow 'Nginx HTTP'
  ```

## Ενεργοποίηση τοίχους προστασίας

* Για να ενεργοποιήσουμε το τοίχος προστασίας στη διανομή Ubuntu
  δίνουμε:
  ```bash
  sudo ufw enable
  ```

* Για να δούμε την κατάσταση του τοίχους προστασίας δίνουμε:
  ```bash
  sudo ufw status verbose
  ```

## Έλεγχος τοίχους προστασίας

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
    
## Έλεγχος λειτουργίας nginx

* Για να ελέγξουμε ότι ο nginx δουλεύει, δίνουμε:
  ```bash
  systemctl status nginx
  ```
    
* Τότε θα πρέπει να δούμε κάτι όπως το παρακάτω:
  ```
  ● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2017-10-21 21:29:38 EEST; 2min 25s ago
   Main PID: 2329 (nginx)
     CGroup: /system.slice/nginx.service
             ├─2329 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
             ├─2330 nginx: worker process
             ├─2331 nginx: worker process
             ├─2332 nginx: worker process
             └─2333 nginx: worker process
  ```

## Χειρισμός nginx

* Χειριζόμαστε τον nginx όπως και τη MySQL.

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
    
* Αν αλλάξουμε τις ρυθμίσεις του nginx και θέλουμε να τις εφαρμόσουμε
  χωρίς να διακόψουμε τις υπάρχουσες συνδέσεις, δίνουμε:
  ```bash
  sudo systemctl reload nginx
  ```
    
* Αν θέλουμε να μην ξεκινάει αυτομάτως ο nginx όταν ξεκινάει ο
  υπολογιστής, δίνουμε:
  ```bash
  sudo systemctl disable nginx
    ```

* Αν θέλουμε να ξεκινάει αυτομάτως ο nginx όταν ξεκινάει ο
  υπολογιστής, δίνουμε:
  ```bash
  sudo systemctl enable nginx
  ```
    
## Αρχεία και κατάλογοι του nginx

* Ο nginx χρησιμοποιεί μια σειρά από αρχεία και καταλόγους για τη
  λειτουργία του.
  
* `/var/www/html`: περιέχει το (στατικό) περιεχόμενο.

* `/etc/nginx`: περιέχει τα αρχεία ρυθμίσεων.

* `/etc/nginx/nginx.conf`: το βασικό αρχείο ρυθμίσεων.

* `/etc/nginx/sites-available/`: κατάλογος που περιέχει ρυθμίσεις για
  κάθε ιστότοπο που εξυπηρετεί ο nginx.
  
* `/etc/nginx/sites-enabled/`: κατάλογος που περιέχει τις ρυθμίσεις
  για κάθε *ενεργοποιημένο* ιστότοπο. Στην πράξη, περιέχει συνδέσμους
  στα αντίστοιχα αρχεία του καταλόγου `/etc/nginx/sites-available/`.

## Ονοματοδοσία

* Θα πρέπει να δώσουμε ένα όνομα στον ιστοτοπό μας.

* Ανοίγουμε το αρχείο `/etc/nginx/sites-available/default`

* Αλλάζουμε τη γραμμή:
  ```
  server_name _;
  ```
  σε:
  ```
  server_name snf-779124.vm.okeanos.grnet.gr;
  ```
  (ή όποιο άλλο είναι το όνομα που θα χρησιμοποιήσουμε).
    
* Σώζουμε το αρχείο. 

## Έλεγχος ρυθμίσεων nginx

* Για να είμαστε σίγουροι ότι δεν έχουμε κάνει
  κάποιο λάθος, δίνουμε:
  ```bash
  sudo nginx -t
  ```
  
* Αν λάβουμε απάντηση ΟΚ, φορτώνουμε τις νέες ρυθμίσεις στον nginx:
  ```bash
  sudo systemctl reload nginx
  ```


# Ενεργοποίηση TLS/SSL

## Ψηφιακά πιστοποιητικά

* Για να έχουμε κρυπτογραφημένες συνδέσεις στον nginx, θα πρέπει να
  εγκαταστήσουμε σε αυτόν ένα ψηφιακό πιστοποιητικό.
  
* Υπάρχουν διάφοροι τρόποι να αποκτήσουμε ψηφιακά πιστοποιητικά.

* Εμείς θα δούμε πώς μπορούμε να χρησιμοποιήσουμε ψηφιακά
  πιστοποιητικά που εκδίδονται δωρεάν από την υπηρεσία
  [certbot](https://certbot.eff.org/). 
  
* Το certbot περιέχει αναλυτικές οδηγίες για το τι πρέπει να κάνουμε,
  αλλά θα τις δούμε συνοπτικά και εδώ.


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

## Εγκατάσταση πιστοποιητικού (1)

* Ξεκινάμε με μία ενημέρωση του συστήματός μου.
  ```bash
  sudo apt-get update
  ```

* Εγκαθιστούμε βοηθητικό λογισμικό για να μπορούμε να ενημερώνουμε
  εύκολα τις πηγές των ενημερώσεών μας και του λογισμικού που θα
  μπορούμε να εγκαθιστούμε:
  ```bash
  sudo apt-get install software-properties-common
  ```
    
## Εγκατάσταση πιστοποιητικού (2)

* Προσθέτουμε στις πηγές των ενημερώσεών μας το certbot.
  ```bash
  sudo add-apt-repository ppa:certbot/certbot
  ```
θα δούμε στην οθόνη κάτι όπως:
  ```
   This is the PPA for packages prepared by Debian Let's Encrypt Team and backported for Ubuntu(s).
   More info: https://launchpad.net/~certbot/+archive/ubuntu/certbot
  Press [ENTER] to continue or ctrl-c to cancel adding it

  gpg: keyring `/tmp/tmp848k7lmy/secring.gpg' created
  gpg: keyring `/tmp/tmp848k7lmy/pubring.gpg' created
  gpg: requesting key 75BCA694 from hkp server keyserver.ubuntu.com
  gpg: /tmp/tmp848k7lmy/trustdb.gpg: trustdb created
  gpg: key 75BCA694: public key "Launchpad PPA for certbot" imported
  gpg: Total number processed: 1
  gpg:               imported: 1  (RSA: 1)
  OK
  ```
    
## Εγκατάσταση πιστοποιητικού (3)

* Κάνουμε πάλι τυχόν ενημερώσεις:
  ```bash
  sudo apt-get update
  ```
    
* Εγκαθιστούμε το λογισμικού του certbot:
  ```bash
  sudo apt-get install python-certbot-nginx
  ```
    
## Εγκατάσταση πιστοποιητικού (4)

* Αιτούμαστε την εγκατάσταση του πιστοποιητικού.
  ```bash
  sudo certbot --nginx
  ```
* Θα ρωτηθούμε αν θέλουμε όλη η κυκλοφορία του ιστοτόπου μας να
  ανακατευθύνεται μέσω HTTPS, όπου θα απαντήσουμε θετικά:
  ```
  Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
  -------------------------------------------------------------------------------
  1: No redirect - Make no further changes to the webserver configuration.
  2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
  new sites, or if you're confident your site works on HTTPS. You can undo this
  change by editing your web server's configuration.
  -------------------------------------------------------------------------------
  Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
  Redirecting all traffic on port 80 to ssl in /etc/nginx/sites-enabled/default
  ```
    
## Εγκατάσταση πιστοποιητικού (5)

* Επίσης θα ενημερωθούμε για τη θέση όπου αποθηκεύτηκε το
  πιστοποιητικό μας:
  ```
  Congratulations! You have successfully enabled
  https://snf-779124.vm.okeanos.grnet.gr

  You should test your configuration at:
  https://www.ssllabs.com/ssltest/analyze.html?d=snf-779124.vm.okeanos.grnet.gr
  -------------------------------------------------------------------------------

  IMPORTANT NOTES:
   - Congratulations! Your certificate and chain have been saved at:
     /etc/letsencrypt/live/snf-779124.vm.okeanos.grnet.gr/fullchain.pem
     Your key file has been saved at:
     /etc/letsencrypt/live/snf-779124.vm.okeanos.grnet.gr/privkey.pem
     Your cert will expire on 2018-01-20. To obtain a new or tweaked
     version of this certificate in the future, simply run certbot again
     with the "certonly" option. To non-interactively renew *all* of
     your certificates, run "certbot renew"
   - If you like Certbot, please consider supporting our work by:

     Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
     Donating to EFF:                    https://eff.org/donate-le
  ```

## Αυτόματη ανανέωση του πιστοποιητικού (1)

* Το πιστοποιητικό που λάβαμε θα λήξει σε 90 ημέρες.

* Αυτό το σύντομο χρονικό διάστημα έχει επιλεγεί επίτηδες, ώστε να
  "υποχρεωθούμε" να ανανεώνουμε αυτομάτως το πιστοποιητικό.
  
* Για το σκοπό αυτό θα χρησιμοποιήσουμε το εργαλείο
  [cron](https://en.wikipedia.org/wiki/Cron).
  
## Αυτόματη ανανέωση του πιστοποιητικού (2)

* Δίνουμε:
  ```bash
  sudo crontab -e
  ```
    
* Στο τέλος του αρχείου (τελευταία γραμμή) γράφουμε:
  ```
  15 3 * * * /usr/bin/certbot renew --quiet
  ```
  αυτό σημαίνει ότι κάθε μέρα στις 3:15 το πρωί θα εκτελείται η εντολή 
  `/usr/bin/certbot renew --quiet`. 


## Αυτόματη ανανέωση του πιστοποιητικού (3)

* Αν αναρωτιέστε τι είναι τα άλλα τρία πεδία που αφήσαμε με
  αστερίσκους, είναι:
    * ημέρα του μήνα
    * μήνας
    * ημέρα της εβδομάδας

* Το cron θα τρέχει λοιπόν την εντολή κάθε μέρα. Όλα τα πιστοποιητικά
  μας θα ανανεώνονται αυτομάτως 30 ημέρες πριν από τη λήξη τους.


## Έλεγχος ασφάλειας TLS/SSL

* Μπορούμε να ελέγξουμε την ασφάλεια των ρυθμίσεων TLS/SSL
  δίνοντας το εξής URL (προσαρμοσμένο στο σύστημά μας):
  ```
  https://www.ssllabs.com/ssltest/analyze.html?d=snf-779124.vm.okeanos.grnet.gr
    ```
    
* Αν το κάνουμε αυτό, θα δούμε ότι ο βαθμός μας είναι Grade B.

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
  κάτω από τις γραμμές για το SSL certificate) το εξής
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


# Εγκατάσταση εφαρμογής

## Εγκατάσταση Python

* Εγκαθιστούμε Python 3:
  ```bash
  sudo apt-get install python3
  ```
    
* Εγκαθιστούμε το [virtualenv](https://virtualenv.pypa.io/en/stable/):
  ```
  sudo -H pip3 install virtualenv
  ```
    
* Δημιουργούμε τον κατάλογο της εφαρμογής μας:
  ```bash
  mkdir ~/project_site
  cd ~/project_site
  ```
    
## Δημιουργία ιδεατού περιβάλλοντος

* Δημιουργούμε ένα ιδεατό περιβάλλον (virtual env) με:
  ```bash 
  virtualenv env
  ```
       
* Τότε θα δούμε:
  ```bash
  Using base prefix '/usr'
  New python executable in /home/user/project_site/env/bin/python3
  Also creating executable in /home/user/project_site/env/bin/python
  Installing setuptools, pip, wheel...done.
  ```
    
## Ενεργοποίηση ιδεατού περιβάλλοντος

* Ενεργοποιούμε το περιβάλλον:
  ```bash
  source env/bin/activate
  ```
  θα δούμε τότε ότι η προτροπή συστήματος θα αλλάξει και θα έχει
    μπροστά το `(env)`.
    
* Εγκαθιστούμε τα πακέτα που χρειαζόμαστε:
  ```bash
  pip install django gunicorn pymysql
  ```
    
## Αντιγραφή των αρχείων της εφαρμογής μας

* Για να αντιγράψουμε τα αρχεία της εφαρμογής μας από τον υπολογιστή
  της ανάπτυξης στον υπολογιστή της παραγωγής δίνουμε:
  ```bash
  scp -r project_site/* snf-726601.vm.okeanos.grnet.gr:project_site
  ```

## Προσαρμογή `settings.py`

* Το αρχείο `project_site/settings.py` περιέχει τις γενικές ρυθμίσεις
  της εφαρμογής μας.
  
* Δεδομένου ότι για το στατικό περιεχόμενο υπεύθυνος θα είναι ο nginx,
  θα πρέπει να ορίσουμε τον κατάλογο στον οποίο θα συγκεντρώνεται το
  περιεχόμενο αυτό.
  
* Θα ορίσουμε ότι ο κατάλογος αυτός θα είναι ο `project_site/static`

* Για να το κάνουμε αυτό, στο αρχείο `project_site/settings.py`
  προσθέτουμε, κάτω από τη γραμμή:
  ```python
  STATIC_URL = '/static/'
  ```
  τη γραμμή:
  ```python
  STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
  ```

## Προσαρμογή `site_config.py`

* Θυμηθείτε ότι είχαμε δημιουργήσει ένα αρχείο
  `project_site/site_config.py` με τα ευαίσθητα στοιχεία της
  εφαρμογής μας.
  
* Σε αυτό το αρχείο, προσθέτουμε τη γραμμή (προσαρμοσμένη στο σύστημά μας):
  ```python
  ALLOWED_HOSTS = ['localhost', '127.0.0.1', '[::1]', 'snf-779124.vm.okeanos.grnet.gr']
  ```

* Αυτό θα επιτρέψει στο Django να δεχτεί την επικοινωνία από τον nginx.
  
## Δημιουργία βάσης

* Για να συνδεθούμε με την MySQL δίνουμε:
  ```bash
  mysql -u root -p
  ```

* Για να δημιουργήσουμε τη βάση πρέπει να δώσουμε τα παρακάτω στη
  MySQL:

    ```sql
    CREATE DATABASE djbr CHARACTER SET utf8 COLLATE utf8_general_ci;

    CREATE USER 'djbr_user'@'localhost' IDENTIFIED BY 'g8nzmktk6Y$';

    GRANT ALL PRIVILEGES ON djbr.* TO 'djbr_user'@'localhost';
    
    FLUSH PRIVILEGES;
    ```

* Για να μπορούμε να συνδεθούμε με τη MySQL μέσω Python δίνουμε:
  ```bash
  pip install mysqlclient
  ```
    
## Εφαρμογή μεταγωγών και δημιουργία διαχειριστή

* Για να δημιουργηθούν οι απαραίτητοι πίνακες στη βάση μας θα πρέπει
  να εφαρμόσουμε τις υπάρχουσες μεταγωγές με:
  ```bash
  python manage.py migrate
  ```
    
* Επίσης αυτή τη στιγμή η βάση μας είναι άδεια, άρα δεν υπάρχει καν ο
  διαχειριστής του Django. Συνεπώς δίνουμε:
  ```bash
  python manage.py createsuperuser
  ```

## Συγκέντρωση στατικών αρχείων

* Για να συγκεντρωθούν όλα τα στατικά αρχεία της εφαρμογής μας στον
  κατάλογο `project_site/static` δίνουμε:
  ```bash
  python manage.py collectstatic
  ```
    
* Αυτό θα το κάνουμε κάθε φορά που αλλάζουμε ή προσθέτουμε κάτι στα
  στατικά αρχεία της εφαρμογής μας.


## Δημιουργία αρχείου υπηρεσίας Gunicorn

* Θα δημιουργήσουμε το αρχείο `/etc/systemd/system/gunicorn.service`
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
  ExecStart=/home/user/flaskr_project/venv/bin/gunicorn --workers 3 --bind unix:fl
  askr.sock flaskr:create_app()

  [Install]
  WantedBy=multi-user.target
  ```
    
* Όταν λέμε «προσαρμοσμένα στο σύστημά μας» εννοούμε ότι στο παραπάνω
  αρχείο θα βάλετε τα στοιχεία των δικών σας καταλόγων.

<div class="notes">

Ό,τι ακολουθεί τo `ExecStart` είναι μία γραμμή (ασχέτως αν στην οθόνη
μπορεί να εμφανίζεται κομμένη).

</div>

## Ενεργοποίηση Gunicorn (1)

* Για να ενεργοποιήσουμε τον Gunicorn δίνουμε:
  ```bash
  sudo systemctl start flaskr
  ```
    
## Ενεργοποίηση Gunicorn (2)

* Για να ελέγξουμε ότι όλα πάνε καλά, μπορούμε να δώσουμε:
  ```bash
  sudo systemctl status gunicorn
  ```
    
* Θα πρέπει να δούμε κάτι της μορφής:
  ```bash
  ● flaskr.service - gunicorn flaskr daemon
	 Loaded: loaded (/etc/systemd/system/flaskr.service; disabled; vendor preset:
	 Active: active (running) since Tue 2018-10-09 17:14:21 EEST; 57s ago
   Main PID: 1288 (gunicorn)
	  Tasks: 4 (limit: 4663)
	 CGroup: /system.slice/flaskr.service
			 ├─1288 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_p
			 ├─1301 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_p
			 ├─1302 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_p
			 └─1303 /home/user/flaskr_project/venv/bin/python3 /home/user/flaskr_p

  Oct 09 17:14:21 snf-842276 systemd[1]: Started gunicorn flaskr daemon.
  Oct 09 17:14:22 snf-842276 gunicorn[1288]: [2018-10-09 17:14:22 +0300] [1288] [I
  Oct 09 17:14:22 snf-842276 gunicorn[1288]: [2018-10-09 17:14:22 +0300] [1288] [I
  Oct 09 17:14:22 snf-842276 gunicorn[1288]: [2018-10-09 17:14:22 +0300] [1288] [I
  Oct 09 17:14:22 snf-842276 gunicorn[1288]: [2018-10-09 17:14:22 +0300] [1301] [I
  Oct 09 17:14:22 snf-842276 gunicorn[1288]: [2018-10-09 17:14:22 +0300] [1302] [I
  Oct 09 17:14:22 snf-842276 gunicorn[1288]: [2018-10-09 17:14:22 +0300] [1303] [I
```

## Ενεργοποίηση flaskr στην Εκκίνηση

* Για να ξεκινάει αυτομάτως το flaskr με την εκκίνηση του μηχανήματος,
  δίνουμε:
  
   ```bash
   sudo systemctl enable gunicorn
   ```

## Προσαρμογή `/etc/nginx/sites-available/default` (1)

* Τώρα πρέπει να πούμε στον nginx να προωθεί τις αιτήσεις για δυναμικό
  περιεχόμενο στο Django.
  
* Αυτό το κάνουμε ως εξής. Ανοίγουμε το αρχείο
  `/etc/nginx/sites-available/default` και αλλάζουμε τη γραμμή
  `location` στις γραμμές:
  ```
  location = /favicon.ico { access_log off; log_not_found off; }
  location /static/ {
          root /home/user/project_site;
  }

  location / {
          include proxy_params;
          proxy_pass http://unix:/home/user/project_site/project_site.sock;
  }
  ```

## Προσαρμογή `/etc/nginx/sites-available/default` (2)

* Ελέγχουμε αν το αρχείο είναι ΟΚ:
  ```bash
  sudo nginx -t
  ```
    
* Αν ναι, δίνουμε:
  ```bash
  sudo systemctl restart nginx
  ```

## Έλεγχος της εφαρμογής μας

* Τώρα, αν τα έχουμε κάνει όλα σωστά, θα μπορούμε να δούμε την
  εφαρμογή μας δίνουμε στον browser τη διεύθυνση:
  ```
  https://snf-779124.vm.okeanos.grnet.gr/djbr/
  ```
  (φυσικά θα βάλετε τη διεύθυνση του δικού σας μηχανήματος).
  
* Αν θέλουμε να μη χρειάζεται να βάζουμε το `/djbr` στο τέλος του URL,
  μπορούμε να προσθέσουμε μέσα στο τμήμα `server` του
  `/etc/nginx/sites-available/default` τη γραμμή:
  ```
  rewrite ^/$ /djbr;
  ```
    
* Μετά δίνουμε:
  ```bash
  sudo systemctl reload nginx
  ```
