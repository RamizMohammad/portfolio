from flask import Flask, render_template, request, jsonify, Response
import smtplib
import os
from email.message import EmailMessage
from datetime import datetime

app = Flask(__name__)

# Secret Key and Email Credentials from Environment Variables
app.secret_key = os.getenv("SECRET_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
APP_PASSWORD = os.getenv("APP_PASS")

# Home Route
@app.route("/")
def home():
    return render_template('index.html')

# Sitemap Route
@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    pages = [
        {'loc': 'https://www.mohammadramiz.in/', 'priority': '1.00'},
        {'loc': 'https://www.mohammadramiz.in/#about', 'priority': '0.90'},
        {'loc': 'https://www.mohammadramiz.in/#service', 'priority': '0.90'},
        {'loc': 'https://www.mohammadramiz.in/#portfolio', 'priority': '0.80'},
        {'loc': 'https://www.mohammadramiz.in/#contact', 'priority': '0.80'},
    ]

    lastmod = datetime.now().strftime('%Y-%m-%d')
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for page in pages:
        sitemap_xml += f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{lastmod}</lastmod>
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
    return render_template("achive.html", certificates=certificates)

# Contact Form Email Route
@app.route('/send', methods=['POST'])
def email():
    try:
        name = request.form['name']
        user_email = request.form['email']
        message = request.form['message']

        full_message = f"From: {name}\nEmail: {user_email}\n\n{message}"

        email = EmailMessage()
        email['From'] = user_email
        email['To'] = EMAIL_ADDRESS
        email['Subject'] = "Connecting To Work With Ramiz"
        email.set_content(full_message)

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, APP_PASSWORD)
            smtp.send_message(email)

        return jsonify({"success": True, "message": "Message sent successfully!"})

    except Exception as e:
        # Optional: log the error for debugging
        print(f"Error sending email: {e}")
        return jsonify({"success": False, "message": "Something went wrong."})