import React from "react";
import defaultUserImage from "../assets/img/empty.jpg";
import { FaStar, FaRegStar } from "react-icons/fa";

const UserRating = ({ rating }) => {
    const { userImage, userName, stars, opinion } = rating;


    const renderStars = () => {
        const fullStars = Math.floor(stars);
        const emptyStars = 5 - fullStars;
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
        <div className="card mb-4"
            style={{
                width: "25em", 
                height: "10em", 
                overflow: "hidden" 
            }}>
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