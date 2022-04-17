import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context"

// display a user sign in form
function UserSignIn() {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "emailAddress") {
            setEmailAddress(e.target.value);
        }
    
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        actions.signIn(emailAddress, password);
        navigate('/');
    };

    return (
        <div className="form--centered" onSubmit={ handleSubmit }>
            <h2>Sign In</h2>
            <form>
                <label>
                    Email Address
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue="" onChange={ handleChange } />
                </label>
                <label>
                    Password
                    <input id="password" name="password" type="password" defaultValue="" onChange={ handleChange } />
                </label>
                <button className="button" type="submit">Sign In</button>
                <Link to='/'>
                    <button className="button button-secondary">Cancel</button>
                </Link>
            </form>
            <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>
        </div>
    );
}

export default UserSignIn;