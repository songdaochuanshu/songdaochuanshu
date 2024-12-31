export const siteConfig = {
  author: '松岛川树',
  title: '松岛川树 - Blog',
  description: '松岛川树のBlog',
  lang: 'zh-CN',
}

export const giscus = {
  repo: 'songdaochuanshu/songdaochuanshu', // 替换为您的 GitHub 仓库名称
  repoId: 'R_kgDOGPohWg', // 替换为您的 GitHub 仓库 ID
  categoryId: 'DIC_kwDOGPohWs4CloQG', // 替换为您的 Discussion 类别 ID
  category: 'Announcements', // 替换为您的 Discussion 类别名称
  mapping: 'pathname', // 使用页面路径作为评论线程的映射方式
  reactionsEnabled: '1', // 启用反应功能
  emitMetadata: '0', // 不发送元数据
  inputPosition: 'bottom', // 评论框位置
  theme: 'preferred_color_scheme', // 根据用户偏好自动调整主题
  lang: 'zh-CN', // 使用中文界面
  loading: 'lazy', // 懒加载以优化性能
}

export const subNavLinks = [
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Life',
    path: '/life',
  },
  {
    title: 'Record',
    path: '/record',
  },
]

export const navLinks = [
  {
    title: 'Blog',
    path: '/blog',
    icon: 'i-icon-park-outline-align-text-right-one',
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: 'i-icon-park-outline-blocks-and-arrows',
  },
  {
    title: 'Tags',
    path: '/tags',
    icon: 'i-icon-park-outline-tag-one',
  },
  {
    title: 'Search',
    path: '/search',
    icon: 'i-icon-park-outline-search',
  },
  {
    title: 'About',
    path: '/',
    icon: 'i-icon-park-outline-grinning-face-with-open-mouth',
  },

]

export const socialLinks = [
  {
    title: 'Github',
    path: 'https://github.com/songdaochuanshu',
    icon: 'i-icon-park-outline-github',
  },
]

export const projectList = [
  // {
  //   name: 'Projects',
  //   content: [
  //     {
  //       name: 'Nuxt Blog',
  //       desc: 'My blog site, base on Nuxt',
  //       path: 'https://github.com/chansee97/nuxt-blog',
  //     },
  //     {
  //       name: 'Nova Admin',
  //       desc: 'a complete admin template',
  //       path: 'https://github.com/chansee97/nova-admin',
  //     },
  //     {
  //       name: 'Nova Admin Nest',
  //       desc: 'The nest backend for nova admin',
  //       path: 'https://github.com/chansee97/nove-admin-nest',
  //     },
  //   ],
  // },
]
