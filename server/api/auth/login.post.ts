import { Scrypt } from 'oslo/password';
import {SignJWT} from 'jose';
import { useDb } from '../../database/db';
import { refreshTokens, users } from '../../database/schema';
import { hashToken } from '../../utils/auth';

const hasher = new Scrypt();
const SECRET = new TextEncoder().encode(process.env.AUTH_JWT_SECRET);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    //查询
    const user = await useDb().query.users.findFirst({
        where: (users, { eq }) => eq(users.username, body.username)
    });

    //防止时序攻击
    if(!user){
        throw createError({statusCode: 401, statusMessage: 'Invalid username or password'});
    }
    //验证密码
    console.log(user.passwordHash);
    console.log(body.password);
    const isValid = await hasher.verify(user.passwordHash, body.password);
    if(!isValid){
        throw createError({statusCode: 401, statusMessage: '1Invalid username or password'});
    }

    //生成 access token
    const accessToken = await new SignJWT({ 
        sub: user.id,
        username: user.username
        })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('10m') // 令牌有效期 10 分钟
        .sign(SECRET);

    //生成refresh token 
    const refreshToken = crypto.randomUUID();
    //对 refresh token 进行哈希处理
    const refreshTokenHash = await hashToken(refreshToken);   
    //refresh token 存库
    await useDb().transaction(async (tx) => {
        await tx.insert(refreshTokens).values({
        userId: user.id,
        tokenHash: refreshTokenHash, // 存哈希
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userAgent: getHeader(event, 'user-agent'),
        ipAddress: getRequestIP(event)
        });
    });
 

    //设置httponly cookie
    setCookie(event, 'refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 天
        path:'/api/auth'//限制cookie路径
    });
    return { accessToken };
});