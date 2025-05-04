import React, { useEffect, useState } from "react";
import UserRating from "../components/UserRating";

const RatingsList = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch("https://opulent-adventure-v6gxwg4vprrxf6gx-3001.app.github.dev/api/ratings"); // Cambia la URL según tu API
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
                ratings.map((rating) => (
                    <UserRating
                        key={rating.id}
                        rating={{
                            userImage: rating.user?.image_Url,
                            userName: rating.user?.name || "Anonymous",
                            stars: rating.rating,
                            opinion: rating.opinions,
                        }}
                    />
                ))
            ) : (
                <p className="text-center">No ratings available</p>
            )}
        </div>
    );
};

export default RatingsList;