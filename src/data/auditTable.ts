import { reactive } from "vue";

export const auditTable = reactive([
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