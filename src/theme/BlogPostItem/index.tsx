import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
// import { useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme-original/BlogPostItem';

export default function BlogPostItemWrapper(props) {
  console.log(props);
  // const { metadata } = useBlogPost();
  // const { frontMatter, slug, title } = metadata;
  // const { comments = true } = frontMatter;

  return (
    <>
      <div>hello</div>
      <BlogPostItem {...props} />
      <div>hello</div>
      {/* {comments && (
        <DiscussionEmbed
          shortname="your-disqus-shortname"
          config={{
            url: slug,
            identifier: slug,
            title,
            language: 'en_US',
          }}
        />
      )} */}
    </>
  );
}
