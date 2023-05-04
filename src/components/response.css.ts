import { style, styleVariants } from "@vanilla-extract/css";

const base = style({
  padding: "8px 12px",
  color: "#bec1c9",
  width: "fit-content",
  borderRadius: "8px",
  margin: "0 auto",
});

export const responses = styleVariants({
  correct: [
    base,
    {
      backgroundColor: "#2E8B57",
    },
  ],
  wrong: [
    base,
    {
      backgroundColor: "#CD5C5C",
    },
  ],
});
