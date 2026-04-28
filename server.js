const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const NAV_URL = "https://portal.amfiindia.com/spages/NAVAll.txt";

app.use(express.static(__dirname));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/nav", async (req, res) => {
  try {
    const response = await fetch(NAV_URL);

    if (!response.ok) {
      return res.status(502).json({
        error: "Failed to fetch NAV data from AMFI"
      });
    }

    const text = await response.text();
    return res.type("text/plain").send(text);
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error while fetching NAV data"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
