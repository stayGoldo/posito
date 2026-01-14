// nuxt.config.ts
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  srcDir: 'app/',
  runtimeConfig: {
    // 显式读取，避免“魔法”隐式映射带来的困惑
    dbUrl: process.env.NUXT_DB_URL || '', 
  }
})
