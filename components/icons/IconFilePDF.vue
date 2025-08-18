<template>
    <svg :class="svgClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
</template>
<script setup>

const props = defineProps({
  svgClass: {
    type: String,
    default: ''
  }
})
</script>