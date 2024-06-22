import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State variables to store city input, weather data, and error messages
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // API key for OpenWeatherMap
  const apiKey = "1430575f6fca2f1f6a721b3e9186e49b";

  // Function to fetch weather data for a given city
  const getWeather = async (city) => {
    try {
      // Make a GET request to the OpenWeatherMap API
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      // Update the weather state with the response data
      setWeather(response.data);
      // Clear any previous error messages
      setError(null); 
    } catch (error) {
      // Set an error message if the city is not found
      setError("City not found");
      // Clear the weather state
      setWeather(null);
    }
  };

  // Function to handle form submission
  const handleSubmission = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    getWeather(city); // Fetch weather data for the entered city
  };

  return (
    <div className="container">
      <h1>Weather Application</h1>

      <form onSubmit={handleSubmission}>
        <input 
          type="text" 
          placeholder="Search your city" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
        />
        <button type="submit">Search</button>
      </form>

      <div className=''>
        {/* Display error message if there is an error */}
        {error && <p className="error">{error}</p>}
        
        {/* Display weather information if data is available */}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p className="temp">{Math.floor(weather.main.temp - 273.15)}°C</p>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
              alt="Weather icon" 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
