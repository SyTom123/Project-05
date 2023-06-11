import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { createUser, getUser } from "../../services/userService";

function Register() {
    const navigate = useNavigate ();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let options = {
      email: "",
      password: "",
      name: "",
    };
    options.email = e.target.email.value;
    options.password = e.target.password.value;
    options.name = e.target.name.value;
    const checkExitUser = await getUser(options.email);
    if (checkExitUser.length > 0) {
      alert("Tài khoản đã tồn tại, vui lòng đăng ký tài khoản khác");
    } else {
      const result = await createUser(options);
      if (result) {
        alert("Đăng ký thành công");
        navigate('/login');
      } else {
        alert("Hệ thống đang lỗi, xin vui lòng thử lại sau");
      }
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label> <br />
        <input id="name" name="name" required /> <br />
        <label htmlFor="email">Email</label> <br />
        <input id="email" name="email" required /> <br />
        <label htmlFor="password">Password </label> <br />
        <input type="password" id="password" name="password" required /> <br />
        <button className="button button--blue"> Register </button>
      </form>
      or <Link to="/login">Login</Link>
    </div>
  );
}
export default Register;
