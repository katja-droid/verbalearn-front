import React, { useState, useEffect } from 'react';

function FillInTheBlank({ question, correctAnswer, onResponse, response, isCorrect, questionNumber }) {
    const [userInput, setUserInput] = useState('');
    const [triesLeft, setTriesLeft] = useState(3);

    const handleSubmit = () => {
        const isResponseCorrect = userInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        
        if (!isResponseCorrect && triesLeft > 0) {
            setTriesLeft(triesLeft - 1);
        }
        onResponse(userInput);
    };
    
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Question {questionNumber}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{question}</h6>
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={triesLeft === 0}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={userInput === '' || triesLeft === 0}
                    >
                        Submit
                    </button>
                    {response && <p className="mt-2">Your answer: {response}</p>}
                    {isCorrect !== undefined && (
                        <p className="mt-2">{isCorrect ? "Correct!" : "Incorrect!"}</p>
                    )}
                    {triesLeft === 0 && <p className="mt-2">No more tries left</p>}
                </div>
            </div>
        </div>
    );
}

export default FillInTheBlank;
