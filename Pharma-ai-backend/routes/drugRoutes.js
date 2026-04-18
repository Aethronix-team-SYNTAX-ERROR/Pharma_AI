const express = require("express");
const router = express.Router();

const {
  getAllDrugs,
  getDrugAnalysis
} = require("../controllers/drugController");

router.get("/", getAllDrugs);
router.get("/:name/analysis", getDrugAnalysis);

module.exports = router;
