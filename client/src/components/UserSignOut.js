import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";


function UserSignOut() {
  const { actions } = useContext(Context);
  
  return (
    <>
      <div className="wrap center">
        <p
          style={{
            marginTop: "0.1rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Do you want to Sign Out!
        </p>
        <Link to="/" onClick={() => actions.signOut()} className="button margin">
          Yes
        </Link>
        <Link to="/" className="button margin">
          No
        </Link>
      </div>
    </>
  );
};

export default UserSignOut;