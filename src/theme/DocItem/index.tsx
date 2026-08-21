import React, {Suspense, useEffect, useRef, useState} from 'react';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type { WrapperProps } from '@docusaurus/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof DocItemType>;

const DiscussionEmbed = React.lazy(() =>
  import('disqus-react').then((module) => ({default: module.DiscussionEmbed}))
);

type DiscussionProps = React.ComponentProps<typeof DiscussionEmbed>;

function DeferredDiscussion(props: DiscussionProps): JSX.Element {
  const markerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      {rootMargin: '200px 0px'}
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={markerRef} style={{minHeight: 1}}>
      {shouldLoad && (
        <Suspense fallback={<p>Loading comments…</p>}>
          <DiscussionEmbed {...props} />
        </Suspense>
      )}
    </div>
  );
}

// This wrapper used to emit its own BreadcrumbList JSON-LD. It built section
// URLs as /docs/<section>/index.html, which only exists for the four framework
// sections — so 264 built pages shipped a breadcrumb pointing at a 404, and
// Google discards a trail containing an invalid item. It also competed with the
// BreadcrumbList Docusaurus already emits from DocBreadcrumbs.
//
// Docusaurus links sections as /category/<section> and only when that page
// exists, so its version is always valid. Removing ours fixes both problems.

export default function DocItemWrapper(props: Props): JSX.Element {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { permalink, title } = props.content.metadata;

  // Keep one discussion thread for the canonical English page. Localized pages
  // can also run where Disqus is unavailable, so they do not load the embed.
  const commentsBlockedInLocale = i18n.currentLocale !== i18n.defaultLocale;

  return (
    <>
      <DocItem {...props} />
      {!commentsBlockedInLocale && (
        <DeferredDiscussion
          shortname="konvajs"
          config={{
            url: siteConfig.url + permalink,
            identifier: permalink,
            title: title,
          }}
        />
      )}
    </>
  );
}
