import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(city) {
    setError("");
    setWeather(null);
    const trimmed = city?.trim();
    if (!trimmed) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      // 1) Geocoding: fetch coords
      const geoRes = await fetch(
        `${GEOCODING_URL}?name=${encodeURIComponent(trimmed)}&count=1&language=en&format=json`
      );
      if (!geoRes.ok) throw new Error("Geocoding failed");
      const geoJson = await geoRes.json();
      if (!geoJson.results || geoJson.results.length === 0) {
        setError("City not found.");
        setLoading(false);
        return;
      }
      const { latitude, longitude, name, country, admin1 } = geoJson.results[0];

      // 2) Weather: request current weather and hourly humidity (so we can show humidity)
      const weatherRes = await fetch(
        `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`
      );
      if (!weatherRes.ok) throw new Error("Weather fetch failed");
      const weatherJson = await weatherRes.json();

      // Extract current_weather
      const current = weatherJson.current_weather;
      if (!current) throw new Error("No current weather data");

      // humidity: find the hourly index matching current time
      let humidity = null;
      if (
        weatherJson.hourly &&
        Array.isArray(weatherJson.hourly.time) &&
        Array.isArray(weatherJson.hourly.relativehumidity_2m)
      ) {
        const times = weatherJson.hourly.time;
        const hums = weatherJson.hourly.relativehumidity_2m;
        const idx = times.indexOf(current.time);
        if (idx !== -1) humidity = hums[idx];
        // fallback: last known hourly value
        if (humidity === null && hums.length) humidity = hums[0];
      }

      setWeather({
        place: `${name}${admin1 ? ", " + admin1 : ""}${country ? ", " + country : ""}`,
        temperature: current.temperature,
        windspeed: current.windspeed,
        weathercode: current.weathercode,
        time: current.time,
        humidity: humidity,
      });
    } catch (e) {
      console.error(e);
      setError("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-r from-sky-400 to-blue-500">
      <div className="max-w-xl w-full">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 text-center mb-4">
            Weather Now
          </h1>
          <p className="text-sm text-slate-600 text-center mb-6">
            Quick weather for the outdoors — search any city and get current conditions.
          </p>

          <SearchBar
            value={query}
            onChange={(v) => setQuery(v)}
            onSearch={() => handleSearch(query)}
          />

          <div className="mt-6 min-h-[150px] flex items-center justify-center">
            {loading && <LoadingSpinner />}
            {error && !loading && <ErrorMessage message={error} />}
            {weather && !loading && !error && <WeatherCard data={weather} />}
            {!loading && !error && !weather && (
              <p className="text-sm text-slate-600 text-center">Search a city to see current weather.</p>
            )}
          </div>
        </div>

        <footer className="text-center text-xs text-white/90 mt-4">
          Built for Jamie • Data from Open-Meteo
        </footer>
      </div>
    </div>
  );
}
