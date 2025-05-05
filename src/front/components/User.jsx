import React, { useEffect, useState } from "react";

const User = () => {
    const [user, setUser] = useState(null);
    const [relatedData, setRelatedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL

                if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

                const response = await fetch(backendUrl + "/api/users/1"); // Cambia el ID según sea necesario
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                setUser(userData);

                // Fetch related data (e.g., services or ratings)
                const relatedResponse = await fetch(backendUrl + "/api/users/${userData.id}/related");
                if (!relatedResponse.ok) {
                    throw new Error("Failed to fetch related data");
                }
                const relatedData = await relatedResponse.json();
                setRelatedData(relatedData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    if (!user) {
        return <p className="text-center mt-5">User not found</p>;
    }

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-4 text-center">
                    <img
                        src={user.image_Url || "https://via.placeholder.com/150"}
                        alt={user.name}
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: "200px", height: "auto" }}
                    />
                </div>
                <div className="col-md-8">
                    <h2>{user.name}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Status:</strong> {user.is_active ? "Active" : "Inactive"}</p>
                </div>
            </div>
            <div className="mt-4">
                <h3>Related Data</h3>
                {relatedData.length > 0 ? (
                    <ul className="list-group">
                        {relatedData.map((item) => (
                            <li key={item.id} className="list-group-item">
                                {item.name || item.description || "No details available"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No related data available</p>
                )}
            </div>
        </div>
    );
};

export default User;