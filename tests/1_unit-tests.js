/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      assert.equal(convertHandler.getNum('32L'), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      assert.equal(convertHandler.getNum('2.1L'), 2.1);
      done();
    });
    
    test('Fractional Input', function(done) {
      assert.equal(convertHandler.getNum('6/3L'), 2);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      assert.equal(convertHandler.getNum('2.5/2L'), 1.25);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      assert.equal(convertHandler.getNum('6/5/L'), "invalid number");
      done();
    });
    
    test('No Numerical Input', function(done) {
      assert.equal(convertHandler.getNum('L'), "1");
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase());
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit("20xl"), "invalid unit");
      done();
    });  
      
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallon','liter','mile','kilometer','pound','kilogram'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [6, 'L'];
      let expected = 1.58503;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [8, 'mi'];
      let expected = 12.87472;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [13, 'km'];
      let expected = 8.07784;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [17, 'lbs'];
      let expected = 7.711064;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [4, 'kg'];
      let expected = 8.81849;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });
    
  });

});