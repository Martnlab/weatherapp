
import { useEffect, useState } from 'react';
import { Details } from './components/Details';
import Forecast from './components/Forecast';
import { Inputs } from './components/Inputs';
import { TimeAndLocal } from './components/TimeAndLocal';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/weatherServices';


function App() {


  const [query, setQuery] = useState({q: 'berlin'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

useEffect(() =>{
  const fetchWeather = async () => {
   await getFormattedWeatherData({...query, units}).then(
    (data) => {
      setWeather(data);
    });
  }

  fetchWeather();

}, [query, units]);


const formatBackground = () => {
    if (!weather) return 'bg-gradient-to-br from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return 'bg-gradient-to-br from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
}

  return (
 
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
        <TimeAndLocal weather={weather} />
        <Details weather={weather}/>

        <Forecast title="hourly forecast" items={weather.hourly}/>
        <Forecast title="daily forecast" items={weather.daily}/>
      </div>
      )}



    </div>
  );
}

export default App;
