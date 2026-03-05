/**
 * server.ts  —  Mohammad Ramiz Portfolio — Node.js / Express
 *
 * SETUP
 * ─────
 *   npm install express nodemailer dotenv cross-env html-escaper
 *   npm install -D @types/express @types/nodemailer tsx typescript concurrently
 *
 * ENV  (.env at project root)
 * ────────────────────────────
 *   PORT=3001
 *   BASE_URL=https://mohammadramiz.in
 *   EMAIL_ADDRESS=you@gmail.com
 *   APP_PASS=your_gmail_app_password
 *   VERCEL_GIT_COMMIT_SHA=dev
 *
 * IMAGE FOLDERS
 * ─────────────
 *   Certificate images : src/assets/Certificate/   → /api/achievement-image/<file>
 *   App logos          : src/assets/AppLogos/       → /api/app-logo/<file>
 *
 * RUN
 * ───
 *   Dev  : npm run dev
 *   Prod : npm run build:all && npm start
 */

import dotenv from "dotenv";
import express, { NextFunction, Request, RequestHandler, Response } from "express";
import fs from "fs";
import { escape as escapeHtml } from "html-escaper";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ─── Windows-safe __dirname for ESM ─────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ─── Env ─────────────────────────────────────────────────────────────────────
const PORT          = process.env.PORT                   || 3001;
const BASE_URL      = process.env.BASE_URL               || "https://mohammadramiz.in";
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS          || "";
const APP_PASS      = process.env.APP_PASS               || "";
const APP_VERSION   = process.env.VERCEL_GIT_COMMIT_SHA  || "dev";

// ─── Paths ───────────────────────────────────────────────────────────────────
const IS_COMPILED = __filename.endsWith(".js");
const ROOT        = IS_COMPILED ? path.resolve(__dirname, "..") : __dirname;

const DIST        = path.join(ROOT, "dist");
const STATIC      = path.join(ROOT, "static");
const TEMPLATES   = path.join(ROOT, "templates");
const POLICY_FILE = path.join(ROOT, "policies.json");
const ACH_IMAGES  = path.join(ROOT, "src", "assets", "Certificate");  // achievement photos
const APP_LOGOS   = path.join(ROOT, "src", "assets", "AppLogos");     // app logo images

console.log(`[server] ROOT        : ${ROOT}`);
console.log(`[server] DIST        : ${DIST}  (exists: ${fs.existsSync(DIST)})`);
console.log(`[server] ACH_IMAGES  : ${ACH_IMAGES}  (exists: ${fs.existsSync(ACH_IMAGES)})`);
console.log(`[server] APP_LOGOS   : ${APP_LOGOS}  (exists: ${fs.existsSync(APP_LOGOS)})`);

// ─── Load policies.json ──────────────────────────────────────────────────────
interface PolicyApp { name: string; [key: string]: unknown; }
let policies: Record<string, PolicyApp> = {};
if (fs.existsSync(POLICY_FILE)) {
  try {
    policies = JSON.parse(fs.readFileSync(POLICY_FILE, "utf-8"));
    console.log(`[server] Loaded ${Object.keys(policies).length} policies`);
  } catch (e) { console.error("[server] Failed to parse policies.json:", e); }
}

