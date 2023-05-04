import { style } from "@vanilla-extract/css";

export const keyButton = style({
  backgroundColor: "#24282e",
  margin: "6px",
  color: "#bec1c9",
  transition: "box-shadow 0.25s",
  ":hover": { boxShadow: "0 0 2px 1px #bec1c9" },
  ":focus": { boxShadow: "0 0 2px 1px #bec1c9" },
});

export const delButton = style([
  keyButton,
  {
    border: "solid 2px #b90e0a",
    ":hover": { boxShadow: "0 0 2px 1px #b90e0a" },
    ":focus": { boxShadow: "0 0 2px 1px #b90e0a" },
  },
]);
