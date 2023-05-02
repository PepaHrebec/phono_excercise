type letterBoxProps = {
  innerVal: string;
};

// displays letters entered through keyboard
export default function LetterBox({ innerVal }: letterBoxProps) {
  return <div>{innerVal}</div>;
}
