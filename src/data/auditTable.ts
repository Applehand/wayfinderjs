import { computed } from "vue";
import { auditData } from "../data/auditData";

export const auditTable = computed(() => [
  {
    title: "Target URL 404 errors",
    value: auditData.targetUrl404Errors,
    source: "SEO Tool",
  },
  {
    title: "Search Console 404 errors",
    value: auditData.searchConsole404Errors,
    source: "Search Console",
  },
  {
    title: "Search Console 404 errors to address",
    value: auditData.searchConsole404ErrorsToAddress,
    source: "Search Console",
  },
  {
    title: "Search Console soft 404 errors",
    value: auditData.searchConsoleSoft404Errors,
    source: "Search Console",
  },
  {
    title: "Pages with 'Poor' LCP performance",
    value: auditData.pagesWithPoorLCPPerformance,
    source: "Search Console",
  },
  {
    title: "Pages with 'Poor' CLS performance",
    value: auditData.pagesWithPoorCLSPerformance,
    source: "Search Console",
  },
  {
    title: "Pages with 'Poor' INP performance",
    value: auditData.pagesWithPoorINPPerformance,
    source: "Search Console",
  },
  {
    title: "Does the site have structured data?",
    value: auditData.structuredData,
    source: "Search Console",
  },
  {
    title: "Does the site have structured data errors?",
    value: auditData.structuredDataErrors ,
    source: "Search Console",
  },
  {
    title: "Does the site have manual actions?",
    value: auditData.manualActions,
    source: "Search Console",
  },
  {
    title: "Does the site have security warnings inside Google Search Console?",
    value: auditData.securityWarnings,
    source: "Search Console",
  },
  {
    title: "Missing image alt-text (unique)",
    value: auditData.missingAltText,
    source: "Tech audit attachments",
  },
  {
    title: "Broken internal links",
    value: auditData.brokenInternalLinks,
    source: "Tech audit attachments",
  },
  {
    title: "Broken external links",
    value: auditData.brokenExternalLinks,
    source: "Tech audit attachments",
  },
  {
    title: "Broken backlinks (unique)",
    value: auditData.brokenBacklinks,
    source: "Tech audit attachments",
  },
  {
    title: "Internal redirects links",
    value: auditData.internalRedirectLinks,
    source: "Tech audit attachments",
  },
  {
    title: "External redirect links",
    value: auditData.externalRedirectLinks,
    source: "Tech audit attachments",
  },
  {
    title: "Redirect chains",
    value: auditData.redirectChains,
    source: "Tech audit attachments",
  },
  {
    title: "Orphaned pages",
    value: auditData.orphanedPages,
    source: "Tech audit attachments",
  },
  {
    title: "Broken pages in sitemaps",
    value: auditData.brokenPagesInSitemaps,
    source: "Tech audit attachments",
  },
  {
    title: "Redirected pages in sitemaps",
    value: auditData.redirectedPagesInSitemaps,
    source: "Tech audit attachments",
  },
  {
    title: "URLs in multiple sitemaps",
    value: auditData.urlsInMultipleSitemaps,
    source: "Tech audit attachments",
  },
  {
    title: "Canonicalized URLs in sitemaps",
    value: auditData.canonicalizedUrlsInSitemaps,
    source: "Tech audit attachments",
  },
  {
    title: "Noindex pages in sitemaps",
    value: auditData.noindexPagesInSitemaps,
    source: "Tech audit attachments",
  },
  {
    title: "Pages that load mixed resources",
    value: auditData.pagesWithMixedResources,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with missing meta titles",
    value: auditData.pagesWithMissingMetaTitles,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with duplicate meta titles",
    value: auditData.pagesWithDuplicateMetaTitles,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta titles > 60 characters",
    value: auditData.pagesWithLongMetaTitles,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta titles < 40 characters",
    value: auditData.pagesWithShortMetaTitles,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with missing meta descriptions",
    value: auditData.pagesWithMissingMetaDescriptions,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with duplicate meta descriptions",
    value: auditData.pagesWithDuplicateMetaDescriptions,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta descriptions > 160 characters",
    value: auditData.pagesWithLongMetaDescriptions,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with meta descriptions < 140 characters",
    value: auditData.pagesWithShortMetaDescriptions,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with missing H1s",
    value: auditData.pagesWithMissingH1s,
    source: "Tech audit attachments",
  },
  {
    title: "Pages with duplicate H1s",
    value: auditData.pagesWithDuplicateH1s,
    source: "Tech audit attachments",
  },
  {
    title: "Multiple H1s",
    value: auditData.pagesWithMultipleH1s,
    source: "Tech audit attachments",
  },
  {
    title: "Number of pages with content opportunities",
    value: auditData.pagesWithContentOpportunities,
    source: "Tech audit attachments",
  },
  {
    title: "Offsite duplicate content %",
    value: auditData.offsiteDuplicateContent?.percentage,
    source: "Copyscape",
  },
  {
    title: "Onsite duplicate content %",
    value: auditData.onsiteDuplicateContent?.percentage,
    source: "Siteliner",
  },
  {
    title: "Does the site have calls to action?",
    value: auditData.callsToAction?.value,
    source: "Manually check",
  },
  {
    title: "Does the site have canonicals?",
    value: auditData.canonicals?.value,
    source: "Manually check",
  },
  {
    title: "Specify Canonical Errors",
    value: auditData.canonicalErrors?.location,
    source: "Manually check",
  },
  {
    title: "URL Trailing Slash",
    value: auditData.trailingSlash?.value,
    source: "Manually check",
  },
  {
    title: "Subdomain Preference",
    value: auditData.preferredSubdomain?.subdomain,
    source: "Manually check",
  },
  {
    title: "Protocol",
    value: auditData.protocol?.value,
    source: "Manually check",
  },
  {
    title: "Do internally linked URLs match URLs inside the sitemap(s)?",
    value: auditData.internallyLinkedUrlsInSitemaps?.value,
    source: "Manually check",
  },
  {
    title: "Does the robots.txt block important pages?",
    value: auditData.importantPagesBlockedByRobotsTxt?.value,
    source: "Manually check",
  },
  {
    title: "Does the robots.txt block unnecessary pages?",
    value: auditData.unnecessaryPagesBlockedByRobotsTxt?.value,
    source: "Manually check",
  },
  {
    title: "Does the site have an XML sitemap?",
    value: (auditData.xmlSitemaps?.length ?? 0) > 0 ? "Yes" : "No",
    source: "Manually check",
  },
  {
    title: "Does the site have a blog?",
    value: auditData.siteBlog?.isActive ? "Yes" : "No",
    source: "Manually check",
  },
  {
    title: "Is the blog updated roughly once a month?",
    value: auditData.blogUpdateFrequency?.updatedMonthly ? "Yes" : "No",
    source: "Manually check",
  },
]);
