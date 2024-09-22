import { reactive } from "vue";
import * as auditTypes from '../interfaces';

export const auditData = reactive<auditTypes.AuditData>({
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
  missingAltText: [], // Missing Alt text
  importantPagesBlockedByRobotsTxt: { value: false }, // Default value for the boolean
  unnecessaryPagesBlockedByRobotsTxt: { value: true }, // Default value for the boolean
  internalRedirectLinks: [], // Internal redirects links
  externalRedirectLinks: [], // External redirect links
  redirectChains: [], // Redirect chains
  orphanedPages: [], // Orphaned pages
  brokenPagesInSitemaps: [], // Broken pages in sitemaps
  redirectedPagesInSitemaps: [], // Redirected pages in sitemaps
  urlsInMultipleSitemaps: [], // URLs in multiple sitemaps
  canonicalizedUrlsInSitemaps: [], // Canonicalized URLs in sitemaps
  noindexPagesInSitemaps: [], // Noindex pages in sitemaps
  pagesWithMixedResources: [], // Pages that load mixed resources
  offsiteDuplicateContent: { percentage: 0 }, // Initialize with 0%
  onsiteDuplicateContent: { percentage: 0 }, // Initialize with 0%
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
  xmlSitemaps: [], // Initialize as an empty array
  internallyLinkedUrlsInSitemaps: {value: true}, // Do internally linked URLs match URLs inside the sitemap(s)?
  siteBlog: { url: 'n/a', isActive: false }, // Default initialization
  blogUpdateFrequency: { updatedMonthly: false }, // Default initialization
  preferredSubdomain: { subdomain: 'www' }, // www or non-www
  trailingSlash: {value: "trailing-slash"}, // trailing-slash, no-trailing-slash, or ""
  protocol: {value: "www"}, // https or http
  canonicals: {value: "correct"}, // correct, no-canonicals, errors, not-needed
  canonicalErrors: {location: "n/a"}, // Details for canonical errors
  callsToAction: {value: true}, // Does the site have calls to action?
});
