# 🌦️ Weather Now

A simple and elegant weather app built with **React** and **Tailwind CSS**, powered by the **Open-Meteo API** — no authentication or API key required.  
Weather Now lets users quickly search for any city and see its **current temperature, condition, humidity, and wind speed** with a clean and responsive design.

---

## ✨ Key Features

- 🔍 **Search any city** to get instant weather info  
- 🌡️ Displays **temperature, condition, humidity, and wind speed**  
- 🌈 Shows a matching **weather icon** (☀️ ⛅ 🌧️ ❄️ etc.)  
- ⚡ **Real-time API fetch** from Open-Meteo (no key needed)  
- 🔄 **Loading spinner** while data is being fetched  
- 🚫 Friendly **error messages** for empty input or failed searches  
- 📱 Fully **responsive** for both mobile and desktop  
- 🎨 Clean, modern UI using **Tailwind CSS gradients & rounded cards**

---

## 🧰 Tech Stack

- ⚛️ **React (Vite)** – UI and state management  
- 💨 **Tailwind CSS** – Utility-first styling and layout  
- ☁️ **Open-Meteo API** – Free weather and geocoding data source  

---

## 🚀 Installation & Setup

Clone the repo and run it locally:

```bash
# 1️⃣ Clone the project
git clone https://github.com/yourusername/weather-now.git
cd weather-now

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run the dev server
npm run dev


🌍 Open-Meteo API Integration

Weather Now uses two endpoints from the Open-Meteo API
:

Geocoding API
Used to get latitude and longitude from the city name.

https://geocoding-api.open-meteo.com/v1/search?name={city}


Weather Forecast API
Fetches current temperature, wind speed, humidity, and condition using the coordinates.

https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=relativehumidity_2m


Both APIs are free and don’t require authentication, making setup fast and secure.


🧩 Component Structure

Here’s how the app is organized:

src/
├── App.jsx
├── main.jsx
├── index.css
└── components/
    ├── SearchBar.jsx        # Input field & button
    ├── WeatherCard.jsx      # Displays weather details
    ├── LoadingSpinner.jsx   # Shows while fetching data
    └── ErrorMessage.jsx     # Handles error display


    💅 UI / UX Notes

Design: minimal, modern, and centered layout

Colors: soft blue gradient (from-sky-400 to-blue-500) for a calm, weather-like vibe

Cards: white translucent backgrounds with rounded corners and subtle shadows

Typography: clear, readable sans-serif with good contrast

Responsiveness: flexbox and grid layouts adapt seamlessly to all screens



⚙️ Loading, Error & Data States
State	Behavior
Loading	Displays a spinner and message (“Fetching weather…”)
Error	Shows user-friendly messages like “Please enter a city name” or “City not found”
Success	Renders a weather card with temperature, condition, humidity, and wind speed

This makes the app intuitive and forgiving, even if network or user errors occur.


🔮 Possible Future Improvements

🌦️ Add hourly or 3-day forecast

📍 Detect current location automatically

🖼️ Use SVG icons instead of emoji

💾 Cache previous searches in localStorage

🌙 Add light/dark mode toggle

🧠 Implement unit tests for API and state logic

🧭 What I Learned / Challenges Faced

Handling chained API calls (geocoding → weather) cleanly with async/await

Designing smooth loading and error transitions for better UX

Keeping the UI clean and minimal using only Tailwind utilities

Managing component state and props flow efficiently in React

This project taught me how to combine data fetching, UI feedback, and responsive design in a cohesive, user-friendly app.

🧑‍💻 Developer Notes
🔄 Data Flow
User types city → validate input → fetch coordinates → fetch weather → update state → render UI


Input validation: checks for empty city names

Fetch chain: uses Geocoding API → gets latitude/longitude

Weather fetch: uses those coordinates → fetches current weather

State update: stores data in React state (useState)

Conditional rendering: based on loading, error, and weather states

⚙️ State & API Management

All logic is handled inside App.jsx using React Hooks (useState).

Each API call is wrapped in try/catch for graceful error handling.

UI components (WeatherCard, ErrorMessage, etc.) are purely presentational.

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [weather, setWeather] = useState(null);

🎨 Tailwind CSS Usage

Tailwind was used exclusively for styling:

Gradients: bg-gradient-to-r from-sky-400 to-blue-500

Rounded cards: rounded-xl shadow-md

Responsive layouts: flex, grid, sm: breakpoints

Transitions: hover:bg-sky-700, focus:ring-2 for smooth feedback

No additional CSS frameworks or custom SCSS were used — everything is purely Tailwind.

🧠 Summary

Weather Now is a clean, fast, and educational mini project that combines API integration, React state management, and Tailwind design into a simple yet functional app.

It’s perfect for learning how to handle real-world data fetching, loading states, and responsive design in a professional React setup.