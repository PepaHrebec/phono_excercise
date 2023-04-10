import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import randomWords from "random-words";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const ipaArr = [
    "p",
    "b",
    "t",
    "d",
    "k",
    "g",
    "m",
    "n",
    "ŋ",
    "ʃ",
    "ʒ",
    "f",
    "v",
    "θ",
    "s",
    "z",
    "ʃ",
    "h",
    "w",
    "j",
    "l",
    "i",
    "u",
    "ɪ",
    "ʊ",
    "e",
    "ɛ",
    "o",
    "ə",
    "ʌ",
    "æ",
    "a",
    "ɔ",
    "ː",
    "ɑ",
    "ɒ",
    "ˈ",
    "r",
    "ð",
  ];

  const fetchPhono = () => {
    let rand: string[] = randomWords(1);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${rand[0]}`).then(
      (res) =>
        res
          .json()
          .then((res) => {
            console.log(res[0]);
            return res[0];
          })
          .then((res) => {
            if ("phonetic" in res) {
              setWord(res.phonetic);
            } else {
              setWord(res.phonetics[1].text);
            }
          })
    );
  };

  useEffect(() => {
    fetchPhono();
  }, []);

  return (
    <div className="App">
      <div>{word}</div>
      <button onClick={fetchPhono}>Click me</button>
      <div>
        {ipaArr.map((sign) => (
          <button key={sign}>{sign}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
