import React from "react";

function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlayLink,
  appStoreLink,
}) {
  return (
    <section className="trademind-product-section">
      <div className="container py-5">
        <div className="row align-items-center gy-5">

          {/* Left Product Visual */}
          <div className="col-12 col-md-6">
            <div className="trademind-product-visual">

              {/* Background Glow */}
              <div className="product-glow"></div>

              {/* Product Image */}
              <div className="product-image-wrapper">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={productName || "TradeMind AI product"}
                    className="trademind-product-image"
                  />
                ) : (
                  <div className="product-placeholder">
                    <div className="placeholder-icon">
                      <i className="fa-solid fa-chart-line"></i>
                    </div>

                    <span>TradeMind AI</span>
                  </div>
                )}
              </div>

              {/* Floating AI Badge */}
              <div className="floating-ai-card">
                <span className="ai-icon">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </span>

                <div>
                  <small>AI Intelligence</small>
                  <strong>Market Ready</strong>
                </div>
              </div>

            </div>
          </div>

          {/* Right Content */}
          <div className="col-12 col-md-6">
            <div className="trademind-product-content">

              {/* Product Label */}
              <div className="product-label">
                <span></span>
                TRADEMIND AI
              </div>

              {/* Product Name */}
              <h2 className="trademind-product-title">
                {productName}
              </h2>

              {/* Product Description */}
              <p className="trademind-product-description">
                {productDescription}
              </p>

              {/* Action Links */}
              <div className="trademind-product-actions">

                {tryDemo && (
                  <a
                    href={tryDemo}
                    className="product-action-link primary"
                  >
                    <span>Try Demo</span>

                    <span className="action-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </a>
                )}

                {learnMore && (
                  <a
                    href={learnMore}
                    className="product-action-link"
                  >
                    <span>Learn More</span>

                    <span className="action-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </a>
                )}

              </div>

              {/* Mobile App Badges */}
              {(googlePlayLink || appStoreLink) && (
                <div className="product-app-section">

                  <p className="app-heading">
                    Available on mobile
                  </p>

                  <div className="product-app-badges">

                    {googlePlayLink && (
                      <a
                        href={googlePlayLink}
                        target="_blank"
                        rel="noreferrer"
                        className="app-badge"
                      >
                        <img
                          src="/media/images/google-play-badge.svg"
                          alt="Download on Google Play"
                        />
                      </a>
                    )}

                    {appStoreLink && (
                      <a
                        href={appStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        className="app-badge"
                      >
                        <img
                          src="/media/images/appstore-badge.svg"
                          alt="Download on the App Store"
                        />
                      </a>
                    )}

                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      <style>{`

        /* =========================================
           PRODUCT SECTION
        ========================================= */

        .trademind-product-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #ffffff;
        }

        .trademind-product-section .container {
          position: relative;
          z-index: 2;
        }


        /* =========================================
           LEFT VISUAL
        ========================================= */

        .trademind-product-visual {
          position: relative;
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .product-glow {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: rgba(56, 126, 209, 0.08);
          filter: blur(65px);
          z-index: 0;
          animation: productGlow 5s ease-in-out infinite;
        }

        .product-image-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.45s ease;
        }

        .trademind-product-visual:hover .product-image-wrapper {
          transform: translateY(-8px) scale(1.015);
        }

        .trademind-product-image {
          width: 100%;
          max-width: 480px;
          max-height: 380px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 20px 35px rgba(31, 41, 55, 0.12));
          animation: productImageReveal 0.8s ease forwards;
        }


        /* =========================================
           FALLBACK PRODUCT PLACEHOLDER
        ========================================= */

        .product-placeholder {
          width: min(100%, 420px);
          height: 280px;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f5f8fc
            );
          box-shadow:
            0 20px 50px rgba(31, 41, 55, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          color: #374151;
          font-size: 18px;
          font-weight: 600;
        }

        .placeholder-icon {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #387ed1;
          color: #ffffff;
          font-size: 28px;
          box-shadow: 0 12px 30px rgba(56, 126, 209, 0.25);
        }


        /* =========================================
           FLOATING AI CARD
        ========================================= */

        .floating-ai-card {
          position: absolute;
          right: 5%;
          bottom: 35px;
          z-index: 4;

          display: flex;
          align-items: center;
          gap: 10px;

          padding: 10px 14px;

          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(229, 231, 235, 0.9);
          border-radius: 14px;

          box-shadow:
            0 12px 30px rgba(31, 41, 55, 0.12);

          backdrop-filter: blur(10px);

          animation: floatingCard 4s ease-in-out infinite;
        }

        .ai-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(56, 126, 209, 0.1);
          color: #387ed1;
        }

        .floating-ai-card div {
          display: flex;
          flex-direction: column;
        }

        .floating-ai-card small {
          color: #9ca3af;
          font-size: 10px;
          line-height: 1.2;
        }

        .floating-ai-card strong {
          color: #374151;
          font-size: 12px;
          font-weight: 600;
        }


        /* =========================================
           RIGHT CONTENT
        ========================================= */

        .trademind-product-content {
          padding: 20px 25px;
        }

        .product-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;

          color: #387ed1;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        .product-label span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #387ed1;
          box-shadow: 0 0 0 5px rgba(56, 126, 209, 0.08);
        }

        .trademind-product-title {
          margin: 0 0 18px;

          color: #1f2937;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: -0.8px;
        }

        .trademind-product-description {
          max-width: 580px;
          margin: 0 0 28px;

          color: #6b7280;
          font-size: 16px;
          line-height: 1.75;
        }


        /* =========================================
           ACTION LINKS
        ========================================= */

        .trademind-product-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 28px;
        }

        .product-action-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          color: #387ed1;
          text-decoration: none;

          font-size: 15px;
          font-weight: 600;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .product-action-link:hover {
          color: #245fa5;
          transform: translateX(2px);
        }

        .product-action-link.primary {
          padding: 10px 16px;
          border-radius: 9px;
          background: #387ed1;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(56, 126, 209, 0.18);
        }

        .product-action-link.primary:hover {
          color: #ffffff;
          background: #2868b3;
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(56, 126, 209, 0.24);
        }

        .action-arrow {
          transition: transform 0.3s ease;
        }

        .product-action-link:hover .action-arrow {
          transform: translateX(4px);
        }


        /* =========================================
           APP SECTION
        ========================================= */

        .product-app-section {
          padding-top: 5px;
        }

        .app-heading {
          margin: 0 0 12px;
          color: #9ca3af;
          font-size: 12px;
          font-weight: 500;
        }

        .product-app-badges {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .app-badge {
          display: inline-block;
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        }

        .app-badge img {
          height: 38px;
          width: auto;
          display: block;
        }

        .app-badge:hover {
          transform: translateY(-3px);
          opacity: 0.9;
        }


        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes productImageReveal {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes productGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }

          50% {
            transform: scale(1.12);
            opacity: 1;
          }
        }

        @keyframes floatingCard {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

          .trademind-product-visual {
            min-height: 330px;
          }

          .trademind-product-content {
            padding: 10px;
          }

          .floating-ai-card {
            right: 2%;
          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-product-section .container {
            padding-left: 20px;
            padding-right: 20px;
          }

          .trademind-product-visual {
            min-height: 280px;
            padding: 15px;
          }

          .trademind-product-image {
            max-height: 280px;
          }

          .floating-ai-card {
            right: 0;
            bottom: 5px;
            transform: scale(0.9);
          }

          .trademind-product-visual:hover .product-image-wrapper {
            transform: none;
          }

          .trademind-product-content {
            padding: 10px 0;
            text-align: center;
          }

          .product-label {
            justify-content: center;
          }

          .trademind-product-description {
            margin-left: auto;
            margin-right: auto;
          }

          .trademind-product-actions {
            justify-content: center;
          }

          .product-app-section {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .product-app-badges {
            justify-content: center;
          }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

          .trademind-product-title {
            font-size: 28px;
          }

          .trademind-product-description {
            font-size: 14px;
            line-height: 1.65;
          }

          .trademind-product-actions {
            gap: 15px;
          }

          .floating-ai-card {
            padding: 8px 10px;
          }

          .ai-icon {
            width: 30px;
            height: 30px;
          }

          .floating-ai-card strong {
            font-size: 11px;
          }

          .floating-ai-card small {
            font-size: 9px;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .product-glow,
          .trademind-product-image,
          .floating-ai-card {
            animation: none;
          }

          .product-action-link,
          .action-arrow,
          .app-badge,
          .product-image-wrapper {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default LeftSection;