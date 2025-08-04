<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
    <div class="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-purple-700 mb-6">Đăng nhập</h2>
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none" placeholder="example@gmail.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none" placeholder="••••••••" />
        </div>
        <button type="submit" class="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition">Đăng nhập</button>
      </form>
      <button @click="handleLoginWithGoogle" class="w-full mt-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
        Đăng nhập với Google
      </button>
      <div class="mt-6 text-center text-sm text-gray-600">
        Chưa có tài khoản?
        <NuxtLink to="/register" class="text-purple-600 font-semibold hover:underline">Đăng ký ngay</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#imports'
import { login } from '../../server/auth.ts'

definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const response = await login(email.value, password.value)
  if (response) {
    await navigateTo('/')
  } else {
    alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
  }
}

const handleLoginWithGoogle = async (e) => {
  e.preventDefault()
  window.location.href = 'https://localhost:7222/api/Auth/loginGoogle?returnUrl=http://localhost:3000'
}
</script> 