import { z } from 'zod'
import { itemService } from '../../services/itemService'
import { success } from '../../utils/response'

// 定义校验 Schema (只负责校验 HTTP 输入格式)
const createItemSchema = z.object({
  name: z.string().min(1, "名称不能为空").max(50, "名称太长")
})

export default defineEventHandler(async (event) => {
  // 1. 校验输入 (Zod)
  const body = await readValidatedBody(event, (b) => createItemSchema.parse(b))
  
  // 2. 调用 Service (业务逻辑)
  // Service 可能会抛出错误，建议配合全局错误处理插件，或者在这里 try-catch
  const newItem = await itemService.create({ 
    name: body.name 
    // id 和 createdAt 由数据库自动生成
  })
  
  // 3. 统一响应
  return success(newItem)
})