// ─════════════════════════════════════════════════════════════════════════════
//  ACHIEVEMENTS DATA
// ═════════════════════════════════════════════════════════════════════════════
const ACHIEVEMENTS = [
  {
    category: "Patent", title: "Patent for Real-Time User Safety During Vehicle Commutes",
    description: "Filed a patent with the Indian Government for METHOD AND SYSTEM FOR REAL-TIME USER SAFETY DURING VEHICLE COMMUTES. The system monitors commuter behavior using sensor fusion and AI to detect anomalies and trigger emergency alerts in real time. Application No: 202511053637 A, Publication Date: 27 June 2025.",
    date: "2025", status: "Filed", emoji: "💡",
    photo: "/api/achievement-image/patent.png",
    tags: ["AI", "Safety", "Sensor Fusion", "Government", "Innovation"],
    location: "India", organizer: "Indian Patent Office",
  },
  {
    category: "Work", title: "Moglix — Python & Agentic AI Developer",
    description: "Working as a Python developer and Agentic AI specialist at Moglix, India's leading B2B e-commerce platform. Building intelligent automation pipelines, supplier invoice accuracy systems, and an AI-powered customer support chatbot using LLMs and agentic workflows.",
    date: "2026", status: "Current", emoji: "🚀",
    photo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["Python", "Agentic AI", "LLM", "FastAPI", "OCR", "B2B"],
    location: "Noida, India", organizer: "Moglix",
  },
  {
    category: "Internship", title: "Bluestock Fintech — SDE Intern",
    description: "Worked as Software Development Engineer (SDE) at Bluestock Fintech. Led development of the internal admin panel using Flask and Python, built REST APIs, and collaborated with a cross-functional team across design, product, and backend engineering.",
    date: "2025", status: "Completed", emoji: "💼",
    photo: "/api/achievement-image/bluestock.jpg",
    tags: ["Flask", "Python", "REST API", "FinTech", "Admin Panel"],
    location: "Remote, India", organizer: "Bluestock Fintech",
  },
  {
    category: "Certification", title: "Machine Learning A-Z (Udemy)",
    description: "Completed the comprehensive Machine Learning A-Z course on Udemy, covering supervised and unsupervised learning, deep learning fundamentals, model evaluation, and real-world ML pipelines using both Python (scikit-learn, TensorFlow) and R.",
    date: "2024", status: "Certified", emoji: "🤖",
    photo: "/api/achievement-image/udemy.jpg",
    tags: ["Python", "R", "ML", "scikit-learn", "Deep Learning"],
    organizer: "Udemy",
  },
  {
    category: "Hackathon", title: "56 Hours Hackathon — KRMU University",
    description: "Finalist in a grueling 56-hour hackathon at K.R. Mangalam University, Gurgaon. Competed against 200+ teams from across India, surviving four rounds of judging before reaching the final stage.",
    date: "2024", status: "Finalist", emoji: "🏆",
    photo: "/api/achievement-image/KRMU.jpg",
    tags: ["56hrs", "Finalist", "200+ Teams"],
    location: "Gurgaon, Haryana", organizer: "K.R. Mangalam University",
  },
  {
    category: "Hackathon", title: "24 Hours Hackathon — Sharda University",
    description: "Placed 6th in a 24-hour intensive hackathon at Sharda University, Greater Noida. Ranked in the top 10 out of 150+ teams, designing and building a working prototype under extreme time pressure.",
    date: "2024", status: "6th Place", emoji: "🥇",
    photo: "/api/achievement-image/Sharda.jpg",
    tags: ["24hrs", "Top-10", "150+ Teams"],
    location: "Greater Noida, UP", organizer: "Sharda University",
  },
  {
    category: "Hackathon", title: "Hack For Impact — IIIT Delhi E-Summit 2025",
    description: "Participated in Hack For Impact at E-Summit 2025, hosted by IIIT Delhi. The challenge focused on building tech solutions with measurable social impact in education, healthcare, and sustainability.",
    date: "2025", status: "Participant", emoji: "⚡",
    photo: "/api/achievement-image/IIITD.png",
    tags: ["Social Impact", "E-Summit", "IIIT"],
    location: "New Delhi, India", organizer: "IIIT Delhi",
  },
  {
    category: "Hackathon", title: "Infrastructure Innovation — NHAI & HOAI",
    description: "Participated in a government-backed hackathon by the National Highway Authority of India and HOAI. Proposed an AI-assisted highway monitoring solution for real-time pothole detection and commuter safety.",
    date: "2024", status: "Participant", emoji: "🛣️",
    photo: "/api/achievement-image/NHAI.jpg",
    tags: ["Government", "AI", "Infrastructure", "Safety"],
    location: "India", organizer: "NHAI & HOAI",
  },
  {
    category: "Hackathon", title: "Build With India — Google Office",
    description: "Selected to participate in the Build With India Hackathon at Google's India headquarters. Worked on a solution leveraging Google Maps SDK, Firebase, and Vertex AI to solve a hyperlocal logistics problem for Indian small businesses.",
    date: "2025", status: "Participant", emoji: "🏢",
    photo: "/api/achievement-image/BuildWithIndia.png",
    tags: ["Google", "Firebase", "Vertex AI", "Maps SDK"],
    location: "Google India, Gurugram", organizer: "Google India",
  },
  {
    category: "Certification", title: "Deep Dive on AWS",
    description: "Completed Amazon's Deep Dive on AWS certification, gaining hands-on expertise in EC2, S3, CloudWatch, Lambda, IAM, and VPC networking. Applied directly to production deployments for portfolio backend.",
    date: "2024", status: "Certified", emoji: "☁️",
    photo: "/api/achievement-image/AWS.jpg",
    tags: ["AWS", "EC2", "S3", "Lambda", "CloudWatch", "IAM"],
    organizer: "Amazon AWS",
  },
  {
    category: "Competition", title: "Flipkart GRiD 6.0 — Software Development Track",
    description: "Competed in Flipkart GRiD 6.0 with 300,000+ registrations nationwide. Cleared Level 1 in the Software Development Track, demonstrating strong fundamentals in system design, data structures, and e-commerce engineering.",
    date: "2024", status: "Level 1 Cleared", emoji: "🛒",
    photo: "/api/achievement-image/Flipkart.jpg",
    tags: ["E-Commerce", "System Design", "300K+ Teams", "Flipkart"],
    organizer: "Flipkart",
  },
];

