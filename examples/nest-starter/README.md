# How to create your project based on this starter
```bash
git archive --remote=git@svgitlab.spatialvision.com.au:aws/aws-serverless-express-336.git \
HEAD:examples/basic-starter | tar xf -
```

# Run the following setup scripts
```bash
nvm use
npm i
# verify locally http://localhost:3000
npm start 
# build for deploying to API GW + Lambda
npm run build:prod

# Make sure to replace the following in config
# --function-name="YourProjectApiDev" \
# --stack-name="your-project-api" \
# --api-name="YourProjectApi"

npm run config -- --account-id="437737057749" \
--bucket-name="artifacts.spatialvision.com.au" \
--region="ap-southeast-2" \
--function-name="YourProjectApiDev" \
--stack-name="your-project-api" \
--api-name="YourProjectApi"

npm run setup

https://console.aws.amazon.com/cloudformation/home
```

# Rename package.json for project
```bash
  "name": "aws-serverless-nest-example",
  "version": "2.1.1",
  "description": "Example application for running a Node Express app on AWS Lambda using Amazon API Gateway.",
  
```

# Locally test, modify API and deploy
```bash
npm run local

npm start

npm run package-deploy
```

https://github.com/lambci/docker-lambda

docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs10.x lambda.js


# build, updload and deploy scripts

Update the prefix in deploy-commons.sh

```bash
export S3_API_KEY_PREFIX='your-projects/api'
```

