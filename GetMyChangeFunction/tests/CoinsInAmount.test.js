const { HowManyCoinsInAmount } = require('../HowManyCoinsInAmount')

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
const onehundred=0, fifty=1, ten=2, five=3, dollars = 4, quarters = 5, dimes = 6, pennies = 7;


describe('Test the Dollar calculation of HowManyCoinsInAmount', () => {

    // basically does syntax checking and sanity checks
  it('should return 1.90', async () => {
    var event = { body: {TotalCost: 7.50, AmountProvided: 439.40}}
    const input = event.body; 
    var returnVal = "Change Returned: \n";
    // convert everything to pennies
    const costDifference = (input.AmountProvided * 100)-(input.TotalCost * 100) ;
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

    console.log("Returning: ", returnVal);
    // expect(results.intVal).toEqual(1);
    // expect(results.remainder).toEqual(90);


  });

  
  it('Tests fractions as remainders for quarters', async () => {
    // 71 cents remaining, how many quarters?
    remaining = 71;
    coinAmount = AvailableCoins[quarters].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(2)
    expect(results.remainder).toBe(21)

    remaining = 99;
    coinAmount = AvailableCoins[quarters].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(3)
    expect(results.remainder).toBe(24)

    remaining = 1;
    coinAmount = AvailableCoins[quarters].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(0)
    expect(results.remainder).toBe(1)



  });

  it('Tests fractions as remainders for dimes', async () => {
    // 71 cents remaining, how many quarters?
    remaining = 71;
    coinAmount = AvailableCoins[dimes].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(7)
    expect(results.remainder).toBe(1)

    remaining = 99;
    coinAmount = AvailableCoins[dimes].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(9)
    expect(results.remainder).toBe(9)

    remaining = 10;
    coinAmount = AvailableCoins[dimes].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(1)
    expect(results.remainder).toBe(0)



  });
  it('Tests fractions as remainders for pennies', async () => {
    // 71 cents remaining, how many quarters?
    remaining = 71;
    coinAmount = AvailableCoins[pennies].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(71)
    expect(results.remainder).toBe(0)

    remaining = 99;
    coinAmount = AvailableCoins[pennies].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(99)
    expect(results.remainder).toBe(0)

    remaining = 10;
    coinAmount = AvailableCoins[pennies].amount;
    var results = HowManyCoinsInAmount((remaining), coinAmount);
    expect(results.intVal).toBe(10)
    expect(results.remainder).toBe(0)



  });

  


});
