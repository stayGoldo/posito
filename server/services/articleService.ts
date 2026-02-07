import { eq } from 'drizzle-orm'
import { useDb } from '../database/db'
import { articles } from '../database/schema'
import type { CreateArticleInput } from '#shared/schemas/articles'

export const ArticleService = {
  /**
   * 功能：发表文章
   */
  async publish(input: CreateArticleInput) {
    const db = useDb()

    // 1. 执行插入 (直接写 SQL 构建)
    const [newArticle] = await db.insert(articles)
      .values({
        title: input.title,
        content: input.content,
        status: input.status,
        // createdAt/updatedAt 由数据库默认值处理
      })
      .returning()

    return newArticle
  },

  /**
   * 功能：获取文章详情
   */
  async getById(id: number) {
    const db = useDb()

    // 1. 查询数据
    const article = await db.query.articles.findFirst({
      where: eq(articles.id, id)
    })

    // 2. 业务检查 (404 处理)
    if (!article) {
      console.log(`文章不存在，ID：${id}`)
    }

    // 3. 权限检查 (示例：如果是草稿，且当前用户不是作者，则拒绝)
    // if (article.status === 'draft' && currentUser.id !== article.authorId) ...

    return article
  }
}