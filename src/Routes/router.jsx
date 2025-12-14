import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import MainLayout from "../layout/MainLayout/MainLayout";
import AuthLayout from "../pages/Auth/layout/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/404/NotFound";

import About from "../pages/About";

export default function Router() {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute> <About /> </ProtectedRoute>} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
