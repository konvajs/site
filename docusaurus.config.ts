import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Konva - JavaScript Canvas 2d Library',
  tagline: 'The ultimate bridge between your Vanilla/React/Vue/Svelte/Angular app and canvas graphics',
  favicon: 'img/favicon.ico',
  themes: ['./src/theme-live-codeblock'],

  // Set the production url of your site here
  url: 'https://new.konvajs.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'konvajs', // Usually your GitHub org/user name.
  projectName: 'konva', // Usually your repo name.

  // TODO: change to 'throw'
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      src: 'https://plausible.io/js/plausible.js',
      async: true,
      defer: true,
      'data-domain': 'new.konvajs.org',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'content',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/konvajs/site/tree/new/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/konvajs/site/tree/new/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social.jpeg',
    navbar: {
      title: 'Konva',
      logo: {
        alt: 'My Site Logo',
        src: 'img/icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialsSidebar',
          position: 'left',
          label: 'Tutorials',
        },
        {
          to: 'docs/sandbox.html',
          position: 'left',
          label: 'Demos',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          type: 'dropdown',
          label: 'Frameworks',
          position: 'left',
          items: [
            {
              label: 'React',
              to: '/docs/react/index.html',
            },
            {
              label: 'Vue',
              to: '/docs/vue/index.html',
            },
            {
              label: 'Svelte',
              to: '/docs/svelte/index.html',
            },
          ],
        },
        {
          label: 'Kai',
          to: '/kai',
        },
        {to: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', label: 'Price', position: 'left'},
        {
          href: 'https://github.com/konvajs/konva',
          className: 'header-github-link',
          position: 'right',
        },
        {
          href: 'https://discord.gg/8FqZwVT',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://twitter.com/lavrton',
          label: 'Twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/konva',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/8FqZwVT',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/lavrton',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/konvajs/konva',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
