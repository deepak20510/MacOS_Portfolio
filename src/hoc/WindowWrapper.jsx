import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(() =>
      typeof window !== "undefined" ? window.innerWidth <= 768 : false
    );

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;
      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      if (isMobile) return;
      const el = ref.current;
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    }, [isMobile]);

    // Force touch-action on mobile so native touch events work on real devices.
    // GSAP Draggable sets touch-action:none globally which blocks taps on phones.
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (isMobile) {
        el.style.touchAction = "auto";
        // Also fix any children that GSAP may have touched
        el.querySelectorAll("*").forEach((child) => {
          if (child.style.touchAction === "none") {
            child.style.touchAction = "auto";
          }
        });
      }
    }, [isMobile, isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          ...(isMobile ? { touchAction: "auto" } : {}),
        }}
        className="absolute"
      >
        {" "}
        <Component {...props} />
      </section>
    );
  };
  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
