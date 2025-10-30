import React from "react";

/**
 * Simple mapping from Open-Meteo weathercode to friendly text + emoji icon
 * based on Open-Meteo weather codes (0..99). This is a compact friendly mapping.
 */
const weatherCodeMap = (code) => {
  // Most common broad mappings
  if (code === 0) return { text: "Clear", icon: "☀️" };
  if ([1, 2].includes(code)) return { text: "Partly cloudy", icon: "⛅" };
  if (code === 3) return { text: "Overcast", icon: "☁️" };
  if ([45, 48].includes(code)) return { text: "Fog", icon: "🌫️" };
  if ([51, 53, 55].includes(code)) return { text: "Drizzle", icon: "🌦️" };
  if ([61, 63, 65].includes(code)) return { text: "Rain", icon: "🌧️" };
  if ([66, 67].includes(code)) return { text: "Freezing rain", icon: "🥶🌧️" };
  if ([71, 73, 75, 85, 86].includes(code)) return { text: "Snow", icon: "❄️" };
  if ([80, 81, 82].includes(code)) return { text: "Rain showers", icon: "🌦️" };
  if ([95, 96, 99].includes(code)) return { text: "Thunderstorm", icon: "⛈️" };
  return { text: "Unknown", icon: "🌈" };
};

export default function WeatherCard({ data }) {
  const weather = weatherCodeMap(data.weathercode);

  return (
    <div className="w-full bg-gradient-to-br from-white to-slate-50 rounded-xl p-5 shadow-md flex flex-col sm:flex-row gap-4 items-center">
      <div className="text-6xl sm:text-7xl">{weather.icon}</div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{data.place}</h2>
            <p className="text-sm text-slate-500">As of {new Date(data.time).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-slate-800">{Math.round(data.temperature)}°C</div>
            <div className="text-sm text-slate-600">{weather.text}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
          <div className="bg-white/80 p-3 rounded-md shadow-sm">
            <div className="text-xs text-slate-500">Wind</div>
            <div className="font-medium">{data.windspeed} km/h</div>
          </div>
          <div className="bg-white/80 p-3 rounded-md shadow-sm">
            <div className="text-xs text-slate-500">Humidity</div>
            <div className="font-medium">{data.humidity !== null ? `${data.humidity}%` : "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
