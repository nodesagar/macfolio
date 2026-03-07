import WindowControls from '#components/WindowControls.jsx';
import windowWrapper from '#hoc/WindowWrapper.jsx'
import { PanelLeft, ChevronLeft, ChevronRight, ShieldHalf, Search, Share, Plus, Copy, ExternalLink } from 'lucide-react';
import { blogPosts } from '#constants';
import React, { useEffect, useRef } from 'react'

const Safari = () => {
  const touchStateRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 639px)').matches) return undefined;

    const safariWindow = document.getElementById('safari');
    if (!safariWindow) return undefined;

    const handleTouchStart = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;

      touchStateRef.current = {
        startY: touch.clientY,
        startScrollTop: safariWindow.scrollTop,
      };
    };

    const handleTouchMove = (event) => {
      const touch = event.touches?.[0];
      const touchState = touchStateRef.current;
      if (!touch || !touchState) return;

      safariWindow.scrollTop = touchState.startScrollTop + (touchState.startY - touch.clientY);
    };

    const clearTouchState = () => {
      touchStateRef.current = null;
    };

    safariWindow.addEventListener('touchstart', handleTouchStart, { passive: true });
    safariWindow.addEventListener('touchmove', handleTouchMove, { passive: true });
    safariWindow.addEventListener('touchend', clearTouchState, { passive: true });
    safariWindow.addEventListener('touchcancel', clearTouchState, { passive: true });

    return () => {
      safariWindow.removeEventListener('touchstart', handleTouchStart);
      safariWindow.removeEventListener('touchmove', handleTouchMove);
      safariWindow.removeEventListener('touchend', clearTouchState);
      safariWindow.removeEventListener('touchcancel', clearTouchState);
    };
  }, []);

  return (
    <>
      <div id="window-header">

        <WindowControls target="safari" />
        <PanelLeft className="ml-10 icon max-sm:hidden" />

        <div className="flex items-center gap-1 ml-5 max-sm:ml-2">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>


        <div className="flex-1 flex items-center justify-center gap-3 max-sm:mx-2">
          <ShieldHalf className="icon max-sm:hidden" />

          <div className="search max-sm:w-full">
            <Search className="icon max-sm:hidden" />
            <input type="text" placeholder='Search or enter websitename' className='flex-1 w-full' />
          </div>
        </div>

        <div className="flex items-center gap-5 max-sm:hidden">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>

      </div>

      <div className="blog">
        <h2>My Blogs</h2>
        <div className="space-y-8 max-sm:space-y-4">
          {blogPosts.map(({ id, image, title, date, link }) => (
            <article key={id} className='blog-post'>
              <div className="thumb">
                <img src={image} alt={title} />
              </div>

              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Read More <ExternalLink size={14} className='icon-hover' />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>


    </>
  );
};

const SafariWindow = windowWrapper(Safari, "safari");

export default SafariWindow;
