import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();
const Resume = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="mobile-resume-header">
          <MobileWindowHeader target="resume" title="Resume.pdf" returnTo="finder" />
          <a
            href="/files/resume1.pdf"
            download="Deepak_Resume.pdf"
            className="mobile-download-btn"
            title="Download Resume"
          >
            <Download size={20} />
            <span>Download Resume</span>
          </a>
        </div>
      ) : (
        <div id="window-header">
          <WindowControls target="resume" />
          <h2>Resume.pdf</h2>
          <a
            href="/files/resume1.pdf"
            download="Deepak_Resume.pdf"
            className="cursor-pointer"
            title="Download Resume"
          >
            <Download className="icon" />
          </a>
        </div>
      )}
      <Document file="/files/resume1.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
