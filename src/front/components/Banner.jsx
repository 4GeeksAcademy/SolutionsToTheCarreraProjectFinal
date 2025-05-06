import React from "react";
import "../styles/Banner.css";
import operariosImage from "../assets/img/image.png";

const Banner = () => {
    return (
        <div className="banner text-center p-5" style={{ backgroundColor: "#f8f9fa" }}>
            <img
                src={operariosImage}
                alt="Operarios"
                className="img-fluid mb-4"
                style={{ maxHeight: "200px", objectFit: "cover" }}
            />
        </div>
    );
};

export default Banner;