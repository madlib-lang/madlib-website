Madlib comes with a set of predefined functions in the form of our Standard Library.

(**NB**: Note that you can see it the raw library in code form [here](https://github.com/madlib-lang/madlib/tree/master/prelude/__internal__).)

Additionally, for an automatically generated version of the docs please go [here](https://madlib-lang.github.io/madlib).

The rest of this document will explore the most fundamental imports that the Standard Library provides:

### String

 - `toLower` - Convert a string to lowercase
 - `toUpper` - Convert a string to uppercase
 - `split` - Split a string by another search string
 - `join` - Join a string with a given delimiter string
 - `lines` - Split a string by newlines
 - `unlines` - Join a string by newlines
 - `words` - Split a string by spaces
 - `unwords` - Join a string by spaces
 - `toList` - Convert a String to a List Char
 - `fromList` - Convert a List Char to a String
 - `mapChars` - `map` over the characters in a string
 - `filterChars` - `filter` over the characters in a string
 - `reduceChars` - `reduce` over the characters in a string
 - `slice` - Cut part of a string out of another string
 - `isEmpty` - Test whether a string is empty `""`
 - `drop` - Drop a certain number of characters from the beginning of a string
 - `dropLast` - Drop a certain number of characters from the end of a string
 - `dropWhile` - Drop characters based on a predicate function
 - `take` - Take a certain number of characters from the beginning of the string
 - `takeLast` - Take a certain number of characters from the end of a string
 - `takeWhile` - Take characters based on a predicate function
 - `charAt` - Return the character at a given index
 - `firstChar` - Return the first character in a string
 - `lastChar` - Return the last character in a string
 - `trim` - Remove whitespace characters at the beginning and end of a string
 - `trimStart` - Remove whitespace characters at the beginning of a string
 - `trimEnd` - Remove whitespace characters at the end of a string
 - `length` - Return the length of a string
 - `repeat` - Return a list of repeated strings of a given length
 - `match` - Match a string given a regular expression
 - `replace` - Replace part of a string given a regular expression
 - `pushChar` - Insert a char at the beginning of a string
 - `appendChar` - Add a char at the end of a string
 - `reverse` - Reverse a string
 - `includes` - Test whether a string contains a given character
 - `startsWith` - Test whether a string starts with a given string
 - `contains` - Test whether a string contains a given string
 - `endsWith` - Test whether a string ends with a given string

### IO

 - `log` - Write a Madlib value to `stdout` / `console.log` (depending on environment)
 - `trace` - Useful pipe inspector utility, `trace` takes a String and anything and prints them, returning the latter

### Function

 - `complement` - Given a predicate function, produce a function which has the opposite predicate
 - `always` - Always return the first supplied parameter no matter what
 - `identity` - Returns what it is given
 - `equals` - Equality comparison as a function
 - `notEquals` - Inequality comparison as a function
 - `ifElse` - Ternary function which represents conditional logic
 - `when` - `ifElse` but with no else case
 - `not` - Given a boolean, produce the complement value (`true` becomes `false` and vice-versa)
 - `noop` - Given any value, return Unit `{}`
 - `flip` - Swaps the parameters of a binary function
 - `any` - Given a predicate and a list, return true if the predicate matches anything
 - `all` - Given a predicate and a list, return true if the predicate matches everything
 - `either` - Functional "or": `either(() => true, () => false)`
 - `both` - Functional "and": `both(() => true, () => false)`
 - `memoize` - Memoize a function

