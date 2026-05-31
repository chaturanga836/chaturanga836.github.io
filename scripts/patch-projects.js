const fs = require("fs");
const path = require("path");

const jsPath = path.join(__dirname, "../assets/index-CYZqIJBj.js");
let js = fs.readFileSync(jsPath, "utf8");

const navOld =
  'dg=[{label:"About",href:"#about"},{label:"Skills",href:"#skills"},{label:"Experience",href:"#experience"},{label:"Education",href:"#education"}]';
const navNew =
  'dg=[{label:"About",href:"#about"},{label:"Skills",href:"#skills"},{label:"Projects",href:"#projects"},{label:"Experience",href:"#experience"},{label:"Education",href:"#education"}]';

const pageOld =
  'nD=()=>S.jsxs("div",{className:"min-h-screen bg-background",children:[S.jsx(HN,{}),S.jsx(GN,{}),S.jsx(QN,{}),S.jsx(qN,{}),S.jsx(JN,{}),S.jsx(eD,{}),S.jsx(tD,{})]})';
const pageNew =
  'nD=()=>S.jsxs("div",{className:"min-h-screen bg-background",children:[S.jsx(HN,{}),S.jsx(GN,{}),S.jsx(QN,{}),S.jsx(qN,{}),S.jsx(sD,{}),S.jsx(JN,{}),S.jsx(eD,{}),S.jsx(tD,{})]})';

const projectsBlock = `$D=[{name:"Data Connections Manager",period:"Personal Project",role:"Architect / Lead Developer",description:"Scalable data pipeline platform for managing REST API connections, workspace-based integrations, and automated data flows across enterprise analytics infrastructure.",technologies:["React","AWS","Apache Ranger","Minio","Hudi","Trino"],link:"http://13.200.160.10:3000/workspaces/1/connections/rest-api/groups/3",highlight:!0},{name:"PHD Deals",period:"May 2023 \\u2014 March 2024",role:"Full-Stack Developer",description:"E-commerce platform for trading games and hobby items.",technologies:["Angular 10","C# .NET","Azure"]},{name:"Tamm Abu Dhabi",period:"Jan 2022 \\u2014 April 2022",role:"Frontend Developer",description:"Government digital services platform designed to centralize and deliver Abu Dhabi government services online.",technologies:["React","Camunda"]},{name:"Cryptoworth",period:"2020 \\u2014 2024",role:"Full-Stack Developer",description:"Platform for crypto traders to sync transaction history from wallets and exchanges, then calculate cost basis, gains/losses, and tax values.",technologies:["Angular 7","Laravel","Node.js","MySQL"]},{name:"Subclub",period:"Jan 2020 \\u2014 May 2020",role:"Full-Stack Developer",description:"Platform for shop owners to register stores and publish products, with customer subscriptions to packages on weekly or monthly plans.",technologies:["Angular 7","Laravel","Node.js","MySQL"]},{name:"Ceylon Assets",period:"Ongoing",role:"Frontend Developer",description:"Platform enabling users to monitor asset values including index funds, money market funds, and dollar-bound funds.",technologies:["React"],status:"Ongoing"},{name:"Kipstore",period:"On Hold",role:"Developer",description:"Platform for users to analyze their business model.",technologies:["AngularJS","Angular 9"],status:"On Hold"},{name:"Dxone",period:"Dec 2019 \\u2014 2020",role:"Xinfinit Pvt Ltd \\u2014 Lead / Scrum Master",description:"Crypto trading platform allowing users to connect wallets and exchange coins through a KYC-verified registration process.",technologies:["Crypto Trading","KYC","Wallet Integration"]},{name:"Mountain Wolf",period:"Dec 2019 \\u2014 2020",role:"Xinfinit Pvt Ltd",description:"Crypto trading platform enabling users to trade crypto coins through a unified exchange experience.",technologies:["Crypto Trading","Exchange Platform"]}],sD=()=>{const e=w.useRef(null),t=kl(e,{once:!0,margin:"-100px"});return S.jsx("section",{id:"projects",className:"py-24 relative",ref:e,children:S.jsx("div",{className:"container mx-auto px-6",children:S.jsxs(Ae.div,{initial:{opacity:0,y:40},animate:t?{opacity:1,y:0}:{},transition:{duration:.6},children:[S.jsx("h2",{className:"text-sm font-mono text-primary mb-4 text-center",children:"PORTFOLIO"}),S.jsxs("h3",{className:"text-3xl md:text-4xl font-bold mb-4 text-center",children:["Selected ",S.jsx("span",{className:"text-gradient",children:"Projects"})]}),S.jsx("p",{className:"text-center text-muted-foreground max-w-2xl mx-auto mb-12",children:"Professional and personal work across e-commerce, government digital services, fintech, and data infrastructure."}),S.jsx("div",{className:"projects-grid",children:$D.map((n,r)=>S.jsxs(Ae.div,{initial:{opacity:0,y:30},animate:t?{opacity:1,y:0}:{},transition:{duration:.5,delay:r*.05},className:"glass rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-300 flex flex-col"+(n.highlight?" project-featured ring-2 ring-primary/60":""),children:[S.jsxs("div",{className:"flex flex-wrap items-start justify-between gap-2 mb-2",children:[S.jsxs("div",{children:[n.highlight&&S.jsx("span",{className:"project-badge",children:"Featured Personal Project"}),n.status&&!n.highlight&&S.jsx("span",{className:"inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-2",children:n.status}),S.jsx("h4",{className:"font-semibold text-lg text-foreground",children:n.name})]}),S.jsx("p",{className:"text-xs font-mono text-muted-foreground",children:n.period})]}),S.jsx("p",{className:"text-sm text-primary mb-3",children:n.role}),S.jsx("p",{className:"text-sm text-muted-foreground leading-relaxed mb-4 flex-1",children:n.description}),S.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:n.technologies.map(i=>S.jsx("span",{className:"skill-tag text-xs py-1 px-3",children:i},i))}),n.link&&S.jsx("a",{href:n.link,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium mt-auto",children:"View Live Demo \\u2192"})]},n.name))})]})})})},`;

const anchor = 'ZN=[{title:"Freelancer"';

if (!js.includes(navOld)) throw new Error("Nav block not found");
if (!js.includes(pageOld)) throw new Error("Page block not found");
if (!js.includes(anchor)) throw new Error("Experience anchor not found");
if (js.includes('id:"projects"')) throw new Error("Projects section already patched");

js = js.replace(navOld, navNew);
js = js.replace(pageOld, pageNew);
js = js.replace(anchor, projectsBlock + anchor);

fs.writeFileSync(jsPath, js);
console.log("Patched projects section successfully.");
