import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "./redux/slices/authSlice";
import Router from "./Routes/router";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(clearToken());
    }
  }, []);

  return <Router />;
}
