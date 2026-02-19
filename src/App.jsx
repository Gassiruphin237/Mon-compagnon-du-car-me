import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import Challenge from "./pages/Challenge";
import Profile from "./pages/Profile";
import Meditation from "./pages/Meditation";
import Event from "./pages/Event";
import Support from "./pages/Support";

// Composant pour protéger les routes (Reste inchangé, c'est parfait)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <>
      {/* Toaster en dehors du Router pour être accessible partout */}
      <Toaster position="top-center" richColors closeButton />

      <Router>
        <Routes>
          {/* Redirection automatique vers le dashboard au lancement */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Page d'authentification */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Le vrai Dashboard protégé */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <PrivateRoute>
                <Challenge />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/Meditations"
            element={
              <PrivateRoute>
                <Meditation />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <Event />
              </PrivateRoute>
            }
          />
           <Route
            path="/support"
            element={
              <PrivateRoute>
                <Support />
              </PrivateRoute>
            }
          />
          {/* Gestion de l'erreur 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;