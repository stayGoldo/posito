import {z} from 'zod';
import { ARTICLES_STATUS } from '../constants/articles';

//枚举检验
export const articleStatusSchema = z.enum(ARTICLES_STATUS);

//发表文章
export const createArticleSchema = z.object({
    title: z.string().min(1,{message:'标题至少需要一个字符'}).max(100),
    content: z.string().min(10,{message:'内容太少了，至少需要10个字符'}),
    status: articleStatusSchema.default('draft'), //默认草稿
});

//文章详情
export const articleResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    status: articleStatusSchema,
    createdAt: z.iso.datetime(),
});

//导出类型
export type CreateArticleInput = z.infer<typeof createArticleSchema>;
