import { Authen } from "../../actions/authen";
import { setCookie } from "../../helpers/cookies";
import { getUser } from "../../services/userService";
import "./login.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkExitUser = await getUser(email, password);
    
    if (checkExitUser.length > 0) {
      navigate("/");
      const id = checkExitUser[0].id;
      const token = checkExitUser[0].token;
      const time = 1;
      setCookie("id", id, time);
      setCookie("token", token, time);
      dispatch(Authen());
    } else {
      alert("Tài khoản hoặc mật khẩu không tồn tại");
    }
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label> <br />
        <input id="email" name="email" /> <br />
        <label htmlFor="password">Password </label> <br />
        <input type="password" id="password" name="password" /> <br />
        <button className="button button--blue"> Login </button>
      </form>
      or <Link to = "/register">Register</Link>
    </div>
  );
}
export default Login;
