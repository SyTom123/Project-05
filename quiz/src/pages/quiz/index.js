/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getQuestion } from "../../services/questionService";
import {getCookie} from '../../helpers/cookies';
import "./quiz.scss";
import { createAnswer } from "../../services/answerService";
import getDateTime from "../../helpers/getDateTime";

function Quiz() {
  const param = useParams();
  const idTopic = param.id;
  const navigate = useNavigate();

  const [dataQuestion, setDataQuestion] = useState([]);
  const [dataTopic, setDataTopic] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const result = await getTopic(idTopic);
      const response = await getQuestion(idTopic);
      if (result) {
        setDataTopic(result);
      }
      if (response) {
        setDataQuestion(response);
      }
    };
    getApi();
  }, []);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    let selectedAnswer = [];
    for(let i = 0; i < e.target.elements.length; i++) {
        if(e.target.elements[i].checked === true) {
            const name = e.target.elements[i].name;
            const value = e.target.elements[i].value;
            selectedAnswer.push ({
                questionId: parseInt(name),
                answer: parseInt(value)
            })
        }
    }
    const userId = getCookie("id");
    const topicId = idTopic;
    const options = {
        userId: parseInt (userId),
        topicId: parseInt (topicId),
        answers: selectedAnswer,
        createAt: getDateTime()
    }
    const result =await createAnswer(options);
    if(result){
        navigate(`/result/${result.id}`)
    }
  }

  return (
    <div className="container">
      <div className="quiz">
        {dataTopic && (
          <div className="quiz__title">
            Bài Quiz chủ đề: <strong>{dataTopic.name}</strong>
          </div>
        )}
        {dataQuestion && (
          <form className="quiz__questions" onSubmit={handleSubmit}>
            {dataQuestion.map((item, index) => (
              <div className="quiz__question" key={item.id}>
                <p>
                  Câu {index + 1}: {item.question}
                </p>
                {item.answers.map((answer, i) => (
                  <div className="quiz__question-item" key={`${item.id}-${i}`}>
                    <input
                      type="radio"
                      id={`${item.id}-${i}`}
                      name={`${item.id}`}
                      value={i}
                    />
                    <label htmlFor={`${item.id}-${i}`}>{answer}</label>
                  </div>
                ))}
              </div>
            ))}
            <button className="button button--blue">Nộp bài</button>
          </form>
        )}
      </div>
    </div>
  );
}
export default Quiz;
