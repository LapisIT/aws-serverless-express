#!/bin/bash
while [[ $# -gt 1 ]]
do
key="$1"
case $key in
    -v|--api-version)
    API_VERSION="$2"
    shift
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

source ./deploy-commons.sh
source ./.env

init-nvmrc-source $NVM_SOURCE || { echo "init-nvm failed"; exit 1; }

echo "API_VERSION: $API_VERSION"
if [ -z "$API_VERSION" ]; then
    API_VERSION=`node scripts/api-version.js`
    echo "API_VERSION is not set. Setting the default: $API_VERSION"
fi

S3_KEY=`node scripts/s3-key.js $API_VERSION`

update-function $API_FUNCTION_NAME $S3_BUCKET_ARTIFACTS $S3_KEY
