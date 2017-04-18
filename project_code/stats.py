import csv
import datetime
import pandas as pd
import numpy as np
import pdb

data_file1 = "6_16_NBA.csv"
data_file = "test_new.csv"
df = pd.read_csv(data_file, parse_dates=True, index_col=None)

#remove whitespaces
df.rename(columns=lambda x: x.strip())
df['relinquished'] = df['relinquished'].map(lambda x: x.strip())
df['team'] = df['team'].map(lambda x: x.strip())
df['acquire'] = df['acquire'].map(lambda x: x.strip())
df['notes'] = df['notes'].map(lambda x: x.strip())
df['date'] = df['date'].map(lambda x: x.strip())

#conevrt to date obj

df['date'] = pd.to_datetime(df['date'])

# x = df.loc[df["relinquished"]=='Samardo Samuels','notes'].values[1]
# print x, len(x)

#print len(df) #8226
df = df[df.notes != "placed on IR"]
#print len(df) #6223
df = df[df.notes != "placed on IR with illness"]
#print len(df)
df = df[df.notes != "placed on IR with flu"]
#print len(df)       #6097
df = df[df.notes != "placed on IR (P)"]
df = df[df.notes != "placed on IR for rest"]
#print len(df)       #6097
df = df[df.notes != "placed on IR with flu"]
df = df[df.notes != "placed on IR (F)"]
df = df[df.notes != "placed on IR with rest"]


df = df[df.notes != "placed on IR with returned to lineup"]
df = df[df.notes != "placed on IR with rest"]
df = df[df.notes != "placed on IR (out for season)"]

body = {"head": ["cervical", "nasal", "chin", "mouth", "eye","neck","cheek", "jaw", "cheekbone","dental", "concussion","nose","oral","tooth","migraine","throat","root canal","frontal","orbital","head","ear", "mouth", "retina", "dizziness", "dizzyness", "vision"],
        "torso": ["mid", "torso", "clavicle", "collarbone", "speen", "kidney", "spleen", "abdomen", "rib","shoulder","stomach","back","pelvi","facial","appendix","appendectomy","pectoral","lung","respiratory","spinal","tailbone","chest","abdominal","sternum","heart","oblique", "hernia", "body", "vertebrae"],
        "ua": ["scapula", "elbow","bicep","triceps","arm", "shoulder", "knuckle"],
        "la": ["cuff", "wrist","finger","thumb","hand"],
        "ul": ["femur","groin","thigh","meniscus","knee","hamstring","hip","testicular","quadricep","adductor"],
        "ll": ["Achilles","foot","toe","calf","shin","ankle","leg","fibula","tibia","achilles","heel","plantar"]}

#Joining in with short forms
df.team.replace('Lightining','Lightning',inplace=True)

teams = df['team'].unique()
teams = np.sort(teams)
teams = teams.tolist()
print teams
df2 = pd.read_csv("teams_short.csv", parse_dates=False, index_col=None)
teams2 = df2.team

df3=pd.merge(df, df2, on='team', how='outer').dropna()

del df3['reg']

print df3.head()

notes = df3.notes.tolist()
# print type(notes)
# print notes
count =0
for i in range(len(notes)):
    flag = False
    #if notes[i] not in ["activated from IL","activated from IL (P)"]:
    if "activated" not in notes[i]:
        print body.keys()
        for j in body.keys():
            if any(word in notes[i].lower() for word in body[j]):
                notes[i] = j
                flag = True
                break
        if not flag:
        #    print notes[i]
            notes[i] = 0
            count = count +1

#print len(notes), count         #5897, 64
df3["injury"] = notes
df3 = df3[df3.injury != 0]
print df3.head()


#final dataframe
df3 = df3.reset_index()
del df3['index']
print df3.head()

print '------'

#Finding player names
df4 = df3.copy()
df4['player'] = df3['relinquished']

for i in range(len(df4)):
    #print df4.loc[i,'player']
    if df4.loc[i,'player']=="":
        df4.loc[i,'player'] = df3.loc[i,'acquire']
df4['notes'] = df3['notes']
df4['injury'] = df3['injury']


del df4['acquire']
del df4['relinquished']

cols = df4.columns.tolist()
print cols

cols = ['date', 'team', 'player', 'notes', 'injury','sf']
df4 =df4[cols]

df4.columns=['date', 'long_name', 'player', 'notes', 'injury','team']
print df4.head()

#print np.sort(df4.team.unique()).tolist()
df4.to_csv('final_data.csv', index=False)

