/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      console.log(input);
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      if (initNum == "invalid number" && initUnit == "invalid unit") {
        console.log("invalid number and unit");
        res.send("invalid number and unit");
      }
      else if (initNum == "invalid number") {
        console.log("invalid number");
        res.send("invalid number");
      }
      else if (initUnit == "invalid unit") {
        console.log("invalid unit");
        res.send("invalid unit");
      }
      else {
        let returnNum = parseFloat(convertHandler.convert(initNum, initUnit).toFixed(5));
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        let result = {};
        result['initNum'] = initNum
        result['initUnit'] = initUnit == "l" ? "L" : initUnit
        result['returnNum'] = returnNum
        result['returnUnit'] = returnUnit
        result['string'] = toString
        console.log(result);
        res.json(result);
      }
    });
    
};