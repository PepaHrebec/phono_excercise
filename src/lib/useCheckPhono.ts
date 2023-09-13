import { useState } from "react";

type phonoStateUnion = "" | "Correct!" | "Wrong";

interface innerFooProps {
  fetchedTranscripts: string[];
  inputArr: string[];
}

export const useCheckPhono = (): [
  phonoStateUnion,
  ({ fetchedTranscripts, inputArr }: innerFooProps) => void,
  () => void
] => {
  const [phonoState, setPhonoState] = useState<phonoStateUnion>("");

  let flag = false;
  const innerFoo = ({ fetchedTranscripts, inputArr }: innerFooProps) => {
    fetchedTranscripts.forEach((transcrip) => {
      if (
        transcrip.replaceAll(
          String.fromCharCode(103),
          String.fromCharCode(609)
        ) ===
        inputArr
          .join("")
          .replaceAll(String.fromCharCode(103), String.fromCharCode(609))
      ) {
        setPhonoState("Correct!");
        flag = true;
        console.log(`${transcrip} = ${inputArr.join("")}`);
      } else {
        console.log(`${transcrip} =/= ${inputArr.join("")}`);
      }
    });
    if (flag === false) {
      setPhonoState("Wrong");
    }
  };

  const resetPhonoState = () => {
    setPhonoState("");
  };

  return [phonoState, innerFoo, resetPhonoState];
};
