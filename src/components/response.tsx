import { responses } from "./response.css";

export default function ResponseBox({ state }: { state: string }) {
  return (
    <div
      className={state === "Wrong" ? responses["wrong"] : responses["correct"]}
    >
      {state}
    </div>
  );
}
