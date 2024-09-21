<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <!-- Left Column: Sitebulb Data -->
      <div class="col-md-4">
        <div class="card p-4 mb-4">
          <h5 class="card-title">Sitebulb Data</h5>
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

      <!-- Right Column: GSC Data -->
      <div v-if="appStore.accessToken" class="col-md-8">
        <div class="card p-4 mb-4">
          <h5 class="card-title">Test Search Console API</h5>
          <button @click="testGSC" class="btn btn-primary mb-3">
            Fetch GSC Data
          </button>
          <div v-if="gscLoading" class="mt-3">
            Fetching from Search Console...
          </div>
          <div v-else-if="gscData">
            <pre>{{ gscData }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAppStore } from "../stores/appStore";
import { getIndexCoverage } from "../services/searchConsoleService";
import JSZip from "jszip";
import { useRouter } from "vue-router";

const router = useRouter();
const appStore = useAppStore();
const extractedFiles = ref<{ name: string; content: string }[]>([]);
const loading = ref(true);
const gscLoading = ref(false);
const gscData = ref(null);
const zipReader = new JSZip();

async function extractFiles(file: File) {
  try {
    const content = await file.arrayBuffer();
    const zipContent = await zipReader.loadAsync(content);
    for (const [relativePath, zipEntry] of Object.entries(zipContent.files)) {
      const fileData = await zipEntry.async("text");
      extractedFiles.value.push({ name: relativePath, content: fileData });
    }
    loading.value = false;
  } catch (error) {
    console.error("Error processing ZIP file:", error);
    loading.value = false;
  }
}

async function testGSC() {
  if (!appStore.accessToken || !appStore.selectedDomain) {
    alert("Access token or selected domain missing.");
    return;
  }

  gscLoading.value = true;
  try {
    const data = await getIndexCoverage(
      appStore.accessToken,
      appStore.selectedDomain,
      "2023-01-01",
      "2023-12-31"
    );
    gscData.value = data;
  } catch (error) {
    console.error("Error fetching GSC data:", error);
    gscData.value = `Error: ${error.message}`;
  } finally {
    gscLoading.value = false;
  }
}

onMounted(() => {
  const selectedFile = appStore.selectedFile;
  if (selectedFile) {
    extractFiles(selectedFile);
  } else {
    console.log(
      "No Sitebulb ZIP file found. Redirecting back to the initial view."
    );
    router.replace("/").catch((err) => {
      console.error("Navigation error:", err);
    });
  }
});
</script>

<style scoped>
.list-group-item {
  word-wrap: break-word;
}
</style>
