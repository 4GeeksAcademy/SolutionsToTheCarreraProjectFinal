import React from "react";
import "../styles/Banner.css";
import operariosImage from "../assets/img/Banner.png";

const Banner = () => {
    return (
        <div className="banner text-center">
            <img
                src={operariosImage}
                alt="Operarios"
                className="img-fluid mb-4"
                style={{
                    objectFit: "cover",
                    width: "50%",
                    height: "auto",
                
                }}
            />
        </div>
    );
};

export default Banner;