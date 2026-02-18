from flask import Flask, render_template, request, Response, redirect, jsonify
import os, json, html
from datetime import datetime
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

# --------------------------------------------------
# APP VERSION (AUTO CHANGES ON EVERY VERCEL DEPLOY)
# --------------------------------------------------
APP_VERSION = os.getenv("VERCEL_GIT_COMMIT_SHA", "v1")

# --------------------------------------------------
# ENV
# --------------------------------------------------
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
APP_PASSWORD = os.getenv("APP_PASS")

# --------------------------------------------------
# LOAD POLICIES
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POLICY_FILE = os.path.join(BASE_DIR, "policies.json")

policies = {}
if os.path.exists(POLICY_FILE):
    with open(POLICY_FILE) as f:
        policies = json.load(f)

# --------------------------------------------------
# CACHE HELPER (IMMUTABLE UNTIL REDEPLOY)
# --------------------------------------------------
def cached_response(content, max_age=31536000):
    response = Response(content)
    response.headers["Cache-Control"] = f"public, max-age={max_age}, immutable"
    response.headers["ETag"] = APP_VERSION
    response.headers["Last-Modified"] = datetime.utcnow()
    return response

# --------------------------------------------------
# ROOT HANDLER (ALL DOMAINS & SUBDOMAINS)
# --------------------------------------------------
@app.route("/", methods=["GET", "HEAD"])
def root():
    host = request.host.lower()

    # windowstore.mohammadramiz.in
    if host.startswith("windowstore."):
        return cached_response(
            render_template("windowstore.html")
        )

    # achievements.mohammadramiz.in (supports typo too)
    if host.startswith(("achievements.", "achivements.")):
        certificates = [
            {
                "title": "Patent for METHOD AND SYSTEM FOR REAL-TIME USER SAFETY DURING VEHICLE COMMUTES",
                "image": "assets/Certificate/patent.png",
                "description": "I also got a petent from indian goverment for my project Application No: 202511053637 A Publication Date: 27 June 2025"
            },
            {
                "title": "Internship - Bluestock Fintech",
                "image": "assets/Certificate/bluestock.jpg",
                "description": "Worked as Software Development Engineering(SDE) in which our team have developed the admin panel using Flask python"
            },
            {
                "title": "Machine Learning A-Z",
                "image": "assets/Certificate/udemy.jpg",
                "description": "Completed the certification over udemy on Machine Learing Using Python & R"
            },
            {
                "title": "56 Hours Hackathon",
                "image": "assets/Certificate/KRMU.jpg",
                "description": "Finalist in the 56 hours long hackathon organized at KRMU University in Gurgaon"
            },
            {
                "title": "24 Hours Hackathon",
                "image": "assets/Certificate/Sharda.jpg",
                "description": "6th Finalist in the 24 hours long hackathon organized at Sharda University in Greater Noida"
            },
            {
                "title": "Hack For Impact",
                "image": "assets/Certificate/IIITD.png",
                "description": "Participated in the E-Summit 2025 hackathon oragnised By IIIT Delhi"
            },
            {
                "title": "Participation in Hackathon",
                "image": "assets/Certificate/NHAI.jpg",
                "description": "Participated in the hackathon oragnised National Highway Authority of India and HOAI"
            },
            {
                "title": "Participant in Hackathon - Build With India",
                "image": "assets/Certificate/BuildWithIndia.png",
                "description": "Participant in the Build With India Hackathon organized at Google Office"
            },
            {
                "title": "Certificate of Completion",
                "image": "assets/Certificate/AWS.jpg",
                "description": "Completed the Deep Dive on AWS certification held over Amazon AWS"
            },
            {
                "title": "Certificate of Participation",
                "image": "assets/Certificate/Flipkart.jpg",
                "description": "Participated in Level 1: E-Commerce & Tech Quiz of Flipkart GRid 6.0 - Software Development Track"
            },
            # Add more certificates here!
        ]
        return cached_response(
            render_template("newAchive.html", certificates=certificates)
        )

    # privacy-policy.mohammadramiz.in
    if host.startswith("privacy-policy."):
        return Response("Append app name: /<app_name>", status=200)

    # main domain (mohammadramiz.in + www)
    image_folder = os.path.join(app.static_folder, "assets", "scrolling")
    images = []
    if os.path.exists(image_folder):
        images = sorted([
            i for i in os.listdir(image_folder)
            if i.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.heic'))
        ])

    return cached_response(
        render_template("newIndex.html", profile_images=images)
    )

