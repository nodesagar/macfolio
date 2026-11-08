import React from "react";
import { locations } from "#constants";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window";
import useLocationStore from "../store/location.js";

const projects = (locations.work.children ?? []).filter((p) => !p.hideFromDesktop);

const Home = () => {
    const setActiveLocation = useLocationStore((s) => s.setActiveLocation);
    const openWindow = useWindowStore((s) => s.openWindow);

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");

    };

    useGSAP(() => {
        if (window.matchMedia('(min-width: 640px)').matches) {
            Draggable.create(".folder");
        }
    }, []);

    return (
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder", project.windowPosition)}
                        onClick={() => handleOpenProjectFinder(project)}
                    >
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;
