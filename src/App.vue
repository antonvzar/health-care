<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Food Nutrition Calculator</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/search" text>Search</v-btn>
      <v-btn to="/calculator" text>Calculator</v-btn>
      <v-btn to="/charts" text>Charts</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// No additional setup needed for this component
</script>