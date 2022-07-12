import React from 'react';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="wrap">
            <h2>Page Not Found</h2>
            <Link to="/" className='button'>Home</Link>
        </div>
    );
};

export default NotFound;