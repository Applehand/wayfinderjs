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
                <tr v-for="(item, index) in auditTableObject" :key="index">
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
import { ref, onMounted, watch } from "vue";
import { useAppStore } from "../stores/appStore";
import { getIndexCoverage } from "../services/searchConsoleService";
import JSZip from "jszip";
import { useRouter } from "vue-router";
import * as auditTypes from "../interfaces";

const router = useRouter();
const appStore = useAppStore();
const extractedFiles = ref<{ name: string; content: string }[]>([]);
const loading = ref(true);
const gscLoading = ref(false);
const gscData = ref(null);
const zipReader = new JSZip();
const isFormSubmitted = ref(false);
const auditData = ref<auditTypes.AuditData>({
  // Arrays for data collections
  targetUrl404Errors: [], // Target URL 404 errors
  brokenInternalLinks: [], // Broken internal links
  brokenExternalLinks: [], // Broken external links
  searchConsole404Errors: [], // Search Console 404 errors
  searchConsole404ErrorsToAddress: [], // Search Console 404 errors to address
  searchConsoleSoft404Errors: [], // Search Console soft 404 errors
  brokenBacklinks: [], // Broken backlinks (unique)
  pagesWithPoorLCPPerformance: [], // Pages with 'Poor' LCP performance
  pagesWithPoorCLSPerformance: [], // Pages with 'Poor' CLS performance
  pagesWithPoorINPPerformance: [], // Pages with 'Poor' INP performance
  structuredData: [], // Does the site have structured data?
  structuredDataErrors: [], // Does the site have structured data errors?
  manualActions: [], // Does the site have manual actions?
  securityWarnings: [], // Does the site have security warnings inside Google Search Console?
  importantPagesBlockedByRobotsTxt: [], // Are pages blocked by robots meta tag or x robots tag?
  unnecessaryPagesBlockedByRobotsTxt: [], // Does the robots.txt block unnecessary pages?
  internalRedirectLinks: [], // Internal redirects links
  externalRedirectLinks: [], // External redirect links
  redirectChains: [], // Redirect chains
  orphanedPages: [], // Orphaned pages
  missingAltText: [],
  brokenPagesInSitemaps: [], // Broken pages in sitemaps
  redirectedPagesInSitemaps: [], // Redirected pages in sitemaps
  urlsInMultipleSitemaps: [], // URLs in multiple sitemaps
  canonicalizedUrlsInSitemaps: [], // Canonicalized URLs in sitemaps
  noindexPagesInSitemaps: [], // Noindex pages in sitemaps
  pagesWithMixedResources: [], // Pages that load mixed resources
  offsiteDuplicateContent: [],
  onsiteDuplicateContent: [],
  pagesWithMissingMetaTitles: [], // Pages with missing meta titles
  pagesWithDuplicateMetaTitles: [], // Pages with duplicate meta titles
  pagesWithLongMetaTitles: [], // Pages with meta titles > 60 characters
  pagesWithShortMetaTitles: [], // Pages with meta titles < 40 characters
  pagesWithMissingMetaDescriptions: [], // Pages with missing meta descriptions
  pagesWithDuplicateMetaDescriptions: [], // Pages with duplicate meta descriptions
  pagesWithLongMetaDescriptions: [], // Pages with meta descriptions > 160 characters
  pagesWithShortMetaDescriptions: [], // Pages with meta descriptions < 140 characters
  pagesWithMissingH1s: [], // Pages with missing H1s
  pagesWithDuplicateH1s: [], // Pages with duplicate H1s
  pagesWithMultipleH1s: [], // Multiple H1s
  pagesWithContentOpportunities: [], // Number of pages with content opportunities
  xmlSitemap: "", // Does the site have an XML sitemap?
  unnecessaryPagesInSitemap: [], // The sitemap contains unnecessary pages
  internallyLinkedUrlsInSitemaps: [], // Do internally linked URLs match URLs inside the sitemap(s)?

  // String properties for manual checks
  subdomain: "", // www or non-www
  trailingSlash: "", // trailing-slash, no-trailing-slash, or ""
  protocol: "", // https or http
  canonicals: "", // correct, no-canonicals, errors, not-needed
  canonicalErrors: "", // Details for canonical errors
  callsToAction: "", // Does the site have calls to action?
  blockImportantPages: "", // Block important pages
  blockUnimportantPages: "", // Block unimportant pages
  blog: "", // Does the site have a blog?
  blogUpdated: "", // Is the blog updated roughly once a month?
});

