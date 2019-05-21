import React from 'react';
import './TeslaBattery.css';
import TeslaCar from '../components/TeslaCar/TeslaCar';
// import TeslaCounter from './components/TeslaCounter/TeslaCounter.js';
// import TeslaClimate from './components/TeslaClimate/TeslaClimate.js';
// import TeslaWheels from './components/TeslaWheels/TeslaWheels.js';

class TeslaBattery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      carstats: [],
      init: {
        speed: 55,
        temperature: 20,
        climate: true,
        wheels: 19
      }
    }
  }
  
  render() {
    const { init } = this.state;
    return (
      <form className="tesla-battery">
        <h1>Range Per Charge</h1>
        <TeslaCar wheelsize={ init.wheels } />
      </form>
    )
  }
}
export default TeslaBattery;