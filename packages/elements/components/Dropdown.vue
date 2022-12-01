<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({ drop: { type: Boolean, default: true } })

const target = ref(null)
const show = ref({ click: false, mouse: false })
const close = () => {
  show.value.click = false
  show.value.mouse = false
}
onClickOutside(target, close)
</script>

<template>
  <div
    ref="target"
    class="dropdown relative"
    @mouseenter="props.drop && (show.mouse = true)"
    @mouseleave="props.drop && (show.mouse = false)"
  >
    <div class="w-full h-full dropdown-button cursor-pointer" @click="props.drop && (show.click = !show.click)">
      <slot :show="show.click || show.mouse"></slot>
    </div>
    <Transition name="slide-fade" mode="out-in">
      <slot v-if="show.click || show.mouse" name="content" :close="close">
        <div class="dropdown-items absolute">
          <div></div>
        </div>
      </slot>
    </Transition>
  </div>
</template>
