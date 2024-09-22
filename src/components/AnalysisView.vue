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
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Analysis Result</th>
                  <th>Where To Locate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in auditObject" :key="index">
                  <td>{{ item.title }}</td>
                  <td>{{ item.value }}</td>
                  <td>{{ item.source }}</td>
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
          <form class="show" id="manual-checks-form" @submit.prevent="submitManualChecks">
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

            <!-- Site Structure -->
            <div class="form-group mb-3">
              <label
                >Unnecessary pages in sitemap (e.g., /cart, /my-account,
                /checkout)?</label
              >
              <input
                type="checkbox"
                v-model="manualChecks.unnecessaryPagesInSitemap"
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
const isFormSubmitted = ref(false);

const auditObject = ref([
  { title: "Target URL 404 errors", value: "", source: "SEO Tool" },
  {
    title: "Is the sitemap submitted to Search Console?",
    value: "",
    source: "Search Console",
  },
  {
    title: "Is the site blocked from indexing?",
    value: "",
    source: "Search Console",
  },
  { title: "Search Console 404 errors", value: "", source: "Search Console" },
  {
    title: "Search Console 404 errors to address",
    value: "",
    source: "Search Console",
  },
  {
    title: "Search Console soft 404 errors",
    value: "",
    source: "Search Console",
  },
  {
    title: "Pages with 'Poor' LCP performance",
    value: "",
    source: "Search Console",
  },
  {
    title: "Pages with 'Poor' CLS performance",
    value: "",
    source: "Search Console",
  },
  {
    title: "Pages with 'Poor' INP performance",
    value: "",
    source: "Search Console",
  },
  {
    title: "Does the site have structured data?",
    value: "",
    source: "Search Console",
  },
  {
    title: "Does the site have structured data errors?",
    value: "",
    source: "Search Console",
  },
  {
    title: "Does the site have manual actions?",
    value: "",
    source: "Search Console",
  },
  {
    title: "Does the site have security warnings inside Google Search Console?",
    value: "",
    source: "Search Console",
  },
  {
    title: "Are pages blocked by robots meta tag or x robots tag?",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Missing image alt-text (unique)",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Broken internal links",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Broken external links",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Broken backlinks (unique)",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Internal redirects links",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "External redirect links",
    value: "",
    source: "Tech audit attachments",
  },
  { title: "Redirect chains", value: "", source: "Tech audit attachments" },
  { title: "Orphaned pages", value: "", source: "Tech audit attachments" },
  {
    title: "Broken pages in sitemaps",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Redirected pages in sitemaps",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "URLs in multiple sitemaps",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Canonicalized URLs in sitemaps",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Noindex pages in sitemaps",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages that load mixed resources",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with missing meta titles",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with duplicate meta titles",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta titles > 60 characters",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta titles < 40 characters",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with missing meta descriptions",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with duplicate meta descriptions",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta descriptions > 160 characters",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta descriptions < 140 characters",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with missing H1s",
    value: "",
    source: "Tech audit attachments",
  },
  {
    title: "Pages with duplicate H1s",
    value: "",
    source: "Tech audit attachments",
  },
  { title: "Multiple H1s", value: "", source: "Tech audit attachments" },
  {
    title: "Number of pages with content opportunities",
    value: "",
    source: "Tech audit attachments",
  },
  { title: "Offsite duplicate content %", value: "", source: "Copyscape" },
  { title: "Onsite duplicate content %", value: "", source: "Siteliner" },
  {
    title: "Does the site have calls to action?",
    value: "",
    source: "Manually check",
  },
  {
    title:
      "The sitemap contains unnecessary pages (e.g., /cart, /my-account, /checkout)",
    value: "",
    source: "Manually check",
  },
  {
    title: "Does the site have canonicals?",
    value: "",
    source: "Manually check",
  },
  { title: "Are the canonicals correct?", value: "", source: "Manually check" },
  {
    title: "Does the site load with a trailing backslash?",
    value: "",
    source: "Manually check",
  },
  {
    title: "Does the site load without trailing backslash?",
    value: "",
    source: "Manually check",
  },
  { title: "Does the site load www?", value: "", source: "Manually check" },
  {
    title: "Does the site load without www (naked)?",
    value: "",
    source: "Manually check",
  },
  { title: "Does the site load HTTP?", value: "", source: "Manually check" },
  { title: "Does the site load HTTPS?", value: "", source: "Manually check" },
  {
    title: "Do internally linked URLs match URLs inside the sitemap(s)?",
    value: "",
    source: "Manually check",
  },
  {
    title: "Does the robots.txt block important pages?",
    value: "",
    source: "Manually check",
  },
  {
    title: "Does the robots.txt block unnecessary pages?",
    value: "",
    source: "Manually check",
  },
  {
    title: "Does the site have an XML sitemap?",
    value: "",
    source: "Manually check",
  },
  { title: "Does the site have a blog?", value: "", source: "Manually check" },
  {
    title: "Is the blog updated roughly once a month?",
    value: "",
    source: "Manually check",
  },
]);

