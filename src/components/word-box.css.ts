import { style, keyframes } from "@vanilla-extract/css";

const drop = keyframes({
  "0%": { transform: "translateY(-60%)" },
  "33%": { transform: "translateY(10%)" },
  "66%": { transform: "translateY(-5%)" },
  "100%": { transform: "translateY(0)" },
});

export const wordBox = style({
  color: "#636cff",
  fontSize: "2em",
  letterSpacing: "4px",
  marginBottom: "20px",
  animationName: drop,
  animationDuration: "1s",
});
