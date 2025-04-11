from flask import Flask,render_template,request,jsonify
import smtplib
import os
from email.message import EmailMessage

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
APP_PASSWORD = os.getenv("APP_PASS")

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
