import React from "react";
import WindowControls from "#components/WindowControls.jsx";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import windowWrapper from "../hoc/WindowWrapper.jsx";
import { locations, myProjects, freelanceProjects } from "#constants";
import useLocationStore from "../store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";

const Finder = () => {
  const { openWindow } = useWindowStore();

  const { activeLocation, setActiveLocation } = useLocationStore();

  const getParentLocation = (location) => {
    if (!location) return null;
    if (Object.values(locations).some((loc) => loc.id === location.id)) {
      return null;
    }
    for (const rootLoc of Object.values(locations)) {
      if (rootLoc.children?.some((child) => child.id === location.id)) {
        return rootLoc;
      }
    }
    return null;
  };

  const parentLocation = getParentLocation(activeLocation);

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.fileType === "txt") return openWindow("txtfile", item);
    if (item.fileType === "img") return openWindow("imgfile", item);
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />

            <p className="text-sm font font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex-1 flex min-h-0 max-sm:flex-col">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", myProjects)}
          {renderList("Freelance", freelanceProjects)}
        </div>

        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <div className="px-6 py-2 bg-gray-50 border-b border-gray-150 flex items-center justify-between text-xs text-gray-500 select-none shrink-0 max-sm:px-4">
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-400">Portfolio</span>
              <ChevronRight size={12} className="text-gray-300" />
              {parentLocation ? (
                <>
                  <button 
                    type="button"
                    onClick={() => setActiveLocation(parentLocation)}
                    className="hover:text-blue-600 hover:underline cursor-pointer font-medium"
                  >
                    {parentLocation.name}
                  </button>
                  <ChevronRight size={12} className="text-gray-300" />
                  <span className="font-semibold text-gray-800">{activeLocation.name}</span>
                </>
              ) : (
                <span className="font-semibold text-gray-800">{activeLocation.name}</span>
              )}
            </div>
            
            {parentLocation && (
              <button
                type="button"
                onClick={() => setActiveLocation(parentLocation)}
                className="flex items-center gap-0.5 font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <ChevronLeft size={14} />
                Back
              </button>
            )}
          </div>

          <ul className="content flex-1 max-sm:overflow-y-auto">
            {activeLocation &&
              activeLocation.children?.map((item) => (
                <li
                  key={item.id}
                  className={item.position}
                  onClick={(e) => { e.stopPropagation(); openItem(item); }}
                >
                  <img src={item.icon} alt={item.name} />
                  <p>{item.name}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;
