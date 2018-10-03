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

# Update the express src from express-ts
```bash
cd examples/basic-starter/

curl -vL https://api.github.com/repos/SpatialVision/express-ts-template/tarball/develop | \
tar xfz - && DIR=`ls |grep SpatialVision` && rm -fr src && mv $DIR/src .; mv $DIR/package.json ./package-express-ts.json; rm -fr $DIR

# Now manually run diff on packagel.json and package-express-ts.json and ensure you get dependencies and devDependencies updated
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