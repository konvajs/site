import React from "react";
import { Group, Rect } from "react-konva";
import { observer, inject } from "mobx-react";

import Sash from "./Sash";
import Glass from "./Glass";
import OpeningDirection from "./OpeningDirection";
import Handle from "./Handle";
import Devider from "./Devider";

class SectionInner extends React.Component {
  handleClick = e => {
    const firstSection = e.target.findAncestor(".section");
    if (firstSection === this.group) {
      this.props.store.selectedSectionId = this.props.section.id;
    }
  };
  render() {
    const { section, x, y } = this.props;

    const isSelected = this.props.store.selectedSection === section;

    const childSections = [];
    let offsetX = 0;
    let offsetY = 0;
    for (const child of section.sections) {
      if (child.nodeType === "section") {
        childSections.push(<Section section={child} x={offsetX} y={offsetY} />);
      } else {
        childSections.push(
          <Devider
            width={child.width}
            height={child.height}
            x={offsetX}
            y={offsetY}
          />
        );
      }

      if (section.splitDirection === "vertical") {
        offsetX += child.width;
      } else {
        offsetY += child.height;
      }
    }
    return (
      <Group
        x={x}
        y={y}
        onClick={this.handleClick}
        ref={node => {
          this.group = node;
        }}
        name="section"
      >
        <Glass
          width={section.width}
          height={section.height}
          padding={section.frameSize}
        />
        <OpeningDirection
          width={section.width}
          height={section.height}
          padding={section.frameSize}
          type={section.type}
        />

        <Sash
          width={section.width}
          height={section.height}
          size={section.frameSize}
        />
        <Handle
          width={section.width}
          height={section.height}
          padding={section.frameSize}
          type={section.type}
        />
        {isSelected && (
          <Rect
            width={section.width}
            height={section.height}
            fill="green"
            opacity={0.3}
          />
        )}
        {childSections}
      </Group>
    );
  }
}

const Section = inject("store")(observer(SectionInner));

export default Section;
