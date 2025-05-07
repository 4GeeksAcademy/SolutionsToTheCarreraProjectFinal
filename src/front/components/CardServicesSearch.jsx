import React from "react";
import { useNavigate } from "react-router-dom";
import emptyImage from "../assets/img/empty.jpg";

const CardServicesSearch = ({ service, user }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/servicedetail/${service.id}`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fa${i <= rating ? "s" : "r"} fa-star`}
                    style={{ color: i <= rating ? "gold" : "lightgray" }}
                ></i>
            );
        }
        return stars;
    };

    return (
        <div
        className="card mb-3 border border-warning"
        style={{ maxWidth: "100%", height: "15em",  cursor: "pointer" }}
        onClick={handleCardClick}
    >
        <div className="row g-0 align-items-center">
            <div className="col-md-3 d-flex justify-content-center">
                <img
                    src={user.image_Url || emptyImage}
                    alt={user.name}
                    className="img-fluid rounded-circle"
                    style={{
                        width: "120px", 
                        height: "120px",
                        objectFit: "cover",
                    }}
                />
            </div>

            <div className="col-md-9">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title mb-0">{service.name}</h5>
                        <div>{renderStars(user?.average_rating || 0)}</div>
                    </div>
                    <p className="card-text mb-1" style={{ textAlign: "left" }}>
                        {service.description}
                    </p>
                    <p className="card-text mb-1" style={{ textAlign: "left" }}>
                        <strong>Time:</strong> {service.time}
                    </p>
                    <p className="card-text mb-1" style={{ textAlign: "left" }}>
                        <strong>Price:</strong> ${service.price}
                    </p>
                    <p className="card-text mb-0" style={{ textAlign: "left" }}>
                        <strong>Name:</strong> {user.name}
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CardServicesSearch;