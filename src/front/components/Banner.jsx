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
            <h2 className="mb-3">¿En qué te puedo ayudar hoy?</h2>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Escribe aquí tu consulta..."
                />
                <button className="btn btn-primary ms-2">Buscar</button>
            </div>
        </div>
    );
};

export default Banner;