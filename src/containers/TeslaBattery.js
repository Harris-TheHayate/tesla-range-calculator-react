import React from 'react';
import './TeslaBattery.css';
import TeslaCar from '../components/TeslaCar/TeslaCar';
import TeslaStats from '../components/TeslaStats/TeslaStats';
// import TeslaCounter from './components/TeslaCounter/TeslaCounter.js';
// import TeslaClimate from './components/TeslaClimate/TeslaClimate.js';
// import TeslaWheels from './components/TeslaWheels/TeslaWheels.js';
import battery from '../data/battery';
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
  
  calculateStats = (models, value) => {
    const dataModels  = battery;
    return models.map(model => {
      const { speed, temperature, climate, wheels } = value;
      const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
      return {
        model,
        miles
      };
    })
  }
  
    
  statsUpdate() {
    const carModels = ['60', '60D', '75', '75D', '90D', 'P100D'];
    this.setState({
      carstats: this.calculateStats(carModels, this.state.init)
    })  
  };
    
  componentDidMount() {
    this.statsUpdate(); 
  };

  render() {
    const { init, carstats } = this.state;
    return (
      <form className="tesla-battery">
        <h1>Range Per Charge</h1>
        <TeslaCar wheelsize={ init.wheels } />
        <TeslaStats carstats={ carstats } />
      </form>
    )
  }
}
export default TeslaBattery;