import React from "react";

function RightSection({
  imageUrl,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <section className="trademind-right-product-section">
      <div className="container py-5">
        <div className="row align-items-center gy-5">

          {/* =========================================
              LEFT CONTENT
          ========================================= */}
          <div className="col-12 col-md-6">
            <div className="trademind-right-content">

              {/* Product Label */}
              <div className="right-product-label">
                <span></span>
                TRADEMIND AI
              </div>

              {/* Product Name */}
              <h2 className="right-product-title">
                {productName}
              </h2>

              {/* Product Description */}
              <p className="right-product-description">
                {productDescription}
              </p>

              {/* Learn More */}
              {learnMore && (
                <div className="right-product-action">
                  <a
                    href={learnMore}
                    className="right-learn-more"
                  >
                    <span>Learn More</span>

                    <span className="right-action-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </a>
                </div>
              )}

            </div>
          </div>

          {/* =========================================
              RIGHT PRODUCT VISUAL
          ========================================= */}
          <div className="col-12 col-md-6">
            <div className="right-product-visual">

              {/* Background Glow */}
              <div className="right-product-glow"></div>

              {/* Product Image */}
              <div className="right-image-wrapper">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={productName || "TradeMind AI product"}
                    className="right-product-image"
                  />
                ) : (
                  <div className="right-product-placeholder">
                    <div className="right-placeholder-icon">
                      <i className="fa-solid fa-chart-pie"></i>
                    </div>

                    <span>TradeMind AI</span>
                  </div>
                )}
              </div>

              {/* Floating Analytics Card */}
              <div className="right-floating-card">
                <div className="right-floating-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </div>

                <div className="right-floating-info">
                  <small>Market Analytics</small>
                  <strong>Real-time insights</strong>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`

        /* =========================================
           SECTION
        ========================================= */

        .trademind-right-product-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #fafcff;
        }

        .trademind-right-product-section .container {
          position: relative;
          z-index: 2;
        }


        /* =========================================
           LEFT CONTENT
        ========================================= */

        .trademind-right-content {
          padding: 20px 25px;
        }

        .right-product-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 15px;

          color: #387ed1;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        .right-product-label span {
          width: 7px;
          height: 7px;
          border-radius: 50%;

          background: #387ed1;

          box-shadow:
            0 0 0 5px rgba(56, 126, 209, 0.08);

          animation: rightLabelPulse 2s ease-in-out infinite;
        }

        .right-product-title {
          margin: 0 0 18px;

          color: #1f2937;

          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.2;

          font-weight: 600;
          letter-spacing: -0.8px;
        }

        .right-product-description {
          max-width: 580px;

          margin: 0 0 28px;

          color: #6b7280;

          font-size: 16px;
          line-height: 1.75;
        }


        /* =========================================
           LEARN MORE
        ========================================= */

        .right-product-action {
          display: flex;
          align-items: center;
        }

        .right-learn-more {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          color: #387ed1;
          text-decoration: none;

          font-size: 15px;
          font-weight: 600;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .right-learn-more:hover {
          color: #245fa5;
          transform: translateX(3px);
        }

        .right-action-arrow {
          display: inline-flex;
          transition: transform 0.3s ease;
        }

        .right-learn-more:hover .right-action-arrow {
          transform: translateX(5px);
        }


        /* =========================================
           RIGHT VISUAL
        ========================================= */

        .right-product-visual {
          position: relative;

          min-height: 380px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 30px;
        }

        .right-product-glow {
          position: absolute;

          width: 300px;
          height: 300px;

          border-radius: 50%;

          background: rgba(56, 126, 209, 0.07);

          filter: blur(65px);

          z-index: 0;

          animation: rightGlowAnimation 5s ease-in-out infinite;
        }

        .right-image-wrapper {
          position: relative;
          z-index: 2;

          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          transition:
            transform 0.45s ease;
        }

        .right-product-visual:hover .right-image-wrapper {
          transform:
            translateY(-8px)
            scale(1.015);
        }

        .right-product-image {
          width: 100%;
          max-width: 480px;
          max-height: 380px;

          object-fit: contain;

          display: block;

          filter:
            drop-shadow(
              0 20px 35px
              rgba(31, 41, 55, 0.12)
            );

          animation:
            rightImageReveal
            0.8s ease forwards;
        }


        /* =========================================
           FALLBACK VISUAL
        ========================================= */

        .right-product-placeholder {
          width: min(100%, 420px);
          height: 280px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 15px;

          border:
            1px solid #e5e7eb;

          border-radius: 24px;

          background:
            linear-gradient(
              135deg,
              #ffffff,
              #f5f8fc
            );

          box-shadow:
            0 20px 50px
            rgba(31, 41, 55, 0.08);

          color: #374151;

          font-size: 18px;
          font-weight: 600;
        }

        .right-placeholder-icon {
          width: 70px;
          height: 70px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 20px;

          background: #387ed1;
          color: #ffffff;

          font-size: 28px;

          box-shadow:
            0 12px 30px
            rgba(56, 126, 209, 0.25);
        }


        /* =========================================
           FLOATING ANALYTICS CARD
        ========================================= */

        .right-floating-card {
          position: absolute;

          left: 4%;
          bottom: 35px;

          z-index: 4;

          display: flex;
          align-items: center;
          gap: 10px;

          padding: 10px 14px;

          background:
            rgba(255, 255, 255, 0.94);

          border:
            1px solid
            rgba(229, 231, 235, 0.9);

          border-radius: 14px;

          box-shadow:
            0 12px 30px
            rgba(31, 41, 55, 0.12);

          backdrop-filter: blur(10px);

          animation:
            rightFloatingCard
            4s ease-in-out infinite;
        }

        .right-floating-icon {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(56, 126, 209, 0.1);

          color: #387ed1;
        }

        .right-floating-info {
          display: flex;
          flex-direction: column;
        }

        .right-floating-info small {
          color: #9ca3af;

          font-size: 10px;
          line-height: 1.2;
        }

        .right-floating-info strong {
          color: #374151;

          font-size: 12px;
          font-weight: 600;
        }


        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes rightImageReveal {

          from {
            opacity: 0;
            transform:
              translateY(18px)
              scale(0.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }

        }

        @keyframes rightGlowAnimation {

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

        @keyframes rightFloatingCard {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }

        }

        @keyframes rightLabelPulse {

          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.65;
            transform: scale(1.15);
          }

        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 991px) {

          .right-product-visual {
            min-height: 330px;
          }

          .trademind-right-content {
            padding: 10px;
          }

          .right-floating-card {
            left: 2%;
          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {

          .trademind-right-product-section
          .container {
            padding-left: 20px;
            padding-right: 20px;
          }

          .trademind-right-content {
            padding: 10px 0;

            text-align: center;
          }

          .right-product-label {
            justify-content: center;
          }

          .right-product-description {
            margin-left: auto;
            margin-right: auto;
          }

          .right-product-action {
            justify-content: center;
          }

          .right-product-visual {
            min-height: 280px;
            padding: 15px;
          }

          .right-product-image {
            max-height: 280px;
          }

          .right-product-visual:hover
          .right-image-wrapper {
            transform: none;
          }

          .right-floating-card {
            left: 0;
            bottom: 5px;
          }

        }


        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 480px) {

          .right-product-title {
            font-size: 28px;
          }

          .right-product-description {
            font-size: 14px;
            line-height: 1.65;
          }

          .right-floating-card {
            padding: 8px 10px;
          }

          .right-floating-icon {
            width: 30px;
            height: 30px;
          }

          .right-floating-info strong {
            font-size: 11px;
          }

          .right-floating-info small {
            font-size: 9px;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .right-product-label span,
          .right-product-glow,
          .right-product-image,
          .right-floating-card {
            animation: none;
          }

          .right-learn-more,
          .right-action-arrow,
          .right-image-wrapper {
            transition: none;
          }

        }

      `}</style>
    </section>
  );
}

export default RightSection;