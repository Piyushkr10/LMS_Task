import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/api';

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await API.get(`/quiz/${quizId}`);
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error.message);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/quiz/${quizId}/submit`, { answers });
      setScore(data.score);
    } catch (error) {
      console.error('Error submitting quiz:', error.message);
    }
  };

  if (!quiz) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div className="take-quiz">
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question) => (
          <div key={question._id}>
            <p>{question.text}</p>
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={question._id}
                  value={option}
                  onChange={(e) => handleChange(e, question._id)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {score !== null && <p>Your Score: {score}/{quiz.questions.length}</p>}
    </div>
  );
};

export default TakeQuiz;
