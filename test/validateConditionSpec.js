'use strict';

describe('brijSpec.validateCondition', function() {

    beforeEach(function(done) {
        brijSpec.setCurrentRuleSet([], 1);
        done();
    });

    describe('When invalid condition is specified', function() {
        it('should return errors array with 1 length, and message about invalid condition', function(done) {
            var obj = {
                'condition': 'foo'
            };
            var result = brijSpec.validateCondition(obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 does not have valid condition specified: foo');
            done();
        });
    });

    describe('When given valid condition with no additional fields required', function() {
        it('should return errors array of 0 length', function(done) {
            var obj = {
                'condition': 'email_address'
            }
            var result = brijSpec.validateCondition(obj);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('When given a valid condition, and single additional field is required, but missing', function() {
        it('should return errors array with 1 length, and message about missing required field', function(done) {
            var obj = {
                'condition': 'matches_regex'
            };
            var result = brijSpec.validateCondition(obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 missing required additional field for matches_regex: value');
            done();
        });
    });

    describe('When given a valid condition, and single additional field is required and provided', function() {
        it('should return errors array with 0 length', function(done) {
            var obj = {
                'condition': 'matches_regex',
                'value': 'bar'
            };
            var result = brijSpec.validateCondition(obj);
            expect(result.length).to.be(0);
            done();
        });
    });


    describe('When given a valid condition, and multiple additional field are required, but one is missing', function() {
        it('should return errors array with 1 length, and message about missing required field', function(done) {
            var obj = {
                'condition': 'between',
                'start': 1
            };
            var result = brijSpec.validateCondition(obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 missing required additional field for between: end');
            done();
        });
    });

    describe('When given a valid condition, and multiple additional field are required and all provided', function() {
        it('should return errors array with 0 length', function(done) {
            var obj = {
                'condition': 'between',
                'start': 1,
                'end': 2
            };
            var result = brijSpec.validateCondition(obj);
            expect(result.length).to.be(0);
            done();
        });
    });

});