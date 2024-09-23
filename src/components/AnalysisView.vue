<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <!-- Audit Data Table -->
      <div class="col-12 mb-4">
        <AuditDataTable />
      </div>
      <!-- Manual Checks Form -->
      <div class="col-12 mb-4">
        <ManualChecksForm />
      </div>
      <!-- Left Column: Sitebulb Data -->
      <div class="col-md-4">
        <SitebulbData />
      </div>
      <!-- Right Column: GSC Data -->
      <div v-if="appStore.accessToken" class="col-md-8">
        <SearchConsoleData />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/appStore";
import AuditDataTable from "./AuditDataTable.vue";
import ManualChecksForm from "./ManualChecksForm.vue";
import SitebulbData from "./SitebulbData.vue";
import SearchConsoleData from "./SearchConsoleData.vue";

const appStore = useAppStore();
const router = useRouter();

onMounted(() => {
  if (!appStore.selectedFile) {
    console.warn("No Sitebulb ZIP file found. Redirecting to initial view.");
    router.replace("/");
  }
});
</script>
