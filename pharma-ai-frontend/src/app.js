import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import HumanBody from "./HumanBody";
import "./App.css";

export default function App() {
  const [drugs, setDrugs] = useState([]);
  const [selected, setSelected] = useState("");
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/drugs")
      .then(res => setDrugs(res.data))
      .catch(console.log);
  }, []);

  const selectDrug = async (name) => {
    setSelected(name);
    const res = await axios.get(
      `http://localhost:5000/api/drugs/${name}/analysis`
    );
    setAnalysis(res.data);
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <div className="sidebar glass">
        <h2>Pharma AI</h2>
        {drugs.map((d, i) => (
          <div
            key={i}
            className={`drug ${selected === d.name ? "activeDrug" : ""}`}
            onClick={() => selectDrug(d.name)}
          >
            {d.name}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="main">

        {/* Title */}
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {analysis?.name || "Select a Drug"}
        </motion.h1>

        {/* ✅ HUMAN BODY COMPONENT */}
        <HumanBody analysis={analysis} />

        {/* Data Cards */}
        {analysis && (
          <div className="cards">

            <div className="card glass">
              <h3>Disease</h3>
              <p>{analysis.disease}</p>
            </div>

            <div className="card glass">
              <h3>Binding Score</h3>
              <div className="circle">
                {analysis.bindingScore}
              </div>
            </div>

            <div className="card glass">
              <h3>AI Insight</h3>
              <p className="typewriter">{analysis.hypothesis}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}