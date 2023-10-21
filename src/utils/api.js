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

export async function searchPokemonByName(name) {
      const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
      return [response.data]; 
}

export async function filterTypes(type){
    const response = await axios.get(`${BASE_URL}/type/${type}`);
    return response.data;
}

export async function getMore(offset){
        const response = await axios.get(`${BASE_URL}/pokemon?limit=20&offset=${offset}`);
        return response.data.results;
}