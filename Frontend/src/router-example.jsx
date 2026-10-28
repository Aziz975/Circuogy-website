// Example wiring for your existing router (react-router-dom v6).
// npm i react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
// import AdminDashboard from "./pages/AdminDashboard";   // your blog CRUD screen

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ...your existing public routes... */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <div className="p-10">Dashboard goes here</div>
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