const STATS = {
  certifications: ACHIEVEMENTS.filter((a) => a.category === "Certification").length + 9,
  hackathonWins:  ACHIEVEMENTS.filter((a) =>
    a.category === "Hackathon" &&
    ["Finalist", "6th Place", "1st", "2nd", "3rd"].some((s) => a.status.includes(s))
  ).length,
  patents:  ACHIEVEMENTS.filter((a) => a.category === "Patent").length,
  projects: 15,
};

// ─── App ─────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (fs.existsSync(STATIC)) {
  app.use("/static", express.static(STATIC, { maxAge: "1y", immutable: true, etag: true }));
}

// ─── Security headers ────────────────────────────────────────────────────────
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Content-Type-Options",    "nosniff");
  res.setHeader("X-Frame-Options",           "DENY");
  res.setHeader("Referrer-Policy",           "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy",        "geolocation=(), camera=(), microphone=()");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  next();
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const today = (): string => new Date().toISOString().split("T")[0];

function cachedResponse(res: Response, body: string, mime = "text/html"): void {
  res.setHeader("Content-Type",  `${mime}; charset=utf-8`);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.setHeader("ETag",          APP_VERSION);
  res.setHeader("Last-Modified", new Date().toUTCString());
  res.status(200).send(body);
}

function getSubdomain(req: Request): string {
  const parts = req.hostname.toLowerCase().split(".");
  return parts.length <= 2 ? "" : parts[0];
}

function sendSPA(res: Response): void {
  const indexPath = path.join(DIST, "index.html");
  if (fs.existsSync(indexPath)) {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(indexPath);
  } else {
    console.error(`[server] index.html not found at: ${indexPath}`);
    res.status(503).send(`<pre>Build not found.\nExpected: ${indexPath}\nRun: npm run build</pre>`);
  }
}

// ─── Shared image helpers ─────────────────────────────────────────────────────
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png",  ".webp": "image/webp",
  ".gif": "image/gif",
};

function serveImage(folder: string, label: string) {
  return (req: Request, res: Response) => {
    const filename = path.basename(req.params.filename);
    const ext      = path.extname(filename).toLowerCase();

    if (!ALLOWED_EXT.has(ext)) return res.status(400).json({ error: "Invalid file type" });

    const filePath = path.join(folder, filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`[${label}] Not found: ${filePath}`);
      return res.status(404).json({ error: "Image not found", filename });
    }

    res.setHeader("Content-Type",  MIME_MAP[ext] || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.sendFile(filePath);
    console.log(`[${label}] Served: ${filename}`);
  };
}

// ─════════════════════════════════════════════════════════════════════════════
//  API — ACHIEVEMENT IMAGES   GET /api/achievement-image/:filename
//  Served from src/assets/Certificate/
// ═════════════════════════════════════════════════════════════════════════════
app.get("/api/achievement-image/:filename", serveImage(ACH_IMAGES, "cert-imgs"));

app.get("/api/achievement-images", (_req, res) => {
  const files = fs.existsSync(ACH_IMAGES)
    ? fs.readdirSync(ACH_IMAGES).filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
    : [];
  res.json({ folder: ACH_IMAGES, count: files.length, files: files.map((f) => ({ filename: f, url: `/api/achievement-image/${f}` })) });
});

// ─════════════════════════════════════════════════════════════════════════════
//  API — APP LOGOS   GET /api/app-logo/:filename
//  Served from src/assets/AppLogos/
//  Usage:  <img src="/api/app-logo/Linkium.png" />
// ═════════════════════════════════════════════════════════════════════════════
app.get("/api/app-logo/:filename", serveImage(APP_LOGOS, "app-logos"));

app.get("/api/app-logos", (_req, res) => {
  const files = fs.existsSync(APP_LOGOS)
    ? fs.readdirSync(APP_LOGOS).filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase()))
    : [];
  res.json({ folder: APP_LOGOS, count: files.length, files: files.map((f) => ({ filename: f, url: `/api/app-logo/${f}` })) });
});

