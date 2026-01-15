<template>
  <div class="min-h-screen flex flex-col">
    
    <!-- 1. Top Navbar (固定) -->
    <header class="fixed top-0 left-0 right-0 z-50 h-[var(--h-navbar)] bg-surface border-b border-border flex items-center px-4 lg:px-6">
      <div class="w-full max-w-7xl mx-auto flex items-center justify-between h-full">
        
        <!-- Left: Logo + Nav Links -->
        <div class="flex items-center gap-8">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <Icon name="simple-icons:polymarket" class="text-2xl text-poly-blue" />
            <span class="font-bold text-xl tracking-tight">Posito</span>
          </NuxtLink>

          <!-- Desktop Nav -->
          <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-text-dim">
            <NuxtLink to="/" class="hover:text-text-main transition">Markets</NuxtLink>
            <NuxtLink to="/activity" class="hover:text-text-main transition">Activity</NuxtLink>
            <NuxtLink to="/ranks" class="hover:text-text-main transition">Leaderboard</NuxtLink>
          </nav>
        </div>

        <!-- Middle: Search (Polymarket 风格是居中或者靠右) -->
        <div class="hidden lg:flex flex-1 max-w-md mx-8">
          <div class="relative w-full group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="lucide:search" class="text-gray-400 group-focus-within:text-poly-blue" />
            </div>
            <input 
              type="text" 
              placeholder="Search markets..." 
              class="w-full bg-gray-50 border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-poly-blue/20 focus:border-poly-blue transition-all"
            />
          </div>
        </div>

        <!-- Right: Auth Buttons -->
        <div class="flex items-center gap-3">
          <button class="hidden sm:block px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition">Log In</button>
          <button class="px-4 py-2 text-sm font-medium bg-poly-blue text-white rounded-lg hover:bg-blue-600 transition shadow-sm">Sign Up</button>
        </div>
      </div>
    </header>

    <!-- 2. Sub Navbar (Categories) - 模拟吸顶效果 -->
    <div class="fixed top-[var(--h-navbar)] left-0 right-0 z-40 h-[var(--h-subnav)] bg-surface/95 backdrop-blur border-b border-border flex items-center px-4 lg:px-6 overflow-x-auto no-scrollbar">
      <div class="w-full max-w-7xl mx-auto flex items-center gap-2">
        <!-- Category Items -->
        <button class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-bold text-text-main whitespace-nowrap">
          <Icon name="lucide:flame" class="text-orange-500" /> Trending
        </button>
        <button class="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-50 text-xs font-medium text-text-dim whitespace-nowrap transition">
          <Icon name="lucide:vote" /> Politics
        </button>
        <button class="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-50 text-xs font-medium text-text-dim whitespace-nowrap transition">
          <Icon name="lucide:bitcoin" /> Crypto
        </button>
        <button class="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-50 text-xs font-medium text-text-dim whitespace-nowrap transition">
          <Icon name="lucide:trophy" /> Sports
        </button>
      </div>
    </div>

    <!-- 3. Main Content -->
    <!-- padding-top = navbar + subnav + spacing -->
    <main class="flex-1 pt-[calc(var(--h-navbar)+var(--h-subnav)+24px)] pb-12 px-4 lg:px-6">
      <div class="w-full max-w-7xl mx-auto">
        <slot />
      </div>
    </main>

  </div>
</template>

<style scoped>
/* 隐藏横向滚动条但允许滚动 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>