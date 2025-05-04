import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CardServices from "../components/CardServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServicesHome = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL
                
                if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

                const response = await fetch(backendUrl +"/api/services"); 
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1, 
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600, 
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