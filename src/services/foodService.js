import foodData from '../food_base.json';

export const searchFood = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = foodData.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300); // Simulating network delay
  });
};

export const getFoodById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const food = foodData.find(food => food.name === id);
      resolve(food);
    }, 300);
  });
};