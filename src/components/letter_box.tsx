type letterBoxProps = {
  innerVal: string;
};

// displays letters entered through keyboard
export default function letterBox({ innerVal }: letterBoxProps) {
  return <div>{innerVal}</div>;
}
