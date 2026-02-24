# 🍏 Macfolio

> A modern, interactive personal portfolio website inspired by the macOS desktop environment. Built with React, Vite, Tailwind CSS v4, and GSAP.

Welcome to Macfolio! This project transforms a standard web portfolio into an interactive, fun, and engaging macOS-like desktop experience. Users can open "apps," drag windows around, read text files, browse photo galleries, and even open a Terminal—all straight from their browser.

## ✨ Features

- **macOS Desktop Interface:** A familiar, sleek desktop layout with a functional Dock and Navbar.
- **Draggable Windows:** powered by GSAP's `Draggable` plugin, allowing you to freely move apps around the screen.
- **Window Management System:** Custom state management using `Zustand` to handle window opening, closing, focusing, and z-index ordering natively.
- **Built-in Apps:**
  - 📁 **Finder:** Browse through multiple projects, open text descriptions, and view project images.
  - 🌐 **Safari (Articles):** Quickly explore latest blog posts and external articles.
  - 🖼️ **Photos (Gallery):** A fully functional image gallery categorizing memories and library photos.
  - 👨‍💻 **Terminal (Skills):** A command-line inspired view showcasing frontend, backend, and mobile development skills.
  - 📝 **Text Editor:** Read `.txt` files containing project details and detailed "About Me" summaries.
  - 📄 **Resume Viewer:** Integrated PDF viewing using `react-pdf`.
  - 📇 **Contact:** A dedicated app to get in touch and find social links.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations & Interaction:** [GSAP](https://gsap.com/) + GSAP Draggable
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **PDF Rendering:** [React-PDF](https://github.com/wojtekmaj/react-pdf)
- **Date Formatting:** [Day.js](https://day.js.org/)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nodesagar/macfolio.git
   cd macfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

- `src/components/`: Core UI chunks like Navbar, Dock, and Welcome screen.
- `src/windows/`: Contains all the individual "App" components (Finder, Safari, Terminal, etc.).
- `src/store/`: Zustand stores for global state management (handling window focus/stacking and locations).
- `src/constants/`: Centralized data regarding projects, tech stack, blog posts, and dock apps.

## 💡 Inspiration
This project was heavily inspired by the clean, intuitive design of Apple's macOS desktop. The primary goal was to create a portfolio that doesn't just passively display information, but rather offers an explorative, interactive, and nostalgic user experience.

## 📫 Let's Connect!
If you like how this portfolio looks and performs, or if you just want to talk about front-end web development, feel free to reach out!

- **X (Twitter)**: [@nodesagar](https://x.com/nodesagar)
- **LinkedIn**: [in/nodesagar](https://www.linkedin.com/in/nodesagar/)
- **Instagram**: [@nodesagar](https://www.instagram.com/nodesagar/)
- **Github**: [@nodesagar](https://github.com/nodesagar)

<br/>

<p align="center">
  Built with ❤️ and ☕ by <b>Sagar</b><br>
  <i>If you found this project cool, consider giving it a ⭐!</i>
</p>
