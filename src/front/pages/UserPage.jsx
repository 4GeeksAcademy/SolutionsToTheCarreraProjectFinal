import React from "react";
import { Navbar } from "../components/Navbar";
import User from "../components/User";
import { Footer } from "../components/Footer"

const UserPage = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <User />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;