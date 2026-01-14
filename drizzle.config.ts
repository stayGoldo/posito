import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './server/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.NUXT_DB_URL! },
})