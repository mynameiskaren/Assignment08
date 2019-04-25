/*eslint-env browser*/

var $ = function(id){
    "use strict";
    return window.document.getElementById(id);
};
var noName = true, acc, amount, invalidInput;

//Step 2.1 - Create a function called bankAccount that accepts a single parameter: ownerName.
function BankAccount(ownerName){
    "use strict";
    
    //Step 2.2 - Add local variables balance and owner. Owner should be set by the incoming parameter.
    var owner = ownerName, balance = 0;
    return{
        //Step 2.3 - Return an object with methods for withdrawal that accepts a parameter (withdrawalAmount), deposit that accepts a parameter (depositAmount), getBalance(), and getOwnerName().
        //Step 2.6 - The withdrawal function will withdrawal money from the owner’s bank account and the balance should be reflected.
        withdrawal: function(withdrawalAmount){
            balance -= withdrawalAmount;
        },
        //Step 2.7 - The deposit function should add money to the owner’s bank account and the balance should be reflected.
        deposit: function(depositAmount){
            balance += depositAmount;
        },
        //Step 2.5 - The balance and ownerName methods will return the values of the private variables.
        getBalance: function(){
            return balance;
        },
        getOwnerName: function(){
            return owner;
        }

    };
}

//Step 2.4 - Add validation to ensure only appropriate withdrawals and deposits are allowed.
function validateDeposit(msg){
    "use strict";
    var input = parseFloat(window.prompt(msg));
    if(isNaN(input)){
        window.alert("Please enter a valid amount.");
        invalidInput = true;
    }else{
        amount = input;
        invalidInput = false;
    }
}

function validateWithdrawal(msg){
    "use strict";
    var input = parseFloat(window.prompt(msg));
    if(isNaN(input)){
        window.alert("Please enter a valid amount.");
        invalidInput = true;
    }else if(input > acc.getBalance()){
        window.alert("Your withdrawal amount exceeds your bank balance.");
        invalidInput = true;
    }else{
        amount = input;
        invalidInput = false;
    }
}

//Step 1.2 - When the user clicks the Name button, a prompt should appear that allows the user to enter their name.
$("Name").addEventListener(
    "click",
    function(){
        "use strict";
        acc = new BankAccount(window.prompt("What is the Bank Account User Name?"));
        noName = false;
        $("Balance").innerHTML = acc.getOwnerName() + "'s Balance: $" + acc.getBalance();
    }
);

//Step 1.3 - When the user clicks the Deposit button, a prompt should appear that allows the user to enter an amount to deposit.
$("Deposit").addEventListener("click",function(){
        "use strict";
        if(noName){
            window.alert("Before you can do that, please state your bank username.");
        }else{
            do{ 
                validateDeposit("Enter deposit amount using numbers and decimals (No $ symbols)"); 
            }while(invalidInput);
            acc.deposit(amount);
            $("Balance").innerHTML = acc.getOwnerName() + "'s Balance: $" + acc.getBalance();
        }
    }
);

//Step 1.4 - When the user clicks the Withdrawal button, a prompt should appear that allows the user to enter an amount to withdrawal.
$("Withdrawal").addEventListener("click", function(){
        "use strict";
        if(noName){
            window.alert("Before you can do that, please state your bank username.");
        } else{
            do{
                validateWithdrawal("Enter withdrawl amount using numbers and decimals (No $ symbols)");
            }while(invalidInput);
            acc.withdrawal(amount);
            $("Balance").innerHTML = acc.getOwnerName() + "'s Balance: $" + acc.getBalance();
        }
    }
);