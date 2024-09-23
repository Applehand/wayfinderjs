<template>
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
          <span class="key-item tech-audit">Attachments (Sitebulb & other)</span>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auditTable } from '../data/auditTable';

function getSourceClass(source: string) {
  switch (source) {
    case 'SEO Tool':
      return 'seo-tool';
    case 'Search Console':
      return 'search-console';
    case 'Tech audit attachments':
      return 'tech-audit';
    case 'Manually check':
      return 'manually-check';
    default:
      return 'default-data-source-color';
  }
}
</script>

<style scoped>
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
.seo-tool { background-color: #00bcd4; }
.search-console { background-color: #9c27b0; }
.tech-audit { background-color: #ff9800; }
.manually-check { background-color: #ff3c7d; }
.default-data-source-color { background-color: black; }

.source-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  border-radius: 50%;
}
</style>
