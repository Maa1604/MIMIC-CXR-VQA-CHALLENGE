import { useState } from "react";
import chestImg from "../assets/chest.png";
import lungImg from "../assets/lung2.png";
import "./ChestMagnifier.css";


const IMAGE_SIZE = 400;   // chest & lung image size
const LENS_SIZE = 140;    // magnifier diameter

export default function ChestMagnifier() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="magnifier-container"
      style={{
        position: "relative",
        width: IMAGE_SIZE,
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={handleMove}
    >
      {/* Base chest image */}
      <img
        src={chestImg}
        alt="Chest"
        style={{
          width: IMAGE_SIZE,
          display: "block",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Magnifying glass */}
      {show && (
        <div
          style={{
            position: "absolute",
            left: pos.x - LENS_SIZE / 2,
            top: pos.y - LENS_SIZE / 2,
            width: LENS_SIZE,
            height: LENS_SIZE,
            borderRadius: "50%",
            border: "4px solid #444",
            overflow: "hidden",
            backgroundColor: "#fff",   // ✅ prevents black circle
            pointerEvents: "none",
            boxShadow: "0 0 12px rgba(0,0,0,0.5)",
          }}
        >
          {/* Lung image ONLY */}
          <img
            src={lungImg}
            alt="Lung overlay"
            style={{
              position: "absolute",
              left: -pos.x + LENS_SIZE / 2,
              top: -pos.y + LENS_SIZE / 2,
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
