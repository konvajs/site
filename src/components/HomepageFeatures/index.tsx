import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type FeatureItem = {
  title: JSX.Element;
  icon: JSX.Element;
  description: JSX.Element;
};

// Small stroked marks, drawn inline. They carry no information on their own,
// so they stay decorative and the text does the work.
function Icon({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.feature.sceneGraph">Object-oriented scene graph</Translate>,
    icon: (
      <Icon>
        <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" />
        <path d="m3 12.5 9 4.5 9-4.5" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.sceneGraph.description">Work with stages, layers, groups, and shapes instead of low-level drawing commands.</Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.input">Pointer and touch input</Translate>,
    icon: (
      <Icon>
        <path d="m5 3 6.5 16 2.3-6.2 6.2-2.3L5 3Z" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.input.description">Use the same event system for desktop pointers and touch screens.</Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.animation">Animations and tweens</Translate>,
    icon: (
      <Icon>
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M9.5 12h5" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.animation.description">Update shapes on each frame, or move values over time with a tween.</Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.nodes">Node trees and events</Translate>,
    icon: (
      <Icon>
        <rect x="9" y="3" width="6" height="5" rx="1" />
        <rect x="2" y="16" width="6" height="5" rx="1" />
        <rect x="16" y="16" width="6" height="5" rx="1" />
        <path d="M12 8v4M5 16v-2h14v2" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.nodes.description">Nest nodes, group related shapes, and use event bubbling or delegation.</Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.export">Raster export</Translate>,
    icon: (
      <Icon>
        <path d="M12 3v11m0 0 4-4m-4 4-4-4" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.export.description">Export a stage or node to a canvas, data URL, or Blob at a selected pixel ratio.</Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.filters">Image filters</Translate>,
    icon: (
      <Icon>
        <path d="M4 7h16M4 12h16M4 17h16" />
        <circle cx="9" cy="7" r="2" />
        <circle cx="15" cy="12" r="2" />
        <circle cx="8" cy="17" r="2" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.filters.description">Cache a node and apply built-in filters such as blur, contrast, and grayscale.</Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.frameworks">Framework integrations</Translate>,
    icon: (
      <Icon>
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
        <path d="M11 7h4a2 2 0 0 1 2 2v4" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.frameworks.description">Use Konva with JavaScript, React, Vue, Svelte, or Angular.</Translate>
    ),
  },
  {
    title: <Translate id="homepage.feature.drag">Drag and transform</Translate>,
    icon: (
      <Icon>
        <rect x="6" y="6" width="12" height="12" rx="1" />
        <path d="M3 3h2v2H3zM19 3h2v2h-2zM3 19h2v2H3zM19 19h2v2h-2z" fill="currentColor" stroke="none" />
      </Icon>
    ),
    description: (
      <Translate id="homepage.feature.drag.description">Make a node draggable, then add resize and rotate controls with Transformer.</Translate>
    ),
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.header}>
          <Heading as="h2">
            <Translate id="homepage.features.title">
              What the library gives you
            </Translate>
          </Heading>
          <p>
            <Translate id="homepage.features.description">
              Konva sits between the canvas element and your application state.
            </Translate>
          </p>
        </div>
        <div className={styles.grid}>
          {FeatureList.map((feature, index) => (
            <div className={styles.feature} key={index}>
              {feature.icon}
              <Heading as="h3" className={styles.featureTitle}>
                {feature.title}
              </Heading>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
