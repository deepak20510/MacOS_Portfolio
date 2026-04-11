import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { techStack, locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useWindowStore from "#store/window";

const SkillsOutput = () => (
  <div className="mt-4">
    <div className="label mb-4 opacity-50">
      <p className="w-32">Category</p>
      <p>Technologies</p>
    </div>
    <ul className="content space-y-2">
      {techStack.map(({ category, items }) => (
        <li key={category} className="flex">
          <Check className="text-[#00A154] mr-4" size={18} />
          <h3 className="font-semibold text-[#00A154] w-32">{category}</h3>
          <p className="flex-1 text-gray-400">
            {items.join(", ")}
          </p>
        </li>
      ))}
    </ul>
    <div className="footnote mt-6 text-[#00A154] border-t border-dashed border-gray-700 pt-4">
      <p className="flex items-center gap-2">
        <Check size={16} /> All stacks loaded successfully (100%)
      </p>
    </div>
  </div>
);

const Terminal = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { id: 0, command: "", output: "Welcome to DeepOS Terminal. Type 'help' for available commands." }
  ]);
  const { windows } = useWindowStore();
  const isOpen = windows.terminal.isOpen;
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let output = null;

      switch (cmd) {
        case "help":
          output = (
            <div className="text-gray-400 mt-2 ml-4">
              <p>Available commands:</p>
              <ul className="mt-1 space-y-1">
                <li><span className="text-[#00A154]">skills</span> - View tech stack</li>
                <li><span className="text-[#00A154]">projects</span> - Listed built projects</li>
                <li><span className="text-[#00A154]">whoami</span> - About the developer</li>
                <li><span className="text-[#00A154]">resume</span> - Open resume</li>
                <li><span className="text-[#00A154]">clear</span> - Clear terminal history</li>
              </ul>
            </div>
          );
          break;
        case "skills":
          output = <SkillsOutput />;
          break;
        case "projects":
          output = (
            <ul className="mt-2 ml-4 space-y-2">
              {locations.work.children.map(p => (
                <li key={p.id} className="text-[#00A154]">
                   ▶ {p.name}
                </li>
              ))}
            </ul>
          );
          break;
        case "whoami":
          output = (
            <div className="mt-2 ml-4 text-gray-400 max-w-lg leading-relaxed">
              {locations.about.children.find(c => c.fileType === "txt").description.map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
          );
          break;
        case "resume":
          output = "Opening resume...";
          window.open("/files/resume1.pdf", "_blank");
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "":
          output = "";
          break;
        default:
          output = `Command not found: ${cmd}. Type 'help' for assistance.`;
      }

      setHistory(prev => [...prev, { id: prev.length + 1, command: cmd, output }]);
      setInput("");
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      {isMobile ? (
        <MobileWindowHeader target="terminal" title="Tech Stack" />
      ) : (
        <div id="window-header">
          <WindowControls target="terminal"/>
          <h2>Terminal: @deepak — portfolio</h2>
        </div>
      )}
      <div 
        className="techstack flex-1 overflow-y-auto font-roboto p-5 selection:bg-[#00A154] selection:text-white"
        onClick={focusInput}
        ref={scrollRef}
        style={{ height: 'calc(100% - 40px)' }}
      >
        <div className="terminal-history">
          {history.map((item) => (
            <div key={item.id} className="mb-4">
              {item.command && (
                <p className="flex items-center">
                  <span className="font-bold text-[#00A154] mr-2">@deepak %</span>
                  <span className="dark:text-white text-black">{item.command}</span>
                </p>
              )}
              {item.output && <div className="terminal-output">{item.output}</div>}
            </div>
          ))}
        </div>

        <div className="terminal-prompt mt-2">
          <div className="flex items-center">
            <span className="font-bold text-[#00A154] mr-2">@deepak %</span>
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                autoFocus
                className="bg-transparent border-none outline-none dark:text-white text-black p-0 m-0 w-auto min-w-[1px] caret-transparent"
                style={{ width: `${input.length}ch` }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                spellCheck="false"
                autoComplete="off"
              />
              <span className="terminal-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
