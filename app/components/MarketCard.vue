<script setup lang="ts">
import type { MarketItem } from '~/types/market'

defineProps<{
  market: MarketItem
}>()
</script>

<template>
  <!-- 使用 bg-surface 代替硬编码颜色 -->
  <article class="group cursor-pointer flex flex-col gap-3 p-4 rounded-xl bg-surface border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
    
    <div class="flex gap-3 items-start">
      <!-- 
        优化点：添加 loading="lazy" 和宽高属性防止布局抖动 
        或者使用 NuxtImg (如果已安装模块)
      -->
      <img 
        :src="market.image" 
        alt="" 
        loading="lazy"
        width="40"
        height="40"
        class="w-10 h-10 rounded-full object-cover bg-gray-100 shrink-0" 
      />
      <!-- 使用 text-primary -->
      <h3 class="font-medium text-primary leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
        {{ market.title }}
      </h3>
    </div>

    <div class="flex gap-2 mt-auto">
      <!-- 使用 text-yes / bg-yes 的透明度变体 (Tailwind v4 自动支持) -->
      <div class="flex-1 flex justify-between items-center px-3 py-2 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors text-yes">
        <span class="text-xs font-bold">Yes</span>
        <span class="text-sm font-bold">{{ Math.round(market.outcomeYes * 100) }}%</span>
      </div>
      
      <div class="flex-1 flex justify-between items-center px-3 py-2 rounded bg-rose-50 hover:bg-rose-100 transition-colors text-no">
        <span class="text-xs font-bold">No</span>
        <span class="text-sm font-bold">{{ Math.round(market.outcomeNo * 100) }}%</span>
      </div>
    </div>

    <div class="text-xs text-secondary font-medium">
      Vol. {{ market.volume }}
    </div>
  </article>
</template>