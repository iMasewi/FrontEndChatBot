<template>
  <div class="h-screen flex flex-col flex-1 bg-gradient-to-br from-pink-100 to-pink-200">
    <!-- Header -->
    <div class="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-100 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
          <IconAvatarChat svgClass="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-1">Chat Bot</h1>
          <p class="text-gray-600 text-lg">Hãy trò chuyện với tôi!</p>
        </div>
      </div>
      <button
        @click="showAddPDF = true"
        class="flex items-center gap-2 px-4 py-2 bg-pink-400 hover:bg-pink-500 rounded-lg shadow transition text-gray-700 font-medium"
      >
        <IconFilePDF
          svgClass="w-5 h-5 text-gray-500"
        />
        PDF AI Assistant
      </button>
    </div>

    <!-- Khu vực tin nhắn -->
    <div
      ref="messageContainer"
      class="flex-1 overflow-y-auto bg-gray-50 px-6 py-4 custom-scroll space-y-4"
    >
      <div class="text-center py-4">
        <div class="inline-block bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
          💬 Cuộc trò chuyện bắt đầu
        </div>
      </div>
      
      <ChatMessage
        v-for="(msg, index) in messages"
        :key="index"
        :message="msg"
        @update-message="editMessage"
      />
    </div>

    <!-- Form gửi tin nhắn -->
    <form
      @submit.prevent="submitMessage"
      class="bg-white/90 backdrop-blur-sm border-t border-pink-100 shadow-lg p-4"
    >
      <div class="flex items-center gap-3 max-w-4xl mx-auto">
        <div class="flex-1 relative">
          <input
            v-model="newMessage"
            type="text"
            :disabled="isLoading"
            class="w-full border-2 border-gray-200 p-4 pr-12 rounded-2xl outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-white shadow-sm disabled:opacity-50"
            placeholder="Nhập tin nhắn của bạn..."
          />
          <IconSendMessage
            svgClass="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
        
        <button
          type="submit"
          :disabled="isLoading || !newMessage.trim()"
          class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconSending
            svgClass="w-5 h-5 text-gray-400"
          />
          <span>{{ isLoading ? 'Đang gửi...' : 'Gửi' }}</span>
        </button>
      </div>
    </form>

    <PageAddPDF v-if="showAddPDF" @close="showAddPDF = false" />
  </div>
</template>

<script setup> 
import { ref, onMounted, nextTick, watch } from 'vue' 
import ChatMessage from '../components/Chats/ChatMessage.vue' 
import { getMessageByChatId, sendMessage, updateMessage } from '../../composables/message.ts'
import { createChat } from '../../composables/chat.ts'
import PageAddPDF from '../PageAddPDF.vue'
import IconAvatarChat from '../icons/IconAvatarChat.vue';
import IconFilePDF from '../icons/IconFilePDF.vue'
import IconSendMessage from '../icons/IconSendMessage.vue'
import IconSending from '../icons/IconSending.vue'
import { emitter } from '../../composables/eventBus.ts'

const messages = ref([]);
const newMessage = ref('');
const messageContainer = ref(null);
const isLoading = ref(false);
const showAddPDF = ref(false);

const props = defineProps({
  chatId: {
    type: [String, Number],
    required: true
  }
})

// Sử dụng computed hoặc watch thay vì ref reactive
const chatId = ref(Number(props.chatId));

// Watch để cập nhật chatId khi props thay đổi
watch(() => props.chatId, (newChatId) => {
  chatId.value = Number(newChatId);
  loadMessages();
}, { immediate: false })

// Tách logic load messages
const loadMessages = async () => {
  try {
    const data = await getMessageByChatId(chatId.value);
    messages.value = data;
  } catch (error) {
    console.error('Lỗi khi tải tin nhắn:', error);
  }
}

onMounted(() => {
  loadMessages();
}) 

// Hàm cuộn xuống cuối
const scrollToBottom = async () => {
  await nextTick();
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
}

// Gửi tin nhắn
const sendMessageWithContent = async (content, currentChatId) => {
  newMessage.value = '';

  messages.value.push({ 
    user: 'User', 
    content: content
  });
  
  await scrollToBottom();

  // Gọi API
  const data = await sendMessage(currentChatId, content);

  // Thêm phản hồi AI
  messages.value.push({ 
    user: 'AI', 
    content: data.content
  });
  
  await scrollToBottom()
}

const submitMessage = async () => { 
  if (isLoading.value || !newMessage.value.trim()) return;
  isLoading.value = true;
  
  try {
    if (chatId.value !== 0) {
      // Chat đã tồn tại
      await sendMessageWithContent(newMessage.value.trim(), chatId.value);
    } else {
      // Chat mới
      const newChat = await createChat(newMessage.value.trim());
      chatId.value = Number(newChat.id);
        
      await sendMessageWithContent(newMessage.value.trim(), chatId.value);

      await navigateTo(`/chat/${chatId.value}`);

      emitter.emit('chat-created', {
        chat: newChat,
      });
    }
  } catch (error) {
    console.error('Lỗi khi submit:', error);
  } finally {
    isLoading.value = false;
  }
}

// Update message
const editMessage = async (data) => {
  const { message, newContent } = data;
  
  // Tìm và sửa trực tiếp trong mảng messages
  const idx = messages.value.findIndex(msg => msg.id === message.id);
  console.log('Index to update:', idx);
  if (idx !== -1) {
    messages.value.splice(idx);
    messages.value.push({
      user: 'User',
      content: newContent
    });
    
    await scrollToBottom();
    
    const response = await updateMessage(message.id, chatId.value, newContent);

    // Thêm phản hồi AI
    messages.value.push({
      user: 'AI',
      content: response
    });

    await scrollToBottom();
  }

}

// Watch messages để auto scroll
watch(messages, () => {
  scrollToBottom();
}, { deep: true })

</script>