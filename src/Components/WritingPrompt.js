import React, { useState } from "react";

const DailyPrompt = [
  {
    question:
      "Write about a dragon who doesn’t know what to do with their hoard anymore.",
    answer: "",
  },
  { question: "What is your favorite color?", answer: "" },
  { question: "What is your favorite food?", answer: "" },
  { question: "What is your favorite movie?", answer: "" },
  {question: "Start your story with a home alarm system going off.", answer: ""},
];

function QuestionAndAnswer({ question, answer }) {
  const [userInput, setUserInput] = useState(answer);

  const handleAnswerChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <h2>{question}:</h2>
      <h2>Answer:</h2>
      <textarea
        value={userInput}
        onChange={handleAnswerChange}
        rows={4}
        cols={50}
      />
    </div>
  );
}
