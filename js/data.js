/* ─── SKILL TABS DATA ─── */
const TABS = [
  {s:[{n:'Vue.js',i:'💚'},{n:'Nuxt.js',i:'🚀'},{n:'JavaScript',i:'⚡'},{n:'HTML5',i:'🌐'},{n:'CSS3',i:'🎨'},{n:'Tailwind CSS',i:'🌊'}]},
  {s:[{n:'Node.js',i:'🟢'},{n:'Express.js',i:'⚙️'},{n:'MongoDB',i:'🍃'},{n:'REST APIs',i:'🔌'},{n:'SQL',i:'🗄️'}]},
  {s:[{n:'Git',i:'🔀'},{n:'GitHub',i:'🐙'},{n:'VS Code',i:'💻'},{n:'npm',i:'📦'},{n:'Postman',i:'📬'},{n:'Linux',i:'🐧'}]}
];

/* ─── SKILL GROUPS DATA (for dedicated skills section) ─── */
const SKILL_GROUPS = [
  {
    title:'Frontend',icon:'🎨',
    skills:[{n:'Vue.js',i:'💚'},{n:'Nuxt.js',i:'🚀'},{n:'JavaScript',i:'⚡'},{n:'HTML5',i:'🌐'},{n:'CSS3',i:'🎨'},{n:'Tailwind CSS',i:'🌊'},{n:'Responsive UI',i:'📱'}]
  },
  {
    title:'Backend',icon:'⚙️',
    skills:[{n:'Node.js',i:'🟢'},{n:'Express.js',i:'⚙️'},{n:'MongoDB',i:'🍃'},{n:'REST APIs',i:'🔌'},{n:'JWT Auth',i:'🔐'},{n:'SQL',i:'🗄️'}]
  },
  {
    title:'Tools & More',icon:'🔧',
    skills:[{n:'Git',i:'🔀'},{n:'GitHub',i:'🐙'},{n:'VS Code',i:'💻'},{n:'npm',i:'📦'},{n:'Postman',i:'📬'},{n:'Linux',i:'🐧'},{n:'Docker',i:'🐳'}]
  }
];

/* ─── SKILL BARS DATA ─── */
const BARS = [
  {n:'HTML/CSS',p:92,c:'#e34f26'},{n:'JavaScript (ES6+)',p:90,c:'#f7df1e'},
  {n:'Git',p:88,c:'#f05032'},{n:'Vue.js',p:85,c:'#00c896'},
  {n:'Node.js',p:82,c:'#68a063'},{n:'Express.js',p:80,c:'#00c896'},
  {n:'MongoDB',p:78,c:'#4db33d'},{n:'Nuxt.js',p:75,c:'#2fffc0'},
  {n:'SQL',p:70,c:'#00618a'}
];

/* ─── TOOLS MARQUEE DATA ─── */
const TOOLS = ['Vue.js','Nuxt.js','Node.js','Express.js','MongoDB','JavaScript','HTML5','CSS3','Tailwind CSS','Git'];
const TICONS = {
  'Vue.js':'💚','Nuxt.js':'🚀','Node.js':'🟢','Express.js':'⚙️','MongoDB':'🍃',
  'JavaScript':'⚡','HTML5':'🌐','CSS3':'🎨','Tailwind CSS':'🌊','Git':'🔀'
};

