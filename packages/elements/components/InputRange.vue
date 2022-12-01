<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const prop = defineProps({
  value: { type: Number, default: 0 },
  label: { type: [String, Number], default: '' },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  steps: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  height: { type: Number, default: 0 },
})
const emit = defineEmits<{ (e: 'change', value: number): void }>()

// Provided value or provided min
const input = ref(prop.value || prop.min)
let wasValueChanged = false

watch(
  () => prop.value,
  () => {
    if (input.value !== prop.value) {
      input.value = prop.value
      wasValueChanged = true
    }
  }
)

const onChange = () => {
  // prevent infinite event loop
  if (wasValueChanged) {
    wasValueChanged = false
    return
  }
  emit('change', input.value)
}

watchDebounced(input, onChange, { debounce: 700 })

const backgroundSize = computed((): string => {
  const leftSide = ((input.value - prop.min) * 100) / (prop.max - prop.min)
  if (leftSide < 0) return '0% 100%'
  return `${leftSide}% 100%`
})

const style = computed(() => {
  const style: { backgroundSize?: string; height?: string } = { backgroundSize: backgroundSize.value }
  if (prop.height) style.height = `${prop.height}px`
  return style
})
</script>

<template>
  <div class="flex justify-between items-center w-full h-full">
    <input
      id="range"
      v-model.number="input"
      type="range"
      name="range"
      :min="min"
      :max="max"
      :step="steps"
      :style="style"
      :disabled="prop.disabled"
      :class="{ 'cursor-pointer': !prop.disabled }"
      class="w-full styled-range mt-auto"
      :area-label="label"
    />
    <div class="flex ml-4 items-center px-3 justify-between rounded-2.5 border border-common">
      <input
        v-model.number="input"
        type="number"
        min="0"
        max="100"
        step="0.01"
        :disabled="prop.disabled"
        class="unstyled-input py-2.5 text-right w-10"
      />
      <span class="ml-1">%</span>
    </div>
  </div>
</template>

<style scoped>
/* stylelint-disable property-no-vendor-prefix */

.dark .styled-range {
  --thumb-bg: #fff;
  --bg-color: #21242d;
}

.light .styled-range,
.styled-range {
  --thumb-bg: #c4c4c4;
  --bg-color: #f3f2f2;
  --bg-gradient: linear-gradient(
    10deg,
    #0035ff -69.72%,
    #7137ff 1.21%,
    #f048c7 46.61%,
    #ffd535 116.5%,
    #fff 148.76%,
    #0035ff 214.03%
  );
}

.styled-range {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  margin: 16px 0;
  background-color: var(--bg-color);
  background-image: var(--bg-gradient);
  background-size: 0% 100%;
  background-repeat: no-repeat;
  border-radius: 100px;
  height: 4px;
}

.styled-range:focus {
  outline: none;
}

.styled-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border: none;
}

.styled-range::-webkit-slider-thumb {
  box-shadow: none;
  border: none;
  width: 32px;
  height: 19px;
  border-radius: 4px;
  background: var(--thumb-bg);
  -webkit-appearance: none;
  appearance: none;
  margin-top: -8px;
}

.styled-range:focus::-webkit-slider-runnable-track {
  background: transparent;
}

.styled-range::-webkit-slider-thumb:focus,
.styled-range::-webkit-slider-thumb:active {
  -webkit-appearance: none;
  appearance: none;
  -webkit-transform: scale(0.75);
  transform: scale(0.75);
}

.styled-range::-moz-range-track {
  width: 100%;
  height: 4px;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
  border: none;
}

.styled-range::-moz-range-thumb {
  box-shadow: none;
  border: none;
  width: 32px;
  height: 19px;
  border-radius: 4px;
  background: var(--thumb-bg);
}

.styled-range::-moz-range-thumb:focus,
.styled-range::-moz-range-thumb:active {
  -moz-appearance: none;
  appearance: none;
  transform: scale(0.85);
}

.styled-range::-ms-track {
  width: 100%;
  height: 4px;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

.styled-range::-ms-fill-lower {
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.styled-range::-ms-fill-upper {
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.styled-range::-ms-thumb {
  box-shadow: none;
  border: none;
  width: 32px;
  height: 19px;
  border-radius: 4px;
  background: var(--thumb-bg);
}

.styled-range:focus::-ms-fill-lower {
  background: transparent;
}

.styled-range:focus::-ms-fill-upper {
  background: transparent;
}
</style>
