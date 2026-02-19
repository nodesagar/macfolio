
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';


import { Navbar, Welcome, Dock } from '#components'
import React from 'react'
import { Terminal, Safari, Resume, Finder } from '#windows/index.js';

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />


      <Terminal />

      <Safari />
      <Resume />

      <Finder />



    </main>
  )
}

export default App
