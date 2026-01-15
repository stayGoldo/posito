<script setup lang="ts">
// Layout 逻辑层
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header-->
    <header class="fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] bg-surface border-b border-gray-200 px-4 flex items-center justify-between">
      <div class="font-bold text-xl tracking-tight">
        PolyClone <span class="text-xs text-secondary font-normal">2026</span>
      </div>

      <div class="hidden md:block flex-1 max-w-md mx-4">
        <div class="bg-gray-100 rounded-lg h-10 w-full flex items-center px-3 text-sm text-secondary">
          Search markets...
        </div>
      </div>

      <div class="flex gap-3">
        <button class="px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition">Log In</button>
        <button class="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:opacity-90 transition">Sign Up</button>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 pt-(--header-height)">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- slot-->
        <slot />
      </div>
    </main>
  </div>
</template>