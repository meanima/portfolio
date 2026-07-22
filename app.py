
from flask import Flask, render_template

# Creating the web application instance
app = Flask(__name__)

# Telling the web application this is the home page and what to do when someone visits it 
@app.route("/")
def home():
  about = {
    "hook": "I'm a Data Engineer, a Data Analyst, and a Machine Learning Developer who transforms raw, chaotic real-world web data into production-ready models and interactive web applications.",
    "philosophy": "Driven by curiosity, precision, and solving messy data problems that others may skip.",
    "story": "Instead of just downloading clean datasets from data sites, I write custom web scrapers to scrape data from sites, source live real-world data from reliable platforms and gorvenmental programs, gather primary data from carrying out actual survey, then fight through these messy data, engineer custom feature hierarchies, and deploy full-stack apps end to end.",
    "toolkit": [
      {
        "category": "Languages",
        "tools": ["Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn)", "SQL", "Javascript"]
      },
      {
        "category": "ML & Deployment",
        "tools": ["Jupyter Lab", "Google Colab", "Azure ML", "Streamlit", "Flask", "Render", "Git/GitHub"]
      },
      {
        "category": "Data Engineering",
        "tools": ["Data Preprocessing & Preparation", "Feature Engineering", "Pipeline Automation"]
      }
    ]
  }

  projects = [
    {
      "title": "Lagos Real Estate Valuation Engine & Pipeline",
      "solution": "Scraped 19,000+ raw listings with custom Python scrapers, built an anomaly-cleaning pipeline with currency-mapping logic, published the dataset on Kaggle, and trained a regression model (R\u00b2 = 0.76) to predict prices.",
      "live_url": "https://laghousespricepred.streamlit.app/",
      "kaggle_url": "https://www.kaggle.com/datasets/ibenjamean/real-estate-rental-market-dataset-2026",
      "github_url": "https://github.com/ibenjamean/lagos-properties-price-prediction"
    },
    {
      "title": "Coming soon",
      "solution": "Something new is currently in the works. Be expectant!",
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


  return render_template("index.html", about=about, projects=projects, skills=skills, certifications=certifications, reviews=reviews)



@app.route("/about")
def about():

  about = {
    "hook": "I'm a Data Engineer, a Data Analyst, and a Machine Learning Developer who transforms raw, chaotic real-world web data into production-ready models and interactive web applications.",
    "philosophy": "Driven by curiosity, precision, and solving messy data problems others may skip.",
    "story": "Instead of just downloading clean datasets from data sites, I write custom web scrapers to scrape data from sites, source live real-world data from reliable platforms and gorvenmental programs, gather primary data from carrying out actual survey, then fight through these messy data, engineer custom feature hierarchies, and deploy full-stack apps end to end.",
    "toolkit": [
      {
        "category": "Languages",
        "tools": ["Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn)", "SQL", "Javascript"]
      },
      {
        "category": "ML & Deployment",
        "tools": ["Jupyter Lab", "Google Colab", "Azure ML", "Streamlit", "Flask", "Render", "Git/GitHub"]
      },
      {
        "category": "Data Engineering",
        "tools": ["Data Preprocessing & Preparation", "Feature Engineering", "Pipeline Automation"]
      }
    ],
    "title": "My Resume",
    "resume_url": "notebooks/resume.html"
  }

  return render_template("about.html", about=about)



@app.route("/projects")
def projects():

  projects = [
    {
      "title": "Lagos Real Estate Valuation Engine & Pipeline",
      "problem": "Real estate listings in Lagos are noisy and unstructured, with entry errors that inflated some prices to absurd values due to currency-symbol mistakes.",
      "solution": "Scraped 19,000+ raw listings with custom Python scrapers, built an anomaly-cleaning pipeline with currency-mapping logic, published the dataset on Kaggle, and trained a regression model (R\u00b2 = 0.76) to predict prices.",
      "notebook_url": "notebooks/lagos-price-model.html",
      "live_url": "https://laghousespricepred.streamlit.app/",
      "kaggle_url": "https://www.kaggle.com/datasets/ibenjamean/real-estate-rental-market-dataset-2026",
      "github_url": "https://github.com/ibenjamean/lagos-properties-price-prediction"
    },
    {
      "title": "Coming soon",
      "problem": "Something new is currently in the works.",
      "solution": "Be expectant!",
    }
  ]
  return render_template("projects.html", projects=projects)



@app.route("/resume")
def resume():
  return render_template("resume.html")



# Running the web application
if __name__ == "__main__":
  app.run(debug = True) # Run the web application in debug mode
