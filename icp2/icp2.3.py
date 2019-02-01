f = open('python')
f1=f.readlines()


for x in f1:
    words=len(x.split())
    letters=sum(c.isalpha() for c in x)
    print(x, 'words:',words,'letters:',letters)