<template>
  <div class="flex mb-4" :class="user === 'User' ? 'justify-end' : 'justify-start'">
    <div class="flex items-start gap-3 max-w-[75%]" :class="user === 'User' ? 'flex-row-reverse' : 'flex-row'">
      <div class="flex-shrink-0">
        <div v-if="user === 'AI'" class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
          <IconAvataAI
            svgClass="w-6 h-6 text-white"
          />
        </div>
        <div v-else class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
          <IconAvataUser
            svgClass="w-6 h-6 text-white"
          />
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
import IconAvataUser from '../icons/IconAvataUser.vue'
import IconAvataAI from '../icons/IconAvataAI.vue'

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