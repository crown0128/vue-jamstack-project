// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
require('dotenv').config()

module.exports = {
  siteName: "Naomi's JAMStack project",
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ],
    },
  },
  plugins: [
    {
      use: 'gridsome-plugin-modal',
    },
    {
      use: 'gridsome-plugin-tailwindcss',
    },
    {
      use: '@gridsome/source-contentful',
      options: {
        space: process.env.GRIDSOME_CONTENTFUL_SPACE, // required
        accessToken: process.env.GRIDSOME_CONTENTFUL_ACCESS_TOKEN, // required
        host: 'cdn.contentful.com',
        environment: 'master',
        typeName: 'Contentful',
      },
    },
  ],
  templates: {
    ContentfulBlogPost: [
      {
        path: '/blog/:slug',
        component: './src/templates/BlogPost/index.vue',
      },
    ],
    ContentfulProduct: [
      {
        path: '/products/:slug',
        component: './src/templates/Product/index.vue',
      },
    ],
  },
}
