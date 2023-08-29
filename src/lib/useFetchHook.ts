import { useState } from "react";
import randomWords from "random-words";
import { format, checkMultiples } from "./helperFunctions";

interface phonoGroup {
  text: string;
  audio: string;
}

export const useFetchPhono = (): [string, string[], () => Promise<void>] => {
  const [corrTranscr, setCorrTranscr] = useState<string[]>([]);
  const [regWord, setRegWord] = useState("");

  const innerFetch = async () => {
    setCorrTranscr([]);
    setRegWord("");

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
        innerFetch();
      }
    } catch {
      innerFetch();
    }
  };

  return [regWord, corrTranscr, innerFetch];
};
