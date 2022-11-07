import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Levels from "./routes/Levels";
import Reports from "./routes/Reports";
import RequireAuth from "./components/RequireAuth";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/levels"
            element={
              <RequireAuth restrictTo={["isManager"]}>
                <Levels />
              </RequireAuth>
            }
          />
          <Route
            path="/reports"
            element={
              <RequireAuth restrictTo={["isRetailer"]}>
                <Reports />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
