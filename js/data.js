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
  {id:1,title:'Finance Flare',cat:'C++ Engineering',feat:true,
   desc:'C++ OOP system with custom Data Structures & Algorithms for financial forecasting. Integrated with Power BI & Excel.',
   full:'Built with C++ and OOP principles, utilizing custom Data Structures and Algorithms for financial forecasting. Features real-time expense tracking, income categorization, investment portfolio analysis, and predictive financial modeling.',
   hl:['Real-time expense tracking','Investment portfolio analysis','Predictive financial modeling','Excel & Power BI integration'],
   img:IMG_PROJ5,
   tech:['C++','OOP','Data Structures','Algorithms','Excel','Power BI'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:2,title:'Bank Management System',cat:'C++ Engineering',feat:false,
   desc:'Secure authentication and robust transactional logic powered by a C++ backend ensuring data integrity.',
   full:'Features Secure Authentication and robust Transactional Logic powered by a C++ backend, ensuring data integrity and system reliability. Implements sophisticated OOP design patterns and efficient data structures for transaction processing.',
   hl:['Secure authentication','Transaction processing','Loan management','Financial reporting'],
   img:IMG_PROJ4,
   tech:['C++','OOP','Data Structures','Algorithms'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:3,title:'Sales Performance Analytics',cat:'Data Analytics',feat:true,
   desc:'Predictive analytics and regional trend forecasting delivering actionable data storytelling & KPI tracking.',
   full:'Incorporates Predictive Analytics and Regional Trend Forecasting to deliver actionable data storytelling and strategic business insights. Built using Power BI for dynamic visualizations, Excel for data preprocessing, and SQL for database management.',
   hl:['Real-time KPI monitoring','Regional comparison','Customer segmentation','Drill-down capabilities'],
   img:IMG_PROJ3,
   tech:['Power BI','SQL','Excel','Data Analysis'],
   github:'https://github.com/HusseinHany/Sales',live:'https://github.com/HusseinHany/Sales'},
  {id:4,title:'Candy Line Sales Overview',cat:'Data Analytics',feat:false,
   desc:'Geographical sales mapping with predictive analytics and automated KPI tracking via Power BI.',
   full:'Incorporates Predictive Analytics and Regional Trend Forecasting to deliver actionable data storytelling. Developed using Power BI for advanced visualizations, SQL for data extraction, and Excel for statistical analysis.',
   hl:['Profit margin analysis','Geographical mapping','Seasonal trend forecasting','Automated KPI tracking'],
   img:IMG_PROJ1,
   tech:['Power BI','SQL','Excel','Statistical Analysis'],
   github:'https://github.com/HusseinHany/Sales',live:'https://github.com/HusseinHany/Sales'},
  {id:5,title:'InsightFlow Dashboard',cat:'Data Analytics',feat:false,
   desc:'Smart sales & profit dashboard with predictive modeling, city-level breakdowns, and interactive charts.',
   full:'InsightFlow is a smart sales and profit dashboard incorporating predictive analytics and regional trend forecasting with automated reporting. Built with Power BI for interactive dashboards and Excel for advanced data modeling.',
   hl:['Predictive analytics','City-level breakdown','Automated reporting','Top employee tracking'],
   img:IMG_PROJ2,
   tech:['Power BI','Excel','Data Visualization','Predictive Analytics'],
   github:'https://github.com/HusseinHany/Sales',live:'https://github.com/HusseinHany/Sales'}
];
