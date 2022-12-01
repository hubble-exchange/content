<script lang="ts" setup>
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

const prop = defineProps({
  show: { default: false, type: Boolean },
  placement: { default: 'center', type: String as () => 'center' | 'top' },
  classes: { default: () => ['px-3 py-1'], type: Array },
  seeThrough: { default: false, type: Boolean },
})

const emit = defineEmits(['close'])
const { escape } = useMagicKeys()
watch(escape, () => escape.value && emit('close'))
</script>

<template>
  <ClientOnly>
    <Teleport to="#teleported">
      <transition name="centered-appear">
        <div
          v-if="prop.show"
          class="fixed inset-0 flex w-full h-full z-20 overflow-y-auto hidden-scrollbar common-transition"
          :class="{ 'items-center': placement === 'center', 'opacity-0': seeThrough, 'opacity-100': !seeThrough }"
        >
          <transition name="centered-appear">
            <div
              class="fixed inset-0 w-full h-full z-20 bg-originalBlack bg-opacity-10 overflow-y-auto hidden-scrollbar duration-300"
              style="backdrop-filter: blur(10px)"
              @click="emit('close')"
            ></div>
          </transition>
          <transition name="centered-appear" appear leave>
            <div
              v-if="show"
              class="relative mx-auto overflow-y-auto max-h-1/1.1 p-14"
              :class="[...prop.classes]"
              role="dialog"
              aria-label="Modal"
            >
              <div class="relative shadow-lg w-full z-20">
                <slot></slot>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
/* stylelint-disable-next-line function-url-quotes */
@-moz-document url-prefix() {
  .bg-opacity-10 {
    --un-bg-opacity: 0.6 !important;
  }
}

.centered-appear-enter-active {
  animation: centered-enter 0.3s ease-out;
}

.centered-appear-leave-active {
  animation: centered-enter 0.2s ease-in reverse;
}

@keyframes centered-enter {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
