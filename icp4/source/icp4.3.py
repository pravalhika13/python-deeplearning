from sklearn import svm
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn import metrics
import pandas as pd
data = pd.read_csv("C:/Users/prava/Downloads/iris.csv")
iris=datasets.load_iris()
x_train,x_test,y_train,y_test=train_test_split(iris.data,iris.target,test_size=0.4,random_state=0)
#rbf kernel
model=svm.SVC(kernel='rbf')
clf=model.fit(x_train,y_train)
print(model)
y_pred=clf.predict(x_test)
print(metrics.accuracy_score(y_test,y_pred))
