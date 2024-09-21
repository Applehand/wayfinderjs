<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import JSZip from "jszip";
import { getVerifiedSites } from "./services/searchConsoleService";

const sites = ref([]);
const selectedFile = ref<File | null>(null);
const extractedFiles = ref<{ name: string; content: string }[]>([]);

const zipReader = new JSZip();

function startOAuth() {
  window.location.href = "http://localhost:3000/auth";
}

const accessToken = ref<string | null>(null);

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function clearProject() {
  accessToken.value = null;
  sites.value = [];
  extractedFiles.value = [];
  const url = new URL(window.location.href);
  url.searchParams.delete("access_token");
  window.location.href = "/";
}

async function fetchVerifiedSites() {
  if (accessToken.value) {
    try {
      const data = await getVerifiedSites(accessToken.value);
      sites.value = data.siteEntry || [];
    } catch (error) {
      console.error("Failed to fetch verified sites:", error);
    }
  }
}

function onFileChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file.name.endsWith(".zip")) {
      selectedFile.value = file;
      console.log("ZIP file selected:", selectedFile.value);
      processZipFile(selectedFile.value);
    } else {
      console.error("Only ZIP files are allowed.");
    }
  }
}

async function processZipFile(file: File) {
  extractedFiles.value = [];

  try {
    const content = await file.arrayBuffer();
    const zipContent = await zipReader.loadAsync(content);

    zipContent.forEach(async (relativePath, zipEntry) => {
      const fileData = await zipEntry.async("text");
      extractedFiles.value.push({ name: relativePath, content: fileData });
    });

    console.log("All files extracted from ZIP:", extractedFiles.value);
  } catch (error) {
    console.error("Error processing ZIP file:", error);
  }
}

watch(accessToken, () => {
  if (accessToken.value) {
    fetchVerifiedSites();
  }
});

onMounted(() => {
  accessToken.value = getQueryParam("access_token");
  if (accessToken.value) {
    fetchVerifiedSites();
  }
});
</script>

<template>
  <div class="container-fluid mt-4">
    <div class="row justify-content-center">
      <div class="text-center">
        <div class="justify-content-center mb-3">
          <button @click="startOAuth" class="btn btn-primary">
            {{ accessToken ? "Change Google Account" : "Sign In to Google" }}
          </button>
          <button
            v-if="accessToken"
            @click="clearProject"
            class="btn btn-danger"
          >
            Clear Project
          </button>
        </div>

        <div class="card p-4 mb-4" id="file-upload-container">
          <h5 class="card-title">Select a Sitebulb ZIP File</h5>
          <input
            id="zip-upload"
            type="file"
            @change="onFileChanged"
            accept=".zip"
            class="form-control"
          />
        </div>
      </div>
    </div>

    <div v-if="extractedFiles.length > 0 && sites.length > 0" class="row">
      <div class="col-md-6">
        <div class="card p-4 mb-4">
          <h5 class="card-title">Sitebulb Data</h5>
          <ul class="list-group">
            <li
              v-for="file in extractedFiles"
              :key="file.name"
              class="list-group-item"
            >
              <strong>{{ file.name }}</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card p-4 mb-4">
          <h5 class="card-title">Domains in SC</h5>
          <ul class="list-group">
            <li
              v-for="site in sites"
              :key="site.siteUrl"
              class="list-group-item"
            >
              {{ site.siteUrl }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-else-if="extractedFiles.length > 0"
      class="row justify-content-center"
    >
      <div class="col-md-6">
        <div class="card p-4 mb-4">
          <h5 class="card-title">Sitebulb Data</h5>
          <ul class="list-group">
            <li
              v-for="file in extractedFiles"
              :key="file.name"
              class="list-group-item"
            >
              <strong>{{ file.name }}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else-if="sites.length > 0" class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 mb-4">
          <h5 class="card-title">Domains in SC</h5>
          <ul class="list-group">
            <li
              v-for="site in sites"
              :key="site.siteUrl"
              class="list-group-item"
            >
              {{ site.siteUrl }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else-if="accessToken" class="row justify-content-center">
      <div class="col-md-6">
        <p class="alert alert-warning">No verified sites found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  margin: 0.5rem;
}
#file-upload-container {
  margin: auto;
  width: 100%;
  max-width: 600px;
}
</style>
