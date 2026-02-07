import { InferInsertModel, InferSelectModel ,relations} from 'drizzle-orm'
import { pgTable, uuid,serial, text ,timestamp,boolean, index, pgEnum} from 'drizzle-orm/pg-core'

import { ARTICLES_STATUS } from '../../shared/constants/articles'

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
  isActive: boolean('is_active').default(true).notNull(),
})
//refresh tokens 表
export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id,{onDelete: 'cascade'}).notNull(),
  tokenHash: text('token_hash').notNull(), 
  expiresAt: timestamp('expires_at',{ mode: "date" /* or "string" */, withTimezone: true }).notNull(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
},(t)=>({
  //为 userId 创建索引以加快查询速度
  tokenHashIdx: index('token_hash_idx').on(t.tokenHash),
}));
// 新增：定义 refreshTokens 的关联关系
// 这告诉 Drizzle：一个 refreshToken 属于一个 user
export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));
//导出类型
export type Item = InferSelectModel<typeof items>
export type NewItem = InferInsertModel<typeof items>

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export type RefreshToken = InferSelectModel<typeof refreshTokens>
export type NewRefreshToken = InferInsertModel<typeof refreshTokens>

export const usersRelations = relations(users,({many})=>({
  refreshTokens: many(refreshTokens)
}));

//========================= 以下为文章相关 ========================
// 复用 Shared 中的常量定义枚举
export const statusEnum = pgEnum('article_status', ARTICLES_STATUS)

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  // 确保数据库存储的值严格符合契约
  status: statusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})