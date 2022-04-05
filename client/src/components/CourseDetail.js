import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

function CourseDetail() {
  const [courseDetail, setCourseDetail] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios(`${URL}/api/courses/${params.id}`)
      .then((res) => setCourseDetail(res.data))
      .catch((err) => console.log(err))
  }, [params.id]);

  const deleteCourse = async () => {
    await axios
      .delete(`${URL}/api/courses/${params.id}`)
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
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to={`/courses/${params.id}/update`}>Update Course</Link>
          <button onClick={deleteCourse} className="button">Delete Course</button>
          <Link className="button" to={'/'}>Return to List</Link>
        </div>
      </div>
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