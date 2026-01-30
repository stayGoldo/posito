import { useAuth } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const { user, refreshToken } = useAuth();
  
  // 仅在客户端执行，或者根据你的 SSR 策略调整
  // 如果内存中没用户，尝试用 Cookie 换 Token
  if (!user.value) {
    await refreshToken();
  }
});