// const Cidery = require('../models/Cidery');
// const ciderySchema = ciderySchema;
// const validationCheck = validationCheck;
const { Cidery } = require('../models/cidery');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = function createCideries() {
  try {
    const results = [];
    fs.createReadStream(__dirname + '/googleSheets.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // console.log(results);
        results.forEach(item => {

          let cidery = new Cidery({
            name: item.Brand,
            province: 'BC',
            city: 'Vernon',
            street: item.Address,
            phoneNum: 250555555,
            email: 'info@cidery.com',
            website: 'www.website.ca',
            tastingRoom: true,
            onlineStore: true,
            offSales: true,
            est: 1987,
            socialMedia: true,
          });

        Cidery.create(cidery);

        });
      });
  }
  catch(err) {
    console.log(err.message);
  }
}
