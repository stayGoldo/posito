import {z} from 'zod';
import { ArticleService } from '~~/server/services/articleService';
import { articleResponseSchema } from '~~/shared/schemas/articles';

//定义路径参数校验
const paramsSchema = z.object({
    id: z.coerce.number().positive(),
})

export default defineEventHandler(async (event) => {
    const {id} = await getValidatedRouterParams(event, paramsSchema.parse);

    const article = await ArticleService.getById(id);
    return articleResponseSchema.parse({
        ...article,
        createdAt: article!.createdAt.toISOString(),
        updatedAt: article!.updatedAt.toISOString(),
    });
})