<script setup lang="ts">
import { ref } from 'vue'
import { 
  Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild,
  Menu, MenuButton, MenuItems, MenuItem 
} from '@headlessui/vue'
import { ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

const { user, login, logout, loading } = useAuth()

// 登录表单数据
const isLoginOpen = ref(false)
const form = ref({ username: '', password: '' })
const errorMsg = ref('')

// 模态框控制
const openModal = () => { isLoginOpen.value = true; errorMsg.value = '' }
const closeModal = () => isLoginOpen.value = false

// 提交登录
const handleLogin = async () => {
  if (!form.value.username || !form.value.password) return
  
  const success = await login(form.value.username, form.value.password)
  if (success) {
    closeModal()
    form.value = { username: '', password: '' }
  } else {
    errorMsg.value = '用户名或密码错误'
  }
}

// 简单的头像生成 (Fallback)
const getAvatar = (name: string) => 
  `https://api.dicebear.com/9.x/initials/svg?seed=${name}&backgroundColor=2563eb&textColor=ffffff`
</script>

<template>
  <div class="flex items-center">
    
    <!-- 1. 未登录状态：显示按钮 -->
    <div v-if="!user">
      <button 
        @click="openModal"
        class="cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
      >
        登录
      </button>
    </div>

    <!-- 2. 已登录状态：显示头像 + 下拉菜单 -->
    <Menu as="div" class="relative ml-3" v-else>
      <MenuButton class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
        <span class="sr-only">打开用户菜单</span>
        <img 
          class="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200" 
          :src="user.avatar || getAvatar(user.username)" 
          alt="User Avatar" 
        />
      </MenuButton>
      
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div class="px-4 py-3">
            <p class="text-xs text-gray-500">当前用户</p>
            <p class="truncate text-sm font-bold text-gray-900">{{ user.username }}</p>
            <p class="text-xs text-gray-400 font-mono mt-0.5">ID: {{ user.id }}</p>
          </div>
          
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="logout"
                :class="[
                  active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                  'group flex w-full items-center px-4 py-2 text-sm cursor-pointer'
                ]"
              >
                <ArrowRightOnRectangleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                退出登录
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>

    <!-- 3. 登录弹窗 (Dialog) -->
    <TransitionRoot appear :show="isLoginOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <!-- 遮罩 -->
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div class="flex justify-between items-center mb-6">
                  <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900">
                    欢迎回来
                  </DialogTitle>
                  <button @click="closeModal" class="text-gray-400 hover:text-gray-500 cursor-pointer">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                    <input 
                      v-model="form.username"
                      type="text" 
                      required
                      class="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                    <input 
                      v-model="form.password"
                      type="password" 
                      required
                      class="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div v-if="errorMsg" class="text-red-500 text-xs text-center font-medium">
                    {{ errorMsg }}
                  </div>

                  <div class="mt-6">
                    <button
                      type="submit"
                      :disabled="loading"
                      class="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span v-if="loading">登录中...</span>
                      <span v-else>立即登录</span>
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>