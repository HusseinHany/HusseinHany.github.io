/* ─── SKILL TABS DATA ─── */
const TABS = [
  {s:[{n:'C++',i:'⚙️'},{n:'C#',i:'🔷'},{n:'Python',i:'🐍'},{n:'Java',i:'☕'},{n:'SQL',i:'🗄️'}]},
  {s:[{n:'Excel',i:'📗'},{n:'Power BI',i:'📊'},{n:'Tableau',i:'📈'}]},
  {s:[{n:'Problem Solving',i:'💡'},{n:'Data Storytelling',i:'💬'},{n:'Strategic Thinking',i:'♟️'},{n:'Data Visualization',i:'📐'},{n:'Critical Analysis',i:'🔍'},{n:'Communication',i:'📣'}]}
];

/* ─── SKILL BARS DATA ─── */
const BARS = [
  {n:'Excel',p:92,c:'#00c896'},{n:'Problem Solving',p:92,c:'#2fffc0'},
  {n:'C++',p:90,c:'#00c896'},{n:'Power BI',p:88,c:'#f5c842'},
  {n:'SQL',p:88,c:'#00c896'},{n:'Python',p:85,c:'#3776ab'},
  {n:'Tableau',p:82,c:'#e97627'},{n:'C#',p:78,c:'#9b4de0'},
  {n:'Java',p:75,c:'#f89820'}
];

/* ─── TOOLS MARQUEE DATA ─── */
const TOOLS = ['C++','C#','Python','Java','SQL','Excel','Power BI','Tableau','Problem Solving','Data Analysis'];
const TICONS = {
  'C++':'⚙️','C#':'🔷','Python':'🐍','Java':'☕','SQL':'🗄️',
  'Excel':'📗','Power BI':'📊','Tableau':'📈','Problem Solving':'💡','Data Analysis':'📐'
};

/* ─── PROJECTS DATA ─── */
const PJS = [
  {id:1,title:'Finance Flare',cat:'C++ Engineering',feat:true,
   desc:'C++ OOP system with custom Data Structures & Algorithms for financial forecasting, integrated with Power BI & Excel.',
   full:'Built with C++ and OOP principles, utilizing custom Data Structures and Algorithms for financial forecasting. Features real-time expense tracking, income categorization, investment portfolio analysis, and predictive financial modeling.',
   hl:['Real-time expense tracking','Investment portfolio analysis','Predictive financial modeling','Excel & Power BI integration'],
   imgK:'IMG_PROJ5',tech:['C++','OOP','Data Structures','Algorithms','Excel','Power BI'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:2,title:'Bank Management System',cat:'C++ Engineering',feat:false,
   desc:'Secure C++ backend with authentication and transactional logic ensuring full data integrity.',
   full:'Features Secure Authentication and robust Transactional Logic powered by a C++ backend, ensuring data integrity and system reliability. Implements OOP design patterns and efficient data structures.',
   hl:['Secure authentication','Transaction processing','Loan management','Financial reporting'],
   imgK:'IMG_PROJ4',tech:['C++','OOP','Data Structures','Algorithms'],
   github:'https://github.com/HusseinHany',live:'https://github.com/HusseinHany'},
  {id:3,title:'Sales Performance Analytics',cat:'Data Analytics',feat:true,
   desc:'Predictive analytics and regional trend forecasting delivering actionable KPI dashboards.',
   full:'Incorporates Predictive Analytics and Regional Trend Forecasting to deliver actionable data storytelling. Built using Power BI for dynamic visualizations, Excel for data preprocessing, and SQL for database management.',
   hl:['Real-time KPI monitoring','Regional comparison','Customer segmentation','Drill-down capabilities'],
   imgK:'IMG_PROJ3',tech:['Power BI','SQL','Excel','Data Analysis'],
   github:'https://github.com/HusseinHany/Sales',live:'https://github.com/HusseinHany/Sales'},
  {id:4,title:'Candy Line Sales Overview',cat:'Data Analytics',feat:false,
   desc:'Geographical sales mapping with predictive analytics and automated KPI tracking.',
   full:'Incorporates Predictive Analytics and Regional Trend Forecasting. Developed using Power BI for advanced visualizations, SQL for data extraction, and Excel for statistical analysis.',
   hl:['Profit margin analysis','Geographical mapping','Seasonal trend forecasting','Automated KPI tracking'],
   imgK:'IMG_PROJ1',tech:['Power BI','SQL','Excel','Statistical Analysis'],
   github:'https://github.com/HusseinHany/Sales',live:'https://github.com/HusseinHany/Sales'},
  {id:5,title:'InsightFlow Dashboard',cat:'Data Analytics',feat:false,
   desc:'Smart sales & profit dashboard with predictive modeling, city-level breakdowns, and interactive charts.',
   full:'Smart sales and profit dashboard with predictive analytics and regional trend forecasting. Built with Power BI for interactive dashboards and advanced Excel data modeling.',
   hl:['Predictive analytics','City-level breakdown','Automated reporting','Top employee tracking'],
   imgK:'IMG_PROJ2',tech:['Power BI','Excel','Data Visualization','Predictive Analytics'],
   github:'https://github.com/HusseinHany/Sales',live:'https://github.com/HusseinHany/Sales'}
];

/* ─── ATTACH PROJECT IMAGES ─── */
PJS.forEach(p => {
  try { p.img = eval(p.imgK); } catch(e) { p.img = ''; }
});