console.log("Audit data structure:", JSON.stringify(auditData.value, null, 2));

const auditTableObject = ref([
  { title: "Target URL 404 errors", value: "", source: "SEO Tool" },
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
    title: "The sitemap contains unnecessary pages",
    value: "",
    source: "Manually check",
  },
  {
    title: "Does the site have canonicals?",
    value: "",
    source: "Manually check",
  },
  { title: "Specify Canonical Errors", value: "", source: "Manually check" },
  {
    title: "URL Trailing Slash",
    value: "",
    source: "Manually check",
  },
  { title: "Subdomain Preference", value: "", source: "Manually check" },
  { title: "Protocol", value: "", source: "Manually check" },
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

const auditMapping = {
  targetUrl404Errors: "Target URL 404 errors",
  brokenInternalLinks: "Broken internal links",
  brokenExternalLinks: "Broken external links",
  searchConsole404Errors: "Search Console 404 errors",
  searchConsole404ErrorsToAddress: "Search Console 404 errors to address",
  searchConsoleSoft404Errors: "Search Console soft 404 errors",
  brokenBacklinks: "Broken backlinks (unique)",
  pagesWithPoorLCPPerformance: "Pages with 'Poor' LCP performance",
  pagesWithPoorCLSPerformance: "Pages with 'Poor' CLS performance",
  pagesWithPoorINPPerformance: "Pages with 'Poor' INP performance",
  structuredData: "Does the site have structured data?",
  structuredDataErrors: "Does the site have structured data errors?",
  manualActions: "Does the site have manual actions?",
  securityWarnings:
    "Does the site have security warnings inside Google Search Console?",
  missingAltText: "Missing image alt-text (unique)",
  importantPagesBlockedByRobotsTxt:
    "Are pages blocked by robots meta tag or x robots tag?",
  unnecessaryPagesBlockedByRobotsTxt:
    "Does the robots.txt block unnecessary pages?",
  internalRedirectLinks: "Internal redirects links",
  externalRedirectLinks: "External redirect links",
  redirectChains: "Redirect chains",
  orphanedPages: "Orphaned pages",
  brokenPagesInSitemaps: "Broken pages in sitemaps",
  redirectedPagesInSitemaps: "Redirected pages in sitemaps",
  urlsInMultipleSitemaps: "URLs in multiple sitemaps",
  canonicalizedUrlsInSitemaps: "Canonicalized URLs in sitemaps",
  noindexPagesInSitemaps: "Noindex pages in sitemaps",
  pagesWithMixedResources: "Pages that load mixed resources",
  offsiteDuplicateContent: "Offsite duplicate content %",
  onsiteDuplicateContent: "Onsite duplicate content %",
  pagesWithMissingMetaTitles: "Pages with missing meta titles",
  pagesWithDuplicateMetaTitles: "Pages with duplicate meta titles",
  pagesWithLongMetaTitles: "Pages with meta titles > 60 characters",
  pagesWithShortMetaTitles: "Pages with meta titles < 40 characters",
  pagesWithMissingMetaDescriptions: "Pages with missing meta descriptions",
  pagesWithDuplicateMetaDescriptions: "Pages with duplicate meta descriptions",
  pagesWithLongMetaDescriptions:
    "Pages with meta descriptions > 160 characters",
  pagesWithShortMetaDescriptions:
    "Pages with meta descriptions < 140 characters",
  pagesWithMissingH1s: "Pages with missing H1s",
  pagesWithDuplicateH1s: "Pages with duplicate H1s",
  pagesWithMultipleH1s: "Multiple H1s",
  pagesWithContentOpportunities: "Number of pages with content opportunities",
  xmlSitemap: "Does the site have an XML sitemap?",
  unnecessaryPagesInSitemap: "The sitemap contains unnecessary pages",
  internallyLinkedUrlsInSitemaps:
    "Do internally linked URLs match URLs inside the sitemap(s)?",
  blog: "Does the site have a blog?",
  blogUpdated: "Is the blog updated roughly once a month?",
  callsToAction: "Does the site have calls to action?",
  subdomain: "Subdomain Preference",
  trailingSlash: "URL Trailing Slash",
  protocol: "Protocol",
  canonicals: "Does the site have canonicals?",
  canonicalErrors: "Specify Canonical Errors",
  blockImportantPages: "Does the robots.txt block important pages?",
  blockUnimportantPages: "Does the robots.txt block unnecessary pages?",
};

function updateAuditTableFromData(newAuditData) {
  console.log(
    "updateAuditTableFromData called with:",
    JSON.stringify(newAuditData, null, 2)
  );
  for (const [key, title] of Object.entries(auditMapping)) {
    const auditItem = auditTableObject.value.find(
      (item) => item.title === title
    );
    if (auditItem) {
      console.log(`Updated ${title}: ${auditItem.value}`);
      auditItem.value = newAuditData[key] || ""; // Update value or set to empty string if not found
    } else {
      console.warn(`Missing title in auditTableObject: ${title}`);
    }
  }
  console.log(
    "Updated auditTableObject: ",
    JSON.stringify(auditTableObject.value, null, 2)
  );
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
  xmlSitemap: false,
  blog: false,
  blogUpdated: false,
  callsToAction: false,
  unnecessaryPagesInSitemap: false,
  blockImportantPages: false,
  blockedPages: "",
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
  auditData.value.xmlSitemap = manualChecks.value.xmlSitemap ? "Yes" : "No";
  auditData.value.blog = manualChecks.value.blog ? "Yes" : "No";
  auditData.value.blogUpdated = manualChecks.value.blogUpdated ? "Yes" : "No";
  auditData.value.callsToAction = manualChecks.value.callsToAction
    ? "Yes"
    : "No";
  auditData.value.unnecessaryPagesInSitemap = manualChecks.value
    .unnecessaryPagesInSitemap
    ? "Yes"
    : "No";
  auditData.value.blockImportantPages = manualChecks.value.blockImportantPages
    ? "Yes"
    : "No";
  auditData.value.blockUnimportantPages = manualChecks.value
    .blockUnimportantPages
    ? "Yes"
    : "No";
  auditData.value.subdomain = manualChecks.value.subdomain;
  auditData.value.trailingSlash = manualChecks.value.trailingSlash;
  auditData.value.protocol = manualChecks.value.protocol;
  auditData.value.canonicals = manualChecks.value.canonicals;

  if (manualChecks.value.canonicals === "errors") {
    auditData.value.canonicalErrors =
      manualChecks.value.canonicalErrors || "No details provided.";
  } else {
    auditData.value.canonicalErrors = "N/A";
  }

  console.log("manualChecks: ", JSON.stringify(manualChecks.value, null, 2));
  console.log("auditData: ", JSON.stringify(auditData.value, null, 2));
  isFormSubmitted.value = true;
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

  // Resetting auditData values to empty strings
  for (const key in auditData.value) {
    auditData.value[key] = ""; // Clear out all values in auditData
  }

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

/* General key-item styles */
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

/* Specific styles for each source */

/* SEO Tool - Soft Teal */
.seo-tool {
  background-color: #00bcd4; /* Soft Teal */
}

/* Search Console - Purple */
.search-console {
  background-color: #9c27b0; /* Purple */
}

/* Tech Audit - Orange */
.tech-audit {
  background-color: #ff9800; /* Orange */
}

/* Manually Check - Pink */
.manually-check {
  background-color: #ff3c7d; /* Pink */
}

.default-data-source-color {
  background-color: black;
}

/* Styling for the color-key container */
.color-key {
  display: flex;
  align-items: center;
  gap: 5px;
}

.color-key .key-item {
  flex-shrink: 0;
}

/* Source Indicator Styles */
.source-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  border-radius: 50%;
}

/* Color the dots based on source class */
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
