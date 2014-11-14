# brij

Business Rules in JSON

## Specification Basics

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
 - contains_all
  - values
 - contains_none
  - values

#### Combining Conditions

##### if/then

##### and

##### or

### Actions

 - callOnTrue
  - args
 - callOnFalse
  - args
 - returnOnTrue
 - returnOnFalse

## Examples
