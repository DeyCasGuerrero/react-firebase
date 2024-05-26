import { useAuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom';
import SignUpForm from '../auth/SignUpForm';
import RegisterForm from '../auth/RegisterForm';

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


export  function ProtectedRouteSignUp(){
    const {user, loading} = useAuthContext();

    if(loading) return <h1>Loading ...</h1>

    if(user) return <Navigate to="/"/>
    
    return <SignUpForm/>

}


export function ProtectedRoutesRegister(){
    const {user,loading }=useAuthContext(); 

    if(loading) return <h1>Loading</h1>

    if(user) return <Navigate to="/"/>

    return <RegisterForm/>

}