import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

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
                        src={service.image_Url}
                        alt={service.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <p><strong>Description:</strong> {service.description}</p>
                    <p><strong>Time:</strong> {service.time}</p>
                    <p><strong>Price:</strong> ${service.price}</p>
                    <p><strong>Category:</strong> {service.category?.name}</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;