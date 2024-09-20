import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});