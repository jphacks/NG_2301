import "./App.scss";
import { Router } from "./routes/Router";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
