import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants/index";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Photos = () => {
  const { openWindow, focusWindow } = useWindowStore();

  const handleImageClick = (img) => {
    openWindow("imgfile", {
      imageUrl: img,
      name: img.split("/").pop(),
    });
    focusWindow("imgfile");
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Photos</h2>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map((link) => (
              <li key={link.id}>
                <img src={link.icon} alt={link.title} />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map((item) => (
              <li key={item.id} onClick={() => handleImageClick(item.img)}>
                <img src={item.img} alt={`Gallery ${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
