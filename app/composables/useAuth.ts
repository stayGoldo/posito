import { decodeJwt } from "jose";

export interface User{
    id: number | string;
    username: string;
    avatar?:string;
}

export const useAuth = () => {
    const user = useState<User | null>('auth-user', () => null);
    const accessToken = useState<string | null>('access-token', () => null);
    const loading = useState<boolean>('auth-loading', () => false);

    //解析token设置user
    const setAuthState = (token:string) => {
        accessToken.value = token;
        try{
            const decoded = decodeJwt(token);
            user.value = {
                id: decoded.sub as string,
                username: decoded.username as string || 'unknown',
            };
        }catch(e){
            console.error('failed to decode jwt', e);
        }
    };

    const login = async(username: string,password: string) =>{
        if(loading.value) return;
        loading.value = true;
        try{
            const data = await $fetch<{accessToken: string}>('/api/auth/login',{
                method: 'POST',
                body: {username, password}
            });
            setAuthState(data.accessToken);
        }catch(e){
            console.error('login failed', e);
            return false;
        }finally{
            loading.value = false;
        }
    }

    const refreshToken = async() => {
        try{
            const data = await $fetch<{accessToken: string}>('api/auth/refresh',{
                method: 'POST'
            });
            setAuthState(data.accessToken);
            return true;
        }catch(e){
            user.value = null;
            accessToken.value = null;
            return false;
        }
    };

    const logout = async() => {
        user.value = null;
        accessToken.value = null;
    };

    return{
        user,
        accessToken,
        loading,
        login,
        refreshToken,
        logout
    };
};