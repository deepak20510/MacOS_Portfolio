import dayjs from "dayjs";
import { navIcons, navLinks } from "../constants";
import useWindowStore from "#store/window";
import ThemeToggleButton from "#components/ThemeToggleButton";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img
          src="/images/logo.svg"
          className="icon-hover nav-icon"
          alt="logo"
        />
        <p className="font-bold">Deepak's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              {img === "/icons/mode.svg" ? (
                <ThemeToggleButton />
              ) : (
                <img
                  src={img}
                  className="icon-hover nav-icon"
                  alt={`icon-${id}`}
                />
              )}
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd MM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
