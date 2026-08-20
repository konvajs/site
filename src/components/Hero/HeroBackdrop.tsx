import { useEffect, useRef } from 'react';

import styles from './styles.module.css';

type Seed = {
  kind: 'circle' | 'rect' | 'star' | 'ring' | 'triangle';
  x: number;
  y: number;
  size: number;
  speed: number;
  spin: number;
  opacity: number;
  color: string;
};

// Tints of the framework icons that cycle in the hero copy.
const PALETTE = [
  '#4dbeff', // Konva blue
  '#61dafb', // React
  '#42b883', // Vue
  '#ff6b4a', // Svelte
  '#a78bfa', // violet accent
];

// A tiny deterministic generator keeps the composition stable between reloads,
// so the backdrop can be tuned by eye instead of re-rolled on every visit.
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function createSeeds(count: number): Seed[] {
  const random = createRandom(20260819);
  const kinds: Seed['kind'][] = ['circle', 'rect', 'star', 'ring', 'triangle'];

  return Array.from({ length: count }, () => ({
    kind: kinds[Math.floor(random() * kinds.length)],
    x: random(),
    y: random(),
    size: 9 + random() * 26,
    speed: 4 + random() * 14,
    spin: (random() - 0.5) * 14,
    opacity: 0.08 + random() * 0.16,
    color: PALETTE[Math.floor(random() * PALETTE.length)],
  }));
}

export default function HeroBackdrop(): JSX.Element {
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
        width: container.clientWidth,
        height: container.clientHeight,
        listening: false,
      });

      const layer = new Konva.Layer({ listening: false });
      stage.add(layer);

      const seeds = createSeeds(26);
      const nodes = seeds.map((seed) => {
        const common = {
          x: seed.x * stage.width(),
          y: seed.y * stage.height(),
          fill: seed.color,
          opacity: seed.opacity,
          rotation: seed.x * 360,
        };

        switch (seed.kind) {
          case 'rect':
            return new Konva.Rect({
              ...common,
              width: seed.size,
              height: seed.size,
              cornerRadius: seed.size / 4,
              offsetX: seed.size / 2,
              offsetY: seed.size / 2,
            });
          case 'star':
            return new Konva.Star({
              ...common,
              numPoints: 5,
              innerRadius: seed.size / 2.6,
              outerRadius: seed.size / 1.2,
            });
          case 'ring':
            return new Konva.Ring({
              ...common,
              fill: undefined,
              stroke: seed.color,
              strokeWidth: 1.5,
              innerRadius: seed.size / 1.6,
              outerRadius: seed.size / 1.5,
            });
          case 'triangle':
            return new Konva.RegularPolygon({
              ...common,
              sides: 3,
              radius: seed.size / 1.4,
            });
          default:
            return new Konva.Circle({ ...common, radius: seed.size / 2 });
        }
      });

      nodes.forEach((node) => layer.add(node));
      layer.draw();

      const resizeObserver = new ResizeObserver(() => {
        stage.width(container.clientWidth);
        stage.height(container.clientHeight);
        nodes.forEach((node, index) => {
          node.x(seeds[index].x * stage.width());
        });
        layer.batchDraw();
      });
      resizeObserver.observe(container);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      const animation = new Konva.Animation((frame) => {
        if (!frame) {
          return;
        }
        const seconds = frame.timeDiff / 1000;
        nodes.forEach((node, index) => {
          const seed = seeds[index];
          node.y(node.y() - seed.speed * seconds);
          node.rotate(seed.spin * seconds);
          if (node.y() < -80) {
            node.y(stage.height() + 80);
          }
        });
      }, layer);

      // Only animate while the hero is on screen, and never when the visitor
      // asked for reduced motion.
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !reduceMotion.matches) {
          animation.start();
        } else {
          animation.stop();
        }
      });
      intersectionObserver.observe(container);

      dispose = () => {
        animation.stop();
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        stage.destroy();
      };
    });

    return () => {
      disposed = true;
      dispose();
    };
  }, []);

  return <div ref={containerRef} className={styles.backdrop} aria-hidden="true" />;
}
