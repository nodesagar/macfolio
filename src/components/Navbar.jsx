
import dayjs from 'dayjs';

import { navIcons, navLinks } from '#constants/index.js';
import React, { useEffect, useState } from 'react'
import useWindowStore from '#store/window.js';
import CatGuide from '#components/CatGuide.jsx';




const Navbar = () => {

    const openWindow = useWindowStore((s) => s.openWindow);
    // Minute-precision string: state only changes (and re-renders) when the minute flips.
    const [now, setNow] = useState(() => dayjs().format("YYYY-MM-DDTHH:mm"));

    useEffect(() => {
        const id = setInterval(() => setNow(dayjs().format("YYYY-MM-DDTHH:mm")), 1000);
        return () => clearInterval(id);
    }, []);

    return <nav>

        <div>

            <img src="/images/logo.svg" alt="logo" />
            <p className='font-bold'>Sagar's Portfolio</p>

            <ul>
                {navLinks.map(({ id, name, type }) => (
                    <li key={id}>
                        <button type="button" onClick={() => openWindow(type)}>
                            {name}
                        </button>
                    </li>
                ))}
            </ul>

        </div>



        <div>

            <CatGuide />

            <ul>
                {navIcons.map(({ id, img }) => (
                    <li key={id}>
                        <img src={img} className="icon-hover" alt={`icon-${id}`} />
                    </li>
                ))}

            </ul>

            <time dateTime={now}>{dayjs(now).format("ddd MMM D h:mm A")}</time>

        </div>
    </nav>
}

export default Navbar
