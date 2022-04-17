import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./context";

function PrivateRoute({ Component }) {
  const { authenticatedUser } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      {authenticatedUser ? (
        <Component />
      ) : (
        <div className="wrap">
          <p>You are not logged in. Please Sign In!</p>
          <button className="button" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </div>
      )}
    </>
  );
}
export default PrivateRoute;