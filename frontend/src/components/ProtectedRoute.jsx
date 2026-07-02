import { Navigate } from "react-router-dom";

// Wraps routes that require login — redirects to /login if not authenticated
function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("access");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
