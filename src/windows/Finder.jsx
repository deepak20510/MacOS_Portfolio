import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { locations } from "#constants";
import useLocationStore from "#store/location";
import clsx from "clsx";
import useWindowStore from "#store/window";
import { useState, useEffect } from "react";
const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const openItem = (item) => {
    if (item.fileType === "pdf") {
      openWindow("resume");
      // On mobile, ensure the resume appears on top
      if (isMobile) {
        const { focusWindow } = useWindowStore.getState();
        setTimeout(() => {
          focusWindow("resume");
        }, 50);
      }
      return;
    }
    if (item.kind === "folder") {
      setActiveLocation(item);
      if (isMobile) setShowMobileDetail(true);
      return;
    }
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
    openWindow(`${item.fileType}${item.kind}`, item);
    // On mobile, ensure the opened window appears on top
    if (isMobile) {
      const { focusWindow } = useWindowStore.getState();
      setTimeout(() => {
        focusWindow(`${item.fileType}${item.kind}`);
      }, 50);
    }
  };

  const handleMobileLocationClick = (item) => {
    // If it's Resume, open the resume window directly
    if (item.type === "resume") {
      openWindow("resume");
      const { focusWindow } = useWindowStore.getState();
      setTimeout(() => {
        focusWindow("resume");
      }, 50);
      return;
    }
    setActiveLocation(item);
    setShowMobileDetail(true);
  };

  const handleMobileBack = () => {
    setShowMobileDetail(false);
  };
  return (
    <>
      {isMobile ? (
        showMobileDetail ? (
          /* Show custom back button when in detail view */
          <MobileWindowHeader
            target="finder"
            title={activeLocation?.name || "Work"}
            onCustomBack={handleMobileBack}
          />
        ) : (
          /* Normal header for main list view */
          <MobileWindowHeader target="finder" title="Work" />
        )
      ) : (
        <div id="window-header">
          <WindowControls target="finder" />
          <Search className="icon" />
        </div>
      )}
      <div className="flex h-full">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="sidebar">
            <div>
              <h3>Favourites</h3>
              <ul>
                {Object.values(locations).map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setActiveLocation(item)}
                    className={clsx(
                      item.id === activeLocation.id ? "active" : "not-active",
                    )}
                  >
                    <img src={item.icon} className="w-4" alt={item.name} />
                    <p className="text-sm font-medium truncate">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>My Projects</h3>
              <ul>
                {locations.work.children.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setActiveLocation(item)}
                    className={clsx(
                      item.id === activeLocation.id ? "active" : "not-active",
                    )}
                  >
                    <img src={item.icon} className="w-4" alt={item.name} />
                    <p className="text-sm font-medium truncate">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Mobile List View */}
        {isMobile ? (
          showMobileDetail ? (
            /* Mobile Detail View - Show Project Contents */
            <div className="mobile-finder-detail">
              <div className="mobile-detail-grid">
                {activeLocation?.children?.map((item) => (
                  <div
                    key={item.id}
                    className="mobile-detail-item"
                    onClick={() => openItem(item)}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                    />
                    <p className="text-sm text-center mt-2 font-medium">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Mobile List View - Show Sections */
            <div className="mobile-finder-content">
              <div className="mobile-section">
                <h3 className="mobile-section-title">Favourites</h3>
                <ul className="mobile-list">
                  {Object.values(locations).map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleMobileLocationClick(item)}
                      className="mobile-list-item"
                    >
                      <img src={item.icon} className="w-8" alt={item.name} />
                      <p className="flex-1 text-base font-medium">{item.name}</p>
                      <span className="text-gray-400">›</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mobile-section">
                <h3 className="mobile-section-title">My Projects</h3>
                <ul className="mobile-list">
                  {locations.work.children.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleMobileLocationClick(item)}
                      className="mobile-list-item"
                    >
                      <img src={item.icon} className="w-8" alt={item.name} />
                      <p className="flex-1 text-base font-medium">{item.name}</p>
                      <span className="text-gray-400">›</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        ) : (
          /* Desktop Content Area */
          <ul className="content">
            {activeLocation?.children.map((item) => (
              <li
                key={item.id}
                className={item.position}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
