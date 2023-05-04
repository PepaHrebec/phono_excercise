import {
  style,
  globalStyle,
  styleVariants,
  createTheme,
} from "@vanilla-extract/css";

// const [themeClass, vars] = createTheme({
//   backg: {
//     classic: "#24282e",
//   },
//   text: {
//     classic: "#bec1c9",
//   },
// });

const base = style({
  backgroundColor: "#24282e",
  margin: "4px",
  color: "#bec1c9",
  transition: "box-shadow 0.25s",
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
