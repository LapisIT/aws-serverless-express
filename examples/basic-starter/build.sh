#!/bin/bash
source ./.env
source ./deploy-commons.sh
init-nvmrc-source $NVM_SOURCE || { echo "init-nvm failed"; exit 1; }

echo "npm install"
npm install || { echo "install failed"; exit 1; }
npm run ts-clear || { echo "ts failed"; exit 1; }
