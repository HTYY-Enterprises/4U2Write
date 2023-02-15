import { useState } from "react";

function PromptAndAnswer({ prompt, answer }) {
  const [userInput, setUserInput] = useState(answer);

  const handleAnswerChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <h2>{prompt}</h2>
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

export default PromptAndAnswer;
