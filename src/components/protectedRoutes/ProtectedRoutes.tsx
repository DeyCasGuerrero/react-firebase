import { useAuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom';
import SignUpForm from '../auth/SignUpForm';
import RegisterForm from '../auth/RegisterForm';
import LoaderComponent from '../pages/loader/Loader';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

    const { user, loading } = useAuthContext();

    if (loading) {
        return <LoaderComponent/>;
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return <>{children}</>;
}


export  function ProtectedRouteSignUp(){
    const {user, loading} = useAuthContext();

    if(loading) return <LoaderComponent/>;

    if(user) return <Navigate to="/"/>
    
    return <SignUpForm/>

}


export function ProtectedRoutesRegister(){
    const {user,loading }=useAuthContext(); 

    if(loading) return <LoaderComponent/>;

    if(user) return <Navigate to="/"/>;

    return <RegisterForm/>;
}