function updateAuditObject(key, value) {
  const item = auditObject.value.find((obj) => obj.title === key);
  if (item) {
    item.value = value;
  } else {
    console.log(`${item} not found, unable to update audit object.`);
  }
}

async function processSitebulbData(files) {
  // Extract the required information from the files
  const target404Errors = extract404Errors(files);
  updateAuditObject("Target URL 404 errors", target404Errors);
}

const manualChecks = ref({
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
  blockedPages: "",
});

function submitManualChecks() {
  updateAuditObject(
    "Does the site have an XML sitemap?",
    manualChecks.value.xmlSitemap ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the site have a blog?",
    manualChecks.value.blog ? "Yes" : "No"
  );
  updateAuditObject(
    "Is the blog updated roughly once a month?",
    manualChecks.value.blogUpdated ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the site have calls to action?",
    manualChecks.value.callsToAction ? "Yes" : "No"
  );
  updateAuditObject(
    "The sitemap contains unnecessary pages (e.g., /cart, /my-account, /checkout)",
    manualChecks.value.unnecessaryPagesInSitemap ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the robots.txt block important pages?",
    manualChecks.value.blockImportantPages ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the robots.txt block unnecessary pages?",
    manualChecks.value.blockUnimportantPages ? "Yes" : "No"
  );

  // Update Canonicalization and Protocol choices
  updateAuditObject(
    "Does the site load www?",
    manualChecks.value.subdomain === "www" ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the site load without www (naked)?",
    manualChecks.value.subdomain === "non-www" ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the site load with a trailing backslash?",
    manualChecks.value.trailingSlash === "trailing-slash" ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the site load without trailing backslash?",
    manualChecks.value.trailingSlash === "no-trailing-slash" ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the site load HTTPS?",
    manualChecks.value.protocol === "https" ? "Yes" : "No"
  );
  updateAuditObject(
    "Does the site load HTTP?",
    manualChecks.value.protocol === "http" ? "Yes" : "No"
  );

  // Update canonical tags
  updateAuditObject(
    "Does the site have canonicals?",
    manualChecks.value.canonicals !== "no-canonicals" ? "Yes" : "No"
  );
  updateAuditObject(
    "Are the canonicals correct?",
    manualChecks.value.canonicals === "correct" ? "Yes" : "No"
  );

  if (manualChecks.value.canonicals === "errors") {
    updateAuditObject(
      "Specify Canonical Errors",
      manualChecks.value.canonicalErrors || "No details provided."
    );
  } else {
    updateAuditObject("Specify Canonical Errors", "N/A");
  }

  isFormSubmitted.value = true;
  console.log("Manual Checks Submitted:", manualChecks.value);
}

function resetForm() {
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
    blockedPages: "",
  });
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
</style>
