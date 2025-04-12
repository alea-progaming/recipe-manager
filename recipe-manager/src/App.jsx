import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/auth/Signup";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { auth } from "./components/firebase";
import AuthPage from "./components/auth/AuthPage";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <AuthPage />}
        />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
