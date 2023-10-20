<template>
    <div class="input-group">
        <input
            v-model="searchTerm"
            class="form-control"
            type="text"
            placeholder="Search Pokemon"
            @input="handleSearch"
        />
        <button class="btn btn-primary" @click="handleSearch" type="button">
            <i class="bi bi-search"></i>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchTerm = ref('');
const handleSearch = () => {
    console.log(searchTerm.value);
}
</script>

<style scoped>
</style>