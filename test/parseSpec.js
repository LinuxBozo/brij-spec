'use strict';

describe('brij.parse', function() {

    describe('when given null', function() {
        it('must return message for Invalid data', function(done) {
            var result = brijSpec.parse(null);
            expect(result).to.be('Invalid data - Not a string');
            done();
        });
    });

    describe('when given empty string', function() {
        it('must return message for invalid JSON', function(done) {
            var result = brijSpec.parse('');
            expect(result).to.be('Invalid JSON - SyntaxError: Unexpected end of input');
            done();
        });
    });

    describe('when given number in string', function() {
        it('must return message for invalid brij json, expecting object', function(done) {
            var result = brijSpec.parse('5');
            expect(result).to.be('Invalid brij JSON - not an object: got instead: number');
            done();
        });
    });

    describe('when given object, not an array', function() {
        it('must return message for not an array', function(done) {
            var result = brijSpec.parse('{}');
            expect(result).to.be('Invalid brij JSON - not an array');
            done();
        });
    });

    describe('when given array', function() {
        it('must return JSON', function(done) {
            var jsonStr = '[{"foo":"bar"}]';
            var result = brijSpec.parse(jsonStr);
            expect(JSON.stringify(result)).to.be(jsonStr);
            done();
        });
    });

});