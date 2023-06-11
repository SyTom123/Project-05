import { useEffect, useState } from "react";
import { deleteAnswer, getAnswer } from "../../services/answerService";
import { getTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import "./answer.scss";

function Answer() {

  const [answerData, setAnswerData] = useState([]);

  const getApi = async () => {
    const result = await getAnswer();
    const topics = await getTopic();
    let options = [];
    if (result && topics) {
      for (let i = 0; i < result.length; i++) {
        options.push({
          ...result[i],
          ...topics.find((item) => item.id === result[i].topicId),
          id: parseInt(result[i].id),
        });
      }
    }
    setAnswerData(options.reverse())
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleReload = ()=> {
    getApi();
  }

  const handleDelete = async (id) => {
    const result = await deleteAnswer(id);
    if(result){
      handleReload();
    }
    else {
      alert("Hệ thống đang lỗi, xin vui lòng thử lại");
    }
  }
  return (
    <div className="container">
      <div className="answer">
        <h3>Danh sách bài đã luyện tập</h3>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên chủ đề</th>
              <th>Ngày làm</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {answerData.length > 0 && (
              <>
                {answerData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.createAt}</td>
                    <td>
                      <Link to={`/result/${item.id}`}>
                        <button className="button button--blue">
                          Xem chi tiết
                        </button>
                      </Link>
                      <Link>
                        <button
                          className="button button--red"
                          style={{ marginLeft: "10px" }}
                          onClick={() =>handleDelete(item.id)}
                        >
                          Xóa
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Answer;
