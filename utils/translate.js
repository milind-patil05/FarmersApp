export const translate = async (text, languageFrom, languageTo) => {
  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
    params: {text: text, to: languageTo, from: languageFrom},
    headers: {
      'X-RapidAPI-Key': '69a71a6d21msh003baca6f70d41dp1be9afjsnd85a37871dac',
      'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com',
    },
  };

  const response = await axios.request(options).catch(function (error) {
    console.error(error);
  });

  if (response.status !== 200) {
    console.log(response);
    throw new Error(
      'Translate call failed. Response status: ' + response.status,
    );
  }

  return response.data;
};
