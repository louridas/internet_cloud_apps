% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# React 3

## Συνεργασία Εξαρτημάτων

* Στο μέχρι τώρα παράδειγμα αποθηκεύσαμε τη λίστα των βιβλίων που
  δείχνει το εξάρτημά μας σε μία μεταβλητή στο πρόγραμμά μας.

## Δημιουργία Εφαρμογής

* Για να δημιουργήσουμε την εφαρμογή δίνουμε κατά τα γνωστά:

   ```bash
   npx create-react-app converter
   ```

## Μετατροπέας Μονάδων

* Ξεκινάμε την κλάση του μετατροπέα.

   ```javascript
   import React, { Component } from 'react';
   import './App.css';

   class Converter extends Component {
     constructor(props) {
       super(props);
       this.handleChange = this.handleChange.bind(this);
       this.state = { measurement: '' };
     }

     handleChange(e) {
       this.setState({ measurement: e.target.value});
     }

     render() {
       const measurement = this.state.measurement;
       return (
         <fieldset>
           <legend>Enter {this.props.quantity} in <span> </span>
             {this.props.unit}:</legend>
           <input
             value={measurement}
             onChange={this.handleChange}
           />
         </fieldset>
       );
     }
   }

   class App extends Component {
     render() {
       return (
         <div className="App">
           <Converter
             quantity="Temperature"
             unit="Celcius"
           />
         </div>
       );
     }
   }

   export default App;
   ```
   
## Εξάρτημα Εισόδου

* Αυτή τη στιγμή ο μετατροπέας μας διαβάζει μόνο μία μονάδα.

* Θα προσθέσουμε λοιπόν και τη δεύτερη.

* Αφού θα έχουμε δύο εισόδους, μία για κάθε μονάδα, αξίζει τον κόπο να
  φτιάξουμε ένα ξεχωριστό εξάρτημα για είσοδο.
  
  
   ```javascript
   class MeasurementInput extends Component {
     constructor(props) {
       super(props);
       this.handleChange = this.handleChange.bind(this);
       this.state = {measurement: ''};
     }

     handleChange(e) {
       this.setState({measurement: e.target.value});
     }

     render() {
       const quantity = this.props.quantity;
       const unit = this.props.unit;
       const measurement = this.state.measurement;

       return (
         <fieldset>
           <legend>Enter {quantity} in {unit}:</legend>
           <input
             value={measurement}
             onChange={this.handleChange}
           />
         </fieldset>
       );
     }
   }
   ```

## Μετατροπέας με Εξαρτήματα Εισόδου

* Τώρα μπορούμε να απλοποιήσουμε τον μετατροπέα ώστε να χρησιμοποιεί
  τα δύο εξαρτήματα εισόδου:
  
   ```javascript
   class Converter extends Component {

     render() {
       const quantity = this.props.quantity;
       const firstUnit = this.props.firstUnit;
       const secondUnit = this.props.secondUnit;
       return (
         <div>
           <MeasurementInput
             quantity={quantity}
             unit={firstUnit}
           />
           <MeasurementInput
             quantity={quantity}
             unit={secondUnit}
           />
         </div>
       );
     }
   }
   ```

## Κλάση Εφαρμογής

* Η κλάση της εφαρμογής τότε γίνεται απλώς:

   ```javascript
   class App extends Component {
     render() {
       return (
         <div className="App">
           <Converter 
             quantity="Temperature"
             firstUnit="Celcius"
             secondUnit="Fahrenheit"
           />
         </div>
       );
     }
   }
   ```
   
## Συναρτήσεις Μετατροπών

* Θα χρειαστούμε δύο συναρτήσεις μετατροπών.

* Μία από βαθμούς Κελσίου σε Φαρενάιτ:

   ```javascript
   function toCelsius(fahrenheit) {
     return (fahrenheit - 32) * 5 / 9;
   }
   ```
   
* Και μία από βαθμούς Φαρενάιτ σε Κελσίου:

   ```javascript
   function toFahrenheit(celsius) {
     return (celsius * 9 / 5) + 32;
   }
   ```

## Μετατροπέας

* Η μετατροπή θα γίνεται από μία τρίτη συνάρτηση, η οποία θα παίρνει
  μία μέτρηση και μία συνάρτηση ως παραμέτρους.
  
  
* Η συνάρτηση θα επιστρέφει τη μέτρηση αφού τη μετατρέψει και
  στρογγυλοποίησει σε τρία δεκαδικά ψηφία:
  
   ```javascript
   function tryConvert(measurement, convert) {
     const input = parseFloat(measurement);
     if (Number.isNaN(input)) {
       return '';
     }
     const output = convert(input);
     const rounded = Math.round(output * 1000) / 1000;
     return rounded.toString();
   }
   ```
   
<div class="notes">

Η συνάρτηση `parseFloat()` παίρνει ως παράμετρο μια συμβολοσειρά και
προσπαθεί να την μετατρέψει σε πραγματικό αριθμό. Αν αυτό δεν γίνεται,
επιστρέφει την τιμή `NaN` (Not-A-Number).

