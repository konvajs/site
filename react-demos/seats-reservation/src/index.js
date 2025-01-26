import React from "react";
import ReactDOM from "react-dom";
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
ReactDOM.render(<App />, rootElement);
