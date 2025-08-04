<template>
  <div class="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto relative z-50">
      <!-- Nút đóng -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
      >×</button>
      <div class="p-6">
        <!-- Drag & Drop Area -->
        <div
          class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
          :class="isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
        >
          <div class="flex flex-col items-center">
            <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="text-gray-600 mb-2">Kéo thả file PDF vào đây</p>
            <p class="text-gray-400 text-sm mb-4">hoặc</p>
            <input
              type="file"
              accept=".pdf"
              @change="handleFileSelect"
              class="hidden"
              ref="fileInput"
              id="pdf-upload"
            />
            <label
              for="pdf-upload"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Chọn file PDF
            </label>
          </div>
        </div>

        <!-- Selected File Display -->
        <div v-if="uploadedFile" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <div class="flex-1">
              <p class="text-sm font-medium text-green-800">{{ uploadedFile.name }}</p>
              <p class="text-xs text-green-600">{{ (uploadedFile.size / 1024 / 1024).toFixed(2) }} MB</p>
            </div>
            <button
              @click="uploadedFile = null"
              class="text-red-500 hover:text-red-700 text-sm"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Hủy
        </button>
        <button
          @click="handleUpload"
          :disabled="!uploadedFile"
          class="px-6 py-2 rounded-lg font-medium transition-colors"
          :class="uploadedFile ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addPdf } from '../server/upLoadPdf.js'

const isDragging = ref(false)
const uploadedFile = ref(null)
const fileInput = ref(null)

const handleDragOver = () => {
  isDragging.value = true
}
const handleDragLeave = () => {
  isDragging.value = false
}
const handleDrop = (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files && files[0] && files[0].type === 'application/pdf') {
    uploadedFile.value = files[0]
  }
}
const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file && file.type === 'application/pdf') {
    uploadedFile.value = file
  }
}
const handleUpload = () => {
  if (uploadedFile.value) {
    console.log('Uploading:', uploadedFile.value)
    addPdf(uploadedFile.value)
      .then(() => {
        alert('File PDF đã được upload thành công!')
      })
      .catch((error) => {
        console.error('Upload failed:', error)
        alert('Đã xảy ra lỗi khi upload file PDF.')
      })

    // Reset sau khi upload
    uploadedFile.value = null
    fileInput.value.value = ''
    $emit('close')
  } else {
    alert('Vui lòng chọn file PDF để upload.')
  }
}
</script>