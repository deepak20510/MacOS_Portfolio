import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { gallery, photosLinks } from "#constants/index";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { useState, useEffect } from "react";

const Photos = () => {
  const { openWindow, focusWindow } = useWindowStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleImageClick = (img) => {
    openWindow("imgfile", {
      imageUrl: img,
      name: img.split("/").pop(),
    });
    focusWindow("imgfile");
  };

  return (
    <>
      {isMobile ? (
        <MobileWindowHeader target="photos" title="All Photos" />
      ) : (
        <div id="window-header">
          <WindowControls target="photos" />
          <h2>Photos</h2>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map((link) => (
              <li key={link.id}>
                <img src={link.icon} alt={link.title} />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map((item) => (
              <li key={item.id} onClick={() => handleImageClick(item.img)}>
                <img src={item.img} alt={`Gallery ${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
