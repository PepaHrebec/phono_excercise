import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import randomWords from "random-words";
import "./App.css";

function App() {
  const [phonoWord, setPhonoWord] = useState("");
  const [regWord, setRegWord] = useState("");
  const [letterArr, setLetterArr] = useState<string[]>([]);
  const ipaArr = [
    "p",
    "b",
    "d",
    "k",
    "g",
    "m",
    "n",
    "ŋ",
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

  // dangerous: d͡, ˌ,

  const format = (s: string): string => {
    return s.slice(1, s.length - 1).replaceAll("ɹ", "r");
  };

  const fetchPhono = () => {
    let rand: string[] = randomWords(1);
    setRegWord(rand[0]);
    setLetterArr(Array.from(" ".repeat(rand[0].length)));
    console.log(letterArr);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${rand}`).then(
      (res) =>
        res
          .json()
          .then((res) => {
            console.log(res[0]);
            return res[0];
          })
          .then((res) => {
            if ("phonetic" in res) {
              setPhonoWord(format(res.phonetic));
            } else {
              setPhonoWord(format(res.phonetics[1].text));
            }
          })
    );
  };

  useEffect(() => {
    fetchPhono();
  }, []);

  return (
    <div className="App">
      <div>{regWord}</div>
      <div>{phonoWord}</div>
      <button onClick={fetchPhono}>Click me</button>
      <div>
        {letterArr.map((letter) => (
          <div key={Math.random()}>Hi</div>
        ))}
      </div>
      <div>
        {ipaArr.map((sign) => (
          <button key={sign}>{sign}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
