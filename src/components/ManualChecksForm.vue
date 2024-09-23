<template>
  <div>
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
          <button @click="goToPresentation" class="btn btn-success me-2" :disabled="!isFormSubmitted">
            Generate Presentation
          </button>
          <button v-if="isFormSubmitted" type="button" class="btn btn-warning" @click="resetForm">
            Reset Form
          </button>
        </div>
      </div>
      <form class="show" id="manual-checks-form" @submit.prevent="submitManualChecks">
        <!-- Form Content -->
        <div class="row">
          <!-- Subdomain Preference -->
          <div class="form-group col-md-6 mb-3">
            <label>Subdomain Preference</label>
            <select v-model="manualChecks.subdomain" class="form-control">
              <option value="www">www</option>
              <option value="non-www">non-www</option>
            </select>
          </div>
          <!-- Trailing Slash -->
          <div class="form-group col-md-6 mb-3">
            <label>URL Trailing Slash</label>
            <select v-model="manualChecks.trailingSlash" class="form-control">
              <option value="trailing-slash">Trailing Slash</option>
              <option value="no-trailing-slash">No Trailing Slash</option>
              <option value="loads-both-trailing-slash">Loads Both</option>
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
              <textarea v-model="manualChecks.canonicalErrors" class="form-control"></textarea>
            </div>
          </div>
        </div>

        <!-- Additional Checkboxes -->
        <div class="form-group mb-3">
          <label>Does the site have an XML sitemap?</label>
          <input type="checkbox" v-model="manualChecks.xmlSitemap" />
        </div>
        <div class="form-group mb-3">
          <label>Does the robots.txt block important pages?</label>
          <input type="checkbox" v-model="manualChecks.blockImportantPages" />
        </div>
        <div class="form-group mb-3">
          <label>Does the robots.txt block unnecessary pages?</label>
          <input type="checkbox" v-model="manualChecks.blockUnimportantPages" />
        </div>
        <div class="form-group mb-3">
          <label>Does the site have a blog?</label>
          <input type="checkbox" v-model="manualChecks.blog" />
          <div v-if="manualChecks.blog">
            <label>Is the blog updated roughly once a month?</label>
            <input type="checkbox" v-model="manualChecks.blogUpdated" />
          </div>
        </div>
        <div class="form-group mb-3">
          <label>Does the site have calls to action?</label>
          <input type="checkbox" v-model="manualChecks.callsToAction" />
        </div>
        <div class="form-group mb-3">
          <label>Do the internal links match those found in the sitemap?</label>
          <input type="checkbox" v-model="manualChecks.internallyLinkedUrlsInSitemaps" />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { auditData } from '../data/auditData';
import { useRouter } from 'vue-router';

const router = useRouter();
const isFormSubmitted = ref(false);
const manualChecks = ref({
  subdomain: 'www',
  trailingSlash: 'trailing-slash',
  protocol: 'https',
  canonicals: 'correct',
  canonicalErrors: 'n/a',
  xmlSitemap: false,
  blog: false,
  blogUpdated: false,
  callsToAction: false,
  blockImportantPages: false,
  blockUnimportantPages: false,
  internallyLinkedUrlsInSitemaps: false,
});

function submitManualChecks() {
  isFormSubmitted.value = true;

  // Update auditData
  auditData.preferredSubdomain.subdomain = manualChecks.value.subdomain;
  auditData.trailingSlash.value = manualChecks.value.trailingSlash;
  auditData.protocol.value = manualChecks.value.protocol;
  auditData.canonicals.value = manualChecks.value.canonicals;
  auditData.canonicalErrors.location = manualChecks.value.canonicalErrors || '';
  auditData.xmlSitemaps = manualChecks.value.xmlSitemap ? [{}] : [];
  auditData.internallyLinkedUrlsInSitemaps.value = manualChecks.value.internallyLinkedUrlsInSitemaps;
  auditData.callsToAction.value = manualChecks.value.callsToAction;
  auditData.importantPagesBlockedByRobotsTxt.value = manualChecks.value.blockImportantPages;
  auditData.unnecessaryPagesBlockedByRobotsTxt.value = manualChecks.value.blockUnimportantPages;
  auditData.siteBlog.isActive = manualChecks.value.blog;
  auditData.blogUpdateFrequency.updatedMonthly = manualChecks.value.blogUpdated;
}

function resetForm() {
  Object.assign(manualChecks.value, {
    subdomain: 'www',
    trailingSlash: 'trailing-slash',
    protocol: 'https',
    canonicals: 'correct',
    canonicalErrors: '',
    xmlSitemap: false,
    blog: false,
    blogUpdated: false,
    callsToAction: false,
    blockImportantPages: false,
    blockUnimportantPages: false,
    internallyLinkedUrlsInSitemaps: false,
  });

  auditData.preferredSubdomain.subdomain = 'www';
  auditData.trailingSlash.value = 'trailing-slash';
  auditData.protocol.value = 'https';
  auditData.canonicals.value = 'correct';
  auditData.canonicalErrors.location = '';
  auditData.xmlSitemaps = [];
  auditData.siteBlog.isActive = false;
  auditData.blogUpdateFrequency.updatedMonthly = false;
  auditData.callsToAction.value = false;
  auditData.importantPagesBlockedByRobotsTxt.value = false;
  auditData.unnecessaryPagesBlockedByRobotsTxt.value = false;
  auditData.internallyLinkedUrlsInSitemaps.value = false;

  isFormSubmitted.value = false;
}

function goToPresentation() {
  router.push('/presentation');
}
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
</style>
