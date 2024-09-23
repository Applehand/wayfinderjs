export interface TargetUrl404Errors {
  url: string; // The URL that returns a 404 error
  statusCode: number; // The HTTP status code, e.g., 404
}

export interface PreferredSubdomain {
  subdomain: string;
}

export interface TrailingSlash {
  value: string;
}

export interface Protocol {
  value: string;
}

export interface Canonicals {
  value: string;
}

export interface CanonicalErrors {
  location: string;
}

export interface CallsToAction {
  value: boolean
}

// Interface for Broken Internal Links
export interface BrokenInternalLinks {
  parentPage: string; // The URL that contains the broken link
  brokenLink: string; // The broken internal URL
  statusCode: number; // The HTTP status code, e.g., 404
}

// Interface for Broken External Links
export interface BrokenExternalLinks {
  parentPage: string; // The URL that contains the broken external link
  brokenLink: string; // The broken external URL
  statusCode: number; // The HTTP status code, e.g., 404
  anchorText?: string; // Optional anchor text for the broken link
}

export interface SearchConsole404Errors {
  url: string; // The URL returning a 404 error
  statusCode: number; // The HTTP status code, e.g., 404
  dateDetected: string; // Date the error was detected
}

export interface SearchConsole404ErrorsToAddress {
  url: string; // The URL needing action
  statusCode: number; // The HTTP status code, e.g., 404
  recommendation: string; // Suggested fix or action
}

export interface SearchConsoleSoft404Errors {
  url: string; // The URL identified as a soft 404
  dateDetected: string; // Date the error was detected
  recommendation: string; // Suggested fix or action
}

// Interface for Broken Backlinks (unique)
export interface BrokenBacklinks {
  brokenLink: string; // The broken backlink URL
  statusCode: number; // The HTTP status code, e.g., 404
  referrerDomain?: string; // Optional domain of the referring page
}

export interface PagesWithPoorLCPPerformance {
  url: string; // The URL with poor LCP
  lcpValue: number; // LCP value in seconds
}

export interface PagesWithPoorCLSPerformance {
  url: string; // The URL with poor CLS
  clsValue: number; // CLS value
}

export interface PagesWithPoorINPPerformance {
  url: string; // The URL with poor INP
  inpValue: number; // INP value in milliseconds
  recommendation: string; // Suggested fix or action
}

export interface StructuredData {
  url: string; // The URL with structured data
  structuredDataType: string; // Type of structured data, e.g., "Product", "Article"
  isValid: boolean; // Whether the structured data is valid
}

export interface StructuredDataErrors {
  url: string; // The URL with structured data errors
  errorType: string; // Type of error, e.g., "Missing field", "Invalid value"
  recommendation: string; // Suggested fix or action
}

export interface ManualActions {
  url: string; // The URL with manual actions
  actionType: string; // Type of manual action, e.g., "Unnatural links", "Thin content"
  dateDetected: string; // Date the manual action was detected
}

export interface SecurityWarnings {
  url: string; // The URL with a security warning
  warningType: string; // Type of warning, e.g., "Malware", "Phishing"
  dateDetected: string; // Date the warning was detected
  recommendation: string; // Suggested fix or action
}

// Interface for Internal Redirect Links
export interface InternalRedirectLinks {
  parentPage: string; // The original URL that redirects
  targetUrl: string; // The final URL after the redirect
  statusCode: string; // Type of redirect, e.g., "301", "302"
}

// Interface for External Redirect Links
export interface ExternalRedirectLinks {
  sourceUrl: string; // The original external URL that redirects
  targetUrl: string; // The final URL after the redirect
  statusCode: string; // Type of redirect, e.g., "301", "302"
}

// Interface for Redirect Chains
export interface RedirectChains {
  startUrl: string; // The initial URL in the redirect chain
  finalUrl: string; // The final URL after the chain
  chainLength: number; // The number of redirects in the chain
  urlsInChain: string[]; // URLs involved in the redirect chain
}

export interface XMLSitemap {
  sitemapUrl: string; // The URL of the XML sitemap
  isValid: boolean; // Whether the sitemap is valid
}

// Interface for Orphaned Pages
export interface OrphanedPages {
  url: string; // The orphaned page URL
}

export interface UnnecessaryPagesInSitemap {
  url: string; // The URL of the unnecessary page
  sitemap: string; // Sitemap containing the unnecessary page
  reason: string; // Reason why the page is unnecessary
}

export interface InternallyLinkedUrlsInSitemaps {
  value: boolean;
}

export interface missingAltText {
  url: string;
  parentPage?: string;
}

// Interface for Broken Pages in Sitemaps
export interface BrokenPagesInSitemaps {
  url: string; // The broken page URL found in the sitemap
  sitemap: string; // The sitemap file where the URL was found
  statusCode: number; // The HTTP status code, e.g., 404
}

