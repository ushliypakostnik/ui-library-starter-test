module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Dashboards Library',
      description: 'Dashboards',
    },
  },

  themeConfig: {
    repoLabel: 'GitHub repo',
    repo: 'https://github.com/ushliypakostnik/ui-library-starter-test.git',
    docsDir: 'docs',
    search: false,
    locales: {
      '/': {
        nav: [{ text: 'NPM', link: 'https://www.npmjs.com/package/ui-library-starter-test' }],
        sidebar: [
          {
            title: `Components`,
            children: [
              {
                title: `Example`,
                path: '/components/example',
              },
              {
                title: `Dashboards`,
                path: '/components/dashboards',
              },
            ],
          },
          {
            title: `Widgets`,
          },
        ],
      },
    },
  },
};
