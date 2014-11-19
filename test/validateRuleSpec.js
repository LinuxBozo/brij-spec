'use strict';

describe('brijSpec.validateRule', function() {

    beforeEach(function(done) {
        brijSpec.setCurrentRuleSet([], 1);
        done();
    });

    describe('when given no combinations and all valid required fields', function() {
        it('should return errors array of 0 length', function(done) {
            var name = 'rule';
            var obj = {
                'condition': 'email_address',
                'property': 'foo'
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('when given no combinations and invalid condition field', function() {
        it('should return errors array of 1 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'condition': 'bar',
                'property': 'foo'
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 does not have valid condition specified: bar');
            done();
        });
    });

    describe('when given no combinations and valid condition field and missing additional field', function() {
        it('should return errors array of 1 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'condition': 'equal',
                'property': 'foo'
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 missing required additional field for equal: value');
            done();
        });
    });

    describe('when given no combinations and missing property field', function() {
        it('should return errors array of 1 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'condition': 'email_address'
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 missing required field: property');
            done();
        });
    });

    describe('when given no combinations and missing condition field', function() {
        it('should return errors array of 1 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'property': 'foo'
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 missing required field: condition');
            done();
        });
    });

    describe('when given no combinations and missing condition and property fields', function() {
        it('should return errors array of 2 length and message', function(done) {
            var name = 'rule';
            var obj = {
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(2);
            expect(result[0]).to.be('Rule #1 missing required field: condition');
            expect(result[1]).to.be('Rule #1 missing required field: property');
            done();
        });
    });

    describe('when given valid "if" combination and required condition fields', function() {
        it('should return errors array of 0 length', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'condition': 'email_address',
                    'property': 'foo'
                }
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('when given invalid "if" combination', function() {
        it('should return errors array of 0 length', function(done) {
            var name = 'rule';
            var obj = {
                'if': ''
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1: Type for field if, was expected to be object, not string');
            done();
        });
    });

    describe('when given valid "if" with condition/property and "then" without condition/property', function() {
        it('should return errors array of 2 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'condition': 'email_address',
                    'property': 'foo'
                },
                'then': {}
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(2);
            expect(result[0]).to.be('Rule #1 missing required field: condition');
            expect(result[1]).to.be('Rule #1 missing required field: property');
            done();
        });
    });


    describe('when given valid "if" with single condition/property and valid "then" with single condition/property', function() {
        it('should return errors array of 0 length', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'condition': 'email_address',
                    'property': 'foo'
                },
                'then': {
                    'condition': 'equal',
                    'property': 'bar',
                    'value': '2'
                }
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('when given invalid nested "and" combination', function() {
        it('should return errors array of 1 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'and': ''
                }
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1: Type for field and, was expected to be array, not string');
            done();
        });
    });

    describe('when given valid nested "and" combination with single valid condition', function() {
        it('should return errors array of 0 length', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'and': [
                        {
                            'condition': 'email_address',
                            'property': 'foo'
                        }
                    ]
                }
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('when given valid nested "and" combination with two valid conditions', function() {
        it('should return errors array of 0 length', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'and': [
                        {
                            'condition': 'email_address',
                            'property': 'foo'
                        },
                        {
                            'condition': 'equal',
                            'property': 'bar',
                            'value': 0
                        }
                    ]
                }
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(0);
            done();
        });
    });

    describe('when given valid nested "and" combination with two conditions, one invalid', function() {
        it('should return errors array of 1 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'and': [
                        {
                            'condition': 'equal',
                            'property': 'foo'
                        },
                        {
                            'condition': 'equal',
                            'property': 'bar',
                            'value': 0
                        }
                    ]
                }
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(1);
            expect(result[0]).to.be('Rule #1 missing required additional field for equal: value');
            done();
        });
    });

    describe('when given valid nested "and" combination with two conditions, both invalid', function() {
        it('should return errors array of 1 length and message', function(done) {
            var name = 'rule';
            var obj = {
                'if': {
                    'and': [
                        {
                            'condition': 'equal',
                            'property': 'foo'
                        },
                        {
                            'condition': 'greater_than',
                            'property': 'bar',
                        }
                    ]
                }
            };
            var result = brijSpec.validateRule(name, obj);
            expect(result.length).to.be(2);
            expect(result[0]).to.be('Rule #1 missing required additional field for equal: value');
            expect(result[1]).to.be('Rule #1 missing required additional field for greater_than: value');
            done();
        });
    });

});