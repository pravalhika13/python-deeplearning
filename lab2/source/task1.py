import pandas as pd
from sklearn import datasets
from sklearn import metrics
from sklearn.model_selection import train_test_split
import warnings
warnings.simplefilter("ignore")

#loading data into the variable
train = pd.read_csv('C:/Users/prava/Documents/GitHub/python-deeplearning/icp5/source/train.csv')
print("Train_Set")
print(train.head())
print("\n")
print("Train_Set description")
print("\n")
print(train.columns.values)


train.isna().head()
print("null values")
print(train.isna().sum())
print("\n")

# Fill missing or null values with mean column values in the train set
train.fillna(train.mean(), inplace=True)
#isnull() method
print(train.isna().sum())

train.info()
#removing the features not correlated to the target class,
train = train.drop(['Name','Ticket', 'Cabin','Embarked'], axis=1)

#encode categorical data
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing
labelEncoder = preprocessing.LabelEncoder()
labelEncoder.fit(train['Sex'])
train['Sex'] = labelEncoder.transform(train['Sex'])


train.info()
print(train.head())
feature_cols = ['PassengerId' ,'Pclass', 'Age' ,'SibSp' ,'Parch' ,'Fare' , 'Sex']
from sklearn.svm import SVC

X = train[feature_cols]
y = train.Survived
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

svm = SVC()                        # Fitting SVM model to the data
expected = train.Survived

# Training the Model on Testing Set
svm.fit(X_train, y_train)
print(expected)

predicted_label = svm.predict(train[feature_cols])          # Making Prediction based on X, Y
print(predicted_label)

# Matrix which is used to find the accuracy of classification
print(metrics.confusion_matrix(expected, predicted_label))

# Cross Validation compare the predicted and expected values
print(metrics.classification_report(expected, predicted_label))

# Evaluating the Model based on Testing Part
print('Accuracy of SVM classifier : {:.2f}'
     .format(svm.score(X_test, y_test)))

#navie bayes model
from sklearn.naive_bayes import GaussianNB
model = GaussianNB()      # Fitting gaussian Naive Bayes model to the data
model.fit(train[feature_cols], train.Survived)

expected = train.Survived            # Making Prediction based on X, Y
predicted = model.predict(train[feature_cols])


print(metrics.classification_report(expected, predicted))
#Cross Validation

print(metrics.confusion_matrix(expected, predicted))
# Matrix which is used to find the accuracy of classification
X_train, X_test, Y_train, Y_test = train_test_split(train[feature_cols], train.Survived, test_size=0.2, random_state=0)

model.fit(X_train, Y_train)
#  Model on Training Set

Y_predicted = model.predict(X_test)
#  Model on Testing Set

print("accuracy using Gaussian navie bayes Model is ", metrics.accuracy_score(Y_test, Y_predicted) * 100)


#caluculating knn
# import the class
from sklearn.linear_model import LogisticRegression

# instantiate the model (using the default parameters)
logreg = LogisticRegression()

# fit the model with data
logreg.fit(X, y)

# predict the response values for the observations in X
logreg.predict(X)


# store the predicted response values
y_pred = logreg.predict(X)

#number of predictions
len(y_pred)
from sklearn.neighbors import KNeighborsClassifier
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X, y)
y_pred = knn.predict(X)
print("accuracy using knn Model is ",metrics.accuracy_score(y, y_pred))