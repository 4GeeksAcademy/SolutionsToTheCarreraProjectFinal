import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get("query");
        if (queryParam) {
            setQuery(queryParam);
        }
    }, [location.search]);

    const handleSearch = () => {
        navigate(`/search-results?query=${encodeURIComponent(query.trim())}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="text-center p-5">
            <h2 className="mb-3">What service can we offer you?</h2>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Service to search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn btn-primary ms-2" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
};

export default Search;