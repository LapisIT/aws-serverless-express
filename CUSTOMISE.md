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

# Create a project based on the example

* Create your new project Dev/new-project in svgitlab
* Clone & cd
* Run the following command
* Read the README.md

```bash
git archive --remote=git@svgitlab.spatialvision.com.au:aws/aws-serverless-express-320-Jul2018.git \
HEAD:examples/basic-starter | tar xf -
```