import axios from "axios";

const EXPRESS_SERVER_URL = "https://wayfinderserver.applehand.dev";

/**
 * Get list of verified properties (domains) for the authenticated user.
 */
export const getVerifiedSites = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${EXPRESS_SERVER_URL}/api/verified-sites`,
      {
        params: { access_token: accessToken },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching verified sites:", error);
    throw error;
  }
};

/**
 * Get Index Coverage Data for a specific site.
 */
export const getIndexCoverage = async (
  accessToken: string,
  siteUrl: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axios.get(
      `${EXPRESS_SERVER_URL}/api/index-coverage`,
      {
        params: {
          access_token: accessToken,
          site_url: siteUrl,
          start_date: startDate,
          end_date: endDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching index coverage data:", error);
    throw error;
  }
};
