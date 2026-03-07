import React, { useLayoutEffect, useRef } from 'react'
import useWindowStore from '../store/window.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const windowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {

        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);


        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";

            gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                });

        }, [isOpen]);



        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            // Only enable Draggable on desktop
            const isDesktop = window.matchMedia('(min-width: 640px)').matches;
            if (!isDesktop) return;

            const [instance] = Draggable.create(el, {
                onPress: () =>
                    focusWindow(windowKey)
            });

            return () => instance.kill();
        }, [isOpen]);




        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);


        if (!isOpen) return null;

        return (<section
            id={windowKey}
            ref={ref}
            style={{ zIndex }}
            className="absolute max-sm:!fixed max-sm:!inset-0 max-sm:!w-full max-sm:!h-full max-sm:!rounded-none max-sm:!z-[9999] max-sm:!transform-none shadow-2xl drop-shadow-2xl overflow-hidden"
            onClick={() => focusWindow(windowKey)}
        >

            <Component {...props} />
        </section>

        );

    };

    Wrapped.displayName = `windowWrapper(${Component.displayName || Component.name || 'Component'})`;
    return Wrapped;
};

export default windowWrapper;
