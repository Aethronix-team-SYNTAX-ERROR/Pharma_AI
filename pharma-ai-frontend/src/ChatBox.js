import { useState } from "react";
import axios from "axios";
import "./chat.css";

const API = process.env.REACT_APP_API_URL;

export default function ChatBox({ drug }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    const res = await axios.post(`${API}/api/chat`, {
      message: msg,
      drug
    });

    setChat([...chat, { q: msg, a: res.data.reply }]);
    setMsg("");
  };

  return (
    <div className="chatBox">
      <div className="chatMessages">
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.q}</p>
            <p><b>AI:</b> {c.a}</p>
          </div>
        ))}
      </div>

      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
