

x=int(input("enter first number"))
y=int(input("enter second number"))
list1=[]
for i in range(x,y):
    s = str(i)
    if (int(s[0])%2==1) and (int(s[1])%2==1) and (int(s[2])%2==1):
        list1.append(s)
print(list1)
