import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  srcDir: 'app/',
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    // 显式读取，避免“魔法”隐式映射带来的困惑
    dbUrl: process.env.NUXT_DB_URL || '', 
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },
  modules: [
    '@nuxt/icon',  // 新增：图标
    '@nuxt/fonts'  // 新增：字体
  ],
  // 配置 Google Fonts (自动优化)
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' } // 用于数字/代码
    ]
  }
})
