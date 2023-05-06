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
  height: "90vh",
  textAlign: "center",
  margin: "0 auto",
  padding: "6px",
  display: "flex",
  alignItems: "center",
});

globalStyle("#root", {
  margin: "0 auto",
});
