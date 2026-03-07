import React from "react";
import WindowControls from '#components/WindowControls.jsx';
import windowWrapper from "../hoc/WindowWrapper.jsx";
import { socials } from "#constants";

const Contact = () => {
  const socialOrder = ["Github", "LinkedIn", "Instagram", "Twitter/X"];
  const orderedSocials = [...socials].sort(
    (a, b) => socialOrder.indexOf(a.text) - socialOrder.indexOf(b.text)
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="contact-content">
        <div className="profile-pic">
          <img
            src="/images/me_2.jpg"
            alt="Sagar"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover scale-[1.5] object-top"
          />
        </div>

        <h3>Let's Connect</h3>
        <p className="intro-copy">Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p className="email">conveytosagar@gmail.com</p>

        <ul className="social-grid">
          {orderedSocials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ background: bg }} className="social-card">
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
