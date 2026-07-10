from flask import Flask, render_template

# Creating the web application instance
app = Flask(__name__)

# Telling the web application this is the home page and what to do when someone visits it 
@app.route("/")
def home():
  # This function is called when someone visits the home page
  return render_template("index.html") # Render the index.html template when the home page is visited

# Running the web application
if __name__ == "__main__":
  app.run(debug = True) # Run the web application in debug mode