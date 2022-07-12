import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import URL from "../config";
import { Context } from "../context";

// fetch course details to display on page
function CourseDetail() {
  const [courseDetail, setCourseDetail] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const { authenticatedUser } = useContext(Context);

  useEffect(() => {
    axios(`${URL}/api/courses/${params.id}`)
      .then((res) => {
        if (res.data) {
          setCourseDetail(res.data)
        } else {
          navigate('/notfound');
        }
      })
      .catch((error) => {
        navigate('/error');
        console.log(error);
      });
  }, [params.id, navigate]);

  const deleteCourse = async () => {
    await axios
      .delete(`${URL}/api/courses/${params.id}`,
      { 
        auth: {
            username: authenticatedUser.config.auth.username,
            password: authenticatedUser.config.auth.password
        }  
      })
      .then(() => {
        alert("Your Course Has Been Deleted!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {courseDetail && authenticatedUser && authenticatedUser.data.id === courseDetail.userId 
        ? 
        (
          <div className="actions--bar">
            <div className="wrap">
              <Link className="button" to={`/courses/${params.id}/update`}>Update Course</Link>
              <button onClick={ deleteCourse } className="button">Delete Course</button>
              <Link className="button" to={'/'}>Return to List</Link>
            </div>
          </div>
        ) 
        : 
        (
          <div className="actions--bar">
            <div className="wrap">
              <Link className="button" to={'/'}>Return to List</Link>
            </div>
          </div>
        )
      }
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{courseDetail && courseDetail.title}</h4>
              <p>By {courseDetail && courseDetail.User.firstName} {courseDetail && courseDetail.User.lastName}</p>
              <ReactMarkdown>{courseDetail && courseDetail.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{courseDetail && courseDetail.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{courseDetail && courseDetail.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;