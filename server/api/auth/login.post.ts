import { Scrypt } from 'oslo/password';
import {SignJWT} from 'jose';
import { useDb } from '../../database/db';
import { refreshTokens } from '~~/server/database/schema';

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
    //生成 access token
    const accessToken = await new SignJWT({ sub: user.id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('10m') // 令牌有效期 10 分钟
        .sign(SECRET);

    //生成refresh token 
    const refreshToken = await new SignJWT({ sub: user.id })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('7d') // 刷新令牌有效期 7 天
        .sign(SECRET);
        
    //refresh token 存库
    await useDb().insert(refreshTokens).values({
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 天后过期
    }); 
    //设置httponly cookie
    setCookie(event, 'refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 天
    });
    return { accessToken };
});