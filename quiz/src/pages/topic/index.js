import "./topic.scss";
import { useEffect, useState } from "react";
import { getTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
function Topic() {
  const [topicData, setTopicData] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const result = await getTopic();
      if (result) {
        setTopicData(result);
      }
    };
    getApi();
  }, []);
  
  return (
    <div className="container">
      <div className="topic">
        <h3>Danh sách chủ đề ôn luyện</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên chủ đề</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {topicData.length > 0 && (
              <>
                {topicData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Link to = {`/quiz/${item.id}`}>
                        <button className="button button--blue">Làm bài</button>
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
export default Topic;
