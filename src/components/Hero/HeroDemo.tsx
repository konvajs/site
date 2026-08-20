import Translate, { translate } from '@docusaurus/Translate';
import type {Shape} from 'konva/lib/Shape';
import { useEffect, useRef } from 'react';

import styles from './styles.module.css';

// The scene is authored at a fixed size and then scaled to the card, so every
// shape keeps its proportions on any screen.
const SCENE_WIDTH = 560;
const SCENE_HEIGHT = 360;

export default function HeroDemo(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let disposed = false;
    let dispose = () => {};

    import('konva').then(({ default: Konva }) => {
      if (disposed || !containerRef.current) {
        return;
      }

      const stage = new Konva.Stage({
        container: containerRef.current,
        width: SCENE_WIDTH,
        height: SCENE_HEIGHT,
      });

      const layer = new Konva.Layer();
      stage.add(layer);

      const shared = {
        draggable: true,
        shadowColor: '#0b2545',
        shadowBlur: 18,
        shadowOpacity: 0.18,
        shadowOffsetY: 6,
      };

      const card = new Konva.Rect({
        ...shared,
        x: 56,
        y: 66,
        width: 196,
        height: 130,
        cornerRadius: 14,
        fill: '#0584ce',
      });

      const circle = new Konva.Circle({
        ...shared,
        x: 362,
        y: 112,
        radius: 54,
        fill: '#f0a202',
      });

      const star = new Konva.Star({
        ...shared,
        x: 300,
        y: 262,
        numPoints: 5,
        innerRadius: 24,
        outerRadius: 54,
        fill: '#7c5cff',
      });

      const triangle = new Konva.RegularPolygon({
        ...shared,
        x: 118,
        y: 268,
        sides: 3,
        radius: 50,
        fill: '#12b886',
      });

      const label = new Konva.Text({
        ...shared,
        x: 396,
        y: 248,
        text: translate({id: 'homepage.hero.dragMe', message: 'Drag me'}),
        fontSize: 26,
        fontStyle: 'bold',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        fill: '#1b2b40',
        shadowOpacity: 0,
      });

      const shapes: Shape[] = [card, circle, star, triangle, label];
      shapes.forEach((shape) => layer.add(shape));

      const transformer = new Konva.Transformer({
        anchorStroke: '#0584ce',
        anchorFill: '#ffffff',
        anchorSize: 9,
        anchorCornerRadius: 5,
        borderStroke: '#0584ce',
        borderDash: [4, 4],
        rotateAnchorOffset: 24,
        padding: 4,
      });
      layer.add(transformer);

      // Start with one node selected, so the resize and rotate handles are
      // visible without the visitor having to guess that shapes are clickable.
      transformer.nodes([card]);

      shapes.forEach((shape) => {
        shape.on('pointerclick pointertap', () => {
          transformer.nodes([shape]);
        });
        shape.on('pointerenter', () => {
          stage.container().style.cursor = 'grab';
        });
        shape.on('pointerdown', () => {
          stage.container().style.cursor = 'grabbing';
        });
        shape.on('pointerup pointerleave', () => {
          stage.container().style.cursor = 'default';
        });
      });

      stage.on('pointerdown', (event) => {
        if (event.target === stage) {
          transformer.nodes([]);
        }
      });

      const scaleToContainer = () => {
        const width = container.clientWidth;
        if (!width) {
          return;
        }
        const scale = width / SCENE_WIDTH;
        stage.width(width);
        stage.height(SCENE_HEIGHT * scale);
        stage.scale({ x: scale, y: scale });
        stage.batchDraw();
      };

      scaleToContainer();
      const resizeObserver = new ResizeObserver(scaleToContainer);
      resizeObserver.observe(container);

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        shapes.forEach((shape, index) => {
          shape.opacity(0);
          shape.scale({ x: 0.86, y: 0.86 });
          new Konva.Tween({
            node: shape,
            duration: 0.45,
            delay: 0.06 * index,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            easing: Konva.Easings.BackEaseOut,
          }).play();
        });
      }

      layer.draw();

      dispose = () => {
        resizeObserver.disconnect();
        stage.destroy();
      };
    });

    return () => {
      disposed = true;
      dispose();
    };
  }, []);

  return (
    <figure className={styles.demoCard}>
      <div
        ref={containerRef}
        className={styles.demoStage}
        role="img"
        aria-label={translate({
          id: 'homepage.hero.demoAria',
          message:
            'An interactive Konva scene with a rectangle, a circle, a star, a triangle, and a text label. Each one can be dragged, resized, and rotated.',
        })}
      />
      <figcaption className={styles.demoCaption}>
        <Translate id="homepage.hero.demoCaption">
          This is a live Konva stage. Drag a shape, or use its handles to resize
          and rotate it.
        </Translate>
      </figcaption>
    </figure>
  );
}
