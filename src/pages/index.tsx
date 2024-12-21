import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { useRef, useEffect, useState } from 'react';

import styles from './index.module.css';

export const frameworksList = [
  {
    name: 'Vanilla JS',
    color: '#F7DF1E',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
    ),
  },
  {
    name: 'Vue',
    color: '#42B883',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
        <path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78zm-18.24 2h3.6l4.64 8.03L18.64 3.61h3.6L12 18.07z" />
      </svg>
    ),
  },
  {
    name: 'Angular',
    color: '#DD0031',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
        <path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996l-1.422 3.504h-2.64L12 2.65z" />
      </svg>
    ),
  },
  {
    name: 'Svelte',
    color: '#FF3E00',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
        <path d="M23.651 3.159c-2.797-4.106-8.34-5.216-12.37-2.481L6.862 3.57a7.817 7.817 0 00-3.398 4.786 7.777 7.777 0 00.54 5.787 7.783 7.783 0 00-1.286 3.544 7.784 7.784 0 001.374 5.876c2.796 4.105 8.34 5.216 12.37 2.481l4.419-2.893a7.817 7.817 0 003.398-4.786 7.775 7.775 0 00-.54-5.787 7.784 7.784 0 001.285-3.544 7.784 7.784 0 00-1.373-5.875zM12.172 20.711c-2.092.876-4.497.036-5.795-1.857-.318-.464-.54-.98-.661-1.518l-.044-.204.183.094a8.731 8.731 0 002.63 1.115l.255.054-.023.249c-.019.204.013.407.093.6.288.687 1.08.917 1.743.503l4.467-2.925c.306-.2.494-.526.512-.876a1.04 1.04 0 00-.624-1.018c-.655-.273-1.369-.094-1.815.455a1.45 1.45 0 00-.454-.434c-1.108-.673-2.699-.397-3.737.766-.826.93-1.087 2.245-.686 3.448.095.286.229.558.398.81-.718.2-1.469.218-2.198.053-.95-.215-1.777-.744-2.356-1.509-.318-.464-.54-.98-.661-1.518-.173-.781-.127-1.595.133-2.348.167-.482.429-.926.775-1.309l.224.25c-.263.435-.372.935-.317 1.432a1.4 1.4 0 00.635 1.07c.641.383 1.479.244 1.877-.313.878-1.236.878-1.236 2.243-2.118 1.534-1.005 3.18-1.345 4.417-.913.744.259 1.36.744 1.766 1.39.757 1.11.872 2.472.308 3.624-.156.318-.356.614-.593.879l-.004-.005a5.19 5.19 0 01-2.439 1.286zm7.242-10.402c-.167.482-.429.926-.775 1.309l-.224-.25c.264-.435.372-.935.317-1.432a1.4 1.4 0 00-.635-1.07c-.641-.383-1.479-.244-1.877.313-.878 1.236-.878 1.236-2.243 2.118-1.534 1.005-3.18 1.345-4.417.913-.744-.259-1.36-.744-1.766-1.39-.757-1.11-.872-2.472-.308-3.624.156-.318.356-.614.593-.879l.004.005a5.19 5.19 0 012.439-1.286c2.092-.876 4.497-.036 5.795 1.857.318.464.54.98.661 1.518l.044.204-.183-.094a8.731 8.731 0 00-2.63-1.115l-.255-.054.023-.249c.019-.204-.013-.407-.093-.6-.288-.687-1.08-.917-1.743-.503l-4.467 2.925c-.306.2-.494.526-.512.876.025.423.27.799.624 1.018.655.273 1.369.094 1.815-.455.121.169.277.316.454.434 1.108.673 2.699.397 3.737-.766.826-.93 1.087-2.245.686-3.448a4.103 4.103 0 00-.398-.81c.718-.2 1.47-.218 2.198-.053.95.215 1.777.744 2.356 1.509.318.464.54.98.661 1.518.173.781.127 1.595-.133 2.348z" />
      </svg>
    ),
  },
];

function AnimatedSubtitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % frameworksList.length);
        setIsTransitioning(false);
      }, 300); // Reduced from 500ms to 300ms for faster transition
    }, 2000); // Reduced from 3000ms to 2000ms for faster cycling

    return () => clearInterval(timer);
  }, []);

  const framework = frameworksList[currentIndex];

  return (
    <div className={styles.animatedSubtitle}>
      <p className="hero__subtitle">
        The ultimate bridge between your{' '}
        <span className={styles.frameworkWrapper}>
          <span
            className={clsx(
              styles.framework,
              isTransitioning && styles.fadeOut
            )}
            style={{ color: framework.color }}
          >
            {framework.icon}
            {framework.name}
          </span>
        </span>{' '}
        app and canvas graphics
      </p>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);

    let frame = 0;
    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      color: string;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2,
        color:
          frameworksList[Math.floor(Math.random() * frameworksList.length)]
            .color,
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }
      });

      frame = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundColor: 'rgb(13 50 127 / 50%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        width={800}
        height={600}
      />
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <AnimatedSubtitle />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/index.html"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Konva is 2d Canvas JavaScript framework for drawings shapes, animations, node nesting, layering, filtering, event handling, drag and drop and much more."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
