import { z } from 'zod'
// 修正：显式导入
import { db } from '../utils/db'
import { items } from '../database/schema'
import { success } from '../utils/response'

const Schema = z.object({ name: z.string() })

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (b) => Schema.parse(b))
  const result = await db.insert(items).values({ name: body.name }).returning()
  return success(result[0])
})