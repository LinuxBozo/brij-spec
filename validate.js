'use strict';

var brij = {};
var currentRuleSet;

brij.parse = function(data) {
    if (typeof data !== 'string') {
        return 'Invalid data - Not a string';
    }
    var parsed;
    try {
        parsed = JSON.parse(data);
    } catch (e) {
        return 'Invalid JSON - ' + e.toString();
    }
    if (typeof parsed !== 'object' || parsed === null || ! parsed instanceof Array) {
        return 'Invalid brij JSON - not an object: got instead: ' + typeof parsed;
    }

    if (parsed.length === undefined) {
        return 'Invalid brij JSON - not an array';
    }

    return parsed;
};

brij.setCurrentRuleSet = function(parsed, i) {
    currentRuleSet = parsed;
    currentRuleSet.id = currentRuleSet.hasOwnProperty('id') ? currentRuleSet.id : 'Rule #' + i;
};

brij.validateActions = function(name, obj) {
    var errors = [];
    for (var idx in obj) {
        for (var key in obj[idx]) {
            if (key in actionfields) {
                var field = actionfields[key];
                var value = obj[idx][key];
                errors = errors.concat(brij.validateType(key, field, value));
            } else {
                errors.push(currentRuleSet.id + ' invalid action specified: ' + key);
            }
        }
    }

    return errors;
};

brij.validateAdditionalField = function(name, field, additionalName, obj) {
    var errors = [];
    if (obj[additionalName] === undefined && field.required) {
        errors.push(currentRuleSet.id + ' missing required additional field for ' + name + ': ' + additionalName);
        return errors;
    }
    errors = errors.concat(brij.validateType(additionalName, field, obj[additionalName]));
    return errors;
};

brij.validateCondition = function(obj) {
    var errors = [];
    if (obj.condition in validConditions) {
        for (var idx in validConditions[obj.condition].additionalFields) {
            var name = validConditions[obj.condition].additionalFields[idx];
            var field = additionalFields[name];
            errors = errors.concat(brij.validateAdditionalField(obj.condition, field, name, obj));
            continue;
        }
    } else {
        errors.push(currentRuleSet.id + ' does not have valid condition specified: ' + obj.condition);
    }
    return errors;
};

brij.validateRule = function(name, obj) {
    var errors = [];

    return errors;
};

brij.validateRuleSet = function(parsed) {
    var errors = [];
    for (var name in mainfields) {
        var field = mainfields[name];
        if (parsed[name] === undefined && (!field.or || field.or && parsed[field.or] === undefined)) {
            if (field.required) {
                errors.push(currentRuleSet.id + ' missing required field: ' + name);
            }
            continue;
        } else if (parsed[name] === undefined) {
            // It's empty, but not necessary
            continue;
        }

        // Type checking
        var typeErrors = brij.validateType(name, field, parsed[name]);
        if (typeErrors.length > 0) {
            errors = errors.concat(typeErrors);
            continue;
        }

        // Validation function check
        if (typeof field.validate === 'function') {
            // Validation is expected to return an array of errors (empty means no errors)
            errors = errors.concat(field.validate(name, parsed[name]));
        }
    }
    return errors;
};

brij.validateType = function(name, field, value) {
    var errors = [];
    if (field.types || field.type) {
        var validFieldTypes = field.types || [field.type];
        var valueType = value instanceof Array ? 'array' : typeof value;
        if(validFieldTypes.indexOf(valueType) === -1) {
            errors.push(currentRuleSet.id + ': Type for field ' + name + ', was expected to be ' + validFieldTypes.join(' or ') + ', not ' + typeof value);
        }
    }
    return errors;
};

brij.validate = function(content) {

    // Parse our rule content
    var parsed = brij.parse(content),
        out = {'valid': false};

    // If we have a string, there was a major error in parsing
    if (typeof parsed === 'string') {
        out.critical = parsed;
        return out;
    }

    var errors = [];
    // Process each individually defined rule in the array
    for (var i=0; i < parsed.length; i++) {
        brij.setCurrentRuleSet(parsed[i], i);
        errors = errors.concat(brij.validateRuleSet(currentRuleSet));
    }

    // Set valid depending on number of errors
    out.valid = errors.length > 0 ? false : true;
    if (errors.length > 0) {
        out.errors = errors;
    }

    return out;
};

var mainfields = {
    'id': {required: false, type: 'string'},
    'description': {required: false, type: 'string'},
    'rule': {required: true, type: 'object', validate: brij.validateRule},
    'actions': {required: false, type: 'array', validate: brij.validateActions}
};

var rulefields = {
    'condition': {required: true, type: 'string', validate: brij.validateCondition},
    'property': {required: true, type: 'string'}
};

var combinationfields = {
    'if': {required: false, type: 'object'},
    'then': {required: false, type: 'object'},
    'and': {required: false, type: 'array'},
    'or': {required: false, type: 'array'}
};

var actionfields = {
    'callOnTrue': {required: false, type: 'string', additionalFields: ['args']},
    'callOnFalse': {required: false, type: 'string', additionalFields: ['args']},
    'args': {required: false, type: 'array'},
    'returnOnTrue': {required: false, type: 'string'},
    'returnOnFalse': {required: false, type: 'string'}
};

var additionalFields = {
    'value': {required: true, types: ['string', 'number']},
    'values': {required: true, type: 'array'},
    'start': {required: true, type: 'number'},
    'end': {required: true, type: 'number'}
};

var validConditions = {
    'email_address': {},
    'zipcode': {},
    'yyyy_mm_dd': {},
    'mm_dd_yyyy': {},
    'yyyy': {},
    'hh_mm': {},
    'hh_mm_ss': {},
    'matches_regex': {additionalFields: ['value']},
    'is_integer': {},
    'is_float': {},
    'equal': {additionalFields: ['value']},
    'not_equal': {additionalFields: ['value']},
    'greater_than': {additionalFields: ['value']},
    'less_than': {additionalFields: ['value']},
    'greater_than_or_equal': {additionalFields: ['value']},
    'less_than_or_equal': {additionalFields: ['value']},
    'between': {additionalFields: ['start', 'end']},
    'starts_with': {additionalFields: ['value']},
    'ends_with': {additionalFields: ['value']},
    'contains': {additionalFields: ['value']},
    'not_empty': {},
    'is_empty': {},
    'is_true': {},
    'is_false': {},
    'in': {additionalFields: ['values']},
    'not_in': {additionalFields: ['values']},
    'does_not_contain': {additionalFields: ['value']},
    'includes_all': {additionalFields: ['values']},
    'includes_none': {additionalFields: ['values']}
};

module.exports = brij;