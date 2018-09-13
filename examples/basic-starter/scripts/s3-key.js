/**
 * Created by hxg on 8/05/17.
 */
require('dotenv').config();

const apiVersion = () => {
  if(process.argv.length < 3) {
    throw new Error('You must supply the API version as the 1st argument.');
  }

  const apiVersion = process.argv[2];

  if(!apiVersion) {
    throw new Error('apiVersion must be specified');
    process.exit(1);
  }

  return apiVersion
}

const version = apiVersion();
const key = `${process.env.S3_API_KEY_PREFIX}/${version}/${process.env.LAMBDA_FUNCTION_ZIP}`;

//console.log('API Version is %s, key is %s', version, key);
process.stdout.write(key);


