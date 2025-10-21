import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { JSX } from "react/jsx-runtime";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};