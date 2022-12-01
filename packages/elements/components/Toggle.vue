<script lang="ts" setup>
import { ref, watch } from 'vue'

const prop = defineProps({ id: { default: 'toggle', type: String }, value: { default: false, type: Boolean } })
const emit = defineEmits<{ (event: 'change', value: boolean): void }>()
const checked = ref(prop.value)

const toggle = () => (checked.value = !checked.value)

watch(checked, () => emit('change', checked.value))
watch(
  () => prop.value,
  () => (checked.value = prop.value)
)
</script>

<template>
  <div>
    <input :id="id" class="tgl tgl-ios" type="checkbox" :checked="checked" />
    <label class="tgl-btn" @click="toggle()"></label>
  </div>
</template>

<style scoped>
/* stylelint-disable selector-no-vendor-prefix */
/* stylelint-disable property-no-vendor-prefix */

.dark .tgl-ios + .tgl-btn {
  --toggle-cir: #777e90;
  --toggle-cir-hover: #e8eae9;
  --toggle-off-bg: #23262f;
}

.light .tgl-ios + .tgl-btn,
.tgl-ios + .tgl-btn {
  --toggle-cir: #777e90;
  --toggle-cir-hover: #e8eae9;
  --toggle-off-bg: #d5d5d5;
}

.tgl {
  display: none;
}

.tgl,
.tgl::after,
.tgl::before,
.tgl *,
.tgl *::after,
.tgl *::before,
.tgl + .tgl-btn {
  box-sizing: border-box;
}

.tgl::-moz-selection,
.tgl::after::-moz-selection,
.tgl::before::-moz-selection,
.tgl *::-moz-selection,
.tgl *::after::-moz-selection,
.tgl *::before::-moz-selection,
.tgl + .tgl-btn::-moz-selection {
  background: none;
}

.tgl::selection,
.tgl::after::selection,
.tgl::before::selection,
.tgl *::selection,
.tgl *::after::selection,
.tgl *::before::selection,
.tgl + .tgl-btn::selection {
  background: none;
}

.tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 2.75rem;
  height: 1.5rem;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.tgl + .tgl-btn::after,
.tgl + .tgl-btn::before {
  position: relative;
  display: block;
  content: '';
  width: 50%;
  height: 100%;
}

.tgl + .tgl-btn::after {
  left: 0;
}

.tgl + .tgl-btn::before {
  display: none;
}

.tgl:checked + .tgl-btn::after {
  left: 50%;
  background: #e8eae9;
}

.tgl-ios + .tgl-btn {
  border-radius: 9999px;
  background: var(--toggle-off-bg);
  padding: 2px;
  transition: all 0.4s ease;

  /* border: 1px solid #e8eae9; */
}

.tgl-ios + .tgl-btn::after {
  border-radius: 9999px;
  background: var(--toggle-cir);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 0 0 1px rgb(0 0 0 10%), 0 4px 0 rgb(0 0 0 8%);
}

.tgl-ios + .tgl-btn:hover::after {
  will-change: padding;
  background: var(--toggle-cir-hover);
}

.tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 2rem #e8eae9;
  background: #e8eae9;
}

.tgl-ios + .tgl-btn:active::after {
  padding-right: 0.8rem;
}

.tgl-btn:active::after {
  background: #e8eae9;
}

.tgl-ios:checked + .tgl-btn {
  /* background: linear-gradient(222.94deg, #32c5ff 0%, #b620e0 45.93%, #ffaa12 86.01%); */
  background: linear-gradient(
    15deg,
    #0035ff -69.72%,
    #7137ff 1.21%,
    #f048c7 46.61%,
    #ffd535 116.5%,
    #fff 148.76%,
    #0035ff 214.03%
  );
}

.tgl-ios:checked + .tgl-btn:active {
  box-shadow: none;
}

.tgl-ios:checked + .tgl-btn:active::after {
  margin-left: -0.8rem;
}
</style>
