import { z } from 'zod'
import { itemService } from '../../services/itemService'
import { success } from '../../utils/response'

const paramsSchema = z.object({
  id: z.coerce.number() // 自动把字符串 id 转为数字
})

export default defineEventHandler(async (event) => {
  // 1. 校验路径参数
  const { id } = await getValidatedRouterParams(event, (p) => paramsSchema.parse(p))

  // 2. 调用 Service
  const isDeleted = await itemService.delete(id)

  if (!isDeleted) {
    // 可以在这里抛出 404，由全局错误处理器捕获
    throw createError({ statusCode: 404, message: 'Item not found' })
  }

  // 3. 返回
  return success({ id, message: 'Deleted successfully' })
})