import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, uuid,serial, text ,timestamp} from 'drizzle-orm/pg-core'



export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  //时间戳方便排查
  CreatedAt: timestamp('created_at').defaultNow(),
})

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
})
//refresh tokens 表
export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  token: text('token').notNull(), // ⚠️ 隐患：这里存了 Token 原文
  expiresAt: timestamp('expires_at',{ mode: "date" /* or "string" */, withTimezone: true }).notNull(),
});
//导出类型
export type Item = InferSelectModel<typeof items>
export type NewItem = InferInsertModel<typeof items>

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export type RefreshToken = InferSelectModel<typeof refreshTokens>
export type NewRefreshToken = InferInsertModel<typeof refreshTokens>