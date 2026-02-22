
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';


import { Navbar, Welcome, Dock, Home } from '#components'
import React from 'react'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos } from '#windows/index.js';

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
      <Text />
      <Image />
      <Contact />
      <Home />
      <Photos/>



    </main>
  )
}

export default App
