<template>
  <div class="card p-4 mb-4">
    <h5 class="card-title">
      Sitebulb Data
      <button
        class="btn btn-link p-0"
        data-bs-toggle="collapse"
        data-bs-target="#sitebulb-data"
      >
        Toggle
      </button>
    </h5>
    <div v-if="loading">Extracting files from the uploaded ZIP...</div>
    <div v-else>
      <p class="alert alert-info">
        {{ extractedFiles.length }} files extracted from the ZIP.
      </p>
      <ul id="sitebulb-data" class="list-group collapse">
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
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAppStore } from "../stores/appStore"; // Import the app store
import JSZip from "jszip";

const appStore = useAppStore(); // Access the app store
const extractedFiles = ref<{ name: string; content: string }[]>([]);
const loading = ref(true);
const zipReader = new JSZip();

async function extractFiles(file: File) {
  try {
    loading.value = true; // Start the loading indicator
    const content = await file.arrayBuffer();
    const zipContent = await zipReader.loadAsync(content);
    extractedFiles.value = []; // Reset previous data
    for (const [relativePath, zipEntry] of Object.entries(zipContent.files)) {
      const fileData = await zipEntry.async("text");
      extractedFiles.value.push({ name: relativePath, content: fileData });
    }
    loading.value = false; // Stop the loading indicator when extraction is complete
  } catch (error) {
    console.error("Error processing ZIP file:", error);
    loading.value = false;
  }
}

onMounted(() => {
  if (appStore.selectedFile) {
    extractFiles(appStore.selectedFile); // Trigger file extraction on mount
  }
});
</script>

<style scoped>
.list-group-item {
  word-wrap: break-word;
}
</style>
