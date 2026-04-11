import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import WindowWrapper from "#hoc/WindowWrapper";
import { useState, useEffect } from "react";

const AboutDialog = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const downloadResume = () => {
    // Standard way to trigger a download or open a PDF
    window.open("/files/resume1.pdf", "_blank");
  };

  return (
    <>
      {isMobile ? (
        <MobileWindowHeader target="aboutDialog" title="About This Dev" />
      ) : (
        <div id="window-header" className="!bg-transparent !border-none">
          <WindowControls target="aboutDialog" />
        </div>
      )}
      <div className="about-content">
        <div className="flex flex-col items-center max-sm:px-5">
          <div className="relative mb-6 mt-4">
            <img src="/images/logo.svg" alt="App Logo" className="w-24 h-24 dark:invert drop-shadow-lg" />
          </div>
          <h1 className="text-[32px] font-bold mb-1 dark:text-white text-black tracking-tight">DeepOS</h1>
          <p className="text-[13px] text-gray-500 mb-8 font-medium">Version 1.0.1 (Stable)</p>

          <div className="w-full text-[12px] leading-relaxed mb-8 dark:text-[#EBEBEB] text-[#333333] space-y-1.5 border-t border-gray-400/10 pt-6">
            <div className="flex">
              <span className="w-28 text-right pr-4 font-semibold dark:text-white text-black">Chip</span>
              <span className="flex-1 text-gray-400">Highly Motivated Developer</span>
            </div>
            <div className="flex">
              <span className="w-28 text-right pr-4 font-semibold dark:text-white text-black">Memory</span>
              <span className="flex-1 text-gray-400">Fast Learner</span>
            </div>
            <div className="flex">
              <span className="w-28 text-right pr-4 font-semibold dark:text-white text-black">Startup Disk</span>
              <span className="flex-1 text-gray-400">JS, React, Node.js</span>
            </div>
            <div className="flex">
              <span className="w-28 text-right pr-4 font-semibold dark:text-white text-black">Storage</span>
              <span className="flex-1 text-gray-400">Full of creative ideas</span>
            </div>
          </div>

          <button
            onClick={downloadResume}
            className="w-full py-1.5 px-4 bg-gray-200/50 hover:bg-gray-300/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 border border-gray-300 dark:border-white/10 rounded-lg text-[13px] font-medium transition-all text-black dark:text-white mb-2"
          >
            Download Resume (PDF)
          </button>

          <p className="text-[10px] text-gray-400 text-center px-4 mt-4">
            © 2026 Deepak Mahato · <br /> Built with passion and precision
          </p>
        </div>
      </div>
    </>
  );
};

const AboutDialogWindow = WindowWrapper(AboutDialog, "aboutDialog");

export default AboutDialogWindow;
