const Sheet = require('./sheet');
const fetch = require('node-fetch');

async function scrapePage(i) {
  const res = await fetch(`https://jobs.github.com/positions.json?page=${i}&search=code`)
  const json = await res.json();

  const rows = json.map(job => {
    return {
      company: job.company,
      title: job.title,
      location: job.location,
      date: job.created_at,
      url: job.url
    }
  })

  return rows;
}

(async function() {
  

  let i = 1;
  let rows = [];
  while(true) {
    const newRows = await scrapePage(i);
    if(newRows.length === 0) break;
    rows = [...rows, ...newRows];
    console.log('new row length', newRows.length);
    i++;
  }
  
  const sheet = new Sheet();
  await sheet.load();

  await sheet.addRows(rows)

  console.log('total rows length', rows.length);
})()













// First Example Used
// const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1hNLCKPC9w-TvVswBmljLmRwtWZgtNJBjpqMhMmUegN4');

// // OR load directly from json file if not in secure environment

// (async function() {
//   await doc.useServiceAccountAuth(require('./credentials.json'));
  
//   await doc.loadInfo(); // loads document properties and worksheets
//   console.log(doc.title);
//   await doc.updateProperties({ title: 'renamed doc' });
  
//   const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
//   const moreRows = await sheet.addRows([
//     { title: 'Software Developer', location: 'Dallas' },
//     { title: 'Software Engineer', location: 'Mansfield' },
//   ]);
// })()
