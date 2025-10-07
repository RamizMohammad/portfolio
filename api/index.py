from flask import Flask, render_template, request, jsonify, Response, url_for
import smtplib
import os
from email.message import EmailMessage
from datetime import datetime
import json
import html

app = Flask(__name__)

# Secret Key and Email Credentials from Environment Variables
app.secret_key = os.getenv("SECRET_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
APP_PASSWORD = os.getenv("APP_PASS")

# --- Start of your application logic ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POLICY_FILE = os.path.join(BASE_DIR, 'policies.json')

policies = {}
try:
    with open(POLICY_FILE, 'r') as f:
        policies = json.load(f)
except Exception as e:
    print("⚠️ Could not load policies.json:", e)

@app.route("/privacy-policy/<app_name>")
def privacy_policy(app_name):
    app_data = policies.get(app_name)
    if not app_data:
        return Response("App policy not found", status=404, mimetype="text/html")
    return render_template("privacy_policy.html", app=app_data)

@app.route("/")
def home():
    image_folder = os.path.join(app.static_folder, 'assets', 'scrolling')
    profile_images = [
        img for img in os.listdir(image_folder)
        if img.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.heic'))
    ]
    profile_images.sort()
    # Cache homepage for 3 days
    response = Response(render_template('newIndex.html', profile_images=profile_images))
    response.headers["Cache-Control"] = "s-maxage=259200"  # 3 days
    return response

@app.route("/download/<filename>")
def download(filename):
    downloads_dir = os.path.join(app.root_path, "static", "Downloads")
    return send_from_directory(directory=downloads_dir, filename=filename, as_attachment=True)

@app.route("/windowsapp")
def winApps():
    return render_template('windowstore.html')

@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    lastmod = datetime.now().strftime('%Y-%m-%d')

    priority_map = {
        '/': '1.00',
        '/about': '0.90',
        '/service': '0.90',
        '/portfolio': '0.80',
        '/contact': '0.80',
        '/achievements': '0.85',
    }

    exclude_routes = ['/sitemap.xml', '/robots.txt']

    pages = []
    # 1️⃣ Static routes
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and not rule.rule.startswith(("/static", "/api")):
            if rule.rule not in exclude_routes:
                # skip dynamic placeholders like <app_name>
                if "<" in rule.rule or ">" in rule.rule:
                    continue
                url = f"https://www.mohammadramiz.in{rule.rule}"
                priority = priority_map.get(rule.rule, "0.70")
                pages.append({'loc': html.escape(url), 'priority': priority, 'lastmod': lastmod})

    # 2️⃣ Dynamic privacy-policy routes from policies.json
    for app_name in policies.keys():
        url = f"https://www.mohammadramiz.in/privacy-policy/{app_name}"
        pages.append({'loc': html.escape(url), 'priority': "0.70", 'lastmod': lastmod})

    # 3️⃣ Build XML
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for page in pages:
        sitemap_xml += f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{page['lastmod']}</lastmod>
    <priority>{page['priority']}</priority>
  </url>\n"""

    sitemap_xml += '</urlset>'
    response = Response(sitemap_xml, mimetype='application/xml')
    response.headers["Cache-Control"] = "s-maxage=86400"  # 1 day
    return response

@app.route('/robots.txt')
def robots():
    content = "User-agent: *\nAllow: /\nSitemap: https://www.mohammadramiz.in/sitemap.xml"
    response = Response(content, mimetype='text/plain')
    response.headers["Cache-Control"] = "s-maxage=86400"  # 1 day
    return response

@app.route("/achievements")
def achievements():
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
    response = Response(render_template("newAchive.html", certificates=certificates))
    response.headers["Cache-Control"] = "s-maxage=259200"  # 3 days
    return response

@app.route('/send', methods=['POST'])
def email():
    try:
        name = request.form['name']
        user_email = request.form['email']
        message = request.form['message']

        full_message = f"From: {name}\nEmail: {user_email}\n\n{message}"

        print("📩 New Contact Request:")
        print(full_message)

        msg = EmailMessage()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = "Connecting To Work With Ramiz"
        msg['Reply-To'] = user_email
        msg.set_content(full_message)

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, APP_PASSWORD)
            smtp.send_message(msg)

        # Optional: remove WhatsApp auto-open for production
        # import webbrowser
        # whatsapp_url = f"https://wa.me/919517028373?text={full_message}"
        # webbrowser.open(whatsapp_url)

        return jsonify({"success": True, "message": "Message sent successfully!"})

    except Exception as e:
        import traceback
        print("❌ Error sending email:", e)
        traceback.print_exc()
        return jsonify({"success": False, "message": "Something went wrong."})
