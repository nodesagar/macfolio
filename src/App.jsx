
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';


import { Navbar, Welcome, Dock } from '#components'
import React from 'react'
import Terminal from './windows/Terminal.jsx';
import Safari from '#windows/Safari.jsx';

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />


      <Terminal />

      <Safari/>



    </main>
  )
}

export default App
