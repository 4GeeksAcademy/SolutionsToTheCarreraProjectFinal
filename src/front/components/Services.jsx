import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Services = () => {
    const { store, dispatch } = useGlobalReducer();
    const { serviceId } = useParams();



    const [formData, setFormData] = useState({
        name: "",
        description: "",
        time: "",
        price: "",
        image: null,
        category_id: "",
    });

    const navigate = useNavigate()

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL

                if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

                if (!serviceId) {
                    return;
                }

                const response = await fetch(`${backendUrl}/api/services/${serviceId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const serviceData = await response.json();
                setFormData(serviceData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            name: formData.name,
            description: formData.description,
            time: formData.time,
            price: formData.price,
            image_Url: formData.image ? formData.image.name : null,
            category_id: formData.category_id,
            user_id: store.user.id
        };

        if (serviceId) {
            formDataToSend.id = serviceId;

        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const method = serviceId ? "PUT" : "POST";

            const response = await fetch(backendUrl + `/api/services/${serviceId ? serviceId : ""}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });

            if (!response.ok) {
                throw new Error("Failed to register service");
            }

            const data = await response.json();
            setMessage("Service registered successfully!");
            navigate("/user");
            console.log("API Response:", data);
        } catch (error) {
            console.error("Error registering service:", error);
            setMessage("Error registering service. Please try again.");
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center">{serviceId ? (
                "Editar servicio"
            ) : ("Crear servicio")}</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Service Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time (e.g., 2 hours)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Service Image (Optional)</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category_id" className="form-label">Category ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={`btn btn-${serviceId ? "primary" : "success"}`}>{serviceId ? "Edit" : "Create"}</button>
            </form>
        </div>
    );
};

export default Services;