% Διαδικτυακές και Νεφοϋπολογιστικές Εφαρμογές
% Αν. Καθηγητής Π. Λουρίδας
% Οικονομικό Πανεπιστήμιο Αθηνών

# React 3

## Συνεργασία Εξαρτημάτων

* Προκειμένου να χρησιμοποιήσουμε αποδοτικά το React θα πρέπει να
  καταλάβουμε τη λογική του.
  
* Συγκεκριμένα, θα πρέπει να καταλάβουμε με ποιον τρόπο συνεργάζονται
  τα εξαρτήματα μεταξύ τους.
  
* Θα προσαρμόσουμε το [αντίστοιχο
  παράδειγμα](https://reactjs.org/docs/lifting-state-up.html) της
  τεκμηρίωσης του React.

## Δημιουργία Εφαρμογής

* Για να δημιουργήσουμε την εφαρμογή δίνουμε κατά τα γνωστά:

   ```bash
   npx create-react-app converters
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
       const measurement = this.props.measurement;

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
       const firstMeasurement = unit === 1
             ? tryConvert(measurement, firstUnitConverter)
             : measurement;
       const secondMeasurement = unit === 0
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

## Προσθήκη Bootstrap

* Ο ευκολότερος τρόπος να χρησιμοποιήσουμε το Bootstrap με το React
  είναι μέσω του [reactstrap](https://reactstrap.github.io/).
  
* Για να το προσθέσουμε στην εφαρμογή μας κατ' αρχήν δίνουμε:

   ```
       npm install reactstrap bootstrap@4
   ```

* Εισάγουμε τα στυλ του Boostrap βάζοντας στην αρχή `src/index.js`:

   ```javascript
   import 'bootstrap/dist/css/bootstrap.css';
   ```

* Αν τώρα τρέξουμε την εφαρμογή μας, θα δούμε ότι η εμφάνιση έχει
  σουλουπωθεί κάπως.

<div class="notes">

Σε περίπτωση που εμφανιστεί κάποια προειδοποίηση όπως:

```
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
```

δίνουμε:

```bash
npm install ajv
```

Ομοίως αν εμφανιστεί κάτι όπως:

```
npm WARN bootstrap@4.1.3 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
```

δίνουμε:

```bash
npm install jquery
```
</div>

## Εξαρτήματα ως Συναρτήσεις

* Ένα ιδίωμα που απαντάται στο React είναι να ορίζουμε ολόκληρα
  εξαρτήματα ως συναρτήσεις.
  
* Έτσι, ορίζουμε τον μετατροπέα θερμοκρασιών ως εξής:

   ```javascript
   const TemperatureConverter = () => (
     <Converter 
       quantity="Temperature"
       firstUnit="Celsius"
       secondUnit="Fahrenheit"
       firstUnitConverter={toCelsius}
       secondUnitConverter={toFahrenheit}
     />
   );
   ```

## Μετατροπέας Αποστάσεων

* Ας προσθέσουμε και έναν νέο μετατροπέα, μεταξύ χιλιομέτρων και
  μιλίων:
  
   ```javascript
   const DistanceConverter = () => (
     <Converter 
       quantity="Distance"
       firstUnit="Kilometers"
       secondUnit="Miles"
       firstUnitConverter={toKilometers}
       secondUnitConverter={toMiles}
     /> 
   );
   ```
   
## Συναρτήσεις Μετατροπής Αποστάσεων

* Για να δουλέψει ο μετατροπέας αποστάσεων θα χρειαστούμε δύο
  συναρτήσεις. 
  
* Μία από χιλιόμετρα σε μίλια:

   ```javascript
   function toKilometers(miles) {
     return (miles / 1.60934);
   }
   ```

* Και μία από μίλια σε χιλιόμετρα:

   ```javascript
   function toMiles(kilometers) {
    return (kilometers * 1.60934);
   }
   ```

## Προσθήκη Νέων Μετατροπέων στην Εφαρμογή

* Για να τους δούμε εν δράσει, αρκεί να αλλάξουμε το εξάρτημα `App` ως
  εξής:
  
   ```javascript
   class App extends Component {
     render() {
       return (
         <div className="App">
           {TemperatureConverter()}
           {DistanceConverter()}
         </div>
       );
     }
   }
   ```

## Μετατροπέας Μονάδων Ενέργειας

* Τέλος, ας προσθέσουμε και έναν νέο μετατροπέα, μεταξύ Joules και
  θερμίδων:
  
   ```javascript
   const EnergyConverter = () => (
     <Converter 
       quantity="Energy"
       firstUnit="Joules"
       secondUnit="Calories"
       firstUnitConverter={toJoules}
       secondUnitConverter={toCalories}
     /> 
   );
   ```
   
## Συναρτήσεις Μετατροπής Ενέργειας

* Για να δουλέψει ο μετατροπέας ενέργειας θα χρειαστούμε δύο
  συναρτήσεις. 
  
* Μία από Joules σε θερμίδες:

   ```javascript
   function toCalories(joules) {
     return (joules * 4.184);
   }
   ```

* Και μία από Θερμίδες σε Joules:

   ```javascript
   function toJoules(calories) {
    return (calories / 4.184);
   }
   ```

## Προσθήκη Νέων Μετατροπέων στην Εφαρμογή

* Για να τους δούμε όλους εν δράσει, αρκεί να αλλάξουμε το εξάρτημα `App` ως
  εξής:
  
   ```javascript
   class App extends Component {
     render() {
       return (
         <div className="App">
           {TemperatureConverter()}
           {DistanceConverter()}
           {EnergyConverter()}
         </div>
       );
     }
   }
   ```

## Δρομολόγηση

* Τώρα οι τρεις μετατροπείς (και στο μέλλον θα μπορούσαμε να έχουμε
  και άλλους), εμφανίζονται ο ένας κάτω από τον άλλο.
  
* Είναι καλύτερο να εμφανίζεται ο ένας *αντί* για τον άλλο.

* Για να καταφέρουμε κάτι τέτοιο, πρέπει να εφαρμόσουμε *δρομολόγηση*
  στο front-end.
  
## Εφαρμογές μίας Σελίδας

* Έχουμε δει πώς δουλεύει η δρομολόγηση στο backend (π.χ. Django,
  Flask).
  
* Στο front-end θέλουμε να πετύχουμε κάτι αντίστοιχο.

* Ο χρήστης θα πλοηγείται σε διαφορετικές «σελίδες» ακολουθώντας
  συνδέσμους και URLs.
  
* Προσέξτε τα εισαγωγικά. Δεν υπάρχουν διαφορετικές σελίδες. Μία
  σελίδα υπάρχει. Αλλά η συμπεριφορά θα είναι σαν να ήταν πολλές.
  
* Αυτή είναι η αρχή πίσω από τις *εφαρμογές μίας σελίδας* (Single Page
  Applications, SPAs).


## Δρομολόγηση στο React

* To React δεν έχει ενσωματωμένη λύση δρομολόγησης.

* Μία δημοφιλής λύση είναι ο [React
  Router](https://reacttraining.com/react-router/web/). 
  
* Τον εγκαθιστούμε δίνοντας:

   ```bash
   npm install react-router-dom
   ```

## Δρομολόγηση στην Εφαρμογή μας (1)

* Για να δουλέψει η δρομολόγηση στην εφαρμογή μας, θα πρέπει να
  εισάγουμε στην αρχή του `src/App.js` τα παρακάτω:
  
   ```javascript
   import { BrowserRouter as Router, Route, Link } from "react-router-dom";
   ```

## Δρομολόγηση στην Εφαρμογή μας (2)

* Μετά, αλλάζουμε το εξάρτημα `App` ως εξής:
  
   ```javascript
   class App extends Component {
     render() {
       return (
         <Router className="App">
           <div>
             <nav>
               <ul>
                 <li>
                   <Link to="/temperature/">Temperature</Link>
                 </li>
                 <li>
                   <Link to="/distance/">Distance</Link>
                 </li>
                 <li>
                   <Link to="/energy/">Energy</Link>
                 </li>
               </ul>
             </nav>
             <Route path="/temperature/" component={TemperatureConverter}/>
             <Route path="/distance/" component={DistanceConverter}/>
             <Route path="/energy/" component={EnergyConverter}/>
           </div>
         </Router>
       );
     }
   }
   ```

## Συνδυασμός Router και Bootstrap

* Φυσικά είναι δυνατόν να συνδυάσουμε το Bootstrap και τον Router ώστε
  να έχουμε ένα πιο υποφερτό αποτέλεσμα.

* Θα χρησιμοποιήσουμε μία `NavBar` για να πλοηγείται ο χρήστης.


## Χρήση `NavBar` (1)

* Εισάγουμε ό,τι χρειαστούμε από τη NavBar στο αρχείο `src/App.js`:

   ```javascript
   import {
     Navbar,
     NavbarBrand,
     Nav,
     NavItem,
     NavLink,
   } from 'reactstrap';
   ```

## Χρήση `NavBar` (2)

* Προσθέτουμε ένα εξάρτημα για την «κεντρική σελίδα»:

   ```javascript
   const Home = () => (
    <div>Welcome to the ultimate unit converter</div>
   );
   ```

## Χρήση `NavBar` (3)

* Αλλάζουμε το εξάρτημα `App` ώστε να γίνει:

   ```javascript
   class App extends Component {
     render() {
       return (
         <div className="container">
           <Router className="App">
             <div>
               <Navbar color="light" light expand="md">
                 <NavbarBrand tag={Link} to="/">Converters</NavbarBrand>
                 <Nav className="ml-auto" navbar>
               <NavItem>
                 <NavLink tag={Link} to="/temperature/">Temperature</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink tag={Link} to="/distance/">Distance</NavLink>
               </NavItem>
               <NavItem>
                 <NavLink tag={Link} to="/energy/">Energy</NavLink>
               </NavItem>
                 </Nav>
               </Navbar>
               <Route exact path="/" component={Home}/>
               <Route path="/temperature/" component={TemperatureConverter}/>
               <Route path="/distance/" component={DistanceConverter}/>
               <Route path="/energy/" component={EnergyConverter}/>
             </div>
           </Router>
         </div>
       );
     }
   }
   ```

## Σύνθεση Εξαρτημάτων (1)

* Τέλος, θα θέλαμε πάνω από κάθε μετατροπή να εμφανίζεται μια
  επικεφαλίδα, ή γενικώς κάποιος περιεχόμενο που εμείς θα του δίνουμε.
  
* Για να το κάνουμε αυτό στο React, χρησιμοποιούμε την ιδιότητα
  `props.children`.
  
* Αυτή θα έχει το περιεχόμενο που δίνουμε σε ένα εξάρτημα όταν το
  εισάγουμε στη σελίδα μας.
  
## Σύνθεση Εξαρτημάτων (2)
  
* Στο εξάρτημα `Component`, αλλάξουμε στο `render()` το `return()`
  ώστε να χρησιμοποιεί την ιδιότητα `{this.props.children}`:
  
   ```javascript
    return (
      <div>
        <h1>{this.props.children}</h1>
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
   ```

## Σύνθεση Εξαρτημάτων (3)

* Τώρα αλλάζουμε τα εξαρτήματα των μετατροπέων ώστε να τους δίνουμε το
  επιπλέον περιεχόμενο που θέλουμε.
  
* Για παράδειγμα, ο `TemperatureConverter` θα γίνει:

   ```javascript
   const TemperatureConverter = () => (
     <Converter 
       quantity="Temperature"
       firstUnit="Celsius"
       secondUnit="Fahrenheit"
       firstUnitConverter={toCelsius}
       secondUnitConverter={toFahrenheit}
     >Temperature Converter</Converter>
   );
   ```
