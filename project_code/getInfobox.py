import pandas as pd
import numpy as np
from random import randint
import wptools
import pdb
import urllib2
import urllib
import json
import re
import sys

try:
	data_file = "final_data.csv"
	df = pd.read_csv(data_file, index_col=None)
	dummy = [0]*len(df)
	df = df.assign(height_in=dummy, height_ft=dummy, weight_lb=dummy, career=dummy, age=dummy, position=dummy, shoots=dummy).dropna()
	players = df.player.unique()
	players.sort()
	positions = ["Centre", "Defence", "Left Wing", "Right Wing", "Forward", "GoalTender", "head Coach", "midfielder",
					"Striker", "Wide Receiver"]
	posAbbr = {"Centre": "C", 
				"Defence": "D", 
				"Left Wing": "LW", 
				"Right Wing": "RW", 
				"GoalTender": "G"}
	for i in players: 
		print i
	no = []
	with open('exc.csv', 'a') as f:
		for player in players:
			try:
				infobox = wptools.page(player).get_parse().infobox
				if not infobox:
					url = ("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + player + " Hockey&format=json").replace(" ", "%20")
					data = json.loads(urllib2.urlopen(url).read())
					res = data['query']['search']
					for entry in res:
						if((player in entry['title']) and (player != entry['title']) and ('player' in entry['snippet'] or ('professional' in entry['snippet']) or ('ice' in entry['snippet'])) and ('hockey' in entry['snippet'])):
							player = entry['title']
							infobox = wptools.page(player).get_parse().infobox
							break

				if ('height_ft' in infobox) and (infobox['height_ft']): df.loc[df.player==player, 'height_ft'] = int(infobox['height_ft'])
				if ('height_in' in infobox) and (infobox['height_in']): df.loc[df.player==player, 'height_in'] = int(infobox['height_in'])
				if ('weight_lb' in infobox) and (infobox['weight_lb']): df.loc[df.player==player, 'weight_lb'] = int(infobox['weight_lb'])
				if ('career_start' in infobox) and (infobox['career_start']): 
					if ('career_end' in infobox) and (infobox['career_end']):
						df.loc[df.player==player, 'career'] = int(infobox['career_end']) - int(infobox['career_start'])
					else:
						df.loc[df.player==player, 'career'] = 2017 - int(infobox['career_start'])
				if ('shoots' in infobox) and (infobox['shoots']):
					df.loc[df.player==player, 'shoots'] = infobox['shoots']
				elif ('catches' in infobox) and (infobox['catches']):
					df.loc[df.player==player, 'catches'] = infobox['catches']
				if ('birth_date' in infobox) and (infobox['birth_date']): df.loc[df.player==player, 'age'] = 2017 - int(re.match(".*([1-3][0-9]{3})", infobox['birth_date']).group(1))
				if ('position' in infobox) and (infobox['position']):
					df.loc[df.player==player, 'position'] = infobox['position']
					pdb.set_trace()
					for word in positions:
						if re.match(".*"+word+".*", infobox['position'], re.IGNORECASE).group(0):
							df.loc[df.player==player, 'position'] = posAbbr[word]
							break

			except Exception as exc:
				f.write("Exception******************************************************" + str(player) + "\n" + str(exc))
				no.append(player)
		f.close()

	pdb.set_trace()
	df.to_csv("final_data_wiki.csv", index=False)
except Exception as exc:
	pdb.set_trace()