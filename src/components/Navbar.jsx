import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout ()
        navigate('/login')
    };

    return (
        <nav className='bg-white shadow-sm'>
            <div className="max-m7xl mx-auto px-4 sm:px-6 lg:px8">
                <div className='flex justify-between items-center h-16'>
                    <h1 className='text-2xl font-bold'>My product</h1>
                    <div className='flex items-center gap-4'>
                        <span className='text-sm font-bold'>
                            <span className='text-black font-bold text-2xl'>Bonjour {user?.data.name}</span>
                        </span>
                        <button className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:oultine-none focus:ring-2 focus:ring-red-500' onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    );
};