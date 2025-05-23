import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        image: null,
    });

    const [message, setMessage] = useState("");
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            image_Url: formData.image,
        };

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

            const response = await fetch(backendUrl + "/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            const data = await response.json();
            setMessage("User registered successfully!");
            console.log("API Response:", data);

            const formDatatologin = {
                email: formData.email,
                password: formData.password
            };

            const responseLogin = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formDatatologin),
            });

            if (!responseLogin.ok) {
                throw new Error("Invalid credentials");
            }

            const datalogin = await responseLogin.json();

            dispatch({ type: "login", payload: { token: datalogin.token, user: datalogin.user } });
            localStorage.setItem("token", datalogin.token);
            localStorage.setItem("user", JSON.stringify(datalogin.user));
            navigate("/user");



        } catch (error) {
            console.error("Error registering user:", error);
            setMessage("Error registering user. Please try again.");
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Profile Image (Optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formData.image || ""}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;