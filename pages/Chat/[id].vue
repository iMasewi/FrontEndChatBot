<template>
  <MessageList v-if="chatId" :chatId="Number(chatId)" />
</template>

<script setup>
import MessageList from '../../components/Chats/ChatListmessage.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const chatId = route.params.id
</script>