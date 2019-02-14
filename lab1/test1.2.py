def Convert(tup, dict):
    for a, b in tup:
        dict.setdefault(a, []).append(b)
    return dict
tu = []
tp1 = ('John', ('Physics', 80))
tp2 = ('Daniel', ('Science', 90))
tp3 = ('John', ('Chemistry', 60))
tp4 = ('Mark',('Maths',100))
tp5 = ('Daniel',('History',75))
tp6 = ('Mark',('Social', 95))
tu1 = [tp1,tp2,tp3,tp4,tp5,tp6]
print(f"Tuple Form - {tu1}")
dictionary = {}
dict1 = Convert(tu1,dictionary)
print(f"Dictionary Form - {dict1}")