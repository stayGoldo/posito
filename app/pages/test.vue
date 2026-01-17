<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->
<script setup lang="ts">
// 1. 获取列表数据（这里用 useFetch 是对的，因为是页面加载时获取状态）
const { data: res, pending, error, refresh } = await useFetch('/api/items')

const input = ref('')
const delPending = ref(false)

// 2. 添加操作
async function add() {
  if (!input.value) return
  
  // 修改点：使用 $fetch
  await $fetch('/api/items', {
    method: 'POST',
    body: { name: input.value }
  })
  
  input.value = ''
  refresh() // 刷新列表
}

// 3. 删除操作
async function del() {
  if (!input.value) return
  delPending.value = true
  try {
    // 修改点：使用 $fetch，并手动指定 method 类型以绕过 TS 检查(如果服务端确实写了DELETE逻辑)
    // 或者通常 $fetch 的类型检查没有 useFetch 那么严格
    await $fetch(`/api/items/${input.value}`, {
      method: 'DELETE'
    })
    
    refresh() // 刷新列表
  } catch (e) {
    console.error(e)
  } finally {
    delPending.value = false
  }
}
</script>
<template>
  <div>
    <!-- 验证结构 -->
    <pre>Code: {{ res?.code }}</pre>
    <pre>Status: {{ res?.status }}</pre>
    
    <hr/>
    
    <!-- 验证数据 -->
    <ul>
      <li v-for="item in res?.data" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </li>
    </ul>

    <input v-model="input" placeholder="输入名称" />
    <button @click="add" :disabled="pending">{{  pending ? '提交中...' : '提交'  }}</button>
    <button @click="del" :disabled="delPending">{{  delPending ? '删除中...' : '删除'  }}</button>
  </div>
</template>