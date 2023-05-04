import { style, keyframes } from "@vanilla-extract/css";

const pop = keyframes({
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.1)" },
  "100%": { transform: "scale(1)" },
});

export const box = style({
  backgroundColor: "#23262c",
  color: "#fefefe",
  padding: "8px 12px",
  borderRadius: "8px",
  width: "fit-content",
  margin: "10px auto",
  animationName: pop,
  animationDuration: "0.5s",
});
