import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const checkBackend = async () => {
    try {
      setError("");
      setData(null);

      const res = await fetch("/api"); // using Vercel proxy
      const result = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          // Display the rate limit explicit error
          setError(`Rate Limit Exceeded!`);
        } else {
          setError(result.message || "Failed to connect backend");
        }
        setData(result);
      } else {
        setData(result);
      }
    } catch (err) {
      setError("Failed to connect backend");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend → AWS Load Balancer</h1>

      <button onClick={checkBackend} style={{ padding: "10px 20px" }}>
        Check Backend
      </button>

      {error && !data && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "20px" }}>
          {error ? (
             <h2 style={{ color: "red" }}>❌ {error}</h2>
          ) : (
             <h2 style={{ color: "green" }}>✅ Backend Connected</h2>
          )}

          <p><b>Message:</b> {data.message}</p>
          <p><b>Server:</b> {data.server || "N/A"}</p>
          <p><b>Time:</b> {data.time || "N/A"}</p>
          <p><b>Requests handled by this server:</b> {data.requests || "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default App;