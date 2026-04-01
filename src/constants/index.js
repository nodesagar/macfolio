const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "March 14, 2024",
    title: "Making a Windows Laptop Faster",
    image: "/images/Windows-PNG-High-Quality-Image.png",
    link: "https://www.notion.so/ocean07/Making-a-Windows-Laptop-Faster-c32044b28bf342b3b51b617369c68c95",
  },
  {
    id: 2,
    date: "Nov 02, 2023",
    title: "The Best Laptop Buying Guide",
    image: "/images/laptop_icon.png",
    link: "https://www.notion.so/ocean07/Laptop-Buying-Guide-4c1fb5f41897481bbe2d7a198e3a0ca1",
  },
  {
    id: 3,
    date: "Jan 18, 2024",
    title: "Micro Habits Manipulators",
    image: "/images/habits-word.png",
    link: "https://www.notion.so/ocean07/MICRO-HABITS-MANIPULATORS-b71ff084887c466db9233c85dee1fb21",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  {
    category: "Mobile",
    items: ["AndriodStudio", "Kotlin", "Flutter", "Dart"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", " NestJS", "Hono"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "Insomnia", "Figma"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "linear-gradient(135deg, #24292f 0%, #2ea043 100%)",
    link: "https://github.com/nodesagar",
  },
  {
    id: 2,
    text: "Instagram",
    icon: "/icons/instagram.svg",
    bg: "linear-gradient(135deg, #f58529 0%, #dd2a7b 35%, #8134af 65%, #515bd4 100%)",
    link: "https://www.instagram.com/nodesagar/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#000000",
    link: "https://x.com/nodesagar",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#0a66c2",
    link: "https://www.linkedin.com/in/nodesagar",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
    album: "library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
    album: "memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
    album: "places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
    album: "people",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
    album: "favorites",
  },
];

const gallery = [
  {
    id: 1,
    name: "Google Campus View",
    img: "/images/google_landscape.jpg",
    albums: ["library", "places", "favorites"],
  },
  {
    id: 2,
    name: "Amazon Visit",
    img: "/images/amazon_visit.jpeg",
    albums: ["library", "memories", "people"],
  },
  {
    id: 3,
    name: "Microsoft Visit",
    img: "/images/microsoft_2_sm.jpg",
    albums: ["library", "memories", "people", "favorites"],
  },
  {
    id: 4,
    name: "Apple Visit",
    img: "/images/apple_visit.jpeg",
    albums: ["library", "memories", "people", "places"],
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Build3X Cohort Website",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Build3X Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "The Build3X S1 website is a modern and structured platform designed for an intensive 3-week virtual web development bootcamp.",
            "It offers a focused learning experience where participants tackle weekly problem statements to build real-world projects, guided by experienced mentors and supported by a collaborative community.",
            "With a clean, professional layout powered by modern web technologies, the site emphasizes hands-on learning, portfolio development, and skill growth—perfect for students and developers looking to level up in a short, immersive timeframe.",
          ],
        },
        {
          id: 2,
          name: "build3x",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://build3-x.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "build3x.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-36 left-40",
          imageUrl: "/images/build3x_home.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        //   position: "top-60 right-20",
        // },
      ],
    },
    // ▶ Project 2
    {
      id: 8,
      name: "ParseCal",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[20vh] left-5",
      children: [
        {
          id: 1,
          name: "ParseCal Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-12 left-16",
          description: [
            "ParseCal is an AI-powered schedule parser designed to simplify your calendar management.",
            "It automatically extracts events from PDFs, images, and raw text using Gemini APIs, directly syncing them into your Google Calendar.",
            "Built with React, TypeScript, and Google Calendar OAuth, it offers real-time synchronization and a seamless user experience.",
          ],
        },
        {
          id: 2,
          name: "parsecal",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://parsecal.vercel.app/",
          position: "top-20 right-32",
        },
        {
          id: 3,
          name: "parsecal.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-44 left-56",
          imageUrl: "/images/parsecal_ui.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/me_2.jpg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/landour_sagar_md.JPG",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-90",
      imageUrl: "/images/apple_visit.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-12 left-65",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/me_badhraj_temple.jpg",
      description: [
        "Hey! I’m Sagar 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  contact: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  resume: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  safari: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  photos: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  terminal: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  txtfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  imgfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
