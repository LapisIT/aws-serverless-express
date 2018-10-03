#!/bin/bash
source ./deploy-commons.sh
source ./.env

init-nvmrc-source $NVM_SOURCE || { echo "init-nvm failed"; exit 1; }

API_VERSION=`node scripts/api-version` || { echo "api-version failed"; exit 1; }

echo "zip $API_VERSION"
zipit $LAMBDA_FUNCTION_ZIP $API_VERSION
upload $S3_BUCKET_ARTIFACTS $S3_API_KEY_PREFIX $API_VERSION $LAMBDA_FUNCTION_ZIP
echo "All good"
exit 0