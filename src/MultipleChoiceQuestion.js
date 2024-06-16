import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthorization } from './AuthorizationContext';

function MultipleChoiceQuestion({ question, options, correctAnswer, questionNumber, courseId, questionId }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [response, setResponse] = useState('');
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [triesLeft, setTriesLeft] = useState(1);
    const [questionProgress, setQuestionProgress] = useState(null);
    const { currentUser } = useAuthorization();

    useEffect(() => {
        const fetchQuestionProgress = async () => {
            try {
                const response = await axios.get(`https://verbalearn-back.onrender.com/users/${currentUser._id}/progress/${courseId}/questions/${questionId}`);
                setQuestionProgress(response.data);
                setTriesLeft(response.data.triesLeft);
            } catch (error) {
                console.error('Error fetching question progress:', error);
            }
        };

        fetchQuestionProgress();
    }, [currentUser._id, courseId, questionId]);

    useEffect(() => {
        // Reset the state when questionId changes
        setSelectedOption('');
        setResponse('');
        setIsCorrect(undefined);
    }, [questionId]);

    const handleSubmission = async () => {
        if (selectedOption === '') {
            setResponse('Please choose the correct option.');
            return;
        }

        if (questionProgress?.answered) {
            setResponse('This question has already been answered');
            return;
        }

        const correct = selectedOption === correctAnswer;
        setIsCorrect(correct);
        setResponse(correct ? 'Correct!' : 'Incorrect!');
        setTriesLeft(triesLeft - 1);

        try {
            const response = await axios.put(`https://verbalearn-back.onrender.com/users/${currentUser._id}/progress/${courseId}/questions/${questionId}/update`, {
                correct: correct,
                answered: correct || triesLeft - 1 === 0,
            });

            // Update local question progress after submitting
            setQuestionProgress(response.data.questionProgress);
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
                        className="btn btn-primary"
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
