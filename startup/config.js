// 3rd Party APIs
const dotenv = require('dotenv').config();


module.exports = function() {
  if (dotenv.error) {
    throw new Error(dotenv.error);
  };

  // if(app.get('env') === development {
  //   app.use(morgan('tiny'));
  //   console.log('Morgan enabled...')
  // })
}
