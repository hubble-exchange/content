<script lang="ts" setup>
import { ref, watch } from 'vue'
import { RadioItem } from '../types'

const prop = defineProps({
  classes: { default: () => [], type: Array as () => string[] },
  items: { type: Array as () => RadioItem[], required: true },
  value: { default: null, type: [String, Number] },
  required: { default: false, type: Boolean },
})
const emit = defineEmits<{ (e: 'change', value: number | string | null): void }>()

const selected = ref<number | string | null>(prop.value || null)

watch(
  () => prop.value,
  () => (selected.value = prop.value)
)
const select = (val: string | number) => {
  if (!prop.required && selected.value == val) {
    selected.value = null
  } else selected.value = val
  emit('change', selected.value)
}
</script>

<template>
  <div v-if="prop.items && prop.items.length > 0" class="w-full flex relative">
    <button
      v-for="item in prop.items"
      :key="`${item.value}-${item.label}`"
      class="flex justify-center relative items-center rounded-2.5 dark:a-border-gray-raisin-1 a-border-gray-cultured-1 bgr-border-bppywb-15 ab-hf-toggle"
      :class="[
        { 'b-hide text-gray-romanSilver': selected !== item.value },
        { 'a-hide text-current': selected === item.value },
        ...classes,
      ]"
      @click="select(item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
