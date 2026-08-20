import React from 'react';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type { WrapperProps } from '@docusaurus/types';
import { DiscussionEmbed } from 'disqus-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof DocItemType>;

// This wrapper used to emit its own BreadcrumbList JSON-LD. It built section
// URLs as /docs/<section>/index.html, which only exists for the four framework
// sections — so 264 built pages shipped a breadcrumb pointing at a 404, and
// Google discards a trail containing an invalid item. It also competed with the
// BreadcrumbList Docusaurus already emits from DocBreadcrumbs.
//
// Docusaurus links sections as /category/<section> and only when that page
// exists, so its version is always valid. Removing ours fixes both problems.

export default function DocItemWrapper(props: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { permalink, title } = props.content.metadata;

  return (
    <>
      <DocItem {...props} />
      <DiscussionEmbed
        shortname="konvajs"
        config={{
          url: siteConfig.url + permalink,
          identifier: permalink,
          title: title,
        }}
      />
    </>
  );
}
