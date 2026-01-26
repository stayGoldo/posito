import { eq, desc } from 'drizzle-orm'
import { useDb } from '../database/db'
import { items, type NewItem } from '../database/schema'


/**
 * Item 业务逻辑服务
 * 这里的代码可以在 API 中调用，也可以在定时任务(Cron)或 CLI 脚本中调用
 */
export const itemService = {
  // 获取列表
  async getList() {
    const db = useDb()
    return await db.select()
      .from(items)
      .orderBy(desc(items.CreatedAt)) // 加上排序
  },

  // 创建条目
  async create(data: NewItem) {
    //  可以在这里做业务检查，例如：
    // if (data.name.includes('敏感词')) throw new Error('Invalid name')

    const db = useDb()
    
    const result = await db.insert(items)
      .values(data)
      .returning()
    
    return result[0]
  },

  // 根据ID获取
  async getById(id: number) {
    const db = useDb()
    const result = await db.select()
      .from(items)
      .where(eq(items.id, id))
      .limit(1)
    
    return result[0] || null
  },
  // 删除条目
    async delete(id: number) {
    const db = useDb()
    const result = await db.delete(items)
      .where(eq(items.id, id))
      .returning({ deletedId: items.id })
    
    return result.length > 0 // 返回是否删除成功
  }
}