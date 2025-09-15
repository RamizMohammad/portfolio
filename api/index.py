from flask import Flask, render_template, request, jsonify, Response, url_for
import smtplib
import os
from email.message import EmailMessage
from datetime import datetime

app = Flask(__name__)

# Secret Key and Email Credentials from Environment Variables
app.secret_key = os.getenv("SECRET_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
APP_PASSWORD = os.getenv("APP_PASS")

@app.route("/")
def home():
    image_folder = os.path.join(app.static_folder, 'assets', 'scrolling')
    profile_images = [
        img for img in os.listdir(image_folder)
        if img.lower().endswith(('.jpg', '.jpeg', '.png', '.gif','.HEIC'))
    ]
    profile_images.sort()
    return render_template('newIndex.html', profile_images=profile_images)

@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    lastmod = datetime.now().strftime('%Y-%m-%d')

    # Define custom priorities for important pages
    priority_map = {
        '/': '1.00',
        '/about': '0.90',
        '/service': '0.90',
        '/portfolio': '0.80',
        '/contact': '0.80',
        '/achievements': '0.85',
    }

    # Routes to skip
    exclude_routes = ['/sitemap.xml', '/robots.txt']

    pages = []
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and not rule.rule.startswith(("/static", "/api")):
            if rule.rule not in exclude_routes:
                url = f"https://www.mohammadramiz.in{rule.rule}"
                priority = priority_map.get(rule.rule, "0.70")
                pages.append({'loc': url, 'priority': priority, 'lastmod': lastmod})

    # Build XML
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for page in pages:
        sitemap_xml += f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{page['lastmod']}</lastmod>
    <priority>{page['priority']}</priority>
  </url>\n"""

    sitemap_xml += '</urlset>'
    return Response(sitemap_xml, mimetype='application/xml')

# Robots.txt Route
@app.route('/robots.txt')
def robots():
    content = "User-agent: *\nAllow: /\nSitemap: https://www.mohammadramiz.in/sitemap.xml"
    return Response(content, mimetype='text/plain')

# Achievements Route
@app.route("/achievements")
def achievements():
    certificates = [
        {
            "title": "Patent for METHOD AND SYSTEM FOR REAL-TIME USER SAFETY DURING VEHICLE COMMUTES",
            "image": "assets/Certificate/patent.png",
            "description": "I also got a petent from indian goverment for my project Application No: 202511053637 A Publication Date: 27 June 2025"
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
    return render_template("newAchive.html", certificates=certificates)

# Contact Form Email Route
@app.route('/send', methods=['POST'])
def email():
    try:
        # Retrieve form data
        name = request.form['name']
        user_email = request.form['email']
        message = request.form['message']

        # Create the full message
        full_message = f"From: {name}\nEmail: {user_email}\n\n{message}"

        # Create EmailMessage
        msg = EmailMessage()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = "Connecting To Work With Ramiz"
        msg['Reply-To'] = user_email
        msg.set_content(full_message)

        # Gmail SMTP
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, APP_PASSWORD)
            smtp.send_message(msg)

        return jsonify({"success": True, "message": "Message sent successfully!"})

    except Exception as e:
        import traceback
        print("Error sending email:", e)
        traceback.print_exc()
        return jsonify({"success": False, "message": "Something went wrong."})
