import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";


const Profile = () => {
    const { user } = useAuthContext();

    return (
        <>
            <Link to={"/"}>
                <button className="p-4 text-white bg-green-500 font-pixel text-xl font-bold animate-pulse rounded-full mb-7">Volver al Inicio</button>
            </Link>
            <div className=" h-96 w-96 bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center font-pixel ">
                <div className="rounded-full border-4 border-yellow-300">
                <img className="rounded-full" src={user && user.photoURL ? user.photoURL : undefined} alt="perfile"></img>
                </div>
                <div className="mt-4">
                    <h1 className='text-green-500 text-2xl text-center'>{user?.displayName || user?.email}</h1>
                    <h1 className='text-green-500 text-2xl text-center'>{user?.email}</h1>
                </div>

            </div>
        </>
    );

}
export default Profile;