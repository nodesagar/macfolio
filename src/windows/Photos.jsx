import React from "react";
import WindowControls from "#components/WindowControls.jsx";
import windowWrapper from "../hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import { photosLinks, gallery } from "#constants";
import { Search, Mail } from "lucide-react";

const Photos = () => {
  const { openWindow } = useWindowStore();
  const libraryAlbum = photosLinks.find(({ album }) => album === "library") ?? photosLinks[0];
  const libraryPhotos = gallery.filter(({ albums }) => albums.includes("library"));

  const openImage = ({ id, name, img }) =>
    openWindow("imgfile", {
      id,
      name,
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: img,
    });

  const getTileClass = (index) => `gallery-item-${(index % 4) + 1}`;

  return (
    <div className="w-full h-full flex flex-col">
      <div id="window-header">
        <WindowControls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full flex-1 min-h-0 max-sm:flex-col">
        <div className="sidebar">
          <h2>Albums</h2>
          <ul>
            {libraryAlbum ? (
              <li key={libraryAlbum.id}>
                <button type="button" className="active">
                  <span className="album-label">
                    <img src={libraryAlbum.icon} alt="" aria-hidden="true" />
                    <p>{libraryAlbum.title}</p>
                  </span>
                  <span className="album-count">{libraryPhotos.length}</span>
                </button>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="gallery">
          {libraryPhotos.length ? (
            <ul>
              {libraryPhotos.map((photo, index) => (
                <li key={photo.id} className={getTileClass(index)}>
                  <button
                    type="button"
                    className="gallery-card"
                    onClick={() => openImage(photo)}
                    aria-label={`Open ${photo.name}`}
                  >
                    <img
                      src={photo.img}
                      alt={photo.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="gallery-empty">
              <p>No photos in this album yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PhotosWindow = windowWrapper(Photos, "photos");
PhotosWindow.displayName = "Photos";

export default PhotosWindow;
