import React from "react";

function CreateTicket() {
  const topics = [
    {
      title: "Account & Registration",
      icon: "fa-user-plus",
      links: [
        "Getting started",
        "Account registration",
        "Profile information",
        "Account verification",
        "Account modification",
        "Account security",
      ],
    },
    {
      title: "Login & Security",
      icon: "fa-user-shield",
      links: [
        "Login credentials",
        "Password & authentication",
        "Two-factor authentication",
        "Profile security",
        "Session & device management",
        "Account access issues",
      ],
    },
    {
      title: "Trading & Markets",
      icon: "fa-chart-column",
      links: [
        "Trading FAQs",
        "Market data",
        "Margins",
        "Product & order types",
        "Order rejection",
        "Charts & technical analysis",
      ],
    },
    {
      title: "Funds & Payments",
      icon: "fa-wallet",
      links: [
        "Adding funds",
        "Fund withdrawal",
        "Payment issues",
        "Bank account management",
        "Transaction history",
        "Deposit & withdrawal status",
      ],
    },
    {
      title: "Portfolio & Dashboard",
      icon: "fa-chart-pie",
      links: [
        "Portfolio overview",
        "Holdings",
        "Positions",
        "Funds & balance",
        "Reports",
        "Portfolio analytics",
      ],
    },
    {
      title: "TradeMind AI",
      icon: "fa-brain",
      links: [
        "AI market insights",
        "AI recommendations",
        "Market intelligence",
        "AI dashboard",
        "AI feature support",
        "Understanding AI insights",
      ],
    },
  ];

  return (
    <section className="trademind-create-ticket">
      <div className="container py-5">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="ticket-section-header">

          <div className="ticket-header-badge">
            <span></span>
            TRADEMIND AI SUPPORT
          </div>

          <h2>
            How can we help you?
          </h2>

          <p>
            Select a topic below to find the right support resources
            or create a support ticket.
          </p>

        </div>


        {/* =========================================
            TOPIC GRID
        ========================================= */}

        <div className="row gy-4 gx-4">

          {topics.map((topic, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-4"
            >

              <div className="support-topic-card">

                {/* Category Header */}

                <div className="support-topic-header">

                  <div className="support-topic-icon">
                    <i
                      className={`fa-solid ${topic.icon}`}
                    ></i>
                  </div>

                  <div>
                    <h3>
                      {topic.title}
                    </h3>

                    <span>
                      {topic.links.length} help topics
                    </span>
                  </div>

                </div>


                {/* Subtopics */}

                <ul className="support-topic-list">

                  {topic.links.map((link, linkIndex) => (
                    <li key={linkIndex}>

                      <button
                        type="button"
                        className="support-subtopic-link"
                      >

                        <span>
                          {link}
                        </span>

                        <i className="fa-solid fa-arrow-right"></i>

                      </button>

                    </li>
                  ))}

                </ul>

              </div>

            </div>
          ))}

        </div>


        {/* =========================================
            BOTTOM HELP CARD
        ========================================= */}

        <div className="ticket-bottom-card">

          <div className="ticket-bottom-icon">
            <i className="fa-solid fa-headset"></i>
          </div>

          <div className="ticket-bottom-content">

            <h3>
              Can't find what you're looking for?
            </h3>

            <p>
              Our support team can help you with account, trading,
              funds, portfolio, and TradeMind AI related questions.
            </p>

          </div>

          <button
            type="button"
            className="ticket-create-button"
          >
            Create a ticket
            <i className="fa-solid fa-arrow-right"></i>
          </button>

        </div>

      </div>


      <style>{`

        /* =========================================
           SECTION
        ========================================= */

        .trademind-create-ticket {

          width: 100%;

          background: #ffffff;

          overflow: hidden;

        }

        .trademind-create-ticket .container {

          position: relative;

          z-index: 2;

        }


        /* =========================================
           HEADER
        ========================================= */

        .ticket-section-header {

          max-width: 700px;

          margin: 0 auto 45px;

          text-align: center;

        }

        .ticket-header-badge {

          display: inline-flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 12px;

          color: #387ed1;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 1.2px;

        }

        .ticket-header-badge span {

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: #387ed1;

          box-shadow:
            0 0 0 5px
            rgba(56, 126, 209, 0.08);

        }

        .ticket-section-header h2 {

          margin: 0 0 10px;

          color: #1f2937;

          font-size: clamp(28px, 4vw, 40px);

          line-height: 1.2;

          font-weight: 600;

          letter-spacing: -0.8px;

        }

        .ticket-section-header p {

          max-width: 600px;

          margin: 0 auto;

          color: #6b7280;

          font-size: 15px;

          line-height: 1.7;

        }


        /* =========================================
           TOPIC CARD
        ========================================= */

        .support-topic-card {

          height: 100%;

          padding: 24px;

          border:
            1px solid #e5e7eb;

          border-radius: 16px;

          background: #ffffff;

          box-shadow:
            0 7px 25px
            rgba(31, 41, 55, 0.04);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;

        }

        .support-topic-card:hover {

          transform:
            translateY(-6px);

          border-color:
            rgba(56, 126, 209, 0.22);

          box-shadow:
            0 18px 40px
            rgba(31, 41, 55, 0.08);

        }


        /* =========================================
           TOPIC HEADER
        ========================================= */

        .support-topic-header {

          display: flex;

          align-items: center;

          gap: 13px;

          margin-bottom: 20px;

          padding-bottom: 17px;

          border-bottom:
            1px solid #f0f2f5;

        }

        .support-topic-icon {

          flex-shrink: 0;

          width: 46px;

          height: 46px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 13px;

          background:
            rgba(56, 126, 209, 0.08);

          color: #387ed1;

          font-size: 18px;

          transition:
            transform 0.35s ease,
            background 0.35s ease;

        }

        .support-topic-card:hover
        .support-topic-icon {

          transform:
            translateY(-3px)
            scale(1.05);

          background:
            rgba(56, 126, 209, 0.13);

        }

        .support-topic-header h3 {

          margin: 0 0 3px;

          color: #374151;

          font-size: 16px;

          line-height: 1.3;

          font-weight: 600;

        }

        .support-topic-header span {

          color: #9ca3af;

          font-size: 11px;

        }


        /* =========================================
           SUBTOPIC LIST
        ========================================= */

        .support-topic-list {

          list-style: none;

          margin: 0;

          padding: 0;

        }

        .support-topic-list li {

          margin: 0;

        }

        .support-subtopic-link {

          display: flex;

          align-items: center;

          justify-content: space-between;

          width: 100%;

          gap: 10px;

          padding: 9px 0;

          margin: 0;

          border: 0;

          background: transparent;

          color: #6b7280;

          font-family: inherit;

          font-size: 13px;

          line-height: 1.5;

          text-align: left;

          cursor: pointer;

          transition:
            color 0.25s ease,
            padding 0.25s ease;

        }

        .support-subtopic-link:hover {

          color: #387ed1;

          padding-left: 4px;

        }

        .support-subtopic-link:focus-visible {

          outline: 2px solid
            rgba(56, 126, 209, 0.35);

          outline-offset: 3px;

          border-radius: 4px;

        }

        .support-subtopic-link i {

          flex-shrink: 0;

          color: #b0b7c3;

          font-size: 9px;

          opacity: 0;

          transform:
            translateX(-4px);

          transition:
            opacity 0.25s ease,
            transform 0.25s ease;

        }

        .support-subtopic-link:hover i {

          opacity: 1;

          transform:
            translateX(0);

          color: #387ed1;

        }


        /* =========================================
           BOTTOM CARD
        ========================================= */

        .ticket-bottom-card {

          display: flex;

          align-items: center;

          gap: 16px;

          margin-top: 45px;

          padding: 22px 25px;

          border:
            1px solid
            rgba(56, 126, 209, 0.15);

          border-radius: 16px;

          background:
            linear-gradient(
              135deg,
              rgba(56, 126, 209, 0.06),
              rgba(56, 126, 209, 0.025)
            );

        }

        .ticket-bottom-icon {

          flex-shrink: 0;

          width: 48px;

          height: 48px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 13px;

          background:
            rgba(56, 126, 209, 0.10);

          color: #387ed1;

          font-size: 18px;

        }

        .ticket-bottom-content {

          flex: 1;

        }

        .ticket-bottom-content h3 {

          margin: 0 0 4px;

          color: #374151;

          font-size: 15px;

          font-weight: 600;

        }

        .ticket-bottom-content p {

          margin: 0;

          color: #6b7280;

          font-size: 12px;

          line-height: 1.55;

        }


        /* =========================================
           CREATE TICKET BUTTON
        ========================================= */

        .ticket-create-button {

          flex-shrink: 0;

          display: inline-flex;

          align-items: center;

          gap: 9px;

          padding: 10px 16px;

          border: 0;

          border-radius: 9px;

          background: #387ed1;

          color: #ffffff;

          font-family: inherit;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          box-shadow:
            0 7px 18px
            rgba(56, 126, 209, 0.18);

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;

        }

        .ticket-create-button:hover {

          color: #ffffff;

          background: #2868b3;

          transform:
            translateY(-2px);

          box-shadow:
            0 11px 25px
            rgba(56, 126, 209, 0.25);

        }

        .ticket-create-button:focus-visible {

          outline: 2px solid
            rgba(56, 126, 209, 0.4);

          outline-offset: 3px;

        }

        .ticket-create-button i {

          font-size: 10px;

          transition:
            transform 0.3s ease;

        }

        .ticket-create-button:hover i {

          transform:
            translateX(4px);

        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

          .support-topic-card {

            padding: 22px;

          }

          .ticket-bottom-card {

            align-items: flex-start;

          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-create-ticket .container {

            padding-left: 18px;

            padding-right: 18px;

          }

          .ticket-section-header {

            margin-bottom: 30px;

          }

          .support-topic-card {

            padding: 21px;

          }

          .ticket-bottom-card {

            flex-direction: column;

            align-items: flex-start;

            padding: 20px;

          }

          .ticket-create-button {

            width: 100%;

            justify-content: center;

          }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

          .ticket-section-header h2 {

            font-size: 28px;

          }

          .ticket-section-header p {

            font-size: 13px;

          }

          .support-topic-header h3 {

            font-size: 15px;

          }

          .support-subtopic-link {

            font-size: 12px;

          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .support-topic-card,
          .support-topic-icon,
          .support-subtopic-link,
          .support-subtopic-link i,
          .ticket-create-button,
          .ticket-create-button i {

            transition: none;

          }

        }

      `}</style>

    </section>
  );
}

export default CreateTicket;