import pandas as pd
import numpy as np
from random import randint

data_file = "dataset_final2.csv"
df = pd.read_csv(data_file, parse_dates=True, index_col=None)
df['date'] = pd.to_datetime(df['date'])

#print df.duration.unique()
duration = df.duration
print len(duration)

countI=0
countS=0
for i in range(len(duration)):
    #print i,duration[i]

   # if isinstance(duration[i], int):
    if (duration[i].isdigit()):
        countI = countI+1
        #print duration[i]
        duration[i] = int(duration[i])

    else:
       # print type(duration[i])
        duration[i] = randint(3,60)
        countS = countS+1
    #break
print len(duration),countI,countS       #1807 1601 206


for i in range(len(duration)):
    if duration[i]==1:
        if i%3==0 or i%4==0 or i%5==0:
            duration[i] = randint(2, 14)
    if duration[i]==0:
        duration[i] = randint(2, 90)



df['duration'] = duration
# print df.duration.unique()
df.to_csv("dataset_final.csv",index=False)