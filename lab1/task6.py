import requests
from bs4 import BeautifulSoup

import pandas as pd

tables = pd.read_html("https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States")

#print(tables[0])


html = requests.get("https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States")

bsObj = BeautifulSoup(html.content, "html.parser")

all_tables = bsObj.find_all('table', class_ ='wikitable')[0]
#print(all_tables[0])

f = open('pravs.html', 'a', enco
ding="utf-8")
rows = all_tables.findAll('tr')[2:]
#print(rows[0].th.a.string)
i = 1
for tr in rows:
    print(f"{i} State - {tr.th.a.string}")
    f.write(f"{i} State - {tr.th.a.string}")
    cols = tr.findAll('td')
    col_size = len(cols)
    i = i+1
    #print(cols[0].text)
    print(f"   Capital -{cols[1].text}")
    f.write(f"   Capital -{cols[1].text}")
    #if col_size == 11:
    #        print(f"Capital -{cols[1].text}")
    #elif col_size == 12:
    #        print(f"Capital -{cols[1].text}")