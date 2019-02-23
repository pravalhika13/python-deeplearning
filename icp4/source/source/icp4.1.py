import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn import datasets
from sklearn import metrics
# Importing dataset
data = pd.read_csv("C:/Users/prava/Downloads/iris.csv")
iris=datasets.load_iris()
#splitting into train and test data
x_train,x_test,y_train,y_test=train_test_split(iris.data,iris.target,test_size=0.4,random_state=0)
#cross validation
MltiNB= MultinomialNB()
MltiNB.fit(x_train,y_train)
#evaluating model on testing part
y_expect=y_test
y_pred=MltiNB.predict(x_test)
print(metrics.accuracy_score(y_expect,y_pred))
