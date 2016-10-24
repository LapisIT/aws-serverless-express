#!/usr/bin/env node
'use strict'
const fs = require('fs')
const exec = require('child_process').exec
const args = process.argv.slice(2)
const accountId = args[0]
const bucketName = args[1]
const region = args[2] || 'us-east-1'
const availableRegions = ['us-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1', 'ap-northeast-1', 'ap-northeast-2', 'ap-southeast-1', 'ap-southeast-2']
const cloudFormationStackName = args[3]
const lambdaFunction = args[4]

if (!accountId || accountId.length !== 12) {
    console.error('You must supply a 12 digit account id as the first argument')
    return
}

if (!bucketName) {
    console.error('You must supply a bucket name as the second argument')
    return
}

if (availableRegions.indexOf(region) === -1) {
    console.error(`Amazon API Gateway and Lambda are not available in the ${region} region. Available regions: us-east-1, us-west-2, eu-west-1, eu-central-1, ap-northeast-1, ap-northeast-2, ap-southeast-1, ap-southeast-2`)
    return
}

if (!cloudFormationStackName) {
    console.error('You must supply a cloud formation name as the 3rd argument')
    return
}

if (!lambdaFunction) {
    console.error('You must supply a lambda function name as the 3rd argument')
    return
}

modifySimpleProxyFile()
modifyPackageFile()
modifyCloudformationFile()

function modifyCloudformationFile() {
    const cloudFormationPath = './cloudformation.json'
    const cloudFormation = fs.readFileSync(cloudFormationPath, 'utf8')
    const cloudFormationModified = cloudFormation
      .replace(/YOUR_LAMBDA_FUNCTION/g, lambdaFunction)

    fs.writeFileSync(cloudFormationPath, cloudFormationModified, 'utf8')
}

function modifySimpleProxyFile() {
    const simpleProxyApiPath = './simple-proxy-api.yaml'
    const simpleProxyApi = fs.readFileSync(simpleProxyApiPath, 'utf8')
    const simpleProxyApiModified = simpleProxyApi
        .replace(/YOUR_ACCOUNT_ID/g, accountId)
        .replace(/YOUR_AWS_REGION/g, region)
        .replace(/YOUR_LAMBDA_FUNCTION/g, lambdaFunction)

    fs.writeFileSync(simpleProxyApiPath, simpleProxyApiModified, 'utf8')
}

function modifyPackageFile() {
    const packageJsonPath = './package.json'
    const packageJson = fs.readFileSync(packageJsonPath, 'utf8')
    const packageJsonModified = packageJson
        .replace(/YOUR_UNIQUE_BUCKET_NAME/g, bucketName)
        .replace(/YOUR_AWS_REGION/g, region)
        .replace(/YOUR_CLOUD_FORMATION_STACK_NAME/g, cloudFormationStackName)
        .replace(/YOUR_LAMBDA_FUNCTION/g, lambdaFunction)

    fs.writeFileSync(packageJsonPath, packageJsonModified, 'utf8')
}
