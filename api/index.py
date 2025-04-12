from flask import Flask,render_template,request,jsonify
import smtplib
import os
from email.message import EmailMessage

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
APP_PASSWORD = os.getenv("APP_PASS")

from flask import Flask, Response
from datetime import datetime

app = Flask(__name__)

@app.route('/sitemap.xml', methods=['GET'])
def sitemap():
    pages = [
        {'loc': 'https://www.mohammadramiz.in/', 'priority': '1.00'},
        {'loc': 'https://www.mohammadramiz.in/#about', 'priority': '0.90'},
        {'loc': 'https://www.mohammadramiz.in/#service', 'priority': '0.90'},
        {'loc': 'https://www.mohammadramiz.in/#portfolio', 'priority': '0.80'},
        {'loc': 'https://www.mohammadramiz.in/#contact', 'priority': '0.80'},
    ]

    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'

    lastmod = datetime.now().strftime('%Y-%m-%d')

    for page in pages:
        sitemap_xml += f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>{page['priority']}</priority>
  </url>\n"""

    sitemap_xml += '</urlset>'

    return Response(sitemap_xml, mimetype='application/xml')

@app.route('/robots.txt')
def robots():
    return Response("User-agent: *\nAllow: /\nSitemap: https://www.mohammadramiz.in/sitemap.xml", mimetype='text/plain')

@app.route("/achievements")
def achievements():
    certificates = [
        {
            "title": "56 Hours Hackathon",
            "image": "assets/Certificate/KRMU.jpg",
            "description": "Finalist in the 56 hours long hackathon organised at KRMU university in Gurgaon"
        },
        {
            "title": "Python for Data Science",
            "image": "assets/imgs/certificate2.jpg",
            "description": "Certified by IBM with real-time data science projects."
        },
        {
            "title": "Hackathon Finalist",
            "image": "assets/imgs/certificate3.jpg",
            "description": "Finalist in Smart India Hackathon 2024 with an AI-driven EdTech solution."
        },
        # Add more certificates here!
    ]
    return render_template("achive.html", certificates=certificates)

@app.route("/")
def home():
    return render_template('index.html')

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

        return jsonify({ "success": True, "message": "Message sent successfully!" })

    except Exception as e:
        return jsonify({ "success": False, "message": "Something went wrong." })
