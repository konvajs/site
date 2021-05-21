import React from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';

import Regions from './Regions';
import BaseImage from './BaseImage';

import useStore from '../store';

let id = 1;

function getRelativePointerPosition(node) {
  // the function will return pointer position relative to the passed node
  const transform = node.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  // get pointer (say mouse or touch) position
  const pos = node.getStage().getPointerPosition();

  // now we find relative point
  return transform.point(pos);
}

function zoomStage(stage, scaleBy) {
  const oldScale = stage.scaleX();

  const pos = {
    x: stage.width() / 2,
    y: stage.height() / 2,
  };
  const mousePointTo = {
    x: pos.x / oldScale - stage.x() / oldScale,
    y: pos.y / oldScale - stage.y() / oldScale,
  };

  const newScale = Math.max(0.05, oldScale * scaleBy);

  const newPos = {
    x: -(mousePointTo.x - pos.x / newScale) * newScale,
    y: -(mousePointTo.y - pos.y / newScale) * newScale,
  };

  const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

  stage.to({
    x: newAttrs.x,
    y: newAttrs.y,
    scaleX: newAttrs.scale,
    scaleY: newAttrs.scale,
    duration: 0.1,
  });
}

function limitAttributes(stage, newAttrs) {
  const box = stage.findOne('Image').getClientRect();
  const minX = -box.width + stage.width() / 2;
  const maxX = stage.width() / 2;

  const x = Math.max(minX, Math.min(newAttrs.x, maxX));

  const minY = -box.height + stage.height() / 2;
  const maxY = stage.height() / 2;

  const y = Math.max(minY, Math.min(newAttrs.y, maxY));

  const scale = Math.max(0.05, newAttrs.scale);

  return { x, y, scale };
}

export default () => {
  const stageRef = React.useRef();
  const { width, height } = useStore((s) => ({
    width: s.width,
    height: s.height,
  }));
  const setSize = useStore((s) => s.setSize);
  const scale = useStore((state) => state.scale);
  const isDrawing = useStore((state) => state.isDrawing);
  const toggleDrawing = useStore((state) => state.toggleIsDrawing);

  const regions = useStore((state) => state.regions);
  const setRegions = useStore((state) => state.setRegions);

  const selectRegion = useStore((s) => s.selectRegion);

  React.useEffect(() => {
    function checkSize() {
      const container = document.querySelector('.right-panel');
      setSize({
        width: container.offsetWidth,
        height,
      });
    }
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  return (
    <React.Fragment>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        scaleX={scale}
        scaleY={scale}
        className="canvas"
        onClick={(e) => {
          const clickedNotOnRegion = e.target.name() !== 'region';
          if (clickedNotOnRegion) {
            selectRegion(null);
          }
        }}
        onWheel={(e) => {
          e.evt.preventDefault();
          const stage = stageRef.current;

          const dx = -e.evt.deltaX;
          const dy = -e.evt.deltaY;
          const pos = limitAttributes(stage, {
            x: stage.x() + dx,
            y: stage.y() + dy,
            scale: stage.scaleX(),
          });
          stageRef.current.position(pos);
        }}
        onMouseDown={(e) => {
          toggleDrawing(true);
          const point = getRelativePointerPosition(e.target.getStage());
          const region = {
            id: id++,
            color: Konva.Util.getRandomColor(),
            points: [point],
          };
          setRegions(regions.concat([region]));
        }}
        onMouseMove={(e) => {
          if (!isDrawing) {
            return;
          }
          const lastRegion = { ...regions[regions.length - 1] };
          const point = getRelativePointerPosition(e.target.getStage());
          lastRegion.points = lastRegion.points.concat([point]);
          regions.splice(regions.length - 1, 1);
          setRegions(regions.concat([lastRegion]));
        }}
        onMouseUp={(e) => {
          if (!isDrawing) {
            return;
          }
          const lastRegion = regions[regions.length - 1];
          if (lastRegion.points.length < 3) {
            regions.splice(regions.length - 1, 1);
            setRegions(regions.concat());
          }
          toggleDrawing();
        }}
      >
        <BaseImage />
        <Regions />
      </Stage>
      <div className="zoom-container">
        <button
          onClick={() => {
            zoomStage(stageRef.current, 1.2);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            zoomStage(stageRef.current, 0.8);
          }}
        >
          -
        </button>
      </div>
    </React.Fragment>
  );
};
