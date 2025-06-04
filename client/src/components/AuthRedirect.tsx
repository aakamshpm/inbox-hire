import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRedirect;
