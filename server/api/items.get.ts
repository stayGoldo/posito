// 修正：显式导入 db 和 success
import { db } from '../utils/db'
import { items } from '../database/schema'
import { success } from '../utils/response'

export default defineEventHandler(async () => {
  const list = await db.select().from(items)
  return success(list)
})