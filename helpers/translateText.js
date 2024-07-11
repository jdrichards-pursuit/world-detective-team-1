require('dotenv').config();
// Imports the Google Cloud client library
// const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
// const translate = new Translate({
//     key: process.env.GOOGLE_KEY
//   });

// const translateUrl = process.env.TRANSLATE_URL;
// const translateKey = process.env.GOOGLE_KEY;

// translate.engine = "google"
// translate.key = process.env.TRANSLATE_KEY

// async function translateText(){
//     const text = await translate("Hello world", "es");
// console.log(text);
// }

// async function translateText(text, language_code) {
//     // Translates the text into the target language. "text" can be a string for translating a single piece of text, or an array of strings for translating multiple texts.
//     let [translations] = await translate.translate(text, language_code);
//     translations = Array.isArray(translations) ? translations : [translations];
//     console.log('Translations:');
//     translations.forEach((translation, i) => {
//       console.log(`${text[i]} => (${language_code}) ${translation}`);
//     });
//   }

// async function translateText(text, targetLanguage) {
//     try {
//       // Call the Google Cloud Translation API
//       const res = await translate.translations.list({
//         q: text,
//         target: targetLanguage,
//       });
  
//       const translatedText = res.data.translations[0].translatedText;
//       console.log('***TRANSLATED TEXT***', translatedText);
//       return translatedText;
//     } catch (error) {
//       console.error('Error translating text:', error);
//     }
//   }

module.exports = translateText