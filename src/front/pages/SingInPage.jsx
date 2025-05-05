import React from "react";
import { Navbar } from "../components/Navbar";
import SingIn from "../components/SingIn";
import { Footer } from "../components/Footer"

const SingInPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <SingIn />
            </div>
            <Footer />
        </div>
    );
};

export default SingInPage;