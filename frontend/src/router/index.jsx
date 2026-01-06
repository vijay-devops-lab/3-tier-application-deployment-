import { Routes, Route } from "react-router-dom";
import Home from "../pages/index";
import Projects from "../pages/projects";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/projects" element={
        <ProtectedRoute>
          <Projects />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}