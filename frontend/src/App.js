import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recommend from "./pages/Recommend";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/recommend" replace />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/recommend" replace />
            ) : (
              <Signup setUser={setUser} />
            )
          }
        />

        {/* Recommendation Page */}
        <Route
          path="/recommend"
          element={
            user ? (
              <Recommend user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Chatbot */}
        <Route
          path="/chatbot"
          element={
            user ? (
              <Chatbot user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;