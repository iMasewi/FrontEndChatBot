<template>
  <div class="w-[300px] flex flex-col bg-gradient-to-br from-pink-100 via-pink-150 to-pink-200 border-r border-pink-200 shadow-lg">
    
    <!-- Header -->
    <div class="p-4 bg-white/80 backdrop-blur-sm border-b border-pink-100">
      <div class="flex items-center gap-3">
        <!-- Icon chat -->  
        <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2m-4 6v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H9z"></path>
          </svg>
        </div>
        <div>
          <div class="text-[18px] font-bold text-gray-800">
            Cuộc hội thoại
          </div>
          <div class="text-sm text-gray-600">
            {{ conversations.length }} cuộc trò chuyện
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách cuộc hội thoại -->
    <div class="bg-gray-50/80 backdrop-blur-sm flex flex-col flex-1 overflow-y-auto custom-scroll">
      <!-- Nút tạo cuộc hội thoại mới -->
      <div class="p-3 border-b border-gray-100">
        <button class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Cuộc hội thoại mới</span>
        </button>
      </div>

      <!-- List các cuộc hội thoại -->
      <div class="flex-1 p-2 space-y-2">
        <div
          v-for="(chat, index) in conversations"
          :key="index"
          class="group cursor-pointer hover:bg-white/70 backdrop-blur-sm rounded-xl transition-all duration-200 hover:shadow-md"
          @click="selectConversation(index)"
        >
          <div class="p-3 rounded-xl border border-white/50">
            <div class="flex items-start gap-3">
              <!-- Avatar cho cuộc hội thoại -->
              <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              
              <!-- Nội dung cuộc hội thoại -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <div class="text-[16px] font-semibold text-gray-800">
                    Cuộc hội thoại {{ index + 1 }}
                  </div>
                  <!-- Thời gian (giả lập) -->
                  <div class="text-xs text-gray-400">
                    {{ getTimeAgo(index) }}
                  </div>
                </div>
                
                <!-- Message preview với icon -->
                <div class="flex items-center gap-2">
                  <svg class="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <div class="text-[14px] text-gray-600 truncate">
                    {{ chat.lastMessage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Bar ở dưới cùng -->
    <div class="border-t border-pink-200 bg-white/90 backdrop-blur-sm p-3">
      <div class="relative">
        <!-- User Info Button -->
        <button 
          @click="toggleUserMenu"
          class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50/80 transition-all duration-200 group"
        >
          <!-- Avatar người dùng -->
          <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          
          <!-- Thông tin user -->
          <div class="flex-1 text-left">
            <div class="text-sm font-semibold text-gray-800">Người dùng</div>
            <div class="text-xs text-gray-500">user@example.com</div>
          </div>
          
          <!-- Icon dropdown -->
          <svg 
            class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200"
            :class="{ 'rotate-180': showUserMenu }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
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
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Giữ nguyên data như bạn yêu cầu
const conversations = ref([
  { lastMessage: 'Xin chào bạn' },
  { lastMessage: 'Bạn cần hỗ trợ gì?' },
  { lastMessage: 'Tôi có câu hỏi áhdjakshdjkashdjk' },
])

// State cho user menu dropdown
const showUserMenu = ref(false)
const dropdownRef = ref(null)

// Giữ nguyên function selectConversation
const selectConversation = (index) => {
  console.log('Chọn cuộc hội thoại:', conversations.value[index])
}

// Thêm function helper để tạo thời gian giả lập
const getTimeAgo = (index) => {
  const times = ['2 phút', '1 giờ', '1 ngày']
  return times[index] || 'Vừa xong'
}

// Function để toggle user menu
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// Function xử lý đăng xuất
const handleLogout = () => {
  // Đóng menu trước
  showUserMenu.value = false
  
  // Xử lý logic đăng xuất ở đây
  console.log('Đăng xuất thành công')
  
  // Có thể thêm logic redirect hoặc clear token
  // router.push('/login')
  // localStorage.removeItem('authToken')
  
  // Hiển thị thông báo
  alert('Đã đăng xuất thành công!')
}

// Đóng menu khi click bên ngoài (optional)
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Có thể thêm event listener để đóng menu khi click outside
// onMounted(() => {
//   document.addEventListener('click', closeMenuOnClickOutside)
// })

// onUnmounted(() => {
//   document.removeEventListener('click', closeMenuOnClickOutside)
// })
</script>

<style scoped>
/* Custom scrollbar để match với main chat */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(219, 39, 119, 0.3);
  border-radius: 3px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(219, 39, 119, 0.5);
}

/* Thêm màu pink-150 tự định nghĩa */
.from-pink-150 {
  --tw-gradient-from: rgb(252 231 243);
}
</style>