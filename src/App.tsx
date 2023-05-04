import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import "./App.css";
import LetterBox from "./components/letter-box";
import WordBox from "./components/word-box";
import Keyboard from "./components/keyboard";
import { btns, mainWrap } from "./App.css.ts";
import ResponseBox from "./components/response";

interface phonoGroup {
  text: string;
  audio: string;
}

function App() {
  const ref = useRef<string[]>([]);
  const [regWord, setRegWord] = useState("");
  const [phonoState, setPhonoState] = useState<"" | "Correct!" | "Wrong">("");
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
      .replaceAll("ʰ", "")
      .replaceAll("ɛ", "ɜ")
      .replace(/ɜ(?!ː)/, "e");
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
          // sometimes hides two answers behind brackets
          if (group.text.includes("(")) {
            const longerText = group.text.replace(/\(|\)/g, "");
            const shorterText =
              group.text.slice(0, group.text.indexOf("(")) +
              group.text.slice(group.text.indexOf(")") + 1, group.text.length);
            ref.current = [
              ...ref.current,
              format(longerText),
              format(shorterText),
            ];
          } else {
            ref.current = [...ref.current, format(group.text)];
          }
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
        setPhonoState("Correct!");
        flag = true;
      }
    });
    flag === false ? setPhonoState("Wrong") : null;
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
    <div className={mainWrap}>
      <WordBox innerVal={regWord} />
      <LetterBox innerVal={`${letterArr.join("")}`} />
      <button onClick={fetchPhono} className={btns["new"]}>
        New Word
      </button>
      <button onClick={checkPhono} className={btns["check"]}>
        Check
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