/* ─── PROJECTS DATA ─── */
const PJS = [
  {id:1,title:'TaskFlow',cat:'Full-Stack',feat:true,
   desc:'Full-stack task management app with real-time updates, JWT auth, and a drag-and-drop kanban board.',
   full:'TaskFlow is a production-grade task management platform built with the MEVN stack. Features JWT-based authentication, real-time board updates using WebSockets, drag-and-drop task reordering, team collaboration, and a responsive Vue.js dashboard.',
   hl:['JWT authentication & authorization','Real-time updates via WebSockets','Drag-and-drop kanban board','RESTful API with Express.js & MongoDB'],
   imgUrl:'https://placehold.co/600x340/010810/00c896?text=TaskFlow',
   tech:['Vue.js','Node.js','Express.js','MongoDB','WebSockets','JWT'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:2,title:'ShopNest',cat:'Full-Stack',feat:true,
   desc:'E-commerce platform with SSR via Nuxt.js, product catalog, cart management, and Stripe payments.',
   full:'ShopNest is a modern e-commerce solution built with Nuxt.js for SSR/SEO, Express.js backend, and MongoDB for flexible product data. Includes full shopping cart, order management, admin dashboard, and Stripe payment integration.',
   hl:['Server-side rendering with Nuxt.js','Stripe payment gateway integration','Admin product management panel','Order tracking & email notifications'],
   imgUrl:'https://placehold.co/600x340/02111c/2fffc0?text=ShopNest',
   tech:['Nuxt.js','Node.js','Express.js','MongoDB','Stripe'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:3,title:'DevConnect',cat:'Full-Stack',feat:false,
   desc:'Developer Q&A forum with voting, markdown rendering, tags, and a gamified reputation system.',
   full:'DevConnect is a Stack Overflow-inspired Q&A platform for developers. Built with Vue.js + Node.js + MongoDB. Supports markdown-rendered answers, upvote/downvote logic, tag-based search, reputation points, and detailed user profiles.',
   hl:['Markdown rendering for code answers','Tag-based search & filtering','Reputation & badge system','User profile with contribution history'],
   imgUrl:'https://placehold.co/600x340/061522/f5c842?text=DevConnect',
   tech:['Vue.js','Node.js','MongoDB','Markdown','REST API'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:4,title:'WeatherLens',cat:'Frontend',feat:false,
   desc:'Interactive weather dashboard with 7-day forecasts, animated charts, and geolocation support.',
   full:'WeatherLens is a sleek weather dashboard built with Vue.js. Integrates OpenWeatherMap API for real-time weather data, 7-day forecasts, and hourly breakdowns. Features Chart.js-powered animated graphs, geolocation support, and saved locations.',
   hl:['Real-time weather from OpenWeatherMap API','Interactive Chart.js temperature/humidity graphs','Geolocation & saved cities','Dark/light mode with smooth transitions'],
   imgUrl:'https://placehold.co/600x340/010810/3b82f6?text=WeatherLens',
   tech:['Vue.js','Chart.js','OpenWeather API','Tailwind CSS'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:5,title:'NoteVault',cat:'Full-Stack',feat:false,
   desc:'Markdown note-taking app with folders, full-text search, live preview, and real-time cloud sync.',
   full:'NoteVault is a developer-focused note-taking app. Write notes in Markdown with live preview, organize with nested folders and tags, and sync instantly across devices via a Node.js + MongoDB backend. Includes full-text search, export to PDF, and public sharing.',
   hl:['Live Markdown preview editor','Nested folder & tag organization','Full-text search across all notes','One-click public sharing via URL'],
   imgUrl:'https://placehold.co/600x340/0a1e30/00c896?text=NoteVault',
   tech:['Vue.js','Node.js','MongoDB','Markdown','REST API'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:6,title:'PortfolioCMS',cat:'Full-Stack',feat:false,
   desc:'Self-hosted headless CMS for developers to manage portfolio content without touching code.',
   full:'PortfolioCMS is a headless content management system designed for developer portfolios. Built with the MEVN stack, it provides a clean admin interface to manage projects, skills, and blog posts. Content is served via a REST API to any static frontend.',
   hl:['Headless REST API for any frontend','Rich text editor with media uploads','Role-based access control (RBAC)','One-command Docker deployment'],
   imgUrl:'https://placehold.co/600x340/02111c/00c896?text=PortfolioCMS',
   tech:['Vue.js','Node.js','Express.js','MongoDB','Docker','REST API'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'}
];

/* ─── ATTACH PROJECT IMAGES ─── */
PJS.forEach(p => {
  p.img = p.imgUrl || '';
});
