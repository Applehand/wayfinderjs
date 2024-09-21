import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    accessToken: null as string | null,
    selectedFile: null as File | null,
    extractedFiles: [] as { name: string; content: string }[],
    selectedDomain: null as string | null,
  }),
  actions: {
    setAccessToken(token: string | null) {
      this.accessToken = token;
    },
    setSelectedFile(file: File | null) {
      this.selectedFile = file;
    },
    setExtractedFiles(files: { name: string; content: string }[]) {
      this.extractedFiles = files;
    },
    setSelectedDomain(domain: string | null) {
      this.selectedDomain = domain;
    },
    clearProject() {
      this.accessToken = null;
      this.selectedFile = null;
      this.extractedFiles = [];
      this.selectedDomain = null;
    }
  },
});
