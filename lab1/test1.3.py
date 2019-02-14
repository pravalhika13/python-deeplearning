List1 = []
List2 = []


count1 = input("\nEnter number of Students in Python\t-")
stuPython = int(count1)

print("Enter the Student names in Pyhton Class-")
for i in range(stuPython):
    name = input("\n")
    List1.append(name)

count2 = input("\nEnter number of Students in Web\t-")
stuWeb = int(count2)

print("Enter the Student names in Web Class-")
for i in range(stuWeb):
    name = input("\n")
    List2.append(name)
4
#print(myList)3


set1 = set(List1)
set2 = set(List2)
common = set1.intersection(set2)
union = set1.union(set2)

notCommon = union - common

print("In Common- {0}".format(common))
print("Not in Common- {0}".format(notCommon))