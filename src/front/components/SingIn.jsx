import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Hook para redirigir al usuario

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://opulent-adventure-v6gxwg4vprrxf6gx-3001.app.github.dev/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // Redirigir al usuario a la página de usuario
            navigate("/user");
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sign In</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    );
};

export default SingIn;