Η συνάρτηση `Math.round()` στρογγυλοποιεί την παράμετρό της στον
κοντινότερο ακέραιο. Οπότε για να πάρουμε τρία δεκαδικά ψηφία,
πολλαπλασιάζουμε με το 1000, στρογγυλοποιούμε, και διαιρούμε με το
1000.

</div>

## Ανύψωση

* Τώρα το κάθε `MeasurementInput` διατηρεί τη δική του μέτρηση.

* Έτσι έχουμε δύο ανεξάρτητες μετρήσεις.

* Εμείς όμως θέλουμε να έχουμε *μία*.

* Για να γίνει αυτό, θα πρέπει να μεταφέρουμε την κατάσταση που μας
  ενδιαφέρει από τα επιμέρους εξαρτήματα σε έναν κοινό τους πρόγονο.
  
* Αυτό ονομάζεται *ανύψωση* (lifting state up).


## Ανύψωση στον Μετατροπέα (1)

* Θα αφαιρέσουμε λοιπόν το `measurement` από την κατάσταση του
  `MeasurementInput` και θα την βάλουμε στην κατάσταση του
  `Converter`.
  
* Ο `Converter` θα την περνάει σε κάθε `MeasurementInput` μέσω
  ιδιότητας.
  
* Όταν ο χρήστης εισάγει μια τιμή, θα καλούμε έναν χειριστή του
  `Converter` προκειμένου να αλλάζει η κατάστασή του.
  
* Ο `Converter` θα περνάει τον χειριστή αυτό σε κάθε
  `MeasurementInput` μέσω ιδιότητας.
  
## Ανύψωση στον Μετατροπέα (2)

* Το εξάρτημα `MeasurementInput` θα γίνει:

   ```javascript
   class MeasurementInput extends Component {
     constructor(props) {
       super(props);
       this.handleChange = this.handleChange.bind(this);
     }

     handleChange(e) {
       this.props.onMeasurementChange(e.target.value);
     }

     render() {
       const quantity = this.props.quantity;
       const unit = this.props.unit;
       const measurement = this.state.measurement;

       return (
         <fieldset>
           <legend>Enter {quantity} in {unit}:</legend>
           <input
             value={measurement}
             onChange={this.handleChange}
           />
         </fieldset>
       );
     }
   ```

##  Ιδιότητες Εξαρτήματος `Converter`

* Το εξάρτημα `Converter` θα έχει τώρα τις εξής ιδιότητες:

  * `quantity`: το φυσικό μέγεθος
  
  * `firstUnit`: την πρώτη μονάδα μέτρησης
  
  * `secondUnit`: τη δεύτερη μονάδα μέτρησης
  
  * `firstUnitConverter`: τη συνάρτηση μετατροπής στην πρώτη μονάδα
    μέτρησης
    
  * `secondUnitConverter`: τη συνάρτηση μετατροπής στη δεύτερη μονάδα
    μέτρησης
    
    
## Το Εξάρτημα `App`

* Σύμφωνα με τα παραπάνω, το εξάρτημα `App` θα είναι:

   ```javascript
   class App extends Component {
     render() {
       return (
         <div className="App">
           <Converter 
             quantity="Temperature"
             firstUnit="Celsius"
             secondUnit="Fahrenheit"
             firstUnitConverter={toCelsius}
             secondUnitConverter={toFahrenheit}
           />
         </div>
       );
     }
   }
   ```

## Το Εξάρτημα `Converter`

* Όλα τα επιμέρους συνδέονται μέσα στον `Converter`:

   ```javascript
   class Converter extends Component {

     constructor(props) {
       super(props);
       this.handleFirstUnitChange = this.handleFirstUnitChange.bind(this);
       this.handleSecondUnitChange = this.handleSecondUnitChange.bind(this);
       this.state = {measurement: '', unit: 0};
     }

     handleFirstUnitChange(measurement) {
       this.setState({unit: 0, measurement});
     }

     handleSecondUnitChange(measurement) {
       this.setState({unit: 1, measurement});
     }

     render() {
       const quantity = this.props.quantity;
       const firstUnit = this.props.firstUnit;
       const secondUnit = this.props.secondUnit;
       const firstUnitConverter = this.props.firstUnitConverter;
       const secondUnitConverter = this.props.secondUnitConverter;

       const measurement = this.state.measurement;
       const unit = this.state.unit;
       const firstMeasurement = unit == 1
             ? tryConvert(measurement, firstUnitConverter)
             : measurement;
       const secondMeasurement = unit == 0
             ? tryConvert(measurement, secondUnitConverter)
             : measurement;

       return (
         <div>
           <MeasurementInput
             quantity={quantity}
             unit={firstUnit}
                 measurement={firstMeasurement}
                 onMeasurementChange={this.handleFirstUnitChange}
           />
           <MeasurementInput
             quantity={quantity}
             unit={secondUnit}
                 measurement={secondMeasurement}
                 onMeasurementChange={this.handleSecondUnitChange}
           />
         </div>
       );
     }
   }
   ```
