from flask import (
    Flask, render_template, request, jsonify,
    Response, redirect
)
import smtplib
import os
from email.message import EmailMessage
from datetime import datetime
import json
import html

app = Flask(__name__)

# --------------------------------------------------
# ENV
# --------------------------------------------------
app.secret_key = os.getenv("SECRET_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
APP_PASSWORD = os.getenv("APP_PASS")

# --------------------------------------------------
# LOAD POLICIES
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POLICY_FILE = os.path.join(BASE_DIR, 'policies.json')

policies = {}
try:
    with open(POLICY_FILE, 'r') as f:
        policies = json.load(f)
except Exception as e:
    print("⚠️ policies.json error:", e)

# --------------------------------------------------
# MAIN DOMAIN
# --------------------------------------------------
@app.route("/")
def home():
    image_folder = os.path.join(app.static_folder, 'assets', 'scrolling')
    profile_images = [
        img for img in os.listdir(image_folder)
        if img.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.heic'))
    ]
    profile_images.sort()
    return render_template("newIndex.html", profile_images=profile_images)

# --------------------------------------------------
# PRIVACY POLICY SUBDOMAIN
# privacy-policy.mohammadramiz.in/<app_name>
# --------------------------------------------------
@app.route("/<app_name>")
def privacy_policy(app_name):
    # Only allow this on privacy-policy subdomain
    if not request.host.startswith("privacy-policy."):
        return Response("Not Found", status=404)

    app_data = policies.get(app_name)
    if not app_data:
        return Response("App policy not found", status=404)

    return render_template("privacy_policy.html", app=app_data)

# --------------------------------------------------
# WINDOWSTORE SUBDOMAIN
# windowstore.mohammadramiz.in
# --------------------------------------------------
@app.route("/windowstore")
def windowstore_proxy():
    if request.host.startswith("windowstore."):
        return redirect("/", code=302)
    return Response("Not Found", status=404)

@app.route("/")
def windowstore():
    if request.host.startswith("windowstore."):
        return render_template("windowstore.html")
    return home()

# --------------------------------------------------
# ACHIEVEMENTS SUBDOMAIN
# achievements.mohammadramiz.in
# --------------------------------------------------
@app.route("/achievements")
def achievements_proxy():
    if request.host.startswith("achievements."):
        return redirect("/", code=302)
    return Response("Not Found", status=404)

@app.route("/")
def achievements():
    if request.host.startswith("achievements."):
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

    return home()

# --------------------------------------------------
# OLD URL REDIRECTS (SEO)
# --------------------------------------------------
@app.route("/privacy-policy/<app_name>")
def old_privacy_redirect(app_name):
    return redirect(
        f"https://privacy-policy.mohammadramiz.in/{app_name}",
        code=301
    )

@app.route("/windowsapp")
def old_windows_redirect():
    return redirect(
        "https://windowstore.mohammadramiz.in",
        code=301
    )

@app.route("/achievements")
def old_achievements_redirect():
    return redirect(
        "https://achievements.mohammadramiz.in",
        code=301
    )

# --------------------------------------------------
# CONTACT
# --------------------------------------------------
@app.route('/send', methods=['POST'])
def email():
    try:
        msg = EmailMessage()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = "Connecting To Work With Ramiz"
        msg.set_content(request.form['message'])

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
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
    lastmod = datetime.now().strftime('%Y-%m-%d')

    urls = [
        "https://mohammadramiz.in/",
        "https://windowstore.mohammadramiz.in",
        "https://achievements.mohammadramiz.in",
    ]

    for app_name in policies.keys():
        urls.append(f"https://privacy-policy.mohammadramiz.in/{app_name}")

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for u in urls:
        xml += f"""
        <url>
            <loc>{html.escape(u)}</loc>
            <lastmod>{lastmod}</lastmod>
        </url>
        """

    xml += '</urlset>'
    return Response(xml, mimetype="application/xml")
