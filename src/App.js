import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkBackend = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api");

      const result = await res.json();

      if (!res.ok) {
        // Handle rate limit error
        setData({
          error: result.message,
          server: result.server,
          time: result.time
        });
      } else {
        setData(result);
      }

    } catch (err) {
      setData({ error: "Failed to connect backend" });
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h1>Frontend → AWS Load Balancer</h1>

      <button
        onClick={checkBackend}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Check Backend
      </button>

      {loading && <p style={{ marginTop: "20px" }}>Connecting...</p>}

      {data && (
        <div style={{ marginTop: "30px" }}>

          {data.error ? (
            <>
              <h2 style={{ color: "red" }}>❌ {data.error}</h2>
              <p><b>Server:</b> {data.server}</p>
              <p><b>Time:</b> {data.time}</p>
            </>
          ) : (
            <>
              <h2 style={{ color: "green" }}>✅ Backend Connected</h2>
              <p><b>Message:</b> {data.message}</p>
              <p><b>Server:</b> {data.server}</p>
              <p><b>Time:</b> {data.time}</p>
              <p><b>Requests handled:</b> {data.requests}</p>
            </>
          )}

        </div>
      )}

    </div>
  );
}

export default App;