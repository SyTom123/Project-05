import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helpers/cookies";
import { useDispatch } from "react-redux";
import { Authen } from "../../actions/authen";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    deleteAllCookie();
    navigate("/login");
    dispatch(Authen());
  };

  return (
    <>
      <button className="button button--red" onClick={handleClick}>
        Logout
      </button>
    </>
  );
}
export default Logout;
