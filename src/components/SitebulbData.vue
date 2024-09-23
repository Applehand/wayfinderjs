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
      <!-- Sitebulb Data View -->
      <div class="accordion mt-4" id="sitebulb-accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingBrokenLinks">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseBrokenLinks"
              aria-expanded="false"
              aria-controls="collapseBrokenLinks"
            >
              Broken Internal Links
            </button>
          </h2>
          <div
            id="collapseBrokenLinks"
            class="accordion-collapse collapse"
            aria-labelledby="headingBrokenLinks"
            data-bs-parent="#sitebulb-accordion"
          >
            <div class="accordion-body">
              <ul class="broken-links-list">
                <li
                  v-for="(link, index) in sitebulbData.brokenInternalLinks"
                  :key="index"
                  class="broken-link-item"
                >
                  <strong class="broken-link-url">{{ link.brokenLink }}</strong>
                  <div class="broken-link-details">
                    <div class="parent-page">
                      Parent Page:
                      <a :href="link.parentPage" target="_blank" class="link">{{
                        link.parentPage
                      }}</a>
                    </div>
                    <div class="status-code">Status: {{ link.statusCode }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Additional sections for other data types can be added here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAppStore } from "../stores/appStore";
import JSZip from "jszip";
import Papa from "papaparse";

import { auditData } from "../data/auditData";
import { BrokenInternalLinks, AuditData } from "../data/interfaces";

const sitebulbData = ref({
  brokenInternalLinks: [] as BrokenInternalLinks[],
});

const appStore = useAppStore();
const extractedFiles = ref<{ name: string; content: string }[]>([]);
const loading = ref(true);
const zipReader = new JSZip();

// Function to extract files from ZIP
async function extractFiles(file: File) {
  try {
    loading.value = true;
    const content = await file.arrayBuffer();
    const zipContent = await zipReader.loadAsync(content);
    extractedFiles.value = [];
    for (const [relativePath, zipEntry] of Object.entries(zipContent.files)) {
      const fileData = await zipEntry.async("string");
      console.log(`Extracted file: ${relativePath}`);
      extractedFiles.value.push({ name: relativePath, content: fileData });
    }
    loading.value = false;
    processExtractedFiles();
  } catch (error) {
    console.error("Error processing ZIP file:", error);
    loading.value = false;
  }
}

// Function to process extracted files
function processExtractedFiles() {
  for (const file of extractedFiles.value) {
    if (file.name.includes("broken_internal_urls")) {
      parseCSV(file.content, "brokenInternalLinks");
    }
  }
}

// Function to parse CSV using Papa Parse and update auditData
function parseCSV(csvContent: string, targetField: string) {
  try {
    console.log(`Parsing CSV for: ${targetField}`);
    console.log(`CSV Content Preview: ${csvContent.substring(0, 200)}`);

    Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log("Parsed Results:", results);

        if (targetField === "brokenInternalLinks") {
          auditData.brokenInternalLinks = results.data
            .map((row: any) => ({
              parentPage: row["First Parent URL"] || "",
              brokenLink: row["URL"] || "",
              statusCode: parseInt(row["HTTP Status Code"]) || 0,
            }))
            .filter(
              (item: BrokenInternalLinks) => item.parentPage && item.brokenLink
            );

          sitebulbData.value.brokenInternalLinks =
            auditData.brokenInternalLinks;

          console.log(
            `Extracted Broken Internal Links:`,
            sitebulbData.value.brokenInternalLinks
          );
        }
      },
      error: function (error) {
        console.error("Error parsing CSV with Papa Parse:", error);
      },
    });
  } catch (error) {
    console.error(`Error parsing CSV for ${targetField}:`, error);
  }
}

// Mount component and start file extraction
onMounted(() => {
  if (appStore.selectedFile) {
    extractFiles(appStore.selectedFile);
  }
});
</script>

<style scoped>
.list-group-item {
  word-wrap: break-word;
}

/* Styling for Bootstrap accordion and broken links */
.accordion-button {
  font-size: 1rem;
}

.broken-links-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.broken-link-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.broken-link-url {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.broken-link-details {
  margin-top: 4px;
}

.parent-page,
.status-code {
  display: block;
  margin-top: 4px;
  color: #555;
}

.link {
  text-decoration: none;
  color: #007bff;
}

.link:hover {
  text-decoration: underline;
}

.section-title {
  margin-top: 16px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}
</style>
