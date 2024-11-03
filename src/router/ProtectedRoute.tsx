import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
    children: JSX.Element 
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true"; // Verifica se o usuário está autenticado

  return isAuthenticated ? children : <Navigate to="/login" replace />; // Redireciona para a página de login se não estiver autenticado
};

export default ProtectedRoute;
