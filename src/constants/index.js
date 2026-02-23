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
    bg: "#f4656b",
    link: "https://github.com/nodesagar",
  },
  {
    id: 2,
    text: "Instagram",
    icon: "/icons/instagram.svg",
    bg: "#4bcb63",
    link: "https://www.instagram.com/nodesagar/",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/nodesagar",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/nodesagar",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/google_landscape.jpg",
  },
  {
    id: 2,
    img: "/images/amazon_visit.jpeg",
  },
  {
    id: 3,
    img: "/images/microsoft_2_sm.jpg",
  },
  {
    id: 4,
    img: "/images/apple_visit.jpeg",
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

    // // ▶ Project 2
    // {
    //   id: 6,
    //   name: "AI Resume Analyzer",
    //   icon: "/images/folder.png",
    //   kind: "folder",
    //   position: "top-52 right-80",
    //   windowPosition: "top-[20vh] left-7",
    //   children: [
    //     {
    //       id: 1,
    //       name: "AI Resume Analyzer Project.txt",
    //       icon: "/images/txt.png",
    //       kind: "file",
    //       fileType: "txt",
    //       position: "top-5 right-10",
    //       description: [
    //         "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
    //         "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
    //         "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
    //         "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "ai-resume-analyzer.com",
    //       icon: "/images/safari.png",
    //       kind: "file",
    //       fileType: "url",
    //       href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
    //       position: "top-20 left-20",
    //     },
    //     {
    //       id: 4,
    //       name: "ai-resume-analyzer.png",
    //       icon: "/images/image.png",
    //       kind: "file",
    //       fileType: "img",
    //       position: "top-52 left-80",
    //       imageUrl: "/images/project-2.png",
    //     },
    //     {
    //       id: 5,
    //       name: "Design.fig",
    //       icon: "/images/plain.png",
    //       kind: "file",
    //       fileType: "fig",
    //       href: "https://google.com",
    //       position: "top-60 left-5",
    //     },
    //   ],
    // },

    // // ▶ Project 3
    // {
    //   id: 7,
    //   name: "Food Delivery App",
    //   icon: "/images/folder.png",
    //   kind: "folder",
    //   position: "top-10 left-80",
    //   windowPosition: "top-[33vh] left-7",
    //   children: [
    //     {
    //       id: 1,
    //       name: "Food Delivery App Project.txt",
    //       icon: "/images/txt.png",
    //       kind: "file",
    //       fileType: "txt",
    //       position: "top-5 left-10",
    //       description: [
    //         "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
    //         "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
    //         "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
    //         "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
    //       ],
    //     },
    //     {
    //       id: 2,
    //       name: "food-delivery-app.com",
    //       icon: "/images/safari.png",
    //       kind: "file",
    //       fileType: "url",
    //       href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
    //       position: "top-10 right-20",
    //     },
    //     {
    //       id: 4,
    //       name: "food-delivery-app.png",
    //       icon: "/images/image.png",
    //       kind: "file",
    //       fileType: "img",
    //       position: "top-52 right-80",
    //       imageUrl: "/images/project-3.png",
    //     },
    //     {
    //       id: 5,
    //       name: "Design.fig",
    //       icon: "/images/plain.png",
    //       kind: "file",
    //       fileType: "fig",
    //       href: "https://google.com",
    //       position: "top-60 right-20",
    //     },
    //   ],
    // },
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
    // {
    //   id: 1,
    //   name: "trash1.png",
    //   icon: "/images/image.png",
    //   kind: "file",
    //   fileType: "img",
    //   position: "top-10 left-10",
    //   imageUrl: "/images/trash-1.png",
    // },
    // {
    //   id: 2,
    //   name: "trash2.png",
    //   icon: "/images/image.png",
    //   kind: "file",
    //   fileType: "img",
    //   position: "top-40 left-80",
    //   imageUrl: "/images/trash-2.png",
    // },
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
