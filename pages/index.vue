<template>
    <div class="flex">
        <SidebarChat />
        <MessageList />
    </div>
</template>

<script setup>
import MessageList from '../components/Chats/ChatListmessage.vue';
import SidebarChat from '../components/Chats/SidebarChat.vue';
</script>
