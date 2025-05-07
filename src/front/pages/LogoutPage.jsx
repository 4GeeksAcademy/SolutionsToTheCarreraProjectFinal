import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
const LogoutPage = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    useEffect(() => {

        dispatch({ type: "logout", payload: {} });
        navigate("/singin");
        localStorage.clear();
    })

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <h2 className="text-center">Logout</h2>
                    <p className="text-center">You are logging out, please wait...</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LogoutPage;