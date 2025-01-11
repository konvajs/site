import React from 'react';
import DocItem from '@theme-original/DocItem';
import type DocItemType from '@theme/DocItem';
import type { WrapperProps } from '@docusaurus/types';
import { DiscussionEmbed } from 'disqus-react';

type Props = WrapperProps<typeof DocItemType>;

export default function DocItemWrapper(props: Props): JSX.Element {
  console.log(props);
  return (
    <>
      <DocItem {...props} />
      <DiscussionEmbed
        shortname="konvajs"
        config={{
          url: props.content.metadata.permalink,
          identifier: props.content.metadata.permalink,
          title: props.content.metadata.title,
          language: 'en_US',
        }}
      />
    </>
  );
}