// ─════════════════════════════════════════════════════════════════════════════
//  API — ACHIEVEMENTS DATA   GET /api/achievements
// ═════════════════════════════════════════════════════════════════════════════
app.get("/api/achievements", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=300");
  res.json({ achievements: ACHIEVEMENTS, stats: STATS, total: ACHIEVEMENTS.length, lastUpdated: today() });
  console.log(`[api] GET /api/achievements — ${ACHIEVEMENTS.length} items`);
});

// ─════════════════════════════════════════════════════════════════════════════
//  ROBOTS.TXT
// ═════════════════════════════════════════════════════════════════════════════
app.get("/robots.txt", (_req, res) => {
  const content = `# robots.txt — Mohammad Ramiz Portfolio
# Auto-generated: ${new Date().toUTCString()}
# Version: ${APP_VERSION}

User-agent: *
Allow: /

Disallow: /api/
Disallow: /.git/
Disallow: /.env
Disallow: /.DS_Store
Disallow: /debug/
Disallow: /server-status
Disallow: /src/
Disallow: /node_modules/
Disallow: /*.map$

User-agent: Googlebot
Allow: /
Crawl-delay: 2

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: LinkedInBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.status(200).send(content);
});

// ─════════════════════════════════════════════════════════════════════════════
//  SITEMAP.XML
// ═════════════════════════════════════════════════════════════════════════════
interface SitemapUrl { loc: string; priority: number; changefreq: string; hreflang?: boolean; sections?: string[]; }
const SITEMAP_ROUTES: SitemapUrl[] = [
  { loc: `${BASE_URL}/`, priority: 1.0, changefreq: "weekly", hreflang: true, sections: ["hero","about","experience","android-projects","desktop-projects","skills","contact","mini-game"] },
  { loc: "https://achievements.mohammadramiz.in", priority: 0.8, changefreq: "monthly", hreflang: true },
  { loc: "https://windowstore.mohammadramiz.in",  priority: 0.7, changefreq: "monthly", hreflang: true },
];

function hreflangBlock(url: string): string {
  return [
    `    <xhtml:link rel="alternate" hreflang="en"        href="${escapeHtml(url)}" />`,
    `    <xhtml:link rel="alternate" hreflang="en-in"     href="${escapeHtml(url)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(url)}" />`,
  ].join("\n");
}

function buildSitemap(): string {
  const lm = today();
  const entries: string[] = [];
  for (const r of SITEMAP_ROUTES) {
    const hrl = r.hreflang ? `\n${hreflangBlock(r.loc)}` : "";
    entries.push(`\n  <url>\n    <loc>${escapeHtml(r.loc)}</loc>\n    <lastmod>${lm}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>${hrl}\n  </url>`);
    if (r.sections) {
      for (const s of r.sections) entries.push(`\n  <url>\n    <loc>${escapeHtml(r.loc)}#${s}</loc>\n    <lastmod>${lm}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`);
    }
  }
  for (const n of Object.keys(policies)) entries.push(`\n  <url>\n    <loc>${escapeHtml(`https://privacy-policy.mohammadramiz.in/${n}`)}</loc>\n    <lastmod>${lm}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.4</priority>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}\n</urlset>`;
}

app.get("/sitemap.xml", (_req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(buildSitemap());
  console.log(`[sitemap] Served — ${today()}`);
});

// ─════════════════════════════════════════════════════════════════════════════
//  SECURITY.TXT
// ═════════════════════════════════════════════════════════════════════════════
app.get("/.well-known/security.txt", (_req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.status(200).send(`Contact: mailto:mail@mohammadramiz.in\nExpires: 2026-12-31T23:59:59.000Z\nPreferred-Languages: en\nCanonical: ${BASE_URL}/.well-known/security.txt\n`);
});

// ─════════════════════════════════════════════════════════════════════════════
//  301 REDIRECTS
// ═════════════════════════════════════════════════════════════════════════════
app.get("/windowsapp",              (_r, res) => res.redirect(301, "https://windowstore.mohammadramiz.in"));
app.get("/achievements",            (_r, res) => res.redirect(301, "https://achievements.mohammadramiz.in"));
app.get("/privacy-policy/:appName", (req, res) => res.redirect(301, `https://privacy-policy.mohammadramiz.in/${req.params.appName}`));

