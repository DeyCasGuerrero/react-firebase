import { useAuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    // isAuthenticated: boolean;
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

    const { user, loading } = useAuthContext();

    if (loading) {
        return <div className="text-5xl text-white">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

