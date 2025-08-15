<template>
  <MessageList v-if="chatId" :chatId="Number(chatId)" />
</template>

<script setup>
import MessageList from '../../components/Chats/ChatListmessage.vue'
import { useRoute } from 'vue-router'
import { useAuthGuard } from '../../composables/useAuthGuard.js'

useAuthGuard();
const route = useRoute();
const chatId = route.params.id;
</script>