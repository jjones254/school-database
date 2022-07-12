import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import URL from "../config";
import { Context } from '../context';

// display a form to update a course
function UpdateCourse() {
    let { authenticatedUser } = useContext(Context);
    const [courseDetail, setCourseDetail] = useState();
    const [courseTitle, setCourseTitle] = useState();
    const [courseDescription, setCourseDescription] = useState();
    const [estimatedTime, setEstimatedTime] = useState();
    const [materialsNeeded, setMaterialsNeeded] = useState();
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const firstName = authenticatedUser.data.firstName;
    const lastName = authenticatedUser.data.lastName;
    
    useEffect(() => {
        const getCourseDetail = () => {
            axios.get(`${URL}/api/courses/${params.id}`)
                .then((res) => {
                    if (res.data) {
                        setCourseDetail(res.data);
                    } else {
                        navigate('/notfound');
                    };
                })
                .catch((error) => {
                    navigate('/error');
                    console.log(error);
                });
        };
        getCourseDetail();
    }, [params.id, navigate]);

    const handleChange = (e) => {
        if (e.target.name === "courseTitle") {
            setCourseTitle(e.target.value);
        } else if (e.target.name === "courseDescription") {
            setCourseDescription(e.target.value);
        } else if (e.target.name === "estimatedTime") {
            setEstimatedTime(e.target.value);
        } else if (e.target.name === "materialsNeeded") {
            setMaterialsNeeded(e.target.value);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .put(`${URL}/api/courses/${params.id}`, {
                title: courseTitle,
                description: courseDescription,
                estimatedTime: estimatedTime,
                materialsNeeded: materialsNeeded,
                userId: authenticatedUser.data.id,
            }, 
            { 
                auth: {
                    username: authenticatedUser.config.auth.username,
                    password: authenticatedUser.config.auth.password
                }  
            })
            .then(() => {
                alert("Course Updated!");
                navigate("/");
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                console.log({error});
            });
    };

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            {
                errors ? 
                (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            { 
                                errors 
                                ? 
                                (errors.map((error, i) => <li key={i}>{error}</li>)) 
                                : 
                                (<li>{errors}</li>)
                            }
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
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={ courseDetail && courseDetail.title } onInput={ handleChange }></input>
                        </label>
                        <p>By {(courseDetail && courseDetail.User.firstName) || firstName} {(courseDetail && courseDetail.User.lastName) || lastName}</p>
                        <label htmlFor="courseDescription">
                            Course Description
                        </label>
                        <textarea id="courseDescription" name="courseDescription" defaultValue={ courseDetail && courseDetail.description } onInput={ handleChange }></textarea>
                    </div>
                    <div>
                        <label>
                            Estimated Time
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={ courseDetail && courseDetail.estimatedTime } onInput={ handleChange }></input>
                        </label>
                        <label htmlFor="materialsNeeded">
                            Materials Needed
                        </label>
                        <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={ courseDetail && courseDetail.materialsNeeded } onInput={ handleChange }></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <Link to='/'>
                    <button className="button button-secondary">Cancel</button>
                </Link>
            </form>
        </div>
    );
};

export default UpdateCourse;