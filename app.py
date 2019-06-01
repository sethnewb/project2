# flask application to serve data between DB 
# and web page
from flask import Flask, jsonify, render_template
import pandas as pd 
import sqlite3
import sys
from collections import defaultdict

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# cache was stopping javascript from refreshing
# remove before pushing to heroku
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


#  initial loading route
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

#  API route for Gender Age Graph
@app.route("/age/<gender>")
def age(gender):
    con = sqlite3.connect('db/olympic_data.db')

    sql = f"""
        SELECT * FROM yearAge{gender[0]};
        """
    yearAvgM = pd.read_sql(sql, con)

    query_dict = defaultdict(list)

    for index, row in yearAvgM.iterrows():
        query_dict[row["Year"]].append(row["Age"])
    
    clean_dict = dict(query_dict)
    clean_list = [{k:v} for k, v in clean_dict.items()]

    print("test Age", file=sys.stderr)

    return jsonify(clean_list)



#  API route for Medals by Year/Country Route
@app.route("/medals")
def medals():


    print("test Medals x2", file=sys.stderr)

    con = sqlite3.connect('db/olympic_data.db')

    sql = """
    SELECT * FROM medals_by_country_by_year
    """

    print("test", file=sys.stderr)

    medal_data = pd.read_sql(sql, con)

    return medal_data.to_json(orient='records')
    
#  API route for Connected Scatter Plot 
# @app.route("/buildAll/<build>")
# def buildAll(build):
#     con = sqlite3.connect('db/olympic_data.db')
#     # ?? calling data from table in db, but does {} refer to drop down?
#     sql = f"""
#         SELECT * FROM athlete_build_avg;
#         """
#     athlete_build_avg = pd.read_sql(sql, con)
#     # Somehow I need to define which dropdown menu choice relates to which data choice
#     sel = [
#         athlete_build_avg.Sport,
#         athlete_build_avg.Year,
#         athlete_build_avg.avg_height_M,
#         athlete_build_avg.avg_weight_M,
#         athlete_build_avg.avg_height_F,
#         athlete_build_avg.avg_weight_F
#     ]
    
#     results = db.session.query(*sel).filter(athlete_build_avg.build == build).all()
    
#     # Create dictionary for infor from dropdown menu
#     athletic_build_data = {}
#     for result in results:
#         athlete_build_avg["Sport"] = result[0]
#         athlete_build_avg["Year"] = result[1]
#         athlete_build_avg["avg_height_M"] = result[2]
#         athlete_build_avg["avg_weight_M"] = result[3]
#         athlete_build_avg["avg_height_F"] = result[4]
#         athlete_build_avg["avg_weight_F"] = result[5]

#     print(athletic_build_data)
#     return jsonify(athletic_build_data)
@app.route("/buildAll/<build>")
def buildAll(build):
    con = sqlite3.connect('db/olympic_data.db')
    sql = f"""
        SELECT * FROM athlete_build_avg;
        """
    athlete_build_avg = pd.read_sql(sql, con)
    # Somehow I need to define which dropdown menu choice relates to which data choice
    columns = ["Sport", "Year"]
    if build == "femaleHeight":
        columns.append("avg_height_F")
    elif build == "femaleWeight":
        columns.append("avg_weight_F")
    elif build == "maleHeight":
        columns.append("avg_height_M")
    else: 
        columns.append("avg_weight_M")

    athlete_build_avg =athlete_build_avg[columns]

    return athlete_build_avg.to_json(orient = 'records')


if __name__ == "__main__":
    app.run(debug=True)
