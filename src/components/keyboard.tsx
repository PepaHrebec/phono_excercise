import { keyButton, delButton } from "./keyboard.css";
import { memo } from "react";

interface keyboardProps {
  clickLetterBtn: React.MouseEventHandler;
  clickDeleteBtn: React.MouseEventHandler;
}

export default memo(function Keyboard({
  clickLetterBtn,
  clickDeleteBtn,
}: keyboardProps) {
  const consArr = [
    "p",
    "b",
    "t",
    "d",
    "k",
    "g",
    "m",
    "n",
    "ŋ",
    "f",
    "v",
    "θ",
    "ð",
    "s",
    "ʃ",
    "z",
    "ʒ",
    "h",
    "w",
    "j",
    "l",
    "r",
  ];
  const vowelArr = [
    "i",
    "ɪ",
    "ʊ",
    "u",
    "e",
    "ɜ",
    "ə",
    "ɔ",
    "ɒ",
    "ʌ",
    "æ",
    "a",
    "ɑ",
    "ː",
  ];

  return (
    <div>
      <div>
        {vowelArr.map((sign) => (
          <button onClick={clickLetterBtn} key={sign} className={keyButton}>
            {sign}
          </button>
        ))}
      </div>
      <div>
        {consArr.map((sign) => (
          <button onClick={clickLetterBtn} key={sign} className={keyButton}>
            {sign}
          </button>
        ))}
        <button onClick={clickDeleteBtn} className={delButton}>
          Delete
        </button>
      </div>
    </div>
  );
});
