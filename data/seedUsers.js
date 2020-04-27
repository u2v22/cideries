const faker = require('faker');
const { User } = require('../models/user');


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
