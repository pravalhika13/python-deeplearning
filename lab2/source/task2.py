import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
from sklearn import preprocessing
from sklearn.metrics import silhouette_score
import seaborn as sns  # importing seaborn packages for plotting the graph
import warnings
warnings.simplefilter("ignore")
#reading data customers.csv to df
df = pd.read_csv('C:/Users/prava/Documents/GitHub/python-deeplearning/lab2/source/Customers.csv')
# read the customers data
print("customers data")
print(df.head())
print("\n")

print(df.columns.values)

# For identifying no.of null values in the customer set
df.isna().head()

print("NULL values")
print(df.isna().sum())
print("\n")

# Fill missing or null values with mean column values in the customer set
df.fillna(df.mean(), inplace=True)

df.info()
print("\n")

# Encoding categorical data
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing

labelEncoder = preprocessing.LabelEncoder()
labelEncoder.fit(df['Gender'])
df['Gender'] = labelEncoder.transform(df['Gender'])



#using Age, Annual Income and Spending Score for clustering customers
from mpl_toolkits.mplot3d import Axes3D

sns.set_style("white")
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(df.Age, df["Annual Income (k$)"], df["Spending Score (1-100)"], c='blue', s=60)
ax.view_init(30, 185)
plt.xlabel("Age")
plt.ylabel("Annual Income (k$)")
ax.set_zlabel('Spending Score (1-100)')
plt.show()

from sklearn.cluster import KMeans
wcss=[]
for k in range(2, 11):
    kmeans = KMeans(n_clusters=k, init="k-means++")
    kmeans.fit(df.iloc[:, 1:])
    wcss.append(kmeans.inertia_)
    score = silhouette_score(df, kmeans.labels_, metric='euclidean')
    print("For n_clusters = {}, silhouette score is {})".format(k, score))

plt.figure(figsize=(12, 6))
plt.grid()
plt.plot(range(2, 11), wcss, linewidth=2, color="red", marker="8")
plt.xlabel("K Value")
plt.xticks(np.arange(1, 11, 1))
plt.ylabel("WCSS")
plt.show()

#kmeans clusturring
km = KMeans(n_clusters=5)
clusters = km.fit_predict(df.iloc[:, 1:])

df["label"] = clusters
#cluturing represntation of the age annual income and spending score
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(df.Age[df.label == 0], df["Annual Income (k$)"][df.label == 0], df["Spending Score (1-100)"][df.label == 0], c='blue', s=60)
ax.scatter(df.Age[df.label == 1], df["Annual Income (k$)"][df.label == 1], df["Spending Score (1-100)"][df.label == 1], c='red', s=60)
ax.scatter(df.Age[df.label == 2], df["Annual Income (k$)"][df.label == 2], df["Spending Score (1-100)"][df.label == 2], c='green', s=60)
ax.scatter(df.Age[df.label == 3], df["Annual Income (k$)"][df.label == 3], df["Spending Score (1-100)"][df.label == 3], c='orange', s=60)

plt.xlabel("Age")
plt.ylabel("Annual Income (k$)")
ax.set_zlabel('Spending Score (1-100)')
plt.show()