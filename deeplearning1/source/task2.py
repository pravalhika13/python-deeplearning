import pandas as pd
from keras import Sequential
from keras.layers import Dense
from sklearn import datasets
from sklearn import metrics
from sklearn.model_selection import train_test_split
import warnings
warnings.simplefilter("ignore")

# Load the train DataFrames using pandas
dataset = pd.read_csv('Breas Cancer.csv')


# Fill missing or null values with mean column values in the train set
import numpy as np

# Encoding categorical data
from sklearn.preprocessing import LabelEncoder
from sklearn import preprocessing
labelEncoder = preprocessing.LabelEncoder()
labelEncoder.fit(dataset['diagnosis'])
dataset['diagnosis'] = labelEncoder.transform(dataset['diagnosis'])
dataset=dataset.values

X_train, X_test, Y_train, Y_test = train_test_split(dataset[:,2:32], dataset[:,1],
                                                    test_size=0.25, random_state=87)
np.random.seed(155)
my_first_nn = Sequential() # create model
my_first_nn.add(Dense(10, input_dim=30, activation='relu'))# hidden layer
my_first_nn.add(Dense(42, activation='softplus'))
my_first_nn.add(Dense(1, activation='sigmoid')) # output layer
my_first_nn.compile(loss='binary_crossentropy', optimizer='adam')
my_first_nn_fitted = my_first_nn.fit(X_train, Y_train, epochs=100, verbose=0,
                                     initial_epoch=0)
print(my_first_nn.summary())
print(my_first_nn.evaluate(X_test, Y_test, verbose=0))
