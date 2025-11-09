import React, { useState } from "react";

function App() {
  const [ASIN, setASIN] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const demoASINs = ["B08N5WRWNW", "B07V2FR28Y", "B0CW9JS8HK"];

  const styles = {
    container: {
      minHeight: "80vh",
      width: "100%",
      backgroundColor: "#f0f7ff",
      padding: "20px",
      fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: "auto",
    },
    maxWidth: { maxWidth: "1400px", margin: "0 auto" },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1f2937",
      margin: 0,
    },
    historyBtn: {
      padding: "10px 20px",
      backgroundColor: "#4b5563",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    formContainer: {
      backgroundColor: "white",
      padding: "32px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "32px",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "8px",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "1rem",
      boxSizing: "border-box",
      marginBottom: "16px",
    },
    submitBtn: {
      width: "200px",
      padding: "12px 16px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500",
      transition: "background-color 0.3s",
      display: "block",
      margin: "0 auto",
    },
    error: { marginTop: "16px", color: "#dc2626", fontWeight: "500" },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "80px 0",
    },
    spinner: {
      width: "64px",
      height: "64px",
      border: "4px solid #e5e7eb",
      borderTop: "4px solid #2563eb",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    loadingText: { marginTop: "16px", color: "#4b5563", fontWeight: "500" },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "24px",
    },
    card: {
      border: "2px solid #d1d5db",
      borderRadius: "12px",
      padding: "24px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
    },
    cardTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#2563eb",
      marginBottom: "16px",
      marginTop: 0,
    },
    sectionTitle: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "4px",
      marginTop: "16px",
    },
    sectionContent: {
      fontSize: "0.875rem",
      color: "#1f2937",
      margin: "0 0 16px 0",
      whiteSpace: "pre-wrap",
      lineHeight: "1.6",
    },
    bulletList: { listStyle: "none", padding: 0, margin: 0 },
    bulletItem: {
      fontSize: "0.875rem",
      color: "#4b5563",
      paddingLeft: "16px",
      borderLeft: "2px solid #60a5fa",
      marginBottom: "8px",
      lineHeight: "1.5",
    },
    price: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#16a34a",
      margin: "8px 0",
    },
    demoContainer: { marginTop: "8px" },
    demoMessage: {
      fontSize: "0.875rem",
      color: "#6b7280",
      marginBottom: "8px",
    },
  };

  const keyframes = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  const handleSubmit = async (e, customASIN = null) => {
    if (e) e.preventDefault();
    const finalASIN = customASIN || ASIN;

    if (!finalASIN.trim()) {
      setError("Please enter an ASIN");
      return;
    }

    setASIN(finalASIN);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/amazon-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ASIN: finalASIN }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
        const storedHistory = JSON.parse(
          localStorage.getItem("asinHistory") || "[]"
        );
        storedHistory.unshift({
          ...data,
          asin: finalASIN,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem("asinHistory", JSON.stringify(storedHistory));
      } else {
        setError(data.message || "Failed to fetch product data");
      }
    } catch (err) {
      setError("Network or server error: " + err.message);
    }

    setLoading(false);
  };

  const formatPrice = (price) => {
    if (!price) return "";
    const cleaned = price.toString().replace(/[^\d.]/g, "");
    return parseFloat(cleaned).toFixed(2);
  };

  const ProductCard = ({ data, title, isOptimized = false }) => {
    const displayTitle = data?.title || "";
    const displayFeatures = data?.features || "";
    const displayDescription = data?.Description || data?.description || "";
    const displayBulletPoints = data?.bullet_points || [];
    const displayPrice = formatPrice(data?.price);

    const hasNoData =
      !displayTitle &&
      !displayFeatures &&
      !displayDescription &&
      displayBulletPoints.length === 0;

    return (
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>{title}</h3>
        {hasNoData && (
          <div
            style={{
              backgroundColor: "#fef3c7",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            No product data available for this ASIN
          </div>
        )}
        {displayTitle && (
          <>
            <p style={styles.sectionTitle}>Title:</p>
            <p style={styles.sectionContent}>{displayTitle}</p>
          </>
        )}
        {displayDescription && (
          <>
            <p style={styles.sectionTitle}>Description:</p>
            <p style={styles.sectionContent}>{displayDescription}</p>
          </>
        )}
        {displayFeatures && !isOptimized && (
          <>
            <p style={styles.sectionTitle}>Features:</p>
            <p style={styles.sectionContent}>{displayFeatures}</p>
          </>
        )}
        {displayBulletPoints.length > 0 && (
          <>
            <p style={styles.sectionTitle}>Bullet Points:</p>
            <ul style={styles.bulletList}>
              {displayBulletPoints.map((point, idx) => (
                <li key={idx} style={styles.bulletItem}>
                  {point}
                </li>
              ))}
            </ul>
          </>
        )}
        {displayPrice && (
          <>
            <p style={styles.sectionTitle}>Price:</p>
            <p style={styles.price}>₹{displayPrice}</p>
          </>
        )}
      </div>
    );
  };

  const openHistoryPage = () => {
    const newWindow = window.open("", "_blank");
    const storedHistory = JSON.parse(
      localStorage.getItem("asinHistory") || "[]"
    );

    newWindow.document.write(`
      <html>
        <head>
          <title>Product History</title>
          <style>
            body { font-family: system-ui, Avenir, Helvetica, Arial, sans-serif; padding: 20px; background: #f0f7ff; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
            .card { border: 2px solid #d1d5db; border-radius: 12px; padding: 24px; background: white; margin-bottom: 20px; }
            .title { font-size: 1.25rem; font-weight: bold; color: #2563eb; margin-bottom: 16px; }
            .section { margin-bottom: 8px; }
            .label { font-weight: 600; color: #374151; }
            .content { color: #1f2937; white-space: pre-wrap; }
            .backBtn { margin-bottom: 16px; padding: 10px 20px; background: #4b5563; color: white; border: none; border-radius: 6px; cursor: pointer; }
          </style>
        </head>
        <body>
          <button class="backBtn" onclick="window.close()">Back</button>
          <h1>Product History</h1>
          <div class="grid">
            ${storedHistory
              .map(
                (item) => `
              <div class="card">
                <div class="title">Original Listing</div>
                <div class="section"><span class="label">Title:</span> <div class="content">${
                  item.original?.title || ""
                }</div></div>
                <div class="section"><span class="label">Description:</span> <div class="content">${
                  item.original?.Description || item.original?.description || ""
                }</div></div>
                <div class="section"><span class="label">Features:</span> <div class="content">${
                  item.original?.features || ""
                }</div></div>
                <div class="section"><span class="label">Bullet Points:</span> <div class="content">${(
                  item.original?.bullet_points || []
                ).join(", ")}</div></div>
                <div class="section"><span class="label">Price:</span> <div class="content">₹${
                  item.original?.price || ""
                }</div></div>

                <div class="title">Optimized Listing</div>
                <div class="section"><span class="label">Title:</span> <div class="content">${
                  item.optimized?.title || ""
                }</div></div>
                <div class="section"><span class="label">Description:</span> <div class="content">${
                  item.optimized?.Description ||
                  item.optimized?.description ||
                  ""
                }</div></div>
                <div class="section"><span class="label">Features:</span> <div class="content">${
                  item.optimized?.features || ""
                }</div></div>
                <div class="section"><span class="label">Bullet Points:</span> <div class="content">${(
                  item.optimized?.bullet_points || []
                ).join(", ")}</div></div>
                <div class="section"><span class="label">Price:</span> <div class="content">₹${
                  item.optimized?.price || ""
                }</div></div>
                <div class="section"><span class="label">Keywords:</span> <div class="content">${(
                  item.optimized?.keywords || []
                ).join(", ")}</div></div>
                <div class="section"><span class="label">ASIN:</span> <div class="content">${
                  item.asin
                }</div></div>
                <div class="section"><span class="label">Date:</span> <div class="content">${new Date(
                  item.createdAt
                ).toLocaleString()}</div></div>
              </div>
            `
              )
              .join("")}
          </div>
        </body>
      </html>
    `);
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            AI-Powered Amazon Product Listing Optimizer
          </h1>
          <button onClick={openHistoryPage} style={styles.historyBtn}>
            View History
          </button>
        </div>

        <div style={styles.formContainer}>
          <label htmlFor="asin" style={styles.label}>
            Enter Amazon ASIN
          </label>
          <input
            id="asin"
            type="text"
            value={ASIN}
            onChange={(e) => setASIN(e.target.value.toUpperCase())}
            placeholder="e.g., B08N5WRWNW"
            style={styles.input}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
          />
          <button onClick={handleSubmit} style={styles.submitBtn}>
            Search
          </button>

          {/* Demo ASINs below input */}
          <div style={styles.demoContainer}>
            <p style={styles.demoMessage}>
              Use these demo ASINs if you don’t have any ASIN to try:
            </p>
            {demoASINs.map((demoASIN) => (
              <button
                key={demoASIN}
                onClick={() => {
                  setASIN(demoASIN);
                  handleSubmit(null, demoASIN);
                }}
                style={{
                  marginRight: "8px",
                  marginBottom: "8px",
                  padding: "8px 12px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                {demoASIN}
              </button>
            ))}
          </div>

          {error && <p style={styles.error}>{error}</p>}
        </div>

        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading...</p>
          </div>
        )}

        {result && !loading && (
          <div style={styles.cardsGrid}>
            <ProductCard data={result.original} title="Original Listing" />
            <ProductCard
              data={result.optimized}
              title="Optimized Listing"
              isOptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
