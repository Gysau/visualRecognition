const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


/**
 * Helper 
 * @param {*} errorMessage 
 * @param {*} defaultLanguage 
 */
function getTheErrorResponse(errorMessage, defaultLanguage) {
  return {
    statusCode: 200,
    body: {
      language: defaultLanguage || 'en',
      errorMessage: errorMessage
    }
  };
}

/**
  *
  * main() will be run when the action is invoked
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
function main(params) {

  /*
   * The default language to choose in case of an error
   */
  const defaultLanguage = 'en';

  return new Promise(function (resolve, reject) {

    try {

      const visualRecognition = new VisualRecognitionV3({
        version: '{version}',
        authenticator: new IamAuthenticator({
          apikey: '{Y63AsExWpXojWl_kdLENeaDn7SrzBp8YUYJn8xkhW1vw}',
        }),
        serviceUrl: '{https://api.eu-de.visual-recognition.watson.cloud.ibm.com/instances/deee93a1-b394-40d3-90bf-0b9d1ac6a069}',
      });

      const classifyParams = {
        imagesFile: fs.createReadStream('https://scontent-frt3-2.xx.fbcdn.net/v/t1.0-9/431863_520840747973885_832396808_n.jpg?_nc_cat=103&ccb=2&_nc_sid=cdbe9c&_nc_eui2=AeHP2DCfj2BQMzJTfHrIB_GxiyrX2990vFKLKtfb33S8UqmY6PKFrbk6H-GUpOn4Rbc&_nc_ohc=e7uhjSm6M1EAX-te_2a&_nc_ht=scontent-frt3-2.xx&oh=e29b4bbcd3343dd39d2b4f9748653400&oe=6003DB92'),
        owners: ['me'],
        threshold: 0.0,
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
      resolve(getTheErrorResponse('Error while blaa blaaaa with the language service', defaultLanguage));
    }
  });
}
