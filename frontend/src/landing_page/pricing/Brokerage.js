import React from "react";

function Brokerage() {
  const notes = [
    "Additional charges may apply for specific order types or special services.",
    "Digital contract notes and transaction-related documents can be provided electronically.",
    "Physical documentation, where requested, may carry additional processing and delivery charges.",
    "Charges for specialized account categories may vary based on applicable account and regulatory requirements.",
    "Applicable taxes, exchange charges, statutory levies, and regulatory fees are additional to brokerage where applicable.",
    "Always review the applicable charges before placing an order.",
  ];

  return (
    <section className="trademind-brokerage-section">
      <div className="container py-5">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="row justify-content-between align-items-center mb-4">

          <div className="col-12 col-md-8 text-center text-md-start">
            <div className="brokerage-label">
              <span></span>
              TRADEMIND AI PRICING
            </div>

            <h2 className="brokerage-title">
              Brokerage & Charges
            </h2>

            <p className="brokerage-subtitle">
              Understand the additional costs that may apply to your
              trading and investment activity.
            </p>
          </div>

          <div className="col-12 col-md-4 text-center text-md-end mt-3 mt-md-0">
            <a
              href="#charges-table"
              className="brokerage-charges-link"
            >
              <span>View detailed charges</span>

              <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>

        </div>


        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="row gy-4 gx-lg-5">

          {/* =========================================
              NOTES
          ========================================= */}

          <div className="col-12 col-md-8">

            <div className="brokerage-notes-card">

              <div className="brokerage-notes-header">
                <div className="brokerage-notes-icon">
                  <i className="fa-solid fa-receipt"></i>
                </div>

                <div>
                  <h3>
                    Important pricing information
                  </h3>

                  <p>
                    Additional charges may depend on the service,
                    account type, and transaction.
                  </p>
                </div>
              </div>

              <ul className="brokerage-notes-list">
                {notes.map((note, index) => (
                  <li key={index}>
                    <span className="note-check">
                      <i className="fa-solid fa-check"></i>
                    </span>

                    <span>{note}</span>
                  </li>
                ))}
              </ul>

            </div>

          </div>


          {/* =========================================
              ACCOUNT OPENING
          ========================================= */}

          <div className="col-12 col-md-4">

            <div className="account-opening-card">

              <div className="account-card-icon">
                <i className="fa-solid fa-user-plus"></i>
              </div>

              <h3>
                Account opening
              </h3>

              <p>
                TradeMind AI account-opening charges will be published
                with the final pricing schedule.
              </p>

              <div className="account-price">

                <span className="price-label">
                  Current status
                </span>

                <strong>
                  To be announced
                </strong>

              </div>

              <div className="account-card-footer">
                <i className="fa-solid fa-circle-info"></i>

                <span>
                  Final charges will be clearly displayed before
                  account registration.
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            TRANSPARENCY BANNER
        ========================================= */}

        <div className="row mt-4">

          <div className="col-12">

            <div className="brokerage-transparency">

              <div className="transparency-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>

              <div>
                <h3>
                  Transparent pricing, no surprises
                </h3>

                <p>
                  TradeMind AI is designed to clearly communicate
                  brokerage, taxes, exchange charges, and other
                  applicable costs before they affect your transaction.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>


      <style>{`

        /* =========================================
           SECTION
        ========================================= */

        .trademind-brokerage-section {
          width: 100%;
          background: #ffffff;
          overflow: hidden;
        }

        .trademind-brokerage-section .container {
          position: relative;
          z-index: 2;
        }


        /* =========================================
           HEADER
        ========================================= */

        .brokerage-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 9px;

          color: #387ed1;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: 1.2px;
        }

        .brokerage-label span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #387ed1;

          box-shadow:
            0 0 0 5px
            rgba(56, 126, 209, 0.08);
        }

        .brokerage-title {
          margin: 0 0 7px;

          color: #1f2937;

          font-size: clamp(27px, 4vw, 36px);

          line-height: 1.2;

          font-weight: 600;

          letter-spacing: -0.7px;
        }

        .brokerage-subtitle {
          max-width: 650px;

          margin: 0;

          color: #6b7280;

          font-size: 14px;

          line-height: 1.65;
        }


        /* =========================================
           CHARGES LINK
        ========================================= */

        .brokerage-charges-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          color: #387ed1;

          text-decoration: none;

          font-size: 14px;
          font-weight: 600;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .brokerage-charges-link:hover {
          color: #245fa5;

          transform:
            translateX(3px);
        }

        .brokerage-charges-link i {
          transition:
            transform 0.3s ease;
        }

        .brokerage-charges-link:hover i {
          transform:
            translateX(4px);
        }


        /* =========================================
           NOTES CARD
        ========================================= */

        .brokerage-notes-card {
          height: 100%;

          padding: 26px;

          border:
            1px solid #e5e7eb;

          border-radius: 16px;

          background: #ffffff;

          box-shadow:
            0 8px 30px
            rgba(31, 41, 55, 0.04);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .brokerage-notes-card:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 15px 35px
            rgba(31, 41, 55, 0.07);
        }


        /* =========================================
           NOTES HEADER
        ========================================= */

        .brokerage-notes-header {
          display: flex;
          align-items: flex-start;

          gap: 14px;

          margin-bottom: 22px;
        }

        .brokerage-notes-icon {
          flex-shrink: 0;

          width: 44px;
          height: 44px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background:
            rgba(56, 126, 209, 0.09);

          color: #387ed1;

          font-size: 18px;
        }

        .brokerage-notes-header h3 {
          margin: 0 0 4px;

          color: #374151;

          font-size: 16px;

          font-weight: 600;
        }

        .brokerage-notes-header p {
          margin: 0;

          color: #9ca3af;

          font-size: 12px;

          line-height: 1.5;
        }


        /* =========================================
           NOTES LIST
        ========================================= */

        .brokerage-notes-list {
          list-style: none;

          margin: 0;
          padding: 0;
        }

        .brokerage-notes-list li {
          display: flex;
          align-items: flex-start;

          gap: 11px;

          padding: 12px 0;

          border-bottom:
            1px solid #f0f2f5;

          color: #6b7280;

          font-size: 13px;

          line-height: 1.65;
        }

        .brokerage-notes-list li:first-child {
          padding-top: 0;
        }

        .brokerage-notes-list li:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .note-check {
          flex-shrink: 0;

          width: 20px;
          height: 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-top: 1px;

          border-radius: 50%;

          background:
            rgba(56, 126, 209, 0.08);

          color: #387ed1;

          font-size: 9px;
        }


        /* =========================================
           ACCOUNT CARD
        ========================================= */

        .account-opening-card {
          height: 100%;

          padding: 26px;

          border:
            1px solid #e5e7eb;

          border-radius: 16px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #f8faff
            );

          box-shadow:
            0 8px 30px
            rgba(31, 41, 55, 0.04);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .account-opening-card:hover {
          transform:
            translateY(-4px);

          box-shadow:
            0 16px 40px
            rgba(31, 41, 55, 0.08);
        }

        .account-card-icon {
          width: 45px;
          height: 45px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 18px;

          border-radius: 12px;

          background:
            rgba(56, 126, 209, 0.09);

          color: #387ed1;

          font-size: 18px;
        }

        .account-opening-card h3 {
          margin: 0 0 8px;

          color: #374151;

          font-size: 18px;

          font-weight: 600;
        }

        .account-opening-card > p {
          margin: 0 0 20px;

          color: #6b7280;

          font-size: 13px;

          line-height: 1.65;
        }


        /* =========================================
           ACCOUNT PRICE
        ========================================= */

        .account-price {
          display: flex;
          flex-direction: column;

          gap: 4px;

          padding: 15px;

          margin-bottom: 18px;

          border-radius: 11px;

          background:
            rgba(56, 126, 209, 0.05);
        }

        .price-label {
          color: #9ca3af;

          font-size: 11px;

          text-transform: uppercase;

          letter-spacing: 0.6px;
        }

        .account-price strong {
          color: #387ed1;

          font-size: 16px;

          font-weight: 600;
        }


        /* =========================================
           ACCOUNT FOOTER
        ========================================= */

        .account-card-footer {
          display: flex;
          align-items: flex-start;

          gap: 8px;

          color: #9ca3af;

          font-size: 11px;

          line-height: 1.5;
        }

        .account-card-footer i {
          margin-top: 2px;

          color: #387ed1;
        }


        /* =========================================
           TRANSPARENCY
        ========================================= */

        .brokerage-transparency {
          display: flex;
          align-items: flex-start;

          gap: 14px;

          padding: 19px 22px;

          border:
            1px solid
            rgba(56, 126, 209, 0.15);

          border-radius: 14px;

          background:
            rgba(56, 126, 209, 0.04);
        }

        .transparency-icon {
          flex-shrink: 0;

          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(56, 126, 209, 0.1);

          color: #387ed1;

          font-size: 17px;
        }

        .brokerage-transparency h3 {
          margin: 0 0 4px;

          color: #374151;

          font-size: 14px;

          font-weight: 600;
        }

        .brokerage-transparency p {
          margin: 0;

          color: #6b7280;

          font-size: 12px;

          line-height: 1.6;
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-brokerage-section .container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .brokerage-subtitle {
            font-size: 13px;
          }

          .brokerage-charges-link {
            font-size: 13px;
          }

          .brokerage-notes-card,
          .account-opening-card {
            padding: 22px;
          }

          .brokerage-transparency {
            flex-direction: column;
            padding: 17px;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .brokerage-notes-card,
          .account-opening-card,
          .brokerage-charges-link,
          .brokerage-charges-link i {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default Brokerage;