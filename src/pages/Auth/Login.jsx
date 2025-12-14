import Seo from "../../seo/Seo";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login() {
    
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  if (isAuth && token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Seo
        title="Login | My Website"
        description="Access your account"
        canonical="https://example.com/login"
      />
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="text-gray-700">Please enter your credentials to log in.</p>
    </>
  );
}
