import React from "react";
import { Navbar } from "../components/Navbar";
import User from "../components/User";
import { Footer } from "../components/Footer"

const UserPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <h2 className="text-center">Sign In</h2>
                <User />
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;