<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header của ứng dụng -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo và tên ứng dụng -->
          <div class="flex items-center space-x-3">
            <!-- Icon chatbot -->
            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">🤖</span>
            </div>
            
            <!-- Tên ứng dụng -->
            <h1 class="text-xl font-semibold text-gray-900">
              AI PDF Chatbot
            </h1>
          </div>
          
          <!-- Navigation hoặc user menu (có thể mở rộng sau) -->
          <nav class="flex items-center space-x-4">
            <!-- Có thể thêm các menu item khác ở đây -->
            <div class="text-sm text-gray-500">
              v1.0.0
            </div>
          </nav>
        </div>
      </div>
    </header>
    
    <!-- Main content area -->
    <main class="flex-1">
      <!-- Slot để render nội dung trang -->
      <slot />
    </main>
    
    <!-- Footer (optional) -->
    <footer class="bg-white border-t mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="text-center text-sm text-gray-500">
          © 2024 AI PDF Chatbot. Được phát triển với NuxtJS.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'AI PDF Chatbot',
  meta: [
    {
      name: 'description',
      content: 'Chatbot AI để tìm kiếm và trả lời câu hỏi từ tài liệu PDF'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})
</script>

<style scoped>
/* Đảm bảo layout chiếm toàn bộ chiều cao màn hình */
.min-h-screen {
  display: flex;
  flex-direction: column;
}
</style>