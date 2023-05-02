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
  // const [currLetter, setCurrLetter] = useState(0);

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
      .replaceAll("l̩", "əl");
  };

  const fetchPhono = async () => {
    let rand: string[] = randomWords(1);

    try {
      const fetchData = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${rand}`
      );
      const objData = await fetchData.json();
      console.log(objData);
      const objDataFrstArr = objData[0];
      if ("phonetic" in objDataFrstArr) {
        setPhonoWord(format(objDataFrstArr.phonetic));
        setRegWord(rand[0]);
        // setLetterArr(
        //   Array.from(" ".repeat(format(objDataFrstArr.phonetic).length))
        // );
        console.log(objDataFrstArr);
      } else {
        setPhonoWord(format(objDataFrstArr.phonetics[1].text));
        setRegWord(rand[0]);
        // setLetterArr(
        //   Array.from(" ".repeat(format(objDataFrstArr.phonetics[1]).length))
        // );
        console.log(objDataFrstArr);
      }
    } catch {
      fetchPhono();
    }
  };

  const clickLetterBtn = (e: React.MouseEvent) => {
    setLetterArr((prev) => [...prev, (e.target as HTMLElement).innerText]);
  };

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
      <div>{letterArr.join("")}</div>
      <button onClick={fetchPhono}>Click me</button>
      <div></div>
      <Keyboard
        clickDeleteBtn={clickDeleteBtn}
        clickLetterBtn={clickLetterBtn}
      />
    </div>
  );
}

export default App;
