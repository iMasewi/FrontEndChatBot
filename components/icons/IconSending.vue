<template>
    <svg :class="svgClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
    </svg>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  svgClass: {
    type: String,
    default: ''
  }
})
</script>