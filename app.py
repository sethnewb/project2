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

    con = sqlite3.connect('db/olympic_data.db')

    sql = f"""
    SELECT * FROM medals_by_country_by_year
    """

    medal_data = pd.read_sql(sql, con)

    return medal_data.to_json(orient='records')
    
#  API route for Athlete build line graphs (simple version)
# @app.route("/buildAll/<build>")
# def buildAll(build):
#     con = sqlite3.connect('db/olympic_data.db')
#     sql = f"""
#         SELECT * FROM male_athlete_mean_df_waterpolo;
#         """
#     male_waterpolo = pd.read_sql(sql, con)
#     return male_waterpolo.to_json(orient='records')

#  API route for Athlete build line graphs (some sports, medium version)
# @app.route("/buildAll/<build>")
# def buildAll(build):
#     con = sqlite3.connect('db/olympic_data.db')
    
#     # Define which data to pull with each dropdown menu choice
#     columns = ["Sport", "Year"]
#     if build == "femaleHeight":
#         sql = f"""
#         SELECT * FROM female_athlete_mean_df_gymnast;
#         """
#         athlete_build_avg = pd.read_sql(sql, con)
#         columns.append("avg_height")

#     elif build == "femaleWeight":
#         sql = f"""
#         SELECT * FROM female_athlete_mean_df_gymnast;
#         """
#         athlete_build_avg = pd.read_sql(sql, con)
#         columns.append("avg_weight")
#     elif build == "maleHeight":
#         sql = f"""
#         SELECT * FROM male_athlete_mean_df_waterpolo;
#         """
#         athlete_build_avg = pd.read_sql(sql, con)
#         columns.append("avg_height")
#     else: #maleWeight
#         sql = f"""
#         SELECT * FROM male_athlete_mean_df_waterpolo;
#         """
#         athlete_build_avg = pd.read_sql(sql, con)
#         columns.append("avg_weight")
#     #Drops to database down to just the three columns in this list, columns
#     athlete_build_avg = athlete_build_avg[columns]
#     # Rename columns to that last column is called "Build" no matter which data is called
#     athlete_build_avg.columns = ["Sport", "Year", "Build"]
#     return athlete_build_avg.to_json(orient = 'records')


#  API route for Athlete build line graphs (all sports, complex version)
@app.route("/buildAll/<build>")
def buildAll(build):
    con = sqlite3.connect('db/olympic_data.db')
    sql = f"""
        SELECT * FROM athlete_build_avg_{build[0]};
        """
    athlete_build_avg = pd.read_sql(sql, con)
    # Define which data to pull with each dropdown menu choice
    columns = ["Sport", "Year"]
    if build == "femaleHeight":
        columns.append("avg_height")
    elif build == "femaleWeight":
        columns.append("avg_weight")
    elif build == "maleHeight":
        columns.append("avg_height")
    else: #maleWeight
        columns.append("avg_weight")
    #Drops to database down to just the three columns in this list, columns
    athlete_build_avg = athlete_build_avg[columns]
    # Rename columns to that last column is called "Build" no matter which data is called
    athlete_build_avg.columns = ["Sport", "Year", "Build"]
    return athlete_build_avg.to_json(orient = 'records')


if __name__ == "__main__":
    app.run(debug=True)
