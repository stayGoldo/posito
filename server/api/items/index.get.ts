import { itemService } from '../../services/itemService'
import { success } from '../../utils/response'

export default defineEventHandler(async (event) => {
  // 1. 解析输入 (GET 请求通常没有 Body，可能有 Query)
  // const query = getQuery(event)
  
  // 2. 调用 Service
  const list = await itemService.getList()
  
  // 3. 统一响应
  return success(list)
})