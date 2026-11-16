/* ─── SKILL TABS DATA ─── */
const TABS = [
  {s:[{n:'Python',i:'🐍'},{n:'pandas',i:'🐼'},{n:'SQL',i:'🗄️'},{n:'Power BI',i:'📊'},{n:'Excel',i:'📗'},{n:'Statistics',i:'📈'}]},
  {s:[{n:'C++',i:'⚙️'},{n:'C#',i:'🟣'},{n:'JavaScript',i:'⚡'},{n:'Data Structures',i:'🌳'},{n:'Algorithms',i:'🧮'},{n:'OOP',i:'🧱'}]},
  {s:[{n:'Git',i:'🔀'},{n:'GitHub',i:'🐙'},{n:'Jupyter',i:'📓'},{n:'Visual Studio',i:'💻'},{n:'SQL Server',i:'🗃️'},{n:'Chart.js',i:'📉'}]}
];

/* ─── SKILL GROUPS DATA (for dedicated skills section) ─── */
const SKILL_GROUPS = [
  {
    title:'Data & AI',icon:'📊',
    skills:[{n:'Python',i:'🐍'},{n:'pandas',i:'🐼'},{n:'SQL',i:'🗄️'},{n:'Power BI',i:'📊'},{n:'Excel',i:'📗'},{n:'Statistics',i:'📈'},{n:'Data Cleaning',i:'🧹'}]
  },
  {
    title:'Programming',icon:'⚙️',
    skills:[{n:'C++',i:'⚙️'},{n:'C#',i:'🟣'},{n:'JavaScript',i:'⚡'},{n:'HTML & CSS',i:'🌐'},{n:'Data Structures',i:'🌳'},{n:'Algorithms',i:'🧮'},{n:'OOP',i:'🧱'}]
  },
  {
    title:'Tools',icon:'🔧',
    skills:[{n:'Git',i:'🔀'},{n:'GitHub',i:'🐙'},{n:'Jupyter',i:'📓'},{n:'Visual Studio',i:'💻'},{n:'SQL Server',i:'🗃️'},{n:'Chart.js',i:'📉'},{n:'Windows Forms',i:'🪟'}]
  }
];

/* ─── SKILL BARS DATA ───
   Each bar counts the projects below whose tech list contains one of `match`,
   so the numbers always follow the project cards. */
const BARS = [
  {n:'C++',match:['C++'],c:'#00599c'},
  {n:'Excel',match:['Excel'],c:'#217346'},
  {n:'JavaScript',match:['JavaScript'],c:'#f7df1e'},
  {n:'Data Structures & Algorithms',match:['Data Structures','Algorithms','Sorting'],c:'#00c896'},
  {n:'Power BI',match:['Power BI'],c:'#f2c811'},
  {n:'Python & pandas',match:['Python','pandas'],c:'#3776ab'},
  {n:'SQL',match:['SQL','SQL Server'],c:'#4479a1'},
  {n:'C#',match:['C#'],c:'#512bd4'}
];

/* ─── TOOLS MARQUEE DATA ─── */
const TOOLS = ['Python','pandas','SQL','Power BI','Excel','C++','C#','JavaScript','Git','Jupyter'];
const TICONS = {
  'Python':'🐍','pandas':'🐼','SQL':'🗄️','Power BI':'📊','Excel':'📗',
  'C++':'⚙️','C#':'🟣','JavaScript':'⚡','Git':'🔀','Jupyter':'📓'
};

/* ─── CONTACT DATA ─── */
const CONTACT_EMAIL = 'hussein27007@gmail.com';

