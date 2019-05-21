# flask application to serve data between DB 
# and web page
from flask import Flask, jsonify, render_template
import pandas as pd 
import sqlite3

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# cache was stopping javascript from refreshing
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