# --------------------------------------------------
# PRIVACY POLICY PAGE
# privacy-policy.mohammadramiz.in/<app_name>
# --------------------------------------------------
@app.route("/<app_name>", methods=["GET", "HEAD"])
def privacy_policy(app_name):
    if not request.host.startswith("privacy-policy."):
        return Response("Not Found", status=404)

    app_data = policies.get(app_name)
    if not app_data:
        return Response("App policy not found", status=404)

    return cached_response(
        render_template("privacy_policy.html", app=app_data)
    )

# --------------------------------------------------
# OLD URL REDIRECTS (SEO SAFE)
# --------------------------------------------------
@app.route("/windowsapp")
def old_windows():
    return redirect("https://windowstore.mohammadramiz.in", 301)

@app.route("/achievements")
def old_achievements():
    return redirect("https://achievements.mohammadramiz.in", 301)

@app.route("/privacy-policy/<app_name>")
def old_privacy(app_name):
    return redirect(
        f"https://privacy-policy.mohammadramiz.in/{app_name}", 301
    )

# --------------------------------------------------
# CONTACT
# --------------------------------------------------
@app.route("/send", methods=["POST"])
def email():
    try:
        msg = EmailMessage()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = EMAIL_ADDRESS
        msg["Subject"] = "Connecting To Work With Ramiz"
        msg.set_content(request.form.get("message", ""))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, APP_PASSWORD)
            smtp.send_message(msg)

        return jsonify({"success": True})
    except Exception as e:
        print("❌ Email error:", e)
        return jsonify({"success": False}), 500

# --------------------------------------------------
# ADVANCED ROBOTS.TXT
# --------------------------------------------------
@app.route("/robots.txt")
def robots():
    content = f"""User-agent: *
Allow: /

Disallow: /api/
Disallow: /.git/
Disallow: /.env
Disallow: /.DS_Store
Disallow: /debug/
Disallow: /server-status

Sitemap: https://mohammadramiz.in/sitemap.xml
# Version: {APP_VERSION}
"""
    return Response(content, mimetype="text/plain")

# --------------------------------------------------
# SECURITY.TXT (RFC 9116)
# --------------------------------------------------
@app.route("/.well-known/security.txt")
def security_txt():
    content = """Contact: mailto:mail@mohammadramiz.in
Expires: 2026-12-31
Preferred-Languages: en
Canonical: https://mohammadramiz.in/.well-known/security.txt
"""
    return Response(content, mimetype="text/plain")

# --------------------------------------------------
# SITEMAP (SHORT CACHE)
# --------------------------------------------------
@app.route("/sitemap.xml")
def sitemap():
    lastmod = datetime.now().strftime("%Y-%m-%d")

    urls = [
        "https://mohammadramiz.in/",
        "https://windowstore.mohammadramiz.in",
        "https://achievements.mohammadramiz.in"
    ]

    for app in policies:
        urls.append(f"https://privacy-policy.mohammadramiz.in/{app}")

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for u in urls:
        xml += f"""
        <url>
            <loc>{html.escape(u)}</loc>
            <lastmod>{lastmod}</lastmod>
        </url>
        """

    xml += "</urlset>"

    response = Response(xml, mimetype="application/xml")
    response.headers["Cache-Control"] = "public, max-age=3600"
    return response

# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------
@app.route("/health")
def health():
    return jsonify({"status": "ok", "version": APP_VERSION})

# --------------------------------------------------
# FAVICON (CACHE FOREVER)
# --------------------------------------------------
@app.route("/favicon.ico")
def favicon():
    response = Response("", status=204)
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    return response

# --------------------------------------------------
# SECURITY HEADERS
# --------------------------------------------------
@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=()"
    response.headers["Strict-Transport-Security"] = (
        "max-age=63072000; includeSubDomains; preload"
    )
    return response

# --------------------------------------------------
# ERROR HANDLERS
# --------------------------------------------------
@app.errorhandler(404)
def not_found(e):
    return Response("404 Not Found", status=404)

@app.errorhandler(500)
def server_error(e):
    return Response("500 Internal Server Error", status=500)
