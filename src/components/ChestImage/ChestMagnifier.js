import { useState, useRef, useEffect } from "react";
import chestImg from "../../assets/chest.png";
import lungImg from "../../assets/lung12.png";
import "./ChestMagnifier.css";

const AUTO_DURATION = 6000; // ms

// Relative positions (0–1)
const AUTO_START_REL = { x: 0.65, y: 0.35 };
const AUTO_END_REL   = { x: 0.30, y: 0.55 };

export default function ChestMagnifier() {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  const [auto, setAuto] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [autoStart, setAutoStart] = useState(null);
  const [autoEnd, setAutoEnd] = useState(null);

  /* -----------------------------
     Compute positions from size
  ----------------------------- */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      const start = {
        x: width * AUTO_START_REL.x,
        y: height * AUTO_START_REL.y,
      };

      const end = {
        x: width * AUTO_END_REL.x,
        y: height * AUTO_END_REL.y,
      };

      setAutoStart(start);
      setAutoEnd(end);
      setPos(start);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* -----------------------------
     Mouse interaction
  ----------------------------- */
  const handleMove = (e) => {
    if (auto) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const stopAuto = () => {
    if (!auto) return;
    setAuto(false);
    cancelAnimationFrame(animRef.current);
  };

  /* -----------------------------
     Exit animation
  ----------------------------- */
  const animateExitToAutoEnd = (fromPos) => {
    if (!autoEnd) return;

    cancelAnimationFrame(animRef.current);
    startTimeRef.current = null;
    setAuto(false);

    const EXIT_DURATION = 800;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / EXIT_DURATION, 1);

      const ease =
        t < 0.5
          ? 2 * t * t
          : 1 - Math.pow(-2 * t + 2, 2) / 2;

      setPos({
        x: fromPos.x + (autoEnd.x - fromPos.x) * ease,
        y: fromPos.y + (autoEnd.y - fromPos.y) * ease,
      });

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  /* -----------------------------
     Auto zigzag animation
  ----------------------------- */
  useEffect(() => {
    if (!auto || !autoStart || !autoEnd) return;

    const ZIGZAG_AMPLITUDE = 100;
    const ZIGZAG_CYCLES = 2;

    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const t = Math.min(elapsed / AUTO_DURATION, 1);

      const baseX = autoStart.x + (autoEnd.x - autoStart.x) * t;
      const baseY = autoStart.y + (autoEnd.y - autoStart.y) * t;

      const zigzag =
        Math.sin(t * Math.PI * 2 * ZIGZAG_CYCLES) *
        ZIGZAG_AMPLITUDE *
        (1 - t);

      setPos({
        x: baseX,
        y: baseY + zigzag,
      });

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setAuto(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [auto, autoStart, autoEnd]);

  /* -----------------------------
     Lens sizing
  ----------------------------- */
  const rect = containerRef.current?.getBoundingClientRect();
  const imageSize = rect?.width || 0;
  const lensSize = imageSize * 0.35;

  return (
    <div
      ref={containerRef}
      className="magnifier-container"
      style={{ position: "relative", width: "100%", height: "100%" }}
      onMouseEnter={stopAuto}
      onMouseMove={handleMove}
      onMouseLeave={() => animateExitToAutoEnd(pos)}
    >
      {/* Chest */}
      <img
        src={chestImg}
        alt="Chest"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Lens */}
      {imageSize > 0 && (
        <div
          style={{
            position: "absolute",
            left: pos.x - lensSize / 2,
            top: pos.y - lensSize / 2,
            width: lensSize,
            height: lensSize,
            borderRadius: "50%",
            border: "4px solid #444",
            overflow: "hidden",
            backgroundColor: "#fff",
            pointerEvents: "none",
            boxShadow: "0 0 12px rgba(0,0,0,0.5)",
          }}
        >
          <img
            src={lungImg}
            alt="Lung"
            style={{
              position: "absolute",
              width: imageSize,
              height: imageSize,
              left: -(pos.x - lensSize / 2),
              top: -(pos.y - lensSize / 2),

              WebkitMaskImage: `url(${chestImg})`,
              WebkitMaskSize: `${imageSize}px ${imageSize}px`,
              WebkitMaskPosition: "0px 0px",
              WebkitMaskRepeat: "no-repeat",

              maskImage: `url(${chestImg})`,
              maskSize: `${imageSize}px ${imageSize}px`,
              maskPosition: "0px 0px",
              maskRepeat: "no-repeat",

              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
