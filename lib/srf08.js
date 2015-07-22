/*
 * Srf08 I2C accelerometer and temperature sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-15 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

/* eslint camelcase: 0 */

"use strict";

var Cylon = require("cylon");

var I2CDriver = require("./i2c-driver");

/**
 * A Srf08 Driver
 *
 * @constructor Srf08
 */
var Srf08 = module.exports = function Srf08() {
    Srf08.__super__.constructor.apply(this, arguments);
    this.address = this.address || 0x70;
    // TODO: never seen a constructor like this. works with `new Srf08({mode:X})`?
    this.mode = this.mode || Srf08.RANGING_MODE_CM;
    this.commands = {
        //changeMode: this.changeMode, not now.
        getRangeAndLightLevel: this.getRangeAndLightLevel,
        getLightLevel: this.getLightLevel
    };
};

Cylon.Utils.subclass(Srf08, I2CDriver);

Srf08.RANGING_MODE_INCHES = 0x50;
Srf08.RANGING_MODE_CM = 0x51;
Srf08.RANGING_MODE_MS = 0x52;

Srf08.ANN_MODE_INCHES = 0x53;
Srf08.ANN_MODE_CM = 0x54;
Srf08.ANN_MODE_MS = 0x55;

Srf08.CHANGE__I2C_ADDRESS = [0xA0, 0xA5, 0xAA];
Srf08.RANGING_MODE_CM = 0x3B;


/**
 * Starts the driver
 *
 * @param {Function} callback triggered when the driver is started
 * @return {void}
 */
Srf08.prototype.start = function (callback) {
    this._writeBits(this.mode);

    callback();
    this.emit("start"); //TODO: emit! I've been looking for this.
};


/**
 * Gets the latest range sensor value
 *
 * @param {Function} callback function to be invoked with data
 * @return {void}
 * @publish
 */
Srf08.prototype.getRangeAndLightLevel = function() {
    this.connection.i2cWrite(this.address, Srf08.RA_PWR_MGMT_1, [0x00]);
    this._writeBits(this.mode);

    this.connection.i2cRead(
        this.address,
        this.commandBytes("A"),
        2,
        function(err, data) {
            if (typeof callback === "function") {
                callback(err, this.parseHeading(data));
            }
        }.bind(this)
    );
};

/**
 * Gets the latest light sensor value
 *
 * @param {Function} callback function to be invoked with data
 * @return {void}
 * @publish
 */
Srf08.prototype.getLightLevel = function() {

};

/**
 * Gets the value of the Motion.
 *
 * @param {Function} callback function to be invoked with data
 * @return {void}
 * @publish
 */
Srf08.prototype.getMotionAndTemp = function (callback) {
    // ping
    this.write(this.mode);

    this.connection.i2cReadOnce(
        this.address,
        4,
        function (err, d) {
            var lightLevel = d[0];
            //var range1 = bus.read_byte_data(address, 2)
            //var range2 = bus.read_byte_data(address, 3)
            //var range3 = (range1 << 8) + range2
            //return range3

            callback(err, values);
        }.bind(this)
    );
};

Srf08.prototype._write = function (value) {
    this.connection.i2cWrite(this.address, 0x00, value);
};
