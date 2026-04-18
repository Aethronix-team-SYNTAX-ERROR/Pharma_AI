import React, { useEffect, useState } from "react";
import axios from "axios";
import HumanBody from "./HumanBody";
import "./App.css";
import ChatBox from "./ChatBox";


const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function App() {
  const [drugs, setDrugs] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/drugs`)
      .then(res => setDrugs(res.data));
  }, []);

  const selectDrug = async (name) => {
    const res = await axios.get(`${API}/api/drugs/${name}/analysis`);
    setAnalysis(res.data);
  };

  return (
    <div className="app">

      <div className="sidebar">
        {drugs.map((d, i) => (
          <div key={i} onClick={() => selectDrug(d.name)}>
            {d.name}
          </div>
        ))}
      </div>

      <div className="main">
        <h1>{analysis?.name || "Select Drug"}</h1>

        <HumanBody analysis={analysis} />

        {analysis && (
          <>
            <p>{analysis.disease}</p>
            <p>{analysis.bindingScore}</p>
            <p>{analysis.hypothesis}</p>
        <ChatBox drug={analysis?.name} />
          </>
        )}
      </div>

    </div>
  );
}
    </div>
  );
}
