import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// 定义 DB 类型，方便后续使用
export type DrizzleDB = PostgresJsDatabase<typeof schema>

// 变量缓存，保持单例
let _db: DrizzleDB | null = null

export const useDb = (): DrizzleDB => {
  // 1. 如果实例已存在，直接返回（单例模式）
  if (_db) return _db

  // 2.只有在函数内部（运行时）才调用 useRuntimeConfig
  // 此时能确保一定能拿到了运行时的环境变量
  const config = useRuntimeConfig()

  if (!config.dbUrl) {
    throw new Error('NUXT_DB_URL is missing in runtime config')
  }

  // 3. 处理开发环境 HMR 连接池耗尽问题 (结合上一条的建议)
  let client: postgres.Sql
  
  if (process.env.NODE_ENV === 'production') {
    client = postgres(config.dbUrl as string)
  } else {
    // @ts-expect-error globalThis 需要类型扩展，此处先这样
    //TODO: 可以考虑扩展类型
    if (!globalThis._pgClient) {
      // @ts-expect-error
      globalThis._pgClient = postgres(config.dbUrl as string)
    }
    // @ts-expect-error
    client = globalThis._pgClient
  }

  // 4. 初始化 Drizzle 并缓存
  _db = drizzle(client, { schema })
  return _db
}