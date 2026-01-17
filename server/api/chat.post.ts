// server/api/chat.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // 获取环境变量 (需要在 nuxt.config.ts 或 .env 中配置)
  // 这里为了演示方便，直接读取 process.env，生产环境建议用 runtimeConfig
  const apiKey = process.env.MIMO_API_KEY
  const apiUrl = process.env.MIMO_API_URL || 'https://api.xiaomimimo.com/v1/chat/completions'
  const model = process.env.MIMO_MODEL || 'mimo-v2-flash' // 请根据文档确认模型名称

  try {
    const response = await $fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: {
        model: model,
        messages: body.messages,
        stream: false // 简单起见，这里使用非流式，一次性返回
      }
    })
    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'API Error'
    })
  }
})