import "./App.css";
import { Router } from "./routes/Router";
import { AuthProvider } from "./Context/AuthContext";

import { fetchWeatherData } from "./APIfunction/weatherAPI";

function App() {
  fetchWeatherData("Nagoya");
  return (
    <AuthProvider>
      <div className="App">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
