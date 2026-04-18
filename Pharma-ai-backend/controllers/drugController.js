const OpenAI = require("openai");
const { fetchDrugData, fetchEffectsData } = require("../services/sheetservice");
const { mapOrganGlow } = require("../utils/organmapper");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Store conversation history for multi-turn chats
const conversationHistory = [];

// ✅ Get all drugs
const getAllDrugs = async (req, res) => {
  try {
    const data = await fetchDrugData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ REAL AI CHAT
const chatWithAI = async (req, res) => {
  try {
    const { drugName, question } = req.body;

    const drugData = await fetchDrugData();

    const drug = drugData.find(
      d => d.drugName?.toLowerCase() === drugName?.toLowerCase()
    );

    if (!drug) {
      return res.json({ reply: "Drug not found." });
    }

    // 🧠 Build context for AI
    const context = `
Drug Name: ${drug.drugName}
Disease: ${drug.disease}
Mechanism: ${drug.mechanism}
Target Protein: ${drug.targetProtein}
Primary Organ: ${drug.primaryOrgan}
Side Effects: ${drug.sideEffect}
AI Hypothesis: ${drug.aiHypothesis}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
  {
    role: "system",
    content: "You are a pharma AI assistant."
  },
  ...conversationHistory,
  {
    role: "user",
    content: question
  }
],

      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
};

// ✅ Search
const searchDrugs = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.json([]);

    const data = await fetchDrugData();

    const filtered = data.filter(d =>
      d.drugName?.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get by name
const getDrugByName = async (req, res) => {
  try {
    const { name } = req.params;

    const data = await fetchDrugData();

    const drug = data.find(
      d => d.drugName?.toLowerCase() === name.toLowerCase()
    );

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    res.json(drug);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ FULL ANALYSIS (CORE)
const getDrugAnalysis = async (req, res) => {
  try {
    const { name } = req.params;

    const drugData = await fetchDrugData();
    const effectsData = await fetchEffectsData();

    const drug = drugData.find(
      d => d.drugName?.toLowerCase() === name.toLowerCase()
    );

    const effects = effectsData.find(
      d => d.drugName?.toLowerCase() === name.toLowerCase()
    );

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    const response = {
      name: drug.drugName,
      disease: drug.disease,

      // 🔥 Shining organ logic
      organImpact: mapOrganGlow(drug.primaryOrgan),

      // 📊 Binding score
      bindingScore: Number(drug.bindingAffinity) || 0,

      // 🧠 AI hypothesis
      hypothesis: drug.aiHypothesis,

      // 🧬 Molecule image
      imageUrl: drug["3dMoleculeStrucuture"],

      // 💊 Effects
      sideEffects: drug.sideEffect,
      benefits: effects?.benefits || []
    };

    res.json(response);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ OCR Scan (simulation)
const scanDrugText = async (req, res) => {
  try {
    const { text } = req.body;

    const data = await fetchDrugData();

    const match = data.find(d =>
      text?.toLowerCase().includes(d.drugName?.toLowerCase())
    );

    res.json({
      detected: match ? match.drugName : null
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Simple Chatbot (fallback)
const simpleChat = async (req, res) => {
  try {
    const { drugName, question } = req.body;

    const drugData = await fetchDrugData();

    const drug = drugData.find(
      d => d.drugName?.toLowerCase() === drugName?.toLowerCase()
    );

    if (!drug) {
      return res.json({ reply: "Drug not found." });
    }

    let reply = "";

    if (question?.toLowerCase().includes("side")) {
      reply = drug.sideEffect || "No side effects data.";
    } 
    else if (question?.toLowerCase().includes("mechanism")) {
      reply = drug.mechanism || drug.aiHypothesis;
    } 
    else {
      reply = "Ask about side effects or mechanism.";
    }

    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDrugs,
  searchDrugs,
  getDrugByName,
  getDrugAnalysis,
  scanDrugText,
  chatWithAI,
  simpleChat
};