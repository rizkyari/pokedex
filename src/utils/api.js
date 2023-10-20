import axios from 'axios';
import { BASE_URL } from '@/constants/api';

export async function fetchPokemonList() {
        const response = await axios.get(`${BASE_URL}/pokemon`);
        return response.data.results;
}

export async function fetchPokemonDetails(url){
        const response = await axios.get(url);
        return response.data;
}