<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <!-- Audit Data Table -->
      <div class="col-12 mb-4">
        <div class="card p-4">
          <h5 class="card-title">
            Executive Audit Summary
            <button
              class="btn btn-link p-0"
              data-bs-toggle="collapse"
              data-bs-target="#dataTable"
            >
              Toggle
            </button>
          </h5>
          <div id="dataTable" class="collapse">
            <!-- Color Key for Sources -->
            <div class="col-12 mb-2">
              <div class="color-key">
                <span class="key-item seo-tool">SEO Tool</span>
                <span class="key-item search-console">Search Console</span>
                <span class="key-item tech-audit"
                  >Attachments (Sitebulb & other)</span
                >
                <span class="key-item manually-check">Manually Check</span>
              </div>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Analysis Result</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in auditTable" :key="index">
                  <td>
                    <span
                      :class="['source-indicator', getSourceClass(item.source)]"
                    ></span>
                    {{ item.title }}
                  </td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Manual Checks Form -->
      <div class="col-12 mb-4">
        <div v-if="isFormSubmitted" class="alert alert-success mb-3">
          Manual checks form submitted successfully!
        </div>

        <div class="card p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="card-title mb-0">
              Manual Checks
              <button
                class="btn btn-link p-0"
                data-bs-toggle="collapse"
                data-bs-target="#manual-checks-form"
              >
                Toggle
              </button>
            </h5>
            <div>
              <button
                @click="goToPresentation"
                class="btn btn-success me-2"
                :disabled="!isFormSubmitted"
              >
                Generate Presentation
              </button>
              <button
                v-if="isFormSubmitted"
                type="button"
                class="btn btn-warning"
                @click="resetForm"
              >
                Reset Form
              </button>
            </div>
          </div>
          <form
            class="show"
            id="manual-checks-form"
            @submit.prevent="submitManualChecks"
          >
            <div class="row">
              <!-- www vs non-www -->
              <div class="form-group col-md-6 mb-3">
                <label>Subdomain Preference</label>
                <select v-model="manualChecks.subdomain" class="form-control">
                  <option value="www">www</option>
                  <option value="non-www">non-www</option>
                </select>
              </div>

              <!-- Trailing Slash vs Non-Trailing Slash -->
              <div class="form-group col-md-6 mb-3">
                <label>URL Trailing Slash</label>
                <select
                  v-model="manualChecks.trailingSlash"
                  class="form-control"
                >
                  <option value="trailing-slash">Trailing Slash</option>
                  <option value="no-trailing-slash">No Trailing Slash</option>
                  <option value="">Loads Both</option>
                </select>
              </div>

              <!-- Protocol -->
              <div class="form-group col-md-6 mb-3">
                <label>Protocol</label>
                <select v-model="manualChecks.protocol" class="form-control">
                  <option value="https">HTTPS</option>
                  <option value="http">HTTP</option>
                </select>
              </div>

              <!-- Canonicals -->
              <div class="form-group col-md-6 mb-3">
                <label>Canonical Tags</label>
                <select v-model="manualChecks.canonicals" class="form-control">
                  <option value="correct">Correct</option>
                  <option value="no-canonicals">No Canonicals</option>
                  <option value="errors">Errors in Canonicals</option>
                  <option value="not-needed">Does Not Need Canonicals</option>
                </select>
                <div v-if="manualChecks.canonicals === 'errors'" class="mt-2">
                  <label>Specify Canonical Errors</label>
                  <textarea
                    v-model="manualChecks.canonicalErrors"
                    class="form-control"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Sitemap & Robots -->
            <div class="form-group mb-3">
              <label>Does the site have an XML sitemap?</label>
              <input type="checkbox" v-model="manualChecks.xmlSitemap" />
            </div>

            <div class="form-group mb-3">
              <label>Does the robots.txt block important pages?</label>
              <input
                type="checkbox"
                v-model="manualChecks.blockImportantPages"
              />
            </div>

            <div class="form-group mb-3">
              <label
                >Does the robots.txt block unnecessary pages (e.g., /cart,
                /my-account, /checkout)?</label
              >
              <input
                type="checkbox"
                v-model="manualChecks.blockUnimportantPages"
              />
            </div>

            <!-- Blog -->
            <div class="form-group mb-3">
              <label>Does the site have a blog?</label>
              <input type="checkbox" v-model="manualChecks.blog" />
              <div v-if="manualChecks.blog">
                <label>Is the blog updated roughly once a month?</label>
                <input type="checkbox" v-model="manualChecks.blogUpdated" />
              </div>
            </div>

            <!-- Calls to Action -->
            <div class="form-group mb-3">
              <label>Does the site have calls to action?</label>
              <input type="checkbox" v-model="manualChecks.callsToAction" />
            </div>

            <!-- Internal Links Match Sitemap Links -->
            <div class="form-group mb-3">
              <label
                >Do the internal links match those found in the sitemap?</label
              >
              <input
                type="checkbox"
                v-model="manualChecks.internallyLinkedUrlsInSitemaps"
              />
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <!-- Left Column: Sitebulb Data -->
      <div class="col-md-4">
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
      </div>

      <!-- Right Column: GSC Data -->
      <div v-if="appStore.accessToken" class="col-md-8">
        <div class="card p-4 mb-4">
          <h5 class="card-title">Search Console Data</h5>
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
import { ref, onMounted, watch } from "vue";
import { useAppStore } from "../stores/appStore";
import { getIndexCoverage } from "../services/searchConsoleService";
import JSZip from "jszip";
import { useRouter } from "vue-router";
import * as auditTypes from "../interfaces";
import { auditData } from "../data/auditData";
import { auditMapping } from "../data/auditMapping";
import { auditTable } from "../data/auditTable";

