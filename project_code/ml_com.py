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

data_file = "ml.csv"
wiki_file = "final_data_wiki.csv"
df = pd.read_csv(data_file, parse_dates=True, index_col=None)
df2 = pd.read_csv(wiki_file, parse_dates=True, index_col=None)

players = df.player.unique()

new_columns = ["age", "height_in", "height_ft", "weight_lb", "career", "throw"]

for i in range(len(new_columns)):
    df[new_columns[i]] = 0

players.sort()

for player in players:
    print(player)
    df.loc[df.player == player, 'age'] = df2[df2.player == player]['age'].values[0]
    df.loc[df.player == player, 'height_in'] = df2[df2.player == player].height_in.values[0]
    df.loc[df.player == player, 'height_ft'] = df2[df2.player == player].height_ft.values[0]
    df.loc[df.player == player, 'career'] = df2[df2.player == player].career.values[0]
    df.loc[df.player == player, 'weight_lb'] = df2[df2.player == player].weight_lb.values[0]
    df.loc[df.player == player, 'throw'] = df2[df2.player == player].shoots.values[0] or df2[df2.player == player].catches.values[0]


df.to_csv("ml_complete.csv", index=False)