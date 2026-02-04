from flask import Flask, render_template, request, Response, redirect, jsonify
import os, json, html
from datetime import datetime
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

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
# ROOT (ALL DOMAINS & SUBDOMAINS)
# --------------------------------------------------
@app.route("/", methods=["GET", "HEAD"])
def root():
    host = request.host.lower()

    # windowstore.mohammadramiz.in
    if host.startswith("windowstore."):
        return render_template("windowstore.html")

    # achievements.mohammadramiz.in (support typo too)
    if host.startswith(("achievements.", "achivements.")):
        certificates = [
            {
                "title": "Patent for METHOD AND SYSTEM FOR REAL-TIME USER SAFETY DURING VEHICLE COMMUTES",
                "image": "assets/Certificate/patent.png",
                "description": "Patent – Application No: 202511053637"
            },
            {
                "title": "Internship - Bluestock Fintech",
                "image": "assets/Certificate/bluestock.jpg",
                "description": "Worked as SDE using Flask"
            }
        ]
        return render_template("newAchive.html", certificates=certificates)

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

    return render_template("newIndex.html", profile_images=images)

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

    return render_template("privacy_policy.html", app=app_data)

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
# FAVICON (STOP LOG SPAM)
# --------------------------------------------------
@app.route("/favicon.ico")
def favicon():
    return Response("", status=204)

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
# SITEMAP
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
    return Response(xml, mimetype="application/xml")
