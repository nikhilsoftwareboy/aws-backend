import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkBackend = () => {
    setLoading(true);

    fetch("http://my-load-balancer-1875906113.ap-south-1.elb.amazonaws.com")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setData({ error: "Failed to connect backend" });
        setLoading(false);
      });
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
            <p style={{ color: "red" }}>{data.error}</p>
          ) : (
            <>
              <h2 style={{ color: "green" }}>✅ Backend Connected</h2>
              <p><b>Message:</b> {data.message}</p>
              <p><b>Server:</b> {data.server}</p>
              <p><b>Time:</b> {data.time}</p>
            </>
          )}
        </div>
      )}

    </div>
  );
}

export default App;