# Fork
```bash
git clone git@github.com:awslabs/aws-serverless-express.git express
git remote rename origin upstream

git remote add origin git@svgitlab.spatialvision.com.au:aws/aws-serverless-express-320.git

# commit

git push

git pull upstream master
or 
git fetch --all

```

# Customised example configuration for SV use
The following config has been customised
```bash
express/examples/basic-starter/scripts/configure.js
express/examples/basic-starter/cloudformation.yaml
express/examples/basic-starter/simple-proxy-api.yaml
express/examples/basic-starter/package.json
```

# Create a customised example
```bash
cd example/basic-starter
npm i
npm run config -- --account-id="437737057749" \
--bucket-name="artifacts.spatialvision.com.au" \
--region="ap-southeast-2" \
--function-name="ServerlessExpressTestHXGJul18" \
--stack-name="ServerlessExpressStack320Jul18" \
--api-name="ServerlessExpressApiHXGJul18"

npm run setup

https://console.aws.amazon.com/cloudformation/home
```

# Locally test, modify API and deploy
```bash
npm run local

npm start

npm run package-deploy
```
