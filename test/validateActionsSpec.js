'use strict';

describe('brijSpec.validateActions', function() {

    beforeEach(function(done) {
        brijSpec.setCurrentRuleSet([], 1);
        done();
    });

    describe('when provided invalid action', function() {
        it('should return errors array with 1 length, and message about invalid action', function(done) {
            var name = 'actions'
            var obj = [
                {
                    'foo': 'bar'
                }
            ];
            var result = brijSpec.validateActions(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 invalid action specified: foo');
            done();
        });
    });

    describe('when provided valid action, but invalid type', function() {
        it('should return errors array with 1 length, and message about invalid action', function(done) {
            var name = 'actions'
            var obj = [
                {
                    'callOnTrue': 1
                }
            ];
            var result = brijSpec.validateActions(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1: Type for field callOnTrue, was expected to be string, not number');
            done();
        });
    });

    describe('when provided valid action, but invalid additional field', function() {
        it('should return errors array with 1 length, and message about invalid action', function(done) {
            var name = 'actions'
            var obj = [
                {
                    'callOnTrue': 'foo',
                    'args': 'bar'
                }
            ];
            var result = brijSpec.validateActions(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1: Type for field args, was expected to be array, not string');
            done();
        });
    });

    describe('when provided valid action and valid additional field', function() {
        it('should return errors array with 0', function(done) {
            var name = 'actions'
            var obj = [
                {
                    'callOnTrue': 'foo',
                    'args': ['bar']
                }
            ];
            var result = brijSpec.validateActions(name, obj);
            expect(result.length).to.be(0);
            done();
        });
    });

});