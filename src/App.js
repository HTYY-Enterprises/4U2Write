import { useState } from "react";
import PromptAndAnswer from "./Components/PromptAndAnswer";
import AddNewPrompt from "./Components/AddNewPrompt";

const dailyPrompt = [
  { prompt: "Write about a dragon who doesn’t know what to do with their hoard anymore.",
    answer: ""},
  { prompt: "What is your favorite color?", answer: "" },
  { prompt: "What is your favorite food?", answer: "" },
  { prompt: "What is your favorite movie?", answer: "" },
  { prompt: "Start your story with a home alarm system going off.",answer: "",},
];

function App() {
  const [allPrompts, setAllPrompts] = useState(dailyPrompt);
  const [page, setPage] = useState(0);
  const [showAddPrompt, setShowAddPrompt] = useState(false);

  const handleAddPrompt = (prompt, answer) => {
    setAllPrompts([...allPrompts, { prompt, answer }]);
    setShowAddPrompt(false);
  };

  // on click, go to the next page
  const handleClickNext = () => {
    setPage(page + 1);
  };

  // on click, go to the previous page
  const handleClickPrevious = () => {
    setPage(page - 1);
  };

  // toggle showAddPrompt to prompt user to add their own prompt
  const toggleAddPrompt = () => {
    setShowAddPrompt(!showAddPrompt);
  };

  return (
    <div className="App">
      <h1>Daily Writing App</h1>
      {!showAddPrompt && (
        <>
          {allPrompts.map(({ prompt, answer }, index) => {
            return index === page ? (
              <PromptAndAnswer prompt={prompt} answer={answer} />
            ) : null;
          })}
          <button onClick={handleClickPrevious} disabled={page === 0}>
            Previous Prompt
          </button>
          <button
            onClick={handleClickNext}
            disabled={page === allPrompts.length - 1}
          >
            Daily Prompt
          </button>
        </>
      )}
      <button onClick={toggleAddPrompt}>Add Your Own Prompt</button>
      {showAddPrompt && <AddNewPrompt handleAddPrompt={handleAddPrompt} />}
    </div>
  );
}

export default App;
