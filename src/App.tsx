import { useState, useEffect } from "react";
import randomWords from "random-words";
import "./App.css";
import letterBox from "./components/letter_box";
import wordBox from "./components/word_box";
import Keyboard from "./components/keyboard";

function App() {
  const [phonoWord, setPhonoWord] = useState("");
  const [regWord, setRegWord] = useState("");
  const [letterArr, setLetterArr] = useState<string[]>([]);
  const [currLetter, setCurrLetter] = useState(0);

  // dangerous: d͡, ˌ,

  const format = (s: string) => {
    return s.slice(1, s.length - 1).replaceAll("ɹ", "r");
  };

  const fetchPhono = () => {
    let rand: string[] = randomWords(1);
    setRegWord(rand[0]);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${rand}`)
      .then((res) =>
        res
          .json()
          .then((res) => res[0])
          .then((res) => {
            if ("phonetic" in res) {
              setPhonoWord(format(res.phonetic));
              setLetterArr(Array.from(" ".repeat(format(res.phonetic).length)));
              console.log(res);
            } else {
              setPhonoWord(format(res.phonetics[1].text));
              setLetterArr(
                Array.from(" ".repeat(format(res.phonetics[1]).length))
              );
              console.log(res);
            }
          })
      )
      .catch(() => {
        fetchPhono();
      });
  };

  const clickBtn = (e: React.MouseEvent): void => {
    console.log((e.target as HTMLElement).innerText);
    setLetterArr((prev) => [...prev, (e.target as HTMLElement).innerText]);
    console.log(letterArr);
  };

  useEffect(() => {
    fetchPhono();
  }, []);

  return (
    <div className="App">
      <div>{regWord}</div>
      <div>{phonoWord}</div>
      <button onClick={fetchPhono}>Click me</button>
      <div></div>
      <Keyboard clickBtn={clickBtn} />
    </div>
  );
}

export default App;
