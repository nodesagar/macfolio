import React from "react";
import WindowControls from "#components/WindowControls.jsx";
import windowWrapper from "../hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Text = () => {
    // const { data } = useWindowStore((s) => s.windows.txtfile);

    const { windows } = useWindowStore();
    const data = windows.txtfile?.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <div className="flex flex-col max-h-[80vh]">
            <div id="window-header" className="shrink-0">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
            </div>

            <div className="p-5 space-y-6 bg-white flex-1 overflow-y-auto">
                {image ? (

                    <div className="w-full">

                        <img
                            src={image}
                            alt={name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                ) : null}

                {subtitle ? (
                    <h3 className="text-lg font-semibold text-gray-600">
                        {subtitle}
                    </h3>

                ) : null}


                {Array.isArray(description) && description.length > 0 ? (

                    <div className="space-y-3 leading-relaxed textbase text-gray-800">
                        {description.map((para, idx) => (
                            <p key={idx}>
                                {Array.isArray(para)
                                    ? para.map((seg, i) =>
                                          typeof seg === "string" ? (
                                              seg
                                          ) : (
                                              <a
                                                  key={i}
                                                  href={seg.href}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 font-medium hover:underline"
                                              >
                                                  {seg.text}
                                              </a>
                                          ),
                                      )
                                    : para}
                            </p>
                        ))}


                    </div>
                ) : null}
            </div>
        </div>
    );
};

const TextWindow = windowWrapper(Text, "txtfile");

export default TextWindow;
