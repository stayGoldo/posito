// 引入后端定义的响应结构
// 注意：这里可以用 ~~ 指向根目录，或者让 TS 自动推导
import type { ApiResponse } from '~~/server/utils/response'

// 修正：定义具体的业务类型
export interface Item {
  id: number
  name: string
}

export const useAppApi = () => {
  return {
    // 泛型明确：返回的是 ApiResponse，其中 data 是 Item 数组
    getItems: () => useFetch<ApiResponse<Item[]>>('/api/items'),
    
    // 泛型明确：返回的是 ApiResponse，其中 data 是单个 Item
    addItem: (name: string) => useFetch<ApiResponse<Item>>('/api/items', {
      method: 'POST',
      body: { name }
    })
  }
}