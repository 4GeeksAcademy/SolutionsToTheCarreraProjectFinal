import React from "react";
import { Navbar } from "../components/Navbar";
import Services from "../components/Services";
import { Footer } from "../components/Footer"

const UserPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <Services />
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;