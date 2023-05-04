import { style, styleVariants } from "@vanilla-extract/css";

const base = style({
  backgroundColor: "#24282e",
  margin: "4px",
  color: "#bec1c9",
  transition: "all 0.25s",
  ":active": { transform: "scale(0.95)" },
});

export const btns = styleVariants({
  new: [
    base,
    {
      border: "solid 2px #8A9A5B",
      ":hover": { boxShadow: "0 0 2px 1px #8A9A5B" },
      ":focus": { boxShadow: "0 0 2px 1px #8A9A5B" },
    },
  ],
  check: [
    base,
    {
      border: "solid 2px #ec9706",
      ":hover": { boxShadow: "0 0 2px 1px #ec9706" },
      ":focus": { boxShadow: "0 0 2px 1px #ec9706" },
    },
  ],
});