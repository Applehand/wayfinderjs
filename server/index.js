import express from "express";
import { google } from "googleapis";
import cors from "cors";
import "dotenv/config";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:8081" }));

app.get("/auth", (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/indexing",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(url);
});

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided.");

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userInfo = tokens.id_token
      ? JSON.parse(
          Buffer.from(tokens.id_token.split(".")[1], "base64").toString()
        )
      : null;

    res.redirect(
      `http://localhost:8081/?access_token=${tokens.access_token}&email=${userInfo?.email}`
    );
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Authentication failed.");
  }
});

app.get("/api/verified-sites", async (req, res) => {
  try {
    const { access_token } = req.query;
    if (!access_token) return res.status(400).send("Access token required.");

    oauth2Client.setCredentials({ access_token });
    const webmasters = google.webmasters({ version: "v3", auth: oauth2Client });
    const response = await webmasters.sites.list();
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching verified sites:", error);
    res.status(500).send("Error fetching verified sites.");
  }
});

app.get("/api/index-coverage", async (req, res) => {
  try {
    const { access_token, site_url, start_date, end_date } = req.query;
    if (!access_token || !site_url || !start_date || !end_date)
      return res
        .status(400)
        .send("Access token, site URL, start date, and end date required.");

    oauth2Client.setCredentials({ access_token });
    const webmasters = google.webmasters({ version: "v3", auth: oauth2Client });
    const response = await webmasters.searchanalytics.query({
      siteUrl: site_url,
      requestBody: {
        startDate: start_date,
        endDate: end_date,
        dimensions: ["page"],
        rowLimit: 1000,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching index coverage data:", error);
    res.status(500).send("Error fetching index coverage data.");
  }
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
