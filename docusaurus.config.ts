import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Konva - JavaScript Canvas 2d Library',
  tagline:
    'The ultimate bridge between your Vanilla/React/Vue/Svelte/Angular app and canvas graphics',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://konvajs.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'konvajs', // Usually your GitHub org/user name.
  projectName: 'konva', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: {label: 'English'},
      'zh-Hans': {label: '简体中文'},
    },
  },

  scripts: [
    {
      src: 'https://plausible.io/js/plausible.js',
      async: true,
      defer: true,
      'data-domain': 'konvajs.org',
    },
    {
      src: '/js/plausible-events.js',
      defer: true,
    },
    {
      src: 'https://cdn.convertbox.com/convertbox/js/embed.js',
      id: 'app-convertbox-script',
      async: true,
      'data-uuid': 'db9e320b-6d6c-49c4-ba5c-b29e6d5fc91c',
    },
    {
      src: 'https://crawlchat.app/embed.js',
      id: 'crawlchat-script',
      'data-id': '67d221efb4b9de65095a2579',
      'data-ask-ai': 'true',
      'data-ask-ai-background-color': 'rgba(5, 132, 206, 1)',
      'data-ask-ai-color': '#ffffff',
      'data-ask-ai-text': 'Ask AI',
      'data-ask-ai-position': 'br',
      'data-ask-ai-radius': '20px',
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
          editUrl: 'https://github.com/konvajs/site/tree/new/',
        },
        blog: false,
        sitemap: {
          ignorePatterns: ['/search', '/zh-Hans/search', '/zh-Hans/api/**'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Konva.js',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser, Node.js',
        url: 'https://konvajs.org',
        downloadUrl: 'https://www.npmjs.com/package/konva',
        license: 'https://opensource.org/licenses/MIT',
        programmingLanguage: ['JavaScript', 'TypeScript'],
        author: {
          '@type': 'Person',
          name: 'Anton Lavrenov',
          url: 'https://lavrton.com',
        },
        description:
          'Konva.js is an HTML5 Canvas JavaScript framework that enables high-performance 2D graphics with an object-oriented API. Supports shapes, animations, events, drag-and-drop, filters, and integrations for React, Vue, Svelte, and Angular.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Konva.js',
        url: 'https://konvajs.org',
        logo: 'https://konvajs.org/img/icon.png',
        sameAs: [
          'https://github.com/konvajs/konva',
          'https://www.npmjs.com/package/konva',
          'https://discord.gg/8FqZwVT',
          'https://twitter.com/lavrton',
          'https://stackoverflow.com/questions/tagged/konvajs',
        ],
      }),
    },
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content:
          'konva, konvajs, html5 canvas, javascript canvas library, react canvas, vue canvas, svelte canvas, angular canvas, 2d graphics, canvas framework, drag and drop canvas, canvas animation, canvas drawing',
      },
      { name: 'author', content: 'Anton Lavrenov' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Konva.js' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@lavrton' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    image: 'img/social.jpeg',
    navbar: {
      title: 'Konva',
      logo: {
        alt: 'Konva.js - HTML5 Canvas JavaScript Framework',
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
            {
              label: 'Angular',
              to: '/docs/angular/index.html',
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/konvajs/konva',
          className: 'header-github-link',
          position: 'right',
        },
        {
          href: 'https://discord.gg/8FqZwVT',
          className: 'header-discord-link',
          // label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://twitter.com/lavrton',
          className: 'header-x-link',
          // label: 'Twitter',
          position: 'right',
        },
        // {
        //   href: '#',
        //   className: 'ai-chat',
        //   label: 'Ask AI',
        //   position: 'right',
        // },
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
              to: '/docs/index.html',
            },
            {
              label: 'Demos',
              to: '/docs/sandbox.html',
            },
            {
              label: 'API Reference',
              to: '/api/Konva.html',
            },
            {
              label: 'FAQ',
              to: '/docs/faq.html',
            },
            {
              label: 'About Konva',
              to: '/docs/about.html',
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
            {
              label: 'Changelog',
              href: 'https://github.com/konvajs/konva/blob/master/CHANGELOG.md',
            },
            {
              label: 'Star Konva on GitHub',
              href: 'https://github.com/konvajs/konva',
            },
          ],
        },
        {
          title: 'Integrations',
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
            {
              label: 'Angular',
              to: '/docs/angular/index.html',
            },
          ],
        },
        {
          title: 'Products',
          items: [
            {
              label: 'Design Editor SDK',
              href:
                'https://polotno.com/?utm_source=konvajs&utm_medium=footer&utm_content=footer-link',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Konva. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: '8J5ZKQ6RXR',

      // Public API key: it is safe to commit it
      apiKey: '39701ff696d6af9cd08aac8cc98926d2',

      indexName: 'konvajs',
      // Optional: see doc section bellow
      contextualSearch: false,

      askAi: 'MpZOQRawnahp',

      // Optional: Algolia search parameters
      searchParameters: {},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
