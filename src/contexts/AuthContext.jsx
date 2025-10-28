import api from '../api'
import { createContext } from 'react'



const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);


    const register = async (name, email, password) => {
        try {
            const response = await api.post('/register', { name, email, password });
            setUser(response.data);
            return { success: true };
        } catch (error) {
            return {
                success: false, 
                error: error.response ?.data?.error || 'Une erreur est survenue',
            };
        }
    };
};
