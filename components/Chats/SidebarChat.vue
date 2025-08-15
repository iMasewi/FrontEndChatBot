<template>
  <div class="w-[300px] h-screen flex flex-col bg-gradient-to-br from-pink-100 via-pink-150 to-pink-200 border-r border-pink-200 shadow-lg">
    
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
            {{ totalChats }} cuộc trò chuyện
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách cuộc hội thoại -->
    <div class="bg-gray-50/80 backdrop-blur-sm flex flex-col flex-1 overflow-y-auto">
      <!-- Nút tạo cuộc hội thoại mới -->
      <div class="p-3 border-b border-gray-100">
        <button 
        class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        @click="createConversation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Cuộc hội thoại mới</span>
        </button>
      </div>

      <!-- List các cuộc hội thoại -->
      <div class="flex-1 p-2 space-y-2 overflow-y-auto custom-scroll">
        <ChatItem/>
      </div>
    </div>

    <!-- User Bar ở dưới cùng -->
    <ChatUser />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChatItem from './ChatItem.vue'
import ChatUser from './ChatUser.vue'
import { countChats } from '../../composables/chat.js'

const totalChats = ref(0)

onMounted(async () => {
  totalChats.value = await countChats()
})

const createConversation = async () => {
  await navigateTo('/')
}

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