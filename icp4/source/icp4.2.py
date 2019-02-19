import matplotlib.pyplot as plt
from matplotlib import style
style.use("ggplot")
import pandas as pd
from sklearn import datasets
from sklearn import svm
digits=datasets.load_iris()
clf=svm.SVC(gamma=0.0001,C=100)
print(len(digits.data))
x,y=digits.data[:-10],digits.target[:-10]
clf.fit(x,y)
print(clf.predict(digits.data[:-6]))
plt.imshow(digits.images([-6],cmap=plt.cm.gray_r,interpolation="nearest")
plt.show()







