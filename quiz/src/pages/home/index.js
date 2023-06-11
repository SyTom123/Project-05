import { useEffect, useState } from "react";
import { getUserByID } from "../../services/userService";
import { Link } from "react-router-dom";
import "./home.scss";
import { getCookie } from "../../helpers/cookies";

function Home() {
  const [userInfo, setUserInfo] = useState([]);
  const token = getCookie("token");
  useEffect(() => {
    const getApi = async () => {
      const result = await getUserByID();
      if (result) {
        setUserInfo(result);
      }
    };
    getApi();
  }, []);
  return (
    <div className="home">
      <div className="container">
        {token && (
          <div className="home__title">
            {userInfo && (
              <p>
                Xin chào bạn: <strong>{userInfo.fullName}</strong>
              </p>
            )}
            <Link to="/topic">
              <button className="button" style={{ marginRight: "15px" }}>
                Danh sách chủ đề ôn luyện
              </button>
            </Link>
            <Link to="/answer">
              <button className="button">Danh sách bài đã luyện tập</button>
            </Link>
            <hr className="home__hr" />
          </div>
        )}
        <div className="home__content">
          <h3>Chào mừng bạn đến với websize trắc nghiệm online</h3>
          <p>
            Websize trắc nghiệm online lập trình Frond End là một nền tảng trực
            tuyến cho phép các lập trình viên Frond End kiểm tra , làm các bài
            tập trắc nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh
            vực lập trình Frond end.
          </p>
          <p>
            Đối với các lập trình viên Frond End, website trắc nghiệm online
            cung cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng
            của mình trong các công nghệ và công cụ lập trình như HTLM, CSS, JS,
            Boottraps, React.....
          </p>
          <>
            {!token && (
              <p>
                Vui lòng đăng nhập để bắt đầu thực hiện các bài tâp trắc nghiệm
                của chúng tôi!{" "}
              </p>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
export default Home;
