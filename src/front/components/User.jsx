import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
const User = () => {
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);


    const { store, dispatch } = useGlobalReducer();

    const fetchUserData = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

            const response = await fetch(`${backendUrl}/api/users/${store.user.id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const userData = await response.json();
            setUser(userData);

            // Fetch related data (e.g., services or ratings)
            const userServices = await fetch(`${backendUrl}/api/users/${store.user.id}/services`);
            if (!userServices.ok) {
                throw new Error("Failed to fetch related data");
            }
            const servicesData = await userServices.json();
            setServices(servicesData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {


        fetchUserData();
    }, []);


    const handleDeleteService = async (serviceId) => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(backendUrl + `/api/services/${serviceId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete service");
            }

            const data = await response.json();
            await fetchUserData(); // Refresh user data after deletion
            // setMessage("Service deleted successfully!");
            console.log("API Response:", data);
        } catch (error) {
            console.error("Error registering service:", error);
            // setMessage("Error registering service. Please try again.");
        }
    };


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
                        style={{ width: "200px", height: "200px" }}
                    />
                </div>
                <div className="col-md-8">
                    <h2>Welcome {user.name}!</h2>
                    <div className="form-group">
                        <label>Email:</label>
                        {editing ? (
                             <input type="email" value="{user.email}" />
                        ) : (
                        <span>{user.email}</span>
                        )}
                    </div>
                    {editing && <input type="password" />}
                    {editing && <button className="btn btn-info" >Save</button>}
                    {!editing && <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit</button>}
                    {editing && <button className="btn btn-danger" onClick={() => setEditing(false)}>Cancel</button>}

                </div>
            </div>
            <div className="mt-4">
                <h3>Services Data</h3>
                {services.length === 0 ? (
                    <p>No related data available</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>{new Date(service.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <Link to={`/services/${service.id}`} className="btn btn-primary btn-sm me-2">
                                            View
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteService(service.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Link to="/services" className="btn btn-secondary">
                    New service
                </Link>
            </div>
        </div>
    );
};

export default User;