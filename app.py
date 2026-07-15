import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
from flask import Flask, render_template, flash, request, redirect

load_dotenv()

# Creating the web application instance
app = Flask(__name__)

app.secret_key = os.environ.get("flsk_scrt_key")

# Telling the web application this is the home page and what to do when someone visits it 
@app.route("/")
def home():
  about = {
    "hook": "I'm a Data Engineer & Machine Learning Developer who transforms raw, chaotic real-world web data into production-ready models and interactive web applications.",
    "philosophy": "Driven by curiosity, precision, and solving unglamorous data problems that others skip.",
    "story": "I don't just download clean datasets from data sites.. I write custom web scrapers to scrape data from sites, source live real-world data from reliable platforms and gorvenmental programs, gather primary data from carrying ou actual survey, then fight through these messy real-world data, engineer custom feature hierarchies, and deploy full-stack apps end to end.",
    "toolkit": [
      {
        "category": "Languages",
        "tools": ["Python (Pandas, NumPy, Scikit-learn)", "SQL"]
      },
      {
        "category": "ML & Deployment",
        "tools": ["Streamlit", "Flask", "Render", "Git/GitHub"]
      },
      {
        "category": "Data Engineering",
        "tools": ["Data Cleaning", "Feature Engineering", "Pipeline Automation"]
      }
    ]
  }

  projects = [
    {
      "title": "Lagos Real Estate Valuation Engine & Pipeline",
      "problem": "Real estate listings in Lagos are noisy and unstructured, with entry errors that inflated some prices to absurd values due to currency-symbol mistakes.",
      "solution": "Scraped 19,000+ raw listings with custom Python scrapers, built an anomaly-cleaning pipeline with currency-mapping logic, published the dataset on Kaggle, and trained a regression model (R\u00b2 = 0.76) to predict prices.",
      "notebook_url": "notebooks/lagos-price-model.html",
      "live_url": "https://laghousespricepred.streamlit.app/",
      "kaggle_url": "https://www.kaggle.com/datasets/ibenjamean/real-estate-rental-market-dataset-2026",
      "github_url": "https://github.com/meanima/lagos-properties-price-prediction"
    }
  ]

  skills = [
    {"name": "Excel & Power BI", "percent": 90, "stars": 0},
    {"name": "SQL", "percent": 75, "stars": 0},
    {"name": "Tableau", "percent": 50, "stars": 0},
    {"name": "Python & Data Analysis", "percent": 80, "stars": 0},
    {"name": "Machine Learning (Scikit-learn)", "percent": 62, "stars": 0},
    {"name": "Data Visualization", "percent": 75, "stars": 0},
    {"name": "Flask & Web Deployment", "percent": 60, "stars": 0},
  ]

  certifications = [
    {"issuer": "Genesys Tech Hub", "image": "images/certificates/Benjamin Kadiri_d24711.jpg", "credential": "Data Analysis Mentorship"},
    {"issuer": "Genesys Tech Hub", "image": "images/certificates/Benjamin Kadiri.jpg", "credential": "Python for Data Analysis"},
    {"issuer": "Selfless Hearts Foundation", "image": "images/certificates/Kadiri Benjamin.png", "credential": "Data for Excel & Power BI"},
    {"issuer": "TechHive Technologies", "image": "images/certificates/KYAfrica Certificate (5).png", "credential": "Data for Excel & Power BI"},
    {"issuer": "Data Science Nigeria (DSN)","image": "images/certificates/KYAfrica Certificate (5).png", "credential": "Data Science & Machine Learning"},
  ]

  reviews = [
    {"image": "images/reviewers/hero.png", "name": "Jane Doe", "stars": 5, "comment": "Benjamin delivered a clean, well-documented pipeline ahead of schedule."},
    {"image": "images/reviewers/hero.png", "name": "John Smith", "stars": 4, "comment": "Great communication and solid technical depth on the modeling work."},
    {"image": "images/reviewers/hero.png", "name": "Jane Doe", "stars": 5, "comment": "Benjamin delivered a clean, well-documented pipeline ahead of schedule."},
    {"image": "images/reviewers/hero.png", "name": "John Smith", "stars": 4, "comment": "Great communication and solid technical depth on the modeling work."},
    {"image": "images/reviewers/hero.png", "name": "Jane Doe", "stars": 5, "comment": "Benjamin delivered a clean, well-documented pipeline ahead of schedule."},
  ]
  
  project_types = [
    "Project Collaboration",
    "Data Analysis",
    "Data Dashbord/Report",
    "Make Predictions (Sales, Prices)",
    "Something else.."
  ]


  return render_template("index.html", about=about, projects=projects, skills=skills, certifications=certifications, reviews=reviews, project_types=project_types)


@app.route("/contact", methods=["POST"])
def contact():
  name = request.form.get("name")
  email = request.form.get("email")
  phone = request.form.get("phone", "Not provided")
  project_type = request.form.get("project_type")
  budget = request.form.get("budget", "Not specified")
  message = request.form.get("message")

  msg = EmailMessage()
  msg["Subject"] = f"New portfolio inquiry from {name}"
  msg["From"] = os.environ.get("email")
  msg["To"] = os.environ.get("email")
  msg.set_content(f"""
    New contact form submission:

    Name: {name}
    Email: {email}
    Phone: {phone}
    Project type: {project_type}
    Budget: {budget}

    Message:
    {message}
    """)

  try:
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(os.environ.get("email"), os.environ.get("pass"))
        server.send_message(msg)
  except Exception as e:
    print(f"Email send failed: {e}")
    return render_template("error.html")

  # return redirect("/#contact")
  return render_template("delivered.html")


# Running the web application
if __name__ == "__main__":
  app.run(debug = True) # Run the web application in debug mode
