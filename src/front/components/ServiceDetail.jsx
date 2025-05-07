import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { store, dispatch } = useGlobalReducer();

    const contactServiceProvider = async () => {
        const message = window.prompt("Hi, please type your message", "Hi, I am intereset in your service");
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(`${backendUrl}/api/send_email`, {
                method: "GET",
                //body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error("Failed to contact service provider");
            }

            const data = await response.json();
            console.log("Contacted service provider successfully:", data);
        } catch (error) {
            console.error("Error contacting service provider:", error);
        }
    }

    useEffect(() => {
        const fetchService = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;

                if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

                const response = await fetch(`${backendUrl}/api/services/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch service details");
                }
                const data = await response.json();

                const userResponse = await fetch(`${backendUrl}/api/users/${data.user_id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch service details");
                }
                const userData = await userResponse.json();

                setUser(userData);

                setService(data);
            } catch (error) {
                console.error("Error fetching service details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    if (!service) {
        return <p className="text-center mt-5">Service not found</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{service.name}</h2>
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={user.image_Url}
                        alt={service.name}
                        style={{ width: "100px", height: "100px" }}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <p><strong>Description:</strong> {service.description}</p>
                    <p><strong>Time:</strong> {service.time}</p>
                    <p><strong>Price:</strong> ${service.price}</p>
                    <p><strong>Category:</strong> {service.category?.name}</p>
                </div>

                <div className="col-md-12 mt-4">
                    {
                        store.user ? (
                            <button className="btn btn-warning btn-lg" onClick={() => contactServiceProvider()}>Contact</button>
                        ) : (
                            <button
                                className="btn btn-warning btn-lg"
                                disabled="disabled"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="You need to be logged in to contact the service provider"
                            >Login to contact the service provider</button>
                        )

                    }

                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;