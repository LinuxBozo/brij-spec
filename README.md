# brij-spec

[![Build Status](https://travis-ci.org/LinuxBozo/brij-spec.svg?branch=master)](https://travis-ci.org/LinuxBozo/brij-spec)

Business Rules in JSON. A standard, specification and schema.

> We are still currently un-versioned, some core changes are being pushed out, and a version 0.0.0 will be released following [Semantic Versioning 2.0.0](SemVer.org) best practices.

## Specification Basics

 - id: optional
 - description: optional
 - rule: required
    - property: required
    - condition: required
 - actions: optional
 - If no actions specified, rule evaluation should return true or false

### Conditions
#### Formatting

 - email_address (user@domain.topleveldomain)
 - zipcode (NNNNN or NNNNN-NNNN)
 - yyyy_mm_dd (NNNN-NN-NN or NNNN/NN/NN)
 - mm_dd_yyyy (NN-NN-NNNN or NN/NN/NNNN)
 - yyyy (NNNN)
 - hh_mm (NN:NN)
 - hh_mm_ss (NN:NN:NN)
 - matches_regex
  - value

#### Value Comparison

##### Numeric

 - is_integer
 - is_float
 - equal
  - value
 - not_equal
  - value
 - greater_than
  - value
 - less_than
  - value
 - greater_than_or_equal
  - value
 - less_than_or_equal
  - value
 - between
  - start
  - end

##### String

 - equal
  - value
 - not_equal
  - value
 - starts_with
  - value
 - ends_with
  - value
 - contains
  - value
 - not_empty
 - is_empty

##### Boolean

 - is_true
 - is_false

##### List

 - in
  - values
 - not_in
  - values
 - contains
  - value
 - does_not_contain
  - value
 - includes_all
  - values
 - includes_none
  - values

#### Combining Conditions

 - if
 - then
 - and
 - or

### Actions

 - callOnTrue
  - args
 - callOnFalse
  - args
 - returnOnTrue
 - returnOnFalse

## Examples

 - [simple_example.json](../../raw/master/examples/simple_example.json)
 - [advanced_example.json](../../raw/master/examples/advanced_example.json)

## Validation

You'll probably want to validate that your rules are written correctly, so that an engine that adheres to the BRIJ specification can accurately parse, and evaluate your rules.

### As a node library

```shell
npm install --save brij-spec
```

To validate your rule
```javascript
var brijSpec = require('brij-spec');
var result = brijSpec.validate([{rule: {condition: "equal", property: "myProp"}}]);
```

More likely though, you'll want to validate a file with your rules defined
```javascript
var fs = require('fs'),
    brijSpec = require('brij-spec');
var ruleData = fs.readFileSync('my-rule-file.json', 'utf8').toString();
var result = brijSpec.validate(ruleData);
```

### Command line

There is also a command line client for your convenience.

```shell
npm install -g brij-spec
```

See `brij-validate --help` for usage:

```shell
Options:
  --filename, -f  JSON rules file to validate
  --quiet, -q     less output                  [default: false]
  --help, -h, -?  this help message
```

## Getting Involved
We encourage anyone who's interested in participating in the formation of this standard to join the [discussions here on GitHub](../../issues). Also feel free to fork this project and submit new ideas to add to the `brij-spec` standard.

## Versioning
`brij-spec` adheres to [Semantic Versioning 2.0.0](SemVer.org). If there is a violation of this scheme, report it as a bug. Specifically, if a patch or minor version is released and breaks backward compatibility, that version should be immediately yanked and/or a new version should be immediately released that restores compatibility. Any change that breaks the public API will only be introduced at a major-version release. As a result of this policy, you can (and should) specify any dependency on `brij-spec` by using the Pessimistic Version Constraint with two digits of precision.
