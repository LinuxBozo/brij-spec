'use strict';

describe('brij.validateType', function() {

    describe('when types match', function() {
        it('should return errors array of 0 length', function(done) {
            var field = {};
            field.type = 'number';
            var name = 'foo';
            var value = 9;
            expect(brijSpec.validateType(name, field, value).length).to.be(0);
            done();
        });
    });

    describe('when types do not match', function() {
        it('should return errors array with 1 length', function(done) {
            var field = {};
            var name = 'foo';
            var value = '9';
            expect(brijSpec.validateType(name, field, value).length).to.be(1);
            done();
        });
    });

    describe('when types match and are array', function() {
        it('should return errors array of 0 length', function(done) {
            var field = {};
            field.type = 'array';
            var name = 'foo';
            var value = [];
            expect(brijSpec.validateType(name, field, value).length).to.be(0);
            done();

        });
    });

});