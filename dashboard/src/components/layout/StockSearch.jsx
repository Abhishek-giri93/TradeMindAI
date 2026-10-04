function StockSearch() {
  return (
    <div className="stock-search">
      <div className="input-group">

        <span className="input-group-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a5 5 0 1 1-10 0 5 5 0 0 1 10 0m-1.2 4.8a6 6 0 1 0-.7.7l3.5 3.5a.5.5 0 0 0 .7-.7z" />
          </svg>
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Search stocks..."
        />

      </div>
    </div>
  );
}

export default StockSearch;