export interface WeatherData {
    city: string; // City name
    country: string;
    temperature: string; // Temperature in Celsius (as a string from the API)
    weather_description: string; // Weather condition (e.g., Clear, Cloudy)
    wind_speed: string;
    humidity: string;
    latitude: string;
    longitude: string;
}
