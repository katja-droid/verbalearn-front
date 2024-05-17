import React, { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import FillInTheBlank from './FillInTheBlank';

function QuestionNavigator({ questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [results, setResults] = useState({});
    const [completed, setCompleted] = useState(false);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log('All questions answered.');
            setCompleted(true);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleResponse = (selectedOption) => {
        const updatedResponses = { ...responses };
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = checkAnswer(selectedOption, currentQuestion.correctAnswer);
        updatedResponses[currentQuestionIndex] = selectedOption;
        setResponses(updatedResponses);
        const updatedResults = { ...results };
        updatedResults[currentQuestionIndex] = isCorrect;
        setResults(updatedResults);
    };
    
    const checkAnswer = (response, correctAnswer) => {
        return response === correctAnswer;
    };

    const getCurrentQuestion = () => {
        return questions[currentQuestionIndex];
    };

    const renderQuestion = () => {
        if (completed) {
            return <div>All questions completed. You can now submit your responses.</div>;
        }

        const currentQuestion = getCurrentQuestion();
        const questionNumber = currentQuestionIndex + 1;

        switch (currentQuestion.type) {
            case 'multiple_choice':
                return (
                    <MultipleChoiceQuestion
                        {...currentQuestion}
                        selectedOption={responses[currentQuestionIndex]} // Pass selectedOption
                        setSelectedOption={(option) => setResponses({ ...responses, [currentQuestionIndex]: option })} // Pass setSelectedOption
                        triesLeft={3} // Assuming a default value for triesLeft
                        handleSubmit={() => handleResponse(responses[currentQuestionIndex])} // Pass handleSubmit
                        response={responses[currentQuestionIndex]} // Pass response
                        isCorrect={results[currentQuestionIndex]} // Pass isCorrect
                        questionNumber={questionNumber}
                    />
                );
            case 'true_false':
                return (
                    <TrueFalseQuestion
                        {...currentQuestion}
                        setSelectedOption={(option) => setResponses({ ...responses, [currentQuestionIndex]: option })}
                        onResponse={handleResponse}
                        triesLeft={1} 
                        response={responses[currentQuestionIndex]}
                        isCorrect={results[currentQuestionIndex]}
                        questionNumber={questionNumber}
                    />
                );
            case 'fill_in_the_blank':
                return (
                    <FillInTheBlank
                        {...currentQuestion}
                        onResponse={handleResponse}
                        response={responses[currentQuestionIndex]}
                        isCorrect={results[currentQuestionIndex]}
                        questionNumber={questionNumber}
                    />
                );
            default:
                return <div>Unknown question type</div>;
        }
    };

    console.log('Completed:', completed);

    return (
        <div className="container mt-4">
            <div className="row">
            <div className="col d-flex justify-content-between">
    {currentQuestionIndex > 0 && (
        <button onClick={handlePrev} className="btn btn-primary">Previous</button>
    )}
    {completed ? (
        <button onClick={() => console.log('Finish button clicked.')} className="btn btn-success">Finish</button>
    ) : (
        <button onClick={handleNext} className="btn btn-primary">Next</button>
    )}
</div>

            </div>
            <div className="row mt-3">
                <div className="col">
                    {renderQuestion()}
                </div>
            </div>
        </div>
    );
}

export default QuestionNavigator;
