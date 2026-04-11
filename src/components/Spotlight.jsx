import { useState, useEffect, useRef, useMemo } from "react";
import useSpotlightStore from "#store/spotlight";
import useWindowStore from "#store/window";
import { Search } from "lucide-react";
import { navLinks, dockApps, techStack, socials } from "#constants/index.js";

const Spotlight = () => {
  const { isOpen, closeSpotlight, toggleSpotlight } = useSpotlightStore();
  const { openWindow } = useWindowStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.code === "Space")) {
        e.preventDefault();
        toggleSpotlight();
        return;
      }
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        closeSpotlight();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleSpotlight, closeSpotlight]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const searchIndex = useMemo(() => {
    const index = [];
    dockApps.forEach(app => {
      if (app.canOpen && !index.some(i => i.name === app.name)) {
        index.push({ name: app.name, type: "App", icon: "/icons/search.svg", action: () => openWindow(app.id) });
      }
    });
    navLinks.forEach(link => {
      if (!index.some(i => i.name === link.name)) {
        index.push({ name: link.name, type: "Navigation", icon: "/icons/search.svg", action: () => openWindow(link.type) });
      }
    });
    techStack.forEach(stack => {
      stack.items.forEach(item => {
        if (!index.some(i => i.name === item)) {
          index.push({ name: item, type: `Skill (${stack.category})`, icon: "/icons/search.svg", action: () => openWindow("terminal") });
        }
      });
    });
    socials.forEach(social => {
      if (!index.some(i => i.name === social.text)) {
        index.push({ name: social.text, type: "Social Link", icon: social.icon, action: () => window.open(social.link, "_blank", "noopener,noreferrer") });
      }
    });
    return index;
  }, [openWindow]);

  const filteredResults = useMemo(() => {
    if (!query) return [];
    return searchIndex.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [query, searchIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeAction = (action) => {
    action();
    closeSpotlight();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredResults.length > 0) {
      e.preventDefault();
      executeAction(filteredResults[selectedIndex].action);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[10vh] sm:pt-[20vh] bg-black/20 transition-all duration-200 px-4 sm:px-0" onClick={closeSpotlight} style={{ backdropFilter: "blur(3px)" }}>
      <div 
        className="w-full sm:w-[90%] max-w-[650px] rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-3xl bg-white/70 dark:bg-[#1c1c1e]/70 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 sm:py-4 border-b border-gray-400/20 dark:border-white/10">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none outline-none text-xl sm:text-2xl font-light text-black dark:text-white placeholder-gray-500/70 dark:placeholder-gray-400/70"
            placeholder="Spotlight Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        
        {filteredResults.length > 0 && (
          <div className="py-2 max-h-[40vh] overflow-y-auto">
            {filteredResults.map((result, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between px-6 py-2.5 cursor-pointer transition-colors group ${
                    isSelected ? "bg-[#007aff] text-white" : "text-black dark:text-white hover:bg-[#007aff] hover:text-white"
                  }`}
                  onClick={() => executeAction(result.action)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={result.icon} 
                      alt={result.type} 
                      className={`w-5 h-5 object-contain ${
                        isSelected ? "brightness-0 invert opacity-100" : "opacity-60 dark:invert group-hover:brightness-0 group-hover:invert group-hover:opacity-100"
                      }`} 
                    />
                    <span className="font-medium text-[15px]">{result.name}</span>
                  </div>
                  <span className={`text-[12px] ${isSelected ? "opacity-100 text-white" : "opacity-70 group-hover:opacity-100 group-hover:text-white"}`}>{result.type}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
