import { motion } from "framer-motion";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

interface TerminalLine {
  type: "input" | "output" | "ascii" | "error" | "system";
  content: string;
  isTyping?: boolean;
}

const ASCII_BANNER = `
 ███╗   ███╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ███╗███╗   ███╗ █████╗ ██████╗ 
 ████╗ ████║██╔═══██╗██║  ██║██╔══██╗████╗ ████║████╗ ████║██╔══██╗██╔══██╗
 ██╔████╔██║██║   ██║███████║███████║██╔████╔██║██╔████╔██║███████║██║  ██║
 ██║╚██╔╝██║██║   ██║██╔══██║██╔══██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║  ██║
 ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██████╔╝
 ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ 

 ██████╗  █████╗ ███╗   ███╗██╗███████╗
 ██╔══██╗██╔══██╗████╗ ████║██║╚══███╔╝
 ██████╔╝███████║██╔████╔██║██║  ███╔╝ 
 ██╔══██╗██╔══██║██║╚██╔╝██║██║ ███╔╝  
 ██║  ██║██║  ██║██║ ╚═╝ ██║██║███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝`;

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "",
    "  \x1b[1mAvailable Commands\x1b[0m",
    "  ──────────────────────────────────────────",
    "  \x1b[32mabout\x1b[0m        \x1b[90m→\x1b[0m  Who am I",
    "  \x1b[32mskills\x1b[0m       \x1b[90m→\x1b[0m  My tech stack",
    "  \x1b[32mprojects\x1b[0m     \x1b[90m→\x1b[0m  All projects overview",
    "  \x1b[32mandroid\x1b[0m      \x1b[90m→\x1b[0m  Android projects",
    "  \x1b[32mdesktop\x1b[0m      \x1b[90m→\x1b[0m  Desktop/Python projects",
    "  \x1b[32mexperience\x1b[0m   \x1b[90m→\x1b[0m  Work experience",
    "  \x1b[32mcontact\x1b[0m      \x1b[90m→\x1b[0m  Get in touch",
    "  \x1b[32mlinks\x1b[0m        \x1b[90m→\x1b[0m  Social & website links",
    "  \x1b[32mneofetch\x1b[0m     \x1b[90m→\x1b[0m  System info",
    "  \x1b[32mmatrix\x1b[0m       \x1b[90m→\x1b[0m  You know what this is...",
    "  \x1b[32msudo hire\x1b[0m    \x1b[90m→\x1b[0m  Try it ;)",
    "  \x1b[32mclear\x1b[0m        \x1b[90m→\x1b[0m  Clear terminal",
    "  \x1b[32mexit\x1b[0m         \x1b[90m→\x1b[0m  Return to website",
    "",
  ],
  hi: () => [
    "",
    "  Hey there! 👋",
    "",
    "  \x1b[90mGlad you stopped by. Here's what you can do:\x1b[0m",
    "",
    "  \x1b[32m$\x1b[0m about      \x1b[90m# know who I am\x1b[0m",
    "  \x1b[32m$\x1b[0m projects   \x1b[90m# see what I've built\x1b[0m",
    "  \x1b[32m$\x1b[0m contact    \x1b[90m# reach out\x1b[0m",
    "  \x1b[32m$\x1b[0m sudo hire  \x1b[90m# 😄\x1b[0m",
    "",
  ],
  about: () => [
    "",
    "  \x1b[1;32m Mohammad Ramiz\x1b[0m  \x1b[90m─ Android Dev & Backend Engineer\x1b[0m",
    "  ─────────────────────────────────────────────",
    "",
    "  \x1b[90mFocus    \x1b[0m  Building impactful, production-grade software",
    "  \x1b[90mExp      \x1b[0m  4+ years across mobile & backend",
    "  \x1b[90mMission  \x1b[0m  Clean code, real-world impact",
    "",
    "  \x1b[33m◆\x1b[0m  \x1b[1m15+\x1b[0m  projects shipped",
    "  \x1b[33m◆\x1b[0m  \x1b[1m2+\x1b[0m   apps live on Play Store",
    "  \x1b[33m◆\x1b[0m  \x1b[1m99.9%\x1b[0m API uptime maintained",
    "",
  ],
  skills: () => [
    "",
    "  \x1b[1;34m Languages\x1b[0m",
    "  ──────────────────────────────────────────",
    "  \x1b[32mKotlin\x1b[0m      \x1b[32m████████████████████\x1b[0m\x1b[90m░\x1b[0m  95%",
    "  \x1b[32mPython\x1b[0m      \x1b[32m██████████████████\x1b[0m\x1b[90m░░\x1b[0m  90%",
    "  \x1b[32mJava\x1b[0m        \x1b[32m█████████████████\x1b[0m\x1b[90m░░░\x1b[0m  88%",
    "  \x1b[32mTypeScript\x1b[0m  \x1b[32m█████████████████\x1b[0m\x1b[90m░░░\x1b[0m  85%",
    "  \x1b[32mSQL\x1b[0m         \x1b[32m████████████████\x1b[0m\x1b[90m░░░░\x1b[0m  80%",
    "  \x1b[32mC++\x1b[0m         \x1b[32m██████████████\x1b[0m\x1b[90m░░░░░░\x1b[0m  70%",
    "",
    "  \x1b[1;34m Frameworks & Tools\x1b[0m",
    "  ──────────────────────────────────────────",
    "  \x1b[36mJetpack Compose\x1b[0m  \x1b[36mDjango\x1b[0m  \x1b[36mReact\x1b[0m  \x1b[36mFastAPI\x1b[0m",
    "  \x1b[36mDocker\x1b[0m  \x1b[36mGit\x1b[0m  \x1b[36mAndroid Studio\x1b[0m",
    "",
    "  \x1b[1;34m Platforms\x1b[0m",
    "  ──────────────────────────────────────────",
    "  \x1b[35mAndroid\x1b[0m  \x1b[35mFirebase\x1b[0m  \x1b[35mAWS\x1b[0m  \x1b[35mPostgreSQL\x1b[0m",
    "  \x1b[35mLinux\x1b[0m  \x1b[35mFigma\x1b[0m  \x1b[35mVertex AI\x1b[0m",
    "",
  ],
  projects: () => [
    "",
    "  \x1b[1;34m Android\x1b[0m                          \x1b[1;35m Desktop / Python\x1b[0m",
    "  ─────────────────────────────  ───────────────────────────",
    "  \x1b[32m✓\x1b[0m Confess App   \x1b[90m[Play Store]\x1b[0m   \x1b[32m✓\x1b[0m BuddyCode Web  \x1b[90m[Live]\x1b[0m",
    "  \x1b[32m✓\x1b[0m Share Wheels  \x1b[90m[FYP]\x1b[0m          \x1b[32m✓\x1b[0m Linkium        \x1b[90m[Live]\x1b[0m",
    "  \x1b[32m✓\x1b[0m BuddyCode     \x1b[90m[Open Source]\x1b[0m  \x1b[32m✓\x1b[0m Backup Engine  \x1b[90m[OSS]\x1b[0m",
    "  \x1b[32m✓\x1b[0m Hotel Manager \x1b[90m[Completed]\x1b[0m   \x1b[32m✓\x1b[0m Confess Server \x1b[90m[Prod]\x1b[0m",
    "  \x1b[32m✓\x1b[0m Task Manager  \x1b[90m[Completed]\x1b[0m   \x1b[32m✓\x1b[0m Local Share    \x1b[90m[Done]\x1b[0m",
    "  \x1b[32m✓\x1b[0m Inventory Fetch \x1b[90m[Prod]\x1b[0m",
    "",
    "  \x1b[90mType\x1b[0m \x1b[32mandroid\x1b[0m \x1b[90mor\x1b[0m \x1b[32mdesktop\x1b[0m \x1b[90mfor details.\x1b[0m",
    "",
  ],
  android: () => [
    "",
    "  \x1b[1;32m Android Projects\x1b[0m",
    "  ──────────────────────────────────────────",
    "",
    "  \x1b[1;33m🔥 Confess App\x1b[0m  \x1b[32m[Play Store]\x1b[0m",
    "  \x1b[90m  Anonymous confession platform with real-time\x1b[0m",
    "  \x1b[90m  Firebase backend and push notifications.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Java · Firebase · Cloud Functions · FCM",
    "",
    "  \x1b[1;33m🚗 Share Wheels\x1b[0m  \x1b[32m[Final Year Project]\x1b[0m",
    "  \x1b[90m  Smart ride sharing with real-time GPS tracking\x1b[0m",
    "  \x1b[90m  and route optimization via Google Maps API.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Kotlin · Maps API · Firebase",
    "",
    "  \x1b[1;33m💻 BuddyCode Mobile\x1b[0m  \x1b[32m[Open Source]\x1b[0m",
    "  \x1b[90m  Mobile code editor with Python execution,\x1b[0m",
    "  \x1b[90m  syntax highlighting, and cloud save.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Java · REST APIs · CodeMirror",
    "",
    "  \x1b[1;33m🏨 Hotel Manager\x1b[0m  \x1b[32m[Completed]\x1b[0m",
    "  \x1b[90m  Complete hotel management: bookings, staff,\x1b[0m",
    "  \x1b[90m  analytics dashboard, invoice generation.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Android · SQLite · Material UI",
    "",
    "  \x1b[1;33m📦 Inventory Fetcher\x1b[0m  \x1b[32m[Production]\x1b[0m",
    "  \x1b[90m  Enterprise inventory tool for Indian Oil.\x1b[0m",
    "  \x1b[90m  Offline caching, barcode scan, auto-sync.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Android · REST API · Barcode SDK",
    "",
  ],
  desktop: () => [
    "",
    "  \x1b[1;35m Desktop / Python Projects\x1b[0m",
    "  ──────────────────────────────────────────",
    "",
    "  \x1b[1;33m🖥️  BuddyCode Web\x1b[0m  \x1b[32m[Live]\x1b[0m  \x1b[36mbuddycode.online\x1b[0m",
    "  \x1b[90m  Real-time collaborative code editor.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Python · Flask · WebSocket",
    "",
    "  \x1b[1;33m🔗 Linkium\x1b[0m  \x1b[32m[Live]\x1b[0m  \x1b[36mlinkium.space\x1b[0m",
    "  \x1b[90m  Cross-platform device connectivity & file sharing.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Python · Tkinter · WebSocket",
    "",
    "  \x1b[1;33m💾 Backup Engine\x1b[0m  \x1b[32m[Open Source]\x1b[0m",
    "  \x1b[90m  Real-time backup with file hashing,\x1b[0m",
    "  \x1b[90m  incremental backups and change detection.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Python · Tkinter · OS",
    "",
    "  \x1b[1;33m⚡ Confess Server\x1b[0m  \x1b[32m[Production]\x1b[0m",
    "  \x1b[90m  FastAPI backend on AWS. Auth, WebSocket,\x1b[0m",
    "  \x1b[90m  real-time updates, and moderation.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Python · FastAPI · AWS",
    "",
    "  \x1b[1;33m📡 Local Share\x1b[0m  \x1b[32m[Completed]\x1b[0m",
    "  \x1b[90m  Zero-config local sharing Android ↔ iOS.\x1b[0m",
    "  \x1b[90m  mDNS discovery, Ngrok tunneling.\x1b[0m",
    "  \x1b[90m  Stack:\x1b[0m Python · Ngrok · MongoDB",
    "",
  ],
  experience: () => [
    "",
    "  \x1b[1;32m Work Experience\x1b[0m",
    "  ──────────────────────────────────────────",
    "",
    "  \x1b[1;33m🏢 Moglix — Python & Agentic AI Developer\x1b[0m",
    "  \x1b[90m  Jan 2026 – Present\x1b[0m",
    "  \x1b[32m  +\x1b[0m Python backend & API development",
    "  \x1b[32m  +\x1b[0m Agentic AI chatbot & support systems",
    "  \x1b[32m  +\x1b[0m OCR accuracy report pipeline",
    "  \x1b[32m  +\x1b[0m Supplier invoice accuracy system",
    "",
    "  \x1b[1;33m🏢 Bluestock Fintech — SDE Intern\x1b[0m",
    "  \x1b[90m  May 2025 – June 2025\x1b[0m",
    "  \x1b[32m  +\x1b[0m Led team as project lead",
    "  \x1b[32m  +\x1b[0m Built complete admin panel",
    "  \x1b[32m  +\x1b[0m Designed frontend architecture",
    "",
    "  \x1b[1;33m🚀 Freelance — Android Developer\x1b[0m",
    "  \x1b[90m  2022 – Present\x1b[0m",
    "  \x1b[32m  +\x1b[0m Published 2+ apps on Play Store",
    "  \x1b[32m  +\x1b[0m Firebase integration & real-time features",
    "  \x1b[32m  +\x1b[0m Optimized app performance by 40%",
    "",
    "  \x1b[1;33m💻 Personal Projects — Backend Dev\x1b[0m",
    "  \x1b[90m  2021 – Present\x1b[0m",
    "  \x1b[32m  +\x1b[0m 10+ REST APIs with 99.9% uptime",
    "  \x1b[32m  +\x1b[0m AWS deployment (EC2, S3, CloudWatch)",
    "  \x1b[32m  +\x1b[0m Secure authentication systems",
    "",
  ],
  contact: () => [
    "",
    "  \x1b[1;32m Contact\x1b[0m",
    "  ──────────────────────────────────────────",
    "",
    "  \x1b[90m📧 email\x1b[0m     ramizanas6@gmail.com",
    "  \x1b[90m🐙 github\x1b[0m    \x1b[36mgithub.com/RamizMohammad\x1b[0m",
    "  \x1b[90m💼 linkedin\x1b[0m  \x1b[36mlinkedin.com/in/mohammad-ramiz\x1b[0m",
    "",
    "  \x1b[90mFeel free to reach out for collabs or just say hey!\x1b[0m",
    "",
  ],
  links: () => [
    "",
    "  \x1b[1;32m Links\x1b[0m",
    "  ──────────────────────────────────────────",
    "",
    "  \x1b[36mbuddycode.online\x1b[0m   \x1b[90m─ collaborative code editor\x1b[0m",
    "  \x1b[36mlinkium.space\x1b[0m      \x1b[90m─ device connectivity tool\x1b[0m",
    "  \x1b[36mgithub.com/RamizMohammad\x1b[0m  \x1b[90m─ open source work\x1b[0m",
    "  \x1b[90m  Play Store → search 'Confess'\x1b[0m",
    "",
  ],
  neofetch: () => [
    "",
    "  \x1b[32m  ██████\x1b[0m   \x1b[1;32mramiz\x1b[0m\x1b[90m@\x1b[0m\x1b[1mportfolio\x1b[0m",
    "  \x1b[32m ██\x1b[0m  \x1b[32m██\x1b[0m   \x1b[90m─────────────────────\x1b[0m",
    "  \x1b[32m██\x1b[0m \x1b[32m██\x1b[0m \x1b[32m██\x1b[0m   \x1b[33mOS\x1b[0m          Portfolio v2.0",
    "  \x1b[32m██\x1b[0m    \x1b[32m██\x1b[0m   \x1b[33mHost\x1b[0m        Lovable Cloud",
    "  \x1b[32m ██\x1b[0m  \x1b[32m██\x1b[0m   \x1b[33mKernel\x1b[0m      React 18.3",
    "  \x1b[32m  ██████\x1b[0m   \x1b[33mUptime\x1b[0m      Since 2021",
    "             \x1b[33mPackages\x1b[0m    15+ projects",
    "             \x1b[33mShell\x1b[0m       TypeScript",
    "             \x1b[33mTerminal\x1b[0m    Custom v1.0",
    "             \x1b[33mCPU\x1b[0m         Kotlin + Python",
    "             \x1b[33mGPU\x1b[0m         Framer Motion",
    "             \x1b[33mMemory\x1b[0m      15+ repos",
    "",
    "  \x1b[40m   \x1b[0m\x1b[41m   \x1b[0m\x1b[42m   \x1b[0m\x1b[43m   \x1b[0m\x1b[44m   \x1b[0m\x1b[45m   \x1b[0m\x1b[46m   \x1b[0m\x1b[47m   \x1b[0m",
    "",
  ],
  matrix: () => [
    "",
    "  \x1b[32m░▒▓█ ENTERING THE MATRIX █▓▒░\x1b[0m",
    "",
    "  \x1b[90mWake up, Neo...\x1b[0m",
    "  \x1b[90mThe Matrix has you...\x1b[0m",
    "  \x1b[90mFollow the white rabbit. 🐇\x1b[0m",
    "",
    "  \x1b[32m01001000 01100101 01101100 01101100 01101111\x1b[0m",
    "  \x1b[90m(That's 'Hello' in binary)\x1b[0m",
    "",
    "  \x1b[90mFun fact: Ramiz once debugged prod at 3 AM.\x1b[0m",
    "  \x1b[90mThe bug? A missing semicolon. 💀\x1b[0m",
    "",
  ],
  "sudo hire": () => [
    "",
    "  \x1b[33m[sudo] password for recruiter:\x1b[0m \x1b[90m••••••••\x1b[0m",
    "",
    "  \x1b[32m✓ Authentication successful\x1b[0m",
    "  \x1b[32m✓ Credentials verified\x1b[0m",
    "  \x1b[32m✓ Talent detected\x1b[0m",
    "",
    "  \x1b[1;32m 🎉 HIRING PORTAL UNLOCKED\x1b[0m",
    "  \x1b[90m ──────────────────────────────────\x1b[0m",
    "",
    "  \x1b[90m 📧\x1b[0m  ramizanas6@gmail.com",
    "  \x1b[90m 💼\x1b[0m  Available for freelance & full-time",
    "  \x1b[90m 🚀\x1b[0m  Ready to build something amazing",
    "  \x1b[90m ⏱️\x1b[0m   Response time: < 24 hours",
    "  \x1b[90m ☕\x1b[0m  Coffee pref: Black",
    "  \x1b[90m ⚡\x1b[0m  Superpower: Caffeine → Code",
    "",
  ],
  whoami: () => ["  \x1b[32mramiz\x1b[0m — Android Developer & Backend Engineer"],
  pwd:    () => ["  \x1b[36m/home/ramiz/portfolio\x1b[0m"],
  ls:     () => [
    "",
    "  \x1b[34mprojects/\x1b[0m   \x1b[34mexp/\x1b[0m        \x1b[34mcontact/\x1b[0m",
    "  \x1b[32mabout.md\x1b[0m    \x1b[32mskills.json\x1b[0m \x1b[32mREADME.md\x1b[0m",
    "  \x1b[32mlinks.yml\x1b[0m   \x1b[90m.secret\x1b[0m",
    "",
  ],
  "cat .secret": () => [
    "",
    "  \x1b[33m🤫 You found a secret file!\x1b[0m",
    "",
    "  \x1b[90mThis portfolio was built with love, lots of\x1b[0m",
    "  \x1b[90mchai ☕, and zero Stack Overflow copy-paste.\x1b[0m",
    "  \x1b[90mOkay maybe a little. 😄\x1b[0m",
    "",
  ],
  date:   () => [`  \x1b[90m${new Date().toString()}\x1b[0m`],
  uname:  () => ["  \x1b[32mPortfolioOS\x1b[0m React-18.3 #1 SMP Framer-Motion x86_64"],
  uptime: () => [`  \x1b[90mup since 2021,\x1b[0m  load average: \x1b[32m0.42, 1.33, 2.1\x1b[0m`],
  echo:   () => ["  \x1b[90mUsage: echo <message>  (not that smart yet 😅)\x1b[0m"],
  cowsay: () => [
    "   ___________________",
    "  < Hire Ramiz today! >",
    "   -------------------",
    "          \\   ^__^",
    "           \\  (oo)\\_______",
    "              (__)\\       )\\/\\",
    "                  ||----w |",
    "                  ||     ||",
    "",
  ],
};

