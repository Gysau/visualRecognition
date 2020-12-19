FROM openwhisk/action-nodejs-v10:latest

RUN npm install ibm-watson@^6.0.0 ibm-cloud-sdk-core
