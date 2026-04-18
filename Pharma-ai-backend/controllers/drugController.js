const { getSheetData } = require("../services/sheetService");
const mapOrgans = require("../utils/organMapper");

exports.getAllDrugs = async (req, res) => {
  try {
    const data = await getSheetData();

    const drugs = data.map(d => ({
      name: d["DRUG NAME"] || ""
    }));

    res.json(drugs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDrugAnalysis = async (req, res) => {
  try {
    const data = await getSheetData();

    const drug = data.find(d =>
      (d["DRUG NAME"] || "").toLowerCase() === req.params.name.toLowerCase()
    );

    if (!drug) return res.status(404).json({ error: "Not found" });

    res.json({
      name: drug["DRUG NAME"],
      disease: drug["DISEASE"],
      bindingScore: drug["BINDING AFFINITY"],
      hypothesis: drug["AI HYPOTHESIS"],
      organImpact: mapOrgans(drug["PRIMARY ORGAN"])
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
