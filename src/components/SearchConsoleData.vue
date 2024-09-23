<template>
    <div class="card p-4 mb-4">
      <h5 class="card-title">Search Console Data</h5>
      <button @click="fetchGSCData" class="btn btn-primary mb-3">
        Fetch GSC Data
      </button>
      <div v-if="gscLoading" class="mt-3">
        Fetching from Search Console...
      </div>
      <div v-else-if="gscData">
        <pre>{{ gscData }}</pre>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { getIndexCoverage } from '../services/searchConsoleService';
  import { useAppStore } from '../stores/appStore';
  
  const gscLoading = ref(false);
  const gscData = ref(null);
  const appStore = useAppStore();
  
  async function fetchGSCData() {
    if (!appStore.accessToken || !appStore.selectedDomain) {
      alert('Access token or selected domain missing.');
      return;
    }
  
    gscLoading.value = true;
    try {
      const data = await getIndexCoverage(
        appStore.accessToken,
        appStore.selectedDomain,
        '2023-01-01',
        '2023-12-31'
      );
      gscData.value = data;
    } catch (error) {
      console.error('Error fetching GSC data:', error);
      gscData.value = `Error: ${error.message}`;
    } finally {
      gscLoading.value = false;
    }
  }
  </script>
  
  <style scoped>
  pre {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
  }
  </style>
  