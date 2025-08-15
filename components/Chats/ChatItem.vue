<template>
    <div
        v-for="(chat, index) in conversations"
        :key="index"
        class="group cursor-pointer hover:bg-white/70 backdrop-blur-sm rounded-xl transition-all duration-200 hover:shadow-md"
        @click="selectConversation(chat)"
    >
        <NuxtLink :to="`/chat/${chat.id}`" class=" rounded-xl border border-white/50">
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
                        {{ getTimeAgo(chat.createdAt) }}
                    </div>
                </div>
              
                <!-- Message preview với icon -->
                <div class="flex items-center gap-2">
                    <svg class="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <div class="text-[14px] text-gray-600 truncate">
                    {{ chat.title }}
                    </div>
                </div>
                
            </div>
          </div>
        </NuxtLink>
    </div>
</template>
abc

<script setup>
import { ref, onMounted } from 'vue'
import { getChatHistory } from '../../composables/chat.js'
import { NuxtLink } from '#components';

const conversations = ref([])

const getTimeAgo = (dateString) => {
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now - created - 7*1000*60*60;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return created.toLocaleDateString('vi-VN');
}

onMounted(async () => {
  const data = await getChatHistory();
  conversations.value = data.reverse();
  console.log('Conversations:', conversations.value);
  
})

// Xử lý khi ấn vào chat
const selectConversation = (chat) => {
  
}
</script>

