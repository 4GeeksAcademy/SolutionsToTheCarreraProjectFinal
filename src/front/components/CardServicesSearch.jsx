import React from "react";
import { useNavigate } from "react-router-dom";

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
            style={{ maxWidth: "100%", cursor: "pointer" }}
            onClick={handleCardClick} 
        >
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                        src={user.image_Url}
                        alt={user.name}
                        className="img-fluid rounded-circle"
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>

                <div className="col-md-8 position-relative">
                    <div
                        className="position-absolute"
                        style={{
                            top: "10px",
                            right: "10px",
                        }}
                    >
                        {renderStars(user?.average_rating || 0)}
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">{service.name}</h5>
                        <p className="card-text">{service.description}</p>
                        <p className="card-text"><strong>Time:</strong> {service.time}</p>
                        <p className="card-text"><strong>Price:</strong> ${service.price}</p>

                        <p className="card-text"><strong>Name:</strong> {user.name}</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardServicesSearch;