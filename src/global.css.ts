import { globalStyle } from "@vanilla-extract/css";

globalStyle(`*`, {
  boxSizing: `border-box`,
  margin: 0,
  padding: 0,
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  lineHeight: 1.5,
});

globalStyle("body", {
  backgroundColor: "#181a1f",
});
