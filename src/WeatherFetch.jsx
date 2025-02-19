import React, { useState } from "react";

function WeatherFetch() {
  const API_KEY = "dd43d93fd41c2cd43af88a5fb39f4282"; 
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null); 
  const [error, setError] = useState(null); 

  const fetchWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`City not found. Please enter a valid city.`);
      }

      const data = await response.json();
      console.log("API Response:", data); 

      
      const weatherDetails = {
        cityName: data.name,
        population: data.population || "N/A", 
        weather: data.weather[0].main,
        clouds: data.clouds.all + "%", 
        wind: data.wind.speed + " m/s", 
      };

      setWeatherData(weatherDetails);
      setError(null); // Clear errors when successful

    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Weather Search</h2>
      
      {/* User Input Form */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", width: "200px", marginRight: "10px" }}
      />
      <button onClick={fetchWeatherData} style={{ padding: "10px", cursor: "pointer" }}>
        Search
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Weather Data in a Table */}
      {weatherData && (
        <table style={{ width: "60%", margin: "20px auto", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#2196F3", color: "white", height: "40px" }}>
              <th>City</th>
              <th>Population</th>
              <th>Weather</th>
              <th>Clouds</th>
              <th>Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: "#f2f2f2", textAlign: "center", height: "40px" }}>
              <td>{weatherData.cityName}</td>
              <td>{weatherData.population}</td>
              <td>
                {weatherData.weather} {getWeatherIcon(weatherData.weather)}
              </td>
              <td>{weatherData.clouds}</td>
              <td>{weatherData.wind}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}


const getWeatherIcon = (weather) => {
  switch (weather.toLowerCase()) {
    case "clear":
      return "☀️"; 
    case "clouds":
      return "☁️"; 
    case "rain":
      return "🌧️"; 
    case "snow":
      return "❄️"; 
    case "thunderstorm":
      return "⛈️"; 
    case "drizzle":
      return "🌦️"; 
    case "mist":
    case "fog":
      return "🌫️"; 
    default:
      return "🌍"; 
  }
};

export default WeatherFetch;
