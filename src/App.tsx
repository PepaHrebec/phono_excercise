import { useState, useEffect } from "react";
import LetterBox from "./components/letter-box";
import WordBox from "./components/word-box";
import Keyboard from "./components/keyboard";
import { btns, mainWrap } from "./App.css";
import ResponseBox from "./components/response";
import { useFetchPhono } from "./lib/useFetchHook";
import { useCheckPhono } from "./lib/useCheckPhono";

function App() {
  const [showFetchedTranscripts, setShowFetchedTranscripts] = useState(false);
  const [inputArr, setInputArr] = useState<string[]>([]);
  const [fetchedWord, fetchedTranscripts, hookFoo] = useFetchPhono();
  const [phonoState, setPhonoState, resetPhonoState] = useCheckPhono();

  // adds a letter to the user transcription
  const clickLetterBtn = (e: React.MouseEvent) => {
    setInputArr((prev) => [...prev, (e.target as HTMLElement).innerText]);
  };

  // deletes the last letter of the user transcription
  const clickDeleteBtn = () => {
    setInputArr((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  useEffect(() => {
    hookFoo();
  }, []);

  useEffect(() => {
    console.log("Hook -", fetchedWord, fetchedTranscripts);
    resetPhonoState();
  }, [fetchedWord]);

  return (
    <div className={mainWrap}>
      <WordBox innerVal={fetchedWord} />
      <LetterBox
        innerVal={
          showFetchedTranscripts === false
            ? `${inputArr.join("")}`
            : fetchedTranscripts.join(", ")
        }
      />
      <button
        onClick={() => {
          hookFoo();
          setInputArr([]);
        }}
        className={btns["new"]}
      >
        New Word
      </button>
      <button
        onClick={() => setPhonoState({ fetchedTranscripts, inputArr })}
        className={btns["check"]}
      >
        Check
      </button>
      <button
        onClick={() => setShowFetchedTranscripts((prev) => !prev)}
        className={btns["res"]}
      >
        Results/Typing
      </button>
      <Keyboard
        clickDeleteBtn={clickDeleteBtn}
        clickLetterBtn={clickLetterBtn}
      />
      {phonoState.length > 0 ? <ResponseBox state={phonoState} /> : null}
    </div>
  );
}

export default App;
