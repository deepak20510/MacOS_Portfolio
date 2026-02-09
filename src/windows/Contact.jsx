import WindowControls from "#components/WindowControls";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { useState, useEffect } from "react";
const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileWindowHeader target="contact" title="Contact Me" />
      ) : (
        <div id="window-header">
          <WindowControls target="contact" />
          <h2>Contact Me</h2>
        </div>
      )}
      <div className="p-5 space-y-5">
        <img
          src="/images/deepak-2.png"
          alt="Deepak"
          className="w-20 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p>Got a bug to squash? Or just wanna talk tech? I'm in.</p>
        <p>deepakmahato20510@gmail.com</p>
        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" /> <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
