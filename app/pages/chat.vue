<template>
  <!-- 
    布局容器：
    h-screen: 占满屏幕高度
    bg-page: 使用你定义的背景色
    text-primary: 使用你定义的主文字色
  -->
  <div class="flex flex-col h-screen bg-page text-primary">
    
    <!-- 1. 顶部标题 (高度使用变量 --header-height) -->
    <header class="flex items-center justify-center border-b border-gray-200 bg-surface shadow-sm h-(--header-height) shrink-0">
      <h1 class="text-lg font-bold">Mimo Chat</h1>
    </header>

    <!-- 2. 消息列表区域 (flex-1 自动撑开剩余空间) -->
    <main ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- 欢迎语 -->
      <div v-if="messages.length === 0" class="flex justify-center mt-10">
        <span class="text-secondary text-sm">开始与 Mimo 对话吧...</span>
      </div>

      <!-- 消息循环 -->
      <div 
        v-for="(msg, index) in messages" 
        :key="index" 
        class="flex w-full"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- 
          消息气泡：
          User: 使用 color-primary (深色背景) + 白色文字
          AI: 使用 color-surface (白色背景) + primary文字 + 边框
        -->
        <div 
          class="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm wrap-break-word"
          :class="[
            msg.role === 'user' 
              ? 'bg-primary text-white rounded-tr-sm' 
              : 'bg-surface text-primary border border-gray-100 rounded-tl-sm'
          ]"
        >
          {{ msg.content }}
        </div>
      </div>

      <!-- Loading 状态 -->
      <div v-if="loading" class="flex justify-start w-full">
        <div class="bg-surface text-secondary px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-sm flex items-center gap-2">
          <div class="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div class="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </main>

    <!-- 3. 底部输入框区域 -->
    <footer class="bg-surface p-4 border-t border-gray-100 shrink-0">
      <div class="max-w-3xl mx-auto relative flex items-center gap-2">
        <input
          v-model="input"
          type="text"
          placeholder="输入消息..."
          class="w-full bg-page text-primary placeholder:text-secondary rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          @keydown.enter="sendMessage"
          :disabled="loading"
        />
        
        <button 
          @click="sendMessage"
          :disabled="!input.trim() || loading"
          class="absolute right-2 p-2 bg-primary text-white rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <!-- 发送图标 (SVG) -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
// 定义消息类型
type Message = {
  role: 'user' | 'assistant'
  content: string
}

const input = ref('')
const loading = ref(false)
const messages = ref<Message[]>([])
const chatContainer = ref<HTMLElement | null>(null)

// 滚动到底部工具函数
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!input.value.trim() || loading.value) return

  // 1. 添加用户消息
  const userMsg = input.value.trim()
  messages.value.push({ role: 'user', content: userMsg })
  input.value = ''
  loading.value = true
  scrollToBottom()

  try {
    // 2. 调用我们写的 Server API
    const data: any = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        // 传递完整的上下文历史给 API
        messages: messages.value 
      }
    })

    // 3. 处理返回结果 (假设是 OpenAI 格式)
    const aiContent = data.choices?.[0]?.message?.content || 'API 返回格式异常'
    
    messages.value.push({
      role: 'assistant',
      content: aiContent
    })

  } catch (error: any) {
  console.error('详细错误:', error) // 打开浏览器控制台(F12)看这里
  
  // 获取具体的错误信息
  const errorMsg = error.data?.statusMessage || error.message || '未知错误'

  messages.value.push({
    role: 'assistant',
    content: `调试信息：${errorMsg}` // 这样你就能在聊天框看到具体报错了
  })
} finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>