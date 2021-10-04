const { HowManyCoinsInAmount } = require('./HowManyCoinsInAmount')
/* coin representation in pennies */
const AvailableCoins = [
    { amount: 10000, singletext: "$100 bill", pluralText: "$100 bills" },
    { amount: 5000, singletext: "$50 bill", pluralText: "$50 bills" },
    { amount: 1000, singletext: "$10 bill", pluralText: "$10 bills" },
    { amount: 500, singletext: "$5 bill", pluralText: "$5 bills" },
    { amount: 100, singletext: "$1 bill", pluralText: "$1 bills" },
    { amount: 25, singletext: "quarter", pluralText: "quarters" },
    { amount: 10, singletext: "dime", pluralText: "dimes" },
    { amount: 1, singletext: "penny", pluralText: "pennies" },
];
const dollars = 0, quarters = 1, dimes = 2, pennies = 3;


exports.getMeMyChangeHandler = async (event) => {

    const input = JSON.parse(event.body);
    // convert everything to pennies
    const costDifference = (input.AmountProvided * 100) - (input.TotalCost * 100);
    /**
    * For each coin, get the number of coins and remainder
    */
    var returnVal = "Change Returned!: \n";
    var amountToMatch = costDifference; // pennies
    for (var i = 0; i < AvailableCoins.length; i++) {
        // how many ?
        var results = HowManyCoinsInAmount(amountToMatch, AvailableCoins[i].amount);
        if (results.intVal > 0) {
            returnVal += (results.intVal > 1) ? `${results.intVal} ${AvailableCoins[i].pluralText}` : `${results.intVal} ${AvailableCoins[i].singletext}`;
        } else
            returnVal += `Zero ${AvailableCoins[i].pluralText}`;
        returnVal += '\n ';
        amountToMatch = results.remainder;
    }
    console.log(returnVal);

    const response = {
        statusCode: 200,
        body: JSON.stringify(returnVal),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return response;

};