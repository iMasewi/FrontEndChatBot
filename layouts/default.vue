<template>
  <div class="flex">
    <SidebarChat />
    <slot />
  </div>
</template>
<script setup>
import SidebarChat from '../components/Chats/SidebarChat.vue';

</script>