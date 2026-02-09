import Dock from "#components/Dock";
import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome";
import MobileHome from "#components/MobileHome";
import MusicWidget from "#components/MusicWidget";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import Terminal from "#windows/Terminal";
import Safari from "#windows/Safari";
import Resume from "#windows/Resume";
import Finder from "#windows/Finder";
import Text from "#windows/Text";
import Image from "#windows/Image";
import Photos from "#windows/Photos";
import Contact from "#windows/Contact";
import Home from "#components/Home";
import { useEffect } from "react";
import useThemeStore from "#store/theme";
import Music from "#windows/Music";


gsap.registerPlugin(Draggable);
const App = () => {
  const hydrateTheme = useThemeStore((s) => s.hydrateTheme);

  useEffect(() => {
    hydrateTheme();
  }, [hydrateTheme]);

  return (
    <main>
      {/* Desktop View */}
      <div className="desktop-view">
        <Navbar />
        <Welcome />
        <Dock />
        <Home />
        <MusicWidget />
      </div>

      {/* Mobile View */}
      <div className="mobile-view">
        <MobileHome />
        <Music />

      </div>

      {/* Windows (shared across both views) */}
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Photos />
      <Contact />

    </main>
  );
};

export default App;
