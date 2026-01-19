import { Scrypt } from 'oslo/password';
import {SignJWT} from 'jose';
import { useDb } from '../../database/db';

const hasher = new Scrypt();
const SECRET = new TextEncoder().encode(process.env.AUTH_JWT_SECRET);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    //查询
    const user = await useDb().query.users.findFirst({
        where: (users, { eq }) => eq(users.username, body.username)
    });

    //验证密码
    if(!user || !(await hasher.verify(user.passwordHash, body.password))) {
        throw createError({ statusCode: 401, message: 'Invalid username or password' });
    }
    //生成 JWT
    const token = await new SignJWT({ sub: user.id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('24h') // 令牌有效期 24 小时
        .sign(SECRET);
        
    return { token };
});