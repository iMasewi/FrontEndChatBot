<template>
  <div class="flex mb-4" :class="user === 'User' ? 'justify-end' : 'justify-start'">
    <div class="flex items-start gap-3 max-w-[75%]" :class="user === 'User' ? 'flex-row-reverse' : 'flex-row'">
      <div class="flex-shrink-0">
        <div v-if="user === 'AI'" class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div v-else class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      </div>

      <div class="flex flex-col" :class="user === 'User' ? 'items-end' : 'items-start'">
        
        <div class="text-xs text-gray-500 mb-1 px-2">
          {{ user === 'User' ? 'Bạn' : 'AI' }}
        </div>
        
        <!-- Message bubble với background khác nhau cho AI và User -->
        <div 
          class="rounded-2xl px-4 py-3 shadow-sm max-w-full break-words"
          :class="messageStyle"
        >
          <p class="text-sm leading-relaxed whitespace-pre-wrap" :class="textColor">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props nhận từ component cha
const props = defineProps({
  user: {
    type: String,
    required: true
  },
  message: {
    type: String, 
    required: true
  }
})

// Computed style cho message bubble - AI có background trắng, User có background hồng
const messageStyle = computed(() => {
  if (props.user === 'User') {
    return 'bg-gradient-to-r from-pink-400 to-pink-500 ml-4'
  } else {
    return 'bg-white border border-gray-100 mr-4'
  }
})

// Computed class cho màu text - User dùng text trắng, AI dùng text đen
const textColor = computed(() => {
  return props.user === 'User' ? 'text-white' : 'text-gray-800'
})

// Hàm lấy thời gian hiện tại để hiển thị timestamp
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
/* Không cần animation theo yêu cầu, chỉ giữ style cơ bản */
</style>