interface keyboardProps {
  clickBtn: React.MouseEventHandler;
}

export default function Keyboard({ clickBtn }: keyboardProps) {
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

  return (
    <div>
      {ipaArr.map((sign) => (
        <button onClick={clickBtn} key={sign}>
          {sign}
        </button>
      ))}
      <button>Remove</button>
    </div>
  );
}
