'use strict';

describe('brijSpec.validateType', function() {
    beforeEach(function(done) {
        brijSpec.setCurrentRuleSet([], 1);
        done();
    });

    describe('when types match and are number', function() {
        it('should return errors array of 0 length', function(done) {
            var field = {};
            field.type = 'number';
            var name = 'foo';
            var value = 9;
            var result = brijSpec.validateType(name, field, value);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('when types do not match', function() {
        it('should return errors array with 1 length, and message about type', function(done) {
            var field = {};
            field.type = 'number';
            var name = 'foo';
            var value = '9';
            var result = brijSpec.validateType(name, field, value);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1: Type for field foo, was expected to be number, not string');
            done();
        });
    });

    describe('when types match and are string', function() {
        it('should return errors array of 0 length', function(done) {
            var field = {};
            field.type = 'string';
            var name = 'foo';
            var value = '9';
            var result = brijSpec.validateType(name, field, value);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('when types match and are array', function() {
        it('should return errors array of 0 length', function(done) {
            var field = {};
            field.type = 'array';
            var name = 'foo';
            var value = [];
            var result = brijSpec.validateType(name, field, value);
            expect(result.length).to.be(0);
            done();
        });
    });

});