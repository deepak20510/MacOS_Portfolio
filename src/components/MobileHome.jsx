import { dockApps } from "#constants";
import useWindowStore from "#store/window";
import { formatTime } from "#utils/time";
import { Battery, Signal, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

const MobileHome = () => {
  const { openWindow, windows } = useWindowStore();
  const [currentTime, setCurrentTime] = useState(formatTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (appId, canOpen) => {
    if (!canOpen) return;
    openWindow(appId);
  };

  return (
    <div className="mobile-home">
      {/* iPhone Status Bar */}
      <div className="mobile-status-bar">
        <div className="status-left">
          <span className="time">{currentTime}</span>
        </div>
        <div className="notch"></div>
        <div className="status-right">
          <Signal size={14} strokeWidth={2.5} />
          <Wifi size={14} strokeWidth={2.5} />
          <Battery size={14} strokeWidth={2.5} />
        </div>
      </div>

      {/* App Grid */}
      <div className="mobile-app-grid">
        {dockApps
          .filter((app) => app.canOpen)
          .map((app) => (
            <div
              key={app.id}
              className="mobile-app-icon"
              onClick={() => handleAppClick(app.id, app.canOpen)}
            >
              <div className="app-icon-wrapper">
                <img src={`/images/${app.icon}`} alt={app.name} />
              </div>
              <span className="app-name">{app.name}</span>
            </div>
          ))}
      </div>

      {/* iPhone Dock */}
      <div className="mobile-dock">
        {dockApps.slice(0, 4).map((app) => (
          <div
            key={app.id}
            className="mobile-dock-icon"
            onClick={() => handleAppClick(app.id, app.canOpen)}
          >
            <img src={`/images/${app.icon}`} alt={app.name} />
          </div>
        ))}
      </div>

      {/* Home Indicator */}
      <div className="home-indicator"></div>
    </div>
  );
};

export default MobileHome;
