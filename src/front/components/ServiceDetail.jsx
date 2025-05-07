import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import emptyImage from "../assets/img/empty.jpg";

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [messageContent, setMessageContent] = useState("");
    const [messageType, setMessageType] = useState("");

    const { store, dispatch } = useGlobalReducer();

    const contactServiceProvider = async () => {
        if (!message) return;

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(`${backendUrl}/send_email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: store.user.email,
                    recipient: "jjcarrera04@gmail.com",
                    message: message,
                }),
            });

            if (response.ok) {
                setMessageContent("Email sent successfully!");
                setMessageType("success");
            } else {
                setMessageContent("Failed to send email. Please try again.");
                setMessageType("error");
            }
        } catch (error) {
            console.error("Error contacting service provider:", error);
            setMessageContent("An unexpected error occurred. Please try again.");
            setMessageType("error");
        } finally {
            setShowModal(false);
            setShowMessage(true);
        }
    };

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

                const userResponse = await fetch(`${backendUrl}/api/users/${data.user.id}`);
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
            <h2 className="text-center mb-4">{service.name}</h2>
            <div className="row align-items-center">
                <div className="col-md-6 text-center">
                    <img
                        src={user.image_Url ? user.image_Url : emptyImage}
                        alt={service.name}
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
                    <div style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
                        <p><strong>Description:</strong> {service.description}</p>
                        <p><strong>Time:</strong> {service.time}</p>
                        <p><strong>Price:</strong> ${service.price}</p>
                        <p><strong>Category:</strong> {service.category?.name}</p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                {store.user ? (
                    <button
                        className="btn btn-warning btn-lg"
                        onClick={() => setShowModal(true)}
                    >
                        Contact Service Provider
                    </button>
                ) : (
                    <button
                        className="btn btn-warning btn-lg"
                        disabled
                        data-toggle="tooltip"
                        data-placement="top"
                        title="You need to be logged in to contact the service provider"
                    >
                        Login to Contact
                    </button>
                )}
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
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    placeholder="Type your message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={contactServiceProvider}
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showMessage && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{messageType === "success" ? "Success" : "Error"}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowMessage(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{messageContent}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowMessage(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;