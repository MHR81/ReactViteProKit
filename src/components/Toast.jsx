import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../redux/slices/toastSlice";

export default function Toast() {
  const { message, type, visible } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`${bgColor} fixed top-6 right-6 text-white px-4 py-2 rounded shadow-lg z-50 transition-transform transform`}
    >
      {message}
    </div>
  );
}
