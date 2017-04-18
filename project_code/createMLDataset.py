import pandas as pd
import numpy as np
import pdb

def returnList(x):
    return {"head": [1,0,0,0,0,0] ,
    "ll": [0,1,0,0,0,0],
    "la": [0,0,1,0,0,0],
    "ua": [0,0,0,1,0,0],
    "ul": [0,0,0,0,1,0],
    "torso": [0,0,0,0,0,1]}[x]

data_file = "dataset_final.csv"
df = pd.read_csv(data_file, parse_dates=True, index_col=None)
df['date'] = pd.DatetimeIndex(df['date']).year
injury_data = df.injury.map(lambda x: returnList(x))
df_id = pd.DataFrame(injury_data.tolist(), columns=["h", "ll", "la", "ua", "ul", "torso"], index=df.index, dtype=int)
split_df = df.join(df_id)
player = df.player.unique()
grouped = split_df.groupby(['date', 'player'])
new_df = pd.DataFrame(columns=split_df.columns[1:], dtype=int)
i = 0
for group in grouped:
    new_df.loc[i] = group[1].loc[group[1].index[0]]
    new_df.loc[i,'h'] = group[1].h.sum()
    new_df.loc[i,'la'] = group[1].la.sum()
    new_df.loc[i,'ua'] = group[1].ua.sum()
    new_df.loc[i,'ll'] = group[1].ll.sum()
    new_df.loc[i,'ul'] = group[1].ul.sum()
    new_df.loc[i,'torso'] = group[1].torso.sum()
    i = i+1

year = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

hash_df = (df[['player','team', 'long_name', 'position']]).set_index('player').to_dict()

for i in year:
    print i
    for j in player:
        if((new_df[(new_df.player == j) & (new_df.date == i)]).empty):
            new_df.loc[len(new_df)] = [i,hash_df['team'][j],j,"",0,"",hash_df['long_name'][j],hash_df['position'][j],0,0,0,0,0,0]

new_columns = ["tot_till_now",  "tot_curr",  "tot_prev",  "h_tot_till_now",  "h_prev",  "ua_tot_till_now",  
"ua_prev",  "ul_tot_till_now",  "ul_prev",  "ll_tot_till_now",  "ll_prev",  "la_tot_till_now",  "la_prev",  
"torso_tot_till_now",  "torso_prev"]

new_df = new_df.sort(['player', 'date'])

for i in range(len(new_columns)):
    new_df[new_columns[i]] = 0

large_df = pd.DataFrame(columns=new_df.columns)

grouped = new_df.groupby(['player'])
for group in grouped:
    print group[0]
    group = group[1].reset_index()
    group = group.drop('index', 1)
    group[0:1]['h_prev'] = 0
    group[1:]['h_prev'] = group[:-1]['h']
    group[0:1]['h_tot_till_now'] = group[0:1]['h']
    group['h_tot_till_now'][1:] = group[:-1]['h_tot_till_now'].values + group['h'][1:].values

    group[0:1]['ll_prev'] = 0
    group[1:]['ll_prev'] = group[:-1]['ll']
    group[0:1]['ll_tot_till_now'] = group[0:1]['ll']
    group['ll_tot_till_now'][1:] = group[:-1]['ll_tot_till_now'].values + group['ll'][1:].values

    group[0:1]['la_prev'] = 0
    group[1:]['la_prev'] = group[:-1]['la']
    group[0:1]['la_tot_till_now'] = group[0:1]['la']
    group['la_tot_till_now'][1:] = group[:-1]['la_tot_till_now'].values + group['h'][1:].values

    group[0:1]['ul_prev'] = 0
    group[1:]['ul_prev'] = group[:-1]['ul']
    group[0:1]['ul_tot_till_now'] = group[0:1]['ul']
    group['ul_tot_till_now'][1:] = group[:-1]['ul_tot_till_now'].values + group['h'][1:].values

    group[0:1]['ua_prev'] = 0
    group[1:]['ua_prev'] = group[:-1]['ua']
    group[0:1]['ua_tot_till_now'] = group[0:1]['ua']
    group['ua_tot_till_now'][1:] = group[:-1]['ua_tot_till_now'].values + group['h'][1:].values

    group[0:1]['torso_prev'] = 0
    group[1:]['torso_prev'] = group[:-1]['torso']
    group[0:1]['torso_tot_till_now'] = group[0:1]['torso']
    group['torso_tot_till_now'][1:] = group[:-1]['torso_tot_till_now'].values + group['torso'][1:].values
    
    group[0:1]['tot_prev'] = 0
    group[1:]['tot_prev'] = group[:-1]['tot_curr']
    group['tot_curr'] = group["h"] + group['ul'] + group['ua'] + group['la'] + group['ll'] + group['torso']
    group[0:1]['tot_till_now'] = group[0:1]['tot_curr']
    group['tot_till_now'][1:] = group[:-1]['tot_till_now'].values + group['tot_curr'][1:].values
    
    large_df = large_df.append(group)

pdb.set_trace()
large_df.to_csv("ml.csv", index=False)