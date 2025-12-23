import "./Pages.css"

function Submission() {
  return (
    <div className="page-container" id="top">
      <div className="page-content">
        <h2>Submission</h2>
        <p>Details soon, close to challenge opening date.</p>
        <p className="back-to-top">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="back-to-top-link"
          >
            Back to top ↑
          </button>
        </p>
      </div>
    </div>
  );
}

export default Submission;
