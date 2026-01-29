import Dock from "#components/Dock";
import Navbar from "#components/Navbar";
import Welcome from "#components/Welcome";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import Terminal from "#windows/Terminal";
import Safari from "#windows/Safari";
import Resume from "#windows/Resume";
import Finder from "#windows/Finder";

gsap.registerPlugin(Draggable);
const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
    </main>
  );
};

export default App;
