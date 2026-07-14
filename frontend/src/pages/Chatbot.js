import React, { useState } from "react";
import "./pages.css";

function Chatbot() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = () => {
    let reply = " Try aloe vera + oil massage for healthy hair";

    setChat([...chat, { msg, reply }]);
    setMsg("");
  };

  return (
    <div className="page">
      <h2>🤖 AI Beauty Chatbot</h2>

      <div className="chat-box">
        {chat.map((c,i)=>(
          <div key={i}>
            <p><b>You:</b> {c.msg}</p>
            <p><b>AI:</b> {c.reply}</p>
          </div>
        ))}
      </div>

      <input value={msg} onChange={(e)=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default Chatbot;