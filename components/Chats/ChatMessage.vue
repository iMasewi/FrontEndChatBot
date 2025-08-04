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
          class="relative rounded-2xl px-4 py-3 shadow-sm max-w-full break-words cursor-pointer"
          :class="messageStyle"
          @click="copyMessage"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
          <p class="text-sm leading-relaxed whitespace-pre-wrap" :class="textColor">
            {{ message }}
          </p>
          <!-- Hiển thị hướng dẫn hoặc đã copy -->
          <transition name="fade">
            <span
              v-if="hovered && !copied"
              class="absolute bottom-1 right-3 text-xs text-gray-900 opacity-80 pointer-events-none select-none"
            >
              Ấn để copy
            </span>
          </transition>
          <transition name="fade">
            <span
              v-if="copied"
              class="absolute bottom-1 right-3 text-xs text-gray-900 font-semibold opacity-90 pointer-events-none select-none"
            >
              Đã copy!
            </span>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

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
const hovered = ref(false)
const copied = ref(false)

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

// Hàm copy message vào clipboard
const copyMessage = () => {
  navigator.clipboard.writeText(props.message)
  copied.value = true
  setTimeout(() => copied.value = false, 1200)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>