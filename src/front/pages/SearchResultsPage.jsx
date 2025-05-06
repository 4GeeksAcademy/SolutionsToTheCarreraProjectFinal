import React from "react";
import { Navbar } from "../components/Navbar";
import SearchResults from "../components/SearchResults";
import { Footer } from "../components/Footer"
import Search from "../components/Search";

const RegisterPage = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                <Search />
                <div className="container mt-5" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                    <SearchResults />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;