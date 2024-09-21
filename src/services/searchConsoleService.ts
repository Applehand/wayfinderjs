import axios from "axios";

const API_BASE_URL = "https://www.googleapis.com/webmasters/v3/sites";

/**
 * Get list of verified properties (domains) for the authenticated user.
 * @param {string} accessToken - The access token obtained from OAuth2 authentication.
 * @returns {Promise<any>} - A promise that resolves to the list of sites.
 */
export const getVerifiedSites = async (accessToken: string) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching verified sites:", error);
    throw error;
  }
};
