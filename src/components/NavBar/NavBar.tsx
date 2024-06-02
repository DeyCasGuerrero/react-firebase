import { useAuthContext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom';
const NavBar = () => {

    const { user, logOut, loading } = useAuthContext();

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {

        }
    }

    if (loading) {
        return <div className='text-5xl text-white'>Loading...</div>
    }

    return (
        <nav className='bg-black p-5 rounded-2xl w-96 flex items-center gap-8 font-pixel'>
            <div className='flex gap-4 items-center'>
                <div>
                    <p className='text-white text-lg '> Welcome</p>
                    <h1 className='text-green-500'>{user?.displayName || user?.email}</h1>
                </div>
                <Link to={'/profile'}>
                    {user?.photoURL ? (
                        <img className='rounded-full w-20 h-20' src={user && user.photoURL ? user.photoURL : undefined} alt='perfil'></img>
                    ) : (
                        <p>No foto</p>
                    )}

                </Link>
            </div>

            <button onClick={handleLogout} className='bg-red-500 p-3 rounded-md text-white'>Logout</button>

        </nav>
    )
}

export default NavBar;