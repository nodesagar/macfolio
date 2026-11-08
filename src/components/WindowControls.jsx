import React from 'react'
import useWindowStore from '../store/window.js';

const WindowControls = ({ target }) => {

  const closeWindow = useWindowStore((s) => s.closeWindow);

  return (
    <div id="window-controls">
      <button type="button" className="close" aria-label="Close window" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />


    </div>
  );
};

export default WindowControls;
