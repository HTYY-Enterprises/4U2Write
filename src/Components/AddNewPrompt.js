import { useState } from "react";

function AddNewPrompt({ handleAddPrompt }) {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const handleButtonClick = (event) => {
    event.preventDefault();
    handleAddPrompt(prompt, answer);
    setPrompt("");
    setAnswer("");
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <form onSubmit={handleButtonClick}>
      <h2>Prompt:</h2>
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        rows={4}
        cols={50}
      />
      <h2>Answer:</h2>
      <textarea
        value={answer}
        onChange={handleAnswerChange}
        rows={4}
        cols={50}
      />
      <button type="submit">Add Prompt</button>
    </form>
  );
}

export default AddNewPrompt;
