#!/bin/bash
export S3_BUCKET_ARTIFACTS='artifacts.spatialvision.com.au'
export S3_API_KEY_PREFIX='ten/api'
export LAMBDA_FUNCTION_ZIP=lambda-function.zip
export AWS_PROFILE='default'
export AWS_REGION='ap-southeast-2'

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -s|--source)
    NVM_SOURCE="$2"
    shift # past argument
    ;;
    *)
          # unknown option
    ;;
esac
shift # past argument or value
done

echo "NVM_SOURCE: $NVM_SOURCE"
if [ -z "$NVM_SOURCE" ]; then
    NVM_SOURCE=~/.nvm/nvm.sh
    echo "NVM_SOURCE not specified, setting default"
fi

function install-nvm {
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
}

function init-nvmrc-source {
    NVM_SOURCE=$1
    echo "nvm use with .nvmrc, source nvm with NVM_SOURCE: $NVM_SOURCE"
    source $NVM_SOURCE || { echo "source failed"; exit 1; }
    nvm use || { echo "nvm use failed"; exit 1; }
}

function init-npm {
    echo "run npm install"
    npm install || { echo 'install failed'; exit 1; }

    #echo "run npm update"
    #npm update
}

function init-nvmrc {
    NVM_DIR=$1
    echo "nvm use with .nvmrc, NVM_DIR: $NVM_DIR"
    source $NVM_DIR/nvm.sh || { echo "source failed"; exit 1; }
    nvm use || { echo "nvm failed"; exit 1; }
}

function update-function {
    FUNCTION_NAME=$1
    S3_BUCKET=$2
    S3_KEY=$3
    echo "updating $FUNCTION_NAME using $S3_BUCKET + $S3_KEY"
    aws lambda update-function-code --function-name $FUNCTION_NAME \
    --region $AWS_REGION \
    --s3-bucket $S3_BUCKET \
    --s3-key $S3_KEY \
    --profile $AWS_PROFILE \
    || { echo "update failed"; exit 1; }
}

function create-s3 {
    S3_BUCKET=$1
    echo "creating s3 bucket: $S3_BUCKET"
    aws s3 mb s3://$S3_BUCKET --region $AWS_REGION \
    --profile $AWS_PROFILE \
    || { echo "create failed"; exit 1; }

}

function build {
    NODE_VERSION=6.10
    NVM_DIR=~/.nvm
    echo "nvm use $NODE_VERSION, NVM_DIR: $NVM_DIR"

    source $NVM_DIR/nvm.sh || { echo "source failed"; exit 1; }
    npm install || { echo "npm failed"; exit 1; }
}

function zipit {
    ZIP=$1
    CONTENTS="."
    echo "zip $ZIP with $CONTENTS in $(pwd)"
    rm -fr $ZIP
    zip -q -r $ZIP $CONTENTS \
    -x *.git* \
    -x lambda-function.zip
}

function upload {
    S3_BUCKET=$1
    ARTIFACT=$2
    API_VERSION=$3
    ZIP=$4
    S3_URI=s3://$S3_BUCKET/$ARTIFACT/$API_VERSION/$ZIP
    echo "upload $ZIP, API_VERSION: $API_VERSION to $S3_URI"
    aws s3 cp $ZIP \
    $S3_URI \
    --region $AWS_REGION \
    --profile $AWS_PROFILE \
    || { echo "cp failed"; exit 1; }

    # todo remove old or somehow
    # http://docs.aws.amazon.com/AmazonS3/latest/dev/set-lifecycle-cli.html
}
