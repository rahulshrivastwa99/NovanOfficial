import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { logout, openAuthModal } from '@/store/authSlice';
import { toast } from 'sonner';

const AxiosInterceptor = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const interceptorId = useRef<number | null>(null);

    useEffect(() => {
        interceptorId.current = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                const originalRequest = error.config;
                // Prevent infinite loops
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    
                    // Specific check for "Not authorized" messages
                    // You might want to customize this based on backend error messages
                    dispatch(logout());
                    dispatch(openAuthModal({ mode: 'login' }));
                    toast.error("Session expired. Please login again.");
                    navigate('/'); 
                }
                return Promise.reject(error);
            }
        );

        return () => {
            if (interceptorId.current !== null) {
                axios.interceptors.response.eject(interceptorId.current);
            }
        };
    }, [navigate, dispatch]);

    return null;
};

export default AxiosInterceptor;
