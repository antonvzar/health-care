<template>
    <v-container>
      <h2 class="text-h4 mb-4">Search Foods</h2>
      <v-text-field
        v-model="searchQuery"
        label="Search for a food"
        @input="performSearch"
      ></v-text-field>
      <v-list v-if="searchResults.length">
        <v-list-item v-for="food in searchResults" :key="food.name">
          <v-list-item-title>{{ food.name }}</v-list-item-title>
          <v-list-item-subtitle>
            Calories: {{ food.calories }} | 
            Proteins: {{ food.proteins }} | 
            Fats: {{ food.fats }} | 
            Carbs: {{ food.carbs }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <p v-else-if="searchQuery && !isLoading">No results found</p>
      <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
    </v-container>
    </template>
    
    <script setup>
    import { ref } from 'vue'
    import { searchFood } from '../services/foodService'
    
    const searchQuery = ref('')
    const searchResults = ref([])
    const isLoading = ref(false)
    
    const performSearch = async () => {
      if (searchQuery.value) {
        isLoading.value = true
        searchResults.value = await searchFood(searchQuery.value)
        isLoading.value = false
      } else {
        searchResults.value = []
      }
    }
    </script>