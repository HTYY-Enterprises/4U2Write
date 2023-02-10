import { useState } from "react";

function NewPrompt() {
  const [makePrompt, setmakePrompt] = useState([]);

  const [userInput, setUserInput] = useState("");

  return (
    <div>
      <h1>Testing - Make Prompt</h1>
      <h2>Please input your prompt</h2>
    </div>
  );
}

export default NewPrompt;
