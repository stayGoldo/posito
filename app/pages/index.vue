<script setup lang="ts">
import type { MarketItem } from '~/types/market'

// 模拟数据
const markets = ref<MarketItem[]>([
  {
    id: '1',
    title: 'Presidential Election Winner 2028',
    image: 'https://placehold.co/100x100/2e62fd/white?text=USA',
    volume: '$45.2m',
    outcomeYes: 0.45,
    outcomeNo: 0.55
  },
  {
    id: '2',
    title: 'Bitcoin above $100k by end of 2026?',
    image: 'https://placehold.co/100x100/f7931a/white?text=BTC',
    volume: '$12.5m',
    outcomeYes: 0.72,
    outcomeNo: 0.28
  },
  {
    id: '3',
    title: 'Will Taylor Swift release a new album in Q1?',
    image: 'https://placehold.co/100x100/pink/white?text=TS',
    volume: '$3.1m',
    outcomeYes: 0.15,
    outcomeNo: 0.85
  },
  {
    id: '4',
    title: 'Fed Interest Rate Cut in March?',
    image: 'https://placehold.co/100x100/10b981/white?text=FED',
    volume: '$8.9m',
    outcomeYes: 0.60,
    outcomeNo: 0.40
  },
  {
    id: '5',
    title: 'GTA VI Release Date confirmed?',
    image: 'https://placehold.co/100x100/purple/white?text=GTA',
    volume: '$15m',
    outcomeYes: 0.90,
    outcomeNo: 0.10
  }
])
</script>

<template>
  <NuxtLayout name="default">
    
    <!-- 页面标题 -->
    <div class="flex items-center gap-2 mb-6">
      <Icon name="lucide:trending-up" class="text-2xl text-text-main" />
      <h1 class="text-2xl font-bold text-text-main">Trending Markets</h1>
    </div>

    <!-- 
      Grid 布局：
      - sm: 2列
      - lg: 3列
      - xl: 4列 (Polymarket 标准)
      - 2xl: 5列 (大屏适配)
    -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      <MarketCard 
        v-for="item in markets" 
        :key="item.id" 
        :market="item" 
      />
    </div>

  </NuxtLayout>
</template>