const axios = require("axios");

const fetchDrugData = async () => {
  const res = await axios.get(process.env.SHEETY_DRUG_DATA);
  return res.data.comprehensiveDrugDiseaseDataGeneration || [];
};

const fetchEffectsData = async () => {
  const res = await axios.get(process.env.SHEETY_EFFECTS_DATA);
  return res.data.drugBenefitsAndSideEffectsDatabase || [];
};

module.exports = {
  fetchDrugData,
  fetchEffectsData
};