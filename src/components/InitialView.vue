<template>
  <div class="container-fluid mt-4">
    <div class="row justify-content-center">
      <div class="text-center">
        <div class="justify-content-center mb-3">
          <button @click="startOAuth" class="btn btn-primary">
            {{
              appStore.accessToken
                ? "Change Google Account"
                : "Sign In to Google"
            }}
          </button>
          <button
            :disabled="!appStore.accessToken && !appStore.selectedFile"
            @click="clearProject"
            class="btn btn-danger"
          >
            Clear Project
          </button>

          <button
            @click="goToAnalysisView"
            class="btn btn-success"
            :disabled="!appStore.selectedFile"
          >
            Analyze!
          </button>
        </div>

        <div v-if="userEmail" class="alert alert-info">
          Signed in as: <strong>{{ userEmail }}</strong>
        </div>

        <div
          v-if="appStore.accessToken && sites.length > 0"
          class="row justify-content-center mt-2"
        >
          <div class="col-md-6">
            <div class="card p-4 mb-4">
              <h5 class="card-title">Select a Target Domain</h5>
              <ul class="list-group">
                <li
                  v-for="site in sites"
                  :key="site.siteUrl"
                  class="list-group-item"
                  @click="appStore.setSelectedDomain(site.siteUrl)"
                >
                  <input
                    type="radio"
                    name="domain"
                    :value="site.siteUrl"
                    v-model="selectedDomain"
                  />
                  {{ site.siteUrl }}
                </li>
              </ul>
            </div>
          </div>
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

        <div v-if="appStore.selectedFile" class="alert alert-success">
          Sitebulb ZIP file successfully uploaded:
          {{ appStore.selectedFile.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/appStore";
import { getVerifiedSites } from "../services/searchConsoleService";

const appStore = useAppStore();
const router = useRouter();
const sites = ref([]);
const selectedDomain = ref<string | null>(null);
const userEmail = ref<string | null>(null);

function startOAuth() {
  window.location.href = "http://localhost:3000/auth";
}


function clearProject() {
  appStore.clearProject();
  const url = new URL(window.location.href);
  url.searchParams.delete("access_token");
  window.location.href = "/";
}

async function fetchVerifiedSites() {
  if (appStore.accessToken) {
    try {
      const data = await getVerifiedSites(appStore.accessToken);
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
      appStore.setSelectedFile(file);
    } else {
      console.error("Only ZIP files are allowed.");
    }
  }
}

function goToAnalysisView() {
  if (!appStore.selectedFile) {
    alert("Please upload a Sitebulb ZIP file to proceed.");
    return;
  }

  if (!appStore.accessToken) {
    const confirmProceed = window.confirm(
      "You are not logged into Google. Do you want to proceed without Google data?"
    );
    if (!confirmProceed) return;
  } else if (appStore.accessToken && !appStore.selectedDomain) {
    const proceed = window.confirm(
      "You have not selected a Google Search Console domain. Do you want to proceed without Google data?"
    );
    if (!proceed) return;
  }

  router.push({
    path: "/analysis",
  });
}

watch(appStore.accessToken, () => {
  if (appStore.accessToken) {
    fetchVerifiedSites();
  }
});

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlAccessToken = urlParams.get("access_token");
  const urlEmail = urlParams.get("email");

  if (!appStore.accessToken && urlAccessToken) {
    appStore.setAccessToken(urlAccessToken);
  }

  if (urlEmail) {
    userEmail.value = urlEmail;
  }

  if (appStore.accessToken) {
    fetchVerifiedSites();
  }
});
</script>

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
