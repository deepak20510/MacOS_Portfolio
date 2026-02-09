import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import { useState, useEffect } from "react";

const Terminal = () => {
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
        <MobileWindowHeader target="terminal" title="Tech Stack" />
      ) : (
        <div id="window-header">
          <WindowControls target="terminal"/>
          <h2>Tech Stack</h2>
        </div>
      )}
      <div className="techstack">
        <p>
          <span className="font-bold"> @deepak % </span>
          show tech stack
        </p>
        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="footnote">
          <p>
            <Check size={20} />5 of 5 stacks loaded successfully (100%)
          </p>
          <p className="render-time-text">
            <Flag size={15} className="render-time-icon" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
