const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


function getTheErrorResponse(errorMessage, defaultLanguage) {
  return {
    statusCode: 200,
    body: {
      language: defaultLanguage || 'en',
      errorMessage: errorMessage
    }
  };
}


function main(params) {

  /*
   * The default language to choose in case of an error
   */
  const defaultLanguage = 'en';

  return new Promise(function (resolve, reject) {

    try {
      console.log("bla")
      const visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        authenticator: new IamAuthenticator({
          apikey: 'Y63AsExWpXojWl_kdLENeaDn7SrzBp8YUYJn8xkhW1vw',
        }),
        serviceUrl: 'https://api.eu-de.visual-recognition.watson.cloud.ibm.com/instances/deee93a1-b394-40d3-90bf-0b9d1ac6a069',
      });
      console.log("test")

      const classifyParams = {
        url: 'https://ibm.biz/BdzLPG',
      };

      visualRecognition.classify(classifyParams)
          .then(response => {
            const classifiedImages = response.result;
            console.log(JSON.stringify(classifiedImages, null, 2));
          })
          .catch(err => {
            console.log('error:', err);
          });
      
      /*
      
      languageTranslator.identify(identifyParams)
        .then(identifiedLanguages => {
          console.log(JSON.stringify(identifiedLanguages, null, 2));
          resolve({
            statusCode: 200,
            body: {
              text: params.text, 
              language: identifiedLanguages[0].language,
              confidence: identifiedLanguages[0].confidence,
            },
            headers: { 'Content-Type': 'application/json' }
          });
    
        })*/


    } catch (err) {
      console.error('Error while initializing the AI service', err);
      resolve(getTheErrorResponse('Error while henlo with the language service', defaultLanguage));
    }
  });
}
