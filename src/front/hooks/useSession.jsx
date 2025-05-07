import { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const useSession = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const loadSession = () => {
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token);

            if (token) {
                try {
                    const user = JSON.parse(localStorage.getItem('user'));

                    dispatch({ type: "login", payload: { token: token, user: user } });
                } catch (error) {
                    console.error('Failed to parse session data:', error);
                }
            }
        };

        loadSession();
    }, [dispatch]);
};

export default useSession;