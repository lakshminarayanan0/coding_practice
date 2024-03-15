const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Employment } = require('./models');

const filePath = path.join(__dirname, 'employment.csv');

const csvData = [];
fs.createReadStream(filePath)
  .pipe(csv.parse({ headers: true }))
  .on('data', (data) => {
    data.Data_value = parseFloat(data.Data_value) || 0;

    csvData.push(data);
  })
  .on('end', () => {
    console.log('Started to import data into db');
    Employment.bulkCreate(csvData)
      .then(() => {
        console.log('Data successfully imported into Employment table.');
      })
      .catch((error) => {
        console.error('Error importing data:', error);
      });
  });


//   fs.createReadStream(filePath)
//   .pipe(csv.parse({ headers: true }))
//   .transform((data) => {
//     data.Data_value = parseFloat(data.Data_value) || 0;
//     return data;
//   })
//   .on('data', (data) => {
//     Employment.create(data)
//       .then(() => {
//         console.log('Row inserted into Employment table.');
//       })
//       .catch((error) => {
//         console.error('Error inserting row:', error);
//       });
//   })
//   .on('end', () => {
//     console.log('CSV data import complete.');
//   });
