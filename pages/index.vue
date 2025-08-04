<template>
    <MessageList 
      :chatId="0"
    />
</template>

<script setup>
import MessageList from '../components/Chats/ChatListmessage.vue';

if (process.client) {
  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')
  if (token) {
    localStorage.setItem('token', token)
    url.searchParams.delete('token')
    window.history.replaceState({}, document.title, url.pathname + url.search)
  }
}
</script>
