import { wordBox } from "./word-box.css";

type wordBoxProps = {
  innerVal: string;
};

// displays the fetched word
export default function WordBox({ innerVal }: wordBoxProps) {
  return (
    <div className={wordBox} key={innerVal}>
      {innerVal.toUpperCase()}
    </div>
  );
}
