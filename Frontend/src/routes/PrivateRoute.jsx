import { Navigate } from 'react-router-dom';
import { AuthMessage } from "../pages/AuthMessage";

export function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");

  const isAuthenticated = Boolean(token);

  return isAuthenticated ? children : <AuthMessage/>;
}
