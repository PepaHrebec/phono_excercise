import { keyButton, delButton } from "./keyboard.css";

interface keyboardProps {
  clickLetterBtn: React.MouseEventHandler;
  clickDeleteBtn: React.MouseEventHandler;
}

export default function Keyboard({
  clickLetterBtn,
  clickDeleteBtn,
}: keyboardProps) {
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
    "t",
    "r",
    "ð",
  ];

  return (
    <div>
      {ipaArr.map((sign) => (
        <button onClick={clickLetterBtn} key={sign} className={keyButton}>
          {sign}
        </button>
      ))}
      <button onClick={clickDeleteBtn} className={delButton}>
        Delete
      </button>
    </div>
  );
}