COMMANDS["hello"] = COMMANDS["hi"];
COMMANDS["hey"]   = COMMANDS["hi"];
COMMANDS["hii"]   = COMMANDS["hi"];
COMMANDS["hola"]  = COMMANDS["hi"];
COMMANDS["sup"]   = COMMANDS["hi"];

// ─── ANSI parser ────────────────────────────────────────────────────────────
type Segment = { text: string; classes: string };

function parseAnsi(raw: string): Segment[] {
  const ansiMap: Record<string, string> = {
    "0":  "ansi-reset",
    "1":  "ansi-bold",
    "30": "ansi-fg-black",   "31": "ansi-fg-red",     "32": "ansi-fg-green",
    "33": "ansi-fg-yellow",  "34": "ansi-fg-blue",    "35": "ansi-fg-magenta",
    "36": "ansi-fg-cyan",    "37": "ansi-fg-white",   "90": "ansi-fg-gray",
    "40": "ansi-bg-black",   "41": "ansi-bg-red",     "42": "ansi-bg-green",
    "43": "ansi-bg-yellow",  "44": "ansi-bg-blue",    "45": "ansi-bg-magenta",
    "46": "ansi-bg-cyan",    "47": "ansi-bg-white",
  };

  const segments: Segment[] = [];
  const re = /\x1b\[([0-9;]*)m/g;
  let lastIdx = 0;
  let activeClasses: string[] = [];

  const push = (text: string) => {
    if (!text) return;
    segments.push({ text, classes: activeClasses.join(" ") });
  };

  let match: RegExpExecArray | null;
  while ((match = re.exec(raw)) !== null) {
    push(raw.slice(lastIdx, match.index));
    lastIdx = match.index + match[0].length;

    const codes = match[1].split(";");
    const newClasses: string[] = [];
    for (const code of codes) {
      if (code === "0" || code === "") { activeClasses = []; }
      else if (code === "1") { newClasses.push("ansi-bold"); }
      else if (ansiMap[code]) { newClasses.push(ansiMap[code]); }
    }
    if (newClasses.length) activeClasses = [...activeClasses.filter(c => !c.startsWith("ansi-fg-") && !c.startsWith("ansi-bg-")), ...newClasses];
  }
  push(raw.slice(lastIdx));
  return segments;
}

const AnsiLine = ({ content }: { content: string }) => {
  const segments = parseAnsi(content);
  return (
    <>
      {segments.map((seg, i) => (
        <span key={i} className={seg.classes}>{seg.text}</span>
      ))}
    </>
  );
};

// ─── Typewriter ──────────────────────────────────────────────────────────────
const TypewriterLine = forwardRef<HTMLSpanElement, { content: string; speed?: number; onComplete?: () => void }>(
  ({ content, speed = 6, onComplete }, _ref) => {
    const [charCount, setCharCount] = useState(0);
    const idxRef = useRef(0);
    // strip ansi for length counting
    const plain = content.replace(/\x1b\[[0-9;]*m/g, "");

    useEffect(() => {
      if (plain.length === 0) { onComplete?.(); return; }
      const interval = setInterval(() => {
        idxRef.current++;
        if (idxRef.current >= plain.length) {
          setCharCount(plain.length);
          clearInterval(interval);
          onComplete?.();
        } else {
          setCharCount(idxRef.current + 1);
        }
      }, speed);
      return () => clearInterval(interval);
    }, [plain, speed, onComplete]);

    // Reveal raw content proportionally
    const ratio = plain.length > 0 ? charCount / plain.length : 1;
    const revealUpTo = Math.floor(content.length * ratio);
    const partial = content.slice(0, revealUpTo);

    return (
      <>
        <AnsiLine content={partial} />
        {charCount < plain.length && (
          <span className="ansi-fg-green animate-pulse">▊</span>
        )}
      </>
    );
  }
);
TypewriterLine.displayName = "TypewriterLine";

// ─── Main terminal ───────────────────────────────────────────────────────────
interface TerminalModeProps { onExit: () => void; }

const TerminalMode = forwardRef<HTMLDivElement, TerminalModeProps>(({ onExit }, _ref) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput]   = useState("");
  const [history, setHistory]     = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [typingLineIdx, setTypingLineIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  // Boot sequence
  useEffect(() => {
    const bootLines: TerminalLine[] = [
      { type: "system", content: "\x1b[90mInitializing terminal...\x1b[0m" },
      { type: "ascii",  content: ASCII_BANNER },
      { type: "system", content: "\x1b[1;32mWelcome to Ramiz's Developer Terminal\x1b[0m  \x1b[90mv1.0.0\x1b[0m" },
      { type: "system", content: "\x1b[90mType '\x1b[0m\x1b[32mhelp\x1b[0m\x1b[90m' to see available commands.\x1b[0m" },
      { type: "system", content: "\x1b[90m─────────────────────────────────────────────\x1b[0m" },
    ];
    let i = 0; let cancelled = false;
    const iv = setInterval(() => {
      if (cancelled) return;
      if (i < bootLines.length) { setLines(p => [...p, bootLines[i++]]); scrollToBottom(); }
      else { clearInterval(iv); setIsBooting(false); inputRef.current?.focus(); }
    }, 220);
    return () => { cancelled = true; clearInterval(iv); };
  }, [scrollToBottom]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines(p => [...p, { type: "input", content: cmd }]);
    setHistory(p => [cmd, ...p]);
    setHistoryIdx(-1);

    if (trimmed === "") { scrollToBottom(); return; }
    if (trimmed === "clear") { setLines([]); setTypingLineIdx(null); return; }
    if (trimmed === "exit") {
      setLines(p => [...p, { type: "system", content: "\x1b[90mExiting terminal... Goodbye! 👋\x1b[0m" }]);
      setTimeout(onExit, 800);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const output = handler();
      const newLines = output.map(line => ({ type: "output" as const, content: line, isTyping: true }));
      setLines(prev => {
        const startIdx = prev.length;
        setTypingLineIdx(startIdx);
        return [...prev, ...newLines];
      });
    } else {
      setLines(p => [...p, {
        type: "error",
        content: `\x1b[31m  bash: ${trimmed}: command not found\x1b[0m  \x1b[90m(try 'help')\x1b[0m`,
        isTyping: true,
      }]);
      setTypingLineIdx(null);
    }
    scrollToBottom();
  }, [onExit, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { executeCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(ni); setInput(history[ni] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) { const ni = historyIdx - 1; setHistoryIdx(ni); setInput(history[ni]); }
      else { setHistoryIdx(-1); setInput(""); }
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); setLines([]); }
    else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (partial) {
        const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
        if (matches.length === 1) setInput(matches[0]);
        else if (matches.length > 1) {
          setLines(p => [...p,
            { type: "input", content: input },
            { type: "output", content: "  " + matches.join("   ") },
          ]);
        }
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col terminal-root"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Title bar ── */}
      <div className="terminal-titlebar flex items-center h-10 px-4 flex-shrink-0 select-none gap-3">
        <div className="flex gap-2">
          <button
            onClick={e => { e.stopPropagation(); onExit(); }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-125 transition-all flex items-center justify-center group"
            title="Close"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#7a0000] font-bold leading-none">✕</span>
          </button>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="terminal-tab">
            <span className="text-[hsl(152,100%,55%)] mr-1.5">❯</span>
            <span className="text-[hsl(0,0%,75%)] text-xs font-mono">ramiz@portfolio — bash</span>
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* ── Body ── */}
      <div
        ref={scrollRef}
        className="terminal-body flex-1 overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed"
        style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(220,15%,22%) transparent" }}
      >
        {lines.filter(Boolean).map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === "input" ? (
              <div className="flex items-center gap-2 my-0.5">
                <span className="ansi-fg-gray select-none text-xs">ramiz@portfolio</span>
                <span className="ansi-fg-gray select-none text-xs">:</span>
                <span className="ansi-fg-cyan select-none text-xs">~</span>
                <span className="ansi-fg-gray select-none text-xs">$</span>
                <span className="ansi-fg-white">{line.content}</span>
              </div>
            ) : line.type === "ascii" ? (
              <pre className="ansi-fg-green text-[9px] sm:text-[11px] leading-tight font-mono my-1">{line.content}</pre>
            ) : line.isTyping && typingLineIdx !== null && i >= typingLineIdx ? (
              <div className="whitespace-pre my-px">
                <TypewriterLine
                  content={line.content}
                  speed={Math.max(2, 8 - Math.floor((i - typingLineIdx) / 4))}
                  onComplete={() => {
                    scrollToBottom();
                    setLines(prev => prev.map((l, idx) => idx === i ? { ...l, isTyping: false } : l));
                  }}
                />
              </div>
            ) : (
              <div className="whitespace-pre my-px"><AnsiLine content={line.content} /></div>
            )}
          </div>
        ))}

        {/* ── Input row ── */}
        {!isBooting && (
          <div className="flex items-center gap-2 mt-1">
            <span className="ansi-fg-gray select-none text-xs">ramiz@portfolio</span>
            <span className="ansi-fg-gray select-none text-xs">:</span>
            <span className="ansi-fg-cyan select-none text-xs">~</span>
            <span className="ansi-fg-gray select-none text-xs">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[hsl(0,0%,90%)] outline-none caret-[hsl(152,100%,50%)] font-mono text-sm"
              autoFocus spellCheck={false} autoComplete="off" autoCapitalize="off"
            />
          </div>
        )}
      </div>

      {/* ── Status bar ── */}
      <div className="terminal-statusbar h-6 px-4 flex items-center justify-between text-[10px] font-mono flex-shrink-0 select-none">
        <span className="flex items-center gap-3">
          <span className="statusbar-branch">⎇ main</span>
          <span className="ansi-fg-gray">{lines.filter(l => l.type === "input").length} cmd</span>
        </span>
        <span className="ansi-fg-gray">bash · UTF-8</span>
        <span className="ansi-fg-gray">Type '\x1b[0mexit\x1b[90m' to return</span>
      </div>

      <style>{`
        .terminal-root {
          background: hsl(222, 28%, 5%);
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', monospace;
        }
        .terminal-titlebar {
          background: hsl(222, 22%, 9%);
          border-bottom: 1px solid hsl(222, 15%, 14%);
        }
        .terminal-tab {
          background: hsl(222, 20%, 12%);
          border: 1px solid hsl(222, 15%, 18%);
          border-radius: 6px;
          padding: 2px 14px;
          font-size: 11px;
        }
        .terminal-body {
          background: hsl(222, 28%, 5%);
        }
        .terminal-statusbar {
          background: hsl(152, 60%, 28%);
          border-top: 1px solid hsl(152, 60%, 22%);
          color: hsl(152, 100%, 90%);
        }
        .statusbar-branch {
          color: hsl(152, 100%, 85%);
          font-weight: 600;
        }
        .terminal-line { min-height: 1.4em; }

        /* ANSI colour classes */
        .ansi-reset    { color: inherit; font-weight: normal; }
        .ansi-bold     { font-weight: 700; }
        .ansi-fg-black   { color: hsl(220,10%,20%); }
        .ansi-fg-red     { color: hsl(0,80%,65%); }
        .ansi-fg-green   { color: hsl(152,100%,55%); }
        .ansi-fg-yellow  { color: hsl(45,95%,65%); }
        .ansi-fg-blue    { color: hsl(216,90%,65%); }
        .ansi-fg-magenta { color: hsl(285,80%,70%); }
        .ansi-fg-cyan    { color: hsl(186,90%,60%); }
        .ansi-fg-white   { color: hsl(0,0%,92%); }
        .ansi-fg-gray    { color: hsl(0,0%,45%); }

        .ansi-bg-black   { background: hsl(220,10%,10%); padding: 0 3px; border-radius: 3px; }
        .ansi-bg-red     { background: hsl(0,70%,35%);   padding: 0 3px; border-radius: 3px; }
        .ansi-bg-green   { background: hsl(152,70%,25%); padding: 0 3px; border-radius: 3px; }
        .ansi-bg-yellow  { background: hsl(45,80%,30%);  padding: 0 3px; border-radius: 3px; }
        .ansi-bg-blue    { background: hsl(216,70%,30%); padding: 0 3px; border-radius: 3px; }
        .ansi-bg-magenta { background: hsl(285,60%,30%); padding: 0 3px; border-radius: 3px; }
        .ansi-bg-cyan    { background: hsl(186,70%,25%); padding: 0 3px; border-radius: 3px; }
        .ansi-bg-white   { background: hsl(0,0%,80%);    padding: 0 3px; border-radius: 3px; color: #111; }
      `}</style>
    </motion.div>
  );
});

TerminalMode.displayName = "TerminalMode";
export default TerminalMode;