// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ allowedRoles, children }) {
    const { user } = useAuth();
    console.log(user)

    if (!user || !allowedRoles.includes(user.cargo)) {
        // Redireciona para home ou página de acesso negado
        return <Navigate to="/" replace />;
    }

    return children;
}
