import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "ascii" | "error" | "system";
  content: string;
  isTyping?: boolean;
}

const ASCII_BANNER = `
 ██████╗  █████╗ ███╗   ███╗██╗███████╗
 ██╔══██╗██╔══██╗████╗ ████║██║╚══███╔╝
 ██████╔╝███████║██╔████╔██║██║  ███╔╝ 
 ██╔══██╗██╔══██║██║╚██╔╝██║██║ ███╔╝  
 ██║  ██║██║  ██║██║ ╚═╝ ██║██║███████╗
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚══════╝
`;

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    "┌──────────────────────────────────────────────────┐",
    "│  Available Commands                              │",
    "├──────────────────────────────────────────────────┤",
    "│  about        → Who am I                        │",
    "│  skills       → My tech stack                   │",
    "│  projects     → All projects overview            │",
    "│  android      → Android projects                │",
    "│  desktop      → Desktop/Python projects         │",
    "│  experience   → Work experience                 │",
    "│  contact      → Get in touch                    │",
    "│  links        → Social & website links          │",
    "│  clear        → Clear terminal                  │",
    "│  exit         → Return to website               │",
    "│  neofetch     → System info (for fun)           │",
    "│  matrix       → 🟢 You know what this is...     │",
    "│  sudo hire    → Try it ;)                       │",
    "└──────────────────────────────────────────────────┘",
  ],
  about: () => [
    "╭─ About Me ─────────────────────────────────────╮",
    "│",
    "│  Name     : Mohammad Ramiz",
    "│  Role     : Android Developer & Backend Engineer",
    "│  Focus    : Building impactful software",
    "│",
    "│  I am a passionate developer specializing in",
    "│  Android development and backend engineering.",
    "│  With expertise in Java, Python, and modern",
    "│  frameworks, I create robust mobile applications",
    "│  and scalable server solutions.",
    "│",
    "│  Projects Built : 15+",
    "│  Apps on Store  : 2+",
    "│  API Uptime     : 99.9%",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  skills: () => [
    "╭─ Tech Stack ───────────────────────────────────╮",
    "│",
    "│  ⚡ Languages",
    "│     Kotlin ██████████████████░░ 95%",
    "│     Python ████████████████████ 90%",
    "│     Java   █████████████████░░░ 88%",
    "│     TypeScript ██████████████████ 85%",
    "│     SQL    ████████████████░░░░ 80%",
    "│     C++    ██████████████░░░░░░ 70%",
    "│",
    "│  🔧 Frameworks & Tools",
    "│     Jetpack Compose, Django, React, FastAPI",
    "│     Docker, Git, Android Studio",
    "│",
    "│  ☁️  Platforms",
    "│     Android, Firebase, AWS, PostgreSQL",
    "│     Linux, Figma",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  projects: () => [
    "╭─ All Projects ──────────────────────────────────╮",
    "│",
    "│  🔥 Confess App      [Android]  Live on Play Store",
    "│  🚗 Share Wheels     [Android]  Final Year Project",
    "│  💻 BuddyCode        [Android]  Open Source",
    "│  🏨 Hotel Manager    [Android]  Completed",
    "│  ✅ Task Manager Pro [Android]  Completed",
    "│  📦 Inventory Fetcher[Android]  Production Use",
    "│  🖥️ BuddyCode Web    [Desktop]  Live",
    "│  🔗 Linkium          [Desktop]  Live",
    "│  💾 Backup Engine    [Desktop]  Open Source",
    "│  ⚡ Confess Server   [Desktop]  Production",
    "│  📡 Local Share      [Desktop]  Completed",
    "│",
    "│  Type 'android' or 'desktop' for details.",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  android: () => [
    "╭─ Android Projects ──────────────────────────────╮",
    "│",
    "│  🔥 Confess App",
    "│     Anonymous confession platform with real-time",
    "│     Firebase backend and push notifications.",
    "│     Tech: Java, Firebase, Cloud Functions, FCM",
    "│     Status: Live on Play Store",
    "│",
    "│  🚗 Share Wheels",
    "│     Smart ride sharing with real-time GPS tracking",
    "│     and route optimization via Google Maps API.",
    "│     Tech: Android, Maps API, Firebase, Kotlin",
    "│",
    "│  💻 BuddyCode Mobile",
    "│     Mobile code editor with Python execution,",
    "│     syntax highlighting, and cloud save.",
    "│     Tech: Java, REST APIs, CodeMirror, Python",
    "│",
    "│  🏨 Hotel Manager",
    "│     Complete hotel management: bookings, staff,",
    "│     analytics dashboard, invoice generation.",
    "│     Tech: Android, SQLite, Material UI, PDF Gen",
    "│",
    "│  ✅ Task Manager Pro",
    "│     Offline-first task app with Kotlin coroutines",
    "│     and Room DB. Smart reminders & weekly reports.",
    "│     Tech: Kotlin, Room DB, Coroutines, WorkManager",
    "│",
    "│  📦 Inventory Fetcher",
    "│     Enterprise inventory tool for Indian Oil.",
    "│     Offline caching, barcode scanning, auto-sync.",
    "│     Tech: Android, REST API, SQLite, Barcode SDK",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  desktop: () => [
    "╭─ Desktop / Python Projects ─────────────────────╮",
    "│",
    "│  🖥️ BuddyCode Web",
    "│     Real-time collaborative code editor.",
    "│     Multi-language syntax highlighting & live preview.",
    "│     Tech: Python, Flask, WebSocket",
    "│     URL: buddycode.online",
    "│",
    "│  🔗 Linkium",
    "│     Cross-platform device connectivity &",
    "│     file sharing over local networks.",
    "│     Tech: Python, Tkinter, WebSocket",
    "│     URL: linkium.space",
    "│",
    "│  💾 Backup Engine",
    "│     Real-time backup with file hashing,",
    "│     incremental backups, and change detection.",
    "│     Tech: Python, Tkinter, OS",
    "│",
    "│  ⚡ Confess Server",
    "│     FastAPI backend on AWS. Handles auth,",
    "│     real-time WebSocket updates, and moderation.",
    "│     Tech: Python, FastAPI, AWS",
    "│",
    "│  📡 Local Share",
    "│     Zero-config local sharing between Android",
    "│     and iOS. mDNS discovery, Ngrok tunneling.",
    "│     Tech: Python, Ngrok, MongoDB",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  experience: () => [
    "╭─ Experience ─────────────────────────────────────╮",
    "│",
    "│  🚀 Freelance — Android Developer",
    "│     2022 – Present",
    "│     • Published 2+ apps on Google Play Store",
    "│     • Firebase integration & real-time features",
    "│     • Optimized app performance by 40%",
    "│",
    "│  💻 Personal Projects — Backend Developer",
    "│     2021 – Present",
    "│     • Developed 10+ REST APIs (99.9% uptime)",
    "│     • AWS deployment (EC2, S3, CloudWatch)",
    "│     • Secure authentication systems",
    "│",
    "│  🏢 Bluestock Fintech — SDE Intern",
    "│     May 2025 – June 2025",
    "│     • Led team as project lead",
    "│     • Built complete admin panel",
    "│     • Designed frontend architecture",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  contact: () => [
    "╭─ Contact ────────────────────────────────────────╮",
    "│",
    "│  📧 Email    : ramizanas6@gmail.com",
    "│  🐙 GitHub   : github.com/RamizMohammad",
    "│  💼 LinkedIn : linkedin.com/in/mohammad-ramiz",
    "│",
    "│  Feel free to reach out for collaborations",
    "│  or just to say hello!",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  links: () => [
    "╭─ Links ──────────────────────────────────────────╮",
    "│",
    "│  🌐 BuddyCode   : https://buddycode.online",
    "│  🔗 Linkium      : https://linkium.space",
    "│  🐙 GitHub       : https://github.com/RamizMohammad",
    "│  📱 Confess App  : Play Store (search 'Confess')",
    "│",
    "╰────────────────────────────────────────────────╯",
  ],
  neofetch: () => [
    "                    ramiz@portfolio",
    "   ██████████       ──────────────────",
    "   ██      ██       OS: Portfolio v2.0",
    "   ██  ██  ██       Host: Lovable Cloud",
    "   ██      ██       Kernel: React 18.3",
    "   ██████████       Uptime: since 2021",
    "   ██      ██       Packages: 15+ projects",
    "   ██      ██       Shell: TypeScript",
    "   ██      ██       Terminal: Custom v1.0",
    "                    Theme: Green-Blue Gradient",
    "                    CPU: Kotlin + Python",
    "                    GPU: Framer Motion",
    "                    Memory: 15+ repos",
    "",
    "   ███ ███ ███ ███ ███ ███ ███ ███",
  ],
  matrix: () => [
    "╭──────────────────────────────────────────────────╮",
    "│                                                  │",
    "│  ░▒▓█ ENTERING THE MATRIX █▓▒░                   │",
    "│                                                  │",
    "│  Wake up, Neo...                                 │",
    "│  The Matrix has you...                           │",
    "│  Follow the white rabbit. 🐇                     │",
    "│                                                  │",
    "│  01001000 01100101 01101100 01101100 01101111     │",
    "│  (That's 'Hello' in binary)                      │",
    "│                                                  │",
    "│  Fun fact: Ramiz once debugged a production       │",
    "│  server at 3 AM. The bug? A missing semicolon.   │",
    "│                                                  │",
    "╰──────────────────────────────────────────────────╯",
  ],
  "sudo hire": () => [
    "",
    "  🔐 Verifying credentials...",
    "  ✅ Access granted!",
    "",
    "  ┌──────────────────────────────────────────────┐",
    "  │                                              │",
    "  │   🎉 CONGRATULATIONS!                        │",
    "  │                                              │",
    "  │   You've unlocked the secret hiring portal!  │",
    "  │                                              │",
    "  │   📧 ramizanas6@gmail.com                    │",
    "  │   💼 Available for freelance & full-time      │",
    "  │   🚀 Ready to build something amazing        │",
    "  │                                              │",
    "  │   Response time: < 24 hours                  │",
    "  │   Coffee preference: Black ☕                 │",
    "  │   Superpower: Turning caffeine into code      │",
    "  │                                              │",
    "  └──────────────────────────────────────────────┘",
    "",
  ],
  whoami: () => ["ramiz — Android Developer & Backend Engineer"],
  pwd: () => ["/home/ramiz/portfolio"],
  ls: () => [
    "about.md    skills.json    projects/    experience.log",
    "contact.txt links.yml      README.md    .secret",
  ],
  "cat .secret": () => [
    "🤫 You found a secret file!",
    "",
    "Here's a fun fact: This entire portfolio was built",
    "with love, lots of chai ☕, and zero Stack Overflow",
    "copy-paste. Okay maybe a little. 😄",
  ],
  date: () => [new Date().toString()],
  echo: () => ["Usage: echo <message> (but I'm not that smart yet 😅)"],
  cowsay: () => [
    " ___________________",
    "< Hire Ramiz today! >",
    " -------------------",
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ],
};

interface TerminalModeProps {
  onExit: () => void;
}

// Typewriter line component — renders text character by character
const TypewriterLine = ({ content, speed = 8, onComplete }: { content: string; speed?: number; onComplete?: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  const idxRef = useRef(0);

  useEffect(() => {
    if (content.length === 0) {
      onComplete?.();
      return;
    }
    const interval = setInterval(() => {
      idxRef.current++;
      if (idxRef.current >= content.length) {
        setDisplayed(content);
        clearInterval(interval);
        onComplete?.();
      } else {
        setDisplayed(content.slice(0, idxRef.current + 1));
      }
    }, speed);
    return () => clearInterval(interval);
  }, [content, speed, onComplete]);

  return <>{displayed}<span className="animate-pulse text-primary opacity-50">▊</span></>;
};

const TerminalMode = ({ onExit }: TerminalModeProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
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
      { type: "system", content: "Initializing terminal..." },
      { type: "ascii", content: ASCII_BANNER },
      { type: "system", content: "Welcome to Ramiz's Developer Terminal v1.0" },
      { type: "system", content: "Type 'help' to see available commands." },
      { type: "system", content: "─────────────────────────────────────────────" },
    ];

    let i = 0;
    let cancelled = false;
    const interval = setInterval(() => {
      if (cancelled) return;
      if (i < bootLines.length) {
        const line = bootLines[i];
        if (line) {
          setLines((prev) => [...prev, line]);
        }
        i++;
        scrollToBottom();
      } else {
        clearInterval(interval);
        setIsBooting(false);
        inputRef.current?.focus();
      }
    }, 200);

    return () => { cancelled = true; clearInterval(interval); };
  }, [scrollToBottom]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    setLines((prev) => [...prev, { type: "input", content: cmd }]);
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);

    if (trimmed === "") {
      scrollToBottom();
      return;
    }

    if (trimmed === "clear") {
      setLines([]);
      setTypingLineIdx(null);
      return;
    }

    if (trimmed === "exit") {
      setLines((prev) => [...prev, { type: "system", content: "Exiting terminal mode... Goodbye! 👋" }]);
      setTimeout(onExit, 800);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const output = handler();
      const newLines = output.map((line) => ({ type: "output" as const, content: line, isTyping: true }));
      setLines((prev) => {
        const startIdx = prev.length;
        setTypingLineIdx(startIdx); // start typewriter from first new line
        return [...prev, ...newLines];
      });
    } else {
      setLines((prev) => [
        ...prev,
        { type: "error", content: `Command not found: '${trimmed}'. Type 'help' for available commands.`, isTyping: true },
      ]);
      setTypingLineIdx(null);
    }

    scrollToBottom();
  }, [onExit, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab completion
      const partial = input.trim().toLowerCase();
      if (partial) {
        const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
        if (matches.length === 1) {
          setInput(matches[0]);
        }
      }
    }
  };

  const focusInput = () => inputRef.current?.focus();

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input": return "text-[hsl(152,100%,50%)]";
      case "output": return "text-[hsl(0,0%,80%)]";
      case "ascii": return "text-[hsl(152,100%,50%)]";
      case "error": return "text-[hsl(0,70%,60%)]";
      case "system": return "text-[hsl(216,100%,60%)]";
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "hsl(220, 25%, 4%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={focusInput}
    >
      {/* Title bar */}
      <div className="flex items-center h-9 px-4 bg-[hsl(220,20%,8%)] border-b border-[hsl(220,15%,15%)] flex-shrink-0 select-none">
        <div className="flex gap-2 mr-4">
          <button
            onClick={(e) => { e.stopPropagation(); onExit(); }}
            className="w-3 h-3 rounded-full bg-[hsl(0,70%,55%)] hover:bg-[hsl(0,70%,65%)] transition-colors"
          />
          <div className="w-3 h-3 rounded-full bg-[hsl(45,80%,55%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(152,60%,45%)]" />
        </div>
        <span className="text-[hsl(0,0%,50%)] text-xs font-mono">ramiz@portfolio:~</span>
        <span className="ml-auto text-[hsl(0,0%,30%)] text-[10px] font-mono">bash</span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-sm md:text-base text-left"
        style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(220,15%,20%) transparent" }}
      >
        {lines.filter(Boolean).map((line, i) => (
          <div key={i} className={`${getLineColor(line.type)} leading-relaxed text-left`}>
            {line.type === "input" ? (
              <div className="flex gap-2">
                <span className="text-[hsl(152,100%,50%)] select-none">❯</span>
                <span className="text-[hsl(0,0%,90%)]">{line.content}</span>
              </div>
            ) : line.type === "ascii" ? (
              <pre className="text-[hsl(152,100%,50%)] text-[10px] sm:text-xs md:text-sm leading-none font-mono text-left">{line.content}</pre>
            ) : line.isTyping && typingLineIdx !== null && i >= typingLineIdx ? (
              <div className="whitespace-pre text-left">
                <TypewriterLine
                  content={line.content}
                  speed={Math.max(2, 12 - Math.floor((i - typingLineIdx) / 3))}
                  onComplete={() => {
                    scrollToBottom();
                    // Mark as done typing
                    setLines(prev => prev.map((l, idx) => idx === i ? { ...l, isTyping: false } : l));
                  }}
                />
              </div>
            ) : (
              <div className="whitespace-pre text-left">{line.content}</div>
            )}
          </div>
        ))}

        {/* Input line */}
        {!isBooting && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[hsl(152,100%,50%)] select-none">❯</span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-[hsl(0,0%,90%)] outline-none caret-[hsl(152,100%,50%)] font-mono text-sm md:text-base text-left"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="h-6 px-4 bg-[hsl(220,20%,8%)] border-t border-[hsl(220,15%,15%)] flex items-center justify-between text-[10px] font-mono text-[hsl(0,0%,35%)] flex-shrink-0 select-none">
        <span>ramiz@portfolio</span>
        <span>{lines.filter((l) => l.type === "input").length} commands</span>
        <span>Type 'exit' to return</span>
      </div>
    </motion.div>
  );
};

export default TerminalMode;
