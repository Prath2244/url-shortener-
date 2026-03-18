import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FiLink, FiCopy, FiBarChart2 } from "react-icons/fi";
import { MdQrCode2 } from "react-icons/md";

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);

  const perPage = 10;

  const fetchUrls = async () => {
    const res = await axios.get("http://localhost:8000/api/urls");
    setUrls(res.data);
  };

  const shortenUrl = async () => {
    if (!url) return;
    await axios.post("http://localhost:8000/api/urls", {
      original_url: url,
    });
    setUrl("");
    fetchUrls();
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const start = (page - 1) * perPage;
  const current = urls.slice(start, start + perPage);
  const totalPages = Math.ceil(urls.length / perPage);

  const chartData = {
    labels: urls.map((u) =>
      new Date(u.created_at).toLocaleDateString()
    ),
    datasets: [
      {
        type: "line",
        label: "URL Clicks",
        data: urls.map((u) => u.click_count),
        borderColor: "rgba(70,126,174)",
        backgroundColor: "rgba(0,0,0,0.05)",
        tension: 0.4,
      },
      {
        type: "bar",
        label: "URL Creations",
        data: urls.map(() => 1),
        backgroundColor: "rgba(55,163,235)",
      },
    ],
  };

  return (
    <div style={{ fontFamily: "sans-serif", background: "#ffffff" }}>
      
      {/* Header */}
      <div style={header}>
        Easy URL Shortener
      </div>

      {/* Hero */}
      <div style={hero}>
        <h2 style={{ color: "white", marginBottom: "15px" }}>
          Simplify your URL
        </h2>

        <div style={inputContainer}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your original URL eg. http://demos.nelliwinne.net/URLShortener/"
            style={input}
          />

          <button onClick={shortenUrl} style={shortenBtn}>
            <FiLink style={{ marginRight: "6px" }} />
            Shorten URL
          </button>
        </div>

        <p style={helperText}>
          All the Shorted URL and their analytics are public...
        </p>
      </div>

      {/* Table */}
      <div style={section}>
        <h3>Recent URLs</h3>

        <table style={table}>
          <thead style={thead}>
            <tr>
              <th style={th}>Original URL</th>
              <th style={th}>Short URL</th>
              <th style={th}></th>
              <th style={th}></th>
              <th style={th}>Created on</th>
              <th style={th}>Clicks</th>
              <th style={th}></th>
            </tr>
          </thead>

          <tbody>
            {current.map((u) => (
              <tr key={u.id}>
                <td style={td}>{u.original_url}</td>

                <td style={td}>
                  <a
                    href={`http://localhost:8000/${u.short_code}`}
                    target="_blank"
                    rel="noreferrer"
                    style={link}
                  >
                    <FiLink style={{ marginRight: "5px" }} />
                    http://localhost:8000/{u.short_code}
                  </a>
                </td>

                {/* Copy */}
                <td style={td}>
                  <button style={iconBtn}>
                    <FiCopy />
                  </button>
                </td>

                {/* QR */}
                <td style={td}>
                  <button style={iconBtn}>
                    <MdQrCode2 />
                  </button>
                </td>

                <td style={td}>
                  {new Date(u.created_at).toDateString()}
                </td>

                <td style={td}>{u.click_count}</td>

                <td style={td}>
                  <button style={analyticsBtn}>
                    <FiBarChart2 style={{ marginRight: "5px" }} />
                    Analytics
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={pagination}>
          <button style={pageBtn}>‹</button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                ...pageBtn,
                background: page === i + 1 ? "rgba(40,84,149)" : "#ffffff",
                color: page === i + 1 ? "#ffffff" : "#000",
              }}
            >
              {(i + 1).toString().padStart(2, "0")}
            </button>
          ))}

          <button style={pageBtn}>›</button>
        </div>
      </div>

      {/* Chart */}
      <div style={section}>
        <div style={chartBox}>
          <p style={{ color: "#6b7280" }}>Statistics</p>

          <h3 style={{ textAlign: "center" }}>
            Recent Statistics of Click Counts
          </h3>

          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const header = {
  padding: "15px 30px",
  fontSize: "20px",
  color: "#2c7da0",
  fontWeight: "500",
};

const hero = {
  background: "rgba(40,84,149)",
  padding: "35px",
  textAlign: "center",
};

const inputContainer = {
  display: "flex",
  justifyContent: "center",
};

const input = {
  width: "70%",
  padding: "12px",
  border: "none",
  outline: "none",
  borderRadius: "6px 0 0 6px",
};

const shortenBtn = {
  background: "rgba(53,122,182)",
  color: "white",
  padding: "12px 18px",
  border: "none",
  borderRadius: "0 6px 6px 0",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const helperText = {
  color: "#dbeafe",
  fontSize: "12px",
  marginTop: "10px",
};

const section = {
  padding: "30px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
  background: "#ffffff",
};

const thead = {
  background: "#f1f5f9",
};

const th = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #f1f5f9",
};

const link = {
  color: "rgba(70,126,174)",
  textDecoration: "none",
};

const iconBtn = {
  background: "#28a745",
  border: "none",
  padding: "6px 10px",
  color: "white",
  cursor: "pointer",
  borderRadius: "4px",
};

const analyticsBtn = {
  background: "rgba(54,120,179)",
  color: "white",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
};

const pagination = {
  textAlign: "center",
  marginTop: "20px",
};

const pageBtn = {
  margin: "3px",
  padding: "6px 10px",
  border: "1px solid #d1d5db",
  cursor: "pointer",
  borderRadius: "4px",
};

const chartBox = {
  border: "1px solid #e5e7eb",
  padding: "20px",
  background: "#ffffff",
};

export default App;