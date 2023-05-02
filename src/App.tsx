import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import "./App.css";
import LetterBox from "./components/letter_box";
import wordBox from "./components/word_box";
import Keyboard from "./components/keyboard";

type phonoGroup = {
  text: string;
  audio: string;
};

function App() {
  const ref = useRef<string[]>([]);
  const [regWord, setRegWord] = useState("");
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
      .replaceAll("ɝ", "er");
  };

  const fetchPhono = async () => {
    ref.current = [];
    setLetterArr([]);

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
    } catch {
      fetchPhono();
    }
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

  // useEffect(() => {
  //   console.log(letterArr);
  // }, [letterArr]);

  return (
    <div className="App">
      <div>{regWord}</div>
      <LetterBox innerVal={`${letterArr.join("")}`} />
      <button onClick={fetchPhono}>Click me</button>
      <Keyboard
        clickDeleteBtn={clickDeleteBtn}
        clickLetterBtn={clickLetterBtn}
      />
    </div>
  );
}

export default App;
