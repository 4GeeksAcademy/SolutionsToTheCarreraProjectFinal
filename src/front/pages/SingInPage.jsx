import React from "react";
import { Navbar } from "../components/Navbar";
import SingIn from "../components/SingIn";
import { Footer } from "../components/Footer"

const SingInPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <h2 className="text-center">Sign In</h2>
                <SingIn />
            </div>
            <Footer />
        </div>
    );
};

export default SingInPage;