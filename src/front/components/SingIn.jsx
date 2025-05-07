import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import operariosImage from "../assets/img/Banner.png";

const SingIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                email: email,
                password: password
            };

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            dispatch({ type: "login", payload: { token: data.token, user: data.user } });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/user");
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                {/* Imagen grande a la izquierda */}
                <div className="col-md-6 text-center">
                    <img
                        src={operariosImage}
                        alt="Sign In Illustration"
                        className="img-fluid rounded"
                    />
                </div>

                {/* Formulario a la derecha */}
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Sign In</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control form-control-sm"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-sm"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm w-100">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingIn;