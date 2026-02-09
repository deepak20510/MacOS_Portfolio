import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window.js";
import { useState, useEffect } from "react";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!data) return null;
  const { name, image, subtitle, description } = data;
  return (
    <>
      {isMobile ? (
        <MobileWindowHeader target="txtfile" title={name || "About Me"} returnTo="finder" />
      ) : (
        <div id="window-header">
          <WindowControls target="txtfile" />
          <h2>{name}</h2>
        </div>
      )}
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>
      <div className="p-5 space-y-6">
        {image ? (
          <div className="w-full">
            <img src={image} alt={name} className="w-full h-auto rounded" />
          </div>
        ) : null}
        {subtitle ? (
          <h3 className="text-lg font-semibold">{subtitle}</h3>
        ) : null}
        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-base">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
