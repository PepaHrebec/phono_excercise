import { box } from "./letter-box.css";

type letterBoxProps = {
  innerVal: string;
};

// displays letters entered through keyboard
export default function LetterBox({ innerVal }: letterBoxProps) {
  return (
    <div className={box} key={innerVal}>
      {innerVal !== "" ? innerVal : ". . ."}
    </div>
  );
}
