import { ChevronLeft } from "lucide-react";
import useWindowStore from "#store/window";

const MobileWindowHeader = ({ target, title, onCustomBack, returnTo }) => {
  const { closeWindow, focusWindow, windows } = useWindowStore();

  const handleBack = () => {
    if (onCustomBack) {
      onCustomBack();
    } else {
      closeWindow(target);
      // If there's a window to return to and it's open, focus it
      if (returnTo && windows[returnTo]?.isOpen) {
        setTimeout(() => {
          focusWindow(returnTo);
        }, 50);
      }
    }
  };

  return (
    <div className="mobile-window-header">
      <button className="back-button" onClick={handleBack}>
        <ChevronLeft size={24} strokeWidth={2.5} />
        <span>Go back</span>
      </button>
      <h1 className="window-title">{title}</h1>
      <div className="spacer"></div>
    </div>
  );
};

export default MobileWindowHeader;
