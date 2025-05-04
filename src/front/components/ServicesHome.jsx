import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CardServices from "../components/CardServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServicesHome = () => {
    const [services, setServices] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("https://opulent-adventure-v6gxwg4vprrxf6gx-3001.app.github.dev/api/services"); // Cambia la URL según tu API
                if (!response.ok) {
                    throw new Error("Failed to fetch services");
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    // Configuración de react-slick
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Muestra 3 tarjetas al mismo tiempo
        slidesToScroll: 1, // Desplaza una tarjeta por clic
        responsive: [
            {
                breakpoint: 1024, // Para pantallas medianas
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, // Para pantallas pequeñas
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Our Services</h2>
            <Slider {...settings}>
                {services.map((service) => (
                    <div key={service.id} style={{ padding: "10px" }}>
                        <div>
                            <CardServices service={service} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ServicesHome;