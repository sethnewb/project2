# importing the kaggle CSVs to a sqlite database
# it looks like the noc_region table has already been worked into 
# the athlete_event table.  adding it anyway.
# datasource link: https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results/version/2

# import dependencies
import pandas as pd 
import sqlite3


# read CSVs into DataFrames
athlete_events = pd.read_csv("originalData/athlete_events.csv", low_memory=False)
noc_regions = pd.read_csv("originalData/noc_regions.csv", low_memory=False)
print(" ")
print("DataFrames created")


# create the connection to the database.  If there is no
# database it will be created.
con = sqlite3.connect("db/olympic_data.db")
print(" ")
print("database connection established")


# read the DataFrames into sql tables within the database
athlete_events.to_sql("athlete_events", con, if_exists="replace", index=False)
noc_regions.to_sql("noc_regions", con, if_exists="replace", index=False)
print(" ")
print("tables created")


# commit the changes and close the connection
con.commit()
con.close()
print(" ")
print("committed changes and connection closed")
print(" ")
print("end of script")