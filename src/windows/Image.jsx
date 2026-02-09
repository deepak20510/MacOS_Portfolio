import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { useState, useEffect } from "react";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!data) return null;

  return (
    <>
      {isMobile ? (
        <MobileWindowHeader target="imgfile" title={data.name || "Image"} returnTo="finder" />
      ) : (
        <div id="window-header">
          <WindowControls target="imgfile" />
          <h2>{data.name}</h2>
        </div>
      )}
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{data.name}</h2>
      </div>
      <div className="preview">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-full h-auto object-contain rounded-md"
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
