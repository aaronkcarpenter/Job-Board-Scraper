const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet('1hNLCKPC9w-TvVswBmljLmRwtWZgtNJBjpqMhMmUegN4');
  }
  async load() {
    await this.doc.useServiceAccountAuth(require('./credentials.json'));
    await this.doc.loadInfo(); 
  }

  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    await sheet.addRows(rows);
  }
}

// Example of Adding Rows to my Google Sheets
// (async function() {
//   const sheet = new Sheet();
//   await sheet.load();
//   await sheet.addRows([
//     { title: 'React Developer', location: 'NY' },
//     { title: 'Software Engineering Intern', location: 'Houston' },
//   ])
  
// })()
