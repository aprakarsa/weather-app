import React, { useState } from "react";
import { fetchWeather } from "./api/weatherApi";
import { WeatherData } from "./types/weather";
import "./App.css";

const App: React.FC = () => {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        if (city === "") {
            setError("Please enter a city");
            return;
        }
        setLoading(true);
        try {
            const data = await fetchWeather(city);
            console.log(city);
            setWeather(data); // Set the weather data correctly
            setError(null);
        } catch (error) {
            // setError((error as Error).message);
            setError("City is not found! Please try to type another city.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const mapUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        weather?.latitude +
        "," +
        weather?.longitude;
    const targetUrl = "_blank";

    // This would be nice if we could call an api for the weatherApp.
    //
    let iconCode = "";
    const weatherDescriptionToLowercase =
        weather?.weather_description.toLowerCase();
    if (
        weatherDescriptionToLowercase === "clear sky" ||
        weatherDescriptionToLowercase === "sunny"
    ) {
        iconCode = "01d";
    } else if (
        weatherDescriptionToLowercase === "few clouds" ||
        weatherDescriptionToLowercase === "partly cloudy"
    ) {
        iconCode = "02d";
    } else if (
        weatherDescriptionToLowercase === "scattered clouds" ||
        weatherDescriptionToLowercase === "cloudy"
    ) {
        iconCode = "03d";
    } else if (weatherDescriptionToLowercase === "broken clouds") {
        iconCode = "04d";
    } else if (
        weatherDescriptionToLowercase === "shower rain" ||
        weatherDescriptionToLowercase === "rain showers"
    ) {
        iconCode = "09d";
    } else if (weatherDescriptionToLowercase === "rain") {
        iconCode = "10d";
    } else if (weatherDescriptionToLowercase === "thunderstorm") {
        iconCode = "11d";
    } else if (weatherDescriptionToLowercase === "snow") {
        iconCode = "13d";
    } else if (weatherDescriptionToLowercase === "mist") {
        iconCode = "50d";
    } else {
        iconCode = "";
    }

    const urlWeatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Weather App</h1>

            {/* Wrapper for input and button */}
            <div className="search-container">
                <input
                    autoFocus
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />

                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Loading..." : "Search"}
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>
                        {weather.city}, {weather.country}
                    </h2>
                    <p>
                        {weather.weather_description}
                        {iconCode && (
                            <img
                                src={urlWeatherIcon}
                                alt="Weather icon"
                                className="weather-icon"
                            />
                        )}
                    </p>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Humidity: {weather.humidity}</p>
                    <p>Wind: {weather.wind_speed} m/s</p>
                    <p>
                        <a href={mapUrl} target={targetUrl}>
                            Locate {weather.city} on Google Map
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default App;
