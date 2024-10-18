import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Object Oriented API',
    Svg: require('@site/static/assets/features/undraw_abstract_x68e.svg').default,
    description: (
      <>
        Konva provides an object-oriented API with support for many shapes,
        enabling intuitive and flexible canvas manipulation.
      </>
    ),
  },
  {
    title: 'Cross-Platform Support',
    Svg: require('@site/static/assets/features/undraw_file_sync_ot38.svg').default,
    description: (
      <>
        Konva offers seamless support for both desktop and mobile devices,
        ensuring a consistent experience across platforms.
      </>
    ),
  },
  {
    title: 'Animations and Tweens',
    Svg: require('@site/static/assets/features/undraw_animating_1rgh.svg').default,
    description: (
      <>
        Create smooth and dynamic animations with Konva's built-in animation
        and tween capabilities for interactive canvas experiences.
      </>
    ),
  },
  {
    title: 'Advanced Node Management',
    Svg: require('@site/static/assets/features/undraw_fitting_pieces_cli3.svg').default,
    description: (
      <>
        Konva supports node nesting, grouping, and event bubbling, allowing
        for complex hierarchical structures and efficient event handling.
      </>
    ),
  },
  {
    title: 'High-Quality Exports',
    Svg: require('@site/static/assets/features/undraw_image_viewer_wxce.svg').default,
    description: (
      <>
        Export your canvas creations as high-quality data URLs, image data,
        or image objects for versatile use in various applications.
      </>
    ),
  },
  {
    title: 'Ready-to-Use Filters',
    Svg: require('@site/static/assets/features/undraw_options_2fvi.svg').default,
    description: (
      <>
        Enhance your canvas with Konva's collection of pre-built filters,
        adding visual effects and transformations with ease.
      </>
    ),
  },
  {
    title: 'Framework Integration',
    Svg: require('@site/static/assets/features/undraw_voice_interface_eckp.svg').default,
    description: (
      <>
        Seamlessly integrate Konva with popular web frameworks like React,
        Vue, and Svelte for enhanced development workflows.
      </>
    ),
  },
  {
    title: 'Drag and Drop Support',
    Svg: require('@site/static/assets/features/undraw_drag_5i9w.svg').default,
    description: (
      <>
        Implement interactive drag and drop functionality effortlessly with
        Konva's built-in support for enhanced user experiences.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
