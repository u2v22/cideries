// const Cidery = require('../models/Cidery');
// const ciderySchema = ciderySchema;
// const validationCheck = validationCheck;
const { Cider } = require('../models/cider');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = function createCider() {
  try {
    const results = [];
    fs.createReadStream(__dirname + '/googleSheets.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // console.log(results);
        results.forEach(item => {

          let cider = new Cider({

            name: item.Name,
            itemidery: item.Brand,
            story: item.Story,
            awards: item.Awards, // array
            gluten: item.Gluten,
            sulphites: item.Sulphites,
            ABV: item.ABV,
            apples: item.Apples, // array
            yeast: item.Yeast,
            hops: item.Hops, // array,
            drynessStyle: item.Style, // Objeitemt
            notes: item.Notes,
            flavourProfile: '123456',
            image: item.Img
          });

        Cider.create(cider);

        });
      });
  }
  catch(err) {
    console.log(err.message);
  }
}
