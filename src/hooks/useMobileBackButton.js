import { useEffect, useRef } from "react";
import useWindowStore from "#store/window";

/**
 * Hook that intercepts the browser/phone back button on mobile.
 * Instead of navigating away from the site, it closes the topmost
 * open window. If no windows are open, the default back behaviour
 * is allowed (user can leave the page).
 */
const useMobileBackButton = () => {
  const { windows, closeWindow, getTopmostOpenWindow } = useWindowStore();

  // Track the number of history entries we have pushed so we don't
  // push duplicates.
  const historyDepth = useRef(0);

  // Whenever a window opens/closes, sync history state
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) return;

    const openCount = Object.values(windows).filter((w) => w.isOpen).length;

    // Push history entries to match the number of open windows
    // so each back press can close one window.
    while (historyDepth.current < openCount) {
      window.history.pushState({ windowDepth: historyDepth.current + 1 }, "");
      historyDepth.current++;
    }

    // If windows were closed programmatically (via go-back button),
    // we may have extra history entries. We'll let popstate handle them.
  }, [windows]);

  // Listen for the popstate (back button) event
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) return;

    const handlePopState = (e) => {
      const topWindow = getTopmostOpenWindow();
      if (topWindow) {
        // Close the topmost window instead of navigating away
        closeWindow(topWindow);
        historyDepth.current = Math.max(0, historyDepth.current - 1);
      }
      // If no window is open, allow default browser back behaviour
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeWindow, getTopmostOpenWindow]);
};

export default useMobileBackButton;
