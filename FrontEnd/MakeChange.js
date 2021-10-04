/**
  Call the MakeChange Lambda function through the API Gateway endpoint
  using axios
  **/
const axios = require('axios').default;

var myArgs = process.argv.slice(2);
/**  Validation: should be two args, TotalCost and AmountProvided */
const validated = validateArgs(myArgs);
console.log(validated);
/** make the call */
axios.post('https://9qpx4gggp0.execute-api.us-west-2.amazonaws.com/Prod', {
  TotalCost: validated.TotalCost,
  AmountProvided: validated.AmountProvided
})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

/**
  Validation: should be two args, TotalCost and AmountProvided
    returns JSON of arguments
*/
function validateArgs(args) {
  console.log("args: ", args);
  var returnJson = {};
  for (var i = 0; i < args.length; i++) {
    let subArgs = args[i].split('=', 2);
    if (subArgs[0] != 'TotalCost' && subArgs[0] != 'AmountProvided') {
      console.log("\nProvide the arguments: 'TotalCost=value AmountProvided=value' \n");
      process.exit();
    }
    switch (subArgs[0]) {
      case 'TotalCost':
        returnJson.TotalCost = subArgs[1];
        break;
      case 'AmountProvided':
        returnJson.AmountProvided = subArgs[1];
        break;
      default:
        console.log("\nProvide the arguments: 'TotalCost=value AmountProvided=value' \n");
        process.exit();
        break;
    }
  }
  return returnJson;
}