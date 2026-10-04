import React, { useState } from "react";

function ChargesTable() {
  const [activeTab, setActiveTab] = useState("equity");

  const tabs = [
    {
      key: "equity",
      label: "Equity",
    },
    {
      key: "currency",
      label: "Currency",
    },
    {
      key: "commodity",
      label: "Commodity",
    },
  ];

  const equityRows = [
    {
      name: "Brokerage",
      values: [
        "To be announced",
        "To be announced",
        "To be announced",
        "To be announced",
      ],
    },
    {
      name: "STT / CTT",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "Transaction charges",
      values: [
        "Applicable exchange charges",
        "Applicable exchange charges",
        "Applicable exchange charges",
        "Applicable exchange charges",
      ],
    },
    {
      name: "GST",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "SEBI charges",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "Stamp charges",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
  ];

  const currencyRows = [
    {
      name: "Brokerage",
      values: [
        "To be announced",
        "To be announced",
      ],
    },
    {
      name: "STT / CTT",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "Transaction charges",
      values: [
        "Applicable exchange charges",
        "Applicable exchange charges",
      ],
    },
    {
      name: "GST",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "SEBI charges",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "Stamp charges",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
  ];

  const commodityRows = [
    {
      name: "Brokerage",
      values: [
        "To be announced",
        "To be announced",
      ],
    },
    {
      name: "STT / CTT",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "Transaction charges",
      values: [
        "Applicable exchange charges",
        "Applicable exchange charges",
      ],
    },
    {
      name: "GST",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "SEBI charges",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
    {
      name: "Stamp charges",
      values: [
        "Applicable as per regulations",
        "Applicable as per regulations",
      ],
    },
  ];

  const renderTable = () => {
    if (activeTab === "equity") {
      return (
        <div className="charges-table-wrapper">
          <table className="charges-table">
            <thead>
              <tr>
                <th className="charge-name-column"></th>
                <th>Equity delivery</th>
                <th>Equity intraday</th>
                <th>F&O - Futures</th>
                <th>F&O - Options</th>
              </tr>
            </thead>

            <tbody>
              {equityRows.map((row, index) => (
                <tr key={index}>
                  <td className="charge-name">{row.name}</td>

                  {row.values.map((value, valueIndex) => (
                    <td key={valueIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "currency") {
      return (
        <div className="charges-table-wrapper">
          <table className="charges-table">
            <thead>
              <tr>
                <th className="charge-name-column"></th>
                <th>Currency futures</th>
                <th>Currency options</th>
              </tr>
            </thead>

            <tbody>
              {currencyRows.map((row, index) => (
                <tr key={index}>
                  <td className="charge-name">{row.name}</td>

                  {row.values.map((value, valueIndex) => (
                    <td key={valueIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="charges-table-wrapper">
        <table className="charges-table">
          <thead>
            <tr>
              <th className="charge-name-column"></th>
              <th>Commodity futures</th>
              <th>Commodity options</th>
            </tr>
          </thead>

          <tbody>
            {commodityRows.map((row, index) => (
              <tr key={index}>
                <td className="charge-name">{row.name}</td>

                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="trademind-charges-table-section">
      <div className="container py-5">

        {/* =========================================
            SECTION HEADER
        ========================================= */}

        <div className="charges-table-header">
          <div className="charges-table-badge">
            <span></span>
            PRICING DETAILS
          </div>

          <h2>Detailed Charges</h2>

          <p>
            Review applicable trading and investment charges across
            different market segments.
          </p>
        </div>

        {/* =========================================
            TABS
        ========================================= */}

        <div className="charges-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`charges-tab ${
                activeTab === tab.key ? "active" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* =========================================
            TABLE
        ========================================= */}

        {renderTable()}

        {/* =========================================
            DISCLAIMER
        ========================================= */}

        <div className="charges-disclaimer">
          <div className="disclaimer-icon">
            <i className="fa-solid fa-circle-info"></i>
          </div>

          <div>
            <h3>Pricing information</h3>

            <p>
              TradeMind AI pricing is currently being finalized. Brokerage
              and platform charges shown as "To be announced" will be
              replaced with the applicable rates before production launch.
              Statutory and regulatory charges may vary according to
              applicable regulations.
            </p>
          </div>
        </div>

      </div>

      <style>{`

        /* =========================================
           SECTION
        ========================================= */

        .trademind-charges-table-section {
          width: 100%;
          background: #ffffff;
          overflow: hidden;
        }

        .trademind-charges-table-section .container {
          position: relative;
          z-index: 2;
        }


        /* =========================================
           HEADER
        ========================================= */

        .charges-table-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 35px;
        }

        .charges-table-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;

          color: #387ed1;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        .charges-table-badge span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #387ed1;

          box-shadow:
            0 0 0 5px rgba(56, 126, 209, 0.08);
        }

        .charges-table-header h2 {
          margin: 0 0 10px;

          color: #1f2937;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 600;
          letter-spacing: -0.8px;
        }

        .charges-table-header p {
          margin: 0;

          color: #6b7280;
          font-size: 15px;
          line-height: 1.7;
        }


        /* =========================================
           TABS
        ========================================= */

        .charges-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          margin-bottom: 25px;

          border-bottom: 1px solid #e5e7eb;
        }

        .charges-tab {
          position: relative;

          padding: 13px 25px;

          border: none;
          background: transparent;

          color: #6b7280;

          font-size: 15px;
          font-weight: 600;

          cursor: pointer;

          transition:
            color 0.3s ease,
            background 0.3s ease;
        }

        .charges-tab::after {
          content: "";

          position: absolute;

          left: 20%;
          right: 20%;
          bottom: -1px;

          height: 2px;

          background: #387ed1;

          transform: scaleX(0);

          transition: transform 0.3s ease;
        }

        .charges-tab:hover {
          color: #387ed1;
        }

        .charges-tab.active {
          color: #387ed1;
        }

        .charges-tab.active::after {
          transform: scaleX(1);
        }


        /* =========================================
           TABLE WRAPPER
        ========================================= */

        .charges-table-wrapper {
          width: 100%;

          overflow-x: auto;

          border:
            1px solid #e5e7eb;

          border-radius: 16px;

          background: #ffffff;

          box-shadow:
            0 8px 30px
            rgba(31, 41, 55, 0.05);

          scrollbar-width: thin;
        }


        /* =========================================
           TABLE
        ========================================= */

        .charges-table {
          width: 100%;
          min-width: 850px;

          border-collapse: collapse;

          font-size: 14px;
        }

        .charges-table thead {
          background:
            linear-gradient(
              180deg,
              #fafcff,
              #f7f9fc
            );
        }

        .charges-table th {
          padding: 18px 16px;

          border-bottom:
            1px solid #e5e7eb;

          color: #374151;

          font-size: 13px;
          font-weight: 600;

          text-align: left;

          white-space: nowrap;
        }

        .charges-table td {
          padding: 18px 16px;

          border-bottom:
            1px solid #f0f2f5;

          color: #6b7280;

          line-height: 1.55;

          vertical-align: middle;
        }

        .charges-table tbody tr {
          transition:
            background 0.25s ease;
        }

        .charges-table tbody tr:hover {
          background: #fafcff;
        }

        .charges-table tbody tr:last-child td {
          border-bottom: none;
        }

        .charges-table .charge-name {
          color: #374151;
          font-weight: 600;
          white-space: nowrap;
        }

        .charge-name-column {
          width: 18%;
        }


        /* =========================================
           DISCLAIMER
        ========================================= */

        .charges-disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 14px;

          max-width: 1000px;

          margin: 28px auto 0;
          padding: 18px 20px;

          border:
            1px solid
            rgba(56, 126, 209, 0.15);

          border-radius: 14px;

          background:
            rgba(56, 126, 209, 0.04);
        }

        .disclaimer-icon {
          flex-shrink: 0;

          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(56, 126, 209, 0.1);

          color: #387ed1;
        }

        .charges-disclaimer h3 {
          margin: 0 0 5px;

          color: #374151;

          font-size: 14px;
          font-weight: 600;
        }

        .charges-disclaimer p {
          margin: 0;

          color: #6b7280;

          font-size: 13px;

          line-height: 1.65;
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-charges-table-section .container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .charges-tabs {
            justify-content: flex-start;
            overflow-x: auto;
          }

          .charges-tab {
            flex-shrink: 0;
            padding: 12px 18px;
            font-size: 14px;
          }

          .charges-table {
            min-width: 760px;
          }

          .charges-disclaimer {
            flex-direction: column;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .charges-tab,
          .charges-tab::after,
          .charges-table tbody tr {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default ChargesTable;