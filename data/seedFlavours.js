// const Cidery = require('../models/Cidery');
// const ciderySchema = ciderySchema;
// const validationCheck = validationCheck;
const { FlavourProfiles } = require('../models/flavourProfiles');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = function seedFlavours() {
  try {
    const results = [];
    fs.createReadStream(__dirname + '/googleSheets.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // console.log(results);
        results.forEach(item => {

          let FP = new FlavourProfiles({
            flavourProfile: item.Story,
          });

        FlavourProfiles.create(FP);

        });
      });
  }
  catch(err) {
    console.log(err.message);
  }
}
