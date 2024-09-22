<template>
  <header class="app-header">
    <router-link to="/" class="home-link">🏠 House</router-link>
  </header>

  <router-view />
</template>

<script setup lang="ts"></script>

<style>
.app-header {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.home-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.home-link:hover {
  text-decoration: underline;
}

.alert {
  margin: auto;
  max-width: 600px;
}
</style>
