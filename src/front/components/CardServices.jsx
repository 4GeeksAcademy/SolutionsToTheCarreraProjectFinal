
import React from "react";
import operariosImage from "../assets/img/image.png";

const CardServices = ({ service }) => {
    return (
        <div className="col-10 mb-4" key={service.id}>
            <div className="card h-100">
                <img
                    src={service.image_Url || operariosImage}
                    className="card-img-top"
                    alt={service.name}
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text">{service.description}</p>
                    <p className="card-text">
                        <strong>Time:</strong> {service.time}
                    </p>
                    <p className="card-text">
                        <strong>Price:</strong> {service.price}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default CardServices;