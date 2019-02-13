net_Amount = 0
Deposit = 0
Withdraw = 0
choice = 0

#print(choice)
while(choice != 4):
    choice = input("Press\1d for Deposit\n\t\t2 for Withdrawal\n\t\t3 to show Total Amount\n\t\t4 to Exit-\n")
    if (int(choice) == 1):
        Deposit = input("Deposit-\n")
        net_Amount = net_Amount + int(Deposit)
    elif (int(choice) == 2):
        Withdraw = input("Withdraw-\n")
        net_Amount = net_Amount - int(Withdraw)
    elif (int(choice) == 3):
        print(net_Amount)
    else:
        break