'use strict';
var fs = require('fs');
var passingRules = fs.readFileSync('examples/advanced_example.json', 'utf8').toString();
var invalidTypeRules = fs.readFileSync('test/bad_example_invalid_type.json', 'utf8').toString();
var missingRequiredRules = fs.readFileSync('test/bad_example_missing_required_fields.json', 'utf8').toString();

var emptyRules = [];


describe('brijSpec.validate', function() {

    describe('when given valid rule file data', function() {
        it('should return json object with valid property equal true', function(done) {
            var result = brijSpec.validate(passingRules);
            expect(result).to.have.property('valid');
            expect(result.valid).to.be.true();
            done();
        });
    });

    describe('when given data as object, not string', function() {
        it('should return json object with valid property equal false and critical property with message', function(done) {
            var result = brijSpec.validate(emptyRules);
            expect(result).to.have.property('valid');
            expect(result.valid).to.be.false();
            expect(result).to.have.property('critical');
            expect(result.critical).to.be('Invalid data - Not a string');
            done();
        });
    });

    describe('when given empty rule set', function() {
        it('should return json object with valid property equal false and critical property with message', function(done) {
            var result = brijSpec.validate(emptyRules.toString());
            expect(result).to.have.property('valid');
            expect(result.valid).to.be.false();
            expect(result).to.have.property('critical');
            expect(result.critical).to.be('Invalid JSON - SyntaxError: Unexpected end of input');
            done();
        });
    });

    describe('when given rules with rules field of invalid type', function() {
        it('should return json object with valid property equal false, and errors array of 1 length', function(done) {
            var result = brijSpec.validate(invalidTypeRules);
            expect(result).to.have.property('valid');
            expect(result.valid).to.be.false();
            expect(result).to.have.property('errors');
            expect(result.errors.length).to.be(1);
            expect(result.errors[0]).to.be('invalid_type_rule: Type for field rule, was expected to be object, not string');
            done();
        });
    });

    describe('when given rules with missing required rules field', function() {
        it('should return json object with valid property equal false, and errors array of 1 length', function(done) {
            var result = brijSpec.validate(missingRequiredRules);
            expect(result).to.have.property('valid');
            expect(result.valid).to.be.false();
            expect(result).to.have.property('errors');
            expect(result.errors.length).to.be(1);
            expect(result.errors[0]).to.be('missing_required_field_rule missing required field: rule');
            done();
        });

    });
});
