<template>
    <div class="border-t border-pink-200 bg-white/90 backdrop-blur-sm p-3">
      <div class="relative">
        <!-- User Info Button -->
        <button 
          @click="toggleUserMenu"
          class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50/80 transition-all duration-200 group"
        >
          <!-- Avatar người dùng -->
          <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <IconAvataUser
              svgClass="w-6 h-6 text-white"
            />
          </div>
          
          <!-- Thông tin user -->
          <div v-if="userInfo">
            <div class="text-sm font-semibold text-gray-800 text-start">{{ userInfo.name || "Người dùng" }}</div>
            <div class="text-xs text-gray-500">{{ userInfo.email || "" }}</div>
          </div>
          <div v-else>
            <div class="text-sm text-gray-400">Đang tải...</div>
          </div>
          
          <!-- Icon dropdown -->
          <IconDropdown
            svgClass="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200"
            :showUserMenu="showUserMenu"
          />
        </button>

        <!-- Dropdown Menu -->
        <div 
          v-if="showUserMenu"
          ref="dropdownRef"
          class="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
        >
          <!-- Menu items -->
          <!-- <button class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Hồ sơ cá nhân
          </button>
          
          <button class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Cài đặt
          </button>
          
          <hr class="my-2 border-gray-100"> -->
          
          <!-- Nút đăng xuất -->
          <button 
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <IconLogout 
              svgClass="w-4 h-4"
            />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { logout } from '../../composables/auth.js'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getUserInfo  } from '../../composables/useAuthGuard.js'
import IconAvataUser from '../icons/IconAvataUser.vue'
import IconLogout from '../icons/IconLogout.vue'
import IconDropdown from '../icons/IconDropdown.vue'

// State cho user menu dropdown
const showUserMenu = ref(false)
const dropdownRef = ref(null)
const userInfo = ref(null)

const loadUserInfo = async () => {
  try {
    const data = await getUserInfo()
    console.log(data);    
    userInfo.value = data
  } catch (err) {
    userInfo.value = null
  }
}

// Function để toggle user menu
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// Function xử lý đăng xuất
const handleLogout = async () => {
  // Đóng menu trước
  showUserMenu.value = false
  logout()
  navigateTo('/login')
}

// Đóng menu khi click bên ngoài (optional)
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}
onMounted(() => {
  loadUserInfo();
  document.addEventListener('mousedown', handleClickOutside);
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
})
</script>