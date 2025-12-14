import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  if (!isAuth || !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
