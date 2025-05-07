import React from "react";
import emptyImage from "../assets/img/empty.jpg";
import { useNavigate } from "react-router-dom";

const CardServices = ({ service }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/servicedetail/${service.id}`);
    };

    return (
        <div
            className="col-10 mb-4"
            key={service.id}
            style={{
                maxWidth: "25em", 
                height: "30em", 
                cursor: "pointer",
                border: "2px solid #d4af37", 
                borderRadius: "8px", 
                padding: "10px", 
                overflow: "hidden", 
                margin: "0 auto", 
            }}
            onClick={handleCardClick}
        >
            <div className="card h-100">
                <img
                    src={service.user?.image_Url || emptyImage} 
                    className="card-img-top"
                    alt={service.name}
                    style={{
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "4px", 
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text" style={{ fontSize: "0.9rem", color: "#555" }}>
                        {service.description}
                    </p>
                    <p className="card-text">
                        <strong>Time:</strong> {service.time}
                    </p>
                    <p className="card-text">
                        <strong>Price:</strong> ${service.price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardServices;