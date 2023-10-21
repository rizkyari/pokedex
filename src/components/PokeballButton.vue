<template>
        <button class="pokeball" @click="handleClick"></button>
</template>

<script setup>
import {defineEmits} from 'vue';

const emit = defineEmits(['handle-click']);

const handleClick = () => {
  emit('handle-click');
};
</script>

<style scoped>
.pokeball {
    display: block;
    margin: 0 auto;
    width: 80px;
    height: 80px; /* Change to 80px */
    cursor: pointer;
    background: radial-gradient(
      white 8px, 
      black 8.5px 9px, 
      white 9.5px 12px, 
      black 12.5px 16px, 
      transparent 16.5px 
    ),
    linear-gradient(to bottom, red 0 30px, black 30px 25px, white 45px 50px); 
    border-radius: 50%;
    border: 4px solid black; 
}
/* Animation */
@keyframes shake {
  0% {
    transform: translateX(0) rotate(0);
  }
  20% {
    transform: translateX(-10px) rotate(-20deg);
  }
  30% {
    transform: translateX(10px) rotate(20deg);
  }
  50% {
    transform: translateX(-10px) rotate(-10deg);
  }
  60% {
    transform: translateX(10px) rotate(10deg);
  }
  100% {
    transform: translateX(0) rotate(0);
  }
}
@keyframes catch {
  to {
    filter: saturate(0.8) brightness(0.8);
  }
}

.pokeball:hover{
  animation: 
    shake 2s,
    catch 0.5s ease-out 5.25s forwards;
}

</style>