<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getVerifiedSites } from './services/searchConsoleService';

const sites = ref([]);

function startOAuth() {
  window.location.href = 'http://localhost:3000/auth';
}

const accessToken = ref<string | null>(null);

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function signOut() {
  accessToken.value = null;
  sites.value = [];
  const url = new URL(window.location.href);
  url.searchParams.delete('access_token');
  window.location.href = '/';
}

async function fetchVerifiedSites() {
  if (accessToken.value) {
    try {
      const data = await getVerifiedSites(accessToken.value);
      sites.value = data.siteEntry || [];
    } catch (error) {
      console.error('Failed to fetch verified sites:', error);
    }
  }
}

watch(accessToken, () => {
  if (accessToken.value) {
    fetchVerifiedSites();
  }
});

onMounted(() => {
  accessToken.value = getQueryParam('access_token');
  if (accessToken.value) {
    fetchVerifiedSites();
  }
});
</script>

<template>
  <button @click="startOAuth">
    {{ accessToken ? 'Change Google Account' : 'Sign In to Google' }}
  </button>
  <button v-if="accessToken" @click="signOut">
    Sign Out
  </button>
  <div v-if="sites.length > 0">
    <h3>Verified Sites</h3>
    <ul>
      <li v-for="site in sites" :key="site.siteUrl">
        {{ site.siteUrl }}
      </li>
    </ul>
  </div>
  <div v-else-if="accessToken">
    <p>No verified sites found.</p>
  </div>
  </template>

<style scoped>
</style>
