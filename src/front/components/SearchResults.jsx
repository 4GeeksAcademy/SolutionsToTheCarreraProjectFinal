import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardServicesSearch from "./CardServicesSearch";

const SearchResults = () => {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const query = new URLSearchParams(location.search).get("query") || "";

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;

                if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

                const url = query
                    ? `${backendUrl}/api/search?query=${encodeURIComponent(query)}`
                    : `${backendUrl}/api/search`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch search results");
                }

                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedResults = results.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    if (results.length === 0) {
        return <p className="text-center mt-5">No results found for "{query}"</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Results for "{query || "all services"}"</h2>
            <div className="row">
                {paginatedResults.map((result, index) => (
                    <div className="col-md-6" key={index}>
                        <CardServicesSearch
                            service={result.service}
                            user={result.user}
                        />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                {Array.from({ length: Math.ceil(results.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;