// ─════════════════════════════════════════════════════════════════════════════
//  CONTACT FORM
// ═════════════════════════════════════════════════════════════════════════════
app.post("/send", async (req: Request, res: Response) => {
  const message = req.body?.message || "";
  if (!EMAIL_ADDRESS || !APP_PASS) return res.status(500).json({ success: false, error: "Email not configured" });
  try {
    const t = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: EMAIL_ADDRESS, pass: APP_PASS } });
    await t.sendMail({ from: EMAIL_ADDRESS, to: EMAIL_ADDRESS, subject: "Connecting To Work With Ramiz", text: message });
    return res.json({ success: true });
  } catch (err) { console.error("[contact]", err); return res.status(500).json({ success: false }); }
});

// ─════════════════════════════════════════════════════════════════════════════
//  HEALTH CHECK
// ═════════════════════════════════════════════════════════════════════════════
app.get("/health", (_req, res) => {
  const countImages = (folder: string) =>
    fs.existsSync(folder)
      ? fs.readdirSync(folder).filter((f) => ALLOWED_EXT.has(path.extname(f).toLowerCase())).length
      : 0;

  res.json({
    status: "ok", version: APP_VERSION,
    timestamp: new Date().toISOString(), uptime: process.uptime(),
    paths: { root: ROOT, dist: DIST, distExists: fs.existsSync(DIST) },
    achievements: ACHIEVEMENTS.length,
    certImages:   countImages(ACH_IMAGES),
    appLogos:     countImages(APP_LOGOS),
    policies:     Object.keys(policies).length,
  });
});

// ─════════════════════════════════════════════════════════════════════════════
//  FAVICON
// ═════════════════════════════════════════════════════════════════════════════
app.get("/favicon.ico", (_r, res) => { res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); res.status(204).send(); });

// ─════════════════════════════════════════════════════════════════════════════
//  SUBDOMAIN ROUTER
// ═════════════════════════════════════════════════════════════════════════════
const subdomainHandler: RequestHandler = (req, res, next) => {
  const sub = getSubdomain(req);
  if (sub === "windowstore") {
    const tp = path.join(TEMPLATES, "windowstore.html");
    return fs.existsSync(tp) ? cachedResponse(res, fs.readFileSync(tp, "utf-8")) : sendSPA(res);
  }
  if (sub === "achievements" || sub === "achivements") {
    const tp = path.join(TEMPLATES, "newAchive.html");
    if (fs.existsSync(tp)) {
      let html = fs.readFileSync(tp, "utf-8");
      html = html.replace("<!-- CERTIFICATES_DATA -->", `<script>window.__CERTIFICATES__ = ${JSON.stringify(ACHIEVEMENTS)};</script>`);
      return cachedResponse(res, html);
    }
    return sendSPA(res);
  }
  if (sub === "privacy-policy") return next();
  next();
};
app.use(subdomainHandler);

app.get("/:appName", (req, res, next) => {
  if (getSubdomain(req) !== "privacy-policy") return next();
  const appData = policies[req.params.appName];
  if (!appData) return res.status(404).send("App policy not found");
  const tp = path.join(TEMPLATES, "privacy_policy.html");
  if (!fs.existsSync(tp)) return res.status(404).send("Template not found");
  let html = fs.readFileSync(tp, "utf-8");
  html = html.replace(/\{\{\s*app\.(\w+)\s*\}\}/g, (_, k) => escapeHtml(String((appData as Record<string, unknown>)[k] ?? "")));
  return cachedResponse(res, html);
});

// ─════════════════════════════════════════════════════════════════════════════
//  VITE BUILD + SPA FALLBACK
// ═════════════════════════════════════════════════════════════════════════════
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST, { maxAge: "1y", immutable: true, index: false }));
} else {
  console.warn(`[server] WARNING: dist/ not found — run 'npm run build'`);
}

app.get("*", (_req, res) => sendSPA(res));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[server] Unhandled error:", err);
  res.status(500).send("500 Internal Server Error");
});

// ─════════════════════════════════════════════════════════════════════════════
//  START
// ═════════════════════════════════════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║   Mohammad Ramiz Portfolio — Node.js Server          ║
  ╠══════════════════════════════════════════════════════╣
  ║   http://localhost:${String(PORT).padEnd(32)}║
  ║   http://localhost:${String(PORT).padEnd(13)}/api/achievements     ║
  ║   http://localhost:${String(PORT).padEnd(13)}/api/app-logos        ║
  ║   http://localhost:${String(PORT).padEnd(13)}/api/achievement-images║
  ║   http://localhost:${String(PORT).padEnd(13)}/health               ║
  ╚══════════════════════════════════════════════════════╝

  📁 Certificate images : src/assets/Certificate/
  📁 App logos          : src/assets/AppLogos/
  `);
});

export default app;