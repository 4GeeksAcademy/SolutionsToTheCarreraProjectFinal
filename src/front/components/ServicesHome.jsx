import React from 'react';


const ServicesHome = () => {
    return (
        <div>
            <div className="container">
                <h1 className="text-center mt-5">Welcome to Our Services</h1>
                <p className="lead text-center">We offer a variety of services to meet your needs.</p>

                <div className="row">
                    <div className="col-md-4">
                        <h2>Service 1</h2>
                        <p>Description of Service 1.</p>
                    </div>

                    <div className="col-md-4">
                        <h2>Service 2</h2>
                        <p>Description of Service 2.</p>
                    </div>

                    <div className="col-md-4">
                        <h2>Service 3</h2>
                        <p>Description of Service 3.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesHome;