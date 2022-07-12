import React from 'react';
import { Link } from "react-router-dom";

function Error() {
    return (
        <div className='wrap'>
            <h2>Error!</h2>
            <p>Sorry, we just encountered an unexpected error</p>
            <p>Click here to return to the home page</p>
            <Link to='/' className='button'>Home</Link>
        </div>
    );
};

export default Error;