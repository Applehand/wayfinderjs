<template>
  <div class="container-fluid mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card p-4 mb-4">
          <h5 class="card-title" v-if="loading">Processing Sitebulb Data...</h5>

          <div v-if="loading">Extracting files from the uploaded ZIP...</div>
          <div v-else>
            <p class="alert alert-info">
              {{ extractedFiles.length }} files extracted from the ZIP.
            </p>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/appStore";
import JSZip from "jszip";

const appStore = useAppStore();
const router = useRouter();
const extractedFiles = ref<{ name: string; content: string }[]>([]);
const loading = ref(true);
const zipReader = new JSZip();

async function extractFiles(file: File) {
  try {
    console.log("Starting file extraction...");
    const content = await file.arrayBuffer();
    const zipContent = await zipReader.loadAsync(content);

    for (const [relativePath, zipEntry] of Object.entries(zipContent.files)) {
      const fileData = await zipEntry.async("text");
      extractedFiles.value.push({ name: relativePath, content: fileData });
      console.log(`Extracted file: ${relativePath}`);
    }

    loading.value = false;
    console.log("All files extracted from ZIP:", extractedFiles.value);
  } catch (error) {
    console.error("Error processing ZIP file:", error);
    loading.value = false;
  }
}

onMounted(() => {
  const selectedFile = appStore.selectedFile;

  if (selectedFile) {
    extractFiles(selectedFile);
  } else {
    alert("No Sitebulb ZIP file found. Redirecting back to the initial view.");
    router.push("/");
  }
});
</script>

<style scoped>
.list-group-item {
  word-wrap: break-word;
}
</style>
