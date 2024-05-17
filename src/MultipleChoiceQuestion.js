import React, { useState } from 'react';

function TrueFalseQuestion({ question, correctAnswer, triesLeft, handleSubmit, questionNumber }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [response, setResponse] = useState('');
    const [isCorrect, setIsCorrect] = useState(undefined);

    const handleSubmission = () => {
        if (selectedOption === '') {
            setResponse('Please select an option');
            return;
        }

        if (selectedOption === correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        handleSubmit();
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5>Question {questionNumber}</h5>
                    <h6>{question}</h6>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="trueOption"
                            value="true"
                            checked={selectedOption === 'true'}
                            onChange={() => setSelectedOption('true')}
                            disabled={triesLeft === 0}
                        />
                        <label className="form-check-label" htmlFor="trueOption">
                            True
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="falseOption"
                            value="false"
                            checked={selectedOption === 'false'}
                            onChange={() => setSelectedOption('false')}
                            disabled={triesLeft === 0}
                        />
                        <label className="form-check-label" htmlFor="falseOption">
                            False
                        </label>
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleSubmission} disabled={triesLeft === 0}>
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

export default TrueFalseQuestion;
