import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    // Redirige vers login si pas de token
    return <Navigate to="/login" replace />;
  }

  // Sinon, autorise l'accès
  return children;
}
