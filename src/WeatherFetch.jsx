import React, { useEffect } from "react";

function WeatherFetch() {
  const API_KEY = "dd43d93fd41c2cd43af88a5fb39f4282"; 
  const CITY = "Nairobi"; 
  const UNITS = "metric"; 

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&q=${CITY}&units=${UNITS}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Log JSON response to console

      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return <h2>Check the console for the weather API response!</h2>;
}

export default WeatherFetch;
