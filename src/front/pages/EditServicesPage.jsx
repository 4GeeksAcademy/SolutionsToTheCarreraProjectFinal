import React from "react";
import { Navbar } from "../components/Navbar";
import Services from "../components/Services";
import { Footer } from "../components/Footer"

const EditServicesPage = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <Services />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditServicesPage;