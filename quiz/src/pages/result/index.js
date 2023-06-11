/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnswerById } from "../../services/answerService";
import { getTopic } from "../../services/topicService";
import { getQuestion } from "../../services/questionService";
import './result.scss';

function Result() {
  const param = useParams();
  const [resultData, setResultData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [info, setInfo] = useState();

  useEffect(() => {
    const getApi = async () => {
      const dataAnswer = await getAnswerById(param.id);
      const dataQuestion = await getQuestion(dataAnswer.topicId);
      const topic = await getTopic(dataAnswer.topicId);
      setTopicData(topic);

      let options = [];
        for (let i = 0; i < dataQuestion.length; i++) {
          options.push({
            ...dataQuestion[i],
            ...dataAnswer.answers.find(
              (item) => item.questionId === dataQuestion[i].id
            ),
          });
        setResultData(options);
      }
      if(options.length > 0){
        let answerTrue = 0;
        options.forEach((item) => {
          if (item.answer === item.correctAnswer) {
            answerTrue++;
          }
        });
  
        const infos = {
          answerTrueQuantity: parseInt(answerTrue),
          total: options.length,
        };
        setInfo(infos);
      }
    };

    getApi();
  }, []);

  return (
    <div className="container">
      <div className="result">
        {topicData && <h3 className="result__title">Kết quả chủ đề: {topicData.name}</h3>}
        {info && (
          <div className="result__info">
            <span>
              Đúng: <strong> {info.answerTrueQuantity}</strong>
            </span>
            <span>
              Sai: <strong>{info.total - info.answerTrueQuantity}</strong>
            </span>
            <span>
              Tổng số câu:<strong>{info.total}</strong>
            </span>
            <span>
              Tỷ lệ đúng:
              <strong>
                {(((info.answerTrueQuantity / info.total) * 100).toFixed(2)) || 0} %
              </strong>
            </span>
          </div>
        )}

        <div className="result__display">
          {resultData.length > 0 && (
            <form className="result__questions">
              {resultData.map((item, index) => (
                <div className="result__question" key={item.id}>
                  <p>
                    Câu {index + 1}: {item.question}
                    {(item.answer === item.correctAnswer) ? (
                      <span className= "result__tag result__tag--true"> Đúng </span>
                    ):( <span className= "result__tag result__tag--false"> Sai </span>)}
                  </p>

                  {item.answers.map((answer, i) => {
                    let checked = false;
                    let className = "";
                    if(item.answer === i) {
                      checked = true;
                      className = "result__item--selected"
                    }
                    if((item.correctAnswer === i)){
                      className = "result__item--result"
                    }

                    return (
                      <div className="result__question-item"  key={`${item.id}-${i}`}>
                        <input type="radio" disabled checked = {checked}/> 
                        <label className={className}>{answer}</label>
                      </div>
                     
                    )})}
                </div>
              ))}
            </form>
          )}
          {topicData && (
          <Link to={"/quiz/" + topicData.id}>
            <button className="button button--blue">Làm lại</button>
          </Link>
      )}
        </div>
      </div>
    </div>
  );
}
export default Result;