// Interface for Redirected Pages in Sitemaps
export interface RedirectedPagesInSitemaps {
  url: string; // The redirected page URL found in the sitemap
  finalUrl: string; // The final URL after the redirect
  sitemap: string; // The sitemap file where the URL was found
}

// Interface for URLs in Multiple Sitemaps
export interface UrlsInMultipleSitemaps {
  url: string; // The URL that is listed in multiple sitemaps
  sitemaps: string[]; // List of sitemaps containing the URL
}

// Interface for Canonicalized URLs in Sitemaps
export interface CanonicalizedUrlsInSitemaps {
  url: string; // The URL listed in the sitemap
  canonicalUrl: string; // The canonical URL for the page
  sitemap: string; // The sitemap file where the URL was found
}

// Interface for Noindex Pages in Sitemaps
export interface NoindexPagesInSitemaps {
  url: string; // The noindex page URL found in the sitemap
  sitemap: string; // The sitemap file where the URL was found
}

export interface ImportantPagesBlockedByRobotsTxt {
  value: boolean; // Whether important pages are blocked or not
}

export interface UnnecessaryPagesBlockedByRobotsTxt {
  value: boolean; // Whether unnecessary pages are blocked or not
}

export interface SiteBlog {
  url: string; // The URL of the blog
  isActive: boolean; // Whether the blog is active or not
}

export interface BlogUpdateFrequency {
  updatedMonthly: boolean; // Update frequency, e.g., "Monthly", "Weekly"
}

// Interface for Pages that Load Mixed Resources
export interface PagesWithMixedResources {
  url: string; // The page URL loading mixed resources
  resourceType: string; // Type of mixed resource, e.g., "CSS", "JS", "JPG"
  resourceUrl: string; // The URL of the mixed resource
}

export interface offsiteDuplicateContent {
  percentage: number;
}

export interface onsiteDuplicateContent {
  percentage: number;
}

// Interface for Pages with Missing Meta Titles
export interface PagesWithMissingMetaTitles {
  url: string; // The page URL missing a meta title
}

// Interface for Pages with Duplicate Meta Titles
export interface PagesWithDuplicateMetaTitles {
  url: string; // The page URL with duplicate meta title
  duplicateTitle: string; // The duplicate meta title text
}

// Interface for Pages with Meta Titles > 60 Characters
export interface PagesWithLongMetaTitles {
  url: string; // The page URL with a long meta title
  metaTitle: string; // The meta title text
  length: number; // The length of the meta title
}

// Interface for Pages with Meta Titles < 40 Characters
export interface PagesWithShortMetaTitles {
  url: string; // The page URL with a short meta title
  metaTitle: string; // The meta title text
  length: number; // The length of the meta title
}

// Interface for Pages with Missing Meta Descriptions
export interface PagesWithMissingMetaDescriptions {
  url: string; // The page URL missing a meta description
}

// Interface for Pages with Duplicate Meta Descriptions
export interface PagesWithDuplicateMetaDescriptions {
  url: string; // The page URL with duplicate meta descriptions
  duplicateDescription: string; // The duplicate meta description text
}

// Interface for Pages with Meta Descriptions > 160 Characters
export interface PagesWithLongMetaDescriptions {
  url: string; // The page URL with a long meta description
  metaDescription: string; // The meta description text
  length: number; // The length of the meta description
}

// Interface for Pages with Meta Descriptions < 140 Characters
export interface PagesWithShortMetaDescriptions {
  url: string; // The page URL with a short meta description
  metaDescription: string; // The meta description text
  length: number; // The length of the meta description
}

// Interface for Pages with Missing H1s
export interface PagesWithMissingH1s {
  url: string; // The page URL missing an H1 tag
}

// Interface for Pages with Duplicate H1s
export interface PagesWithDuplicateH1s {
  url: string; // The page URL with duplicate H1 tags
  duplicateH1Text: string; // The duplicate H1 text
}

// Interface for Pages with Multiple H1s
export interface PagesWithMultipleH1s {
  url: string; // The page URL with multiple H1 tags
  h1Elements: string[]; // Array of all H1 elements on the page
}

// Interface for Pages with Content Opportunities
export interface PagesWithContentOpportunities {
  url: string; // The page URL with content opportunities
  recommendation: string; // Suggested content improvement
}

