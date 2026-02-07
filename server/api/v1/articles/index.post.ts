import { createArticleSchema, articleResponseSchema } from '#shared/schemas/articles'
import { ArticleService } from '../../../services/articleService'

export default defineEventHandler(async (event) => {
  // 1. [输入校验] Zod 自动解析 Body
  const body = await readValidatedBody(event, createArticleSchema.parse)

  // 2. [业务逻辑] 调用 Service
  const article = await ArticleService.publish(body)

  // 3. [输出清洗] 转换为 API 契约格式
  // 注意：数据库返回的是 Date 对象，Zod Schema 需要 String
  return articleResponseSchema.parse({
    ...article,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString()
  })
})