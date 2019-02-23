from sklearn import datasets
from sklearn import metrics
from sklearn.model_selection import train_test_split
# Loading Iris datasets
iris = datasets.load_iris()
from sklearn.svm import SVC
X = iris.data
y = iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
# Fitting SVM model to the data
svm = SVC()
expected = iris.target
# Training the Model on Testing Set
svm.fit(X_train, y_train)
print(expected)
# Making Prediction based on X, Y
predicted_label = svm.predict(iris.data)
print(predicted_label)
# Cross Validation compare the predicted and expected values
# Matrix which is used to find the accuracy of classification
print(metrics.confusion_matrix(expected, predicted_label))
# Cross Validation compare the predicted and expected values
print(metrics.classification_report(expected, predicted_label))
print('Accuracy of SVM classifier on training set: {:.2f}'.format(svm.score(X_train, y_train)))
# Evaluating the Model based on Testing Part
print('Accuracy of SVM classifier on test set: {:.2f}'.format(svm.score(X_test, y_test)))