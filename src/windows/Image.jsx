import React from "react";
import WindowControls from "#components/WindowControls.jsx";
import windowWrapper from "../hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <p>{name}</p>
            </div>

            <div className="preview">
                {imageUrl ?
                    <img
                        src={imageUrl}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                    />
                    : null}
            </div>
        </>
    );
};

const ImageWindow = windowWrapper(Image, "imgfile");

export default ImageWindow;
