import React from "react";
import { Navbar } from "../components/Navbar";
import Register from "../components/Register";
import { Footer } from "../components/Footer"

const RegisterPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <h2 className="text-center">Register</h2>
                <Register />
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;