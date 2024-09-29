const API_URL = "https://freetestapi.com/api/v1/weathers";

export const fetchWeather = async (city: string) => {
    try {
        const response = await fetch(`${API_URL}?search=${city}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        console.log(data);
        console.log("API Response:", data[0].temperature); // Log the API response to inspect

        // Check if the weatherData array is empty
        if (data[0].length === 0) {
            return "<div>No weather data available.</div>"; // You can display a fallback or nothing
        }

        // Ensure data is structured as expected
        if (
            !data[0].city ||
            typeof data[0].city === "undefined" ||
            !data[0].weather_description ||
            typeof data[0].weather_description === "undefined"
        ) {
            throw new Error(
                "Incomplete data from API. Please try another city."
            );
        }

        return data[0];
    } catch (error) {
        throw new Error(
            (error as Error).message || "Failed to fetch weather data."
        );
    }
};
