<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 p-4">
    <div class="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-pink-600 mb-6">Đăng ký</h2>
      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input v-model="name" type="text" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none" placeholder="Nhập tên của bạn" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
          v-model="email" 
          type="email" 
          required 
          autoComplete="off"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none" 
          placeholder="Nhập email" 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <input 
          v-model="password" 
          type="password" 
          required 
          autoComplete="new-password"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none" 
          placeholder="Nhập password" 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
          <input v-model="rePassword" type="password" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none" placeholder="Nhập lại password" />
        </div>
        <button type="submit" class="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-700 transition">Đăng ký</button>
      </form>
      <div class="mt-6 text-center text-sm text-gray-600">
        Đã có tài khoản?
        <NuxtLink to="/login" class="text-pink-600 font-semibold hover:underline">Đăng nhập</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#imports'
import { register } from '../../composables/auth.ts'

definePageMeta({
  layout: false
})

const name = ref('')
const email = ref('')
const password = ref('')
const rePassword = ref('')

const handleRegister = async () => {
    if (password.value !== rePassword.value) {
        alert('Mật khẩu không khớp!')
        return
    }
    const response = await register(name.value, email.value, password.value)
    if (response) {
        alert('Đăng ký thành công!')
        await navigateTo('/login')
    } else {
        alert('Đăng ký thất bại, vui lòng thử lại.')
    }
}
</script>