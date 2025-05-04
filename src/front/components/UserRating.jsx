import React from "react";
import defaultUserImage from "../assets/img/image.png"; // Imagen predeterminada si no hay imagen del usuario
import { FaStar, FaRegStar } from "react-icons/fa"; // Iconos para las estrellas

const UserRating = ({ rating }) => {
    const { userImage, userName, stars, opinion } = rating;

    // Generar estrellas llenas y vacías según el rating
    const renderStars = () => {
        const fullStars = Math.floor(stars); // Número de estrellas llenas
        const emptyStars = 5 - fullStars; // Número de estrellas vacías
        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={`full-${index}`} className="text-warning" />
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <FaRegStar key={`empty-${index}`} className="text-warning" />
                ))}
            </>
        );
    };

    return (
        <div className="card mb-4">
            <div className="card-body d-flex align-items-center">
                <img
                    src={userImage || defaultUserImage}
                    alt={userName}
                    className="rounded-circle me-3"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div>
                    <h5 className="card-title mb-1">{userName}</h5>
                    <div className="mb-2">{renderStars()}</div>
                    <p className="card-text">{opinion}</p>
                </div>
            </div>
        </div>
    );
};

export default UserRating;