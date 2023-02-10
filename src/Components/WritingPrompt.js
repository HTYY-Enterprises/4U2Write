import { useState, useEffect } from "react";
// import firebase from "../firebase";

function WritingPrompt() {
    const [dailyPrompt, setDailyPrompt] = useState ([]);

  return (
    <div>
      <h1>Testing - Daily Prompt</h1>
      <h2>Would you like a daily prompt?</h2>
    </div>
  );
}

export default WritingPrompt;
