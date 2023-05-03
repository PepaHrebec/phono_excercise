import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import "./App.css";
import LetterBox from "./components/letter_box";
import wordBox from "./components/word_box";
import Keyboard from "./components/keyboard";
import { container } from "./App.css.ts";

type phonoGroup = {
  text: string;
  audio: string;
};

function App() {
  const ref = useRef<string[]>([]);
  const [regWord, setRegWord] = useState("");
  const [phonoState, setPhonoState] = useState<"" | "corr" | "false">("");
  const [letterArr, setLetterArr] = useState<string[]>([]);

  const format = (s: string) => {
    return s
      .slice(1, s.length - 1)
      .replaceAll("ɹ", "r")
      .replaceAll("d͡", "d")
      .replaceAll("ˌ", "")
      .replaceAll("ˈ", "")
      .replaceAll(".", "")
      .replaceAll("n̩", "ən")
      .replaceAll("t͡", "t")
      .replaceAll("l̩", "əl")
      .replaceAll("ɝ", "er")
      .replaceAll("ɚ", "er")
      .replaceAll("ɾ", "t")
      .replaceAll("ʰ", "");
  };

  const fetchPhono = async () => {
    ref.current = [];
    setLetterArr([]);
    setPhonoState("");

    let rand: string[] = randomWords(1);
    setRegWord(rand[0]);

    try {
      // randomWords sometimes generates a word without an entry
      const fetchData = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${rand}`
      );

      // API sometimes returns 2 identical arrays
      const objData = await fetchData.json();
      const validData = objData[0];

      // API object sometimes doesn't contain transcriptions
      if ("phonetics" in validData) {
        validData.phonetics.map((group: phonoGroup) => {
          ref.current = [...ref.current, format(group.text)];
        });
      } else {
        fetchPhono();
      }
      console.log(ref.current);
    } catch {
      fetchPhono();
    }
  };

  // compares user transcription to the correct ones
  const checkPhono = () => {
    let flag = false;
    ref.current.forEach((transcrip) => {
      if (transcrip === letterArr.join("")) {
        setPhonoState("corr");
        flag = true;
      }
    });
    flag === false ? setPhonoState("false") : null;
  };

  // adds a letter to the user transcription
  const clickLetterBtn = (e: React.MouseEvent) => {
    setLetterArr((prev) => [...prev, (e.target as HTMLElement).innerText]);
  };

  // deletes the last letter of the user transcription
  const clickDeleteBtn = () => {
    setLetterArr((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  useEffect(() => {
    fetchPhono();
  }, []);

  useEffect(() => {
    console.log(letterArr);
  }, [letterArr]);

  return (
    <div className="App">
      <div className={container}>{regWord}</div>
      <LetterBox innerVal={`${letterArr.join("")}`} />
      <button onClick={fetchPhono}>New Word</button>
      <button onClick={checkPhono}>Check</button>
      <Keyboard
        clickDeleteBtn={clickDeleteBtn}
        clickLetterBtn={clickLetterBtn}
      />
      <div>{phonoState}</div>
    </div>
  );
}

export default App;
