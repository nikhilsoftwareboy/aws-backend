import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg("Error connecting backend"));
  }, []);

  return (
    <h1 style={{ textAlign: "center", marginTop: "50px" }}>
      Backend says: {msg}
    </h1>
  );
}

export default App;