import React, { useState, useEffect } from 'react';
import API from '../../api/api';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ title: '', questions: [] });
  const [newQuestion, setNewQuestion] = useState({ text: '', options: [], correctAnswer: '' });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await API.get('/quiz');
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error.message);
      }
    };
    fetchQuizzes();
  }, []);

  const handleAddQuestion = () => {
    setNewQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setNewQuestion({ text: '', options: [], correctAnswer: '' });
  };

  const handleCreateQuiz = async () => {
    try {
      const { data } = await API.post('/quiz', newQuiz);
      setQuizzes((prev) => [...prev, data]);
      setNewQuiz({ title: '', questions: [] });
    } catch (error) {
      console.error('Error creating quiz:', error.message);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await API.delete(`/quiz/${quizId}`);
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error.message);
    }
  };

  return (
    <div className="quiz-management">
      <h2>Quiz Management</h2>

      <div>
        <h3>Create a New Quiz</h3>
        <input
          type="text"
          placeholder="Quiz Title"
          value={newQuiz.title}
          onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
        />

        <div>
          <h4>Add Question</h4>
          <input
            type="text"
            placeholder="Question Text"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
          />
          <textarea
            placeholder="Options (comma-separated)"
            value={newQuestion.options.join(', ')}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, options: e.target.value.split(',').map((opt) => opt.trim()) })
            }
          />
          <input
            type="text"
            placeholder="Correct Answer"
            value={newQuestion.correctAnswer}
            onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
          />
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>

        <button onClick={handleCreateQuiz}>Create Quiz</button>
      </div>

      <div>
        <h3>Existing Quizzes</h3>
        {quizzes.map((quiz) => (
          <div key={quiz._id}>
            <h4>{quiz.title}</h4>
            <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizManagement;
