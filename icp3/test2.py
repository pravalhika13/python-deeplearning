import numpy as np

r = np.random.randint(20, size=15)
print(r)
print("Most frequent value in the above array:")
print(np.bincount(r).argmax())