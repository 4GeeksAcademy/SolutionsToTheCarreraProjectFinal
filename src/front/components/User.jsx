import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import emptyImage from "../assets/img/empty.jpg";
const User = () => {
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const { store, dispatch } = useGlobalReducer();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        image_Url: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const deleteAccount = async () => {
        if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;


        }
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");
        try {
            const response = await fetch(backendUrl + `/api/users/${store.user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            const data = await response.json();
            console.log("API Response:", data);
            setMessage("Account deleted successfully!");
            navigate("/logout");
        } catch (error) {
            console.error("Error deleting account:", error);
            setMessage("Error deleting account. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = {
            email: formData.email,
            user_id: store.user.id,
            image_Url: formData.image_Url,
        };



        if (formData.password) {
            formDataToSend.password = formData.password;
        }
        console.log(formData);


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
            
            console.log("API Response:", data);
            setEditing(false);
            fetchUserData(); 
        } catch (error) {
            console.error("Error updating user:", error);
            
        }
    };


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
        if (!store.user) {
            navigate("/validateSession");
            return;
        }

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
            <form onSubmit={handleSubmit} className="w-100">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center position-relative">
                        {editing && <button type="button" className="btn btn-primary position-absolute top-0 end-0 m-2" onClick={() => { setShowModal(true); }}>Edit</button>}
                        <img
                            src={formData.image_Url || emptyImage}
                            alt={user.name}
                            style={{
                                width: "100%",
                                maxWidth: "400px",
                                height: "auto",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Welcome, {user.name}!</h2>
                        {!editing ? (
                            <div style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-3">

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="image_Url"
                                        name="image_Url"
                                        value={formData.image_Url}
                                        onChange={handleChange}
                                        hidden
                                    />

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
                            </>
                        )}
                        <div className="mt-4 d-flex justify-content-start">
                            {editing ? (
                                <>
                                    <button type="submit" className="btn btn-info btn-lg me-2">Save</button>
                                    <button type="button" className="btn btn-secondary btn-lg me-2" onClick={() => setEditing(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger btn-lg me-2" onClick={deleteAccount}>Delete Account</button>
                                </>
                            ) : (
                                <button type="button" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); setEditing(true); }}>Edit</button>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <div className="mt-5">
                <h3 className="text-center mb-4">Your Services</h3>
                {services.length === 0 ? (
                    <p className="text-center">No services available</p>
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
                                    <td>${service.price}</td>
                                    <td>
                                        <Link to={`/services/${service.id}`} className="btn btn-primary btn-sm me-2">
                                            View
                                        </Link>
                                        <button
                                            type="button"
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
                <div className="text-center mt-4">
                    <Link to="/services" className="btn btn-secondary btn-lg">Add New Service</Link>
                </div>
            </div>
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Contact Service Provider</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img className="img img-fluid w-100" src={formData.image_Url} />
                                <input className="form-control" type="text" onChange={(e) => setFormData({ ...formData, image_Url: e.target.value })} />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => { setShowModal(false); setFormData({ ...formData, image_Url: user.image_Url }); }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>



    );
};

export default User;