import { style, keyframes } from "@vanilla-extract/css";

const drop = keyframes({
  "0%": { transform: "translateY(-60%)", opacity: 0 },
  "33%": { transform: "translateY(10%)", opacity: 1 },
  "66%": { transform: "translateY(-5%)" },
  "100%": { transform: "translateY(0)" },
});

export const wordBox = style({
  opacity: 1,
  color: "#636cff",
  fontSize: "2em",
  letterSpacing: "4px",
  marginBottom: "20px",
  animationName: drop,
  animationDuration: "1.2s",
});