/* ─── PROJECTS DATA ─── */
const PJS = [
  {id:7,title:'Enterprise Data 360',cat:'Data Analytics',feat:true,
   desc:'Interactive analytics dashboard with seven sections, animated charts, search, sorting and CSV export.',
   full:'Part of my data analysis graduation project, alongside a pandas cleaning notebook and a Power BI report. Seven sections cover banking, e-commerce, inventory, HR, marketing and customers. Every chart can switch to a table, KPI tiles jump to their section, tables are searchable and sortable, and the colours are checked for colour-blind readers in light and dark mode. The figures are sample data.',
   hl:['7 dashboard sections','Search, sort and CSV export','Table view for every chart','Light and dark themes'],
   img:IMG_DATA360,
   tech:['JavaScript','Chart.js','Python','pandas','Power BI'],
   live:'https://husseinhany.github.io/Data-Analysis-Project/',
   github:'https://github.com/HusseinHany/Data-Analysis-Project'},
  {id:8,title:'EDUFLOW',cat:'C++ Engineering',feat:true,
   desc:'Learning path generator: scores courses for each student, orders them by prerequisites and builds a weekly schedule.',
   full:'A C++ system with student, admin and counselor portals. Each course gets a score from goal match, difficulty, weekly hours and prerequisites; an AVL tree keeps courses sorted by score, a graph enforces prerequisites, a depth-limited search builds the learning path and a scheduler fills the week. Data is saved and reloaded from files. The README has architecture diagrams and a recorded demo.',
   hl:['AVL tree, BST, graph, linked list, stack','Course scoring and learning paths','Weekly schedule generator','Student, admin and counselor portals'],
   img:IMG_EDUFLOW,
   tech:['C++','Data Structures','Algorithms','OOP'],
   demo:'img/demos/eduflow.svg',
   github:'https://github.com/HusseinHany/EDUFLOW'},
  {id:9,title:'Student Management System',cat:'C++ Engineering',feat:false,
   desc:'Compares five sorting algorithms on up to 100,000 student records, counting comparisons and swaps.',
   full:'A console system for student records with add, update, delete, search, statistics and an AVL tree. Its benchmark runs bubble, insertion, selection, merge and quick sort on random, nearly sorted and reversed data, counting comparisons and swaps: at 10,000 records quick sort needs 228 thousand comparisons where bubble sort needs 50 million.',
   hl:['5 sorting algorithms benchmarked','Up to 100,000 records','Linear and binary search, AVL tree','GPA statistics and distribution'],
   img:IMG_STUDENT,
   tech:['C++','Algorithms','Sorting','Data Structures'],
   demo:'img/demos/student.svg',
   github:'https://github.com/HusseinHany/Student-Management-System'},
  {id:6,title:'Escape Room Management System',cat:'Desktop Apps',feat:true,
   desc:'Desktop app for an escape room business: rooms, bookings, filters, revenue reports and a customer leaderboard.',
   full:'Designed and built from A to Z with C# Windows Forms and SQL Server, from the database schema to every screen. Staff sign in, manage themed rooms and bookings, filter bookings by customer, room, status and date, see revenue and booking reports for any date range, and rank customers by what they have spent. One shared theme gives every screen rounded, colour-coded buttons with hover and press feedback, and all database queries use parameters.',
   hl:['Login with staff accounts','Dashboard with today\'s bookings and revenue','Booking filters and revenue reports','Customer leaderboard','One consistent theme across all 7 screens'],
   img:IMG_PROJ6,
   tech:['C#','Windows Forms','SQL Server','ADO.NET'],
   github:'https://github.com/HusseinHany/EscapeRoomBookingSystem'},
  {id:1,title:'Finance Flare',cat:'C++ Engineering',feat:true,
   desc:'Personal finance manager in C++: income, expenses, 20 investment options with expected returns, and animated terminal reports.',
   full:'Final project for the C++ OOP course, built by Byte Masters, a team of six. Record income and expenses by category, see every transaction in date order, invest part of your available money in one of 20 options and get the expected profit, and read a summary with bars showing where the income went. Income and Expense inherit from an abstract Transaction class, and everything is saved to text files. In my fork I fixed the menu freezes and the investment mix-ups (the option chosen, its name and its rate did not match), made the returns yearly, and added an animated title screen, a live summary on the main menu and growing report bars.',
   hl:['Income and expenses by category','20 investment options with expected profit','Animated title screen and report bars','Inheritance, file storage, function overloading'],
   img:IMG_PROJ5,
   tech:['C++','OOP','Inheritance','File I/O'],
   demo:'img/demos/finance.svg',
   github:'https://github.com/HusseinHany/Finance-Flare'},
  {id:2,title:'Bank Management System',cat:'C++ Engineering',feat:false,
   desc:'Console banking system with admin, employee and client roles, an inheritance-based class design and file storage.',
   full:'Three roles, each with its own menu: admins manage employees, employees open and manage client accounts, and clients deposit, withdraw, transfer and review their history. Client, Employee and Admin inherit from a shared Person class; data is saved to text files with hashed passwords, safe rewrites and an activity log. The README has class and layer diagrams and a recorded demo.',
   hl:['Admin, employee and client roles','Deposits, withdrawals and transfers','Hashed passwords and activity log','Class hierarchy built on inheritance'],
   img:IMG_PROJ4,
   tech:['C++','OOP','Inheritance','File I/O'],
   demo:'img/demos/bank.svg',
   github:'https://github.com/HusseinHany/Bank_System'},
  {id:3,title:'Sales Performance Analytics',cat:'Data Analytics',feat:true,
   desc:'Northwind orders 1996–1998: $1.27M in sales across 89 companies, analysed in Excel and an interactive web dashboard.',
   full:'Excel pivot tables and dashboards for 806 Northwind order rows, rebuilt as an interactive web dashboard. Filter by year and region or click a bar to filter the whole page. Because the data covers July 1996 to May 1998, the dashboard compares the average per month, which grew from $34.7K to $51.4K to $88.1K. Every total matches the Excel pivots to the cent.',
   hl:['$1,265,793.04 total sales','Eastern region: 52% of sales','Monthly average up 2.5× over two years','Filters, drill-down and sortable tables'],
   img:IMG_PROJ3,
   tech:['Excel','Pivot Tables','JavaScript','Chart.js','Python'],
   live:'https://husseinhany.github.io/Sales/',
   github:'https://github.com/HusseinHany/Sales'},
  {id:4,title:'Candy Line Sales Overview',cat:'Data Analytics',feat:false,
   desc:'$10.03M across 307 orders, 7 product lines and 19 countries, from 2003 to 2005.',
   full:'Quantitative and descriptive analysis in Excel of 2,823 order lines, plus an interactive dashboard. Filter by year, territory and product line; see the monthly trend, top countries, deal sizes and order status. Classic Cars bring in 39% of sales, the USA 36%, and November is the peak month every year.',
   hl:['Classic Cars: 39% of sales','USA: 36% of sales','Peak every November','Average order $32.7K'],
   img:IMG_PROJ1,
   tech:['Excel','Statistics','JavaScript','Chart.js'],
   live:'https://husseinhany.github.io/Sales/dashboard/#candy',
   github:'https://github.com/HusseinHany/Sales'}
];
