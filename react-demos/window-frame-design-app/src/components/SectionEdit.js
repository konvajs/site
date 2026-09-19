import React from "react";
import { observer } from "mobx-react";

import store from "../store";

class SectionEdit extends React.Component {
  handleTypeSelect = e => {
    store.setSectionType(e.target.value);
  };

  handleFrameSizeChange = e => {
    store.selectedSection.frameSize = parseInt(e.target.value, 10);
  };

  handleVerticalSplit = () => {
    store.splitCurrentSection("vertical");
  };

  handleHorizontalSplit = () => {
    store.splitCurrentSection("horizontal");
  };
  render() {
    let { selectedSection } = store;

    const enabled = selectedSection;
    selectedSection = selectedSection || {};
    return (
      <div
        style={{
          opacity: enabled ? "1" : "0.3",
          pointerEvents: enabled ? "" : "none"
        }}
      >
        <div>
          Sash type:{" "}
          <select value={selectedSection.type} onChange={this.handleTypeSelect}>
            <option value="none">Empty</option>
            <option value="left">Open left</option>
            <option value="right">Open right</option>
            <option value="tilt,left">Tilf and open left</option>
            <option value="tilt,right">Tilf and open right</option>
          </select>
          Frame size:
          <input
            type="number"
            value={selectedSection.frameSize}
            onChange={this.handleFrameSizeChange}
          />
        </div>
        <button onClick={this.handleVerticalSplit}>Split vertical</button>
        <button onClick={this.handleHorizontalSplit}>Split horizontal</button>
      </div>
    );
  }
}

export default observer(SectionEdit);
