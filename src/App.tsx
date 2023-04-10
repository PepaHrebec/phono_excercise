import { useState, useEffect } from "react";
import randomWords from "random-words";
import "./App.css";
import letterBox from "./components/letter_box";

function App() {
  const [phonoWord, setPhonoWord] = useState("");
  const [regWord, setRegWord] = useState("");
  const [letterArr, setLetterArr] = useState<string[]>([]);
  const [currLetter, setCurrLetter] = useState(0);
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

  const format = (s: string) => {
    return s.slice(1, s.length - 1).replaceAll("ɹ", "r");
  };

  const fetchPhono = () => {
    let rand: string[] = randomWords(1);
    setRegWord(rand[0]);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${rand}`).then(
      (res) =>
        res
          .json()
          .then((res) => res[0])
          .then((res) => {
            if ("phonetic" in res) {
              setPhonoWord(format(res.phonetic));
              setLetterArr(Array.from(" ".repeat(res.phonetic.length)));
            } else {
              setPhonoWord(format(res.phonetics[1].text));
              setLetterArr(Array.from(" ".repeat(res.phonetics[1].length)));
            }
          })
    );
  };

  const clickBtn = (e: React.PointerEvent<HTMLButtonElement>): void => {
    console.log((e.target as HTMLElement).innerText);
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
          <button onClick={clickBtn} key={sign}>
            {sign}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
