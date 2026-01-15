<script setup lang="ts">
import type { MarketItem } from '~/types/market'

defineProps<{
  market: MarketItem
}>()

// 格式化价格 (0.72 -> 72¢)
const formatPrice = (val: number) => Math.round(val * 100) + '¢'
</script>

<template>
  <NuxtLink 
    :to="`/market/${market.id}`"
    class="group flex flex-col p-4 rounded-xl bg-surface border border-border hover:border-gray-300 hover:shadow-md transition-all duration-200 h-full relative overflow-hidden"
  >
    <!-- 顶部：图片与标题 -->
    <div class="flex gap-4 mb-4">
      <!-- 图片-->
      <div class="w-12 h-12 shrink-0">
        <img 
          :src="market.image" 
          class="w-full h-full object-cover rounded-md border border-gray-100" 
          alt="" 
          loading="lazy"
        />
      </div>
      
      <!-- 标题 -->
      <h3 class="text-[15px] font-medium text-text-main leading-snug line-clamp-3 group-hover:text-poly-blue transition-colors">
        {{ market.title }}
      </h3>
    </div>

    <!-- 中间：交易按钮-->
    <div class="mt-auto grid grid-cols-2 gap-2">
      <!-- Buy Yes -->
      <div class="flex flex-col items-center justify-center py-2 rounded-lg bg-poly-green/5 hover:bg-poly-green/10 border border-poly-green/20 transition-colors cursor-pointer">
        <span class="text-xs font-bold text-poly-green">Yes</span>
        <span class="text-sm font-bold text-poly-green">{{ formatPrice(market.outcomeYes) }}</span>
      </div>

      <!-- Buy No -->
      <div class="flex flex-col items-center justify-center py-2 rounded-lg bg-poly-red/5 hover:bg-poly-red/10 border border-poly-red/20 transition-colors cursor-pointer">
        <span class="text-xs font-bold text-poly-red">No</span>
        <span class="text-sm font-bold text-poly-red">{{ formatPrice(market.outcomeNo) }}</span>
      </div>
    </div>

    <!-- 底部：元数据 -->
    <div class="mt-3 flex items-center gap-4 text-xs text-text-dim font-medium">
      <!-- Volume -->
      <div class="flex items-center gap-1">
        <Icon name="lucide:bar-chart-2" class="text-gray-400" />
        <span>{{ market.volume }} Vol.</span>
      </div>
      <!-- Comments (Mock) -->
      <div class="flex items-center gap-1">
        <Icon name="lucide:message-square" class="text-gray-400" />
        <span>12</span>
      </div>
    </div>
    
    <!-- 右上角：概率图标  -->
    <div class="absolute top-3 right-3">
      <Icon name="lucide:star" class="text-gray-300 w-4 h-4 hover:text-yellow-400 transition" />
    </div>

  </NuxtLink>
</template>