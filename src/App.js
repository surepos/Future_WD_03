import React, { useEffect, useState } from 'react';
import './App.css';
import Thermo from './images/indicator.png';
import celcius from './images/celsius.png';
import kelvin from './images/kelvin.png';
import fahranait from './images/fahrenheit.png';
import newton from './images/letter-n.png';
import rankine from './images/letter-r.png';
import Loader from './Loader/Loader.js';
import { motion } from 'framer-motion';

function App() {
  const [celsiusValue, setCelsiusValue] = useState(32);
  const [fahrenheitValue, setFahrenheitValue] = useState(0);
  const [kelvinValue, setKelvinValue] = useState(0);
  const [newtonValue, setNewtonValue] = useState(0);
  const [rankineValue, setRankineValue] = useState(0);
  const [unit, setUnit] = useState('celsius');
  const [currentValue, setCurrentValue] = useState(celsiusValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = () => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    fetch();
  }, []);

  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      switch (unit) {
        case 'celsius':
          setCelsiusValue(newValue);
          setCurrentValue(newValue);
          break;
        case 'fahrenheit':
          setFahrenheitValue(newValue);
          setCurrentValue(newValue);
          break;
        case 'kelvin':
          setKelvinValue(newValue);
          setCurrentValue(newValue);
          break;
        default:
          break;
      }
    }
  };

  console.log(currentValue);

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    switch (newUnit) {
      case 'celsius':
        setCelsiusValue(32);
        setCurrentValue(32);
        break;
      case 'fahrenheit':
        setFahrenheitValue(0);
        setCurrentValue(0);
        break;
      case 'kelvin':
        setKelvinValue(0);
        setCurrentValue(0);
        break;
      default:
        break;
    }
  };

  const handleTemperatureChange = () => {
    switch (unit) {
      case 'celsius':
        setFahrenheitValue(((celsiusValue * 9) / 5 + 32).toFixed(1));
        setKelvinValue((celsiusValue + 273.15).toFixed(1));
        setNewtonValue(((celsiusValue * 33) / 100).toFixed(1));
        setRankineValue(((celsiusValue * 9) / 5 + 491.67).toFixed(1));
        break;
      case 'fahrenheit':
        const celsiusFromFahrenheit = ((fahrenheitValue - 32) * 5) / 9;
        setCelsiusValue(celsiusFromFahrenheit.toFixed(1));
        setKelvinValue((celsiusFromFahrenheit + 273.15).toFixed(1));
        setNewtonValue(((celsiusFromFahrenheit * 33) / 100).toFixed(1));
        setRankineValue((parseFloat(fahrenheitValue) + 459.67).toFixed(1));
        break;
      case 'kelvin':
        const celsiusFromKelvin = kelvinValue - 273.15;
        setCelsiusValue(celsiusFromKelvin.toFixed(1));
        setFahrenheitValue(((celsiusFromKelvin * 9) / 5 + 32).toFixed(1));
        setNewtonValue(((celsiusFromKelvin * 33) / 100).toFixed(1));
        setRankineValue(((celsiusFromKelvin * 9) / 5 + 491.67).toFixed(1));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleTemperatureChange();
  }, [celsiusValue, fahrenheitValue, kelvinValue, unit]);

  return loading ? (
    <Loader />
  ) : (
    <div className="App">
      <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1, delay: 0 }}
          className="topSection">
        <Circle degree={(currentValue / 1000) * 100} color="#00c0ff" />
        <div className="inputInfo">
          <div className="degreeInput">
            <select
              id="Temperatures"
              name="degree"
              onChange={handleUnitChange}
              value={unit}>
              <option value="celsius">Celsius</option>
              <option value="kelvin">Kelvin</option>
              <option value="fahrenheit">Fahrenheit</option>
            </select>
          </div>
          <div className="numberInput">
            <input
              type="number"
              value={
                unit === 'celsius'
                  ? celsiusValue
                  : unit === 'fahrenheit'
                  ? fahrenheitValue
                  : kelvinValue
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="degreeSymbol">
            <img
              src={
                unit === 'celsius'
                  ? celcius
                  : unit === 'fahrenheit'
                  ? fahranait
                  : kelvin
              }
              alt={unit}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
          initial={{ y:100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="bottomSection">
     
        {unit === 'celsius' && (
          <>
            <div className="cardContainer">
              <div className="degreeInput">Fahrenheit</div>
              <div className="numberInput">{fahrenheitValue}</div>
              <div className="degreeSymbol">
                <img src={fahranait} alt="Fahrenheit" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Kelvin</div>
              <div className="numberInput">{kelvinValue}</div>
              <div className="degreeSymbol">
                <img src={kelvin} alt="Kelvin" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Newton</div>
              <div className="numberInput">{newtonValue}</div>
              <div className="degreeSymbol">
                <img src={newton} alt="Newton" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Rankine</div>
              <div className="numberInput">{rankineValue}</div>
              <div className="degreeSymbol">
                <img src={rankine} alt="Rankine" />
              </div>
            </div>
          </>
        )}
        {unit === 'fahrenheit' && (
          <>
            <div className="cardContainer">
              <div className="degreeInput">Celsius</div>
              <div className="numberInput">{celsiusValue}</div>
              <div className="degreeSymbol">
                <img src={celcius} alt="Celsius" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Kelvin</div>
              <div className="numberInput">{kelvinValue}</div>
              <div className="degreeSymbol">
                <img src={kelvin} alt="Kelvin" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Newton</div>
              <div className="numberInput">{newtonValue}</div>
              <div className="degreeSymbol">
                <img src={newton} alt="Newton" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Rankine</div>
              <div className="numberInput">{rankineValue}</div>
              <div className="degreeSymbol">
                <img src={rankine} alt="Rankine" />
              </div>
            </div>
          </>
        )}
        {unit === 'kelvin' && (
          <>
            <div className="cardContainer">
              <div className="degreeInput">Fahrenheit</div>
              <div className="numberInput">{fahrenheitValue}</div>
              <div className="degreeSymbol">
                <img src={fahranait} alt="Fahrenheit" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Celsius</div>
              <div className="numberInput">{celsiusValue}</div>
              <div className="degreeSymbol">
                <img src={celcius} alt="Celsius" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Newton</div>
              <div className="numberInput">{newtonValue}</div>
              <div className="degreeSymbol">
                <img src={newton} alt="Newton" />
              </div>
            </div>

            <div className="cardContainer">
              <div className="degreeInput">Rankine</div>
              <div className="numberInput">{rankineValue}</div>
              <div className="degreeSymbol">
                <img src={rankine} alt="Rankine" />
              </div>
            </div>
          </>
        )}
     </motion.div>
    </div>
  );
}

function Circle({ degree, color }) {
  const [currentDegree, setCurrentDegree] = useState(0);

  useEffect(() => {
    let startDegree = currentDegree;
    const increment = (degree - startDegree) / 50;
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      startDegree += increment;
      setCurrentDegree(startDegree);
      if (progress >= 50) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [degree]);

  return (
    <div
      className="circle"
      style={{
        background: `conic-gradient(from 180deg, ${color} ${currentDegree}%, #222 0%)`,
      }}>
      <img
        src={Thermo}
        alt="Thermo"
        style={{ transform: `rotate(${currentDegree * 3.6 + 45}deg)` }}
      />
    </div>
  );
}

export default App;
