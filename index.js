"use strict";

var Drivers = {
  blinkm: require("./lib/blinkm"),
  hmc6352: require("./lib/hmc6352"),
  mpl115a2: require("./lib/mpl115a2"),
  bmp180: require("./lib/bmp180"),
  mpu6050: require("./lib/mpu6050"),
  lcd: require("./lib/lcd"),
  lsm9ds0g: require("./lib/lsm9ds0g"),
  lsm9ds0xm: require("./lib/lsm9ds0xm"),
  "lidar-lite": require("./lib/lidar-lite"),
  pca9685: require("./lib/pca9685"),
  srf08: require("./lib/srf08")
};

module.exports = {
  drivers: Object.keys(Drivers),

  driver: function(opts) {
    if (Drivers[opts.driver]) {
      return new Drivers[opts.driver](opts);
    }

    return null;
  }
};
