import Seo from "../../seo/Seo";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Register() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  if (isAuth && token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Seo
        title="Register | My Website"
        description="Create a new account"
        canonical="https://example.com/register"
      />
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <p className="text-gray-700">
        Please fill in the form to create an account.
      </p>
    </>
  );
}
