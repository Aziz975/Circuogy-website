import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authApi } from "../lib/api";

// Wrap any admin-only page: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | allowed | denied
  const location = useLocation();

  useEffect(() => {
    let active = true;
    authApi
      .me()
      .then(() => active && setStatus("allowed"))
      .catch(() => active && setStatus("denied"));
    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Checking your session…
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
