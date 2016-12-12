const prompt = require('prompt');
const mongoose = require('mongoose');

const User = require('../models/user');

mongoose.connect('mongodb://bangular:12345@127.0.0.1/bangular');

prompt.message = '';
prompt.colors = false;

prompt.start();

prompt.get([{
    name: 'username',
    required: true
  }, {
    name: 'first_name',
    required: true
  }, {
    name: 'last_name',
    required: true
  }, {
    name: 'password',
    replace: '*',
    hidden: true
  }], function (err, result) {
    var user = new User();
    
    user.username = result.username;
    user.first_name = result.first_name;
    user.last_name = result.last_name;
    user.password = result.password;
    
    user.save(function(err) {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log('User created');
        process.exit(0);
      }
    });
  });

  
            
