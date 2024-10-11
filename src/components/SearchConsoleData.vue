<template>
  <div class="card p-4 mb-4">
    <h5 class="card-title">
      Search Console Data
      <button
        data-bs-toggle="collapse"
        data-bs-target="#search-console-data"
        class="btn btn-link p-0"
      >
        Toggle
      </button>
    </h5>
    <div v-if="gscLoading" class="mt-3">Fetching from Search Console...</div>
    <div id="search-console-data" class="collapse" v-else-if="gscData">
      <pre>{{ gscData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getIndexCoverage } from "../services/searchConsoleService";
import { useAppStore } from "../stores/appStore";

const gscLoading = ref(false);
const gscData = ref<null | string | any>(null);
const appStore = useAppStore();

async function fetchGSCData() {
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
  } catch (error: any) {
    console.error("Error fetching GSC data:", error);
    gscData.value = `Error: ${error.message}`;
  } finally {
    gscLoading.value = false;
  }
}

onMounted(() => {
  fetchGSCData();
});
</script>

<style scoped>
pre {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}
</style>
