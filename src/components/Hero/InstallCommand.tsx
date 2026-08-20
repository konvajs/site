import Translate, { translate } from '@docusaurus/Translate';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

const COMMAND = 'npm install konva';

export default function InstallCommand(): JSX.Element {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
    } catch {
      // Clipboard access can be refused. The command stays selectable by hand.
      return;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.install}>
      <code className={styles.installCommand}>
        <span className={styles.installPrompt} aria-hidden="true">
          $
        </span>
        {COMMAND}
      </code>
      <button
        type="button"
        className={styles.installCopy}
        onClick={copy}
        aria-label={translate({
          id: 'homepage.hero.copyInstall',
          message: 'Copy the install command',
        })}
      >
        {copied ? (
          <Translate id="homepage.hero.copied">Copied</Translate>
        ) : (
          <Translate id="homepage.hero.copy">Copy</Translate>
        )}
      </button>
    </div>
  );
}
