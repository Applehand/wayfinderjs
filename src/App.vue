<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import JSZip from 'jszip';
import { getVerifiedSites } from './services/searchConsoleService';

const sites = ref([]);
const selectedFile = ref<File | null>(null);
const extractedFiles = ref<{ name: string; content: string }[]>([]);

const zipReader = new JSZip();

function startOAuth() {
  window.location.href = 'http://localhost:3000/auth';
}

const accessToken = ref<string | null>(null);

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function clearProject() {
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

function onFileChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file.name.endsWith('.zip')) {
      selectedFile.value = file;
      console.log('ZIP file selected:', selectedFile.value);
      processZipFile(selectedFile.value);
    } else {
      console.error('Only ZIP files are allowed.');
    }
  }
}

async function processZipFile(file: File) {
  extractedFiles.value = [];

  try {
    const content = await file.arrayBuffer();
    const zipContent = await zipReader.loadAsync(content);

    zipContent.forEach(async (relativePath, zipEntry) => {
      const fileData = await zipEntry.async('text');
      extractedFiles.value.push({ name: relativePath, content: fileData });
    });

    console.log('All files extracted from ZIP:', extractedFiles.value);
  } catch (error) {
    console.error('Error processing ZIP file:', error);
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
  <div id="file-upload">
    <input
      type="file"
      @change="onFileChanged"
      accept=".zip"
    />
    <button @click="startOAuth">
      {{ accessToken ? 'Change Google Account' : 'Sign In to Google' }}
    </button>
    <button v-if="accessToken" @click="clearProject">
      Clear Project
    </button>
  </div>
  <div v-if="extractedFiles.length > 0">
    <h3>Extracted Files</h3>
    <ul>
      <li v-for="file in extractedFiles" :key="file.name">
        <strong>{{ file.name }}</strong>
      </li>
    </ul>
  </div>
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
button {
  margin: 0.5rem;
}
#file-upload {
  margin: auto;
  height: 20vh;
  width: 40vh;
}
</style>
