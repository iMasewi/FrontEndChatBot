<template>
  <div class="h-screen flex flex-col flex-1 bg-gradient-to-br from-pink-100 to-pink-200">
    <!-- Header -->
    <div class="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-100 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
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
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
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
        :user="msg.user"
        :message="msg.content"
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
          <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012 2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
          </svg>
        </div>
        
        <button
          type="submit"
          :disabled="isLoading || !newMessage.trim()"
          class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
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
import { getMessageByChatId, sendMessage } from '../../composables/message.ts'
import { createChat } from '../../composables/chat.ts'
import PageAddPDF from '../PageAddPDF.vue'

const messages = ref([]) 
const newMessage = ref('') 
const messageContainer = ref(null) 
const isLoading = ref(false)
const showAddPDF = ref(false)

const props = defineProps({
  chatId: {
    type: [String, Number],
    required: true
  }
})

// Sử dụng computed hoặc watch thay vì ref reactive
const chatId = ref(Number(props.chatId))

// Watch để cập nhật chatId khi props thay đổi
watch(() => props.chatId, (newChatId) => {
  chatId.value = Number(newChatId)
  loadMessages()
}, { immediate: false })

// Tách logic load messages
const loadMessages = async () => {
  try {
    const data = await getMessageByChatId(chatId.value)
    messages.value = data
  } catch (error) {
    console.error('Lỗi khi tải tin nhắn:', error)
  }
}

onMounted(() => {
  loadMessages()
}) 

// Hàm cuộn xuống cuối
const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

// Gửi tin nhắn - tối ưu logic
const sendMessageWithContent = async (content, currentChatId) => {
  newMessage.value = ''

  messages.value.push({ 
    user: 'User', 
    content: content
  })
  
  await scrollToBottom()

  // Gọi API
  const data = await sendMessage(currentChatId, content)

  // Thêm phản hồi AI
  messages.value.push({ 
    user: 'AI', 
    content: data.content
  })
  
  await scrollToBottom()
}

const submitMessage = async () => { 
  if (isLoading.value || !newMessage.value.trim()) return
  isLoading.value = true
  
  try {
    if (chatId.value !== 0) {
      // Chat đã tồn tại
      await sendMessageWithContent(newMessage.value.trim(), chatId.value)
    } else {
      // Chat mới
      const newChat = await createChat(newMessage.value.trim())
      chatId.value = Number(newChat.conversationId)
        
      await sendMessageWithContent(newMessage.value.trim(), chatId.value)

      await navigateTo(`/chat/${chatId.value}`)
    }
  } catch (error) {
    console.error('Lỗi khi submit:', error)
  } finally {
    isLoading.value = false
  }
}

// Watch messages để auto scroll
watch(messages, () => {
  scrollToBottom()
}, { deep: true })

</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>