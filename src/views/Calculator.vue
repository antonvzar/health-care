<template>
  <v-container>
    <h2 class="text-h4 mb-4">Nutrition Calculator</h2>
    <v-autocomplete
      v-model="selectedFood"
      :items="foods"
      item-title="name"
      item-value="name"
      label="Select a food"
      @update:model-value="addFood"
    ></v-autocomplete>
    <v-list v-if="selectedFoods.length">
      <v-list-item v-for="food in selectedFoods" :key="food.name">
        <v-list-item-title>{{ food.name }}</v-list-item-title>
        <v-list-item-subtitle>
          Calories: {{ food.calories }} | 
          Proteins: {{ food.proteins }}g | 
          Carbs: {{ food.carbs }}g | 
          Fats: {{ food.fats }}g
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn icon @click="removeFood(food)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider class="my-4"></v-divider>
    <h3 class="text-h5 mb-2">Total Nutrition</h3>
    <p>Calories: {{ totalNutrition.calories }}</p>
    <p>Proteins: {{ totalNutrition.proteins }}g</p>
    <p>Carbs: {{ totalNutrition.carbs }}g</p>
    <p>Fats: {{ totalNutrition.fats }}g</p>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { searchFood, getFoodById } from '../services/foodService'

const foods = ref([])
const selectedFood = ref(null)
const selectedFoods = ref([])

// Функция для извлечения числовых значений из строки и округления до десятых
const parseNutritionalValues = (value) => {
  return Math.round(parseFloat(value.replace(/[^0-9,.-]/g, '').replace(',', '.')) * 10) / 10
}

onMounted(async () => {
  // Загрузка всех продуктов для автозаполнения
  foods.value = await searchFood('')
})

const addFood = async () => {
  if (selectedFood.value) {
    let food = await getFoodById(selectedFood.value)
    if (food) {
      // Применяем парсинг и округление к пищевым данным
      food = {
        ...food,
        calories: parseNutritionalValues(food.calories),
        proteins: parseNutritionalValues(food.proteins),
        fats: parseNutritionalValues(food.fats),
        carbs: parseNutritionalValues(food.carbs)
      }
      selectedFoods.value.push(food)
      selectedFood.value = null
    }
  }
}

const removeFood = (food) => {
  const index = selectedFoods.value.findIndex(f => f.name === food.name)
  if (index !== -1) {
    selectedFoods.value.splice(index, 1)
  }
}

const totalNutrition = computed(() => {
  return selectedFoods.value.reduce((total, food) => {
    total.calories += food.calories
    total.proteins += food.proteins
    total.carbs += food.carbs
    total.fats += food.fats
    return total
  }, { calories: 0, proteins: 0, carbs: 0, fats: 0 })
})
</script>
