import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthorization } from './AuthorizationContext';

function MultipleChoiceQuestion({ question, options, correctAnswer, questionNumber, userId, courseId, questionId }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [response, setResponse] = useState('');
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [triesLeft, setTriesLeft] = useState(1);
    const [questionProgress, setQuestionProgress] = useState(null);
    const { currentUser } = useAuthorization();

    useEffect(() => {
        const fetchQuestionProgress = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/users/${currentUser._id}/progress/${courseId}/questions/${questionId}`);
                setQuestionProgress(response.data);
                setTriesLeft(response.data.triesLeft);
            } catch (error) {
                console.error('Error fetching question progress:', error);
            }
        };

        fetchQuestionProgress();
    }, [userId, courseId, questionId]);

    const handleSubmission = async () => {
        if (selectedOption === '') {
            setResponse('Please select an option');
            return;
        }

        if (questionProgress?.answered) {
            setResponse('You have already answered this question.');
            return;
        }

        const correct = selectedOption === correctAnswer;
        setIsCorrect(correct);
        setResponse(correct ? 'Correct!' : 'Incorrect!');
        setTriesLeft(triesLeft - 1);

        try {
            await axios.put(`http://localhost:5001/users/${currentUser._id}/progress/${courseId}/questions/${questionId}/update`, {
                answered: triesLeft - 1 === 0,  // Set answered to true only if no tries left
                correct: correct,
                triesLeft: triesLeft - 1 // Decrease tries left
            });
            // Update local question progress after submitting
            setQuestionProgress(prev => ({
                ...prev,
                answered: triesLeft - 1 === 0,
                correct: correct,
                triesLeft: prev.triesLeft - 1
            }));
        } catch (error) {
            console.error('Error updating question progress:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5>Question {questionNumber}</h5>
                    <h6>{question}</h6>
                    {options.map((option, index) => (
                        <div className="form-check" key={index}>
                            <input
                                className="form-check-input"
                                type="radio"
                                id={`option${index}`}
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => setSelectedOption(option)}
                                disabled={triesLeft === 0 || questionProgress?.answered}
                            />
                            <label className="form-check-label" htmlFor={`option${index}`}>
                                {option}
                            </label>
                        </div>
                    ))}
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleSubmission}
                        disabled={triesLeft === 0 || questionProgress?.answered}
                    >
                        Submit
                    </button>
                    {response && <p className="mt-2">{response}</p>}
                    <p className="mt-2">Tries left: {triesLeft}</p>
                    {questionProgress?.answered && <p className="mt-2">This question has already been answered.</p>}
                </div>
            </div>
        </div>
    );
}

export default MultipleChoiceQuestion;
