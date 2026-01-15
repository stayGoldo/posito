<script setup lang="ts">
import type { MarketItem } from '~/types/market'

// 显式声明使用 default 布局 
definePageMeta({
  layout: 'default'
})

const markets = ref<MarketItem[]>([
  //数据
  {
    id: '1',
    title: 'Will Bitcoin hit $100k in 2026?',
    image: 'https://placehold.co/100x100/orange/white?text=BTC',
    volume: '$12.5m',
    outcomeYes: 0.72,
    outcomeNo: 0.28
  },
  // ...
])
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold flex items-center gap-2 text-primary">
        <span class="text-2xl">🔥</span> Trending Markets
      </h1>
      <div class="flex gap-2 text-sm bg-gray-100 p-1 rounded-lg">
        <button class="px-3 py-1 bg-surface shadow-sm rounded-md font-medium text-primary">Top</button>
        <button class="px-3 py-1 text-secondary hover:text-primary transition">New</button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MarketCard 
        v-for="item in markets" 
        :key="item.id" 
        :market="item" 
      />
    </div>
  </div>
</template>