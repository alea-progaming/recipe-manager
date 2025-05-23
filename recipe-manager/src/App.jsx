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
import { auth } from "./firebase";
import AuthPage from "./components/auth/AuthPage";
import CreateRecipe from "./components/CreateRecipe";

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
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createRecipe" element={<CreateRecipe />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
