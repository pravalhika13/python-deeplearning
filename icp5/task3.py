from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn.metrics import silhouette_score
data= pd.read_csv('College.csv')
data=data.drop(columns=['name','Private'],axis=1)
#train,test=train_test_split(data,test_size=0.4)
for i in range(2,7):
    kmean = KMeans(n_clusters=i, max_iter=300)
    x=kmean.fit_predict(data)
   # x=kmean.predict(test)
    sil=silhouette_score(data,x)
    print("for cluster ",i,"silhouette score is",sil)