import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
const User = () => {
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            email: formData.email,
            user_id: store.user.id,
        };

        if (formData.password) {
            formDataToSend.password = formData.password;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(backendUrl + `/api/users/${store.user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });

            if (!response.ok) {
                throw new Error("Failed to update user data");
            }

            const data = await response.json();
            // setMessage("Service registered successfully!");
            console.log("API Response:", data);
            setEditing(false);
            fetchUserData(); // Refresh user data after update
        } catch (error) {
            console.error("Error updating user:", error);
            // setMessage("Error registering service. Please try again.");
        }
    };

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
            setFormData(userData)
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
                        src={user.image_Url}
                        alt={user.name}
                        className="img-fluid rounded-circle"
                        style={{ width: "200px", height: "200px" }}
                    />
                </div>
                <div className="col-md-8 d-flex flex-column">
                    <h2 className="text-center mb-4">Welcome {user.name}!</h2>
                    {!editing && (
                        <div className="mb-4">
                            <label className="mb-2 d-block">Email:</label>
                            <span>{user.email}</span>
                        </div>
                    )}

                    {editing && (
                        <form onSubmit={handleSubmit} className="w-100">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    )}

                    <div className="mt-auto d-flex justify-content-start">
                        {editing ? (
                            <>
                                <button type="submit" className="btn btn-info btn-lg me-2">Save</button>
                                <button className="btn btn-danger btn-lg" onClick={() => setEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <button className="btn btn-primary btn-lg" onClick={() => setEditing(true)}>Edit</button>
                        )}
                    </div>
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
                                <th>Time</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>{service.time}</td>
                                    <td>{service.price}</td>
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