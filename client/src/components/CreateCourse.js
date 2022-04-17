import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../config";
import { Context } from '../context';

// display a form to create a new course
function CreateCourse() {
    const { authenticatedUser } = useContext(Context);
    
    const [courseTitle, setCourseTitle] = useState();
    const [courseDescription, setCourseDescription] = useState();
    const [estimatedTime, setEstimatedTime] = useState();
    const [materialsNeeded, setMaterialsNeeded] = useState();
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        if (e.target.name === "courseTitle") {
            setCourseTitle(e.target.value);
        } else if (e.target.name === "courseDescription") {
            setCourseDescription(e.target.value);
        } else if (e.target.name === "estimatedTime") {
            setEstimatedTime(e.target.value);
        } else if (e.target.name === "materialsNeeded") {
            setMaterialsNeeded(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${URL}/api/courses`, {
                title: courseTitle,
                description: courseDescription,
                estimatedTime: estimatedTime,
                materialsNeeded: materialsNeeded,
                UserId: authenticatedUser.data.id,
            },
            { 
                auth: {
                    username: authenticatedUser.config.auth.username,
                    password: authenticatedUser.config.auth.password
                }  
            })
            .then(() => {
                alert("New Course Created!");
                navigate('/');
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                console.log({error});
            });
    };

    return (
        <div className="wrap">
            <h2>Create Course</h2>
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
                <div className="main--flex">
                    <div>
                        <label>
                            Course Title
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue="" onChange={ handleChange }></input>
                        </label>
                        <p>By {authenticatedUser.data.firstName} {authenticatedUser.data.lastName}</p>
                        <label htmlFor="courseDescription">
                            Course Description
                        </label>
                        <textarea id="courseDescription" name="courseDescription" onChange={ handleChange }></textarea>
                    </div>
                    <div>
                        <label>
                            Estimated Time
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" onChange={ handleChange }></input>
                        </label>
                        <label htmlFor="materialsNeeded">
                            Materials Needed
                        </label>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={ handleChange }></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <Link to='/'>
                    <button className="button button-secondary">Cancel</button>
                </Link>
            </form>
        </div>
    );
};

export default CreateCourse;