% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# MongoDB

## Εισαγωγή

* Η MongoDB είναι η πιο δημοφιλής από τις μη σχεσιακές βάσεις
  δεδομένων (NoSQL databases).

* Ως τέτοια, υιοθετεί ένα ριζικά διαφορετικό τρόπο αποθήκευσης
  δεδομένων και μία πολύ διαφορετική φιλοσοφία από τις σχεσιακές
  βάσεις.

* Είναι κατάλληλη για την αποθήκευση τεράστιων όγκων δεδομένων, αρκεί
  να είμαστε πιστοί στη φιλοσοφία που τη διέπει.

* Τα παρακάτω περιέχουν υλικό από:
  * [Thinking in Documents: Part 1](https://www.mongodb.com/blog/post/thinking-documents-part-1).
  * [Thinking in Documents: Part 2](https://www.mongodb.com/blog/post/thinking-documents-part-2).


# Βασικές αρχές 

## Γενικά

* Η MongoDB αποθηκεύει *έγγραφα* (documents) σε *συλλογές*
  (collections).

* Οι συλλογές αποθηκεύονται σε βάσεις δεδομένων.

* Μια βάση δεδομένων λοιπόν είναι μια συλλογή εγγράφων.


## Σχεσιακές βάσεις και MongoDB

| RDBMS    | MongoDB                        |
|----------|--------------------------------|
| Database | Database                       | 
| Table    | Collection                     |
| Row      | Document                       |
| Index    | Index                          |
| JOIN     | Embedded Document or Reference |


## Σχεσιακή απεικόνιση δεδομένων (1)

Persons

| Pers ID | Surname   | First Name | City     |
|---------+-----------+------------+----------|
|       0 | Miller    | Paul       | London   |
|       1 | Ortega    | Alvaro     | Valencia |
|       2 | Huber     | Urs        | Zurich   |
|       3 | Blanc     | Gaston     | Paris    |
|       4 | Bertolini | Fabrizio   | Rome     |


## Σχεσιακή απεικόνιση δεδομένων (2)

Cars

| Car ID | Model       | Year |  Value | Pers ID |
|--------|-------------|------|--------|---------|
|    101 | Bentley     | 1973 | 100000 |       0 |
|    102 | Rolls Royce | 1965 | 330000 |       0 |
|    103 | Peugeot     | 1993 |    500 |       3 |
|    104 | Ferrari     | 2005 | 150000 |       4 |
|    105 | Renault     | 1998 |   2000 |       3 |
|    106 | Renault     | 2001 |   7000 |       3 |
|    107 | Smart       | 1999 |   2000 |       2 |


## Απεικόνιση σε MongoDB

```javascript
{
  first_name: "Paul",
  surname: "Miller",
  city: "London",
  location: [45.123, 47.232],
  cars: [
    { model: "Bentley",
      year: 1973,
      value: 100000,
      / * ... */
    },
    { model: "Rolls Royce",
      year: 1965,
      value: 330000, 
      /* ... */
    },
  ]
}
```

## Blog: σχεσιακή απεικόνιση

<img src="blog_relational.png" width="600px"/>


## Blog: MongoDB

<img src="blog_mongodb.png" height="500px"/>


## Βασικά χαρακτηριστικά εγγράφων

* Tο σύνολο της πληροφορίας ενός εγγράφου είναι προσπελάσιμο σε
  μία κλήση στη βάση, αντί να απαιτούνται joins.

* Αφού τα έγγραφα είναι αυτοτελή, ο διαμοιρασμός της βάσης σε
  πολλαπλούς κόμβους είναι ευκολότερη από ό,τι στις σχεσιακές βάσεις.

* Δεν υπάρχει πρόβλημα απόδοσης λόγω joins.


## Μοντελοποίηση συσχετίσεων

* Υπάρχουν δύο τρόποι να μοντελοποιήσουμε συσχετίσεις με τη MongoDB:
  * ενσωμάτωση (embedding)
  * αναφορά (referencing)

* Η κάθε μία είναι κατάλληλη σε συγκεκριμένες περιπτώσεις.


## Ενσωμάτωση: ενδείξεις

* Αν τα δεδομένα μας έχουν σχέση 1:1 ή 1:n, και τα «πολλά» αντικείμενα
  τα βλέπουμε μαζί με το ένα, τότε μπορούμε να τα ενσωματώσουμε στο
  γονέα τους.

* Αυτό επίσης ταιριάζει καλά όταν ένα αντικείμενο *ανήκει* σε ένα
  άλλο.

* Για παράδειγμα, η τιμολόγηση ενός προϊόντος μπορεί να ενσωματωθεί
  στο προϊόν:
  * αν είναι μοναδική και αφορά συγκεκριμένο προϊόν
  * αν σβήνοντας το προϊόν δεν έχει νόημα ύπαρξης η τιμολόγησή του


## Ενσωμάτωση: αντενδείξεις

* Διαβάζουμε συχνά ένα έγγραφο, αλλά όχι ένα ενσωματωμένο του τμήμα.
  Τότε με το να το έχουμε ενσωματώσει, απλώς διαβάζουμε κάθε φορά
  περιττά πράγματα.

* Ένα τμήμα του εγγράφου ενημερώνεται συχνά, ενώ το υπόλοιπο μένει
  στατικό.

* Το έγγραφο ξεπερνά τα όρια της MongoDB (16 GB ανά έγγραφο).


## Αναφορά: ενδείξεις

* Με τη χρήση αναφορών πετυχαίνουμε κάποιου είδους κανονικοποίηση στα
  δεδομένα μας.

* Χρησιμοποιούμε αναφορές αν αναφερόμαστε σε ένα αντικείμενο από
  πολλά διαφορετικά αντικείμενα.

* Χρησιμοποιούμε αναφορές για να αναπαραστήσουμε σχέσεις m:n.

* Χρησιμοποιούμε αναφορές για την αναπαράσταση μεγάλων ιεραρχικών
  μοντέλων.

* Χρησιμοποιούμε αναφορές όταν τα κέρδη σε ταχύτητα ανάγνωσης δεν
  ισορροπούν τις συνέπειες της αποκανονικοποίησης.


## Αναφορά: αντενδείξεις

* Δεν χρησιμοποιούμε αναφορές όταν μας πειράζει η πτώση στην ταχύτητα
  ανάγνωσης, αφού για κάθε αναφορά πρέπει να διαβάσουμε από τη βάση.

* Δεν χρησιμοποιούμε αναφορές όταν η αποκανονικοποίηση των δεδομένων
  μας δημιουργεί προβλήματα.


## Διαφορετικοί στόχοι

* Μία σχεσιακή βάση έχει ως βασικό στόχο τη βελτιστοποίηση της
  αποθήκευσης των δεδομένων. 

* Η MongoDB έχει ως βασικό στόχο τη βελτιστοποίηση της πρόσβασης στα
  δεδομένα από την εφαρμογή.

* Συνεπώς, η MongoDB θεωρεί ότι το κόστος ανάπτυξης και ο χρόνος
  ανάπτυξης είναι πιο σημαντικά από το κόστος αποθήκευσης (αν και ο
  χρόνος και το κόστος ανάπτυξης δεν μειώνονται πάντα με τη χρήση
  MongoDB).


## Δοσοληψίες στη MongoDB

* H MongoDB προσφέρει εγγυήσεις ACID *σε επίπεδο εγγράφου*.

* Αυτό συμπεριλαμβάνει ενσωματωμένους πίνακες και έγγραφα.

* Η MongoDB *δεν* δίνει εγγυήσεις ACID όταν επιδρούμε σε παραπάνω από
  ένα έγγραφο, στην ίδια ή σε διαφορετικές συλλογές.

* Αν πραγματικά χρειαζόμαστε κάτι τέτοιο, πρέπει να το υλοποιήσουμε
  προγραμματιστικά εμείς, για λεπτομέρειες βλ.
  [εδώ](https://docs.mongodb.com/manual/tutorial/perform-two-phase-commits/).

## ACID

* A: Atomicity. Κάθε δοσοληψία είναι «όλα ή τίποτε».

* C: Consistency. Κάθε δοσοληψία πρέπει να φέρνει τη βάση από μία
  συνεπή κατάσταση σε μία άλλη.

* I: Isolation. Αν εκτελούνται πολλές δοσοληψίες ταυτόχρονα, το
  αποτέλεσμα είναι το ίδιο με το να εκτελούνται σειριακά.

* D: Durability. Αν μια δοσοληψία οριστικοποιηθεί, θα παραμείνει
  οριστικοποιημένη, ό,τι και να γίνει (διακοπή ρεύματος, λάθη,
  crashes).


# Ξεκινώντας με τη MongoDB

## Έγγραφα

* Όπως είπαμε, στη MongoDb εργαζόμαστε με έγγραφα. 

* Ένα έγγραφο είναι ένα αντικείμενο σε δομή BSON. Αποτελείται από
  πεδία και τιμές.
  
* Οι τιμές μπορεί να είναι άλλα έγγραφα και πίνακες.


## Παράδειγμα εγγράφου

```javascript
{
   "_id" : ObjectId("54c955492b7c8eb21818bd09"),
   "address" : {
      "street" : "2 Avenue",
      "zipcode" : "10075",
      "building" : "1480",
      "coord" : [ -73.9557413, 40.7720266 ]
   },
   "borough" : "Manhattan",
   "cuisine" : "Italian",
   "grades" : [
      {
         "date" : ISODate("2014-10-01T00:00:00Z"),
         "grade" : "A",
         "score" : 11
      },
      {
         "date" : ISODate("2014-01-16T00:00:00Z"),
         "grade" : "B",
         "score" : 17
      }
   ],
   "name" : "Vella",
   "restaurant_id" : "41704620"
}
```

## Συλλογές

* Τα έγγραφα αποθηκεύονται σε συλλογές.

* Οι συλλογές είναι το αντίστοιχο των πινάκων στις σχεσιακές βάσεις,
  αλλά δεν είναι απαραίτητο όλα τα έγγραφα σε μία συλλογή να έχουν το
  ίδιο σχήμα.
  
* Όλα τα έγγραφα μιας συλλογής πρέπει να έχουν ένα μοναδικό πεδίο
  `_id`, το οποίο είναι το πρωτεύον κλειδί.


## Η συλλογή `resturants`

* Ως παράδειγμα θα χρησιμοποιήσουμε τη συλλογή `restaurants` που μας
  παρέχει η MongoDB.
  
* Περιέχει έγγραφα για εστιατόρια, όπως το παρακάτω:
  ```javascript
  {
    "address": {
       "building": "1007",
       "coord": [ -73.856077, 40.848447 ],
       "street": "Morris Park Ave",
       "zipcode": "10462"
    },
    "borough": "Bronx",
    "cuisine": "Bakery",
    "grades": [
       { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
       { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
       { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
       { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
       { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
    ],
    "name": "Morris Park Bake Shop",
    "restaurant_id": "30075445"
  }
  ```
  
## Εισαγωγή των δεδομένων `restaurants`

* Κατεβάζουμε τα δεδομένα από τη διεύθυνση
  https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json
  και τα αποθηκεύουμε σε ένα αρχείο `primer-dataset.json`.a
  
* Τα εισάγουμε στη βάση με την εξής εντολή:
  ```bash
  mongoimport --db test --collection restaurants --drop --file primer-dataset.json
  ```
  
* Θα δούμε στην οθόνη κάτι όπως:
  ```
  2017-12-12T17:48:02.190+0200	connected to: localhost
  2017-12-12T17:48:02.190+0200	dropping: test.restaurants
  2017-12-12T17:48:03.721+0200	imported 25359 documents
  ```
  
## MongoDB Shell (mongo)

* Για να ξεκινήσουμε να δουλεύουμε με τη βάση μας, ξεκινάμε το
  πρόγραμμα διεπαφής (mongo shell):
  ```
  mongo
  ```
  
* Στο mongo shell υπάρχει ενσωματωμένη βοήθεια, την οποία μπορούμε να
  δούμε με:
  ```
  help
  ```
  
  
## Εισαγωγή δεδομένων μέσω shell

* Αφού τα δεδομένα τα έχουμε εισάγει στη βάση `test`, θα πρέπει να
  χρησιμοποιήσουμε τη συγκεκριμένη βάση:
  ```
  use test
  ```
  
* Στη συνέχεια, για να εισάγουμε ένα έγγραφο στη συλλογή `restaurants`
  χρησιμοποιούμε την εντολή `insert()`.
  ```javascript
    db.restaurants.insert(
     {
        "address" : {
           "street" : "2 Avenue",
           "zipcode" : "10075",
           "building" : "1480",
           "coord" : [ -73.9557413, 40.7720266 ]
        },
        "borough" : "Manhattan",
        "cuisine" : "Italian",
        "grades" : [
           {
              "date" : ISODate("2014-10-01T00:00:00Z"),
              "grade" : "A",
              "score" : 11
           },
           {
              "date" : ISODate("2014-01-16T00:00:00Z"),
              "grade" : "B",
              "score" : 17
           }
        ],
        "name" : "Vella",
        "restaurant_id" : "41704620"
     }
  )
  ```
 
* Στην οθόνη θα δούμε:
  ```bash
  WriteResult({ "nInserted" : 1 })
  ```
  
<div class="notes">

* Αν δώσουμε `db.myCollection.insert()` και η συλλογή `myCollection` δεν
  υπάρχει στη βάση, θα δημιουργηθεί αυτομάτως.

* Επίσης, αν το έγγραφο δεν περιέχει ένα πεδίο `_id` (όπως συμβαίνει
  στο παραπάνω έγγραφο), το mongo shell θα προσθέσει αυτομάτως ένα
  τέτοιο πεδίο και θα αρχικοποιήσει με ένα `ObjectId`.
  

</div>


## Αναζήτηση 

* Για να αναζητήσουμε έγγραφα σε μια συλλογή, χρησιμοποιούμε τη μέθοδο
  `find()`.
  
* Αν τη δώσουμε χωρίς κριτήρια αναζήτησης, θα μας επιστρέψει όλα τα
  έγγραφα της συλλογής.
  ```javascript
  db.restaurants.find()
  ```
  
## Κριτήρια ισότητας

* Αν θέλουμε να δώσουμε κάποια κριτήρια ισότητας, δίνουμε:
  ```javascript
  { <field1>: <value1>, <field2>: <value2>, ... }
  ```
  
* Με τον τρόπο αυτό μπορούμε να δώσουμε κριτήρια που αφορούν τόσο τις
  ιδιότητες ενός εγγράφου όσο και ιδιότητες ενσωματωμένων εγγράφων.
  

## Αναζήτηση με ιδιότητες εγγράφου

* Έστω ότι θέλουμε να βρούμε όλα τα εστιατόρια στο Μανχάταν. Θα
  δώσουμε:
  ```javascript
  db.restaurants.find( { "borough": "Manhattan" } )
  ```
  
## Αναζήτηση με ιδιότητες ενσωματωμένου εγγράφου
 
* Έστω ότι θέλουμε να βρούμε τα εστιατόρια με ένα συγκεκριμένο
  ταχυδρομικό κώδικα:
  ```javascript
  db.restaurants.find( { "address.zipcode": "10075" } )
  ```
  
## Αναζήτηση μέσα σε πίνακα

* Κάθε έγγραφο περιέχει έναν πίνακα `grades`.

* Ο πίνακας αυτός περιέχει αντικείμενα του τύπου:
  ```javascript
  {
    "date" : ISODate("2014-01-16T00:00:00Z"),
    "grade" : "B",
    "score" : 17
  }
  ``` 
  
* Για να αναζητήσουμε τα εστιατόρια τα οποία στον πίνακα αυτό έχουν
  επιτύχει `grade` ίσο με `"B"`, δίνουμε:
  ```javascript
  db.restaurants.find( { "grades.grade": "B" } )
  ```
  
## Αναζήτηση με τελεστές

* Για να πραγματοποιήσουμε αναζήτηση με κριτήρια διαφορετικά της
  ισότητας, χρησιμοποιούμε τους κατάλληλους τελεστές.
  
* Το γενικό συντακτικό είναι:
  ```javascript
  { <field1>: { <operator1>: <value1> } }
  ```
  
## Ο τελεστής μεγαλύτερο από (`$gt`)

* Για να αναζητήσουμε τα εστιατόρια των οποίων ο πίνακας `grades`
  περιέχει ένα πεδίο `score` μεγαλύτερο του 30, δίνουμε:
  ```javascript
  db.restaurants.find( { "grades.score": { $gt: 30 } } )
  ```
  
## Ο τελεστής μικρότερο από (`$lt`)

* Για να αναζητήσουμε τα εστιατόρια των οποίων ο πίνακας `grades`
  περιέχει ένα πεδίο `score` μικρότερο του 10, δίνουμε:
  ```
  db.restaurants.find( { "grades.score": { $lt: 10 } } )
  ```

## Τελεστές σύγκρισης

* Η MongoDΒ περιλαμβάνει τους παρακάτω τελεστές σύγκρισης:

  * `$eq`: ίσο
  * `$gt`: μεγαλύτερο
  * `$gte`: μεγαλύτερο ή ίσο
  * `$in`: περιλαμβάνεται στο πίνακα
  * `$lt`: μικρότερο
  * `$lte`: μικρότερο ή ίσο
  * `$ne`: διάφορο
  * `$nin`: δεν περιλαμβάνεται στον πίνακα
  

## Λογικοί τελεστές

* Μπορούμε να συδυάσουμε κριτήρια χρησιμοποιώντας τους παρακάτω
  λογικούς τελεστές:
  
  * `$and`: λογικό ΚΑΙ
  ```
  db.restaurants.find( { "cuisine": "Italian", "address.zipcode": "10075" } )
  
  db.restaurants.find( 
    { $and: [{"cuisine": "Italian"}, {"address.zipcode": "10075"}] } 
  )
  ```
  * `$or`: λογικό Ή
  ```
  db.restaurants.find(
   { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
  )
  ```
  * `$not`: λογικό ΌΧΙ
  ```javascript
  db.restaurants.find( { "grades.score": { $not: { $gt: 30 } } } )
  ```
  * `$nor`: λογικό ΟΥΤΕ
  ```javascript
  db.restaurants.find(
   { $nor: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
  )
  ```


## Ταξινόμηση αποτελεσμάτων

* Για να ταξινομήσουμε τα αποτελέσματα της αναζήτησης, προσθέτουμε τη
  μέθοδο `sort()` στο ερώτημά μας.
  
* Ως παραμέτρους στο `sort()` περνάμε τα πεδία της ταξινόμησης και τον
  τύπο, `1` για αύξουσα και `-1` για φθίνουσα.
  
* Για παράδειγμα, δείτε το παρακάτω:
  ```javascript
  db.restaurants.find().sort( { "borough": 1, "address.zipcode": 1 } )
  ```
  
## Ενημέρωση δεδομένων

* Για να ενημερώσουμε τα έγγραφα μιας συλλογής χρησιμοποιούμε τη
  μέθοδο `update()`.
  
* Η μέθοδος `update()` παίρνει ως παραμέτρους:
  * τα κριτήρια επιλογής
  * ένα έγγραφο που δείχνει τι αλλαγές θέλουμε να κάνουμε
  * τυχόν άλλες παραμέτρους
  
* Η μέθοδος `update()` ενημερώνει *ένα* έγγραφο. Αν θέλουμε να
  ενημερώσουμε όλα τα έγγραφα που ταιριάζουν στα κριτήρια, πρέπει να
  δώσουμε την παράμετρο `multi`.
  
* Δεν μπορούμε να αλλάξουμε την ιδιότητα `_id`.


## Ενημέρωση ιδιοτήτων εγγράφου

* Έστω ότι θέλουμε να αλλάξουμε το πρώτο έγγραφο όπου το `name` είναι
  ίσο με `Juni`, και συγκεκριμένα θέλουμε να αλλάξουμε το πεδίο
  `cuisine` και στο πεδίο `lastModified` να βάλουμε την τρέχουσα
  ημέρα:
  ```javascript
  db.restaurants.update(
    { "name" : "Juni" },
    {
      $set: { "cuisine": "American (New)" },
      $currentDate: { "lastModified": true }
    }
  )
  ```

* Θα πάρουμε ως αποτέλεσμα:
  ```javascript
  WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
  ```

## Upsert

* Το `nUpserted` σχετίζεται με την πράξη upsert, συνδυασμό του update
  και του insert. 

* Συγκεκριμένα, αν στο `update()` δώσουμε την παράμετρο:
  ```javascript
  upsert: true
  ```
  και δεν βρεθούν έγγραφα που να πληρούν τα κριτήρια που έχουμε θέσει,
  θα δημιουργηθεί και εισαχθεί ένα νέο έγγραφο. Αλλιώς θα ενημερωθούν
  τα έγγραφα που έχουν εντοπιστεί.
  

## Ενημέρωση ιδιότητας ενσωματωμένου εγγράφου

* Αν θέλουμε να ενημερώσουμε ιδιότητα ενσωματωμένου εγγράφου, μπορούμε
  να αναφερθούμε σε αυτήν χρησιμοποιώντας τελείες:
  ```javascript
  db.restaurants.update(
    { "restaurant_id" : "41156888" },
    { $set: { "address.street": "East 31st Street" } }
  )
  ```

## Ενημέρωση πολλών εγγράφων

* Για να ενημερώσουμε πολλά έγγραφα, πρέπει να χρησιμοποιήσουμε την
  παράμετρο `multi`:
  ```javascript
  db.restaurants.update(
    { "address.zipcode": "10016", cuisine: "Other" },
    {
      $set: { cuisine: "Category To Be Determined" },
      $currentDate: { "lastModified": true }
    },
    { multi: true}
  )
  ```

* Προσοχή: στην περίπτωση αυτή, η ατομικότητα (atomicity) και η
  απομόνωση (isolation) ισχύει για κάθε *ένα* έγγραφο, και όχι για το
  σύνολο των εγγράφων.


## Αντικατάσταση εγγράφου

* Αν θέλουμε να αντικαταστήσουμε εντελώς ένα έγγραφο με ένα άλλο
  (εκτός από την ιδιότητα `_id`), περνάμε το νέο έγγραφο ως τη δεύτερη
  παράμετρο στο `update()`:
  ```javascript
  db.restaurants.update(
     { "restaurant_id" : "41704620" },
     {
       "name" : "Vella 2",
       "address" : {
                "coord" : [ -73.9557413, 40.7720266 ],
                "building" : "1480",
                "street" : "2 Avenue",
                "zipcode" : "10075"
       }
     }
  )
  ```
  
## Συγκεντρωτικά ερωτήματα

* Για να πραγματοποιήσουμε συγκεντρωτικά ερωτήματα, όπως ομαδοποίηση
  (grouping) χρησιμοποιούμε τη μέθοδο `aggregate()`.
  
* Για παράδειγμα, έστω ότι θέλουμε να μετρήσουμε όλα τα εστιατόρια ανά
  συνοικία της Νέας Υόρκης:
  ```javascript
  db.restaurants.aggregate(
     [
       { $group: { "_id": "$borough", "count": { $sum: 1 } } }
     ]
  );
  ```
  
* Θα πάρουμε ως αποτέλεσμα:
  ```javascript
  { "_id" : "Missing", "count" : 51 }
  { "_id" : "Staten Island", "count" : 969 }
  { "_id" : "Manhattan", "count" : 10260 }
  { "_id" : "Bronx", "count" : 2338 }
  { "_id" : "Queens", "count" : 5656 }
  { "_id" : "Brooklyn", "count" : 6086 }
  ```

## Συγκεντρωτικά ερωτήματα με διαλογή

* Αν θέλουμε να πραγματοποιήσουμε μια διαλογή μεταξύ των εγγράφων και
  μετά να κάνουμε το συγκεντρωτικό μας ερώτημα, βάζουμε την επιλογή
  πρώτα ως εξής:
  ```javascript
  db.restaurants.aggregate(
     [
       { $match: { "borough": "Queens", "cuisine": "Brazilian" } },
       { $group: { "_id": "$address.zipcode" , "count": { $sum: 1 } } }
     ]
  );
  ```
  
* Θα πάρουμε ως αποτέλεσμα:
  ```
  { "_id" : "11377", "count" : 1 }
  { "_id" : "11101", "count" : 2 }
  { "_id" : "11368", "count" : 1 }
  { "_id" : "11106", "count" : 3 }
  { "_id" : "11103", "count" : 1 }
  ```

## Ευρετήρια

* H MongoDB υποστηρίζει ευρετήρια.

* Χωρίς αυτά, πρέπει να εξετάσει όλα τα έγγραφα σε μία συλλογή για να
  δει ποια ταιριάζουν σε ένα ερώτημα.
  
* Για να δημιουργήσουμε ένα ευρετήριο χρησιμοποιούμε τη μέθοδο
  `createIndex()`.
  
* Η MongoDB δημιουργεί αυτομάτως ένα ευρετήριο για το πεδίο `_id`.


## Δημιουργία απλού ευρετηρίου

* Για να δημιουργήσουμε ένα απλό ευρετήριο, δηλαδή ένα ευρετήριο πάνω
  σε ένα μόνο πεδίο, δίνουμε απλώς το πεδίο και υποδεικνύουμε αν
  πρόκειται για αύξοντα (`1`) ή φθίνοντα (`-1`) ευρετήριο:
  ```javascript
  db.restaurants.createIndex( { "cuisine": 1 } )
  ```
  
* Στη συγκεκριμένη περίπτωση θα πάρουμε:
  ```
  {
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
  }
  ```
  
<div class="notes">

Δεν είναι απαραίτητο να υπάρχει μια συλλογή όταν δημιουργούμε ένα
πεδίο επάνω της· αν δεν υπάρχει, θα δημιουργηθεί αυτομάτως εκείνη τη
στιγμή. Στην περίπτωση αυτή, στην απάντηση θα είχαμε:
```javascript
"createdCollectionAutomatically" : true
```

</div>


## Δημιουργία σύνθετου ευρετηρίου

* Για να δημιουργήσουμε ένα σύνθετο ευρετήριο, δηλαδή ένα ευρετήριο σε
  περισσότερα από ένα πεδία, παραθέτουμε τα πεδία με τη σειρά που θα
  είναι στο ευρετήριο:
  ```javascript
  db.restaurants.createIndex( { "cuisine": 1, "address.zipcode": -1 } )
  ```
  
* Τώρα θα πάρουμε:
  ```javascript
  {
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 2,
	"numIndexesAfter" : 3,
	"ok" : 1
  }
  ```


## Διαγραφή δεδομένων

* Για να διαγράψουμε έγγραφα από μία συλλογή χρησιμοποιούμε τη μέθοδο
  `remove()`. 
  
* Στην κλήση της μεθόδου δίνουμε ένα έγγραφο που δρα ως φίλτρο για την
  εύρεση των εγγράφων που θέλουμε να διαγράψουμε.
  

## Διαγραφή όλων των επιλεγμένων εγγράφων

* Για να διαγράψουμε όλα τα εστιατόρια στο Μανχάτταν, δίνουμε:
  ```javascript
  db.restaurants.remove( { "borough": "Manhattan" } )
  ```
  
* Θα δούμε στην οθόνη μας τον αριθμό των διαγραφέντων:
  ```javascript
  WriteResult({ "nRemoved" : 10260 })
  ```
  
* Η διαγραφή πολλαπλών εγγράφων δεν εγγυάται την ατομικότητα
  (atomicity) ούτε την απομόνωση (isolation).
  

## Διαγραφή ενός εγγράφου (1)

* Για να διαγράψουμε ένα μόνο από τα επιλεγμένα έγγραφα, δίνουμε την
  παράμετρο `justOne`:
  ```javascript
  db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )
  ```
  
* Στην οθόνη μας θα δούμε:
  ```javascript
  WriteResult({ "nRemoved" : 1 })
  ```
  
## Διαγραφή ενός εγγράφου (2)
  
* Δεν προσδιορίζουμε ποιο από τα επιλεγμένα έγγραφα θα διαγραφεί. 

* Αν θέλουμε να κάνουμε κάτι τέτοιο, πρέπει να χρησιμοποιήσουμε τη
  μέθοδο
  [`findAndModify()`](https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/#findandmodify-wrapper-sorted-remove):
  ```javascript
  db.restaurants.findAndModify( 
    { 
      query: { "borough": "Queens" }, 
      sort: { "grades.grade": -1 }, 
      remove: true 
    }
  )
  ```
  
* Αυτό μας επιστρέφει το αντικείμενο που διαγράφηκε:
  ```javascript
  {
        "_id" : ObjectId("5a2ffca1284dfdb9acf54fa9"),
        "address" : {
            "building" : "8825",
            "coord" : [
                -73.8803827,
                40.7643124
            ],
            "street" : "Astoria Boulevard",
            "zipcode" : "11369"
        },
        "borough" : "Queens",
        "cuisine" : "American",
        "grades" : [
            {
                "date" : ISODate("2014-11-15T00:00:00Z"),
                "grade" : "Z",
                "score" : 38
            },
            {
                "date" : ISODate("2014-05-02T00:00:00Z"),
                "grade" : "A",
                "score" : 10
            },
            {
                "date" : ISODate("2013-03-02T00:00:00Z"),
                "grade" : "A",
                "score" : 7
            },
            {
                "date" : ISODate("2012-02-10T00:00:00Z"),
                "grade" : "A",
                "score" : 13
            }
        ],
        "name" : "Brunos On The Boulevard",
        "restaurant_id" : "40356151"
  }
  ```


## Διαγραφή όλων των εγγράφων μιας συλλογής

* Για να διαγράψουμε όλα τα έγγραφα μιας συλλογής, δίνουμε ένα κενό
  έγγραφο ως κριτήριο:
  ```javascript
  db.restaurants.remove( { } )
  ```
  
* Θα πάρουμε:
  ```javascript
  WriteResult({ "nRemoved" : 15098 })
  ```
  
## Διαγραφή συλλογής

* Η μέθοδος `remove()` διαγράφει έγγραφα, αλλά όχι την ίδια τη
  συλλογή. 
  
* Η συλλογή, όπως και σχετικά ευρετήρια, παραμένουν.

* Μπορεί να είναι γρηγορότερο να διαγράψουμε όλη τη συλλογή και να
  ξαναφτιάξουμε τα ευρετήρια από την αρχή.
  
* Αυτό το κάνουμε με τη μέθοδο `drop()`:
  ```javascript
  db.restaurants.drop()
  ```
  
* Στην οθόνη θα δούμε:
  ```javascript
  true
  ```
