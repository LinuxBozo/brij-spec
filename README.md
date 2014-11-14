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

#### Value Comparison

##### Numeric

 - equal
 - not_equal
 - greater_than
 - less_than
 - greater_than_or_equal
 - less_than_or_equal

##### String

 - equal
 - not_equal
 - starts_with
 - ends_with
 - contains
 - not_empty
 - is_empty

##### Boolean

 - is_true
 - is_false

##### List

 - in
 - not_in
 - contains
 - does_not_contain
 - contains_all

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