const router = useRouter();
const appStore = useAppStore();
const extractedFiles = ref<{ name: string; content: string }[]>([]);
const loading = ref(true);
const gscLoading = ref(false);
const gscData = ref(null);
const zipReader = new JSZip();
const isFormSubmitted = ref(false);

console.log("Audit data structure:", JSON.stringify(auditData.value, null, 2));

function updateAuditTableFromData(newAuditData) {
  const updatedAuditTable = [...auditTable]; // Create a new reference for the reactive array
  for (const [key, title] of Object.entries(auditMapping)) {
    const auditItemIndex = updatedAuditTable.findIndex(
      (item) => item.title === title
    );
    if (auditItemIndex !== -1) {
      // Update the item in the copied array
      updatedAuditTable[auditItemIndex] = {
        ...updatedAuditTable[auditItemIndex],
        value: newAuditData[key] || "",
      };
      console.log(
        `Updated ${title}: ${updatedAuditTable[auditItemIndex].value}`
      );
    } else {
      console.warn(`Missing title in auditTable: ${title}`);
    }
  }
  // Replace the reactive array with the updated one
  auditTable.splice(0, auditTable.length, ...updatedAuditTable);
  console.log("Updated auditTable: ", JSON.stringify(auditTable, null, 2));
}

// Watch for changes in auditData and update the table accordingly
watch(
  auditData,
  (newAuditData) => {
    updateAuditTableFromData(newAuditData);
  },
  { deep: true } // Deep watching for nested objects
);

async function processSitebulbData(files) {
  // Extract the required information from the files
  const target404Errors = extract404Errors(files);
  auditData.value.targetUrl404Errors = target404Errors;
}

const manualChecks = ref({
  subdomain: "www",
  trailingSlash: "trailing-slash",
  protocol: "https",
  canonicals: "correct",
  canonicalErrors: "",
  xmlSitemap: true,
  blog: false,
  blogUpdated: false,
  callsToAction: false,
  blockImportantPages: false,
});

function getSourceClass(source) {
  switch (source) {
    case "SEO Tool":
      return "seo-tool";
    case "Search Console":
      return "search-console";
    case "Tech audit attachments":
      return "tech-audit";
    case "Manually check":
      return "manually-check";
    default:
      return "default-data-source-color";
  }
}

