import React, { useEffect, useState } from "react";
import UserRating from "../components/UserRating";

const RatingsList = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL

                if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

                const response = await fetch(backendUrl + "/api/ratings");
                if (!response.ok) {
                    throw new Error("Failed to fetch ratings");
                }
                const data = await response.json();
                setRatings(data);
            } catch (error) {
                console.error("Error fetching ratings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Ratings</h2>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : ratings.length > 0 ? (
                <div className="row">
                    {ratings.slice(0, 9).map((rating) => ( 
                        <div className="col-md-4 mb-4" key={rating.id}> 
                            <UserRating
                                rating={{
                                    userImage: rating.user?.image_Url,
                                    userName: rating.user?.name || "Anonymous",
                                    stars: rating.rating,
                                    opinion: rating.opinions,
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No ratings available</p>
            )}
        </div>
    );
};

export default RatingsList;