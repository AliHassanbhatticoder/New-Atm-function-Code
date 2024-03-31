import inquirer from "inquirer";

async function main() {
    let mybalance = 50000; // Dollar
    let myPin = 786; // Pincode

    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter your pin",
            type: "number",
        }
    ]);

    if (pinAnswer.pin === myPin) {
        console.log("Correct pin Code");

        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                message: "Please select option",
                type: "list",
                choices: ["Withdraw", "Fast cash", "Check balance"],
            }
        ]);

        if (operationAns.operation === "Withdraw") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter your withdrawal amount",
                    type: "number",
                }
            ]);
            if (amountAns.amount > mybalance) {
                console.log("Your balance is insufficient.");
            } else {
                // Subtract the withdrawn amount from the balance
                mybalance -= amountAns.amount;
                console.log("Your remaining balance is: " + mybalance);
            }
        } else if (operationAns.operation === "Fast cash") {
            let fastCashAmounts = [
                { name: "$1000", value: 1000 },
                { name: "$5000", value: 5000 },
                { name: "$10000", value: 10000 },
                { name: "$20000", value: 20000 }
            ];

            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    message: "Select fast cash amount:",
                    type: "list",
                    choices: fastCashAmounts
                }
            ]);

            let withdrawAmount = fastCashAns.fastCash;

            if (withdrawAmount > mybalance) {
                console.log("Your balance is insufficient.");
            } else {
                // Subtract the fast cash amount from the balance
                mybalance -= withdrawAmount;
                console.log("Your remaining balance is: " + mybalance);
            }
        } else if (operationAns.operation === "Check balance") {
            console.log("Your balance is: " + mybalance);
        } else {
            console.log("Invalid operation selected.");
        }
    } else {
        console.log("Please enter the correct pin code.");
    }
}

// Call the main function
main();
