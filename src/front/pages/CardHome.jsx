import React, { useEffect, useState } from 'react';
import ServiceHome from '../components/ServicesHome'; // Adjust the path as needed

const CardHome = () => {
    const [data, setData] = useState(null);

    return (
        <div className="card-home">
            <h1>Welcome to CardHome</h1>
            {data ? (
                <p>{data.message}</p> // Customize based on the structure of the data
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CardHome;