import React from "react";

import useStore from "../store";

export default () => {
  const regions = useStore(s => s.regions);
  const setRegions = useStore(s => s.setRegions);

  // index of the item we are currently dragging
  const draggedIndex = React.useRef(null);

  const moveRegion = (from, to) => {
    if (from === null || from === to) {
      return;
    }
    const next = regions.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setRegions(next);
  };

  const removeRegion = index => {
    const next = regions.slice();
    next.splice(index, 1);
    setRegions(next);
  };

  return (
    <div className="regions-list">
      {regions.map((region, index) => (
        <div
          key={region.id}
          className="region"
          draggable
          onDragStart={() => {
            draggedIndex.current = index;
          }}
          onDragOver={e => e.preventDefault()}
          onDrop={() => {
            moveRegion(draggedIndex.current, index);
            draggedIndex.current = null;
          }}
          style={{
            boxShadow: `0 0 5px ${region.color}`,
            border: `1px solid ${region.color}`,
            cursor: "move"
          }}
        >
          Region #{region.id}
          <button
            onClick={() => {
              removeRegion(index);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
