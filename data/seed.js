// const Cidery = require('../models/Cidery');
// const ciderySchema = ciderySchema;
// const validationCheck = validationCheck;
const faker = require('faker');
const { User } = require('../models/user');


// async function createCidery() {
//   const cidery = new Cidery({
//     name: 'Vees Cidery',
//     province: 'Alberta',
//     city: 'Calgary',
//     street: '456 Easy Street',
//     phoneNum: 4035555555,
//     email: 'info@v.com',
//     website: 'www.v.com',
//     tastingRoom: true,
//     onlineStore: true,
//     offSales: true,
//     est: 1987,
//     socialMedia: true,
//     flavourProfile: '5ea0abf4c50b4f30dc3c33e4'
//   });

//   try {
//     const result = await cidery.save();
//     console.log(result);
//   }
//   catch(err) {
//     console.log(err);
//   }
// }

// createCidery();



module.exports = function seedUsers() {
  let newUser;
  try {
    const quantity = 10;
    for(i = 0; i < quantity; i++) {
      const fN = faker.name.firstName();
      const lN = faker.name.lastName();
      newUser = new User({
        name: `${fN} ${lN}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.random.boolean()
      });

    User.create(newUser) ? console.log(newUser) : 'COULDNT CREATE USER';

    }
  }
  catch(err) {
    console.log(err.message);
  }
}
