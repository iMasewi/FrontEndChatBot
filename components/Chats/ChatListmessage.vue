<template>
  <div class="h-screen flex flex-col flex-1 bg-gradient-to-br from-pink-100 to-pink-200">
    <!-- Header - Cải tiến với icon và styling đẹp hơn -->
    <div class="p-6 bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-100">
      <div class="flex items-center gap-3">
        <!-- Thêm icon robot để làm header sinh động hơn -->
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
    </div>

    <!-- Khu vực tin nhắn - Cải tiến background và spacing -->
    <div
      ref="messageContainer"
      class="flex-1 overflow-y-auto bg-gray-50 px-6 py-4 custom-scroll space-y-4"
    >
      <!-- Thêm welcome message để giao diện thân thiện hơn -->
      <div class="text-center py-4">
        <div class="inline-block bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600 shadow-sm">
          💬 Cuộc trò chuyện bắt đầu
        </div>
      </div>
      
      <ChatMessage
        v-for="(msg, index) in messages"
        :key="index"
        :user="msg.user"
        :message="msg.message"
      />
    </div>

    <!-- Form gửi tin nhắn - Cải tiến styling và layout -->
    <form
      @submit.prevent="sendMessage"
      class="bg-white/90 backdrop-blur-sm border-t border-pink-100 shadow-lg p-4"
    >
      <div class="flex items-center gap-3 max-w-4xl mx-auto">
        <!-- Input với styling đẹp hơn và icon -->
        <div class="flex-1 relative">
          <input
            v-model="newMessage"
            type="text"
            class="w-full border-2 border-gray-200 p-4 pr-12 rounded-2xl outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200 text-gray-800 placeholder-gray-500 bg-white shadow-sm"
            placeholder="Nhập tin nhắn của bạn..."
          />
          <!-- Icon message trong input -->
          <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
          </svg>
        </div>
        
        <!-- Button với styling đẹp hơn và icon -->
        <button
          type="submit"
          class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
        >
          <!-- Icon send -->
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
          <span>Gửi</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup> 
import { ref, onMounted, onUpdated } from 'vue' 
import ChatMessage from '../components/Chats/ChatMessage.vue' 

const messages = ref([ 
    { 
    user: "AI", 
    message: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?", 
  }, 
  { 
    user: "User", 
    message: "Cho tôi biết thời tiết hôm nay ở Hà Nội.", 
  }, 
  { 
    user: "AI", 
    message: "Hôm nay trời nắng nhẹ, nhiệt độ dao động từ 29 đến 35°C.", 
  }, 
  { 
    user: "User", 
    message: "Cảm ơn bạn.", 
  }, 
  { 
    user: "AI", 
    message: "Rất vui được giúp đỡ bạn!", 
  } 
]) 
const newMessage = ref('') 
const messageContainer = ref(null) 

// onMounted(async () => { 
//   const res = await fetch('https://mocki.io/v1/33e74247-7da5-4de2-9fc7-b4710f01caa4') 
//   const data = await res.json() 
//   messages.value = data.messages 
// }) 

// Gửi tin nhắn (giả lập) 
const sendMessage = async () => { 
  if (!newMessage.value.trim()) return 

  // 1. Thêm tin nhắn người dùng ngay 
  messages.value.push({ 
    user: 'User', 
    message: newMessage.value 
  }) 

  newMessage.value = '' 

  // 2. Gọi API để lấy phản hồi của AI 
//   const res = await fetch('https://mocki.io/v1/af5e18d1-3bd1-407e-8ee2-3cc25789bdf5') // API giả 
//   const data = await res.json() 

  // 3. Thêm phản hồi AI 
  messages.value.push({ 
    user: 'AI', 
    message: data.reply 
  }) 
} 

//Hàm bảo tự động cuộn xuống cuối khi có tin nhắn mới 
onUpdated(() => { 
  if (messageContainer.value) { 
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight 
  } 
}) 

</script>

<style scoped>
/* Custom scrollbar để đẹp hơn */
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