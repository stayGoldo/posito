<script setup lang="ts">
import type { CreateArticleInput, ArticleResponse } from '#shared/schemas/articles'

const form = reactive<CreateArticleInput>({
  title: '',
  content: '',
  status: 'published'
})

async function handleSubmit() {
  try {
    // $fetch 泛型指定返回类型
    const data = await $fetch<ArticleResponse>('/api/v1/articles', {
      method: 'POST',
      body: form
    })
    alert(`文章发表成功：${data.title} (ID: ${data.id})`)
    navigateTo(`/articles/${data.id}`)
  } catch (err: any) {
    // 这里的 err 包含了后端返回的标准化错误信息
    alert(err.data?.message || '发表失败')
  }
}
</script>

<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">发表新文章</h1>
    
    <div class="space-y-4">
      <input v-model="form.title" placeholder="标题" class="border p-2 w-full" />
      <textarea v-model="form.content" placeholder="内容" class="border p-2 w-full h-32"></textarea>
      
      <select v-model="form.status" class="border p-2">
        <option value="draft">存为草稿</option>
        <option value="published">立即发布</option>
      </select>

      <button @click="handleSubmit" class="bg-blue-600 text-white px-4 py-2 rounded">
        提交
      </button>
    </div>
  </div>
</template>