import React from "react";
import { createRoot } from "react-dom/client";
import MainStage from "./MainStage";
import "./styles.css";

function App() {
  return (
    <MainStage
      onSelectSeat={seatId => {
        console.log("selected - " + seatId);
      }}
    />
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
