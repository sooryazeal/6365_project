import pandas as pd
import numpy as np
data_file = "final_data.csv"
df = pd.read_csv(data_file, parse_dates=True, index_col=None)
df['date'] = pd.to_datetime(df['date'])

#print type(notes),len(notes)
#print len(notes.unique())


def calculateDuration():
    df["duration"] = df.notes
    duration = df['duration']
    a = df.notes.unique()
    a = pd.Series(a)
    a.to_csv("unique_notes.csv")

    duration = duration.str.replace(r'(?i).*indefinitely.*', '3000')
    duration = duration.str.replace(r'(?i).*out for season.*', '365')
    duration = duration.str.replace(r'(?i).*out 3-4 weeks.*', '30')
    duration = duration.str.replace(r'(?i).*out 6-8 weeks.*', '60')
    duration = duration.str.replace(r'(?i).*out 2-3 weeks.*', '15')
    duration = duration.str.replace(r'(?i).*out 2-4 weeks.*', '21')
    duration = duration.str.replace(r'(?i).*out 4-6 weeks.*', '42')
    duration = duration.str.replace(r'(?i).*out 8+ weeks.*', '70')
    duration = duration.str.replace(r'(?i).*1-2 weeks.*', '10')
    duration = duration.str.replace(r'(?i).*3-6 weeks.*', '35')
    duration = duration.str.replace(r'(?i).*out 8-10 weeks.*', '70')

    duration = duration.str.replace(r'(?i).*out 2-3 months.*', '43')
    duration = duration.str.replace(r'(?i).*6-8 months.*', '240')
    duration = duration.str.replace(r'(?i).*3-6 months.*', '180')
    duration = duration.str.replace(r'(?i).*out 4-6 months.*', '180')
    duration = duration.str.replace(r'(?i).*out 1-2 months.*', '60')
    duration = duration.str.replace(r'(?i).*out 3-4 months.*', '120')

    duration = duration.str.replace(r'(?i).*out 7-10 days.*', '7')
    duration = duration.str.replace(r'(?i).*out 10-14 days.*', '14')

    duration = duration.str.replace(r'(?i).*8+ weeks.*', '56')

    duration = duration.str.replace(r'(?i).*~2 months.*', '60')
    duration = duration.str.replace(r'(?i).*6 weeks.*', '42')
    duration = duration.str.replace(r'(?i).*3 weeks.*', '21')
    duration = duration.str.replace(r'(?i).*1 week.*', '7')
    duration = duration.str.replace(r'(?i).*2 weeks.*', '14')
    duration = duration.str.replace(r'(?i).*4 weeks.*', '30')
    duration = duration.str.replace(r'(?i).*10 weeks.*', '70')
    duration = duration.str.replace(r'(?i).*6 months.*', '180')

    duration = duration.str.replace(r'(?i).*out 3+ weeks.*', '21')
    duration = duration.str.replace(r'(?i).*out 1+ month.*', '31')
    duration = duration.str.replace(r'(?i).*3 months.*', '91')

    print type(duration)
    df['duration'] = duration
    print df.head()
    grouped= df.groupby(['team','player'])
    i=0
    for group in grouped:
        group = list(group)
        i=i+1
        print i
        # print len(group)
        # print type(group[0])
        # print type(group[1])
        # print group[0]
        # print group[1].team,group[1].player
        data = group[1][['date','team','player','injury','duration','notes','long_name']]
        # print data.head()
        #data.to_csv('grouped.csv')
        # data = data.reindex(index=data.index[::-1])
        # data.to_csv('grouped_reversed.csv')
        count=0
        curr_index = 0
        inj = ""
        for index, row in data.iterrows():
            if count==0 and not row['injury'].startswith("activated"):
                inj = row['injury']
    #            started = True
                count = 1
                start_date = row['date']
                curr_index = index
                continue
            if (row['injury']==inj or row['injury'].startswith("activated")) and count>=1:
                count = count + 1
                end_date = row['date']
                dur = (end_date - start_date).days
                data.ix[curr_index,'duration'] = dur
                if row['injury'].startswith("activated"):
                    count=0
                data.drop(index,inplace=True)


            elif not row['injury']==inj:
                data.ix[curr_index,'duration'] = 1
                inj = row['injury']
                count = 1
                start_date = row['date']
                curr_index = index
            elif row['injury'].startswith("activated"):
                data.drop(index, inplace=True)

        data = data[data.injury.str.startswith("activated")==False]

        with open('final_dataset.csv', 'a') as f:
            data.to_csv(f,header=False,index=False)


# print type(grouped)
# df2 = grouped.aggregate(lambda x: tuple(x))
# df2.to_csv("ok.csv")


def add_pos():
    #Adding in position data

    data_file = "final_dataset.csv"
    df = pd.read_csv(data_file, parse_dates=True, index_col=None)
    df['date'] = pd.to_datetime(df['date'])

    data_file = "position.csv"
    df2 = pd.read_csv(data_file, parse_dates=False, index_col=None)


    df3 = pd.merge(df, df2, how='left', on=['player','long_name'])
    print len(df3)
    df3.drop_duplicates(inplace=True)
    print len(df3)
    df3.to_csv("dataset_final2.csv",index=False)

if __name__ == '__main__':
    # calculateDuration()
    add_pos()
