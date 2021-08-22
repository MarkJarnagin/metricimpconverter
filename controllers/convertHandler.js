/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  function checkSymbol(n, symbol) {
    nList = n.split(symbol);
    return (nList.length > 2) ? false : (symbol === "/" ? nList : n);
  }

  this.getNum = function(input) {
    if (!/\d+/.test(input)) return 1;
    let origNum = input.match(/[\d\/.]+/) || ["1"];
    let nums = checkSymbol(origNum[0], "/");
    if (!nums[0]) { return "invalid number" };
    let n1 = checkSymbol(nums[0], ".");
    let n2 = nums[1] || "1"
    n2 = checkSymbol(n2, ".")
    return (parseFloat(n1) / parseFloat(n2)) || "invalid number";
  };
  
  this.getUnit = function(input) {
    input = input.toLowerCase().match(/[a-z]+/)[0];
    let unitFull = input.match(/gal|lbs|mi|l|kg|km/);
    if(unitFull == null) {return "invalid unit"};
    let unit = unitFull[0];
    //console.log(`Unit:  ${unit} ${unit.length}\nInput: ${input} ${input.length}`);
    //console.log(`${unit.length == input.length} ${unit == input}`);
    if (unit.length == input.length && unit == input) { return unit }
    return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    const convertedUnits = {
      gal: 'L',
      lbs: 'kg',
      mi : 'km',
      l  : 'gal',
      kg : 'lbs',
      km : 'mi'      
    }
    if (this.getUnit(initUnit) != "invalid unit") {
      return convertedUnits[initUnit];
    }
  };

  this.spellOutUnit = function(unit) {
    if (unit == "L") unit = "l";
    const spelledOutUnits = {
      gal: 'gallon',
      lbs: 'pound',
      mi : 'mile',
      l  : 'liter',
      kg : 'kilogram',
      km : 'kilometer'
    }
    return spelledOutUnits[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541; //gal is bigger
    const lbsToKg = 0.453592; //lbs is smaller
    const miToKm = 1.60934; //mi is bigger
    let outputUnit = this.getReturnUnit(initUnit.toLowerCase());

    switch (outputUnit) {
      case "gal": //L to gal
        return parseFloat(initNum / galToL);
        break;
      case "lbs": //kg to lbs
        return parseFloat(initNum / lbsToKg);
        break;
      case "mi": //km to mi
        return parseFloat(initNum / miToKm);
        break;
      case "L": //gal to L
        return parseFloat(initNum * galToL);
        break;
      case "kg": //lbs to kg
        return parseFloat(initNum * lbsToKg);
        break;
      case "km": //mi to km
        return parseFloat(initNum * miToKm);
        break;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    returnNum = parseFloat(returnNum).toFixed(5);
    let tempInitUnit = this.spellOutUnit(initUnit);
    let tempReturnUnit = this.spellOutUnit(returnUnit);
    if (parseFloat(initNum) != 1) tempInitUnit += "s";
    if (returnNum != 1) tempReturnUnit += "s";
    return `${parseFloat(initNum)} ${tempInitUnit} converts to ${returnNum} ${tempReturnUnit}`;
  };
}

module.exports = ConvertHandler;
