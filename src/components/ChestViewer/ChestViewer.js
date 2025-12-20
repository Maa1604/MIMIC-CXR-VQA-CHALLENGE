// src/components/ChestViewer/ChestViewer.jsx

import ChestMagnifier from "../ChestImage/ChestMagnifier";
import ChestText from "../ChestText/ChestText";
import "./ChestViewer.css";

function ChestViewer() {
  return (
    <div className="chest-viewer">
      <div className="chest-image-container">
        <ChestMagnifier />
      </div>

      <div className="chest-text-container">
        <ChestText />
      </div>
    </div>
  );
}

export default ChestViewer;
