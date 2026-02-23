import React from "react";
import WindowControls from "#components/WindowControls.jsx";
import windowWrapper from "../hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import { photosLinks, gallery } from "#constants";
import { Search, Mail } from "lucide-react";

const Photos = () => {
  const { openWindow } = useWindowStore();
  return (
    <div className="w-full h-full flex flex-col">
      <div id="window-header">
        <WindowControls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full flex-1 min-h-0">
        <div className="sidebar">
          <h3>Albums</h3>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
              >
                <img src={img} alt={`Gallery image ${id}`} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PhotosWindow = windowWrapper(Photos, "photos");
PhotosWindow.displayName = "Photos";

export default PhotosWindow;
