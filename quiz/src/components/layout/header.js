/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";
import { useSelector } from "react-redux";
import Logout from "../../pages/logout";
function Header() {
  const token = getCookie("token");
  const authen = useSelector((state) => state.AuthenReducer);
  return (
    <div className="layout__header">
      <div className="layout__header-logo">
        <Link to="/">Quiz</Link>
      </div>
      {token && (
        <div className="layout__headerCenter">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/topic">Topic</NavLink>
            </li>
            <li>
              <NavLink to="/answer">Answer</NavLink>
            </li>
          </ul>
        </div>
      )}
      {!token ? (
        <div className="layout__header-right">
          <Link to="/login">
            <button
              className="button button--blue"
              style={{ marginRight: "15px" }}
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="button button--blue">Register</button>
          </Link>
        </div>
      ) : (
        <Logout />
      )}
    </div>
  );
}
export default Header;
