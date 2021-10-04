

const HowManyCoinsInAmount = (costDifference, coinValue) => {
  const remainder = ((costDifference  % coinValue ));
  return {
    intVal: Math.floor(costDifference / coinValue),
    remainder: remainder
  }

}

module.exports = {
  HowManyCoinsInAmount,
};
