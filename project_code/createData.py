import pandas as pd
import numpy as np
import json

data_file = "dataset_final.csv"
df = pd.read_csv(data_file, parse_dates=True, index_col=None)
grouped= df.groupby(['long_name'])
data = {}
for group in grouped:
    group = list(group)
    data[group[0]] = ",".join(set(group[1]['player']))

with open('../data.json', 'a') as f:
    f.write(json.dumps(data))
