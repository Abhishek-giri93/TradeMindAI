function Apps() {
  return (
    <>
      {/* ==================================================
          APPS PAGE
          ================================================== */}

      <div className="apps-page px-3 py-4 px-md-4">

        {/* Page Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            Apps
          </h2>

          <p className="text-secondary mb-0">
            Explore tools to improve your trading experience.
          </p>
        </div>

        {/* Apps */}
        <div className="row g-4">

          {/* AI Trading Assistant */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="app-card h-100">
              <div className="app-icon">
                🤖
              </div>

              <h5 className="fw-bold">
                AI Trading Assistant
              </h5>

              <p className="text-secondary">
                Get AI-powered insights to understand
                market trends and your trading data.
              </p>

              <button className="btn btn-dark w-100">
                Open Assistant
              </button>
            </div>
          </div>

          {/* Market Tools */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="app-card h-100">
              <div className="app-icon">
                📊
              </div>

              <h5 className="fw-bold">
                Market Tools
              </h5>

              <p className="text-secondary">
                Analyze stocks, trends, and important
                market information in one place.
              </p>

              <button className="btn btn-dark w-100">
                Explore Tools
              </button>
            </div>
          </div>

          {/* Portfolio Insights */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="app-card h-100">
              <div className="app-icon">
                📈
              </div>

              <h5 className="fw-bold">
                Portfolio Insights
              </h5>

              <p className="text-secondary">
                Understand your portfolio performance
                and identify areas for improvement.
              </p>

              <button className="btn btn-outline-dark w-100">
                View Insights
              </button>
            </div>
          </div>

        </div>

        {/* Coming Soon */}
        <div className="coming-soon mt-4">
          <h5 className="fw-bold mb-2">
            More tools coming soon
          </h5>

          <p className="text-secondary mb-0">
            New AI-powered features and trading tools
            will be added to TradeMind AI.
          </p>
        </div>

      </div>
    </>
  );
}

export default Apps;