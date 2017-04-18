import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.linear_model import LogisticRegression
import pdb

df = pd.read_csv('ml_complete.csv', parse_dates=True, index_col=None)

df.team = pd.Categorical(df.team)
df['team_code'] = df.team.cat.codes

df.player = pd.Categorical(df.player)
df['player_code'] = df.player.cat.codes

df.long_name = pd.Categorical(df.long_name)
df['long_name_code'] = df.long_name.cat.codes

df.position = pd.Categorical(df.position)
df['position_code'] = df.position.cat.codes

df.throw = pd.Categorical(df.throw)
df['throw_code'] = df.throw.cat.codes


train_x = df[['date','team_code','player_code','duration','long_name_code','position_code','tot_till_now','tot_curr','tot_prev',
'h_tot_till_now','h_prev','ua_tot_till_now','ua_prev','ul_tot_till_now','ul_prev','ll_tot_till_now','ll_prev','la_tot_till_now',
'la_prev','torso_tot_till_now','torso_prev','age','height_in','height_ft','weight_lb','career','throw_code']]

test_x = df[df.date == 2017][['date','team_code','player_code','duration','long_name_code','position_code','tot_till_now','tot_curr','tot_prev',
'h_tot_till_now','h_prev','ua_tot_till_now','ua_prev','ul_tot_till_now','ul_prev','ll_tot_till_now','ll_prev','la_tot_till_now',
'la_prev','torso_tot_till_now','torso_prev','age','height_in','height_ft','weight_lb','career','throw_code']]

svr_rbf = LogisticRegression()

train_y = df[['h']]
model = svr_rbf.fit(train_x, train_y)
h_pred = model.predict(test_x)
h_pred_proba = model.predict_proba(test_x)

train_y = df[['ll']]
model = svr_rbf.fit(train_x, train_y)
ll_pred = model.predict(test_x)
ll_pred_proba = model.predict_proba(test_x)

train_y = df[['la']]
model = svr_rbf.fit(train_x, train_y)
la_pred = model.predict(test_x)
la_pred_proba = model.predict_proba(test_x)

train_y = df[['ua']]
model = svr_rbf.fit(train_x, train_y)
ua_pred = model.predict(test_x)
ua_pred_proba = model.predict_proba(test_x)

train_y = df[['ul']]
model = svr_rbf.fit(train_x, train_y)
ul_pred = model.predict(test_x)
ul_pred_proba = model.predict_proba(test_x)

train_y = df[['torso']]
model = svr_rbf.fit(train_x, train_y)
torso_pred = model.predict(test_x)
torso_pred_proba = model.predict_proba(test_x)

test_x['h_pred'] = h_pred 
test_x['ll_pred'] = ll_pred 
test_x['la_pred'] = la_pred 
test_x['ua_pred'] = ua_pred 
test_x['ul_pred'] = ul_pred 
test_x['torso_pred'] = torso_pred 

team_map = dict( enumerate(df.team.cat.categories))
position_map = dict( enumerate(df.position.cat.categories))
long_name_map = dict( enumerate(df.long_name.cat.categories))
throw_map = dict( enumerate(df.throw.cat.categories))
player_map = dict( enumerate(df.player.cat.categories))

test_x['team'] = test_x.team_code.map(lambda x: team_map[x])
test_x['position'] = test_x.position_code.map(lambda x: position_map[x])
test_x['long_name'] = test_x.long_name_code.map(lambda x: long_name_map[x])
test_x['throw'] = test_x.throw_code.map(lambda x: throw_map[x])
test_x['player'] = test_x.player_code.map(lambda x: player_map[x])

test_x['h_pred_proba'] = np.array([x.max() for x in h_pred_proba])
test_x['ll_pred_proba'] = np.array([x.max() for x in ll_pred_proba])
test_x['la_pred_proba'] = np.array([x.max() for x in la_pred_proba])
test_x['ul_pred_proba'] = np.array([x.max() for x in ul_pred_proba])
test_x['ua_pred_proba'] = np.array([x.max() for x in ua_pred_proba])
test_x['torso_pred_proba'] = np.array([x.max() for x in torso_pred_proba])


test_x.to_csv("pred.csv")