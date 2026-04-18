const express = require("express");
const router = express.Router();

const {
  getAllDrugs,
  searchDrugs,
  getDrugByName,
  getDrugAnalysis,
  scanDrugText,
  chatWithAI
} = require("../controllers/drugController");

// Basic routes
router.get("/", getAllDrugs);
router.get("/search", searchDrugs);
router.get("/:name", getDrugByName);
router.get("/:name/analysis", getDrugAnalysis);

// Extra features
router.post("/scan", scanDrugText);
router.post("/chat", chatWithAI);

module.exports = router;