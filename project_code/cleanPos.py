import pandas as pd
import numpy as np
from random import randint

data_file = "final_data_wiki.csv"
df = pd.read_csv(data_file, parse_dates=True, index_col=None)
df['date'] = pd.to_datetime(df['date'])

print len(df)
pos = df.position
print pos.unique()
for i in range(len(pos)):
    #print i,duration[i]
    list = ["C","D", "LW", "RW", "G"]
   # if isinstance(duration[i], int):
    if (pos[i] not in list):
        ind = randint(0,4)
        pos[i] =  list[ind]

print pos.unique()
df['position'] = pos
df.to_csv("final_data_wiki.csv", index=False)