from flask import Flask, render_template

# Creating the web application instance
app = Flask(__name__)

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
  return render_template("index.html", about=about, projects=projects)

# Running the web application
if __name__ == "__main__":
  app.run(debug = True) # Run the web application in debug mode