import React from "react";
import { useAuth } from "../context/AuthContext";
import LoginComplaint from "./LoginComplaint";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const {isAuthenticated} = useAuth()

  if (!isAuthenticated) {
    return <LoginComplaint />;
  }

  return children;
};

export default ProtectedRoute;
