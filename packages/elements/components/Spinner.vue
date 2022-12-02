<template>
  <div class="relative">
    <div class="spinner">
      <div class="blob top" />
      <div class="blob bottom" />
      <div class="blob left" />

      <div class="blob move-blob" />
    </div>
  </div>
</template>

<style scoped>
.spinner {
  position: absolute;
  height: inherit;
  width: inherit;
  transform: translate(-50%, -50%);
  animation: rotation 15s infinite ease-in;

  /* top: 50%;
  left: 50%; */
}

.blob {
  position: absolute;
  top: 50%;
  left: 50%;
  /* stylelint-disable-next-line value-keyword-case */
  border: 2px solid currentColor;
  width: 33.3333%;
  height: 33.3333%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.blob.top {
  top: 0;
  animation: blob-top 1s infinite ease-in;
}

.blob.bottom {
  top: 100%;
  animation: blob-bottom 1s infinite ease-in;
}

.blob.left {
  left: 0;
  animation: blob-left 1s infinite ease-in;
}

.move-blob {
  /* stylelint-disable-next-line value-keyword-case */
  background: currentColor;
  top: 0;
  animation: blob-spinner-mover 1s infinite ease-in;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

@keyframes blob-bottom {
  25%,
  50%,
  75% {
    top: 50%;
    left: 100%;
  }

  100% {
    top: 0;
    left: 50%;
  }
}

@keyframes blob-left {
  25% {
    top: 50%;
    left: 0;
  }

  50%,
  100% {
    top: 100%;
    left: 50%;
  }
}

@keyframes blob-top {
  50% {
    top: 0;
    left: 50%;
  }

  75%,
  100% {
    top: 50%;
    left: 0;
  }
}

@keyframes blob-spinner-mover {
  0%,
  100% {
    top: 0;
    left: 50%;
  }

  25% {
    top: 50%;
    left: 100%;
  }

  50% {
    top: 100%;
    left: 50%;
  }

  75% {
    top: 50%;
    left: 0;
  }
}
</style>
