import React, { Component } from 'react';
import './App.css';

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
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

export default App;
