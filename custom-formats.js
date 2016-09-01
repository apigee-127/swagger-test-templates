/**
 * Placeholder file for all custom-formats in known to swagger.json
 * as found on
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat
 */

var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

exports = module.exports = function(ZSchema) {

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  ZSchema.registerFormat("double", function(val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  ZSchema.registerFormat("int32", function(val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  ZSchema.registerFormat("int64", function(val) {
    return Number.isInteger(val);
  });

  ZSchema.registerFormat("float", function(val) {
    // should parse
    return Number.isInteger(val);
  });

  ZSchema.registerFormat("date", function(val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  ZSchema.registerFormat("dateTime", function(val) {
    return !isNaN(Date.parse(val));
  });

  ZSchema.registerFormat("password", function(val) {
    // should parse as a string
    return typeof val === 'string'
  });

};
