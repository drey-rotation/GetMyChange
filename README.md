# GetMeMyChange

This solution creates a NodeJS Lambda function behind an API Gateway REST API. It uses AWS Serverless Application Model (SAM) to create these resources. 

In addition, a CI/CD pipeline is used to build, test, and deploy the function using SAM Pipelines (pipeline creation is not part of this repo). 

The solution deploys an AWS EventBridge bus that uses API destinations to communicate the alerts to my configured Slack channel.

# The Pipeline

The pipelines are created using SAM pipelines, a new feature of the SAM cli. Resources created here include IAM users, roles, and permissions for each stage. The pipeline uses Git Flow, where each new feature branch becomes it's own pipeline and creates and manages it's own resources. Branches merged into main first go through an integration test phase and if passed the function will be deployed to Production.

Build -> unit test -> deploy to test -> integration test -> deploy to production

Best practice is to deploy the production and dev branches to different AWS Accounts.

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

1. Creates a CodePipeline Pipeline for building, testing and deploying the GetMeMyChange lambda function

You can clone this repo and deploy the entire infrastructure into your own AWS Account if you like. I can help you with instructions on how to do that if you like.

2. Pushing to this repo triggers the CI/CD pipeline on my personal AWS Account. The pipeline builds one stage for each branch of this repo (currently DEV and PROD). DEV and PROD are on (or can be on) separate accounts and can be assigned different access permissions -- i.e. one group of developers can push to the DEV branch but a separate and smaller group can have permissions to push to PROD. 

This solution will deploy a pipeline with 2 Stages. One stage is deployed to DEV (dev branch) and one stage deployed to Production (main branch). 

Best practice is to use separate AWS accounts for each stage. This demo uses only 1 account.

The template creates all of the user (pipeline user), github access key/secret, buckets, iam rules
    for demo, DEV and PROD pipelines are both created on the same AWS Account.
  1. Stage1 DEV:
  

  2. Stage2 PROD:


    - Builds the source code for the lambda function, checks for syntax errors.
    - Runs the lambda function through basic Unit and Functional tests using jest. If a test fails, a notification is sent to an administrator.
    - Deploys the function to API Gateway and Lambda.

  The results can be seen here:

    https://jlkdsfjkldsfjlksdfjkls


# EventBus

# Slack Integration
# Tech Stack

  - AWS Codepipeline (CodeBuild, CodeDeploy)
  - Cloudformation
  - AWS SAM
  - API Gateway
  - Lambda
  - Jest Unit Testing
  - Yup validation
# git flow

  

# Pre-reqs:

  - An AWS Account
  - AWS SAM installed locally

# The Lambda Application

When executed it should accept two arguments:

  1) “Total cost” (In USD)
  2) “Amount provided” (also in USD).  



  # How to Use

1. Clone the repo
2. cd src/handlers
  npm i
3. sam deploy

2. Make changes to the Lambda function.
3. Push changes on the  main branch.
4. Once the build is complete, you should see your changes reflected here:

  https://jlfsdajklsfajklfsdjlkfsad
  
