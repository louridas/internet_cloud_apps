% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# Promises

## Το Μοντέλο «Παραλληλίας» στην JavaScript

* H JavaScript στην πραγματικότητα τρέχει σε ένα νήμα (thread).

* Κατά τη διάρκεια εκτέλεσης ενός προγράμματος:

   * οι συναρτήσεις που καλούνται τοποθετούνται σε μία *στίβα*
   
   * μνήμη μπορεί να αποδοθεί δυναμικά από τον *σωρό* (heap)
  
   * η JavaScript διατηρεί και μία *ουρά* (queue), με μία λίστα
     μηνυμάτων προς επεξεργασία
     

![Στίβα Σωρός και
Ουρά](https://developer.mozilla.org/files/4617/default.svg "Στίβα Σωρός και Ουρά")


## Βρόχος Γεγονότων

* Η JavaScript εκτελεί ένα [*βρόχο γεγονότων* (event
  loop)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#Event_loop):
  
   ```javascript
   while (queue.waitForMessage()) {
     queue.processNextMessage();
   }
   ```

* Η JavaScript χειρίζεται ένα-ένα τα μηνύματα, με χρονολογική σειρά
  (παλαιότερα πρώτα). 
  
* Κάθε μήνυμα είναι συνδεμένο με μια συνάρτηση χειριστή.

* Η JavaScript εκτελεί τη συνάρτηση *μέχρι να τερματίσει*.

* Κατά την εκτέλεσή της, μπορεί να εισάγει νέα μηνύματα στο βρόχο.


## Callbacks

* Ένα callback είναι μια συνάρτηση που δίνουμε ως παράμετρο σε μία
  άλλη συνάρτηση.
  
* Η δεύτερη συνάρτηση θα καλέσει την πρώτη προκειμένου να ολοκληρωθεί
  κάποια λειτουργία.
  
* Για
  [παράδειγμα](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function): 
   
    ```javascript
    function greeting(name) {
      alert('Hello ' + name);
    }

    function processUserInput(callback) {
      var name = prompt('Please enter your name.');
      callback(name);
    }

    processUserInput(greeting);
    ```

## Σύγχρονα και Ασύγχρονα Callbacks

* Το προηγούμενο callback είναι σύγχρονο, γιατί εκτελείται αμέσως.

* Συνήθως τα callbacks τα χρησιμοποιούμε για να συνεχίσουμε την
  εκτέλεση του κώδικα αφού έχει ολοκληρωθεί κάποια *ασύγχρονη*
  λειτουργία.
  
## Ασύγχρονο Callback

* Η μέθοδος `Geolocation.getCurrentPosition()` μπορεί να μας δώσει τη
  θέση της συσκευής μας και παίρνει τρεις παραμέτρους:
  
   ```javascript
   navigator.geolocation.getCurrentPosition(success[, error[, [options]])
   ```
  
* Μπορούμε να δούμε πώς λειτουργεί
  [παρακάτω](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition):
  

   ```javascript
   var options = {
     enableHighAccuracy: true,
     timeout: 10000,
     maximumAge: 0
   };

   function success(pos) {
     var crd = pos.coords;

     console.log('Your current position is:');
     console.log(`Latitude : ${crd.latitude}`);
     console.log(`Longitude: ${crd.longitude}`);
     console.log(`Accuracy at more or less ${crd.accuracy} meters.`);
   }

   function error(err) {
     console.warn(`ERROR(${err.code}): ${err.message}`);
   }

   console.log('Calling geolocation API...');
   navigator.geolocation.getCurrentPosition(success, error, options);
   console.log('Called geolocation API.')
   ```
   
<div class="notes">

Η μέθοδος `navigator.geolocation.getCurrentPosition(success[, error[,
[options]])` μπορεί να πάρει αρκετή ώρα να εκτελεστεί. Για να μην
παγώσει το πρόγραμμά μας (και ο browser), επιστρέφει αμέσως, και
εκτελείται το υπόλοιπο πρόγραμμά μας.

Όταν ολοκληρωθεί με επιτυχία, τότε θα καλέσει τη συνάρτηση callback
`success`. Αν δεν ολοκληρωθεί με επιτυχία, θα καλέσει τη συνάρτηση
callback `error`. Αν τρέξουμε τον παραπάνω κώδικα, θα δούμε ότι η
έξοδος είναι κάτι όπως:

```
Calling geolocation API...
Called geolocation API.
Your current position is:
Latitude : 50.8521286
Longitude: 4.365223299999999
Accuracy at more or less 107 meters.
```

</div>

## Γιατί Χρειαζόμαστε Callbacks; (1)

* Για να καταλάβουμε γιατί χρειαζόμαστε callbacks, ας δούμε τι γίνεται
  αν έχουμε τρεις συναρτήσεις οι οποίες εκτελούν μια ασύγχρονη
  λειτουργία και θέλουμε να τις εκτελέσουμε στη σειρά.
  
   ```javascript
   function doSomething() {
     setTimeout(function() {
       var result = "didSomething"
       console.log(result);
       return result;
     }, 300);
   }

   function doSomethingElse(value) {
     console.log("Got " + value);
     setTimeout(function() {
       var result = "didSomethingElse";
       console.log(result);
       return result;
     }, 300);
   }

   function doThirdThing(value, successCallback, failureCallback) {
     console.log("Got " + value);
     setTimeout(function() {
       var result = "didThirdThing";
       console.log(result);
       return result;
     }, 300);
   }

   var result1 = doSomething();
   var result2 = doSomethingElse(result2);
   var result3 = doThirdThing(result3);
   ```

## Γιατί Χρειαζόμαστε Callbacks; (2)

* Αν εκτελέσουμε τον παραπάνω κώδικα, θα πάρουμε:

   ```
   Got undefined
   Got undefined
   didSomething 
   didSomethingElse
   didThirdThing
   ```

## Γιατί Χρειαζόμαστε Callbacks; (3)

* Για να εκτελεστούν οι τρεις συναρτήσεις με τη σειρά, πρέπει η μία να
  καλεί την άλλη, όταν ολοκληρώνεται.

* Αυτό δυστυχώς οδηγεί στη λεγόμενη *πυραμίδα της καταστροφής*
  (pyramid of doom):
  
   ```javascript
   function doSomething(successCallback, failureCallback) {
     setTimeout(function() {
       var result = "didSomething"
       console.log(result);
       successCallback(result); // we assume always success, no call
                                // to failureCallback
     }, 300);
   }

   function doSomethingElse(value, successCallback, failureCallback) {
     setTimeout(function() {
       console.log("Got " + value);
       var result = "didSomethingElse";
       console.log(result);
       successCallback(result); // we assume always success, no call
                                // to failureCallback
     }, 300);
   }

   function doThirdThing(value, successCallback, failureCallback) {
     setTimeout(function() {
       console.log("Got " + value);
       var result = "didThirdThing";
       console.log(result);
       successCallback(result);  // we assume always success, no call
                                 // to failureCallback
     }, 300);
   }

   function failureCallback() {
     console.log("Failed.");
   }

   doSomething(function(result) {
     doSomethingElse(result, function(newResult) {
       doThirdThing(newResult, function(finalResult) {
         console.log('Got the final result: ' + finalResult);
       }, failureCallback);
     }, failureCallback);
   }, failureCallback);
   ```

## Υποσχέσεις στην JavaScript

* Οι υποσχέσεις (promises) είναι ένας μηχανισμός να απλοποιήσουμε τον
  ασύγχρονο προγραμματισμό στη JavaScript.

* Μια υπόσχεση είναι ένα αντικείμενο τύπου `Promise`, το οποίο μπορεί
  να βρίσκεται σε μία από τις παρακάτω τρεις καταστάσεις:
  
    * σε εκκρεμότητα (pending)
    
    * εκπληρωμένη (fulfilled)
    
    * αθετημένη (rejected)


## Εκπλήρωση & Αθέτηση

* Όταν εκπληρωθεί ή αθετηθεί η υπόσχεση καλούνται οι *χειριστές*
  (handlers) που έχουμε ορίσει.
  
* Οι χειριστές μιας υπόσχεσης ορίζονται με τη μέθοδο `then()`, με την
  οποία δίνουμε έναν χειριστή που θα κληθεί στην εκπλήρωση και έναν
  που θα κληθεί στην αθέτηση.
  
## Εκπλήρωση, Αθέτηση, Χειριστές

![Υπόσχεση και Χειριστές](https://mdn.mozillademos.org/files/15911/promises.png "Υπόσχεση και Χειριστές")


## Από Callbacks σε Υποσχέσεις (1)

* [Έστω](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
  ότι είχαμε μια συνάρτηση, `createAudioFileAsync()`, η οποία
  δημιουργεί ασύγρονα ένα αρχείο ήχου.
  
* Αφού είναι ασύγχρονη, θα είναι φτιαγμένη ώστε να δέχεται δύο
  callbacks, ένα για την επιτυχή λειτουργία και ένα για την περίπτωση
  προβλημάτων:
  
   ```javascript
   function successCallback(result) {
     console.log("Audio file ready at URL: " + result);
   }

   function failureCallback(error) {
     console.log("Error generating audio file: " + error);
   }

   createAudioFileAsync(audioSettings, successCallback, failureCallback);
   ```

## Από Callbacks σε Υποσχέσεις (2)

* Αν η `createAudioFileSync()` είχε γραφτεί χρησιμοποιώντας
  υποσχέσεις, θα γράφαμε απλώς:
  
   ```javascript
   createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
   ```
   
* Αυτό είναι συντόμευση του:

   ```javascript
   const promise = createAudioFileAsync(audioSettings); 
   promise.then(successCallback, failureCallback);
   ```

## Διασύνδεση Υποσχέσεων

* Πολλές φορές χρειάζεται να συνδέσουμε στη ασύγχρονες λειτουργίες,
  ώστε όταν ολοκληρώνεται η μία να ξεκινά η άλλη.
  
* Αυτό μπορούμε να το κάνουμε φτιάχνοντας μια [*αλυσίδα υποσχέσεων*
  (promise chain)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#Chaining).
  
* Για να γίνει αυτό, η μέθοδος `then()` επιστρέφει μια *νέα υπόσχεση*:

   ```javascript
   const promise = doSomething();
   const promise2 = promise.then(successCallback, failureCallback);
   ```
   
* Ή πιο σύντομα:

   ```javascript
   const promise2 = doSomething().then(successCallback, failureCallback);
   ```
   
<div class="notes">

Αν ολοκληρωθεί με επιτυχία η υπόσχεση `promise` τότε θα κληθεί το
`successCallback` το οποίο έχουμε δώσει στη μέθοδο `then`. Όταν
ολοκληρωθεί αυτό, θα ολοκληρωθεί η υπόσχεση `promise2`. Αν δεν
ολοκληρωθεί με επιτυχία η υπόσχεση `promise`, τότε θα κληθεί το
`failureCallback` το οποίο έχουμε δώσει στην υπόσχεση `promise2`.

Το `successCallback` μπορεί να επιστρέψει άλλη υπόσχεση, οπότε μετά
την ολοκλήρωση της `promise2` σειρά θα έχει η νέα αυτή υπόσχεση, κ.λπ.
Διαφορετικά, αν επιστρέψει μια τιμή, η `promise2` ολοκληρώνεται με
αυτήν την τιμή· αν πετάξει μια εξαίρεση λάθος, η `promise2` θα
απορριφθεί. 

Επίσης, θα μπορούσαμε μετά το πρώτο `then()` να προσθέσουμε και άλλο
στη σειρά, κ.λπ.

</div>


## Η Μέθοδος `then()`

* Η μέθοδος `then()` όπως είδαμε πέρνει δύο παραμέτρους, callbacks:

    * μία που θα κληθεί αν η υπόσχεση εκπληρωθεί 
    
    * μία που θα κληθεί αν η υπόσχεση αθετηθεί
    
* Αυτές είναι προαιρετικές. 

* Αντί για:

   ```javascript
   then(null, failureCallback)
   ```
   
   γράφουμε το συντομότερο:
   
   ```javascript
   catch(failureCallback)
   ```

## Υποσχέσεις αντί Πυραμίδας Καταστροφής

* Αν λοιπόν χρησιμοποιούσαμε υποσχέσεις, αντί για την πυραμίδα της
  καταστροφής θα είχαμε:
  
   ```javascript
   doSomething().then(function(result) {
     return doSomethingElse(result);
   })
   .then(function(newResult) {
     return doThirdThing(newResult);
   })
   .then(function(finalResult) {
     console.log('Got the final result: ' + finalResult);
   })
   .catch(failureCallback);
   ```

## Κατασκευή Υποσχέσεων

* Είδαμε ότι οι υποσχέσεις κατασκευάζονται με τη μέθοδο `then()`, την
  οποία καλούμε σε μία υπάρχουσα υπόσχεση.
  
* Τις περισσότερες φορές, αυτό είναι αρκετό: χρησιμοποιούμε
  βιβλιοθήκες που δημιουργούν υποσχέσεις τις οποίς μπορούμε να
  συνδέσμουμε με `then()`.
  

## Κατασκευαστές Υποσχέσεων (1)

* Οι υποσχέσεις είναι αντικείμενα που κατασκευάζονται με κατασκευαστές
  του
  [τύπου](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):
  
   ```javascript
   new Promise( /* executor */ function(resolve, reject) { ... } );
   ```
* Στον κατασκευαστή περνάμε μια συνάρτηση που ονομάζεται *εκτελεστής*
  (executor). 
  
* Ο εκτελεστής παίρνει δύο παραμέτρους, `resolve` και `reject`.

* Ο εκτελεστής εκτελείται αμέσως.

## Κατασκευαστής Υποσχέσεων (2)

* Όταν ο εκτελεστής τελειώσει τη δουλειά του, καλεί είτε τη συνάρτηση
  `resolve()` είτε τη συνάρτηση `reject()`.
  
* Αν καλέσει τη `resolve()`, η υπόσχεση εκπληρώνεται.
  
* Αν καλέσει τη `reject()`, η υπόσχεση αθετείται.

* Τις δύο αυτές συναρτήσεις δεν τις φτιάχνουμε εμείς· τις διαθέτει η
  JavaScript virtual machine.

## Παράδειγμα Κατασκευαστή

* Για
  [παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):
  
   ```javascript
   var promise1 = new Promise(function(resolve, reject) {
     setTimeout(function() {
       resolve('foo');
     }, 300);
   });

   promise1.then(function(value) {
     console.log(value);
     // expected output: "foo"
   });

   console.log(promise1);
   // expected output: [object Promise]
   ```

## Υπόσχεση σε AJAX

* Ένα πιο [ρεαλιστικό
  παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Creating_a_Promise)
  δείχνει πώς μπορούμε να μετατρέψουμε κλήσεις AJAX σε υποσχέσεις:
  
   ```javascript
   function myAsyncFunction(url) {
     return new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();
       xhr.open("GET", url); // initialize the request
       xhr.onload = () => resolve(xhr.responseText);
       xhr.onerror = () => reject(xhr.statusText);
       xhr.send(); // issue the request
     });
   }
   ```

## Υποσχέσεις αντί Πυραμίδας (1)

* Μπορούμε να επανέλθουμε στο παράδειγμα που χρησιμοποιήσαμε
  υποσχέσεις αντί της πυραμίδας καταστροφής.
  
* Γράφουμε τις ασύγχρονες συναρτήσεις ώστε να επιστρέφουν υποσχέσεις.

## Υποσχέσεις αντί Πυραμίδας (2)

* Συνήθως, όπως είπαμε, αυτό το έχουν κάνει ήδη οι συγγραφείς των
  βιβλιοθηκών που χρησιμοποιούμε, αλλά ιδού πώς γίνεται:
  
   ```javascript
   function doSomething() {
     return new Promise(resolve => {
       setTimeout(function() {
         var result = "didSomething"
         console.log(result);
         resolve(result);
       }, 300);
     });
   }

   function doSomethingElse(value) {
     return new Promise(resolve => {
       setTimeout(function() {
         console.log("Got " + value);
         var result = "didSomethingElse";
         console.log(result);
         resolve(result);
       }, 300);
     });
   }

   function doThirdThing(value) {
     return new Promise(resolve => {
       setTimeout(function() {
         console.log("Got " + value);
         var result = "didThirdThing";
         console.log(result);
         resolve(result);
       }, 300);
     });
   }

   function failureCallback() {
     console.log("Failed.");
   }

   doSomething()
     .then(result => doSomethingElse(result))
     .then(newResult => doThirdThing(newResult))
     .then(finalResult => {
       console.log('Got the final result: ' + finalResult);
     })
     .catch(failureCallback);
   ```

<div class="notes">

Μπορείτε να προσέξετε ότι χρησιμοποιούμε συντομευμένες συναρτήσεις στα
`then()`, ώστε το αποτέλεσμα είναι πολύ κομψότερο.

</div>


## Διάδοση Λαθών

* Σε περίπτωση που εμφανιστεί ένα λάθος κατά την εκτέλεση μιας
  υπόσχεσης σε αλυσίδα υποσχέσεων, αυτή αθετείται και εκτελείται κατ'
  ευθείαν το αντίστοιχο callback στο [τέλος της
  αλυσίδας](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#Error_propagation):
  
   ```javascript
   doSomething()
     .then(result => doSomethingElse(result))
     .then(newResult => doThirdThing(newResult))
     .then(finalResult => console.log(`Got the final result: ${finalResult}`))
     .catch(failureCallback);
  ```

* Η λογική είναι αντίστοιχη με αυτή που χρησιμοποιούμε σε σύγχρονο
  κώδικα:
  
   ```javascript
   try {
     const result = syncDoSomething();
     const newResult = syncDoSomethingElse(result);
     const finalResult = syncDoThirdThing(newResult);
     console.log(`Got the final result: ${finalResult}`);
   } catch(error) {
     failureCallback(error);
   }
   ```

## Αλυσίδα μετά από Catch

* Είναι επίσης δυνατόν να συνεχίσουμε την αλυσίδα μετά από μια
  αποτυχία, [όπως για
  παράδειγμα](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#Chaining_after_a_catch):
  
   ```javascript
   new Promise((resolve, reject) => {
       console.log('Initial');

       resolve();
   })
   .then(() => {
       throw new Error('Something failed');

       console.log('Do this');
   })
   .catch(() => {
       console.log('Do that');
   })
   .then(() => {
       console.log('Do this, no matter what happened before');
   });
   ```

* Το αποτέλεσμα θα είναι:

   ```
   Initial
   Do that
   Do this, no matter what happened before
   ```
