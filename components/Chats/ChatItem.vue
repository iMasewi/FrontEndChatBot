<template>
    <div
        v-for="(chat, index) in conversations"
        :key="index"
        class="group cursor-pointer hover:bg-white/70 backdrop-blur-sm rounded-xl transition-all duration-200 hover:shadow-md"
    >
        <NuxtLink :to="`/chat/${chat.id}`" class=" rounded-xl border border-white/50">
            <div class="flex items-start gap-3">
                <!-- Avatar cho cuộc hội thoại -->
                <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <IconAvatarChat
                        svgClass="w-5 h-5 text-white"
                    />
                </div>
                
                <!-- Nội dung cuộc hội thoại -->
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                    <div class="text-[16px] font-semibold text-gray-800">
                    Cuộc hội thoại {{ index + 1 }}
                    </div>
                    <!-- Thời gian -->
                    <div class="text-xs text-gray-400">
                        {{ getTimeAgo(chat.createdAt) }}
                    </div>
                </div>
              
                <!-- Message với icon -->
                <div class="flex items-center gap-2">
                    <IconAvatarChat 
                        svgClass="w-3 h-3 text-gray-400 flex-shrink-0"
                    />
                    <div class="text-[14px] text-gray-600 truncate">
                    {{ chat.title }}
                    </div>
                </div>
                
            </div>
          </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getChatHistory } from '../../composables/chat.js'
import { NuxtLink } from '#components';
import IconAvatarChat from '../icons/IconAvatarChat.vue';
import { getTimeAgo } from '../../utils/dateTimeAgo.js';
import { emitter } from '../../composables/eventBus.ts';

const conversations = ref([])

onMounted(async () => {
  const data = await getChatHistory();
  conversations.value = Array.isArray(data) ? data.reverse() : [];
  console.log('Conversations:', conversations.value);
});

const addChat = (newChat) => {
    console.log(newChat);
    conversations.value.unshift(newChat);
}

emitter.on('chat-created', (data) => {
  addChat(data.chat);
});
</script>

