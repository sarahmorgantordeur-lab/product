import { useAuth } from '../contexts/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, Loading } = useAuth();

    if (Loading) {
        return (  
            <div className="flex items-center justify-center">
                <div className="text-center text-2xl font-bold text-gray-800">
                    Loading...
                </div>
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return children;
}