from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
data = pd.read_csv("College.csv")
X_data = data.iloc[:,2:]
print(X_data.columns)
nclusters=3
km=KMeans(n_clusters=nclusters,random_state=7)
km.fit(X_data)
y_cluster_kmeans=km.predict(X_data)
print(y_cluster_kmeans)
