import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
const ValidateSessionPage = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    useEffect(() => {

        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);

        if (!token) {
            console.log('No token found, redirecting to login page');
            navigate("/logout");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));

            dispatch({ type: "login", payload: { token: token, user: user } });
            navigate("/user");
        } catch (error) {
            console.error('Failed to parse session data:', error);
        }

    })

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <h2 className="text-center">Logout</h2>
                    <p className="text-center">Your session is being validated, please hold on</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ValidateSessionPage;