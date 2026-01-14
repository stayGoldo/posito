import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
// 使用相对路径，确保在 server 目录下引用正确
import * as schema from '../database/schema'

const config = useRuntimeConfig()

if (!config.dbUrl) {
  throw new Error('NUXT_DB_URL is missing in .env')
}

const client = postgres(config.dbUrl as string)
export const db = drizzle(client, { schema })