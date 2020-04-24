const seed = require('../data/seed');
const { Cider, validationCheck } = require('../models/cider');
const { ciderySchema } = require('./cidery');

describe('Creating ciders', () => {

  it('Our first test', () => {
    // throw new Error('Something failed');
    seed.createCider = function(cideryId, flavourProfileId){
      return {
        name: 'Cidery test 1',
        cidery: cideryId,
        flavourProfile: flavourProfileId
      }
    }

    console.log('Creating fake cider...')

    const newCider = newCiderObject.createCider('1234', '1234');

    expect(newCider).toBeDefined();

    // expect(newCider) to contain an address
    // expect(newCider) to contain a Cidery Id name
    // expect(newCider) to contain a FP flavour profile

    expect(newCider).toMatchObject({ // can also use .toHavePropery
      name: 'Cidery test 1',
      cideryId: '12345',
      flavourProfile: '12345'
    });
  });
});

