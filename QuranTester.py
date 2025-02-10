import arabic_reshaper
from bidi.algorithm import get_display
from quran import Quran
import random
import pandas as pd
import numpy as np
import os

chapter=12
qur = Quran()

def printAr(arStr): # for formatting Arabic text
    reshaped_text = arabic_reshaper.reshape(arStr)
    bidi_text = get_display(reshaped_text)
    print(bidi_text)  

def get_all_verses(chapter): # to load all verses from the beginning, for efficiency
    verses = []
    page = 1  # Start from the first page

    while True:
        response = qur.get_verses(chapter, page=page)
        if page<=response["pagination"]["total_pages"]:
            verses.extend(response["verses"])
            page += 1  # Move to the next page
        else:
            break  # Stop if no more verses are returned

    return verses

print("Loading... please wait.")
all_verses = get_all_verses(chapter)  # Get all verses from chapter
verses_count=qur.get_chapter(chapter)["chapter"]["verses_count"]
verses=get_all_verses(chapter)

ayah1=[]
ayah2=[]
correct=verses_count*[np.nan]

for i in range(0,verses_count):
    ayah1.append(verses[i]["text_indopak"])
    try:
        ayah2.append(verses[i+1]["text_indopak"])
    except:
        ayah2.append(np.nan)
    
indicies=list(range(1,verses_count))
random.shuffle(indicies)

for i in indicies:
    print("--------------")
    printAr(verses[i]["text_indopak"])

    print(">>>")
    input()
    
    try:
        printAr(verses[i+1]["text_indopak"])
    except:

        print("End of surah.")
    
    user_input = input()
    if user_input=="x":
        correct[i]=False
    elif user_input == "end":
        break
    else:
        correct[i]=True

'''df=pd.DataFrame({"Ayah1":ayah1,"Ayah2":ayah2,"run1":correct})
df.index+=1 # for 1 indexing
df.to_excel("Chapter_"+str(chapter)+"_Results.xlsx")'''

# Load existing file if available
file_path = "Chapter_"+str(chapter)+"_Results.xlsx"
if os.path.exists(file_path):
    df = pd.read_excel(file_path, index_col=0)  # Read existing file
else:
    df = pd.DataFrame({"Ayah1": ayah1, "Ayah2": ayah2})  # Create new DataFrame

# Determine the next run column name
existing_runs = [col for col in df.columns if col.startswith("run")]
next_run_number = len(existing_runs) + 1
run_col_name = f"run{next_run_number}"

# Add the new column
df[run_col_name] = correct

# Save to Excel
df.to_excel(file_path)