function submitManualChecks() {
  isFormSubmitted.value = true;

  // Update array values
  auditData.xmlSitemaps = manualChecks.value.xmlSitemap ? [{}] : [];

  // Update nested boolean values directly
  auditData.internallyLinkedUrlsInSitemaps.value =
    manualChecks.value.internallyLinkedUrlsInSitemaps;
  auditData.callsToAction.value = manualChecks.value.callsToAction;
  auditData.importantPagesBlockedByRobotsTxt.value =
    manualChecks.value.blockImportantPages;
  auditData.unnecessaryPagesBlockedByRobotsTxt.value =
    manualChecks.value.blockUnimportantPages;

  // Update nested objects with simple values
  auditData.preferredSubdomain.subdomain = manualChecks.value.subdomain;
  auditData.trailingSlash.value = manualChecks.value.trailingSlash;
  auditData.protocol.value = manualChecks.value.protocol;
  auditData.canonicals.value = manualChecks.value.canonicals;

  // Canonical errors update logic
  if (manualChecks.value.canonicals === "errors") {
    auditData.canonicalErrors.location =
      manualChecks.value.canonicalErrors || "No details provided.";
  } else {
    auditData.canonicalErrors.location = "N/A";
  }

  // Update site blog status
  auditData.siteBlog.url = manualChecks.value.blog.url || "";
  auditData.siteBlog.isActive = manualChecks.value.blog.isActive || false;

  // Update blog update frequency
  auditData.blogUpdateFrequency.updatedMonthly =
    manualChecks.value.blogUpdated || false;

  // Update unnecessary pages in sitemap
  auditData.unnecessaryPagesInSitemap = manualChecks.value
    .unnecessaryPagesInSitemap
    ? []
    : [];
}

function resetForm() {
  auditData.preferredSubdomain.subdomain = "www";
  auditData.trailingSlash.value = "trailing-slash";
  auditData.protocol.value = "https";
  auditData.canonicals.value = "correct";
  auditData.canonicalErrors.location = "";
  auditData.siteBlog = { url: "", isActive: false };
  auditData.blogUpdateFrequency.updatedMonthly = false;
  auditData.xmlSitemaps = [];
  auditData.importantPagesBlockedByRobotsTxt.value = false;
  auditData.unnecessaryPagesBlockedByRobotsTxt.value = false;
  auditData.internallyLinkedUrlsInSitemaps.value = true;
  auditData.callsToAction.value = false;

  Object.assign(manualChecks.value, {
    subdomain: "www",
    trailingSlash: "trailing-slash",
    protocol: "https",
    canonicals: "correct",
    canonicalErrors: "",
    xmlSitemap: false,
    blog: false,
    blogUpdated: false,
    callsToAction: false,
    unnecessaryPagesInSitemap: false,
    blockImportantPages: false,
    blockUnimportantPages: false,
  });

  updateAuditTableFromData(auditData);

  isFormSubmitted.value = false;
}

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

function goToPresentation() {
  router.push("/presentation");
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
.form-group select {
  max-width: 300px;
}
.form-group.col-md-6 {
  padding-right: 15px;
}
textarea {
  max-width: 100%;
  resize: vertical;
}
.list-group-item {
  word-wrap: break-word;
}
.table {
  margin-bottom: 20px;
}
.table th,
.table td {
  vertical-align: middle;
}

.key-item {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  cursor: default;
}

.seo-tool {
  background-color: #00bcd4;
}

.search-console {
  background-color: #9c27b0;
}

.tech-audit {
  background-color: #ff9800;
}

.manually-check {
  background-color: #ff3c7d;
}

.default-data-source-color {
  background-color: black;
}

.color-key {
  display: flex;
  align-items: center;
  gap: 5px;
}

.color-key .key-item {
  flex-shrink: 0;
}

.source-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  border-radius: 50%;
}

.source-indicator.seo-tool {
  background-color: #00bcd4;
}

.source-indicator.search-console {
  background-color: #9c27b0;
}

.source-indicator.tech-audit {
  background-color: #ff9800;
}

.source-indicator.manually-check {
  background-color: #ff3c7d;
}

.source-indicator.default-data-source-color {
  background-color: black;
}
</style>
