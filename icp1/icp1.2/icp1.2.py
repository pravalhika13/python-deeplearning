sample=input('enter a sentence:')
print('number of letters in a sentence')
print(len(sample))
d=0
l=0
for char in sample:
    if char.isdigit():
        d=d+1
    elif char.isalpha():
        l=l+1

    else:
        pass
print('Letters in sentence', l)
print('Digits in sentence', d)
print('words in a sentence')
print(len(sample.split()))




