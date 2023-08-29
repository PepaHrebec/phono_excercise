// replaces "unsavoury" characters
export const format = (s: string) => {
  return s
    .slice(1, s.length - 1)
    .replaceAll("ɹ", "r")
    .replaceAll("d͡", "d")
    .replaceAll("ˌ", "")
    .replaceAll("ˈ", "")
    .replaceAll(".", "")
    .replaceAll("n̩", "ən")
    .replaceAll("t͡", "t")
    .replaceAll("l̩", "əl")
    .replaceAll("ɝ", "er")
    .replaceAll("ɚ", "er")
    .replaceAll("ɾ", "t")
    .replaceAll("ʰ", "")
    .replaceAll("ɛ", "ɜ")
    .replace(/ɜ(?!ː)/, "e")
    .replaceAll("oʊ", "əʊ")
    .replaceAll("oː", "ɔː");
};

// transcriptions sometimes contain duplicates
export const checkMultiples = (origArr: string[]) => {
  const set = new Set([...origArr]);
  const rtrnArr = [...set];
  return rtrnArr;
};
