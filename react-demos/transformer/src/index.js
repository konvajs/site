import React from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1"
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2"
  }
];

const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);

  const shapeRef = React.useRef({});

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const updateRectanglesState = (index, newProps) => {
    const rects = rectangles.slice();
    rects[index] = {
      ...rects[index],
      ...newProps
    };
    setRectangles(rects);
  };

  console.log("Rectangles state", JSON.stringify(rectangles));

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rect
              {...rect}
              ref={(el) => (shapeRef.current[rect.id] = el)}
              key={i}
              draggable
              onClick={() => {
                selectShape(rect.id);
              }}
              onTap={() => {
                selectShape(rect.id);
              }}
              onDragEnd={(e) => {
                updateRectanglesState(i, {
                  x: e.target.x(),
                  y: e.target.y()
                });
              }}
              onTransformEnd={(e) => {
                // transformer is changing scale of the node
                // and NOT its width or height
                // but in the store we have only width and height
                // to match the data better we will reset scale on transform end
                const node = shapeRef.current[rect.id];
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                // we will reset it back
                node.scaleX(1);
                node.scaleY(1);

                updateRectanglesState(i, {
                  x: node.x(),
                  y: node.y(),
                  // set minimal value
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(node.height() * scaleY)
                });
              }}
            />
          );
        })}
        <Transformer
          nodes={selectedId ? [shapeRef.current[selectedId]] : undefined}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      </Layer>
    </Stage>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
