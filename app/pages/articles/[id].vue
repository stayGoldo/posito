<script setup lang="ts">
import type { ArticleResponse } from '#shared/schemas/articles'

const route = useRoute()
const id = route.params.id

// useFetch 自动获得类型提示
const { data: article, error } = await useFetch<ArticleResponse>(`/api/v1/articles/${id}`)

if (error.value) {
  // 处理 404 或其他错误
  console.error(error.value)
}
</script>

<template>
  <div v-if="article" class="p-8">
    <h1 class="text-4xl font-bold">{{ article.title }}</h1>
    <div class="text-gray-500 mt-2">
      发布于: {{ new Date(article.createdAt).toLocaleDateString() }} 
      <span class="ml-2 badge">{{ article.status }}</span>
    </div>
    <div class="mt-8 prose">
      {{ article.content }}
    </div>
  </div>
  
  <div v-else-if="error" class="text-center text-red-500 mt-10">
    {{ error.statusCode === 404 ? '文章未找到' : '加载失败' }}
  </div>
</template>