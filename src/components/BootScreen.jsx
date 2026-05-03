import { useState, useEffect } from "react";

const BootScreen = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("logo"); // logo → loading → fadeout → done

  useEffect(() => {
    // Phase 1: Show Apple logo for 600ms
    const logoTimer = setTimeout(() => {
      setPhase("loading");
    }, 600);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    // Phase 2: Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease-out progression: starts fast, slows near the end
        const remaining = 100 - prev;
        const step = Math.max(0.8, remaining * 0.08);
        return Math.min(100, prev + step);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      // Phase 3: Brief pause then fade out
      const fadeTimer = setTimeout(() => {
        setPhase("fadeout");
      }, 300);

      return () => clearTimeout(fadeTimer);
    }
  }, [progress, phase]);

  useEffect(() => {
    if (phase === "fadeout") {
      // Phase 4: After fade animation completes, remove from DOM
      const doneTimer = setTimeout(() => {
        setPhase("done");
        onBootComplete?.();
      }, 800);

      return () => clearTimeout(doneTimer);
    }
  }, [phase, onBootComplete]);

  if (phase === "done") return null;

  return (
    <div className={`boot-screen ${phase === "fadeout" ? "boot-fadeout" : ""}`}>
      {/* Apple Logo */}
      <div className={`boot-logo ${phase === "loading" ? "boot-logo-up" : ""}`}>
        <img src="/images/logo.svg" alt="Boot Logo" className="boot-apple-icon" />
      </div>

      {/* Progress Bar */}
      <div
        className={`boot-progress-wrapper ${
          phase === "loading" ? "boot-progress-visible" : ""
        }`}
      >
        <div className="boot-progress-track">
          <div
            className="boot-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
