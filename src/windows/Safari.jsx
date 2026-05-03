import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { currentFocus } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";

const Safari = () => {
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
        <MobileWindowHeader target="safari" title="Safari" />
      ) : (
        <div id="window-header">
          <WindowControls target="safari" />
          <PanelLeft className="ml-10 icon" />
          <div className="flex items-center gap-1 ml-5">
            <ChevronLeft className="icon" />
            <ChevronRight className="icon" />
          </div>
          <div className="flex-1 flex-center gap-3">
            <ShieldHalf className="icon" />
            <div className="search">
              <Search className="icon" />
              <input
                type="text"
                placeholder="Search or enter websites name"
                className="flex"
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Share className="icon" />
            <Plus className="icon" />
            <Copy className="icon" />
          </div>
        </div>
      )}
      <div className="blog scrollbar-hide">
        <h2 className="section-header">Current Focus</h2>
        <div className="blog-posts-container">
          {currentFocus.map(({ id, image, title, date, link }) => (
            <article key={id} className="blog-card">
              <div className="blog-card-image">
                <img src={image} alt={title} />
              </div>
              <div className="blog-card-content">
                <span className="blog-card-date">{date}</span>
                <h3 className="blog-card-title">{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                  <span>Read full post</span>
                  <MoveRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
