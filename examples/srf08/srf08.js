'use strict';

var Cylon = require('cylon');

Cylon.robot({
  connections: {
    i2c: { adaptor: 'firmata', port: '/dev/i2c-1' }
  },

  devices: {
    srf08: { driver: 'srf08' }
  },

  work: function(my) {
    every((1).seconds(), function() {
      my.srf08.getRangeAndLightLevel(function(err, data) {
        if (err) { console.error(err); }
        console.log(err, data);
      });
    });
  }
}).start();
