import React, { useState, useEffect } from "react";
import WordRow from "./components/WordRow";
import { checkGuess } from "./utils/wordChecker";

import "./App.css";

function App() {
  const WordOfTheDay = "FORGO";
  const [guesses, setGuesses] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [show, setShow] = useState(false);
  const showHideHandler = () => {
    setShow(!show);
  };
  const backspace = () => {
    setCurrentWord((prev) => prev && prev.slice(0, -1));
  };
  const enter = () => {
    if (currentWord.length === 5) {
      setGuesses((prev) => [...prev, currentWord]);
      setCurrentWord("");
    }
  };
  const word = (letter) => {
    setCurrentWord((prev) =>
      prev.length === 5 ? prev : prev + letter.toUpperCase()
    );
  };

  const handleKeyDown = (e) => {
    let pressedKey = String(e.key);
    if (pressedKey === "Backspace") {
      backspace();
      return;
    }

    if (pressedKey === "Enter") {
      enter();
      return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
      return;
    } else {
      word(pressedKey);
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);
  useEffect(() => {
    if (window.innerWidth < 1024) {
      alert("Please use a larger screen to play this game.");
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess the word</h1>
        <div className="description">
          <ul>
            <li>
              <p>Background Green for correct guess</p>
            </li>
            <li>
              <p>Background indigo for correct guess but wrong position</p>
            </li>
            <li>
              <p>Background not changes for incorrect guess </p>
            </li>
            <li>
              <p>Press ENTER for check your gusses.</p>
            </li>
            <li>
              <p>Press BACKSPACE for remove character one by one.</p>
            </li>
          </ul>
        </div>
        {guesses.map((guess) => (
          <WordRow word={guess} result={checkGuess(guess, WordOfTheDay)} />
        ))}
        <WordRow word={currentWord} />
        <div className="show-hide">
          <button onClick={showHideHandler}>
            {show ? "Hide Answer" : "Show Answer"}
          </button>
          {show && <p>The Word Of The Day : {WordOfTheDay}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
