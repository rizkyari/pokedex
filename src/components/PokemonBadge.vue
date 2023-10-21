<template>
    <div class="types">
      <button
        type="button"
        class="btn-type m-1"
        v-for="(type, index) in props.pokeTypes"
        :key="index"
        @click="handleTypeClick(type)"
        :style="{ backgroundColor: type.hex }"
      >
        {{ type.type }}
      </button>
    </div>
  </template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['pokeTypes']);
const emit  = defineEmits(['handleTypeClick']);

const handleTypeClick = (type) => {
  emit('handleTypeClick', type.value);
}
</script>

<style scoped>
.btn-type {
    outline: none;
    border: none;
    border-radius: 5px;
    color: white;
}

.btn-type:hover{
  opacity: 0.7;
}
</style>
