<template>
    <svg 
        :class="[svgClass, {'rotate-180': showUserMenu }]"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  svgClass: {
    type: String,
    default: ''
  },
  showUserMenu: {
    type: Boolean,
    default: false
  }
})
</script>