import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import randomWords from "random-words";
import "./App.css";

function App() {
  const [word, setWord] = useState("");

  const fetchPhono = () => {
    let rand: string[] = randomWords(1);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${rand[0]}`).then(
      (res) =>
        res
          .json()
          .then((res) => res[0])
          .then((res) => setWord(res.phonetic))
    );
  };

  useEffect(() => {
    fetchPhono();
  }, []);

  return (
    <div className="App">
      <div>{word}</div>
      <button onClick={fetchPhono}>Click me</button>
    </div>
  );
}

export default App;
