<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->
<script setup lang="ts">
import { useAppApi } from './composables/useAppApi'
const { getItems, addItem } = useAppApi()

// res 的类型被自动推导为 Ref<ApiResponse<Item[]> | null>
const { data: res, refresh } = await getItems()
const input = ref('')

async function add() {
  if (!input.value) return
  await addItem(input.value)
  input.value = ''
  refresh()
}
</script>

<template>
  <AppAlert>ceshiyixia</AppAlert>
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
    <button @click="add">提交</button>
  </div>
</template>