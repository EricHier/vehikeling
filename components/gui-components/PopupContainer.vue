<template>
  <div class="bg-popup overflow-auto fixed w-screen h-screen top-0 left-0 z-20 p-4 md:p-6">
    <div class="bg-white max-w-xl mx-auto p-4 md:p-6 rounded" :click="$emit('onFormClick')" v-on:keydown="$emit('onFormKeydown')">
      <slot />
    </div>
  </div>
</template>
