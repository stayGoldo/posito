import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, serial, text ,timestamp} from 'drizzle-orm/pg-core'


export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  //时间戳方便排查
  CreatedAt: timestamp('created_at').defaultNow(),
})

//导出类型
export type Item = InferSelectModel<typeof items>
export type NewItem = InferInsertModel<typeof items>