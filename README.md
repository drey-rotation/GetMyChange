# GetMeMyChange

This solution Deploys a NodeJS Lambda function behind an API Gateway REST API. It uses AWS Serverless Application Model (SAM) to create the resources. 

In addition, a CI/CD pipeline is used to build, test, and deploy the REST API using SAM Pipelines (pipeline creation is not part of this repo). 

# The Pipeline

The pipelines are created using SAM pipelines, a new feature of the SAM cli. Resources created here include IAM Users, IAM Roles, and IAM Permissions for services and programatic access to resources at each stage. The pipeline uses Git Flow, where each new feature branch becomes it's own pipeline and creates and manages it's own resources. Branches merged into main go through this scenario:

  1. Build: Lambda function is built and any syntax errors will stop deployments.
  2. Unit Test phase: run basic functional testing.
  3. Deployment to test environment: Deploys resources. A manual stage can be added here if desired.
  4. Integration test phase: More testing.
  5. Deployed to Production if all previous phases complete successfully.

<br/>
The initial pipeline stages. CodePipeline has a nice visual interface:
<br/>
<img src="./pipeline-img.jpg" width="500" >

<br/>

  The prod endpoint is https://9qpx4gggp0.execute-api.us-west-2.amazonaws.com/Prod .

# UI Test

There is a front end "UI" in this repo that uses axios to call the REST API: ./FrontEnd. To run the demo application:

  - cd FrontEnd
  - npm i
  - node MakeChange TotalCost=1.29 AmountProvided=5.00
 

# The lambda function

I was asked recently to create  a program to calculate the change from a total amount and an amount given in dollars. When executed it should accept two arguments:

  1) “Total cost” (In USD)
  2) “Amount provided” (also in USD).  

Return as output the change that should be provided, not in USD, but instead by returning the count of each denomination of bills and/or coins that should be returned as change. 

  Example:
  (INPUT)
  Total cost: $1.29
  Amount Provided: $5.00

  (OUTPUT)
  Change Returned: 
  3 $1 bills
  2 quarters
  2 dimes
  1 penny

{
  "body": "{ \n    \"TotalCost\": \"7.50\",\n    \"AmountProvided\": \"7.50\"\n}"
}


# Unit Tests

The lambda function contains a few basic Jest unit tests in GetMyChangeFunction/tests/CoinsInAmount.test.js:


<img src="./unit-testing.jpg" width="500" >

<br/><br/>


The build templates are completely customizable. Here is the unit testing build phase config:

<img src="./unit-testing-template.jpg" width="500" >

# Pre-reqs:

  - An AWS Account
  - AWS SAM installed locally

# The Lambda Application

When executed it should accept two arguments:

  1) “Total cost” (In USD)
  2) “Amount provided” (also in USD).  

# Conclusion

If you want more details about how you can create your these pipelines in your own environment let me know.






