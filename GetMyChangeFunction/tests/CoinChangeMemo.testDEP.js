
const { HowManyCoinsInAmount, coinChange } = require('../HowManyCoinsInAmount')

// coins in Cents
const AvailableCoins = [
  100,
  25,
  10,
  1,
];
const dollars = 0, quarters = 1, dimes = 2, pennies = 3;

describe('Test coinChange', () => {

  it('should return 1.90', async () => {
    const amount = 190
    const memo = coinChange(AvailableCoins, amount)
    // expect(results.intVal).toEqual(1);
    // expect(results.remainder).toEqual(90);

    console.log(memo)

    let n = 5;
// findCombinations(n);


  });


});


