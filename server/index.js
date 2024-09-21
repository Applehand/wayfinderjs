import express from "express";
import { google } from "googleapis";
import cors from "cors";
import "dotenv/config";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.get("/auth", (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
  });
  res.redirect(url);
});

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("No code provided.");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.redirect(
      `http://localhost:5173/?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`
    );
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Authentication failed.");
  }
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
