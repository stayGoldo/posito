<script setup lang="ts">
// 1. 定义页面状态
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// 2. 定义 Token Cookie
// 使用 useCookie 是 Nuxt 存储 Token 的最佳实践
// maxAge 设置为 7 天，与后端 Token 有效期保持一致 (60s * 60m * 24h * 7d)
const tokenCookie = useCookie('auth_token', {
  maxAge: 60 * 60 * 24 * 7
})

// 3. 登录处理函数
const handleLogin = async () => {
  // 重置错误信息
  errorMsg.value = ''
  
  // 简单的非空校验 (MVP阶段暂不引入 Zod)
  if (!username.value || !password.value) {
    errorMsg.value = '请输入用户名和密码'
    return
  }

  loading.value = true

  try {
    // 发送请求到后端接口
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    // 登录成功：保存 Token 到 Cookie
    tokenCookie.value = res.accessToken

    // 跳转到首页或仪表盘
    await navigateTo('/') 

  } catch (err: any) {
    // 捕获后端抛出的 createError ({ statusCode: 401, message: ... })
    // err.data 包含了后端返回的错误详情
    errorMsg.value = err.data?.message || '登录发生错误'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div >
    <div >
      <h1>登录</h1>
      
      <form @submit.prevent="handleLogin">
        <!-- 用户名输入 -->
        <div >
          <label for="username">用户名</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="请输入用户名"
            :disabled="loading"
          />
        </div>

        <!-- 密码输入 -->
        <div >
          <label for="password">密码</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="请输入密码"
            :disabled="loading"
          />
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMsg" class="error-text">
          {{ errorMsg }}
        </div>

        <!-- 提交按钮 -->
        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>