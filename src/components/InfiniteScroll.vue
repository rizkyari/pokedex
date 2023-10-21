<template>
    <div ref="wrapper" class="wrapper">
      <slot />
      <div ref="end" class="scroll_end">
        <div v-if="pokeStore.isLoadingMore">
            <PokeballSpinner/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
/* eslint-disable */
import { onMounted, ref, defineEmits } from "vue";
import PokeballSpinner from "./PokeballSpinner.vue";
import { usePokemonStore } from "@/store/store";
  
  const pokeStore = usePokemonStore();
  const emits = defineEmits()
  const wrapper = ref(null)
  const end = ref(null)
  
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          emits("infinite")
        }
      })
    })
  
    observer.observe(end.value)
  })

  </script>
  