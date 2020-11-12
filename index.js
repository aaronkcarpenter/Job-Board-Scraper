const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1hNLCKPC9w-TvVswBmljLmRwtWZgtNJBjpqMhMmUegN4');

// OR load directly from json file if not in secure environment

(async function() {
  await doc.useServiceAccountAuth(require('./credentials.json'));
  
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  await doc.updateProperties({ title: 'renamed doc' });
  
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  const moreRows = await sheet.addRows([
    { title: 'Software Developer', location: 'Dallas' },
    { title: 'Software Engineer', location: 'Mansfield' },
  ]);
})()
