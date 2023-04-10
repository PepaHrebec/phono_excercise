type letterBoxProps = {
  innerVal: string;
};

export default function letterBox({ innerVal }: letterBoxProps) {
  return <div>{innerVal}</div>;
}
