export interface ApiResponse<T> {
  code: number
  status: 'success' | 'error'
  data: T
}

export const success = <T>(data: T): ApiResponse<T> => {
  return {
    code: 200,
    status: 'success',
    data
  }
}