<template>
  <div class="flex mb-4" :class="message.user === 'User' ? 'justify-end' : 'justify-start'">
    <div class="flex items-start gap-3 max-w-[75%]" :class="message.user === 'User' ? 'flex-row-reverse' : 'flex-row'">
      <div class="flex-shrink-0">
        <div v-if="message.user === 'AI'" class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
          <IconAvataAI
            svgClass="w-6 h-6 text-white"
          />
        </div>
        <div v-else class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
          <IconAvataUser
            svgClass="w-6 h-6 text-white"
          />
        </div>
      </div>

      <div class="flex flex-col" :class="message.user === 'User' ? 'items-end' : 'items-start'">
        
        <div class="text-xs text-gray-500 mb-1 px-2">
          {{ message.user === 'User' ? 'Bạn' : 'AI' }}
        </div>
        
        <!-- Message bubble với background khác nhau cho AI và User -->
        <div 
          class="relative"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
          <!-- Message bubble -->
          <div 
            class="relative rounded-2xl px-4 py-3 shadow-sm max-w-full break-words cursor-pointer"
            :class="messageStyle"
            @click="copyMessage"
          >
            <!-- Hiển thị message hoặc edit form -->
            <div v-if="!isEditing">
              <p class="text-sm leading-relaxed whitespace-pre-wrap" :class="textColor">
                {{ message.content }}
              </p>
              <!-- Hiển thị hướng dẫn hoặc đã copy -->
              <transition name="fade">
                <span
                  v-if="hovered && !copied && !showEditButton"
                  class="absolute bottom-1 right-3 text-xs text-gray-900 opacity-80 pointer-events-none select-none"
                >
                  Ấn để copy
                </span>
              </transition>
              <transition name="fade">
                <span
                  v-if="copied"
                  class="absolute bottom-1 right-3 text-xs text-gray-900 font-semibold opacity-90 pointer-events-none select-none"
                >
                  Đã copy!
                </span>
              </transition>
            </div>
            
            <!-- Edit form -->
            <div v-else class="space-y-3">
              <textarea
                v-model="editMessage"
                ref="editTextarea"
                class="w-[600px] p-2 border border-gray-300 rounded-lg resize-none text-sm text-gray-800 bg-white placeholder-gray-300"
                rows="3"
                placeholder="Chỉnh sửa tin nhắn..."
                @keydown.enter.ctrl="saveEdit"
                @keydown.escape="cancelEdit"
              />
              <div class="flex gap-2 justify-end">
                <button
                  @click="cancelEdit"
                  class="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
                >
                  Hủy
                </button>
                <button
                  @click="saveEdit"
                  class="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
          
          <!-- Edit button -->
          <transition name="fade">
            <div
              v-if="hovered && !isEditing && !copied && message.user === 'User'"
              class="absolute right-0 -bottom-8 flex items-center justify-center"
            >
              <button
                @click="startEdit"
                class="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded-md shadow-sm transition-colors border border-gray-200"
                @mouseenter="showEditButton = true"
                @mouseleave="showEditButton = false"
              >
                <IconEditMessage
                  svgClass="w-4 h-4 text-gray-500"
                />
                Sửa
              </button>
            </div>
          </transition>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { computed, ref, nextTick, watch } from 'vue'
import IconAvataUser from '../icons/IconAvataUser.vue'
import IconAvataAI from '../icons/IconAvataAI.vue'
import IconEditMessage from '../icons/IconEditMessage.vue'

// Props nhận từ component cha
const props = defineProps({
  message: {
    type: Object, 
    required: true
  }
})
// Emit để gửi message đã chỉnh sửa về component cha
const emit = defineEmits(['update-message'])

const hovered = ref(false);
const copied = ref(false);
const isEditing = ref(false);
const editMessage = ref('');
const showEditButton = ref(false);
const editTextarea = ref(null);

// Computed style cho message bubble - AI có background trắng, User có background hồng
const messageStyle = computed(() => {
  if (props.message.user === 'User') {
    return 'bg-gradient-to-r from-pink-400 to-pink-500 ml-4';
  } else {
    return 'bg-white border border-gray-100 mr-4';
  }
})

// Computed class cho màu text - User dùng text trắng, AI dùng text đen
const textColor = computed(() => {
  return props.message.user === 'User' ? 'text-white' : 'text-gray-800';
})

// Hàm copy message vào clipboard
const copyMessage = () => {
  if (!isEditing.value) {
    navigator.clipboard.writeText(props.message.content);
    copied.value = true;
    setTimeout(() => copied.value = false, 1200);
  }
}

// Hàm bắt đầu edit
const startEdit = () => {
  isEditing.value = true;
  editMessage.value = props.message.content;
  nextTick(() => {
    if (editTextarea.value) {
      editTextarea.value.focus();
      editTextarea.value.select();
    }
  })
}

// Hàm hủy edit
const cancelEdit = () => {
  isEditing.value = false;
  editMessage.value = '';
}

// Hàm lưu edit
const saveEdit = () => {
  if (editMessage.value.trim() !== '') {
    emit('update-message', {
      message: props.message,
      newContent: editMessage.value.trim()
    });
    isEditing.value = false;
    editMessage.value = '';
  }
}


// Reset trạng thái khi không hover
watch(hovered, (newValue) => {
  if (!newValue) {
    showEditButton.value = false;
  }
})
</script>