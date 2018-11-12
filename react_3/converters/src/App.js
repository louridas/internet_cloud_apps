import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function toKilometers(miles) {
  return (miles / 1.60934);
}

function toMiles(kilometers) {
  return (kilometers * 1.60934);
}

function toCalories(joules) {
  return (joules * 4.184);
}

function toJoules(calories) {
  return (calories / 4.184);
}

function tryConvert(measurement, convert) {
  const input = parseFloat(measurement);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

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
  }
}

const Home = () => (
  <div>Welcome to the ultimate unit converter</div>
);

const TemperatureConverter = () => (
  <Converter 
    quantity="Temperature"
    firstUnit="Celsius"
    secondUnit="Fahrenheit"
    firstUnitConverter={toCelsius}
    secondUnitConverter={toFahrenheit}
  >Temperature Converter</Converter>
);

const DistanceConverter = () => (
  <Converter 
    quantity="Distance"
    firstUnit="Kilometers"
    secondUnit="Miles"
    firstUnitConverter={toKilometers}
    secondUnitConverter={toMiles}
  >Distance Converter</Converter> 
);

const EnergyConverter = () => (
  <Converter 
    quantity="Energy"
    firstUnit="Joules"
    secondUnit="Calories"
    firstUnitConverter={toJoules}
    secondUnitConverter={toCalories}
  >Energy Converter</Converter> 
);

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

export default App;
