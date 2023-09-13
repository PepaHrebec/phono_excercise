import { style } from "@vanilla-extract/css";

export const keyButton = style({
  backgroundColor: "#24282e",
  margin: "4px",
  color: "#bec1c9",
  transition: "all 0.25s",
  minWidth: "3.2em",
  borderRadius: "6px",
  padding: "0.3em 0.6em",
  fontSize: "0.8em",
  fontFamily: "inherit",
  cursor: "pointer",
  border: "none",
  ":hover": { boxShadow: "0 0 2px 1px #bec1c9" },
  ":focus": { boxShadow: "0 0 2px 1px #bec1c9" },
  ":active": { transform: "scale(0.95)" },
});

export const delButton = style([
  keyButton,
  {
    border: "solid 2px #b90e0a",
    ":hover": { boxShadow: "0 0 2px 1px #b90e0a" },
    ":focus": { boxShadow: "0 0 2px 1px #b90e0a" },
  },
]);

export const keyboard = style({
  width: "clamp(20em, 60%, 40em)",
  margin: "0 auto",
});
