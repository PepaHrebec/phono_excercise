import { style, styleVariants, keyframes } from "@vanilla-extract/css";

const intro = keyframes({
  "0%": { transform: "translateY(60%) translateX(-50%)", opacity: 0 },
  "33%": { transform: "translateY(-10%) translateX(-50%)", opacity: 1 },
  "66%": { transform: "translateY(5%) translateX(-50%)" },
  "100%": { transform: "translateY(0) translateX(-50%)" },
});

const base = style({
  padding: "8px 12px",
  color: "#bec1c9",
  width: "fit-content",
  borderRadius: "8px",
  margin: "0 auto",
  position: "absolute",
  bottom: -100,
  left: "50%",
  transform: "translateX(-50%)",
  animationName: intro,
  animationDuration: "1s",
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
