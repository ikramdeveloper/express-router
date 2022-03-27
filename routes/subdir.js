const path = require("path");
const express = require("express");
const router = express.Router();

router.get("^/$|index(.html)?", (req, resp) => {
  resp.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/test(.html)?", (req, resp) => {
  resp.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

// router.all("*", (req, resp) => {
//   resp.sendFile(path.join(__dirname, "..", "views", "404.html"));
// });

module.exports = router;
