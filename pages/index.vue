<template>
    <MessageList 
      :chatId="0"
    />
</template>

<script setup>
import MessageList from '../components/Chats/ChatListmessage.vue';
import { useAuthGuard } from '../composables/useAuthGuard.js';

useAuthGuard();

if (process.client) {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('token');
  if (token) {
    localStorage.setItem('token', token);
    url.searchParams.delete('token');
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }
}
useHead({
  title: 'Chat Bot AI - Trò chuyện thông minh',
  meta: [
    { name: 'description', content: 'Ứng dụng Chat Bot AI hỗ trợ PDF và trò chuyện trực quan.' }
  ]
})
</script>
