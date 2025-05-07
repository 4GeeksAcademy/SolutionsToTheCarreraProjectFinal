import React from "react";
import { Navbar } from "../components/Navbar";
import Register from "../components/Register";
import { Footer } from "../components/Footer"

const RegisterPage = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <Register />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;