import React from "react";
import WindowControls from '#components/WindowControls.jsx';
import windowWrapper from "../hoc/WindowWrapper.jsx";
import { socials } from "#constants";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5 ">
        <img
          src="/images/landour_sagar_sm.JPG"
          alt="Sagar"
          loading="lazy"
          decoding="async"
          className="w-40 aspect-square object-cover rounded-full"
        />

        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p>conveytosagar@gmail.com</p>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = windowWrapper(Contact, "contact");

export default ContactWindow;
