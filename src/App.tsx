import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import LetterBox from "./components/letter-box";
import WordBox from "./components/word-box";
import Keyboard from "./components/keyboard";
import { btns, mainWrap } from "./App.css";
import ResponseBox from "./components/response";

interface phonoGroup {
  text: string;
  audio: string;
}

function App() {
  const [corrTranscr, setCorrTranscr] = useState<string[]>([]);
  const [showRes, setShowRes] = useState(false);
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
      .replace(/ɜ(?!ː)/, "e")
      .replaceAll("oʊ", "əʊ")
      .replaceAll("oː", "ɔː");
  };

  const fetchPhono = async () => {
    setCorrTranscr([]);
    setLetterArr([]);
    setPhonoState("");
    setShowRes(false);

    let rand: string[] = randomWords(1);

    try {
      // randomWords sometimes generates a word without an entry
      const fetchData = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${rand}`
      );

      // API sometimes returns 2 identical arrays
      const objData = await fetchData.json();
      const validData = objData[0];

      // API object sometimes doesn't contain transcriptions
      if (
        "phonetics" in validData &&
        validData.phonetics.length > 0 &&
        "text" in validData.phonetics[0]
      ) {
        // show the fetched word only if it is correct
        setRegWord(rand[0]);

        validData.phonetics.map((group: phonoGroup) => {
          // sometimes hides two answers behind brackets
          if (group.text.includes("(")) {
            const longerText = group.text.replace(/\(|\)/g, "");
            const shorterText =
              group.text.slice(0, group.text.indexOf("(")) +
              group.text.slice(group.text.indexOf(")") + 1, group.text.length);
            setCorrTranscr((prev) => [
              ...prev,
              format(longerText),
              format(shorterText),
            ]);
          } else {
            setCorrTranscr((prev) => [...prev, format(group.text)]);
          }
        });

        // gets rid of accidental duplicates
        setCorrTranscr((prevTranscr) => checkMultiples(prevTranscr));
      } else {
        fetchPhono();
      }
    } catch {
      fetchPhono();
    }
  };

  // compares user transcription to the correct ones
  // replaceAll() because of the "g" issue
  const checkPhono = () => {
    let flag = false;
    corrTranscr.forEach((transcrip) => {
      if (
        transcrip.replaceAll(
          String.fromCharCode(103),
          String.fromCharCode(609)
        ) ===
        letterArr
          .join("")
          .replaceAll(String.fromCharCode(103), String.fromCharCode(609))
      ) {
        setPhonoState("Correct!");
        flag = true;
        console.log(`${transcrip} = ${letterArr.join("")}`);
      } else {
        console.log(`${transcrip} =/= ${letterArr.join("")}`);
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

  // transcriptions sometimes contain duplicates
  const checkMultiples = (origArr: string[]) => {
    const rtrnArr: string[] = [];
    origArr.forEach((word) => {
      if (!rtrnArr.includes(word)) {
        rtrnArr[rtrnArr.length] = word;
      }
    });
    console.log(rtrnArr);
    return rtrnArr;
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
      <LetterBox
        innerVal={
          showRes === false ? `${letterArr.join("")}` : corrTranscr.join(", ")
        }
      />
      <button onClick={fetchPhono} className={btns["new"]}>
        New Word
      </button>
      <button onClick={checkPhono} className={btns["check"]}>
        Check
      </button>
      <button
        onClick={() => setShowRes((prev) => !prev)}
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
