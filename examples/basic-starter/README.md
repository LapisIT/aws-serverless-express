
# How to create your project based on this starter
```bash
git archive --remote=git@svgitlab.spatialvision.com.au:aws/aws-serverless-express-320-Jul2018.git \
HEAD:examples/basic-starter | tar xf -
```

# Run the following setup scripts
```bash
nvm use
npm i

# Make sure to replace:
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

# Locally test, modify API and deploy
```bash
npm run local

npm start

npm run package-deploy
```