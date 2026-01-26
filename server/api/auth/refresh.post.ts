import {eq,and,gt} from 'drizzle-orm';
import { hashToken } from '../../utils/auth';
import { useDb } from '../../database/db';
import { SignJWT } from 'jose';
import { refreshTokens } from '../../database/schema';
export default defineEventHandler(async(event)=>{
    //从cookie获取token
    const oldToken = getCookie(event,'refreshToken');
    
    const SECRET = new TextEncoder().encode(process.env.AUTH_JWT_SECRET);
    if(!oldToken){
        throw createError({statusCode:401,statusMessage:'No refresh token provided'});
    }

    //对 token 进行哈希处理
    const oldTokenHash = await hashToken(oldToken);
    //查询数据库，验证 refresh token

    const record = await useDb().query.refreshTokens.findFirst({
        where:(t) => and(
            eq(t.tokenHash,oldTokenHash),
            gt(t.expiresAt,new Date())
        ),
        with:{user:true}
    });

    if(!record){
        deleteCookie(event,'refreshToken');
        throw createError({statusCode:401,statusMessage:'token error'});
    }

    //生成新的 token
    const newRefreshToken= crypto.randomUUID();
    const newrefreshTokenHash = await hashToken(newRefreshToken);
    const newAccessToken = await new SignJWT({ sub: record.user.id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('10m') // 令牌有效期 10 分钟
            .sign(SECRET);

        //删除旧的 refresh token 记录，更新为新的
    await useDb().transaction(async(tx)=>{
        await tx.delete(refreshTokens).where(eq(refreshTokens.id,record.id));

        await tx.insert(refreshTokens).values({
        userId: record.userId,
        tokenHash: newrefreshTokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userAgent: getHeader(event, 'user-agent'),
        ipAddress: getRequestIP(event)
        });
    });
    //设置httponly cookie
      // 5. 下发新 Cookie
    setCookie(event, 'refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 天
        path:'/api/auth'//限制cookie路径
    });

    return { accessToken: newAccessToken };
});
