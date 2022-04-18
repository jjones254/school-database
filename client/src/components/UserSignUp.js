import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context"
import axios from "axios";
import URL from "../config";

// dispaly a user sign up form
function UserSignUp() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [emailAddress, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "firstName") {
            setFirstName(e.target.value);
        } else if (e.target.name === "lastName") {
            setLastName(e.target.value);
        } else if (e.target.name === "emailAddress") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${URL}/api/users`, {
                emailAddress: emailAddress,
                password: password,
                firstName: firstName,
                lastName: lastName,
            })
            .then(() => {
                alert("New Profile Created!");
                actions.signIn(emailAddress, password);
                navigate('/');
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                console.log({error});
            });
    };

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            { 
                errors ? 
                (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors && errors.map((error, i) => {
                                return <li key={i}>{error}</li>;
                            })}
                        </ul>
                    </div>
                ) 
                : 
                ("")
            }
            <form onSubmit={ handleSubmit }>
                <label>
                    First Name
                    <input id="firstName" name="firstName" type="text" defaultValue="" onChange={ handleChange } />
                </label>
                <label>
                    Last Name
                    <input id="lastName" name="lastName" type="text" defaultValue="" onChange={ handleChange } />
                </label>
                <label>
                    Email Address
                    <input id="emailAddress" name="emailAddress" type="email" defaultValue="" onChange={ handleChange } />
                </label>
                <label>
                    Password
                    <input id="password" name="password" type="password" defaultValue="" onChange={ handleChange } />
                </label>
                <button className="button" type="submit">Sign Up</button>
                <Link to='/'>
                    <button className="button button-secondary">Cancel</button>
                </Link>
            </form>
            <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
        </div>
    );
};

export default UserSignUp;