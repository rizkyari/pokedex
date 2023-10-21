<template>
    <div class="input-group">
        <input
            v-model="searchTerm"
            class="form-control"
            type="text"
            placeholder="Search Pokemon"
            @keyup.enter="handleSearch"
        />
        <button class="btn btn-primary" @click="handleSearch" type="button">
            <i class="bi bi-search"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['handle-search'])
const searchTerm = ref('');
const handleSearch = () => {
    emit('handle-search', searchTerm.value)
}
</script>

<style scoped>
</style>