export interface AuditData {
  targetUrl404Errors?: TargetUrl404Errors[]; // Target URL 404 errors
  preferredSubdomain?: PreferredSubdomain;
  trailingSlash?: TrailingSlash;
  protocol?: Protocol;
  canonicals?: Canonicals;
  canonicalErrors?: CanonicalErrors;
  callsToAction?: CallsToAction;
  brokenInternalLinks?: BrokenInternalLinks[]; // Broken internal links
  brokenExternalLinks?: BrokenExternalLinks[]; // Broken external links
  searchConsole404Errors?: SearchConsole404Errors[]; // Search Console 404 errors
  searchConsole404ErrorsToAddress?: SearchConsole404ErrorsToAddress[]; // Search Console 404 errors to address
  searchConsoleSoft404Errors?: SearchConsoleSoft404Errors[]; // Search Console soft 404 errors
  brokenBacklinks?: BrokenBacklinks[]; // Broken backlinks (unique)
  pagesWithPoorLCPPerformance?: PagesWithPoorLCPPerformance[]; // Pages with 'Poor' LCP performance
  pagesWithPoorCLSPerformance?: PagesWithPoorCLSPerformance[]; // Pages with 'Poor' CLS performance
  pagesWithPoorINPPerformance?: PagesWithPoorINPPerformance[]; // Pages with 'Poor' INP performance
  structuredData?: StructuredData[]; // Does the site have structured data?
  structuredDataErrors?: StructuredDataErrors[]; // Does the site have structured data errors?
  manualActions?: ManualActions[]; // Does the site have manual actions?
  securityWarnings?: SecurityWarnings[]; // Does the site have security warnings inside Google Search Console?
  missingAltText?: missingAltText[];
  importantPagesBlockedByRobotsTxt?: ImportantPagesBlockedByRobotsTxt; // Are pages blocked by robots meta tag or x robots tag?
  unnecessaryPagesBlockedByRobotsTxt?: UnnecessaryPagesBlockedByRobotsTxt; // Does the robots.txt block unneessary pages?
  internalRedirectLinks?: InternalRedirectLinks[]; // Internal redirects links
  externalRedirectLinks?: ExternalRedirectLinks[]; // External redirect links
  redirectChains?: RedirectChains[]; // Redirect chains
  orphanedPages?: OrphanedPages[]; // Orphaned pages
  brokenPagesInSitemaps?: BrokenPagesInSitemaps[]; // Broken pages in sitemaps
  redirectedPagesInSitemaps?: RedirectedPagesInSitemaps[]; // Redirected pages in sitemaps
  urlsInMultipleSitemaps?: UrlsInMultipleSitemaps[]; // URLs in multiple sitemaps
  canonicalizedUrlsInSitemaps?: CanonicalizedUrlsInSitemaps[]; // Canonicalized URLs in sitemaps
  noindexPagesInSitemaps?: NoindexPagesInSitemaps[]; // Noindex pages in sitemaps
  pagesWithMixedResources?: PagesWithMixedResources[]; // Pages that load mixed resources
  offsiteDuplicateContent?: offsiteDuplicateContent;
  onsiteDuplicateContent?: onsiteDuplicateContent;
  pagesWithMissingMetaTitles?: PagesWithMissingMetaTitles[]; // Pages with missing meta titles
  pagesWithDuplicateMetaTitles?: PagesWithDuplicateMetaTitles[]; // Pages with duplicate meta titles
  pagesWithLongMetaTitles?: PagesWithLongMetaTitles[]; // Pages with meta titles > 60 characters
  pagesWithShortMetaTitles?: PagesWithShortMetaTitles[]; // Pages with meta titles < 40 characters
  pagesWithMissingMetaDescriptions?: PagesWithMissingMetaDescriptions[]; // Pages with missing meta descriptions
  pagesWithDuplicateMetaDescriptions?: PagesWithDuplicateMetaDescriptions[]; // Pages with duplicate meta descriptions
  pagesWithLongMetaDescriptions?: PagesWithLongMetaDescriptions[]; // Pages with meta descriptions > 160 characters
  pagesWithShortMetaDescriptions?: PagesWithShortMetaDescriptions[]; // Pages with meta descriptions < 140 characters
  pagesWithMissingH1s?: PagesWithMissingH1s[]; // Pages with missing H1s
  pagesWithDuplicateH1s?: PagesWithDuplicateH1s[]; // Pages with duplicate H1s
  pagesWithMultipleH1s?: PagesWithMultipleH1s[]; // Multiple H1s
  pagesWithContentOpportunities?: PagesWithContentOpportunities[]; // Number of pages with content opportunities
  xmlSitemaps?: XMLSitemap[]; // Does the site have an XML sitemap?
  internallyLinkedUrlsInSitemaps?: InternallyLinkedUrlsInSitemaps; // Do internally linked URLs match URLs inside the sitemap(s)?
  siteBlog?: SiteBlog; // Does the site have a blog?
  blogUpdateFrequency?: BlogUpdateFrequency; // Is the blog updated roughly once a month?
}
