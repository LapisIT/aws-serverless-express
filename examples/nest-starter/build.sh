#!/bin/bash
source ./.env
source ./deploy-commons.sh
init-nvmrc-source $NVM_SOURCE || { echo "init-nvm failed"; exit 1; }

echo "npm install"
npm ci || { echo "ci failed"; exit 1; }
npm run build:prod || { echo "build failed"; exit 1; }

